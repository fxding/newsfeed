var mongoose = require('mongoose'),
    express = require('express'),
    http = require('http'),
    config = require('./config/config.js'),
    router = require('./routes/route.js'),
    socket = require('socket.io');

// 1 system init, some system config
module.exports.init = function (Context) {
    // connect to db
    mongoose.connect(Context.db);
    // create express app and server
    Context.express = express;
    Context.app = express();
    Context.server = http.createServer(Context.app);
    // create socket
    Context.socket = socket(Context.server);
};

// 2 route init,
module.exports.route = function (Context) {
    // server root path
//    config.root = __dirname;
    router(Context.app, Context.db, Context, Context.socket);
};

// 3 start service,
module.exports.start = function (Context) {
    Context.server.listen(Context.serverPort);
    console.log('Server listening on port:' + Context.serverPort);
};
