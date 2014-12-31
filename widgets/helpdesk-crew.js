command: 'echo ""',
refreshFrequency: false,

style: [
	"left: 25%",
	"top: 0",

	"width: 23%",
	"height: 50vh",

	"text-align: center",

	".details",
	"	padding-top: 0.5rem",

	"time",
	"	font-weight: 200",
	"	font-size: 1.5em",
	"	color: rgba(255, 255, 255, 0.65)",
	"	padding-bottom: 0.25rem",

	"div .title",
	"	margin-bottom: 0em",
	"	padding-bottom: 0em",
	"	font-family: Fira Sans",
	"	font-weight: 600",

	".workers",
	"	font-weight: 400",
	"	font-size: 1.5em",
	"	color: rgba(255, 255, 255, 0.75)",

	".wrapper",
	"	color: inherit",
	"	text-decoration: none",
	"	cursor: pointer",
	"	padding-top: 2em",
].join('\n'),

render: function(output) {
	return [
		'<a class="wrapper" href="https://whentowork.com/cgi-bin/w2w.dll/login">',
			'<div class="now">',
				'<h1 class="title">Now @Helpdesk</h1>',
				'<div class="details"></div>',
			'</div>',
			'<div class="next">',
				'<h1 class="title">Next @Helpdesk</h1>',
				'<div class="details"></div>',
			'</div>',
			'<h1 class="title">☠ Helpdesk</h1>',
		'</a>',
	].join('');
},

afterRender: function(domEl) {
	var self = this
	if (!window.loaded) {
		window.clearTimeout(self.setTimeoutId)
		self.setTimeoutId = window.setTimeout(self.refresh, 1000)
	}

	window.events.on('helpdesk-workers', self.reloadWithData.bind(domEl))
},

reloadWithData: function(domEl) {
	(function addLaterShifts() {
		var laterShifts = window.data.shifts.later;
		var next = domEl.querySelector('.next .details');
		next.innerHTML = "";

		if (laterShifts.length === 0) {
			next.textContent = "No more shifts scheduled as of " + moment().format('ha[.]');
			return "";
		}

		var onlyHelpdeskShifts = _.reject(laterShifts, {'location': 'Library'});
		var helpdeskShifts = _.chain(onlyHelpdeskShifts)
			.groupBy('startTime')
			.toArray()
			.first()
			.value();

		if (!onlyHelpdeskShifts.length)
			return;

		var list = document.createElement('ul');
		list.className = 'workers';
		_.each(helpdeskShifts, function(shift) {
			var item = document.createElement('li');
			item.textContent = shift.name;
			list.appendChild(item);
		})
		next.appendChild(list);

		var time = document.createElement('time');
		time.textContent = '⟨ ' + helpdeskShifts[0].time + ' ⟩';
		next.appendChild(time);
	})();

	/////

	(function addCurrentShifts() {
		var currentShifts = window.data.shifts.now;
		var now = domEl.querySelector('.now .details');
		now.innerHTML = "";

		if (currentShifts.length === 0) {
			now.textContent = "No-one is currently scheduled.";
			return "";
		}

		var onlyHelpdeskShifts = _.reject(currentShifts, {'location': 'Library'});
		var helpdeskShifts = _.chain(onlyHelpdeskShifts)
			.groupBy('startTime')
			.toArray()
			.first()
			.value();

		var list = document.createElement('ul');
		list.className = 'workers';
		_.each(helpdeskShifts, function(shift) {
			var item = document.createElement('li');
			item.textContent = shift.name;
			list.appendChild(item);
		})

		now.appendChild(list);
	})();
}
