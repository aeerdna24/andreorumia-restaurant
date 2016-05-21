angular.module('app').factory('identity', function ($window, User) {
    var currentUser;
    if (!!$window.bootstrappedUserObject) {
        currentUser = new User();
        angular.extend(currentUser, $window.bootstrappedUserObject);
    }
    return {
        currentUser: currentUser,
        showCard: false,
        isAuthenticated: function () {
            return !!this.currentUser;
        },
        isAuthorized: function(role){
            return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
        }
    }
})