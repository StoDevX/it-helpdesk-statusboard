command: '/usr/bin/env python scripts/whentowork.py | cat data/whentowork.json',

refreshFrequency: 30000,
lastUpdateTime: undefined,

style: [
	"bottom: 0",
	"left: 50%",
	"width: 25%",
	"text-align: center",
	"border: 0",
	"height: 3%",
	"vertical-align: middle",
	"color: rgba(255, 255, 255, 0.25)",
	"font-weight: 300",
].join('\n'),

render: function(argument) {
	return 'Helpdesk Workers: <span class="last-updated"></span>';
},

update: function(output, domEl) {
	if (!window.sto)                return '';
	if (!window.sto.libs.lodash)    return '';
	if (!window.sto.libs.moment)    return '';
	if (!window.sto.libs.DOMParser) return '';

	var _      = window.sto.libs.lodash;
	var moment = window.sto.libs.moment;
	window.sto.data = window.sto.data || {};

	var data = JSON.parse(output);

	var parser = new DOMParser();
	var whenToWork = parser.parseFromString(data.data, 'text/html');

	// turn the table into an array of objects of the workers
	var table = whenToWork.querySelector('.bwgt > table > tbody');

	var headers = _.toArray(table.querySelectorAll('tr:first-child td'));
	var keys = _.map(headers, function(heading) {return heading.textContent});

	var shiftRows = _.toArray(table.querySelectorAll('tr.underline'));
	var shifts = _.chain(shiftRows)
		.map(function(row) {
			return _.zipObject(keys, _.chain(row.children).toArray().map('textContent').value())
		})
		.map(function(shift) {
			// Example:
			// Category: ""
			// Description: ""
			// Scheduled: "Mary Kraemer"
			// Position: "Helpdesk"
			// Time: "11:30am-1:30pm"

			var times = shift['Time'].match(/(.*)-(.*)/);
			return {
				name:      shift['Scheduled'],
				location:  shift['Position'],
				time:      shift['Time'],
				startTime: times[1],
				endTime:   times[2],
			};
		})
		.sortBy('startTime')
		.value();

	window.sto.data.shifts = shifts || [];

	this.lastUpdateTime = new Date();
	domEl.querySelector('.last-updated').textContent = moment(this.lastUpdateTime).calendar();
},
