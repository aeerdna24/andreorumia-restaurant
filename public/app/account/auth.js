angular.module('app').factory('auth', function ($http, identity, $q, User) {
    return {
        authenticateUser: function (username, password) {
            var deferred = $q.defer();
            $http.post('/login', { username: username, password: password }).then(function (response) {
                if (response.data.success) {
                    var user = new User();
                    angular.extend(user, response.data.user);
                    identity.currentUser = user;
                    deferred.resolve();
                }
                else {
                    deferred.reject();
                }
            });
            return deferred.promise;
        },
        logoutUser: function () {
            var deferred = $q.defer();
            $http.post('/logout', {}).then(function () {
                identity.currentUser = false;
                identity.showCard = false;
                deferred.resolve();
            },
                function () {
                    deferred.reject();
                });
            return deferred.promise;
        },
        authorizeCurrentUserForRoute: function(role){
            if(identity.isAuthorized(role)){
                return true;
            }
            else{
                return $q.reject('not authorized');
            }
        }
    }
});