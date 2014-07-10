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
            var payload = { action: false, info:'', data:'' };
            if (err) {
                payload.info = err;
            } else {
                payload.action = true;
                payload.data = docs;
            }
            socket.emit('news.list', payload);
        });
    });

    socket.on('news.item', function (data) {
        News.findById(data.id).exec(function (err, doc) {
            var payload = { action: false, info:'', data:'' };
            if (err) {
                payload.info = err;
            } else {
                payload.action = true;
                payload.data = doc;
            }
            socket.emit('news.item', payload);
        });
    });

    socket.on('news.add', function (data) {
        var news = new News(data);
        news.save(function (err, doc) {
            var payload = { action: false, info:'', data:'' };
            if (err) {
                payload.info = err;
            } else {
                payload.action = true;
                payload.data = doc;
            }
            socket.emit('news.add', payload);
        });
    });

    socket.on('news.update', function (data) {
        News.findByIdAndUpdate(data._id, { title:data.title, url:data.url }, function (err, doc) {
            var payload = { action: false, info:'', data:'' };
            if (err) {
                payload.info = err;
            } else {
                payload.action = true;
                payload.data = doc;
            }
            socket.emit('news.update', payload);
        });
    })

    socket.on('news.delete', function (data) {
        News.findByIdAndRemove(data._id).exec(function (err, doc) {
            var payload = { action: false, info:'', data:'' };
            if (err) {
                payload.info = err;
            } else {
                payload.action = true;
                payload.data = doc;
            }
            socket.emit('news.delete', payload);
        });
    });
}
