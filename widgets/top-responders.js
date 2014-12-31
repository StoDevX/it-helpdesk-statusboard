command: 'echo ""',
refreshFrequency: false,

style: [
	"left:  0",
	"bottom: 3%",

	"width: 20%",
	"height: 47vh",

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

afterRender: function(domEl) {
	var self = this
	if (!window.loaded) {
		window.clearTimeout(self.setTimeoutId)
		self.setTimeoutId = window.setTimeout(self.refresh, 1000)
	}

	window.events.on('open-tickets', self.reloadWithData.bind(domEl))
	window.events.on('closed-tickets', self.reloadWithData.bind(domEl))
},

reloadWithData: function(domEl) {
	var details = domEl.querySelector('.details');

	var openTickets = window.data.openTickets;
	var closedTickets = window.data.closedTickets;
	var tickets = _.flatten([openTickets, closedTickets]);

	function hasTechNote(note) {
		return (
			    note.isTechNote
			&& !note.isHidden
			&&  note.mobileNoteText.length > 10
		)
	}

	var colors = window.data.colors;
	var staff = window.data.staff;

	function isStaffMember(note) {
		return _.contains(staff, responderName(note));
	}

	function responderName(note) {
		return note.prettyUpdatedString.replace(/.*<strong>(.+)<\/strong>.*/gm, "$1")
	}

	var responders = _.chain(tickets)
		.reject({notes: []})
		.pluck('notes')
		.flatten()
		.filter(hasTechNote)
		.reject(isStaffMember)
		.groupBy(responderName)
		.mapValues(_.size)
		.pairs()
		.sortBy(function(item) {
			return item[1]
		})
		.value();

	var topResponders = _.chain(responders)
		.reverse()
		.first(9)
		.value();

	var contentTable = document.createElement('ul');
	contentTable.classList.add('colorful');

	_.each(topResponders, function(pair, index) {
		var item = document.createElement('li');
		var nameCell = document.createElement('span');
		var numberCell = document.createElement('span');

		item.classList.add(colors[index]);

		nameCell.textContent = pair[0];
		numberCell.textContent = pair[1];

		item.appendChild(nameCell);
		item.appendChild(numberCell);

		contentTable.appendChild(item);
	})

	details.innerHTML = contentTable.outerHTML;
},
