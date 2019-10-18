from datetime import datetime
from contextlib import contextmanager
import sqlite3
import random
import time
import json
import sys
import os


def get_userpass_pair(name):
    # returns ['username', 'password']
    filename = os.path.join(os.path.dirname(__file__), '..', 'credentials', '%s.credential' % name)
    with open(filename, 'r') as credentials:
        return credentials.read().split('\n')[0:2]

def get_api_key(name):
    # returns 'apikey'
    filename = os.path.join(os.path.dirname(__file__), '..', 'credentials', '%s.credential' % name)
    with open(filename, 'r') as credentials:
        return credentials.read().split('\n')[0]


def needs_reload(filename, *, minutes):
    with get_db() as c:
        c.execute("select (julianday('now') - julianday(last_updated)) * 24 * 60 >= ? as needs_refresh from data where filename = ?", [minutes, filename])
        row = c.fetchone()
        return row is None or row['needs_refresh'] == 1


def persist_data(filename, content):
    with get_db() as c:
        c.execute("""
            insert into data (filename, content, last_updated) values (:filename, :content, julianday('now'))
            on conflict (filename) do update
            set content = :content, last_updated = julianday('now')
        """, {'filename': filename, 'content': json.dumps(content)})


def load_data(filename):
    with get_db() as c:
        c.execute("select content from data where filename = ?", [filename])
        return json.loads(c.fetchone()['content'])


@contextmanager
def get_db():
    data_dir = os.path.join(os.path.dirname(__file__), '..', 'data')
    os.makedirs(data_dir, exist_ok=True)
    data_path = os.path.join(data_dir, 'data.sqlite3')

    with sqlite3.connect(data_path) as db:
        db.row_factory = sqlite3.Row

        db.execute('''
            CREATE TABLE IF NOT EXISTS data (
                filename varchar unique,
                content varchar,
                last_updated timestamp default (julianday('now'))
            )
        ''')

        db.commit()

        yield db.cursor()

