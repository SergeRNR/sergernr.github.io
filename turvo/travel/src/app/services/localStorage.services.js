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
