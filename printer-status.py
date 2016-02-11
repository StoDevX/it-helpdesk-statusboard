from lib.get_printers import check_printers, check_all_printers
from sys import argv


def main():
    if len(argv) > 1:
        results = check_printers(argv[1:])
    else:
        results = check_all_printers()

    for result in results:
        print('%(name)s: %(error)s (%(toner)s%%)' % result)


if __name__ == '__main__':
    main()
