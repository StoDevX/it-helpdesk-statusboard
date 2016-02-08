command: 'echo ""',
refreshFrequency: 10000,

style: [
	"top: 0",
	"left: 70vw",

	"width: 30%",
	"height: 50vh",

	"border-right: 0",
	"border-left: 0",

	"text-align: center",

	".details",
	"	font-size: 15em",

	"color: #bababa"
].join('\n'),

render: function(output) {
	return [
		'<div class="wrapper">',
			'<div class="details"></div>',
			'<h1 class="title">Open Tickets</h1>',
		'</div>',
	].join('')
},

update: function(output, domEl) {
	if (!window.sto)                  return '';
	if (!window.sto.libs.lodash)      return '';
	if (!window.sto.data.openTickets) return '';

	var openTickets = window.sto.data.openTickets;
	var awaitingClientTickets = window.sto.data.awaitingClientTickets;

	// openTickets = _.filter(openTickets, function(ticket) {
	// 	return ticket.prioritytype && 
	// 		ticket.prioritytype.priorityTypeName === 'Normal Svc Req'
	// })

	var ticketCount = openTickets.length

	var wrapper = domEl.querySelector('.wrapper');
	var details = domEl.querySelector('.details');

	details.textContent = ticketCount;
},
