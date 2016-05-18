angular.module('app').controller('loginCtrl', function ($scope, $http) {
    $scope.login = function (user) {
        $http.post('/login', { username: user.username, password: user.password }).then(function(response){
            if(response.data.success){
                console.log('logged in');
            }
            else{
                console.log('failure');
            }
        })
    }
});