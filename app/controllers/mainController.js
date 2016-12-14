'use strict'
let app = angular.module('students', [
    'ui.router',
    'studentsController'
    ])

app.config(['$stateProvider', '$urlRouterProvider',  function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/students')
    $stateProvider
        .state('students', {
            url : '/students',
            templateUrl : 'views/students.html',
            controller : 'studentsController'
        })
}])