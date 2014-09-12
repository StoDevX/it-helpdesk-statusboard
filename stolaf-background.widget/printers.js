command: 'cat ./stolaf-base/printer-data-url.txt | xargs curl --silent',

refreshFrequency: 60000,
lastUpdateTime: undefined,

style: [
	"bottom: 0",
	"left: 75%",
	"width: 25%",
	"text-align: center",
	"border: 0",
	"height: 3%",
	"vertical-align: middle",
	"color: rgba(255, 255, 255, 0.5)",
	"font-weight: 300",
].join('\n'),

render: function(argument) {
	return 'Printers: <span class="last-updated"></span>';
},

update: function(output, domEl) {
	localStorage.setItem('stolaf-printer-status', output);
	this.lastUpdateTime = new Date();

	domEl.querySelector('.last-updated').textContent = moment(this.lastUpdateTime).calendar();
},
