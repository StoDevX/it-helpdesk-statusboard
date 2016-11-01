from .get_tickets import get_tickets
from .functions import flatten, group_by, take
import re


def list_tickets(num=7):
    open_tickets = get_tickets('open')

    filtered = [t for t in open_tickets 
                if t['problemtype']['detailDisplayName'] != 'IT (Internal) &#8226; Training Request Type']
    sorted_tickets = sorted(filtered, key=lambda t: t['lastUpdated'])
    most_recent = take(num, reversed(sorted_tickets))

    return list(most_recent)
