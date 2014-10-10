var myApp = angular.module('myApp', ['ngAnimate', 'firebase']);

moment.locale("ru");

myApp.controller('MainCtrl', function($scope, $rootScope, $animate, $firebase) {

    var firebase = new Firebase("https://intense-inferno-3808.firebaseio.com/");

    chrome.storage.local.get('email', function(result) {

        if (chrome.runtime.lastError) {
            /* error */
            console.log('Login not set');
            return;
        }

        var usersRef = firebase.child(result.email);
        // create an AngularFire reference to the data
        var sync = $firebase(usersRef);
        // download the data into a local object
        $scope.data = sync.$asObject();

        console.log($scope.data);

    });

    $scope.getDay = function(day) {
        var dayOfYear = moment().dayOfYear(day);
        return dayOfYear.format("MMMM Do");;
    }

    $scope.getTime = function(time) {
        var t = moment(time);
        return t.format("H:mm:ss");
    }

    $scope.getDuration = function(start, end) {
        var t = moment(end - start);
        return t.format("H:mm");
    }

});
