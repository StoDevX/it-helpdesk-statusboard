command: 'cat ./stolaf-base/whentowork-calendar-url.txt | xargs curl --silent',

refreshFrequency: 60000,
lastUpdateTime: undefined,

style: [
	"bottom: 0",
	"left: 33.33%",
	"width: 33.33%",
	"text-align: center",
	"border: 0",
	"height: 3%",
	"vertical-align: middle",
	"color: rgba(255, 255, 255, 0.5)",
	"font-weight: 300",
].join('\n'),

render: function(argument) {
	return 'Helpdesk Workers: <span class="last-updated"></span>';
},

update: function(output, domEl) {
	localStorage.setItem('stolaf-helpdesk-workers', output);
	this.lastUpdateTime = new Date();

	domEl.querySelector('.last-updated').textContent = moment(this.lastUpdateTime).calendar();
},
