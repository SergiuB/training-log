'use strict';
// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider.
      when('/', {
        templateUrl: 'partials/index',
        controller: IndexCtrl
      }).
      when('/addWorkout', {
        templateUrl: 'partials/addWorkout',
        controller: AddWorkoutCtrl
      }).
      when('/readWorkout/:id', {
        templateUrl: 'partials/readWorkout',
        controller: ReadWorkoutCtrl
      }).
      when('/editWorkout/:id', {
        templateUrl: 'partials/editWorkout',
        controller: EditWorkoutCtrl
      }).
      when('/deleteWorkout/:id', {
        templateUrl: 'partials/deleteWorkout',
        controller: DeleteWorkoutCtrl
      }).
      otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }]);