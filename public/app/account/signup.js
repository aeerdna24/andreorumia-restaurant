angular.module('app').controller('signupCtrl', function ($scope, $location, notifier, auth) {
    $scope.user = {};
    $scope.signupForm = {};

    $scope.signup = function () {
        if ($scope.signupForm.$invalid){
            notifier.error('Check fields!');
            return;
        }
        var newUser = {
            username: $scope.user.email,
            password: $scope.user.password,
            firstName: $scope.user.firstName,
            lastName: $scope.user.lastName
        }

        auth.createUser(newUser).then(function () {
            notifier.notify('Account created!');
            $location.path('/');
        },
            function (error) {
                notifier.error(error);
            });
    }
});