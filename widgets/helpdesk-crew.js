command: 'echo ""',
refreshFrequency: 10000,

style: [
	"left: 0",
	"top: 0",

	"width: 20%",
	"height: 97vh",

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
			'<div class="now-helpdesk">',
				'<h1 class="title">Now @Helpdesk</h1>',
				'<div class="details"></div>',
			'</div>',
			'<div class="now-library">',
				'<h1 class="title">Now @Library</h1>',
				'<div class="details"></div>',
			'</div>',
			'<div class="next-helpdesk">',
				'<h1 class="title">Next @Helpdesk</h1>',
				'<div class="details"></div>',
			'</div>',
			'<div class="next-library">',
				'<h1 class="title">Next @Library</h1>',
				'<div class="details"></div>',
			'</div>',
			'<h1 class="title">☠ Workers</h1>',
		'</a>',
	].join('');
},

update: function(output, domEl) {
	if (!window.sto)             return '';
	if (!window.sto.libs.lodash) return '';
	if (!window.sto.libs.moment) return '';
	if (!window.sto.data.shifts) return '';
	if (!window.sto.data.shifts.now) return '';
	if (!window.sto.data.shifts.later) return '';

	var _      = window.sto.libs.lodash;
	var moment = window.sto.libs.moment;

	/////

	function addLaterShifts(desk) {
		var laterShifts = window.sto.data.shifts.later;
		var next = domEl.querySelector('.next-'+desk.toLowerCase()+' .details');
		next.innerHTML = "";

		if (laterShifts.length === 0) {
			next.textContent = "No more shifts scheduled as of " + moment().format('ha[.]');
			return "";
		}

		var onlyHelpdeskShifts = _.filter(laterShifts, {'location': desk});
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
	}
	addLaterShifts('Library');
	addLaterShifts('Helpdesk');

	/////

	function addCurrentShifts(desk) {
		var currentShifts = window.sto.data.shifts.now;
		var now = domEl.querySelector('.now-'+desk.toLowerCase()+' .details');
		now.innerHTML = "";

		if (currentShifts.length === 0) {
			now.textContent = "No-one is currently scheduled.";
			return "";
		}

		var onlyHelpdeskShifts = _.filter(currentShifts, {'location': desk});
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
	}
	addCurrentShifts('Library');
	addCurrentShifts('Helpdesk');
}
