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



var googleAuth = new OAuth2('google', {
    client_id: '246585209934-sqeonngs0adji7n6afba7krqrgl6uvds.apps.googleusercontent.com',
    client_secret: 'DTgLOo3PXz4JlnlpSvS4OO8I',
    api_scope: 'https://www.googleapis.com/auth/userinfo.email'
});


googleAuth.authorize(function() {

    // We should now have googleAuth.getAccessToken() returning a valid token value for us 
    // Create an XMLHttpRequest to get the email address 
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var parseResult = JSON.parse(xhr.responseText);
                    // The email address is located naw: 
                    var email = parseResult["email"];
                    var username = email.split('@')[0];

                    console.log("Login succesfull");

                    chrome.storage.sync.set({email:username});

                    usersRef = firebase.child(username);

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
            }
        }
        // Open it up as GET, POST didn't work for me for the userinfo 
    xhr.open("GET", "https://www.googleapis.com/oauth2/v1/userinfo", true);
    // Set the content & autherization 
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', "OAuth " + googleAuth.getAccessToken());
    xhr.send(null);
    // Debugging stuff so we can see everything in the xhr.  Do not leave this in production code 

});



