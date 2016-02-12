import re
from datetime import time
from requests import get, post
from bs4 import NavigableString, BeautifulSoup as bs
from .data_helpers import load_data, save_data, needs_reload, lock_data, unlock_data


def get_sid_from_homepage_text(page):
    sid_matches = re.search(r'\?SID=([a-zA-Z0-9]+)', page)
    return sid_matches.group(1)


def get_credentials():
    # returns ['username', 'password']
    with open('credentials/whentowork.credential', 'r') as when_to_work_credentials:
        return when_to_work_credentials.read().split('\n')


def login(credentials):
    r = post('https://whentowork.com/cgi-bin/w2w.dll/login', data={
        'NAS_id': 76003,
        'name': 'signin',
        'UserId1': credentials[0],
        'Password1': credentials[1],
        'Submit1': 'Sign-In Now',
    })
    page = r.text
    return page


def get_whos_on_later_page(SID):
    r = get('https://www3.whentowork.com/cgi-bin/w2wC.dll/empwhosonlater.htm?SID=%s' % SID)
    return r.text


def get_whos_on_now_page(SID):
    r = get('https://www3.whentowork.com/cgi-bin/w2wC.dll/empwhosonnow.htm?SID=%s' % SID)
    return r.text


def timestring_to_time(ts):
    timelist = ts.strip(r'(am|pm)').split(':')
    offset = 12 if 'pm' in ts else 0
    hour = int(timelist[0])
    minute = int(timelist[1]) if len(timelist) >= 2 else 0
    return time(hour + offset, minute)


def process_shift(shift):
    shift['name'] = shift['Scheduled']
    del shift['Scheduled']
    shift['location'] = shift['Position']
    del shift['Position']

    del shift['Description']
    del shift['Category']

    if 'Time' in shift:
        shift['time'] = shift['Time']
        del shift['Time']

        start, end = shift['time'].split('-')
        shift['start_time'] = timestring_to_time(start).isoformat()
        shift['end_time'] = timestring_to_time(end).isoformat()

    if 'Until' in shift:
        shift['end_time'] = timestring_to_time(shift['Until']).isoformat()
        del shift['Until']

    return shift


def extract_shifts(page):
    soup = bs(page, 'html.parser')
    table = soup.select('.bwgt > table')[0]

    headers = table.select('tr:nth-of-type(1) td')
    keys = [h.get_text() for h in headers]

    shift_rows = table.find_all('tr', attrs={'title': 'View details'})
    shift_rows = [
        [cell.get_text().strip()
         for cell in row
         if not isinstance(cell, NavigableString)]
        for row in shift_rows]

    shifts = [{keys[i]: value for i, value in enumerate(row)} for row in shift_rows]
    shifts = [process_shift(s) for s in shifts]

    shifts.sort(key=lambda s: s.get('start_time', 0))
    return shifts


def get_shifts():
    filename = 'whentowork.json'

    if not needs_reload(filename, minutes=30):
        return load_data(filename)

    lock_data(filename)

    credentials = get_credentials()
    homepage = login(credentials)

    SID = get_sid_from_homepage_text(homepage)

    whos_on_later_page = get_whos_on_later_page(SID)
    whos_on_now_page = get_whos_on_now_page(SID)

    data = {
        'later': extract_shifts(whos_on_later_page),
        'now': extract_shifts(whos_on_now_page),
    }

    save_data(filename, data)
    unlock_data(filename)
    return load_data(filename)
