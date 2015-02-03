refreshFrequency: false,

// from http://stackoverflow.com/questions/12980648/map-html-to-json

domParser: function(DOMParser) {
	"use strict";

	var proto = DOMParser.prototype;
	var nativeParse = proto.parseFromString;

	// Firefox/Opera/IE throw errors on unsupported types
	try {
		// WebKit returns null on unsupported types
		if ((new DOMParser()).parseFromString("", "text/html")) {
			// text/html parsing is natively supported
			return;
		}
	} catch (ex) {}

	proto.parseFromString = function(markup, type) {
		if (/^\s*text\/html\s*(?:;|$)/i.test(type)) {
			var doc = document.implementation.createHTMLDocument("");
			if (markup.toLowerCase().indexOf('<!doctype') > -1)
				doc.documentElement.innerHTML = markup;
			else
				doc.body.innerHTML = markup;
			return doc;
		} else {
			return nativeParse.apply(this, arguments);
		}
	};
},

render: function() {
	window.sto = window.sto || {};
	window.sto.libs = window.sto.libs || {};
	this.domParser(window.DOMParser);
	window.sto.libs.DOMParser = true;

	return '';
}
