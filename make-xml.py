from xml.dom.minidom import Document
from lib.functions import group_by, take, first
from lib.count_unanswered_tickets import count_unanswered_tickets
from lib.count_open_tickets import count_open_tickets
from lib.get_shifts import get_shifts
from lib.get_printers import check_all_printers


def get_credentials():
    # returns ['username', 'password']
    with open('credentials/tightrope.credential', 'r') as credentials:
        return credentials.read().split('\n')[0:2]


def to_xml(data):
    return '''<CarouselCommand xmlns="http://www.trms.com/CarouselRemoteCommand">
    <CreatePage>
        <UserName>%(username)s</UserName>
        <Password>%(password)s</Password>

        <ZoneSet>
            <ZoneID>1073</ZoneID>
        </ZoneSet>

        <AlwaysOn>true</AlwaysOn>

        <PageType>Standard</PageType>

        <PageTemplate>
            <TemplateName>Helpdesk Status</TemplateName>

            <Block Name="Body-Printers" Value="%(printers)s" />

            <Block Name="Body-Now at HD" Value="%(now_helpdesk_name)s" />
            <Block Name="Body-Now at TCAR" Value="%(now_tcar_name)s" />
            <Block Name="Time-Next at HD" Value="⟨ %(next_helpdesk_time)s ⟩" />
            <Block Name="Body-Next at HD" Value="%(next_helpdesk_name)s" />
            <Block Name="Time-Next at TCAR" Value="⟨ %(next_tcar_time)s ⟩" />
            <Block Name="Body-Next at TCAR" Value="%(next_tcar_name)s" />

            <Block Name="Body-Open Tickets" Value="%(open_tickets)d" />
            <Block Name="Body-Unanswered Tix" Value="%(unanswered_tickets)d" />
        </PageTemplate>
    </CreatePage>
</CarouselCommand>''' % data


def group_printer_errors(printers):
    hidden_errors = [
        'No Error',
        'Paper Low',
        'Tray 1 Empty',
        'Tray 2 Empty',
        'Drawer Open',
    ]

    printers = [p for p in printers if p['error'] not in hidden_errors]
    data = group_by(lambda p: p['error'], printers)

    not_responding = [p for p in printers if p['error'] == '']
    if not_responding:
        data['Not Responding'] = not_responding
    toner = [p for p in printers if int(p['toner']) < 5]
    if toner:
        data['Low Toner (< 5%) [Replace]'] = toner

    return data


def format_printer_errors(printers):
    grouped = group_printer_errors(printers)
    string = ''
    for error, printers in grouped.items():
        string += error + '\\n'
        string += ', '.join([p['name'] for p in printers])
    if len(string) is 0:
        return 'No Problems'
    return string


def collect():
    username, password = get_credentials()

    printers = check_all_printers()
    shifts = get_shifts()
    open_ticket_count = count_open_tickets()
    unanswered_ticket_count = count_unanswered_tickets()

    now_on_helpdesk = [s['name'] for s in shifts['now'] if s['location'] == 'Helpdesk']
    now_on_tcar = [s['name'] for s in shifts['now'] if s['location'] == 'TCAR']

    next_on_helpdesk = [s for s in shifts['later'] if s['location'] == 'Helpdesk']
    next_on_tcar = [s for s in shifts['later'] if s['location'] == 'TCAR']

    next_helpdesk_names = [s['name'] for s in next_on_helpdesk]
    next_tcar_names = [s['name'] for s in next_on_tcar]

    next_helpdesk_time = first(next_on_helpdesk, {}).get('time', '')
    next_tcar_time = first(next_on_tcar, {}).get('time', '')

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
        'username': username,
        'password': password,
    }


def main():
    print(to_xml(collect()))


if __name__ == '__main__':
    main()
