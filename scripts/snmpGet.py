#!/usr/bin/env python

## Created by Phinehas Bynum on 10/1/14.
## Ported to Python by Hawken Rives on 10/12/14

from __future__ import print_function
from subprocess import check_output
import data_helpers
awk = '| awk \'NF>1{print $NF}\''

printerNames = [
	'mfc-bc110', 'mfc-casualreading',
	'mfc-crossroads', 'mfc-ellingson', 'mfc-fireside',
	'mfc-hh407', 'mfc-hillkitt', 'mfc-hoyme',
	'mfc-kierk', 'mfc-kildahl', 'mfc-larson',
	'mfc-mellby', 'mfc-mohn', 'mfc-om245',
	'mfc-pastor', 'mfc-rand', 'mfc-rml-1st',
	'mfc-rml115', 'mfc-rml330', 'mfc-rml386',
	'mfc-rml433', 'mfc-rml560', 'mfc-rmlref',
	'mfc-rns-2nd', 'mfc-rns258', 'mfc-rns358', 'mfc-scilib', 'mfc-thorson',
	'mfc-toh101', 'mfc-toh3', 'mfc-toh3-east',
	'mfc-toh3-west', 'mfc-ytt118']

printerBaseUrl = '.printer.stolaf.edu'
printerList = [{'name': printer, 'url': printer + printerBaseUrl} for printer in printerNames]

def snmpModel(printer_url):
	model = check_output('snmpwalk -c public -v 1 %s 1.3.6.1.2.1.25.3.2.1.3.1' % (printer_url), shell=True)
	return model.strip()


def snmpMFCToner(printer_url):
	toner_level = check_output('snmpwalk -c public -v 1 %s 1.3.6.1.2.1.43.11.1.1.9.1.1 %s' % (printer_url, awk), shell=True)
	return toner_level.strip()

def snmpMFCAllToner(printer_url):
	# needs work
	toner_level = check_output('snmpwalk -c public -v 1 %s 1.3.6.1.2.1.43.11.1.1.9.1 %s' % (printer_url, awk), shell=True)
	return toner_level.strip()


def snmpStatus(printer_url):
	printerStatus = check_output('snmpwalk -c public -v 1 %s 1.3.6.1.2.1.25.3.5.1.1 %s' % (printer_url, awk), shell=True)
	return printerStatus.strip()


def snmpStatusCode(printer_url):
	raw_code = check_output('snmpwalk -c public -v 1 %s 1.3.6.1.2.1.25.3.5.1.2 %s' % (printer_url, awk), shell=True)

	# Remove wrapping quotes, if present
	code = raw_code.strip()
	if len(code) is 0:
		return ""

	if (code[0] == code[-1]) and code.startswith('"'):
		code = code[1:-1]

	if len(code) is 1:
		if ord(code) is 200:
			code = '?'
		if ord(code) is 192:
			code = '@'

	codes = {
		'00': 'No Error',
		'0': 'Low Paper',
		'1': "No Paper",
		'2': "Low Toner",
		'3': "No Toner",
		'4': "Door Open",
		'5': "Printer Jammed",
		'6': "Printer Offline",
		'7': "Service Requested",
		'8': "Input Tray Missing",
		'9': "Output Tray Missing",
		'10': "Marker Supply Missing",
		'11': "Output Tray Nearly Full",
		'12': "Output Tray Full",
		'13': "Input Tray Empty",
		'14': "Preventative Maintenance Overdue",
		# TOSHIBA printers have compound status codes based on
		# paper_empty, paper_nearly_empty, and paper_available.
		# We don't care. All of these will print as "paper_empty" for our purposes.
		'@': "Tray 1 Empty",
		'?': "Tray 2 Empty",
		'H': "Drawer Open",
		'C': "Drawer Open",
		'C8': "Drawer Open",
		'C0': "Tray 1 Empty",
		'C1': "Tray 1 Empty",
		'80': "Paper Low",
		'88': "Toner Door Open (we think)",
		'04': "Paper Misfeed",
		'A0': "Black Toner Low",
		'A': "Tray 2 Empty",
		'L': "Paper Misfeed in Finisher",
		'I': "Fuser Error (Call EO Johnson)",
		'05': "Fuser Error (Call EO Johnson)",
		'85': "Fuser Error (Call EO Johnson)",
		'01': "Fatal Error (Call EO Johnson)",
		'84': "Open the front door, and clean the slit glass and main charger"
	}

	if code in codes:
		return codes[code]

	# Turn something like C0 into [67 32]
	raw_code = ''
	for ch in code:
		raw_code += str(ord(ch)) + ' '
	raw_code = raw_code.strip()
	raw_code = '[' + raw_code + ']'

	return 'Unknown Code ' + code + ' (raw list: ' + raw_code + ')'


def main():
	if not data_helpers.needs_reload('data/printer-status.json', minutes=5):
		return ""

	for printer in printerList:
		# printer['model']  = snmpModel(printerName)
		printer['toner']  = snmpMFCToner(printer['url'])
		printer['status'] = snmpStatus(printer['url'])
		printer['error']  = snmpStatusCode(printer['url'])

	data_helpers.save_data('data/printer-status.json', printerList)

if __name__ == '__main__':
	main()
