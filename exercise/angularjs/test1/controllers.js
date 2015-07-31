/**
 * Created by hkh on 2015-02-16.
 */
var myapp = angular.module('myapp', []);

myapp.controller('basicController', function($scope) {
    $scope.title = 'Students List';
    $scope.students = [{
        id: 1,
        name: 'insung',
        score: 4.2
    }, {
        id: 2,
        name: 'hajin',
        score: 4.5
    }];

    // define methods
    $scope.getAverage = function() {
        var output = 0;
        for (var i=0; i<$scope.students.length; i++) {
            output += $scope.students[i].score;
        }
        return output / $scope.students.length;
    };

    $scope.submit = function() {
        $scope.students.push({
            id: $scope.students.length+1,
            name: $scope.name,
            score: 0.0
        });

        $scope.name = '';
    };
});