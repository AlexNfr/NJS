/**
 * Created by AlexNfr on 30.10.16.
 */

var request = require('request'),
    http = require('http'),
    cheerio = require('cheerio');
var URL_TO_PARSE = 'http://sk.ru/news/b/news';

request(URL_TO_PARSE, function (error, response, html) {
    if (!error && response.ststusCode == 200) {
        response.writeHead(200,{'Content-Type': 'text/plain; charset=utf8'});
        var $ = cheerio.load(html);
        var titles = $('.subject');
        console.log(titles);
    }
});