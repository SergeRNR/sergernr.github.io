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
