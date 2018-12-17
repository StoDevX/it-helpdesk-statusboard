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
    'mfc-crossroads',
    'mfc-cad204',
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
    'mfc-rml-3-artgallery',
    'mfc-rml-4-disco',
    'mfc-rml-openstudyspace',
    'mfc-rml115',
    'mfc-rml330',
    'mfc-rml560',
    'mfc-rns-2nd',
    'mfc-skoglund',
    'mfc-thorson',
    'mfc-toh101',
    'mfc-toh3',
    'mfc-toh3-east',
    'mfc-toh3-west',
    'mfc-ytt118',
]

# If you see an Unknown Code, the easiest way to figure out how it should be
# defined is to browse to:
# http://<all_printers['theprintername']>.printer.stolaf.edu.
codes_by_model = {
    'TOSHIBA e-STUDIO506': {
        0x0: 'No Error',
        0x1: 'Fatal Error - Please Contact Service Technician',
        0x4: 'Paper Jam in Finisher',
        0xC: 'Paper Misfeed',
        0x10: 'Toner Empty',
        0x20: 'Color Toner Near Empty',
        0x40: 'Tray Empty',
        0x41: 'Tray Empty',
        0x44: 'Paper Misfeed in Printer',
        0x45: 'Paper Insertion Misfeed',
        0x48: 'Tray Empty & Drawer Open',
        0x49: 'Tray 1 & 2 Empty & Tray 2 Open',
        0x4C: 'Paper Misfeed',
        0x4D: 'Tray 1 & 2 Empty',
        0x60: 'Tray 1 Empty & Toner Low',
        0x80: 'No Error', # yes, that's an error
        0x81: 'Fuser Error',
        0x84: 'Paper Misfeed',
        0x85: 'Fuser Error',
        0x88: 'Cover Open',
        0x89: 'Fuser Error', # yes, yet another one
        0x8C: 'Paper Misfeed; Transport Unit Open; Duplexer Open',
        0xA0: 'Some Toner Near Empty',
        0xC0: 'Tray Empty',
        0xC1: 'Tray Empty',
        0xC8: 'Tray Empty & Drawer Open',
        0xCC: 'Paper Misfeed',
        0xC9: 'Fuser Error',
        0xE0: 'Tray Empty & Toner Low',
    },
    'TOSHIBA e-STUDIO5008A': {
        0x80: 'No Error',
        0x81: 'No Error',
    },
    'TOSHIBA e-STUDIO4505AC': {
        0x80: 'No Error',
        0x81: 'No Error',
    },
}

hidden_errors = [
    'No Error',
    'Paper Low',
    'Tray Empty',
    'Drawer Open',
    'Tray Empty & Drawer Open',
    'Tray 1 & 2 Empty & Tray 2 Open',
]

printer_base_url = '.printer.stolaf.edu'


def call_printer(url, numeric_path, as_string=False):
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

        elif kind == 'STRING' and not as_string:
            value = value.strip('"')
            return [ord(ch) for ch in value]

        return value

    except CalledProcessError as err:
        if err.returncode is 1:
            return ''
        else:
            raise err


def snmp_model(printer_url):
    model = call_printer(printer_url, '1.3.6.1.2.1.25.3.2.1.3.1', as_string=True)
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
    model = snmp_model(printer_url)

    if len(raw_code) is 0:
        return 'Not Responding'
    elif len(raw_code) is not 1:
        raise ValueError(raw_code)

    code = raw_code[0]

    # Look up the code
    if model in codes_by_model:
        codes = codes_by_model[model]
        if code in codes:
            return codes[code]

    # Turn something like C0 into [67 32]
    str_code = ' '.join([hex(ch) for ch in raw_code])

    return f'Unknown Code [{str_code.strip()}] for {model}'


def check_printer(printer_name):
    printer_url = printer_name + printer_base_url

    start = time.time()
    retval =  {
        'name': printer_name,
        'toner': snmp_mfc_toner(printer_url),
        'status': snmp_status(printer_url),
        'error': snmp_status_code(printer_url),
    }
    retval['duration'] = f'{time.time() - start:0.02}s'

    return retval


def check_printers(printers):
    worker_count = ceil(len(printers)/2)
    with ThreadPoolExecutor(max_workers=worker_count) as executor:
        for printer in executor.map(check_printer, printers):
            yield printer


def check_all_printers():
    filename = 'printer-status.json'
    if not needs_reload(filename, minutes=5):
        return load_data(filename)

    lock_data(filename)
    data = list(check_printers(all_printers))
    save_data(filename, data)
    unlock_data(filename)

    return load_data(filename)


def group_printer_errors(printers=[], hidden_errors=hidden_errors):
    if not printers:
        printers = check_all_printers()

    # get toner levels before filtering error messages
    toner_warnings = [p for p in printers if int(p['toner']) < 5]
    for p in toner_warnings:
        p['name'] += f" ({p['toner']}%)"

    printers = [p for p in printers if p['error'] not in hidden_errors]
    data = group_by(lambda p: p['error'], printers)

    if toner_warnings:
        data['Low Toner (< 5%) [Replace below 2%]'] = toner_warnings

    if '' in data:
        del data['']

    return data
