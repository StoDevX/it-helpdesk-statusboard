from lib.count_open_tickets import count_open_tickets
import sys

if __name__ == '__main__':
    try:
        print(count_open_tickets())
    except Exception as e:
        print(e, file=sys.stderr)
