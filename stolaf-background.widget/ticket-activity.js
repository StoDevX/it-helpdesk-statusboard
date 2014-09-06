command: [
	'curl --silent ',
		'"https://help.stolaf.edu/helpdesk',
		'/WebObjects/Helpdesk.woa/ra/',
		'ActivityMonitorActions/',
		'jsonData?widget=10"',
].join(''),

refreshFrequency: 60000,

render: function(output) {
	return '<span class="last-updated"></span>';
},

lastUpdateTime: undefined,

update: function(output, domEl) {
	localStorage.setItem('stolaf-ticket-activity', output);
	this.lastUpdateTime = new Date();

	var m = this.lastUpdateTime;
	var dateString =
		m.getUTCFullYear() + "/" +
		("0" + (m.getUTCMonth()+1)).slice(-2) + "/" +
		("0" + m.getUTCDate()).slice(-2) + " " +
		("0" + m.getUTCHours()).slice(-2) + ":" +
		("0" + m.getUTCMinutes()).slice(-2);

	document.querySelector('.last-updated').textContent = 'Ticket Activity: ' + dateString;
}
