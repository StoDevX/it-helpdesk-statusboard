command: 'echo ""',
refreshFrequency: 10000,

style: [
	"top: 25vh",
	"left: 13.33%",

	"width: 13.33%",
	"height: 25vh",

	"border-right: 0",
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
			'<h1 class="title">Equipment<br>Checkout</h1>',
		'</div>',
	].join('')
},

update: function(output, domEl) {
	if (!window.sto)                  return '';
	if (!window.sto.libs.lodash)      return '';
	if (!window.sto.data.openTickets) return '';

	var _ = window.sto.libs.lodash;
	var openTickets = window.sto.data.openTickets;

	var tickets = _.filter(openTickets, function(ticket) {
		return (
			ticket.problemtype &&
			ticket.problemtype.detailDisplayName &&
			ticket.problemtype.detailDisplayName === "Equipment Checkout"
		);
	});
	var ticketCount = tickets.length;

	var details = domEl.querySelector('.details');
	details.textContent = ticketCount;
},
