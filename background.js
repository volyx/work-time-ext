window.onload = function() {

	var bkg = chrome.extension.getBackgroundPage();

	chrome.windows.onCreated.addListener(function () {
		// Save it using the Chrome extension storage API.
        chrome.storage.local.set({'start': moment().format('MMMM Do YYYY, h:mm:ss')});

	});


	chrome.windows.onRemoved.addListener(function () {
		// Save it using the Chrome extension storage API.
        chrome.storage.local.set({'end' : moment().format('MMMM Do YYYY, h:mm:ss')});

	});

}
