import socket
import sys

TCP_IP = '130.71.96.26'
TCP_PORT = 56906
BUFFER_SIZE = 1024
MESSAGE = ''

MESSAGE = sys.stdin.read().strip()

MESSAGE = MESSAGE.encode('utf-8')

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((TCP_IP, TCP_PORT))
s.send(MESSAGE)
resp = s.recv(BUFFER_SIZE)
s.close()

print(resp)
