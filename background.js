var storage = chrome.storage.sync;

var bkg = chrome.extension.getBackgroundPage();

var firebase = new Firebase("https://intense-inferno-3808.firebaseio.com/");

var usersRef;


addStart = function() {
    var value = moment().valueOf();

    var dayOfYear = moment().dayOfYear();

    console.log('current day = ' + dayOfYear);
    var dayRef = usersRef.child(dayOfYear.toString());

    dayRef.once('value', function(snapshot) {

        var day = snapshot.val();
        if (day == null || day.start == undefined) {
            console.log('start == undefined');
            dayRef.update({
                start: value
            });
        } else {

            if (day.start > value) {
                console.log('update start value');
                dayRef.update({
                    start: value
                });
            } else {
                console.log('nothing to update');
            }
        }
    }, function(errorObject) {
        console.log('The read failed: ' + errorObject.code);
    });

};
addEnd = function() {
    var value = moment().valueOf();

    var dayOfYear = moment().dayOfYear();

    console.log('current day = ' + dayOfYear);
    var dayRef = usersRef.child(dayOfYear.toString());

    dayRef.once('value', function(snapshot) {

        var day = snapshot.val();
        if (day == null || day.end == undefined) {
            console.log('end == undefined');
            dayRef.update({
                end: value
            });
        } else {

            if (day.end < value) {
                console.log('update end value');
                dayRef.update({
                    end: value
                });
            } else {
                console.log('nothing to update');
            }
        }
    }, function(errorObject) {
        console.log('The read failed: ' + errorObject.code);
    });
};


window.onload = function() {

    chrome.storage.local.get('email', function(result) {
        if (chrome.runtime.lastError) {
            /* error */
            console.log('Login not set');
            return;
        }
    });


    chrome.windows.onCreated.addListener(function(window) {
        // Save it using the Chrome extension storage API.
        // chrome.storage.local.set({'start': moment().format('MMMM Do YYYY, h:mm:ss')});
        bkg.console.log('Created windowId=' + window.id);
        addStart();
    });
    chrome.windows.onRemoved.addListener(function(windowId) {
        // Save it using the Chrome extension storage API.
        // chrome.storage.local.set({'end' : moment().format('MMMM Do YYYY, h:mm:ss')});
        bkg.console.log('Remove windowId=' + windowId)
        addEnd();
    });
}



// storage.get('time', function(item) {

//        item = item.time || [];

//        var addedItem = {};

//        if (item.length == 0) {
//            addedItem = {
//                start: value,
//                windowId: windowId
//            };
//            usersRef.set(addedItem);
//        } else {
//            item.forEach(function(entry) {

//                if (entry == null) {
//                    console.log('null entry')
//                    return;
//                }
//                var current = moment(entry.start);

//                if (current.isSame(value, 'day')) {
//                    console.log('Same day')
//                    if (entry.start > value) {
//                        console.log('update start time')
//                        entry.start = value;
//                    } else {
//                        console.log('not update start time')
//                    }
//                } else {
//                    console.log('another day start time')
//                    addedItem = {
//                        start: value,
//                        windowId: windowId
//                    };
//                    item.push(addedItem);

//                }
//            });
//        }

//        storage.set({
//            time: item
//        });
//    });
