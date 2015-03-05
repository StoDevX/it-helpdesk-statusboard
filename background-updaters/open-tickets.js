command: '/usr/bin/env python scripts/get_tickets.py open 1&2> /dev/null | cat data/open-tickets.json',

refreshFrequency: 30000,
lastUpdateTime: undefined,

style: "left: 0",

render: function() {
	return '<status-widget>Open Tickets: <last-updated/></status-widget>'
},

update: function(output, domEl) {
	if (!domEl.querySelector('last-updated'))
		this.render()

	domEl.querySelector('last-updated').textContent = 'Initializing...'

	if (!window.loaded) {
		var self = this
		self.stop()
		window.clearTimeout(self.setTimeoutId)
		self.setTimeoutId = window.setTimeout(self.refresh, 1000)
		return;
	}

	domEl.querySelector('last-updated').textContent = 'Loading...'

	var ticketData = JSON.parse(output).data
	window.data.openTickets = ticketData
	window.events.emit('open-tickets', ticketData)

	this.lastUpdateTime = moment(ticketData.lastUpdated);
	domEl.querySelector('last-updated').textContent = moment(this.lastUpdateTime).calendar();
	this.start()
},
