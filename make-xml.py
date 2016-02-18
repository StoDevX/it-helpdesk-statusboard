from lib.tightrope import create_page, delete_page, clear_pages
from lib.data_helpers import get_userpass_pair
from argparse import ArgumentParser


def main():
    parser = ArgumentParser(description='Generate XML files for Tightrope')
    parser.add_argument('--create-page', action='store_true', default=False)
    parser.add_argument('--delete-page', action='store', default=False)
    parser.add_argument('--clear-pages', action='store_true', default=False)
    args = parser.parse_args()

    credentials = get_userpass_pair('tightrope')

    if args.create_page:
        print(create_page(credentials))
    elif args.delete_page:
        print(delete_page(credentials, args.delete_page))
    elif args.clear_pages:
        print(clear_pages(credentials))
    else:
        assert False, 'no argument given'


if __name__ == '__main__':
    main()
