angular
.module('TA')
.controller('FlightsController', [
    '$scope',
    'filterType',
    function ($scope, filterType) {
        $scope.$emit('activeType', filterType);
    }
]);
