'use strict';

angular
.module('TA', ['ui.router', 'templates'])
// filters config
.constant('filterTypes', [
    {
        type: 'flights',
        name: 'Flights',
        path: '/flights'
    },
    {
        type: 'hotels',
        name: 'Hotels',
        path: '/hotels'
    },
    {
        type: 'cars',
        name: 'Cars',
        path: '/cars'
    }
]);

angular
.module('TA')
// routes config
.config(($stateProvider, $urlRouterProvider, filterTypes) => {

    $stateProvider.state('app', {
        url: '',
        templateUrl: 'components/app/app.html',
        controller: 'AppController as app',
        abstract: true
    });

    filterTypes.forEach(item => {
        $stateProvider.state(`app.${item.type}`, {
            url: item.path,
            templateUrl: `components/${item.type}/${item.type}.html`,
            controller: `${item.name}Controller as ${item.type}`,
            resolve: {
                filterType: () => item.type
            }
        });
    });

    $urlRouterProvider.otherwise(filterTypes.length ? filterTypes[0].path : '/');
});

angular
.module('TA')
.filter('stars', ['$sce', ($sce) => (count) => {
    let template = '<span class="glyphicon glyphicon-star"></span>';
    let result = [];
    while (count > 0) {
        result.push(template);
        count--;
    }
    return $sce.trustAsHtml(result.join(''));
}]);

angular
.module('TA')
.factory('historyService', ['localStorageService', (localStorageService) => {
    const HISTORY_KEY = 'ta-history';
    let history;

    let get = () => {
        if (!history) {
            history = localStorageService.get(HISTORY_KEY) || [];
        }

        return history;
    };

    let add = (data) => {
        let list = get();
        list.push(angular.copy(data));
        localStorageService.set(HISTORY_KEY, list);
    };

    let remove = (id) => {
        let list = get();
        let index = list.findIndex(record => record.id === id);
        list.splice(index, 1);
        localStorageService.set(HISTORY_KEY, list);

        return id;
    };

    return {
        get,
        add,
        remove
    };
}]);

angular
.module('TA')
.factory('localStorageService', ['$window', ($window) => {
    let get = (key) => {
        let value = $window.localStorage.getItem(key);
        try {
            value = JSON.parse(value);
            return value;
        } catch (err) {
            return value;
        }
    };

    let set = (key, value) => {
        try {
            value = JSON.stringify(value);
            $window.localStorage.setItem(key, value);
        } catch (err) {
            $window.localStorage.setItem(key, value);
        }
    };

    return {
        get,
        set
    };
}]);

angular
.module('TA')
.controller('AppController', [
    '$scope',
    '$state',
    'filterTypes',
    'historyService',
    function ($scope, $state, filterTypes, historyService) {
        // INITIAL STATE
        this.filterTypes = filterTypes;

        this.defaultFormData = {
            startDate: new Date(),
            endDate: new Date()
        };
        this.form = angular.copy(this.defaultFormData);

        $scope.$on('activeType', (event, type) => {
            this.activeType = type;
        });

        this.setActiveType = (type) => {
            $state.go(`app.${type}`);
        };

        // FORM PROCESSING
        this.search = (form) => {
            form.id = Date.now();
            form.type = this.activeType;
            historyService.add(form);
        };

        this.reset = () => {
            this.form = angular.copy(this.defaultFormData);
        };

        // HISTORY
        this.history = historyService.get();

        this.getHistoryTemplate = (record) => `components/${record.type}/${record.type}-history.html`;

        this.removeHistoryRecord = (id) => historyService.remove(id);
    }
]);

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

angular
.module('TA')
.controller('FlightsController', [
    '$scope',
    'filterType',
    function ($scope, filterType) {
        $scope.$emit('activeType', filterType);
    }
]);

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
