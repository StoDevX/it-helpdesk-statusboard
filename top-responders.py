from lib.count_responders import count_responders
from argparse import ArgumentParser
import json
import sys

def main():
    parser = ArgumentParser(description='Find the top helpdesk responders')
    parser.add_argument('--json', action='store_true', default=False)
    args = parser.parse_args()

    try:
        responders = count_responders()
    except Exception as e:
        print(e, file=sys.stderr)
        return

    if args.json:
        print(json.dumps(responders))
    else:
        for responder in responders:
            print("{1} {0}".format(*responder))

if __name__ == '__main__':
    main()
