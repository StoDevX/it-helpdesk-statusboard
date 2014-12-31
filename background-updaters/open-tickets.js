command: '/usr/bin/env python scripts/get_tickets.py open 1&2> /dev/null | cat data/open-tickets.json',

refreshFrequency: 30000,
lastUpdateTime: undefined,

style: "left: 0",

},

update: function(output, domEl) {
	if (!window.sto)             return '';
	if (!window.sto.libs.moment) return '';
	var moment = window.sto.libs.moment;
	window.sto.data = window.sto.data || {};

	var ticketData = JSON.parse(output);
	window.sto.data.openTickets = ticketData.data;

	this.lastUpdateTime = moment(ticketData.lastUpdated);
	domEl.querySelector('.last-updated').textContent = moment(this.lastUpdateTime).calendar();
},
