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

render: function(output) {
	return '<span class="last-updated"></span>';
},

lastUpdateTime: undefined,

update: function(output, domEl) {
	localStorage.setItem('stolaf-closed-tickets', output);
	this.lastUpdateTime = new Date();

	var m = this.lastUpdateTime;
	var dateString =
		m.getUTCFullYear() + "/" +
		("0" + (m.getUTCMonth()+1)).slice(-2) + "/" +
		("0" + m.getUTCDate()).slice(-2) + " " +
		("0" + m.getUTCHours()).slice(-2) + ":" +
		("0" + m.getUTCMinutes()).slice(-2);

	document.querySelector('.last-updated').textContent = dateString;
}
