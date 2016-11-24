angular.module('TA')
.filter('stars', [() => (count) => {
    let template = '*';
    let result = [];
    while (count > 0) {
        result.push(template);
        count--;
    }
    return result.join('');
}]);
