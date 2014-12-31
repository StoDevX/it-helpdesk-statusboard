command: 'echo ""',
refreshFrequency: false,

render: function() {
	window.loaded = false

	$.getScript('./libraries/bluebird.js-lib', function() {
		return Promise.all([
			$.getScript('./libraries/csv.js-lib'),
			$.getScript('./libraries/eventEmitter.js-lib'),
			$.getScript('./libraries/lodash.js-lib'),
			$.getScript('./libraries/moment.js-lib'),
		]).then(function(libraries) {
			window.data = window.data || {}
			window.events = new EventEmitter()
			window.loaded = true
		})
	})

	return '<link rel="stylesheet" type="text/css" href="./base.css">'
},
