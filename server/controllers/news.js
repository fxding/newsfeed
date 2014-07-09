var News = require('../models/News');

// add news item to db
exports.add = function (data) {
    var news = new News(data);
    news.save(function (err) {
        if (err) {
            console.log(err);
        }
    });
};

// socket apis
exports.io = function (socket) {
    var pageSize = 10;
    socket.on('news.list', function (data) {
        News.find().skip(pageSize * data.pageId).limit(pageSize).exec(function (err, docs) {
            socket.emit('news.list', docs);
            console.log('news.list');
        });
    });

    socket.on('news.item', function (data) {
        News.findById(data.id).exec(function (err, doc) {
            socket.emit('news.item', { action:true, info:'OK', data:doc });
        });
    });

    socket.on('news.add', function (data) {
        var news = new News(data);
        news.save(function (err, doc) {
            if (err) {
                socket.emit('news.add', { action:false, info:err });
                return ;
            }
            socket.emit('news.add', { action:true, info:'OK', data:doc });
        });
    });

    socket.on('news.update', function (data) {
        News.findByIdAndUpdate(data._id, { title:data.title, url:data.url }, function (err, doc) {
            if (err) {
                socket.emit('news.update', { action:false, info:err });
                return ;
            }
            socket.emit('news.update', { action:true, info:'OK', data:doc });
        });
    })

    socket.on('news.delete', function (data) {
        News.findByIdAndRemove(data._id).exec(function (err, doc) {
            if (err) {
                socket.emit('news.delete', { action:false, info:err });
                return ;
            }
            socket.emit('news.delete', { action:true, info:'OK', data:doc });
        });
    });
}
