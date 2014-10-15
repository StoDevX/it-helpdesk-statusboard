command: '/usr/bin/env python scripts/getTickets.py open 1&2> /dev/null | cat data/open-tickets.json',

refreshFrequency: 60000,
lastUpdateTime: undefined,

style: [
	"bottom: 0",
	"left: 0",
	"width: 25%",
	"text-align: center",
	"border: 0",
	"height: 3%",
	"vertical-align: middle",
	"color: rgba(255, 255, 255, 0.25)",
	"font-weight: 300",
].join('\n'),

render: function(argument) {
	return 'Open Tickets: <span class="last-updated"></span>';
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
