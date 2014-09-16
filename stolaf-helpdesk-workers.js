command: 'echo ""',
refreshFrequency: 10000,

style: [
	"left: 20%",
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
	if (!window.sto)              return '';
	if (!window.sto.libs.lodash)  return '';
	if (!window.sto.libs.moment)  return '';
	if (!window.sto.libs.mapDOM)  return '';
	if (!window.sto.data.helpers) return '';

	var _ = window.sto.libs.lodash;
	var moment = window.sto.libs.moment;
	var mapDOM = window.sto.libs.mapDOM;

	var findTimes = this.findTimes;
	var whoIsWorking = this.whoIsWorking;
	var findLocation = this.findLocation;

	var data = window.sto.data.helpers;

	//
	// Organize the data
	//
	var parser = new DOMParser();
	var xmlDoc = parser.parseFromString(data, "text/xml");
	var rawShifts = xmlDoc.querySelectorAll('entry');

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
		var times = findTimes(props.title);
		result.date = props.summary.match(/(\w{3,4} \d\d, \d{4})/)[0];
		result.startTime = times[1];
		result.endTime = times[2];
		result.person = whoIsWorking(props.title);
		result.location = findLocation(props.title);
		result.startDateTime = moment(result.date + ' - ' + result.startTime, "MMM D YYYY - hh:mma");

		return result;
	})

	var now = moment(new Date());
	// window.now = now;
	var today = now.format('MMM D, YYYY');
	var grouped = _.groupBy(allShifts, 'date')
	var shifts = _.chain(grouped[today])
		.reject({'location': 'Library'})
		.sortBy('startDateTime')
		.reject(function(shift) {
			// console.log(shift, now.isAfter(shift.startDateTime));
			return now.isAfter(shift.startDateTime)
		})
		.groupBy('startDateTime')
		.toArray()
		.value()

	// console.log(grouped, shifts);

	//
	// Construct the widget
	//
	var details = domEl.querySelector('.details');
	details.innerHTML = "";
	if (shifts.length) {
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
	} else {
		details.textContent = "No more shifts scheduled.<br>(Ignore me, I'm silly.)"
	}
}
