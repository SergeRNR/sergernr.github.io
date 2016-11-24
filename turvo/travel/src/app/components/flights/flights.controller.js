angular.module('TA')
.controller('FlightsController', [
    'filterType',
    '$scope',
    function (filterType, $scope) {
        $scope.$parent.app.activeType = filterType;
        this.filterType = filterType;
    }
]);
