command: 'echo ""',
refreshFrequency: 10000,

style: [
	"left: 0%",
	"bottom: 3%",

	"width: 20%",
	"height: 47vh",

	"text-align: center",

	".details",
	"	padding-top: 0.5rem",

	".time",
	"	font-weight: 200",
	"	font-size: 2em",
	"	color: rgba(255, 255, 255, 0.65)",
	"	padding-bottom: 0.5rem",

	".workers",
	"	font-weight: 500",
	"	font-size: 1.25em",
	"	color: rgba(255, 255, 255, 0.75)",
].join('\n'),

render: function(output) {
	return [
		'<div class="wrapper">',
			'<div class="details"></div>',
			'<h1 class="title">Next Up @Helpdesk</h1>',
		'</div>',
	].join('');
},

findTimes: function(title) {
	// input:  "Samuel Brodersen-Rodriguez Helpdesk 8am-10am"
	// output: ["8am", "10am"]
	return title.match(/(?:Helpdesk|Library) (\d{1,2}(?:(?:\:\d\d[a-z]{2})|[a-z]{2}))-(\d{1,2}(?:(?:\:\d\d[a-z]{2})|[a-z]{2}))/);
},

whoIsWorking: function(title) {
	// input:  "Samuel Brodersen-Rodriguez Helpdesk 8am-10am"
	// output: "Samuel Brodersen-Rodriguez"
	var name = title.match(/(.*)(?= Helpdesk| Library)/);
	return name ? name[1] : "Nobody";
},

findLocation: function(title) {
	// input:  "Samuel Brodersen-Rodriguez Helpdesk 8am-10am"
	// output: "Helpdesk"
	var spot = title.match(/(Helpdesk|Library)/);
	return spot ? spot[1] : null;
},

update: function(output, domEl) {
	window.helpdeskWorkers = {};
	window.helpdeskWorkers.findTimes = this.findTimes;
	window.helpdeskWorkers.whoIsWorking = this.whoIsWorking;
	window.helpdeskWorkers.findLocation = this.findLocation;

	//
	// Fetch the data
	//
	var data = localStorage.getItem('stolaf-helpdesk-workers');
	var parser = new DOMParser();
	var xmlDoc = parser.parseFromString(data, "text/xml");
	var rawShifts = xmlDoc.querySelectorAll('entry');

	//
	// Organize the data
	//
	var allShifts = _.map(rawShifts, function(shift) {
		var jsonEvent = mapDOM(shift);
		var keys = ['summary', 'title'];

		var props = {};
		_.each(jsonEvent.content, function(obj) {
			if (_.contains(keys, obj.type)) {
				props[obj.type] = obj.content.length === 1 ? obj.content[0] : obj.content;
			}
		})

		props.summary = props.summary.split('&nbsp;')[0];

		var result = {};
		var times = helpdeskWorkers.findTimes(props.title)
		result.date = props.summary.match(/(\w{3,4} \d\d, \d{4})/)[0];
		result.startTime = times[1];
		result.endTime = times[2];
		result.person = helpdeskWorkers.whoIsWorking(props.title);
		result.location = helpdeskWorkers.findLocation(props.title);

		return result;
	})

	var today = moment(new Date()).format('MMM D, YYYY');
	var grouped = _.groupBy(allShifts, 'date')
	var shifts = _.chain(grouped[today])
		.reject({'location': 'Library'})
		.groupBy('startTime')
		.toArray()
		.first()
		.value()

	//
	// Construct the widget
	//
	var details = domEl.querySelector('.details');

	var time = document.createElement('time');
	time.className = 'time';
	time.textContent = shifts[0].startTime + ' – ' + shifts[0].endTime;
	details.appendChild(time);

	var list = document.createElement('ul');
	list.className = 'workers';
	_.each(shifts, function(shift) {
		var item = document.createElement('li');
		item.textContent = shift.person;
		list.appendChild(item);
	})

	details.appendChild(list);
}
