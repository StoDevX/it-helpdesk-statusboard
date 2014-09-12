command: 'echo ""',
refreshFrequency: 10000,

style: [
	"top: 25vh",
	"left: 0%",

	"width: 13.33%",
	"height: 25vh",

	"border-right: 0",
	"border-top: 0",

	"text-align: center",
	"color: rgba(174, 183, 188, 0.8)",

	".details",
	"	font-size: 4em",
	"	font-weight: 100",
].join('\n'),

render: function(output) {
	return [
		'<div class="wrapper">',
			'<div class="details"></div>',
			'<h1 class="title">Assigned<br>to Staff</h1>',
		'</div>',
	].join('')
},

update: function(output, domEl) {
	var openTickets = JSON.parse(localStorage.getItem('stolaf-open-tickets'));
	var staff = JSON.parse(localStorage.getItem('stolaf-staff'));

	function isStaffMember(ticket) {
		return _.contains(staff, ticket.clientTech.displayName);
	}

	var tickets = _.chain(openTickets)
		.filter('clientTech')
		.filter(isStaffMember)
		.value();
	var ticketCount = tickets.length;

	var details = domEl.querySelector('.details');
	details.textContent = ticketCount;
},
