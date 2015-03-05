command: '/usr/bin/env python scripts/when_to_work.py | cat data/whentowork.json',

refreshFrequency: 30000,
lastUpdateTime: undefined,

style: "left: 50%",

render: function(argument) {
	return '<status-widget>Helpdesk Workers: <last-updated/></status-widget>'
},

prepareShiftTable: function(data) {
	var parser = new DOMParser();
	var whenToWork = parser.parseFromString(data, 'text/html');

	// turn the table into an array of objects of the workers
	var table = whenToWork.querySelector('.bwgt > table > tbody');

	var headers = _.toArray(table.querySelectorAll('tr:first-child td'));
	var keys = _.map(headers, function(heading) {return heading.textContent});

	var shiftRows = _.toArray(table.querySelectorAll('tr.underline'));

	return _.map(shiftRows, function(row) {
		return _.zipObject(keys, _.chain(row.children).toArray().map('textContent').value())
	})
},

getLaterShifts: function(output) {
	var shiftRows = this.prepareShiftTable(output);

	var shifts = _.chain(shiftRows)
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
			}
		})
		.sortBy('startTime')
		.value();

	return shifts;
},

getNowShifts: function(output) {
	var shiftRows = this.prepareShiftTable(output);

	var currentWorkers = _.chain(shiftRows)
		.map(function(shift) {
			// Example:
			// Category: ""
			// Description: ""
			// Scheduled: "Mary Kraemer"
			// Position: "Helpdesk"
			// Until: "1:30pm"

			return {
				name:      shift['Scheduled'],
				location:  shift['Position'],
				time:      null,
				startTime: null,
				endTime:   shift['Until'],
			}
		})
		.sortBy('startTime')
		.value();
	return currentWorkers;
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

	var shiftData = JSON.parse(output).data
	var shifts = {
		later: this.getLaterShifts(shiftData.later),
		now: this.getNowShifts(shiftData.now),
	}
	window.data.shifts = shifts
	window.events.emit('helpdesk-workers', shifts)

	this.lastUpdateTime = moment(data.lastUpdated)
	domEl.querySelector('last-updated').textContent = moment(this.lastUpdateTime).calendar()
	this.start()
},
