from .collect_data import collect
from xml.sax.saxutils import escape
from datetime import datetime, timedelta
import socket

def clear_pages_xml(data):
    return '''
    <?xml version="1.0" encoding="utf-8"?>
    <CarouselCommand xmlns="http://www.trms.com/CarouselRemoteCommand">
        <DeleteAllUserPages>
                <UserName>%(username)s</UserName>
                <Password>%(password)s</Password>
        </DeleteAllUserPages>
    </CarouselCommand>
    ''' % data


def delete_page_xml(data):
    return '''
    <?xml version="1.0" encoding="utf-8"?>
    <CarouselCommand xmlns="http://www.trms.com/CarouselRemoteCommand">
        <DeletePage>
                <UserName>%(username)s</UserName>
                <Password>%(password)s</Password>
                <GUID>%(guid)s</GUID>
        </DeletePage>
    </CarouselCommand>
    ''' % data


def create_page_xml(data):
    for key, value in data.items():
        if type(value) == 'str':
            value = escape(value)
    
    on_time = datetime.now()
    off_time = on_time + timedelta(minutes=5)

    data['on'] = on_time.strftime('%Y-%m-%dT%H:%M:%S')
    data['off'] = off_time.strftime('%Y-%m-%dT%H:%M:%S')

    return '''
    <?xml version="1.0" encoding="utf-8"?>
    <CarouselCommand xmlns="http://www.trms.com/CarouselRemoteCommand">
        <CreatePage>
            <UserName>%(username)s</UserName>
            <Password>%(password)s</Password>

            <ZoneSet>
                <ZoneID>1073</ZoneID>
            </ZoneSet>

            <AlwaysOn>false</AlwaysOn>
            <DateTimeOn>%(on)s</DateTimeOn>
            <DateTimeOff>%(off)s</DateTimeOff>
            <DisplayDuration>60</DisplayDuration>

            <PageType>Standard</PageType>

            <PageTemplate>
                <TemplateName>Helpdesk Status</TemplateName>

                <Block Name="Body-Printers" Value="%(printers)s" />

                <Block Name="Body-Now at HD" Value="%(now_helpdesk_name)s" />
                <Block Name="Body-Now at TCAR" Value="%(now_tcar_name)s" />
                <Block Name="Time-Next at HD" Value="( %(next_helpdesk_time)s )" />
                <Block Name="Body-Next at HD" Value="%(next_helpdesk_name)s" />
                <Block Name="Time-Next at TCAR" Value="( %(next_tcar_time)s )" />
                <Block Name="Body-Next at TCAR" Value="%(next_tcar_name)s" />

                <Block Name="Body-Open Tickets" Value="%(open_tickets)d" />
                <Block Name="Body-Unanswered Tix" Value="%(unanswered_tickets)d" />
            </PageTemplate>
        </CreatePage>
    </CarouselCommand>
    ''' % data



def create_page(credentials):
    data = collect(credentials)
    return create_page_xml(data)


def delete_page(credentials, guid):
    username, password = credentials
    data = {'username': username, 'password': password, 'guid': guid}
    return delete_page_xml(data)

def clear_pages(credentials):
    username, password = credentials
    return clear_pages_xml({'username': username, 'password': password})


def send_page(page):
    TCP_IP = '130.71.96.26'
    TCP_PORT = 56906
    BUFFER_SIZE = 1024

    MESSAGE = page.encode('utf-8')

    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect((TCP_IP, TCP_PORT))
    s.send(MESSAGE)
    resp = s.recv(BUFFER_SIZE)
    s.close()

    return resp.decode()
