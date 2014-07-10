var Context = require('./config/config.js');

// set project root path
Context.root = __dirname;

// add root path as static path
// Context.staticPath.push(__dirname);

//
var server = require(Context.serverPath);
var client = require(Context.clientPath);

client.init(Context);
server.init(Context);

server.route(Context);
server.start(Context);
