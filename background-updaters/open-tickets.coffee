command: '/usr/bin/env python scripts/getTickets.py open 1&2> /dev/null && cat data/open-tickets.json'

refreshFrequency: 30000
lastUpdateTime: undefined

style: """
	bottom: 0
	left: 0
	width: 25%
	text-align: center
	border: 0
	height: 3%
	vertical-align: middle
	color: rgba(255, 255, 255, 0.25)
	font-weight: 300
"""

render: (output) ->
	unless window.sto
		return "Open Tickets: sto-js is not loaded"
	unless window.sto.libs.moment
		return "Open Tickets: moment is not loaded"

	moment = window.sto.libs.moment
	window.sto.data ?= {}

	ticketData = JSON.parse(output)
	window.sto.data.openTickets = ticketData.data

	@lastUpdateTime = moment(ticketData.lastUpdated)

	niceTime = moment(this.lastUpdateTime).calendar()
	return "Open Tickets: <span class='last-updated'>#{niceTime}</span>"
