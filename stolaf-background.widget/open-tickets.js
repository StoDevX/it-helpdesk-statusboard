command: [
	'curl --silent ',
		'"https://help.stolaf.edu/helpdesk',
		'/WebObjects/Helpdesk.woa/ra/Tickets?',
		'style=details&',
		'qualifier=(statustype.statusTypeName%3D%27Open%27)&',
		'limit=50&',
		'apiKey=***REMOVED***"',
].join(''),

refreshFrequency: 60000,
lastUpdateTime: undefined,

style: [
	"bottom: 0",
	"left: 0",
	"width: 25%",
	"text-align: center",
	"border: 0",
	"height: 3%",
	"vertical-align: middle",
	"color: rgba(255, 255, 255, 0.5)",
	"font-weight: 300",
].join('\n'),

render: function(argument) {
	return 'Open Tickets: <span class="last-updated"></span>';
},

update: function(output, domEl) {
	localStorage.setItem('stolaf-open-tickets', output);
	this.lastUpdateTime = new Date();

	domEl.querySelector('.last-updated').textContent = moment(this.lastUpdateTime).calendar();
},
