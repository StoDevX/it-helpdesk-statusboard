command: 'curl --silent "https://help.stolaf.edu/helpdesk/WebObjects/Helpdesk.woa/ra/Tickets?style=details&qualifier=%28statustype.statusTypeName%3D%27Open%27%29&limit=100&apiKey=***REMOVED***" || echo "null"',

refreshFrequency: 60000,

style: [
	"top: 350px",
	"left: 50px",
	"width: 260px",

	"color: rgb(255, 255, 255)",
	"background-color: rgba(0, 0, 0, 0.6)",

	"text-align: center",

	"box-sizing: border-box",

	"*, *::before, *::after",
	"	box-sizing: inherit",

	".wrapper",
	"	display: -webkit-flex",
	"	-webkit-flex-direction: column",
	"	-webkit-justify-content: space-between",

	".wrapper > *",
	"	padding: 0.5rem 2rem",
	".wrapper > *:first-child",
	"	padding-top: 2rem",
	".wrapper > *:last-child",
	"	padding-bottom: 2rem",

	".danger",
	"	color: rgb(255,  48,   0)",
	".success",
	"	color: rgb(  0, 186,   0)",

	".title, .details",
	"	display: -webkit-flex;",
	"	-webkit-flex-direction: column;",
	"	-webkit-justify-content: center;",
	"	-webkit-align-items: center;",

	".title",
	"	text-transform: uppercase",
	"	margin: 0",
	"	font-size: 1.75em",
	"	color: rgb(128, 128, 128)",
	"	-webkit-flex: 1",

	".details",
	"	font-size: 6em",
	"	-webkit-flex: 1",
].join('\n'),

render: function(output) {
	return [
		'<div class="wrapper">',
			'<div class="details"></div>',
			'<h1 class="title"></h1>',
		'</div>',
	].join('')
},

update: function(output, domEl) {
	var openTickets = JSON.parse(output);
	var openTicketCount = openTickets.length;

	var wrapper = domEl.querySelector('.wrapper');
	var details = domEl.querySelector('.details');
	var title = domEl.querySelector('.title');

	title.textContent = 'Open Tickets';
	details.textContent = openTicketCount;

	if (openTicketCount > 0)
		wrapper.classList.add('danger');
	else if (openTicketCount === 0)
		wrapper.classList.add('success');
},
