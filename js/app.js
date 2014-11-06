var myApp = angular.module('myApp', ['ngAnimate', 'firebase']);

moment.locale("ru");

myApp.controller('MainCtrl', function($scope, $rootScope, $animate, $firebase) {

    $scope.itemsPerPage = 10;
    $scope.currentPage = 0;

    chrome.storage.sync.get('email', function(result) {

        if (chrome.runtime.lastError) {
            /* error */
            console.log('Login not set');

            return;
        }

        // $scope.total = Item.total();

        var firebase = new Firebase("https://intense-inferno-3808.firebaseio.com/");

        $scope.usersRef = firebase.child(result.email);

        $scope.usersRef.on('value', function(snapshot) {
            var count = 0;
            snapshot.forEach(function() {
                count++;
            });
            $scope.total = count;
            //count is now safe to use.
        });

        // create an AngularFire reference to the data
        console.log('currentPage = ' + $scope.currentPage);
        console.log('itemsPerPage = ' + $scope.itemsPerPage);
        $scope.usersRef.limit($scope.itemsPerPage);
        var sync = $firebase($scope.usersRef);
        // download the data into a local object
        $scope.data = sync.$asObject();

    });

    $scope.getDay = function(day) {
        var dayOfYear = moment().dayOfYear(day);
        return dayOfYear.format("D.MM.YYYY");
    }

    $scope.getTime = function(time) {
        var t = moment(time);
        return t.format("H[h.] mm [m.]");
    }

    $scope.getDuration = function(start, end) {
            var e = moment(end);
            var s = moment(start); 
            var t = e.subtract(s);
            return t.format("H[h.] mm [m.]");
        }
        // PAGINATION 
    $scope.loadMore = function() {
        $scope.currentPage++;
        var sync = $firebase($scope.usersRef).startAt($scope.currentPage * $scope.itemsPerPage).limit($scope.itemsPerPage);

        var newData = sync.$asObject();

        $scope.data = $scope.data.concat(newData);

    };

    $scope.pageCount = function() {
        return Math.ceil($scope.total / $scope.itemsPerPage);
    };

    $scope.disabled = function() {
        console.log($scope.currentPage);
        console.log($scope.pageCount() - 1);
        return $scope.currentPage === $scope.pageCount() - 1 ? true : false;
    };

});
