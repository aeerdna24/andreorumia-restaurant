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
        createUser: function(user){
          var newUser = new User(user);
          var deferred = $q.defer();
          
          newUser.$save().then(function(){
             identity.currentUser = newUser;
             deferred.resolve(); 
          },
          function(){
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
        },
        authorizeAuthenticatedUserForRoute: function(){
            if(identity.isAuthenticated(role)){
                return true;
            }
            else{
                return $q.reject('not authorized');
            }
        },
        updateCurrentUser: function(user){
            var deferred = $q.defer();
            var clone = angular.copy(identity.currentUser);
            angular.extend(clone, user);
            clone.$update().then(function(){
                identity.currentUser = clone;
                deferred.resolve();
            },
            function(response){
                deferred.reject(response.data.reason);
            });
            
            return deferred.promise;
        }
    }
});