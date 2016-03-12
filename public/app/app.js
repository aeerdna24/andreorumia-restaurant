var app = angular.module('app', [
    'ngResource',
    'ngRoute'
]);

app.config(function($routeProvider, $locationProvider){
   $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl: '/partials/main',
            controller: 'mainController'
        })
});

app.controller('mainController', function($scope){
    $scope.myVar = 'Hello Angular!';
});