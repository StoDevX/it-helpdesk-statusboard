from __future__ import print_function
import subprocess
import data_helpers


base_headers = ' '.join([
	"-H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:32.0) Gecko/20100101 Firefox/32.0'",
	"-H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'",
	"-H 'Accept-Language: en-US,en;q=0.5'",
	"-H 'Accept-Encoding: gzip, deflate'",
	"-H 'Referer: https://whentowork.com/logins.htm'",
	"-H 'Connection: keep-alive'",
])


def get_link_from_wtw_redirect_page(page_content):
	link_start_pattern = '<a HREF="'
	link_start_index = page_content.find(link_start_pattern) + len(link_start_pattern)
	link_end_index = page_content.find('">', link_start_index)
	return page_content[link_start_index:link_end_index].replace('&amp;', '&')


def get_sid_from_homepage_link(homepage_link):
	pattern = '/home?SID='
	sid_start_index = homepage_link.find(pattern) + len(pattern)
	return homepage_link[sid_start_index:]


def get_credentials():
	# returns ['username', 'password']
	with open('common/whentowork.credential', 'r') as when_to_work_credentials:
		return when_to_work_credentials.read().split('\n')


def get_login_page(credentials):
	curl_request = ' '.join([
		"curl --silent 'https://whentowork.com/cgi-bin/w2w.dll/login'",
		"-H 'Host: whentowork.com'", base_headers,
		"--data 'NAS_id=76003&name=signin&UserId1="+credentials[0]+"&Password1="+credentials[1]+"&Submit1=Sign-In+Now'"
	])
	page = subprocess.check_output(curl_request, shell=True)
	return page


def get_redirect_page(redirect_link):
	curl_request = ' '.join([
		"curl --silent '" + redirect_link + "'",
		"-H 'Host: www3.whentowork.com'", base_headers
	])
	page = subprocess.check_output(curl_request, shell=True)
	return page


def get_whos_on_later_page(SID):
	curl_request = "curl --silent 'https://www3.whentowork.com/cgi-bin/w2wC.dll/empwhosonlater.htm?SID=" + SID + "'"
	page = subprocess.check_output(curl_request, shell=True)
	return page


def get_whos_on_now_page(SID):
	curl_request = "curl --silent 'https://www3.whentowork.com/cgi-bin/w2wC.dll/empwhosonnow.htm?SID=" + SID + "'"
	page = subprocess.check_output(curl_request, shell=True)
	return page


def main():
	if not data_helpers.needs_reload('data/whentowork.json', hours=1): return ""

	credentials = get_credentials()
	login_page = get_login_page(credentials)
	login_redirect_link = get_link_from_wtw_redirect_page(login_page)
	redirect_page = get_redirect_page(login_redirect_link)

	homepage_link = get_link_from_wtw_redirect_page(redirect_page)
	SID = get_sid_from_homepage_link(homepage_link)

	whos_on_later_page = get_whos_on_later_page(SID)
	whos_on_now_page = get_whos_on_now_page(SID)

	data_helpers.save_data('data/whentowork.json',
		{'later': whos_on_later_page, 'now': whos_on_now_page})

if __name__ == '__main__':
	main()
