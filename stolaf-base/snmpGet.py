#!/usr/bin/env python2

## Created by Phinehas Bynum on 10/1/14.
## Ported to Python by Hawken Rives on 10/12/14

from subprocess import check_output as output

printerList = [
	'mfc-bc110', 'mfc-bc147', 'mfc-casualreading',
	'mfc-crossroads', 'mfc-ellingson', 'mfc-fireside',
	'mfc-hh407', 'mfc-hillkitt', 'mfc-hoyme',
	'mfc-kierk', 'mfc-kildahl', 'mfc-larson',
	'mfc-mellby', 'mfc-mohn', 'mfc-om245',
	'mfc-pastor', 'mfc-rand', 'mfc-rml-1st',
	'mfc-rml115', 'mfc-rml330', 'mfc-rml386',
	'mfc-rml433', 'mfc-rml560', 'mfc-rmlref',
	'mfc-rns-2nd', 'mfc-rns258', 'mfc-rns358',
	'mfc-sac', 'mfc-scilib', 'mfc-thorson',
	'mfc-toh101', 'mfc-toh3', 'mfc-toh3-east',
	'mfc-toh3-west', 'mfc-ytt118']

def snmpModel(printer):
	return output('snmpwalk -c public -v 1 ' + printer+'.printer.stolaf.edu 1.3.6.1.2.1.25.3.2.1.3.1', shell=True)


def snmpMFCToner(printer):
	return output('snmpwalk -c public -v 1 '+printer+'.printer.stolaf.edu 1.3.6.1.2.1.43.11.1.1.9.1.1 | awk \'NF>1{print $NF}\'', shell=True)


def snmpStatus(printer):
	return output('snmpwalk -c public -v 1 '+printer+'.printer.stolaf.edu 1.3.6.1.2.1.25.3.5.1.1 | awk \'NF>1{print $NF}\'', shell=True)


def snmpStatusCode(printer):
	code = output('snmpwalk -c public -v 1 '+printer+'.printer.stolaf.edu 1.3.6.1.2.1.25.3.5.1.2 | awk \'NF>1{print $NF}\'', shell=True)

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
		'80': "Paper Low"
	}

	if code in codes:
		return codes[code]

	return 'Unknown Code ' + code


def main():
	print "Printer,Toner,Status,Error"
	for printerName in printerList:
		# model = snmpModel(printerName)
		toner = snmpMFCToner(printerName)
		status = snmpStatus(printerName)
		code = snmpStatusCode(printerName)
		print '%s,%s,%s,%s' % (printerName, toner, status, code)

if __name__ == '__main__':
	main()
