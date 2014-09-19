command: 'echo ""',
refreshFrequency: 10000,

style: [
	"left:  0",
	"bottom: 3%",

	"width: 20%",
	"height: 47vh",

	".details",
	"	font-size: 1.5em",
	"	line-height: 1",
	"	padding-top: 1.5rem",
	"	padding-left: 1.5rem",
	"	padding-right: 1.5rem",

	"ul",
	"	height: 100vh",
	"	display: -webkit-flex",
	"	-webkit-flex-flow: column nowrap",
	"	-webkit-justify-content: space-between",

	"li",
	"	display: -webkit-flex",
	"	-webkit-flex-flow: row nowrap",
	"	-webkit-justify-content: space-between",

	"span:first-child",
	"	font-weight: 300",
	"	text-overflow: ellipsis",
	"	overflow: hidden",
	"	white-space: nowrap",

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
	if (!window.sto)               return '';
	if (!window.sto.libs.lodash)   return '';
	if (!window.sto.data.openTickets) return '';
	if (!window.sto.data.closedTickets) return '';
	if (!window.sto.data.colors) return '';

	var _ = window.sto.libs.lodash;

	var details = domEl.querySelector('.details');

	var openTickets = window.sto.data.openTickets;
	var closedTickets = window.sto.data.closedTickets;
	var tickets = _.flatten([openTickets, closedTickets]);

	function hasTechNote(note) {
		return (
			    note.isTechNote
			&& !note.isHidden
			&&  note.mobileNoteText.length > 10
		)
	}

	var colors = window.sto.data.colors;
	var staff = window.sto.data.staff;

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

	var restOfResponders = _.chain(responders)


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
