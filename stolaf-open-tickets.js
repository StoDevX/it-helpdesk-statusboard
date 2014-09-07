command: 'echo ""',
refreshFrequency: 60000,

style: [
	"bottom: 4%",
	"left:   1%",

	"width: 15%",

	"text-align: center",

	"border-right: 0",

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
