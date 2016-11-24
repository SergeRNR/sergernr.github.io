angular.module('TA')
.controller('AppController', [
    'filterTypes',
    'localStorageService',
    function (filterTypes, localStorageService) {
        this.filterTypes = filterTypes;

        this.search = (form) => {
            if (form) {
                localStorageService.push('search', form);
            }
        };
    }
]);
