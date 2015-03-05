import {Widget} from 'uebersicht'
import {PropTypes} from 'react'
import {map, chain} from 'lodash'

export default class HelpdeskCrew extends Widget {
	constructor(props) {
		super(props)

		this.refreshFrequency = false
		this.style = `
			left: 25%
			top: 0

			width: 23%
			height: 50vh

			text-align: center

			.details
				padding-top: 0.5rem

			time
				font-weight: 200
				font-size: 1.5em
				color: rgba(255, 255, 255, 0.65)
				padding-bottom: 0.25rem

			div .title
				margin-bottom: 0em
				padding-bottom: 0em
				font-family: Fira Sans
				font-weight: 600

			.workers
				font-weight: 400
				font-size: 1.5em
				color: rgba(255, 255, 255, 0.75)

			.wrapper
				color: inherit
				text-decoration: none
				cursor: pointer
				padding-top: 2em
		`
	}

	makeList(workers, message) {
		if (!workers.length)
			return message

		return <ul className='workers'>
			{map(workers, (shift) =>
				<li>{shift.name}</li>)}
		</ul>
	}

	findFirstShift(shifts) {
		return chain(shifts)
			.filter(shift => shift.location === 'Helpdesk')
			.groupBy('startTime')
			.toArray()
			.first()
			.value()
	}

	render(props) {
		let nooneScheduledMessage = 'No-one is currently scheduled.'
		let noMoreShiftsMessage = `No more shifts scheduled as of ${moment().format('ha[.]')}`

		// First, find the current workers.
		let currentWorkers = this.findFirstShift(props.now)
		let now = this.makeList(currentWorkers, nooneScheduledMessage)

		// Then, find the next workers.
		let nextWorkers = this.findFirstShift(props.later)
		let later = this.makeList(nextWorkers, noMoreShiftsMessage)

		return <a className="wrapper" href="https://whentowork.com/cgi-bin/w2w.dll/login">
			<div className="now">
				<h1 className="title">Now @Helpdesk</h1>
				<div className="details">{now}</div>
			</div>
			<div className="next">
				<h1 className="title">Next @Helpdesk</h1>
				<div className="details">{later}</div>
			</div>
			<h1 className="title">☠ Helpdesk</h1>
		</a>
	}
}

HelpdeskCrew.propTypes = {
	now: PropTypes.array.isRequired,
	later: PropTypes.array.isRequired,
}
