from __future__ import print_function
import json
import sys
from subprocess import check_output
import data_helpers

def get_credentials():
	# returns 'api-key'
	with open('credentials/webhelpdesk.credential', 'r') as credentials:
		return credentials.read()

def main():
	if len(sys.argv) >= 2:
		statustype = sys.argv[1]
		filename = statustype.lower() + '-tickets.json'
	else:
		exit(1)

	whd_tickets = 'https://help.stolaf.edu/helpdesk/WebObjects/Helpdesk.woa/ra/Tickets'
	apiKey = get_credentials()
	params = '?style=details&limit=50&qualifier=(statustype.statusTypeName%3D%27'+statustype.title()+'%27)&apiKey='+apiKey

	if not data_helpers.needs_reload(filename, minutes=1):
		return ""

	tickets = check_output('curl --silent "%s"' % (whd_tickets+params), shell=True)

	data_helpers.save_data(filename, json.loads(tickets))

if __name__ == '__main__':
	main()
