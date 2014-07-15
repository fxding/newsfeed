## News Feed
This is a news feed demo, builded in `Node.js` `Mongodb`, `Mongooose`, `Express.js`, `AngularJS`, `Socket.io`, `Bootstrap`.

## Usage

* You need to use tool to insert data into `Mongodb`, this file is dump.js. dump.js will request content from [Hacker News](http://news.ycombinator.com).
and insert news items into `Mongodb`. Or you can click "Add" button on the right of top navbar to add items. 
```
$ node dump.js
```
* install modules
```
$ npm install
```
* start server
```
$ node app.js
```
* enter url in your browser
```
$ 127.0.0.1:3000
```


## Directories
### Application
```
.
├── README.md
├── app.js   // application stat point
├── config   // system config, path, port, name ....
├── public   // client directory, angular, bootstrap, views, image, js, css
└── server   // server directory, mongoose, socket.io, node.js
```
### Client
```
public
├── app.js         // angular app
├── assets         // js, css, image...
├── config.js      // system config settings
├── controllers    // angluar ...
├── filters
├── models
├── routes
├── services
└── views
```

### Server
```
server
  ├── app.js          // server start point
  ├── config          // server settings, static path, name...
  ├── controllers     // for Mongodb
  ├── models          // Mongodb Schemas
  └── routes          // socket.io routes, or url routes.
```


