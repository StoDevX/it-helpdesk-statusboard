from lib.tightrope import send_page

def main():
	page = sys.stdin.read().strip()
	resp = send_page(page)
	print(resp)

if __name__ == '__main__':
	main()
