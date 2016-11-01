refreshFrequency: false

style: "border: 0"

render: () ->
	window.sto ?= {
		libs: {},
		data: {},
	}

	window.sto.data.colors = [
		'red',
		'orange',
		'yellow',
		'green',
		'blue',
		'purple',
		'pink',
		'aqua',
		'silver',
	]

	return ''
