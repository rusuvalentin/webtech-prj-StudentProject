'use strict'
let app = angular.module('students', [
    'ui.router',
    'studentsController',
    'universitiesController'
    ])

app.config(['$stateProvider', '$urlRouterProvider',  function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/students')
    $stateProvider
        .state('students', {
            url : '/students',
            templateUrl : 'views/students.html',
            controller : 'studentsController'
        })
         .state('universities', {
            url : '/universities',
            templateUrl : 'views/universities.html',
            controller : 'universitiesController'
        })
}])