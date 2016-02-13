from lib.get_shifts import get_shifts
from argparse import ArgumentParser
import json

if __name__ == '__main__':
    parser = ArgumentParser(description='Show the helpdesk crew')
    parser.add_argument('--json', action='store_true', default=False)
    args = parser.parse_args()

    if args.json:
        print(json.dumps(get_shifts()))
    else:
        print('Now @ Helpdesk:')
        print('Now @ TCAR:')
        print('Next @ Helpdesk:')
        print('Next @ TCAR:')
        print(json.dumps(get_shifts()))
