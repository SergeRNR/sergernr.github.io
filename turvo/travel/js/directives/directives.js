app.directive('myCell',
    function () {
        return {
            restrict: 'E',
            transclude: true,
            template: '<div ng-transclude></div>'
        }
    }
);