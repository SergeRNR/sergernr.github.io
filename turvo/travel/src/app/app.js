'use strict';

angular.module('TA', ['ui.router', 'templates'])
.config(($stateProvider, $urlRouterProvider) => {
    $stateProvider.state('app', {
        url: '/',
        templateUrl: 'components/app.html',
        controller: 'AppController as app'
    });
    $urlRouterProvider.otherwise('/');
});
