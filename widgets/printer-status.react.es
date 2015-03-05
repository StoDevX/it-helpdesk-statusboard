import {Widget} from 'uebersicht'
import {PropTypes} from 'react'
import {map, chain, contains, filter} from 'lodash'

export default class PrinterStatus extends Widget {
	constructor(props) {
		super(props)

		this.refreshFrequency = false
		this.style = `
			left: 20vw
			bottom: 3vh

			height: 47vh
			width: 60%

			text-align: center
			font-size: 1.2em

			.details
				font-size: 1em

			.title
				margin-top: 1em

			.heading
				font-weight: 200
				font-size: 1em
				margin: .5em 0 0 0

			.inner-list
				color: black

			.inner-list li
				display: inline-block
				padding-left: 0.35em
				padding-right: 0.35em
				background-color: rgba(255, 255, 255, 0.65)
				border-radius: 0.25em
				margin: 0.15em 0.15em
		`
	}

	render(props) {
		let printers = cloneDeep(props.printers)

		let badErrorStates = [
			'', // the error field can be blank.
			'Drawer Open',
		]
		let printerCount = 8

		var printerErrorStates = chain(printers)
			.reject({'error': "No Error"})
			.reject({'error': "Paper Low"})
			.filter(printer => printer.name)
			.filter(printer => contains(printer.name.toLowerCase(), 'mfc-'))
			.map((printer) => {
				if (contains(printer.error, 'Call'))
					printer.className = 'bg-red'
				return printer
			})
			.groupBy('error')
			.omit(badErrorStates)
			.value()

		printerErrorStates['Not Responding'] = filter(printers,
			printer => printer.error === '')

		printerErrorStates['Low Toner (< 5%) [Replace]'] = chain(printers)
			// Only care about the printers with less than 5% toner
			.filter(printer => printer.toner !== '' && printer.toner < 5)
			.map(printer => {
				printer.name += ` (${printer.toner}%)`
				if (printer.toner <= 2)
					printer.className = 'bg-orange'
				else if (printer.toner < 4)
					printer.className = 'bg-yellow'
				return printer
			})
			.sortBy('toner')
			.value()

		let printerElements = <ul className='list'>
			{map(printerErrorStates, (printers, error) => {
				let printerList = take(printers, printerCount)
				if (!printerList.length) {
					return undefined
				}

				return <li className='group'>
					<h1 className='heading'>{error}</h1>
					<ul className='inner-list'>
						{map(printerList, printer =>
							<li className={printer.className}>
								{printer.name}
							</li>
						)}
					</ul>
				</li>
			})}
		</ul>

		return <div className="wrapper">
			<div className="details"></div>
			<h1 className="title">Printer Status</h1>
		</div>
	}
}
PrinterStatus.propTypes = {
	printers: PropTypes.array.isRequired,
}
