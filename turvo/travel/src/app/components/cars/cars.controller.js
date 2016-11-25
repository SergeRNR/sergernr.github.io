angular
.module('TA')
.controller('CarsController', [
    '$scope',
    'filterType',
    function ($scope, filterType) {
        $scope.$emit('activeType', filterType);
        this.options = [
            {
                name: 'ECONOMY',
                value: 'economy'
            },
            {
                name: 'SUV',
                value: 'suv'
            },
            {
                name: 'LUXURY',
                value: 'luxury'
            }
        ];
    }
]);
