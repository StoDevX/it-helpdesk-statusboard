command: [
	'echo ./whd-api-key.txt | xargs curl --silent ',
		'"https://help.stolaf.edu/helpdesk',
		'/WebObjects/Helpdesk.woa/ra/Tickets?',
		'style=details&',
		'qualifier=(statustype.statusTypeName%3D%27Closed%27)&',
		'limit=50&',
		'apiKey="',
].join(''),

refreshFrequency: 60000,
lastUpdateTime: undefined,

style: [
	"bottom: 0",
	"left: 25%",
	"width: 25%",
	"height: 3%",

	"border: 0",
	"color: rgba(255, 255, 255, 0.5)",
	"font-weight: 300",

	"display: flex",
	"flex-flow: row nowrap",
	"justify-content: center",
	"align-items: center",

	"main",
	"	display: inline-block",

	"button",
	"	color: inherit",
	"	background: hsla(0, 0%, 90%, 0.25)",
	"	border: 0",
	"	border-radius: 50px",
	"	margin-left: 1em"
].join('\n'),

render: function(argument) {
	return [
		'<main class="center">Closed Tickets: <span class="last-updated"></span></main>',
		//'<button>↻</button>',
	].join('');
},

update: function(output, domEl) {
	if (!window.sto)             return '';
	if (!window.sto.libs.moment) return '';
	var moment = window.sto.libs.moment;

	window.sto.data.closedTickets = JSON.parse(output);

	this.lastUpdateTime = new Date();
	domEl.querySelector('.last-updated').textContent = moment(this.lastUpdateTime).calendar();
},
