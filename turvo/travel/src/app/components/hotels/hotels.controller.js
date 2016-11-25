angular.module('TA')
.controller('HotelsController', [
    'filterType',
    '$scope',
    function (filterType, $scope) {
        $scope.$parent.app.activeType = filterType;
        this.filterType = filterType;

        this.options = [5, 4, 3, 2].map(count => ({
            name: `${count} stars`,
            value: count
        }));
    }
]);
