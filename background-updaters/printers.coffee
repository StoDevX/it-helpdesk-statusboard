command: '/usr/bin/env python scripts/snmpGet.py > /dev/null && cat data/printer-status.json'

refreshFrequency: 30000
lastUpdateTime: undefined

style: """
	bottom: 0
	left: 75%
	width: 25%
	text-align: center
	border: 0
	height: 3%
	vertical-align: middle
	color: rgba(255, 255, 255, 0.25)
	font-weight: 300
"""

render: () -> 'Printers: <span class="last-updated"></span>'

update: (output, domEl) ->
	# console.log(output)
	unless window.sto
		return ''
	unless window.sto.libs.moment
		return ''

	moment = window.sto.libs.moment
	window.sto.data = window.sto.data || {}

	window.sto.data.reportedPrinters = window.sto.data.reportedPrinters || []

	printerData = null
	if output
		try
			printerData = JSON.parse(output)
		catch e
			console.log(output)
			console.log(e)
			printerData = {}
		
		window.sto.data.printers = printerData.data

	@lastUpdateTime = moment(printerData.lastUpdated)

	domEl.querySelector('.last-updated').textContent = moment(this.lastUpdateTime).calendar()
