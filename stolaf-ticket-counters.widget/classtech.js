command: 'echo ""',
refreshFrequency: 10000,

style: [
	"top: 25vh",
	"left: 26.66%",

	"width: 13.33%",
	"height: 25vh",

	"border-left: 0",
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
			'<h1 class="title">Classroom<br>Technology</h1>',
		'</div>',
	].join('')
},

update: function(output, domEl) {
	var openTickets = JSON.parse(localStorage.getItem('stolaf-open-tickets'));

	var tickets = _.filter(openTickets, function(ticket) {
		return (
			ticket.problemtype &&
			ticket.problemtype.detailDisplayName &&
			ticket.problemtype.detailDisplayName === "Classroom Technology"
		);
	});
	var ticketCount = tickets.length;

	var details = domEl.querySelector('.details');
	details.textContent = ticketCount;
},
