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
        print('Now:')
        for person in shifts['now']:
            print(f"{person['location']}: {person['name']}")

        print()

        print('Later:')
        for person in shifts['later']:
            print(f"{person['location']}: {person['name']}, {person['time']}")


if __name__ == '__main__':
    main()
