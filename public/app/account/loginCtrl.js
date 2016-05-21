angular.module('app').controller('loginCtrl', function ($scope, $location, notifier, identity, auth) {
    $scope.identity = identity;
    $scope.user = {};
    $scope.login = function (user) {
        auth.authenticateUser(user.username, user.password).then(function () {
            $scope.identity.showCard = false;
            notifier.notify('You have successfully logged in!');
        },
            function () {
                notifier.notify('Username/Password combination incorrect.');
            });
    }
    $scope.logout = function () {
        auth.logoutUser().then(function () {
            $scope.user.username = "";
            $scope.user.password = "";
            notifier.notify('You have successfully logged out!');
            $location.path('/');
        },
        function(){
            notifier.notify('We cannot log you out!');    
        });
    }
});