from .get_tickets import get_tickets
from .functions import flatten, group_by, take
import re

staff = [
    'Andy Kreienkamp',
    'Andy Prehall',
    'Ben Gottfried',
    'Bob Breid',
    'Cathie Skluzacek',
    'Craig Rice',
    'Dan Beach',
    'Dana Thompson',
    'Derek Hanson',
    'Doug Hamilton',
    'Ezra Plemons',
    'Gunnar Halseth',
    'Hawken Rives',
    'Heather Malecha',
    'Jason Menard',
    'Jeff Dixon',
    'Jennie Moberg',
    'Kelly Kloos',
    'Kurtis Gibson',
    'Marc Thomas',
    'Michael Strand',
    'Mike Strand',
    'Myron Engle',
    'Nolan Arnold',
    'Phinehas Bynum',
    'Rich Graves',
    'Roberta Lembke',
    'Sean Tonko',
    'System',
    'Kristofer Rye',
    'Tim Isom',
    'Tony Skalski',
    'Wendy Woitalla',
]


def has_tech_note(note):
    return (note['isTechNote']
            # and not note['isHidden']
            and len(note['mobileNoteText']) > 10)


def is_staff_member(note):
    return responder_name(note) in staff


responder_name_regex = re.compile(r'.*<strong>(.+)<\/strong>.*', re.MULTILINE)
def responder_name(note):
    return re.sub(responder_name_regex, r'\1', note['prettyUpdatedString'])


def sort_responders(pair):
    name, count = pair
    return (count, name)


def count_responders():
    open_tickets = get_tickets('open')
    awaiting_client_tickets = get_tickets('awaiting client')
    closed_tickets = get_tickets('closed')
    tickets = flatten(open_tickets, awaiting_client_tickets, closed_tickets)

    counted = {}
    for t in tickets:
        if 'notes' not in t:
            continue
        responders = set()
        for n in t['notes']:
            if has_tech_note(n) and not is_staff_member(n):
                responders.add(responder_name(n))
        for name in responders:
            counted[name] = counted.get(name, 0) + 1

    sorted_by_count = sorted(counted.items(), key=sort_responders)

    top_responders = take(9, reversed(sorted_by_count))

    return list(top_responders)
