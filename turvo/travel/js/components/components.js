angular.module('TA')

.component('taFlights', {
    templateUrl: './views/flights.html',
    controller($scope, localStorageService) {
        this.update = function(form) {
            let data = angular.copy(form);
            data.type = 'flights';
            localStorageService.push('search', data);
        };
        this.reset = function() {
            $scope.form = {};
        };
    }
})

.component('taHotels', {
    templateUrl: './views/hotels.html',
    controller($scope, localStorageService) {
        this.update = function(form) {
            let data = angular.copy(form);
            data.type = 'hotels';
            localStorageService.push('search', data);
        };
        this.reset = function() {
            $scope.form = {};
        };
    }
})

.component('taCars', {
    templateUrl: './views/cars.html',
    controller($scope, localStorageService) {
        this.update = function(form) {
            let data = angular.copy(form);
            data.type = 'cars';
            localStorageService.push('search', data);
        };
        this.reset = function() {
            $scope.form = {};
        };
    }
})

.component('taLatest', {
    templateUrl: './views/latest.html',
    controller($scope, localStorageService) {
        let list = localStorageService.get('search') || [];
        $scope.list = list.reverse().slice(0, 3);
    }
});
