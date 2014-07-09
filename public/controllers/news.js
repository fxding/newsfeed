angular.module('News').controller('NewsController', ['$scope', 'Socket', function ($scope, Socket) {
    $scope.newsList = []; // store all news items
    $scope.newsItem = {};
    $scope.pageId = 0; // current page NO.

    $scope.nextPage = function (pageId) {
        console.log(pageId);
        // request next page
        Socket.emit('news.list', { pageId: pageId});
    };

    $scope.getNewsItem = function (newsId) {
        console.log(newsId);
        Socket.emit('news.id', { id: newsId });
    };

    var pageUpdate = function () {
        $('#news-list').attr('start', $scope.pageId * 10 + 1);

    }

    Socket.on('news.list', function (data) {
        console.log(data);
        if (data.length == 0) {
            $('#warning-text').text('No more news').slideDown();
            return;
        } else {
            $('#warning-text').hide();
        }
        $scope.newsList = data;
        pageUpdate();
        $scope.pageId += 1;

    });

    $scope.nextPage($scope.pageId);
}])
.controller('EditController', ['$scope', '$location', '$routeParams', 'Socket', function ($scope, $location, $routeParams, Socket) {
    var id = $routeParams.id;

    // Get news item by id
    var getNewsItem = function (id) {
        Socket.emit('news.item', {id:id});
    }
    Socket.on('news.item', function (data) {
        console.log(data);
        $scope.newsItem = data.data;
    });

    // update action
    $scope.update = function (data) {
        Socket.emit('news.update', data);
    }
    Socket.on('news.update', function (data) {
        console.log("Update: " + data.info);
        $location.path('/');
    });

    // delete action
    $scope.delete = function (data) {
        Socket.emit('news.delete', data);
    }
    Socket.on('news.delete', function (data) {
        console.log("Delete: " + data.info);
        $location.path('/');
    });

    // Get item by id
    getNewsItem(id);
}])
.controller('AddController', ['$scope', '$location', 'Socket', function ($scope, $location, Socket) {
    // add action
    $scope.add = function (data) {
        Socket.emit('news.add', data);
    }
    Socket.on('news.add', function (data) {
        console.log(data.info);
        $location.path('/');
    });
}]);
