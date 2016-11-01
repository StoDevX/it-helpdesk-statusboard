from .get_tickets import get_tickets
from .functions import flatten, group_by, take
import re

staff = [
    'Andy Prehall',
    'Ben Gottfried',
    'Bob Breid',
    'Craig Rice',
    'Dan Beach',
    'Dana Thompson',
    'Doug Hamilton',
    'Ezra Plemons',
    'Heather Malecha',
    'Jason Menard',
    'Jeff Dixon',
    'Jennie Moberg',
    'Kelly Kloos',
    'Marc Thomas',
    'Michael Strand',
    'Myron Engle',
    'Nolan Arnold',
    'Phinehas Bynum',
    'Rich Graves',
    'Roberta Lembke',
    'Sean Tonko',
    'System',
    'Tim Isom',
    'Tony Skalski',
    'Wendy Woitalla',
    'Derek Hanson',
    'Cathie Skluzacek',
    'Kurtis Gibson',
]


def has_tech_note(note):
    return (note['isTechNote']
            and not note['isHidden']
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

    all_notes = flatten([t['notes'] for t in tickets if 'notes' in t])
    tech_notes = [n for n in all_notes if has_tech_note(n)]
    only_helpdesker_notes = [n for n in tech_notes if not is_staff_member(n)]
    grouped_by_responder = group_by(responder_name, only_helpdesker_notes)
    counted = {name: len(responses)
               for name, responses in grouped_by_responder.items()}

    sorted_by_count = sorted(counted.items(), key=sort_responders)

    top_responders = take(9, reversed(sorted_by_count))

    return list(top_responders)
