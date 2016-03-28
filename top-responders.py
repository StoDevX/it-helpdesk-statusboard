from lib.count_responders import count_responders
from argparse import ArgumentParser
import json

if __name__ == '__main__':
    parser = ArgumentParser(description='Find the top helpdesk responders')
    parser.add_argument('--json', action='store_true', default=False)
    args = parser.parse_args()

    responders = count_responders()
    if args.json:
        print(json.dumps(responders))
    else:
        for responder in responders:
            print("{1} {0}".format(*responder))
