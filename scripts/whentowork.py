from __future__ import print_function
import subprocess
import data_helpers

def get_link_from_wtw_redirect_page(page_content):
	link_start_pattern = '<a HREF="'
	link_start_index = page_content.find(link_start_pattern) + len(link_start_pattern)
	link_end_index = page_content.find('">', link_start_index)
	return page_content[link_start_index:link_end_index].replace('&amp;', '&')


def get_sid_from_homepage_link(homepage_link):
	pattern = '/home?SID='
	sid_start_index = homepage_link.find(pattern) + len(pattern)
	return homepage_link[sid_start_index:]


def main():
	if not data_helpers.needs_reload('data/whentowork.json', if_minutes_since_last_load=60):
		return ""


	credentials = []
	with open('common/whentowork.credential', 'r') as when_to_work_credentials:
		credentials = when_to_work_credentials.read().split('\n')


	base_headers = ' '.join([
		"-H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:32.0) Gecko/20100101 Firefox/32.0'",
		"-H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'",
		"-H 'Accept-Language: en-US,en;q=0.5'",
		"-H 'Accept-Encoding: gzip, deflate'",
		"-H 'Referer: https://whentowork.com/logins.htm'",
		"-H 'Connection: keep-alive'",
	])


	login_curl = ' '.join([
		"curl --silent 'https://whentowork.com/cgi-bin/w2w.dll/login'",
		"-H 'Host: whentowork.com'", base_headers,
		"--data 'NAS_id=76003&name=signin&UserId1="+credentials[0]+"&Password1="+credentials[1]+"&Submit1=Sign-In+Now'"
	])
	login_redirect = subprocess.check_output(login_curl, shell=True)
	redirect_link = get_link_from_wtw_redirect_page(login_redirect)


	redirect_to_homepage_curl = ' '.join([
		"curl --silent '" + redirect_link + "'",
		"-H 'Host: www3.whentowork.com'", base_headers
	])
	redirect_to_homepage = subprocess.check_output(redirect_to_homepage_curl, shell=True)


	homepage_link = get_link_from_wtw_redirect_page(redirect_to_homepage)
	SID = get_sid_from_homepage_link(homepage_link)


	whos_on_later_curl = "curl --silent 'https://www3.whentowork.com/cgi-bin/w2wC.dll/empwhosonlater.htm?SID=" + SID + "'"
	whos_on_later_page = subprocess.check_output(whos_on_later_curl, shell=True)


	data_helpers.save_data('data/whentowork.json', whos_on_later_page)

if __name__ == '__main__':
	main()
