command: 'echo ""',
refreshFrequency: 10000,

style: [
	"bottom: 3vh",
	"right: 20%",

	"width: 20%",
	"height: 47vh",

	".details",
	"	font-size: 2em",
	"	line-height: 1.35",

	"td",
	"	padding-top: 0.15em",

	".bubbles td:first-child",
	"	padding-right: 1em",
	"	font-weight: 200",

	".bubbles td:nth-child(2)",
	"	padding-left: 0.5em",
	"	text-align: right",

	".high   { color: rgb(255,  48,   0); font-weight: 900 }",
	".medium { color: rgb(255, 198,   0); font-weight: 500 }",
	".low    { color: rgb(174, 183, 188); font-weight: 300 }",
].join('\n'),

render: function(output) {
	return [
		'<div class="wrapper">',
			'<div class="details"></div>',
			'<h1 class="title">Ticket Priority</h1>',
		'</div>',
	].join('')
},

update: function(output, domEl) {
	var wrapper = domEl.querySelector('.wrapper');
	var details = domEl.querySelector('.details');

	var openTickets = JSON.parse(localStorage.getItem('stolaf-open-tickets'));

	function getPriorityName(ticket) {
		if (_.isObject(ticket.prioritytype))
			return ticket.prioritytype.priorityTypeName
		return undefined
	}

	var order = {
		'High': 2,
		'Medium': 3,
		'Low': 4
	};

	var grouped = _.chain(openTickets)
		.groupBy(getPriorityName)
		.mapValues(_.size) // condense to length of array
		.pairs()
		.sortBy(function(item, index) {
			var key = item[0]
			return order[key]
		})
		.value();

	grouped.push(['Total', openTickets.length]);

	var contentTable = document.createElement('table');
	contentTable.classList.add('bubbles');

	_.each(grouped, function(pair) {
		var row = document.createElement('tr');
		var bubbleCell = document.createElement('td');
		var numberCell = document.createElement('td');

		row.classList.add(pair[0].toLowerCase());

		bubbleCell.textContent = pair[0];
		numberCell.textContent = pair[1];

		row.appendChild(bubbleCell);
		row.appendChild(numberCell);

		contentTable.appendChild(row);
	})

	details.innerHTML = contentTable.outerHTML
},
