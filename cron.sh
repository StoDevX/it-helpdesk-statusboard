#!/bin/bash

cd /Users/admin/Library/Application\ Support/Übersicht/widgets
/usr/local/bin/python3 make-xml.py --clear-pages --send 2>&1 > cron.log
/usr/local/bin/python3 make-xml.py --create-page --send 2>&1 >> cron.log
