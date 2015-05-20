command: '/usr/bin/env python scripts/getTickets.py closed 1&2> /dev/null && cat data/closed-tickets.json'

refreshFrequency: 30000
lastUpdateTime: undefined

style: """
	bottom: 0
	left: 25%
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
		return "Clsoed Tickets: sto-js is not loaded"
	unless window.sto.libs.moment
		return "Clsoed Tickets: moment is not loaded"

	moment = window.sto.libs.moment
	window.sto.data ?= {}

	ticketData = JSON.parse(output)
	window.sto.data.closedTickets = ticketData.data

	@lastUpdateTime = moment(ticketData.lastUpdated)

	niceTime = moment(this.lastUpdateTime).calendar()
	return "Closed Tickets: <span class='last-updated'>#{niceTime}</span>"
