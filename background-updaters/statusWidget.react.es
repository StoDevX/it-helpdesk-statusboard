import actions from '../common/dataActions'
import {Widget} from 'uebersicht'
import moment from 'moment'

export default class StatusWidget extends Widget {
	constructor(props, options) {
		super(props)
		let {name, action, command, file, position, processData} = options

		this.command = `${command} && cat ${file}`
		this.style = position
		this.refreshFrequency = 30000

		this.action = action
		this.name = name
		this.processData = processData

		this.state = {
			lastUpdateTime: 0,
			error: false
		}
	}

	componentWillReceiveProps(props) {
		try {
			let data = JSON.parse(output).data
			data = this.processData ? this.processData(data) : data
			actions[this.action](data)
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
		let statusClass = cx({
			'loading': props.ub.running,
			'error': state.error,
			'last-updated': state.lastUpdateTime,
		})
		let status = <span className={statusClass}>
			{props.ub.running ? 'Loading&hellip;' : (state.error || state.lastUpdateTime)}
		</span>

		return <div className='status-widget'>
			{this.name}: {status}
		</div>
	}
}

StatusWidget.defaultProps = {
	ub: {
		output: '[]',
		running: false,
	}
}
