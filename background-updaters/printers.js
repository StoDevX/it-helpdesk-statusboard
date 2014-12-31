command: '/usr/bin/env python scripts/snmp_printer_update.py | cat data/printer-status.json',

refreshFrequency: 30000,
lastUpdateTime: undefined,

style: "left: 75%",

render: function(argument) {
	return '<status-widget>Printers: <last-updated/></status-widget>'
},

update: function(output, domEl) {
	domEl.querySelector('last-updated').textContent = 'Initializing...'

	if (!window.loaded) {
		var self = this
		self.stop()
		window.clearTimeout(self.setTimeoutId)
		self.setTimeoutId = window.setTimeout(self.refresh, 1000)
	}

	domEl.querySelector('last-updated').textContent = 'Loading...'

	var printerData = JSON.parse(output).data
	window.data.printers = printerData
	window.events.emit('printer-status', printerData)

	this.lastUpdateTime = moment(printerData.lastUpdated)
	domEl.querySelector('last-updated').textContent = moment(this.lastUpdateTime).calendar()
},
