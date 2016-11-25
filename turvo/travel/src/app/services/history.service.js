angular.module('TA')
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
