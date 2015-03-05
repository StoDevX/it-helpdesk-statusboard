command: 'echo ""',
refreshFrequency: false,

render: function() {
	window.loaded = false

	$.getScript('/common/libraries/bluebird.js-lib', function() {
		return Promise.all([
			$.getScript('/common/libraries/csv.js-lib'),
			$.getScript('/common/libraries/eventEmitter.js-lib'),
			$.getScript('/common/libraries/lodash.js-lib'),
			$.getScript('/common/libraries/moment.js-lib'),
		]).then(function(libraries) {
			window.data = window.data || {}
			window.events = new EventEmitter()
			window.loaded = true
			console.info('done loading')
		})
	})
},
