import actions from '../common/dataActions'
import {Widget} from 'uebersicht'
import StatusWidget from './statusWidget'
import moment from 'moment'

export default class ClosedTickets extends Widget {
	constructor(props) {
		super(props)

		this.command = '/usr/bin/env python scripts/get_tickets.py closed 1&2> /dev/null && cat data/closed-tickets.json'
		this.refreshFrequency = 30000

		this.style = "left: 25%"

		this.state = {
			lastUpdateTime: 0,
			error: false
		}
	}

	componentWillReceiveProps(props) {
		try {
			let data = JSON.parse(props.ub.output).data
			actions.updateClosedTickets(data)
			this.setState({
				error: false,
				lastUpdateTime: moment(data.lastUpdated),
			})
		} catch (e) {
			this.setState({error: 'Error parsing data'})
		}
	}

	componentDidMount() {
		this.componentWillReceiveProps(this.props)
	}

	render(props, state) {
		return <StatusWidget
			title='Closed Tickets'
			error={state.error}
			loading={props.ub.running}
			time={state.lastUpdateTime} />
	}
}

ClosedTickets.defaultProps = {
	ub: {
		output: '[]',
		running: false,
	}
}
