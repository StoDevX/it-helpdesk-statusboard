command: 'echo ""',
refreshFrequency: 36000000,

render: function(output) {
	return [
		'<link rel="stylesheet" type="text/css" href="/common/base.css">',
		'<link rel="stylesheet" type="text/css" href="/common/fira/fira.css">',
	].join('\n')
},
