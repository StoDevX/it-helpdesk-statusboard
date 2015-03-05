import actions from '../common/dataActions'
import {Widget} from 'uebersicht'
import StatusWidget from './statusWidget'
import moment from 'moment'

export default class PrinterStatus extends Widget {
	constructor(props) {
		super(props)
		this.command = '/usr/bin/env python scripts/snmp_printer_update.py && cat data/printer-status.json',
		this.refreshFrequency = 30000

		this.style = "left: 75%"
	}

	componentWillReceiveProps(props) {
		try {
			let data = JSON.parse(output).data
			actions.updatePrinters(data)
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
			title='Printers'
			error={state.error}
			loading={props.ub.running}
			time={state.lastUpdateTime} />
	}
}
PrinterStatus.defaultProps = {
	ub: {
		output: '[]',
		running: false,
	}
}
