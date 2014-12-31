command: '/usr/bin/env python scripts/snmp_printer_update.py | cat data/printer-status.json',

refreshFrequency: 30000,
lastUpdateTime: undefined,

style: [
	"bottom: 0",
	"left: 75%",
	"width: 25%",
	"text-align: center",
	"border: 0",
	"height: 3%",
	"vertical-align: middle",
	"color: rgba(255, 255, 255, 0.25)",
	"font-weight: 300",
].join('\n'),

render: function(argument) {
	return 'Printers: <span class="last-updated"></span>';
},

update: function(output, domEl) {
	if (!window.sto)             return '';
	if (!window.sto.libs.csv)    return '';
	if (!window.sto.libs.moment) return '';
	var csv = window.sto.libs.csv;
	var moment = window.sto.libs.moment;
	window.sto.data = window.sto.data || {};

	var printerData = JSON.parse(output);
	window.sto.data.printers = printerData.data;

	this.lastUpdateTime = moment(printerData.lastUpdated);
	domEl.querySelector('.last-updated').textContent = moment(this.lastUpdateTime).calendar();
},
