module.exports = {
    init : function (Context) {
        Context.staticPath.push(__dirname);
        Context.staticPath.push(__dirname + '/assets');
        Context.staticPath.push(__dirname + '/views');
    }
};
