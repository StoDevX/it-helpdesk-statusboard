command: 'echo ""',
refreshFrequency: 10000,

style: [
	"top: 0",
	"left: 0",

	"width: 25%",
	"height: 50vh",

	"border-right: 0",
	"border-bottom: 0",

	"text-align: left",

	".details",
	"	font-size: 2em",
	"	font-weight: 100",
	"	opacity: 0.75",
	"	justify-content: flex-start",

	".counters li",
	"	display: flex",
	"	flex-flow: row nowrap",
	"	align-items: center",

	".count",
	"	flex-basis: 1.25em",
	"	text-align: right",

	".count-group",
	"	font-weight: 300",
	"	font-size: 0.85em",
	"	display: inline-block",
	"	margin: 0",
	"	margin-left: 0.75em",
	"	text-overflow: ellipsis",
	"	overflow: hidden",
	"	white-space: nowrap",
].join('\n'),

render: function(output) {
	return [
		'<div class="wrapper">',
			'<div class="details">',
				'<ul class="counters"></ul>',
			'</div>',
			'<h1 class="title">Ticket Counters</h1>',
		'</div>',
		'<audio class="noise" src="smw_riding_yoshi.mp3"></audio>',
		'<audio class="happy" src="happy.out.m4a"></audio>',
	].join('')
},

makeResultElements: function(id, name, count) {
	var ticketEl = document.createElement('li');
	ticketEl.className = id+'-tickets-counter' + this.calculateWarningColor(count);

	var ticketCountEl = document.createElement('output');
	ticketCountEl.className = 'count' + this.calculateFontWeight(count);
	ticketCountEl.textContent = count;
	ticketEl.appendChild(ticketCountEl);

	var ticketCountGroup = document.createElement('h1');
	ticketCountGroup.className = 'count-group';
	ticketCountGroup.textContent = name;
	ticketEl.appendChild(ticketCountGroup);

	return ticketEl;
},

priorTicketId: 0,
happyHasPlayed: 0,

makeOpenTicketsRow: function(openTickets, domEl) {
	return this.makeResultElements('open', 'Open Tickets', openTickets.length);
},

filterOnly: function(ticket, type) {
	return (
		ticket.problemtype &&
		ticket.problemtype.detailDisplayName &&
		ticket.problemtype.detailDisplayName === type
	);
},

makeRequestTypeRow: function(openTickets, filterBy, className, title) {
	var _ = window.sto.libs.lodash;
	title = title || filterBy;

	var tickets = _.filter(openTickets, function(ticket) {
		return this.filterOnly(ticket, filterBy);
	}, this);

	if (tickets.length)
		return this.makeResultElements(className, title, tickets.length);
	return document.createElement('li');
},

makeClassTechTicketsRow: function(openTickets) {
	return this.makeRequestTypeRow(openTickets, 'Classroom Technology', 'classtech');
},

makeEquipmentTicketsRow: function(openTickets) {
	return this.makeRequestTypeRow(openTickets, 'Equipment Checkout', 'equipment');
},

makeNetworkTicketsRow: function(openTickets) {
	return this.makeRequestTypeRow(openTickets, 'Network & Connectivity &#8226; Ethernet Activation Request', 'ethernet', 'Ethernet Requests');
},

makeStaffTicketsRow: function(openTickets) {
	var _ = window.sto.libs.lodash;
	var staff = window.sto.data.staff;

	function isStaffMember(ticket) {
		return _.contains(staff, ticket.clientTech.displayName);
	}

	var tickets = _.chain(openTickets)
		.filter('clientTech')
		.filter(isStaffMember)
		.value();

	if (tickets.length)
		return this.makeResultElements('staff', 'Assigned to Staff', tickets.length);
	return document.createElement('li');
},

calculateWarningColor: function calculateWarningColor(ticketCount) {
	if (ticketCount > 5) {
		return ' yellow';
	}
	else if (ticketCount === 0) {
		return ' gray';
	}
},

calculateFontWeight: function calculateFontWeight(ticketCount) {
	var _ = window.sto.libs.lodash;

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

	var result = '';
	fontWeight.forEach(function(weightClass) {
		if (ticketCount >= weightClass.min && (ticketCount <= weightClass.max || weightClass.max === null)) {
			result = ' ' + weightClass.weight;
		}
	})

	return result;
},

playNoises: function(openTickets, domEl) {
	var _ = window.sto.libs.lodash;

	var newestTicketId = 0;
	if (openTickets.length) {
		newestTicketId = _.chain(openTickets)
			.sortBy('id')
			.last()
			.value()
			.id;
	}

	var noise = domEl.querySelector('.noise');
	var happy = domEl.querySelector('.happy');

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
},

update: function(output, domEl) {
	if (!window.sto)                  return '';
	if (!window.sto.libs.lodash)      return '';
	if (!window.sto.data.openTickets) return '';

	var _ = window.sto.libs.lodash;
	var openTickets = window.sto.data.openTickets;

	this.playNoises(openTickets, domEl);

	var counters = domEl.querySelector('.counters');

	counters.innerHTML = "";
	counters.appendChild(this.makeOpenTicketsRow(openTickets, domEl));
	counters.appendChild(this.makeClassTechTicketsRow(openTickets));
	counters.appendChild(this.makeEquipmentTicketsRow(openTickets));
	counters.appendChild(this.makeNetworkTicketsRow(openTickets));
	counters.appendChild(this.makeStaffTicketsRow(openTickets));
},
