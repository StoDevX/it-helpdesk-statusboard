import StatusWidget from './statusWidget'

export default class OpenTickets extends StatusWidget {
	constructor(props) {
		super(props, {
			action: 'updateOpenTickets',
			command: 'python scripts/get_tickets.py open 1&2> /dev/null',
			file: 'data/open-tickets.json',
			name: 'Open Tickets',
			position: 'left: 0',
		})
	}
}
