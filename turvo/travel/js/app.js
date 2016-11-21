let app = angular.module('TA', ['ngRoute']);

angular.module('TA')
.config(['$locationProvider', '$routeProvider',
    ($locationProvider, $routeProvider) => {
        $locationProvider.hashPrefix('!');
        $routeProvider
            .when('/flights', {
                template: '<ta-flights></ta-flights>'
            })
            .when('/hotels', {
                template: '<ta-hotels></ta-hotels>'
            })
            .when('/cars', {
                template: '<ta-cars></ta-cars>'
            })
            .otherwise('/flights');
    }
]);
