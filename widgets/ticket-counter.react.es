import {Widget} from 'uebersicht'
import {PropTypes, ReactComponent} from 'react'
import cx from 'classSet'
import {chain, contains, filter} from 'lodash'
import calculateFontWeight from '../common/calculateFontWeight'

class Counter extends ReactComponent {
	constructor(props) {
		super(props)
	}

	render(props) {
		let {count, id, name} = props

		let className = cx({
			[`${id}-tickets-counter`]: true,
			yellow: (count > 5),
			gray: (count === 0),
		})

		return <li className={className}>
			<output className={`count ${calculateFontWeight(count)}`}>
				{count}
			</output>
			<h1 className='count-group'>{name}</h1>
		</li>
	}
}
Counter.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	count: PropTypes.number.isRequired,
}

export default class TicketCounter extends Widget {
	constructor(props) {
		super(props)
		this.refreshFrequency = false

		this.style = `
			top: 0
			left: 0

			width: 25%
			height: 50vh

			border-right: 0
			border-bottom: 0

			text-align: left

			.details
				font-size: 2em
				font-weight: 100
				opacity: 0.75
				justify-content: flex-start

			.counters li
				display: flex
				flex-flow: row nowrap
				align-items: center

			.count
				flex-basis: 1.25em
				text-align: right

			.count-group
				font-weight: 300
				font-size: 0.85em
				display: inline-block
				margin: 0
				margin-left: 0.75em
				text-overflow: ellipsis
				overflow: hidden
				white-space: nowrap
		`
	}

	render(props) {
		let {openTickets, staff} = props

		let openTicketsRow = <Counter id='open' name='Open Tickets' count={openTickets.length} />

		let staffTickets = chain(openTickets)
			// only the tickets with a tech
			.filter('clientTech')
			// only the tickets with a staff member as a tech
			.filter(ticket => contains(staff, ticket.clientTech.displayName))
			.value()
		let staffTicketsRow = <Counter id='staff' name='Assigned to Staff' count={staffTickets.length} />

		let uncategorizedTicketsRow = makeRequestTypeRow(openTickets, 'Email Submission (helpdesk@stolaf.edu)', 'uncategoprized', 'Needs Request Type')
		let classTechTicketsRow = makeRequestTypeRow(openTickets, 'Classroom Technology', 'classtech')
		let equipmentTicketsRow = makeRequestTypeRow(openTickets, 'Equipment Checkout', 'equipment')
		let networkTicketsRow = makeRequestTypeRow(openTickets, 'Network & Connectivity &#8226; Ethernet Activation Request', 'ethernet', 'Ethernet Requests')

		let counters = [
			openTicketsRow,
			uncategorizedTicketsRow,
			classTechTicketsRow,
			equipmentTicketsRow,
			networkTicketsRow,
			staffTicketsRow,
		]

		return <div className="wrapper">
			<div className="details">
				<ul className="counters">{counters}</ul>
			</div>
			<h1 className="title">Ticket Counters</h1>
		</div>
	}
}
TicketCounter.propTypes = {
	openTickets: PropTypes.array.isRequired,
	staff: PropTypes.array.isRequired,
}

function makeRequestTypeRow(openTickets, filterBy, className, title) {
	title = title || filterBy;

	var tickets = filter(openTickets, (ticket) => filterOnly(ticket, filterBy));

	return tickets.length ?
		<Counter id={className} name={title} count={tickets.length} /> :
		null
}

function filterOnly(ticket, type) {
	return (
		ticket.problemtype &&
		ticket.problemtype.detailDisplayName &&
		ticket.problemtype.detailDisplayName === type
	)
}
