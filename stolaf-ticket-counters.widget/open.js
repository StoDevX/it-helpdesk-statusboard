command: 'echo ""',
refreshFrequency: 10000,

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
	"	opacity: 0.5",

	".w100 { font-weight: 100 }",
	".w200 { font-weight: 200 }",
	".w300 { font-weight: 300 }",
	".w400 { font-weight: 400 }",
	".w500 { font-weight: 500 }",
	".w600 { font-weight: 600 }",
	".w700 { font-weight: 700 }",
	".w800 { font-weight: 800 }",
	".w900 { font-weight: 900 }",
].join('\n'),

render: function(output) {
	return [
		'<div class="wrapper">',
			'<div class="details"></div>',
			'<h1 class="title">Open<br>Tickets</h1>',
		'</div>',
		'<audio class="noise" src="inceptionbutton.mp3"></audio>',
		'<audio class="happy" src="happy.out.m4a"></audio>',
	].join('')
},

priorTicketId: 0,
happyHasPlayed: 0,


update: function(output, domEl) {
	if (!window.sto)                  return '';
	if (!window.sto.libs.lodash)      return '';
	if (!window.sto.data.openTickets) return '';

	var _ = window.sto.libs.lodash;
	var openTickets = window.sto.data.openTickets;
	var ticketCount = openTickets.length;

	var wrapper = domEl.querySelector('.wrapper');
	var details = domEl.querySelector('.details');
	var noise = domEl.querySelector('.noise');
	var happy = domEl.querySelector('.happy');

	var newestTicketId = 0;
	if (openTickets.length) {
		newestTicketId = _.chain(openTickets)
			.sortBy('id')
			.last()
			.value()
			.id;
	}

	if (newestTicketId > this.priorTicketId) {
		noise.play();
	}

	if (openTickets.length === 0 && !this.happyHasPlayed) {
		happy.play();
		this.happyHasPlayed = true;
	} else {
		this.happyHasPlayed = false;
	}

	this.priorTicketId = newestTicketId;
	details.textContent = ticketCount;

	if (ticketCount > 0)
		wrapper.className = 'wrapper yellow';
	else if (ticketCount === 0)
		wrapper.className = 'wrapper green';

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
},
