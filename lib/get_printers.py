# Created by Phinehas Bynum on 10/1/14.
# Ported to Python by Hawken Rives on 10/12/14.

from concurrent.futures import ThreadPoolExecutor
from subprocess import check_output, CalledProcessError, DEVNULL
from .data_helpers import save_data, load_data, needs_reload, lock_data, unlock_data
from .functions import group_by
from sys import stderr
from math import ceil
import time
import re

all_printers = [
    'mfc-bc110',
    'mfc-casualreading',
    'mfc-it',
    'mfc-crossroads',
    'mfc-dc204',
    'mfc-ellingson',
    'mfc-fireside',
    'mfc-hillkitt',
    'mfc-hoyme',
    'mfc-kierk',
    'mfc-kildahl',
    'mfc-larson',
    'mfc-mellby',
    'mfc-mohn',
    'mfc-pastor',
    'mfc-rand',
    'mfc-rml-1st',
    'mfc-rml115',
    'mfc-rml330',
    'mfc-rml433',
    'mfc-rml560',
    'mfc-rmlref',
    'mfc-rns-2nd',
    'mfc-rns258',
    'mfc-scilib',
    'mfc-skoglund',
    'mfc-thorson',
    'mfc-toh101',
    'mfc-toh3',
    'mfc-toh3-east',
    'mfc-toh3-west',
    'mfc-ytt118',
]

codes = {
    0x0: 'No Error',
    0x1: 'Fatal Error - Please Contact Service Technician',
    0x4: 'Paper Jam in Finisher',
    0xC: 'Paper Misfeed',
    0x40: 'Tray Empty',
    0x41: 'Tray Empty',
    0x44: 'Paper Misfeed in Printer',
    0x48: 'Tray Empty & Drawer Open',
    0x49: 'Tray 1 & 2 Empty; Tray 2 Open',
    0x4C: 'Paper Misfeed',
    0x80: 'No Error',
    0x81: 'Fuser Error',
    0x84: 'Paper Misfeed',
    0x85: 'Fuser Error',
    0x88: 'Cover Open',
    0x89: 'Fuser Error', # yes, yet another one
    0x8C: 'Paper Misfeed; Transport Unit Open; Duplexer Open',
    0xA0: 'Black Toner Near Empty',
    0xC0: 'Tray Empty',
    0xC1: 'Tray Empty',
    0xC8: 'Tray Empty & Drawer Open',
    0xCC: 'Paper Misfeed',
}

printer_base_url = '.printer.stolaf.edu'


def call_printer(url, numeric_path):
    try:
        cmd = ['snmpwalk', '-c', 'public', '-v', '2c', url, numeric_path]
        result = check_output(cmd, stderr=DEVNULL)
        result = result.decode('unicode_escape').strip().split(' = ')[-1]

        kind, value = result.split(': ')

        if kind == 'INTEGER':
            # there are some values that look like "idle(3)" or "other(1)"
            # which are not integers
            if '(' in value:
                return value
            return int(value)

        elif kind == 'Hex-STRING':
            return [int(ch, 16) for ch in value.split(" ")]

        elif kind == 'STRING':
            value = value.strip('"')
            return [ord(ch) for ch in value]

        return value

    except CalledProcessError as err:
        if err.returncode is 1:
            return ''
        else:
            raise err


def snmp_model(printer_url):
    model = call_printer(printer_url, '1.3.6.1.2.1.25.3.2.1.3.1')
    return model


def snmp_mfc_toner(printer_url):
    toner_level = call_printer(printer_url, '1.3.6.1.2.1.43.11.1.1.9.1.1')
    return int(toner_level) if toner_level else 100


def snmp_mfc_all_toner(printer_url):
    # needs work
    toner_level = call_printer(printer_url, '1.3.6.1.2.1.43.11.1.1.9.1')
    return toner_level


def snmp_status(printer_url):
    printer_status = call_printer(printer_url, '1.3.6.1.2.1.25.3.5.1.1')
    return printer_status


def snmp_status_code(printer_url):
    raw_code = call_printer(printer_url, '1.3.6.1.2.1.25.3.5.1.2')

    if len(raw_code) is 0:
        return 'Not Responding'
    elif len(raw_code) is not 1:
        raise ValueError(raw_code)

    code = raw_code[0]

    # Look up the code
    if code in codes:
        return codes[code]

    # Turn something like C0 into [67 32]
    str_code = ' '.join([hex(ch) for ch in raw_code])
    str_code = '[' + str_code.strip() + ']'

    return 'Unknown Code {}'.format(str_code)


def check_printer(printer_name):
    printer_url = printer_name + printer_base_url

    start = time.time()
    retval =  {
        'name': printer_name,
        'toner': snmp_mfc_toner(printer_url),
        'status': snmp_status(printer_url),
        'error': snmp_status_code(printer_url),
        # 'model': snmp_model(printer_url)
    }
    end = time.time()

    # print('{} took {} secs'.format(printer_name, end - start))

    return retval


def check_printers(printers):
    printer_info = []
    worker_count = ceil(len(printers)/2)
    # print('using {} workers'.format(worker_count))
    with ThreadPoolExecutor(max_workers=worker_count) as executor:
        for printer in executor.map(check_printer, printers):
            # print(printer)
            printer_info.append(printer)

    return printer_info


def check_all_printers():
    filename = 'printer-status.json'
    if not needs_reload(filename, minutes=5):
        return load_data(filename)

    lock_data(filename)
    data = check_printers(all_printers)
    save_data(filename, data)
    unlock_data(filename)

    return load_data(filename)


hidden_errors = [
    'No Error',
    'Paper Low',
    'Tray Empty',
    'Tray Empty & Drawer Open',
    'Drawer Open',
]


def group_printer_errors(printers=[], hidden_errors=hidden_errors):
    if not printers:
        printers = check_all_printers()

    # get toner levels before filtering error messages
    toner_warnings = [p for p in printers if int(p['toner']) < 5]
    for p in toner_warnings:
        p['name'] += " ({}%)".format(p['toner'])

    printers = [p for p in printers if p['error'] not in hidden_errors]
    data = group_by(lambda p: p['error'], printers)

    if toner_warnings:
        data['Low Toner (< 5%) [Replace below 2%]'] = toner_warnings

    if '' in data:
        del data['']

    return data
