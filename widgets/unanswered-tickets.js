command: 'echo ""',
refreshFrequency: false,

style: [
	"top:   0",
	"right: 20%",

	"width: 32%",
	"height: 50vh",

	"border-right: 0",
	"border-left: 0",

	"text-align: center",

	".details",
	"	font-size: 15em",
].join('\n'),

render: function(output) {
	return [
		'<div class="wrapper">',
			'<div class="details"></div>',
			'<h1 class="title">Unanswered Tickets</h1>',
		'</div>',
	].join('')
},

afterRender: function(domEl) {
	var self = this
	if (!window.loaded) {
		window.clearTimeout(self.setTimeoutId)
		self.setTimeoutId = window.setTimeout(self.refresh, 1000)
		return;
	}

	window.events.on('open-tickets', self.reloadWithData.bind(domEl))
},

reloadWithData: function(domEl) {
	if (!domEl.querySelector('last-updated'))
		this.render()

	var openTickets = window.data.openTickets;

	var unansweredTickets = _.filter(openTickets, {'notes': []});

	var clientResponseTickets = _.chain(openTickets)
		.reject({'notes': []})
		.reject(function(ticket) {
			return ticket.notes[0].isTechNote;
		})
		.value();

	var ticketCount = unansweredTickets.length + clientResponseTickets.length;

	var wrapper = domEl.querySelector('.wrapper');
	var details = domEl.querySelector('.details');

	details.textContent = ticketCount;

	var fontWeight = [
		{min:  0,  max:  0,   weight: 'w100'},
		{min:  1,  max:  5,   weight: 'w200'},
		{min:  6,  max: 10,   weight: 'w300'},
		{min: 11,  max: 15,   weight: 'w400'},
		{min: 16,  max: 20,   weight: 'w500'},
		{min: 21,  max: 25,   weight: 'w600'},
		{min: 26,  max: 30,   weight: 'w700'},
		{min: 31,  max: 35,   weight: 'w800'},
		{min: 36,  max: null, weight: 'w900'},
	];

	_.find(fontWeight, function(weightClass) {
		if (ticketCount >= weightClass.min && (ticketCount <= weightClass.max || _.isNull(weightClass.max))) {
			details.className = 'details ' + weightClass.weight;
		}
	})

	if (ticketCount === 0) {
		wrapper.className = 'wrapper green';
	}
	else {
		wrapper.className = 'wrapper red';
	}
},
