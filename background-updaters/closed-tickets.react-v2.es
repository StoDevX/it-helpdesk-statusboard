import StatusWidget from './statusWidget'

export default class ClosedTickets extends StatusWidget {
	constructor(props) {
		super(props, {
			action: 'updateClosedTickets',
			command: 'python scripts/get_tickets.py closed 1&2> /dev/null',
			file: 'data/closed-tickets.json',
			name: 'Closed Tickets',
			position: 'left: 25%',
		})
	}
}
