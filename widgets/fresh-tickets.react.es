import {Widget} from 'uebersicht'
import {PropTypes} from 'react'
import {map, chain} from 'lodash'
import {pluralize} from 'humanize'

export default class FreshTickets extends Widget {
	constructor(props) {
		super(props)

		this.refreshFrequency = false
		this.style = `
			right: 0
			top: 0

			height: 97vh
			width: 20%

			color: rgba(255, 255, 255, 0.5)

			.details
				font-size: 1em

			.title
				margin-top: 1em

			ul
				height: 100vh
				display: flex
				flex-direction: column
				justify-content: space-between

			.detail-row, .ticket-title
				text-overflow: ellipsis
				overflow: hidden
				white-space: nowrap
				color: white

			.detail-row
				margin: 0
				font-size: 1.2em
				font-weight: 500

			.ticket-title
				margin: 0.25em 0 0em 0
				font-size: 1em
				font-weight: 400
				line-height: 1.2

			.item
				margin-bottom: 0.85em

			.item:last-child
				margin-bottom: 0

			.ticket-number::before
				content: '#'
			.ticket-number::after
				content: ' — '

			.info-row
				line-height: 1

			.info-row, .ticket-title, .type-row
				font-size: 0.85em
				font-weight: 300

			.type-row
				font-size: 0.75em
				letter-spacing: 0.015em
				text-overflow: ellipsis
				overflow: hidden
				white-space: nowrap

			.client-name::after
				content: ' — '

			.link-wrapper
				display: block
				color: inherit
				text-decoration: none
				cursor: pointer
		`
	}

	render(props) {
		let sortedTickets = chain(props.openTickets)
			// Sort by the ISO-8601 formatted date
			// (after turning it into a Date object)
			.sortBy(ticket => new Date(ticket.lastUpdated))
			// Newest tickets are now at the end
			.takeRight(7)
			.value()

		let tickets = <ul className='list'>
			{map(sortedTickets, (ticket) =>
				<li className='item'><a className='link-wrapper' href={ticket.bookmarkableLink}>
					<div className='info-row'>
						<span className='ticket-number'>{ticket.id}</span>
						<time className='date-updated' dateTime={ticket.lastUpdatedTime}>
							{moment(ticket.lastUpdatedTime).local().calendar()}
						</time>
					</div>
					<div className='title-row'>
						<h1 className='ticket-title'>
							{ticket.subject || (ticket.detail.split('\r').length ? ticket.detail.split('\r')[0] : '')}
						</h1>
					</div>
					<div className='detail-row'>
						<span className='client-name'>{ticket.displayClient}</span>
						<span className='note-count'>{`${ticket.notes.length} ${pluralize(ticket.notes.length)}`}</span>
					</div>
					<div className='type-row'>
						<span className='ticket-type'>{ticket.problemtype.detailDisplayName}</span>
					</div>
				</a></li>
			)}
		</ul>

		let content = tickets.length ? tickets : 'No Tickets!'

		return <div className="wrapper">
			<div class="details">{content}</div>
			<h1 class="title">Fresh Tickets</h1>
		</div>
	}
}

FreshTickets.propTypes = {
	openTickets: PropTypes.array.isRequired
}
