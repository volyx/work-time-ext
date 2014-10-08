var storage = chrome.storage.local,


addStart = function (value) {
    storage.get('time', function (item) {
      item = item.time || [];

      item.push('Start ' + value);

      storage.set({time: item});
    });
 };

 addEnd = function (value) {
    storage.get('time', function (item) {
      item = item.time || [];

      item.push('End ' + value);

      storage.set({time: item});
    });
 };

window.onload = function() {

	var bkg = chrome.extension.getBackgroundPage();

	chrome.windows.onCreated.addListener(function () {
		// Save it using the Chrome extension storage API.
        // chrome.storage.local.set({'start': moment().format('MMMM Do YYYY, h:mm:ss')});
     addStart(moment().format('MMMM Do YYYY, h:mm:ss'));   

	});


	chrome.windows.onRemoved.addListener(function () {
		// Save it using the Chrome extension storage API.
        // chrome.storage.local.set({'end' : moment().format('MMMM Do YYYY, h:mm:ss')});
     addEnd(moment().format('MMMM Do YYYY, h:mm:ss'));      

	});

}
