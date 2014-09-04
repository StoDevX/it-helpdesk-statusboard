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

render: function(argument) {
	return "";
},

update: function(output, domEl) {
	localStorage.setItem('stolaf-closed-tickets', output);
}