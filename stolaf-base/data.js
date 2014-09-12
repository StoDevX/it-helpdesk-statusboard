command: 'echo ""',
refreshFrequency: 3600000,

style: "border: 0",

render: function() {
	var staff = [
		'Mike Sjulstad',
		'Phinehas Bynum',
		'Nhia Lee',
		'Jennie Moberg',
		'Michael Domingues',
		'Perrin Bishop-Wright',
		'Tony Skalski',
		'Ben Gottfried',
		'Roberta Lembke',
		'Kelly Kloos',
		'Wendy Woitalla',
		'Jeff Dixon',
		'Tim Isom',
		'Andy Prehall',
		'Michael Strand',
		'Myron Engle',
		'Craig Rice',
		'Bob Breid',
		'Nancy Aarsvold',
		'Doug Hamilton',
		'Jason Menard',
		'Dana Thompson',
		'Sean Tonko',
		'Dan Beach',
		'Marc Thomas',
	];
	localStorage.setItem('stolaf-staff', JSON.stringify(staff));

	var colors = [
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
	localStorage.setItem('stolaf-colors', JSON.stringify(colors));

	return ''
}
