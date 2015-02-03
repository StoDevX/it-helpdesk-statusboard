refreshFrequency: false,

style: "border: 0",

render: function() {
	window.sto = window.sto || {
		libs: {},
		data: {},
	};

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
	window.sto.data.staff = staff;

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
	window.sto.data.colors = colors;

	return ''
}
