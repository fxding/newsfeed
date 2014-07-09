var jsdom = require("jsdom"),
    fs = require("fs"),
    mongoose = require('mongoose'),
    news = require('./controllers/news');

mongoose.connect('mongodb://localhost/news');

var jquery = fs.readFileSync("./jquery.js", "utf-8");
var baseUrl = "http://news.ycombinator.com";

(function crawl(url){
    jsdom.env({
      url: url,
      src: [jquery],
      done: function (errors, window) {
            if (errors) {
                console.log(errors);
            }
            var $ = window.$;
            var items = $('td.title').not(':last').parent();
            items.each(function () {
                var children = $(this).children('.title');
                var item = $(children[1]).children('a');
                var newsTitle = item[0].innerHTML;
                var newsUrl = $(item[0]).attr('href');
                console.log(newsTitle +'---' + newsUrl);
                news.add({title:newsTitle, url:newsUrl});
            });
						console.log('-----------');
            var more = $('td.title a').last().attr('href');
            if (more !== undefined) {
                var url = baseUrl + (more[0] == '/' ? more: '/' + more);
                crawl(url);
            }
      }
    });
})(baseUrl);
