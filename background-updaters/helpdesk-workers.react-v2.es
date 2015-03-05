import actions from '../common/dataActions'
import {Widget} from 'uebersicht'
import StatusWidget from './statusWidget'
import moment from 'moment'

export default class PrinterStatus extends StatusWidget {
	constructor(props) {
		super(props, {
			action: 'updateShifts',
			command: 'data/whentowork.json',
			file: 'python python scripts/when_to_work.py',
			name: 'Helpdesk Shifts',
			position: 'left: 50%',
			processData: (data) => {
				return {
					later: getLaterShifts(data.later),
					now: getNowShifts(data.now),
				}
			},
		})
	}
}

function prepareShiftTable(data) {
	var parser = new DOMParser()
	var whenToWork = parser.parseFromString(data, 'text/html')

	// turn the table into an array of objects of the workers
	var table = whenToWork.querySelector('.bwgt > table > tbody')

	var headers = toArray(table.querySelectorAll('tr:first-child td'))
	var keys = map(headers, (heading) => heading.textContent)

	var shiftRows = toArray(table.querySelectorAll('tr.underline'))

	return map(shiftRows, (row) =>
		zipObject(keys, pluck(toArray(row.children), 'textContent')))
}

function expandLaterShift(shift) {
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
}

function expandActiveShift(shift) {
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
}

function getLaterShifts(output) {
	var shiftRows = this.prepareShiftTable(output)

	var shifts = _.chain(shiftRows)
		.map(expandLaterShift)
		.sortBy('startTime')
		.value()

	return shifts
}

function getNowShifts(output) {
	var shiftRows = this.prepareShiftTable(output);

	var currentWorkers = _.chain(shiftRows)
		.map(expandActiveShift)
		.sortBy('startTime')
		.value()

	return currentWorkers
}
