'use strict'

var ctrl = angular.module('universitiesController', []);
const SERVER2 = 'https://students-rusuvalentin.c9users.io'
ctrl.controller('universitiesController', ['$scope', '$http', '$state', function($scope, $http, $state) {
    let $constructor = () => {
        $http.get(SERVER2 + '/universities')
            .then(function succes(data) {
                $scope.universities = data.data;
                console.log(data);
            }).catch((error) => console.log("erroare universitiesController"));
    }


    $scope.studentsFoundByUniversity = null;

    $scope.getTemplateForFind = ()=>{
        if($scope.studentsFoundByUniversity == null)
        {
            return ''
        }else{
            return 'find'
        }
    }

    $scope.findStudentsByUniversity = (id) => {
        $http.get(SERVER2 + '/students/university/' + id)
            .then(function succes(data) {
                $scope.studentsFoundByUniversity = data.data;
                console.log(data);
            })
            .catch((error) => console.log("eroare findStudentsByUniversity " + error))
    }


    $scope.addUniversity = (university) => {
        $http.post(SERVER2 + '/universities', university)
            .then((response) => {
                $state.go($state.current, {}, {
                    reload: true
                })
            })
            .catch((error) => console.log(error))
    }

    $scope.deleteUniversity = (university) => {
        $http.delete(SERVER2 + '/universities/' + university.id)
            .then((response) => {
                $state.go($state.current, {}, {
                    reload: true
                })
            })
            .catch((error) => console.log(error))
    }

    $scope.selected = {}

    $scope.editUniversity = (university) => {
        $scope.selected = angular.copy(university)
    }

    $scope.cancelEditing = () => {
        $scope.selected = {}
    }


    $scope.saveUniversity = (university) => {
        $http.put(SERVER2 + '/universities/' + university.id, university)
            .then((response) => {
                $state.go($state.current, {}, {
                    reload: true
                })
            })
            .catch((error) => console.log(error))
    }

    $scope.getTemplateState = (university) => {
        if (university.id === $scope.selected.id) {
            return 'edit'
        }
        else {
            return 'display'
        }
    }

    $constructor()

}])
