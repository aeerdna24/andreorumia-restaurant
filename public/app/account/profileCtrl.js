angular.module('app').controller('profileCtrl', function ($scope, notifier, identity, auth) {
    $scope.user = identity.currentUser;
    $scope.user.password = "";
    $scope.profileForm = {};

    $scope.update = function () {
        if ($scope.profileForm.$invalid) {
            notifier.error('Check fields!');
            return;
        }
        var newUser = {
            username: $scope.user.username,
            firstName: $scope.user.firstName,
            lastName: $scope.user.lastName
        }

        if ($scope.user.password && $scope.user.password > 0) {
            newUser.password = $scope.user.password;
        }

        auth.updateCurrentUser(newUser).then(function () {
            notifier.notify('Info updated succesfully!');
        },
            function (error) {
                notifier.error(error);
            });
    }
});