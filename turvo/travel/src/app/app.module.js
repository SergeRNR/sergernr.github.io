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
