(function () {
    angular.module('News').config(function($routeProvider) {
      $routeProvider
        .when('/', {
          controller:'NewsController',
          templateUrl:'list.html'
        })
        .when('/edit/:id', {
          controller:'EditController',
          templateUrl:'detail.html'
        })
        .when('/add', {
          controller:'AddController',
          templateUrl:'add.html'
        })
        .otherwise({
          redirectTo:'/'
        });
    });
})();
