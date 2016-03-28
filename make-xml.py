from lib.tightrope import create_page, delete_page, clear_pages, send_page
from lib.data_helpers import get_userpass_pair
from argparse import ArgumentParser


def main():
    parser = ArgumentParser(description='Generate XML files for Tightrope')
    parser.add_argument('--create-page', action='store_true', default=False)
    parser.add_argument('--delete-page', action='store', default=False)
    parser.add_argument('--clear-pages', action='store_true', default=False)
    parser.add_argument('--send', action='store_true', default=False)
    args = parser.parse_args()

    credentials = get_userpass_pair('tightrope')

    if args.create_page:
        page = create_page(credentials)
    elif args.delete_page:
        page = delete_page(credentials, args.delete_page)
    elif args.clear_pages:
        page = clear_pages(credentials)
    else:
        print('python3 make-xml.py [--create-page|--delete-page|--clear-pages]')
        sys.exit(1)

    if args.send:
        print(send_page(page))
    else:
        print(page)



if __name__ == '__main__':
    main()
