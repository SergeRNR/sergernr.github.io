angular.module('TA')
.controller('CarsController', ['filterType', function (filterType) {
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
}]);
