command: 'echo ""',
refreshFrequency: 60000,

style: [
	"top: 0",
	"left: 0",

	"width: 20%",
	"height: 25vh",

	"border-right: 0",
	"border-bottom: 0",

	"text-align: center",

	".details",
	"	font-size: 4em",
	"	font-weight: 100",
].join('\n'),

render: function(output) {
	return [
		'<div class="wrapper">',
			'<div class="details"></div>',
			'<h1 class="title">Open<br>Tickets</h1>',
		'</div>',
	].join('')
},

update: function(output, domEl) {
	var openTickets = JSON.parse(localStorage.getItem('stolaf-open-tickets'));
	var openTicketCount = openTickets.length;

	var wrapper = domEl.querySelector('.wrapper');
	var details = domEl.querySelector('.details');

	details.textContent = openTicketCount;

	if (openTicketCount > 0)
		wrapper.className = 'wrapper yellow';
	else if (openTicketCount === 0)
		wrapper.className = 'wrapper green';
},
