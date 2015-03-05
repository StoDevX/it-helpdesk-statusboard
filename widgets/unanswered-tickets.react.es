import {Widget} from 'uebersicht'
import {PropTypes} from 'react'
import cx from 'classSet'
import {chain, filter, size} from 'lodash'
import calculateFontWeight from '../common/calculateFontWeight'

export default class UnansweredTickets extends Widget {
	constructor(props) {
		super(props)

		this.refreshFrequency = false

		this.style = `
			top:   0
			right: 20%

			width: 32%
			height: 50vh

			border-right: 0
			border-left: 0

			text-align: center

			.details
				font-size: 15em
		`
	}

	render(props) {
		let unansweredTickets = filter(props.openTickets, {'notes': []});

		let clientResponseTickets = chain(props.openTickets)
			.reject({'notes': []})
			.reject((ticket) => ticket.notes[0].isTechNote)
			.value()

		let ticketCount = size(unansweredTickets) + size(clientResponseTickets)

		let className = cx({
			[calculateFontWeight(ticketCount)]: true,
			green: (ticketCount === 0),
			red: (ticketCount !== 0),
			wrapper: true,
		})

		return <div className={className}>
			<div className="details">{ticketCount}</div>
			<h1 className="title">Unanswered Tickets</h1>
		</div>
	}
}

UnansweredTickets.propTypes = {
	openTickets: PropTypes.array.isRequired,
}
