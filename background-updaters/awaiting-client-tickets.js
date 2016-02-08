command: '/usr/bin/env python scripts/get_tickets.py "Awaiting Client" 1&2> /dev/null && cat data/awaiting-client-tickets.json',

refreshFrequency: 30000,
lastUpdateTime: undefined,

style: [
	'bottom: 0',
	'left: 20%',
	'width: 20%',
	'text-align: center',
	'border: 0',
	'height: 3%',
	'vertical-align: middle',
	'color: rgba(255, 255, 255, 0.25)',
	'font-weight: 300',
].join('\n'),

render: function(output) {
	if (!window.sto)
		return "'Awaiting Client' Tickets: sto-js is not loaded"
	if (!window.sto.libs.moment)
		return "'Awaiting Client' Tickets: moment is not loaded"

	var moment = window.sto.libs.moment
	window.sto.data = window.sto.data || {}

	var ticketData = JSON.parse(output)
	window.sto.data.awaitingClientTickets = ticketData.data

	this.lastUpdateTime = moment(ticketData.lastUpdated)

	var niceTime = moment(this.lastUpdateTime).calendar()
	return "'Awaiting Client' Tickets: <span class='last-updated'>" + niceTime + "</span>"
}
