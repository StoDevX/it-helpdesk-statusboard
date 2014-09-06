command: 'echo ""',

refreshFrequency: 60000,

style: [
	"bottom: 50px",
	"left:   50px",

	"width: 260px",

	".details",
	"	font-size: 6em",
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
	var openTickets = JSON.parse(localStorage.getItem('stolaf-open-tickets'));
	var openTicketCount = openTickets.length;

	var wrapper = domEl.querySelector('.wrapper');
	var details = domEl.querySelector('.details');

	details.textContent = openTicketCount;

	if (openTicketCount > 0)
		wrapper.className = 'wrapper danger';
	else if (openTicketCount === 0)
		wrapper.className = 'wrapper success';
},
