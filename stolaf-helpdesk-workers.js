command: 'curl --silent "https://content.googleapis.com/calendar/v3/calendars/stolaf.edu_rl14mc72a4c2gjbot4hc6oqroc%40group.calendar.google.com/events?timeMax=2014-10-02T23:59:59-05:00&timeMin=2014-10-02T00:00:00-05:00&key=AIzaSyCaofH_C8xK7pddaRYfZePFjvvuYs1Fi-U"',
refreshFrequency: 100000,

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
	var now = moment(new Date());

	var apiHost = 'https://www.googleapis.com/calendar/v3/calendars/';
	var calendarId = 'stolaf.edu_rl14mc72a4c2gjbot4hc6oqroc%40group.calendar.google.com';
	var api = '/events';
	var queryParams = {
		timeMax: now.format('YYYY-MM-DD[T23:59:59]Z'), // the end of today
		timeMin: now.format('YYYY-MM-DD[T00:00:00]Z'), // the beginning of today
		key: 'AIzaSyCaofH_C8xK7pddaRYfZePFjvvuYs1Fi-U'
	};
	var params = "?";
	params += "timeMax=" + queryParams.timeMax
	params += "&timeMin=" + queryParams.timeMin
	params += "&key=" + queryParams.key

	var url = apiHost + calendarId + api + params;
	console.log(url);

	console.log(output);
	// var data = JSON.parse(output);

	var whoIsWorking = this.whoIsWorking;
	var findLocation = this.findLocation;


	//
	// Organize the data
	//
	var allShifts = _.map(data.items, function(shift) {
		var result = {};
		result.startTime = moment(shift.start.dateTime);
		result.endTime = moment(shift.end.dateTime);
		result.person = whoIsWorking(shift.summary);
		result.location = findLocation(shift.summary);

		return result;
	});

	// window.now = now;
	var today = now.format('MMM D, YYYY');
	var grouped = _.groupBy(allShifts, 'date');
	var shifts = _.chain(grouped[today])
		.reject({'location': 'Library'})
		.sortBy('startTime')
		.reject(function(shift) {
			// console.log(shift, now.isAfter(shift.startDateTime));
			return now.isAfter(shift.startTime);
		})
		.groupBy('startDateTime')
		.toArray()
		.value();

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
		details.innerHTML = "No more shifts scheduled.<br>(Ignore me, I'm silly.)"
	}
}
