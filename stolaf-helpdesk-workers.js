command: 'curl --silent "https://www3.whentowork.com/cgi-bin/w2wC.dll/empwhosonlater.htm?SID=500606355428D"',

refreshFrequency: 60000,

render: function(output) {
	return [
		'<div class="wrapper">',
			'<div class="details"></div>',
			'<h1 class="title">Next Up @Helpdesk</h1>',
		'</div>',
	].join('')
},

update: function(output, domEl) {
	var details = domEl.querySelector('.details');
	details.innerHTML = output;
}