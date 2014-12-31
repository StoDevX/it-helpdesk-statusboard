command: '/usr/bin/env python scripts/get_tickets.py closed 1&2> /dev/null | cat data/closed-tickets.json',

refreshFrequency: 30000,
lastUpdateTime: undefined,

style: "left: 25%",

render: function() {
	return '<status-widget>Closed Tickets: <last-updated/></status-widget>'
},

update: function(output, domEl) {
	if (!window.sto)             return '';
	if (!window.sto.libs.moment) return '';
	var moment = window.sto.libs.moment;
	window.sto.data = window.sto.data || {};

	var ticketData = JSON.parse(output);
	window.sto.data.closedTickets = ticketData.data;

	this.lastUpdateTime = moment(ticketData.lastUpdated);
	domEl.querySelector('.last-updated').textContent = moment(this.lastUpdateTime).calendar();
},
