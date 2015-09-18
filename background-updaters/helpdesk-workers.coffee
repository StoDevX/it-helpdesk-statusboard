command: '/usr/bin/env python scripts/whentowork.py && cat data/whentowork.json'

refreshFrequency: 30000
lastUpdateTime: undefined

style: """
	bottom: 0
	left: 50%
	width: 25%
	text-align: center
	border: 0
	height: 3%
	vertical-align: middle
	color: rgba(255, 255, 255, 0.25)
	font-weight: 300
"""

prepareShiftTable: (data) ->
	_ = window.sto.libs.lodash

	parser = new DOMParser()
	whenToWork = parser.parseFromString(data, 'text/html')

	# turn the table into an array of objects of the workers
	table = whenToWork.querySelector('.bwgt > table > tbody')

	headers = _.toArray(table.querySelectorAll('tr:first-child td'))
	keys = _.map(headers, (heading) -> heading.textContent)

	shiftRows = _.toArray(table.querySelectorAll('tr[title="View details"]'))

	results = _.map(shiftRows, (row) ->
		_.zipObject(keys, _.pluck(_.toArray(row.children), 'textContent')))

	return results


getLaterShifts: (output) ->
	_ = window.sto.libs.lodash
	shiftRows = this.prepareShiftTable(output)

	shifts = _.chain(shiftRows)
		.map((shift) ->
			# Example:
			# Category: ""
			# Description: ""
			# Scheduled: "Mary Kraemer"
			# Position: "Helpdesk"
			# Time: "11:30am-1:30pm"

			times = shift['Time'].match(/(.*)-(.*)/)
			return {
				name:      shift['Scheduled'],
				location:  shift['Position'],
				time:      shift['Time'],
				startTime: sto.libs.moment(times[1], 'h:ma'),
				endTime:   sto.libs.moment(times[2], 'h:ma'),
			})
		.sortBy('startTime')
		.value()

	return shifts


getNowShifts: (output) ->
	_ = window.sto.libs.lodash
	shiftRows = this.prepareShiftTable(output)

	currentWorkers = _.chain(shiftRows)
		.map((shift) ->
			# Example:
			# Category: ""
			# Description: ""
			# Scheduled: "Mary Kraemer"
			# Position: "Helpdesk"
			# Until: "1:30pm"

			return {
				name:      shift['Scheduled'],
				location:  shift['Position'],
				time:      null,
				startTime: null,
				endTime:   shift['Until'],
			})
		.sortBy('startTime')
		.value()
	return currentWorkers


render: (output) ->
	unless (window.sto)
		return 'Workers: sto-js is not loaded'

	unless (window.sto.libs.lodash)
		return 'Workers: lodash is not loaded'

	unless (window.sto.libs.moment)
		return 'Workers: moment is not loaded'

	unless (window.sto.libs.DOMParser)
		return 'Workers: DOMParser is not loaded'

	_      = window.sto.libs.lodash
	moment = window.sto.libs.moment
	window.sto.data ?= {}

	data = JSON.parse(output).data

	window.sto.data.shifts = {
		later: @getLaterShifts(data.later),
		now: @getNowShifts(data.now),
	}

	@lastUpdateTime = moment(data.lastUpdated)
	niceTime = moment(this.lastUpdateTime).calendar()
	return "Workers: <span class='last-updated'>#{niceTime}</span>"
