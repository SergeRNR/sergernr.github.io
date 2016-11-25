angular
.module('TA')
.controller('HotelsController', [
    '$scope',
    'filterType',
    function ($scope, filterType) {
        $scope.$emit('activeType', filterType);
        this.options = [5, 4, 3, 2].map(count => ({
            name: `${count} stars`,
            value: count
        }));
    }
]);
