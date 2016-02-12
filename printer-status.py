from lib.get_printers import check_printers, check_all_printers
from sys import argv
import json

if __name__ == '__main__':
    if argv[0] == '--json':
        json = True

    if len(argv) > 1:
        results = check_printers(argv[1:])
    else:
        results = check_all_printers()

    if not json:
        for result in results:
            print('%(name)s: %(error)s (%(toner)s%%)' % result)
    else:
        print(json.dumps(results))
