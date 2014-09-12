command: [
	'curl --silent ',
		'"https://help.stolaf.edu/helpdesk',
		'/WebObjects/Helpdesk.woa/ra/Tickets?',
		'style=details&',
		'qualifier=(statustype.statusTypeName%3D%27Closed%27)&',
		'limit=50&',
		'apiKey=***REMOVED***"',
].join(''),

refreshFrequency: 60000,
lastUpdateTime: undefined,

style: [
	"bottom: 0",
	"left: 66.66%",
	"width: 33.33%",
	"text-align: center",
	"border: 0",
	"height: 3%",
	"vertical-align: middle",
	"color: rgba(255, 255, 255, 0.5)",
	"font-weight: 300",
].join('\n'),

render: function(argument) {
	return 'Closed Tickets: <span class="last-updated"></span>';
},

update: function(output, domEl) {
	localStorage.setItem('stolaf-closed-tickets', output);
	this.lastUpdateTime = new Date();

	domEl.querySelector('.last-updated').textContent = moment(this.lastUpdateTime).calendar();
},
