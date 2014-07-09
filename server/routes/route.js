// import controlers, use controler to process related request
var newsCtrl = require('../controllers/news.js'),
    express = require('express');

var setStaticPath = function (app, Context) {
    for (var i = 0, len = Context.staticPath.length; i < len; i++) {
        app.use(Context.express.static(Context.staticPath[i]));
    };
};

// configurate paths route
module.exports = function (app, database, Context, io) {
    // simple logger for this router's requests
    // all requests to this router will first hit this middleware
    app.use(function(req, res, next) {
        console.log('%s %s %s', req.method, req.url, req.path);
        next();
    });

    setStaticPath(app, Context);
    io.on('connection', newsCtrl.io);
};

