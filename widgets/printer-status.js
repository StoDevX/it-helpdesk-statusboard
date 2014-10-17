command: 'echo ""',
refreshFrequency: 10000,

style: [
	"left: 20vw",
	"bottom: 3vh",

	"height: 47vh",
	"width: 60%",

	"text-align: center",
	"font-size: 1.2em",

	".details",
	"	font-size: 1em",

	".title",
	"	margin-top: 1em",

	".heading",
	"	font-weight: 200",
	"	font-size: 1em",
	"	margin: .5em 0 0 0",

	".inner-list",
	"	color: black",

	".inner-list li",
	"	display: inline-block",
	"	padding-left: 0.35em",
	"	padding-right: 0.35em",
	"	background-color: rgba(255, 255, 255, 0.65)",
	"	border-radius: 0.25em",
	"	margin: 0.15em 0.15em",
].join('\n'),

render: function(output) {
	return [
		'<div class="wrapper">',
			'<div class="details"></div>',
			'<h1 class="title">Printer Status</h1>',
		'</div>',
	].join('')
},

update: function(output, domEl) {
	if (!window.sto)               return '';
	if (!window.sto.libs.lodash)   return '';
	if (!window.sto.data.printers) return '';

	var _ = window.sto.libs.lodash;

	var printers = _.cloneDeep(window.sto.data.printers);
	var printerErrorStates = _.chain(printers)
		.reject({'error': "No Error"})
		.reject({'error': "Paper Low"})
		.filter(function(printer) {
			return printer.name && _.contains(printer.name.toLowerCase(), 'mfc-')
		})
		.groupBy('error')
		.value();

	printerErrorStates['Low Toner (< 10%)'] = _.chain(printers)
		.filter(function(printer) {
			return printer.toner < 10
		})
		.map(function(printer) {
			printer.name = printer.name + ' (' + printer.toner + '%)'
			if (printer.toner < 5)
				printer.className = 'bg-yellow'
			if (printer.toner <= 1)
				printer.className = 'bg-orange'
			return printer
		})
		.sortBy('toner')
		.value();

	var details = domEl.querySelector('.details');

	var contentList = document.createElement('ul');
	contentList.className = 'list';

	var printerCount = 8;
	_.each(printerErrorStates, function(printers, key) {
		var printerlist = _.first(printers, printerCount);

		var group = document.createElement('li');
		group.className = 'group';

		var title = document.createElement('h1');
		title.className = 'heading'
		title.textContent = key;
		group.appendChild(title);

		var printerList = document.createElement('ul');
		printerList.className = 'inner-list';
		_.each(printerlist, function(printer) {
			var printerAsElement = document.createElement('li');
			if (printer.className) printerAsElement.className = printer.className
			printerAsElement.textContent = printer.name;
			printerList.appendChild(printerAsElement);
		})

		group.appendChild(printerList)
		contentList.appendChild(group);
	})

	details.innerHTML = contentList.outerHTML
},
