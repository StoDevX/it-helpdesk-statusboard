from .functions import group_by, take, first
from .count_unanswered_tickets import count_unanswered_tickets
from .count_open_tickets import count_open_tickets
from .get_shifts import get_shifts
from .get_printers import group_printer_errors


def format_printer_errors(printers):
    printer_count = 8
    string = ''
    for error, printer_list in printers.items():
        string += error + '\\n'
        string += ', '.join([p['name'] for p in take(printer_count, printer_list)])
        string += '\\n\\n'
    if len(string) is 0:
        return 'No Problems'
    return string


def get_first_shift(shifts):
    grouped = group_by(lambda s: s['start_time'], shifts)
    s = sorted(grouped.items(), key=lambda k: k[0])

    if s:
        # the first shift, and the shifts, not the time.
        return s[0][1]

    return []



def collect():
    unanswered_ticket_count = count_unanswered_tickets()
    open_ticket_count = count_open_tickets()
    printers = group_printer_errors()
    shifts = get_shifts()

    now_on_helpdesk = [s['name'] for s in shifts['now'] if s['location'] == 'Helpdesk']
    now_on_tcar = [s['name'] for s in shifts['now'] if s['location'] == 'TCAR']

    next_on_helpdesk = get_first_shift([s for s in shifts['later'] if s['location'] == 'Helpdesk'])
    next_on_tcar = get_first_shift([s for s in shifts['later'] if s['location'] == 'TCAR'])

    next_helpdesk_names = [s['name'] for s in next_on_helpdesk]
    next_tcar_names = [s['name'] for s in next_on_tcar]

    next_helpdesk_time = first(next_on_helpdesk, {}).get('time', '')
    next_tcar_time = first(next_on_tcar, {}).get('time', '')
    # print(next_on_tcar, first(next_on_tcar, {}))

    return {
        'printers': format_printer_errors(printers),
        'now_helpdesk_name': '\\n'.join(now_on_helpdesk) or 'No one is currently scheduled',
        'now_tcar_name': '\\n'.join(now_on_tcar) or 'No one is currently scheduled',
        'next_helpdesk_time': next_helpdesk_time,
        'next_helpdesk_name': '\\n'.join(next_helpdesk_names) or 'No more shifts scheduled',
        'next_tcar_time': next_tcar_time,
        'next_tcar_name': '\\n'.join(next_tcar_names) or 'No more shifts scheduled',
        'open_tickets': open_ticket_count,
        'unanswered_tickets': unanswered_ticket_count,
    }
