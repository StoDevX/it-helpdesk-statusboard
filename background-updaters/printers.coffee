command: '/usr/bin/env python scripts/snmpGet.py > /dev/null && cat data/printer-status.json'

refreshFrequency: 30000
lastUpdateTime: undefined

style: """
	bottom: 0
	left: 80%
	width: 20%
	text-align: center
	border: 0
	height: 3%
	vertical-align: middle
	color: rgba(255, 255, 255, 0.25)
	font-weight: 300
"""

render: (output) ->
	# console.log(output)
	unless window.sto
		return "Printers: sto-js is not loaded"
	unless window.sto.libs.moment
		return "Printers: moment is not loaded"

	moment = window.sto.libs.moment
	window.sto.data ?= {}

	window.sto.data.reportedPrinters ?= []

	printerData = null
	if output
		try
			printerData = JSON.parse(output)
		catch e
			console.log(output)
			console.log(e)
			printerData = {data: []}

		window.sto.data.printers = printerData.data

	@lastUpdateTime = moment(printerData.lastUpdated)

	niceTime = moment(this.lastUpdateTime).calendar()
	return "Printers: <span class='last-updated'>#{niceTime}</span>"
