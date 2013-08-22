'use strict';

/* Controllers */

function IndexCtrl($scope, $http) {
  $http.get('/api/workout').
    success(function(data, status, headers, config) {
      $scope.workouts = data;
    });
}

function AddWorkoutCtrl($scope, $http, $location) {
  $scope.form = {};
  $scope.submitWorkout = function () {
    $http.post('/api/workout', $scope.form).
      success(function(data) {
        $location.url('/');
      });
  };
}

function ReadWorkoutCtrl($scope, $http, $routeParams) {
  $http.get('/api/workout/' + $routeParams.id).
    success(function(data) {
      $scope.workout = data;
    });
}

function EditWorkoutCtrl($scope, $http, $location, $routeParams) {
  $scope.form = {};
  $http.get('/api/workout/' + $routeParams.id).
    success(function(data) {
      $scope.form = data;
    });

  $scope.editWorkout = function () {
    $http.put('/api/workout/' + $routeParams.id, $scope.form).
      success(function(data) {
        $location.url('/readWorkout/' + $routeParams.id);
      });
  };
}

function DeleteWorkoutCtrl($scope, $http, $location, $routeParams) {
  $http.get('/api/workout/' + $routeParams.id).
    success(function(data) {
      $scope.workout = data;
    });

  $scope.deleteWorkout = function () {
    $http.delete('/api/workout/' + $routeParams.id).
      success(function(data) {
        $location.url('/');
      });
  };

  $scope.home = function () {
    $location.url('/');
  };
}
