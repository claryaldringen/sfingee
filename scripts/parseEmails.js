var page = require('webpage').create();
page.settings.userAgent = 'SpecialAgent';
page.open('http://www.httpuseragent.org', function (status) {
	if (status !== 'success') {
		console.log('Unable to access network');
	} else {
		var ua = page.evaluate(function () {
			return document.getElementsByTagName('html')[0].outerHTML;
		});
		console.log(ua);
	}
	phantom.exit();
});