command: '/bin/bash stolaf-base/snmpGet.sh',

refreshFrequency: 600000,
lastUpdateTime: undefined,

style: [
	"bottom: 0",
	"left: 75%",
	"width: 25%",
	"text-align: center",
	"border: 0",
	"height: 3%",
	"vertical-align: middle",
	"color: rgba(255, 255, 255, 0.5)",
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

	window.sto.data.printers = csv.parse(output, {header: true, cast: ['String', 'String', 'String', 'String']});;

	this.lastUpdateTime = new Date();
	domEl.querySelector('.last-updated').textContent = moment(this.lastUpdateTime).calendar();
},
