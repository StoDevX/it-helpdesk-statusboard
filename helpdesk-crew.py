from lib.get_shifts import get_shifts
from argparse import ArgumentParser
import json

def main():
    parser = ArgumentParser(description='Show the helpdesk crew')
    parser.add_argument('--json', action='store_true', default=False)
    args = parser.parse_args()

    shifts = get_shifts()

    if args.json:
        print(json.dumps(shifts))
    else:
        print('Now @ Helpdesk:')
        print('Now @ TCAR:')
        print('Next @ Helpdesk:')
        print('Next @ TCAR:')
        print(json.dumps(shifts))


if __name__ == '__main__':
    main()
