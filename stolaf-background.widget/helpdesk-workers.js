command: 'python stolaf-base/whentowork.py',

refreshFrequency: 3600000,
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

	var parser = new DOMParser();
	var whenToWork = parser.parseFromString(output, 'text/html');

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
			return {
				name: shift['Scheduled'],
				time: shift['Time'],
			}
		})
		.groupBy('time')
		.toArray()
		.first()
		.value();

	window.sto.data.shifts = shifts || [];

	this.lastUpdateTime = new Date();
	domEl.querySelector('.last-updated').textContent = moment(this.lastUpdateTime).calendar();
},
