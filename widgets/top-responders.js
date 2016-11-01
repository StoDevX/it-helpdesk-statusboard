command: '/usr/local/bin/python3 top-responders.py --json',
refreshFrequency: '1m',

style: [
	"left: 22%",
	"top: 0%",

	"width: 23%",
	"height: 50vh",

	".details",
	"	font-size: 1.5em",
	"	line-height: 1.2",
	"	padding-top: 1.5rem",
	"	padding-left: 1.5rem",
	"	padding-right: 1.5rem",

	"ul",
	"	height: 100vh",
	"	display: flex",
	"	flex-flow: column nowrap",
	"	justify-content: space-between",

	"li",
	"	display: flex",
	"	flex-flow: row nowrap",
	"	justify-content: space-between",

	"span:first-child",
	"	font-weight: 300",
	"	text-overflow: ellipsis",
	"	overflow: hidden",
	"	white-space: nowrap",
	"	padding-right: 0.5em",

	"span:last-child",
	"	text-align: right",
	"	font-weight: 500",
].join('\n'),

render: function(output) {
	return [
		'<div class="wrapper">',
			'<div class="details"></div>',
			'<h1 class="title">Top Responders</h1>',
		'</div>',
	].join('')
},

update: function(output, domEl) {
	if (!window.sto)                    return ''
	if (!window.sto.data.colors)        return ''

	var topResponders = JSON.parse(output)
	var details = domEl.querySelector('.details')

	var colors = window.sto.data.colors

	var contentTable = document.createElement('ul')
	contentTable.classList.add('colorful')

	topResponders.forEach(function(pair, index) {
		var item = document.createElement('li')
		var nameCell = document.createElement('span')
		var numberCell = document.createElement('span')

		item.classList.add(colors[index])

		nameCell.textContent = pair[0]
		numberCell.textContent = pair[1]

		item.appendChild(nameCell)
		item.appendChild(numberCell)

		contentTable.appendChild(item)
	})

	details.innerHTML = contentTable.outerHTML
},
