stolaf-ubersicht-widgets
========================

[Übersicht](http://tracesof.net/uebersicht/) widgets for St. Olaf helpdesk monitor.

## Widgets so far:
- Fresh Tickets, a list of the last 7 tickets to update.
- Unanswered Tickets, a count of the tickets without any client-visible notes.
- Next @Helpdesk, a display of the next shift's workers.
- Top Responders, a list of the top responders to tickets over the last 50 open and closed, excluding the staff.
- Ticket Priority, a count of tickets based on priority.
- Ticket Counts, a group of five ticket counting widgets:
  - Open Tickets
  - Ethernet Activation Requests
  - Assigned to Staff (uses the staff list from Top Responders)
  - Equipment Checkout
  - Classroom Technology
- Printer Status, a (semi)live list of printer statuses across campus.

There are several background widgets that pull in data and save it to global variables under `window.sto.data`. The others check every 10 seconds for new data, then re-render themselves. The background widgets update:

- Printer Status updates every five minutes
- Open/Closed tickets updates every minute
- Helpdesk Workers updates once an hour

What other files are needed?

- WhenToWork needs a 'credential' file, called `whentowork.credential`, in `/common`. Put your username on one line, and your password on the second.
- For snmpGet to work, you must be on the IT network. That usually means being hard-wired in the helpdesk istelf.
