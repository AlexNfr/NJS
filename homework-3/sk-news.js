/**
 * Created by AlexNfr on 30.10.16.
 */

var request = require('request'),
    // http = require('http'),
    cheerio = require('cheerio');
var URL_TO_PARSE = 'http://sk.ru/news/b/news';
var titles = [],
    reviews = [],
    dates = [];

console.log('Skovkovo News Parser ver. 0.1 (c) 2016 by AlexNfr\n\n');

request(URL_TO_PARSE, function (error, response, html) {
    if (!error && response.statusCode == 200) {
        response.setEncoding('utf8');
        var $ = cheerio.load(html);
        $('.subject > h4').each(function(i, element) {
            titles[i] = $(element).text().trim();
        });
        $('.list-item-excerpt').each(function(i, element) {
            reviews[i] = $(element).text().trim();
        });
        $('.list-item-detail-info').each(function(i, element) {
            dates[i] = $(element).text().trim();
        });
        n = titles.length;
        for (var i = 0; i < n; i++) {
            console.log('News(', i + 1, '): "', titles[i], '"\n"', reviews[i], '"\n', dates[i], '\n\n');
        }
    }
});