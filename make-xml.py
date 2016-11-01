from lib.tightrope import create_pages, delete_page, clear_pages, send_page
from lib.data_helpers import get_userpass_pair
from argparse import ArgumentParser
import sys


def main():
    parser = ArgumentParser(description='Generate XML files for Tightrope')
    parser.add_argument('--create-page', action='store_true', default=False)
    parser.add_argument('--delete-page', action='store', default=False)
    parser.add_argument('--clear-pages', action='store_true', default=False)
    parser.add_argument('--send', action='store_true', default=False)
    args = parser.parse_args()

    credentials = get_userpass_pair('tightrope')

    pages = []
    if args.create_page:
        pages = create_pages(credentials)
    elif args.delete_page:
        pages = [delete_page(credentials, args.delete_page)]
    elif args.clear_pages:
        pages = [clear_pages(credentials)]
    else:
        print('python3 make-xml.py [--create-page|--delete-page|--clear-pages] [--send]')
        sys.exit(1)

    if args.send:
        replies = [send_page(p) for p in pages]
    else:
        [print(p) for p in pages]


if __name__ == '__main__':
    main()
