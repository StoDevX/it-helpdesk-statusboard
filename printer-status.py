from lib.get_printers import check_printers, check_all_printers
from argparse import ArgumentParser
import json

if __name__ == '__main__':
    parser = ArgumentParser(description='Get the status of campus printers')
    parser.add_argument('--json', action='store_true', default=False)
    parser.add_argument('printer', nargs='*', action='store', default=[])
    args = parser.parse_args()

    if args.printer:
        results = check_printers(args.printer)
    else:
        results = check_all_printers()

    if args.json:
        print(json.dumps(results))
    else:
        for result in results:
            print('%(name)s: %(error)s (%(toner)s%%)' % result)
