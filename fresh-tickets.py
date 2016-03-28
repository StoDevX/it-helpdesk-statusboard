from lib.list_tickets import list_tickets
from argparse import ArgumentParser
import json

if __name__ == '__main__':
    parser = ArgumentParser(description='Find the top helpdesk responders')
    parser.add_argument('--json', action='store_true', default=False)
    parser.add_argument('--count', action='store', default=7, type=int)
    args = parser.parse_args()

    tickets = list_tickets(args.count)
    if args.json:
        print(json.dumps(tickets))
    else:
        for ticket in tickets:
            print(ticket)
