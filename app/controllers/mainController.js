
var ctrl = angular.module('students',[]);

ctrl.controller('mainController',function($scope,$http){
    $http.get('/students')
    .then(function succes(data){
        $scope.students = data.data;
        console.log(data);
    }).catch((error)=>console.log("erroare controller"));
});
