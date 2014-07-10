(function () {
    angular.module('News').filter('shortDate', function () {
        return function (date) {
            var d = new Date(date);
            return d.toDateString();
        }
    });
})();
