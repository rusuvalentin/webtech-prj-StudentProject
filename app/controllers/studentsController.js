'use strict'

var ctrl = angular.module('studentsController', []);
const SERVER = 'https://students-rusuvalentin.c9users.io'

ctrl.controller('studentsController', ['$scope', '$http', '$state', function($scope, $http, $state) {
    let $constructor = () => {
        $http.get(SERVER + '/students')
            .then(function succes(data) {
                $scope.students = data.data;
                console.log(data);
            }).catch((error) => console.log("erroare studentsController"));

    }

    

    $http.get(SERVER + '/universities')
        .then(function succes(data) {
            $scope.universities = data.data;
            console.log(data);
        }).catch((error) => console.log("erroare universitiesFromStudentsController"));


    $scope.findUniversityById = (student) => {
        for (var i = $scope.universities.length - 1; i >= 0; i--) {
            if (student.UniversityId === $scope.universities[i].id) {
                return $scope.universities[i].nume;
            }
        }
    }




    $scope.addStudent = (student) => {
        $http.post(SERVER + '/students', student)
            .then((response) => {
                $state.go($state.current, {}, {
                    reload: true
                })
            })
            .catch((error) => console.log(error))
    }

    $scope.deleteStudent = (student) => {
        $http.delete(SERVER + '/students/' + student.id)
            .then((response) => {
                $state.go($state.current, {}, {
                    reload: true
                })
            })
            .catch((error) => console.log(error))
    }

    $scope.selected = {}

    $scope.editStudent = (student) => {
        $scope.selected = angular.copy(student)
    }

    $scope.cancelEditing = () => {
        $scope.selected = {}
    }


    $scope.saveStudent = (student) => {
        $http.put(SERVER + '/students/' + student.id, student)
            .then((response) => {
                $state.go($state.current, {}, {
                    reload: true
                })
            })
            .catch((error) => console.log(error))
    }



    $scope.getTemplateState = (student) => {
        if (student.id === $scope.selected.id) {
            return 'edit'
        }
        else {
            return 'display'
        }
    }

    $constructor()
}])
