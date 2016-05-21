var app = angular.module('app', [
    'ngResource',
    'ngRoute'
]);

app.config(function ($routeProvider, $locationProvider) {
    var routeRoleChecks = {
        admin: function (auth) {
            return auth.authorizeCurrentUserForRoute('admin');
        },
        user: function(auth){
            return auth.authorizeAuthenticatedUserForRoute();
        }
    }

    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl: '/partials/main/main',
            controller: 'mainCtrl'
        })
        .when('/admin/users', {
            templateUrl: '/partials/admin/user-list',
            controller: 'userListCtrl',
            resolve: routeRoleChecks.admin
        })
        .when('/signup', {
            templateUrl: '/partials/account/signup',
            controller: 'signupCtrl'
        })
        .when('/profile', {
            templateUrl: '/partials/account/profile',
            controller: 'profileCtrl',
            resolve: routeRoleChecks.user
        })
});

app.run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/');
        }
    });
})