from lib.tightrope import create_page, delete_page, clear_pages
from argparse import ArgumentParser


def get_credentials():
    # returns ['username', 'password']
    with open('credentials/tightrope.credential', 'r') as credentials:
        return credentials.read().split('\n')[0:2]


def main():
    parser = ArgumentParser(description='Generate XML files for Tightrope')
    parser.add_argument('--create-page', action='store_true', default=False)
    parser.add_argument('--delete-page', action='store', default=False)
    parser.add_argument('--clear-pages', action='store_true', default=False)
    args = parser.parse_args()

    credentials = get_credentials()

    if args.create_page:
        print(create_page(credentials))
    elif args.delete_page:
        print(delete_page(credentials, args.delete_page))
    elif args.clear_pages:
        print(clear_pages(credentials))
    else:
        raise Error('no argument given')


if __name__ == '__main__':
    main()
