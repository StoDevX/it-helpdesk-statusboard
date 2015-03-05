import {Widget} from 'uebersicht'
import {PropTypes} from 'react'
import {map, chain, contains, filter} from 'lodash'

export default class TopResponders extends Widget {
	constructor(props) {
		super(props)
		this.refreshFrequency = false

		this.style = `
			left:  0
			bottom: 3%

			width: 20%
			height: 47vh

			.details
				font-size: 1.5em
				line-height: 1.2
				padding-top: 1.5rem
				padding-left: 1.5rem
				padding-right: 1.5rem

			ul
				height: 100vh
				display: flex
				flex-flow: column nowrap
				justify-content: space-between

			li
				display: flex
				flex-flow: row nowrap
				justify-content: space-between

			span:first-child
				font-weight: 300
				text-overflow: ellipsis
				overflow: hidden
				white-space: nowrap
				padding-right: 0.5em

			span:last-child
				text-align: right
				font-weight: 500
		`
	}

	render(props) {
		let {colors, staff} = props
		let {openTickets, closedTickets} = props
		let tickets = flatten([openTickets, closedTickets])

		let topResponders = chain(tickets)
			// We only need the tickets with notes,
			.reject({notes: []})
			// and we only care about those notes.
			.pluck('notes')
			// Flatten the array of arrays of notes into
			// a single array of notes...
			.flatten()
			// and we only care about the notes that came from us,
			.filter(hasTechNote)
			// but not those from staff members.
			.reject(note => contains(staff, responderName(note)))
			// Group them by responder,
			.groupBy(responderName)
			// and replace the arrays with the size of the arrays.
			.mapValues(size)
			// Group them into [name, number] pairs,
			.pairs()
			// and sort by the number.
			.sortBy(item => item[1])
			// We only care about the top 9 responders,
			// who happen to be on the right because of the sorting.
			.takeRight(9)
			.value()

		return <div className='wrapper'>
			<div class="details">
				<ul className='colorful'>
					{map(topResponders, ([name, number], index) =>
						<li className={colors[index]}>
							<span>{name}</span>
							<span>{number}</span>
						</li>
					)}
				</ul>
			</div>
			<h1 class="title">Top Responders</h1>
		</div>
	}
}

TopResponders.propTypes = {
	openTickets: PropTypes.array.isRequired,
	closedTickets: PropTypes.array.isRequired,
}

function hasTechNote(note) {
	return (
		    note.isTechNote
		&& !note.isHidden
		&&  note.mobileNoteText.length > 10
	)
}

let responderName = (note) =>
	note.prettyUpdatedString.replace(/.*<strong>(.+)<\/strong>.*/gm, "$1")
