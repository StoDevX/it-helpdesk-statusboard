command: 'echo ""',
refreshFrequency: 10000,

style: [
	"bottom: 3vh",
	"left: 70vw",

	"width: 30%",
	"height: 50vh",

	"border-right: 0",
	"border-left: 0",

	"text-align: center",

	".details",
	"	font-size: 15em",
	"	padding-top: 0",
	"	padding-bottom: 2rem",

	".title",
	"	padding-bottom: 0",
	"	padding-top: 1rem",
].join('\n'),

render: function(output) {
	return [
		'<div class="wrapper">',
			'<h1 class="title">Unanswered Tickets</h1>',
			'<div class="details"></div>',
		'</div>',
	].join('')
},

update: function(output, domEl) {
	if (!window.sto)                  return '';
	if (!window.sto.libs.lodash)      return '';
	if (!window.sto.data.openTickets) return '';
	if (!window.sto.data.awaitingClientTickets) return '';

	var _ = window.sto.libs.lodash;
	var moment = window.sto.libs.moment;
	var openTickets = window.sto.data.openTickets;
	var awaitingClientTickets = window.sto.data.awaitingClientTickets;

	openTickets = _.filter(openTickets, function(ticket) {
		return ticket.prioritytype && 
			ticket.prioritytype.priorityTypeName === 'Normal Svc Req'
	})

	var unansweredTickets = _.filter(openTickets, {'notes': []})

	var clientResponseTickets = _.chain(openTickets)
		.reject({'notes': []})
		.reject(function(ticket) {
			return ticket.notes[0].isTechNote
		})
		.value();

	// function extract(ticket) {
		// return [ticket.id, ticket.subject || ticket.detail.split('\r').length ? ticket.detail.split('\r')[0] : '']
		// return [ticket.id, ticket.prioritytype.priorityTypeName]
	// }

	// console.groupCollapsed('ticket names')
	// _(unansweredTickets).map(extract).each(function(info){console.log(info)}).value()
	// _(clientResponseTickets).map(extract).each(function(info){console.log(info)}).value()
	// console.groupEnd('ticket names')

	var ticketCount = unansweredTickets.length + 
		clientResponseTickets.length

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
