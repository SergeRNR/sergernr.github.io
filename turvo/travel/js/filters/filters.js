app.filter('cmdate', [
    function () {
        return function (input) {
            return new Date(input).toString();
        }
    }
]);