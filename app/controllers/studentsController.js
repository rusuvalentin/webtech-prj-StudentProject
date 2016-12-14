'use strict'

let ctrl = angular.module('studentsController', []);
const SERVER = 'https://students-rusuvalentin.c9users.io'

ctrl.controller('studentsController', ['$scope', '$http', '$state', function($scope, $http, $state) {
    $http.get(SERVER + '/students')
        .then(function succes(data) {
            $scope.students = data.data;
            console.log(data);
        }).catch((error) => console.log("erroare studentsController"));

    $scope.getTemplateState = (student) => {
       return 'display'
    }
}])
