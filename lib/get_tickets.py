import json
import sys
import requests
from urllib.parse import quote, urlencode
from subprocess import check_output
from .data_helpers import load_data, save_data, needs_reload


def get_credentials():
    # returns 'api-key'
    with open('credentials/webhelpdesk.credential', 'r') as credentials:
        return credentials.read()


def get_tickets(statustype):
    if not statustype:
        raise Error('statustype is required')

    ticket_count = 200
    filename = '-'.join(statustype.lower().split()) + '-tickets.json'

    if not needs_reload(filename, minutes=1):
        return load_data(filename)

    apiKey = get_credentials()
    base = 'https://help.stolaf.edu/helpdesk/WebObjects/Helpdesk.woa/ra/Tickets'
    query = {
        'style': 'details',
        'limit': ticket_count,
        'qualifier': 'statustype.statusTypeName="%s"' % statustype,
        'apiKey': apiKey,
    }

    url = base + '?' + urlencode(query)
    tickets = requests.get(url).json()

    saved_data = save_data(filename, tickets)

    return load_data(filename)
