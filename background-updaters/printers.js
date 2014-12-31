command: '/usr/bin/env python scripts/snmp_printer_update.py | cat data/printer-status.json',

refreshFrequency: 30000,
lastUpdateTime: undefined,

style: "left: 75%",

render: function(argument) {
	return '<status-widget>Printers: <last-updated/></status-widget>'
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
