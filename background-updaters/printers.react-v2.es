import StatusWidget from './statusWidget'

export default class PrinterStatus extends StatusWidget {
	constructor(props) {
		super(props, {
			action: 'updatePrinters',
			command: 'data/printer-status.json',
			file: 'python scripts/snmp_printer_update.py',
			name: 'Printers',
			position: 'left: 75%',
		})
	}
}
