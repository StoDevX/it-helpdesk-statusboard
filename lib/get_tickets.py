import json
import sys
import requests
from urllib.parse import quote, urlencode
from subprocess import check_output
from .data_helpers import load_data, persist_data, needs_reload, get_api_key


def get_tickets(statustype):
    if not statustype:
        raise Error('statustype is required')

    ticket_count = 250
    filename = '-'.join(statustype.lower().split()) + '-tickets.json'

    if not needs_reload(filename, minutes=1):
        return load_data(filename)

    key = get_api_key('webhelpdesk')
    base = 'https://help.stolaf.edu/helpdesk/WebObjects/Helpdesk.woa/ra/Tickets'
    query = {
        'style': 'details',
        'limit': ticket_count,
        'qualifier': 'statustype.statusTypeName="%s"' % statustype,
        'apiKey': key,
    }

    url = base + '?' + urlencode(query)
    tickets = requests.get(url).json()

    persist_data(filename, tickets)

    return load_data(filename)
