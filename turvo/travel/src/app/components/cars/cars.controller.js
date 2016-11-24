angular.module('TA')
.controller('CarsController', [
    'filterType',
    '$scope',
    function (filterType, $scope) {
        $scope.$parent.app.activeType = filterType;
        this.filterType = filterType;

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
