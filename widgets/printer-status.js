command: '/usr/local/bin/python3 printer-status.py --json',
refreshFrequency: '1m',

style: [
	"left: 20vw",
	"top: 50vh",

	"height: 50vh",
	"width: 50%",

	"text-align: center",
	"font-size: 1.2em",

	".details",
	"	font-size: 1em",

	".title",
	"	margin-top: 1em",

	".heading",
	"	font-weight: 200",
	"	font-size: 1em",
	"	margin: .5em 0 0 0",

	".inner-list",
	"	color: black",

	".inner-list li",
	"	display: inline-block",
	"	padding-left: 0.35em",
	"	padding-right: 0.35em",
	"	background-color: rgba(255, 255, 255, 0.65)",
	"	border-radius: 0.25em",
	"	margin: 0.15em 0.15em",
].join('\n'),

render: function(output) {
	return [
		'<div class="wrapper">',
			'<div class="details"></div>',
			'<h1 class="title">Printer Status</h1>',
		'</div>',
	].join('')
},

update: function(output, domEl) {
	if (!window.sto)             return ''
	if (!window.sto.libs.lodash) return ''

	console.log(output)

	var _ = window.sto.libs.lodash

	var printers = JSON.parse(output)
	var printerErrorStates = _.chain(printers)
		.mapValues(function(printer) {
			if (_.contains(printer.error, 'Call')) {
				printer.className = 'bg-red'
			}

			if (printer.toner) {
				printer.name = printer.name + ' (' + printer.toner + '%)'
			}

			if (printer.toner <= 2) {
				printer.className = 'bg-orange'
			}
			else if (printer.toner < 4) {
				printer.className = 'bg-yellow'
			}

			return printer
		})
		.value()

	var details = domEl.querySelector('.details')

	var contentList = document.createElement('ul')
	contentList.className = 'list'

	var printerCount = 8
	_.each(printerErrorStates, function(printers, key) {
		var printerlist = _.take(printers, printerCount)
		if (!printerlist.length)
			return

		var group = document.createElement('li')
		group.className = 'group'

		var title = document.createElement('h1')
		title.className = 'heading'
		title.textContent = key
		group.appendChild(title)

		var printerList = document.createElement('ul')
		printerList.className = 'inner-list'
		_.each(printerlist, function(printer) {
			var el = document.createElement('li')
			if (printer.className) {
				el.className = printer.className
			}
			el.textContent = printer.name
			printerList.appendChild(el)
		})

		group.appendChild(printerList)
		contentList.appendChild(group)
	})

	details.innerHTML = contentList.innerHTML.length ? contentList.outerHTML : "No problems"
},
