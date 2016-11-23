angular.module('TA')
.controller('AppController', ['filterTypes', function (filterTypes) {
    this.filterTypes = filterTypes;
}]);
