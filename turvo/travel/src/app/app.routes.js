angular.module('TA')
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
            controller: `${item.name}Controller as ${item.type}`
        });
    });

    $urlRouterProvider.otherwise(filterTypes.length ? filterTypes[0].path : '/');
});
