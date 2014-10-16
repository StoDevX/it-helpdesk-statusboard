command: 'echo ""',
refreshFrequency: 10000,

style: [
	"right: 0",
	"top: 0",

	"height: 97vh",
	"width: 20%",

	"color: rgba(255, 255, 255, 0.5)",

	".details",
	"	font-size: 1em",

	".title",
	"	margin-top: 1em",

	"ul",
	"	height: 100vh",
	"	display: flex",
	"	flex-flow: column nowrap",
	"	justify-content: space-between",

	".detail-row, .ticket-title",
	"	text-overflow: ellipsis",
	"	overflow: hidden",
	"	white-space: nowrap",
	"	color: white",

	".detail-row",
	"	margin: 0",
	"	font-size: 1.2em",
	"	font-weight: 500",

	".ticket-title",
	"	margin: 0.25em 0 0em 0",
	"	font-size: 1em",
	"	font-weight: 400",
	"	line-height: 1.2",

	".item",
	"	margin-bottom: 0.85em",

	".item:last-child",
	"	margin-bottom: 0",

	".ticket-number::before",
	"	content: '#'",
	".ticket-number::after",
	"	content: ' — '",

	".info-row",
	"	line-height: 1",

	".info-row, .ticket-title, .type-row",
	"	font-size: 0.85em",
	"	font-weight: 300",

	".type-row",
	"	font-size: 0.75em",
	"	letter-spacing: 0.015em",

	".client-name::after",
	"	content: ' — '",

	".link-wrapper",
	"	color: inherit",
	"	text-decoration: none",
	"	cursor: pointer",
].join('\n'),

render: function(output) {
	return [
		'<div class="wrapper">',
			'<div class="details"></div>',
			'<h1 class="title">Fresh Tickets</h1>',
		'</div>',
	].join('')
},

update: function(output, domEl) {
	if (!window.sto)                  return '';
	if (!window.sto.libs.lodash)      return '';
	if (!window.sto.libs.moment)      return '';
	if (!window.sto.data.openTickets) return '';

	var _ = window.sto.libs.lodash;
	var moment = window.sto.libs.moment;

	var openTickets = window.sto.data.openTickets;

	var sortedTickets = _.chain(openTickets)
		.map(function(ticket) {
			ticket.lastUpdatedTime = new Date(ticket.lastUpdated);
			return ticket;
		})
		.sortBy('lastUpdatedTime')
		.reverse()
		.first(7)
		.value();

	var wrapper = domEl.querySelector('.wrapper');
	var details = domEl.querySelector('.details');

	var contentList = document.createElement('ul');
	contentList.className = 'list';

	_.each(sortedTickets, function(ticket) {
		var link = document.createElement('a');
		link.className = 'link-wrapper';
		link.href = ticket.bookmarkableLink;

		var item = document.createElement('li');
		item.className = 'item';

		var infoRow = document.createElement('div');
		infoRow.className = 'info-row';

		var ticketNum = document.createElement('span');
		ticketNum.className = 'ticket-number';
		ticketNum.textContent = ticket.id;
		infoRow.appendChild(ticketNum);

		var updateDate = document.createElement('time');
		updateDate.className = 'date-updated';
		updateDate.dateTime = ticket.lastUpdatedTime;
		updateDate.textContent = moment(ticket.lastUpdatedTime).add(5, 'hours').calendar();
		infoRow.appendChild(updateDate);

		item.appendChild(infoRow);

		/////

		var titleRow = document.createElement('div');
		titleRow.className = 'title-row';

		var titleEl = document.createElement('h1');
		titleEl.className = 'ticket-title';
		var firstLine = ticket.detail.split('\r').length ? ticket.detail.split('\r')[0] : '';
		titleEl.innerHTML = ticket.subject || firstLine + '</a>';
		titleRow.appendChild(titleEl);

		item.appendChild(titleRow);

		/////

		var detailRow = document.createElement('div');
		detailRow.className = 'detail-row';

		var clientName = document.createElement('span');
		clientName.className = 'client-name';
		clientName.textContent = ticket.displayClient;
		detailRow.appendChild(clientName);

		var noteCount = document.createElement('span');
		noteCount.className = 'note-count';
		noteCount.textContent = ticket.notes.length + (ticket.notes.length === 1 ? ' note' : ' notes');
		detailRow.appendChild(noteCount);

		item.appendChild(detailRow);

		/////

		var ticketTypeRow = document.createElement('div');
		ticketTypeRow.className = 'type-row';

		var detailDisplayName = document.createElement('span');
		detailDisplayName.innerHTML = ticket.problemtype.detailDisplayName;
		detailDisplayName.className = 'ticket-type';
		detailRow.appendChild(detailDisplayName);

		ticketTypeRow.appendChild(detailDisplayName);

		item.appendChild(ticketTypeRow);

		/////

		link.appendChild(item);
		contentList.appendChild(link);
	})

	details.innerHTML = contentList.outerHTML
},
