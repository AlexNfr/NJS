/**
 * Created by AlexNfr on 02.11.16.
 */

var express = require('express');
var templating = require('consolidate');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var port = Number(process.env.port || 3200);
var app = express();

function getFilterSettings(req) {
    var filter = {};

    filter[req.cookies.newsservcategory] = 'selected';
    filter[req.cookies.newsservsize] = 'selected';
    return filter;
}

function putFilterSettings(req, res) {
    res.cookie('newsservcategory', (req.body['news-category'] || 'fresh'));
    res.cookie('newsservsize', (req.body['news-size'] || 10));
}

function getNewsList(category, size) {
    var newsList = 'Единственная новость на сегодня: плохих новостей нет';

    return newsList;
}

app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(bodyParser());
app.use(cookieParser());

app.get('/', function (req, res) {
    res.render('news', {
        title: 'Сервер новостей Сколково приветствует вас!',
        message: 'Здесь вы можете узнать все новости из Сколково. '
                + 'Для этого достаточно выбрать желаемые параметры фильтра новостей и нажать кнопку "Показать":',
        filter: getFilterSettings(req),
    });

});

app.route('/news')
    .get(function (req, res) {
        res.render('news', {
            title: 'Новости Сколково',
            message: 'Пожалуйста, наслаждайтесь выбранными новостями:',
            filter: getFilterSettings(req),
            newsTitle: 'Список выбранных новостей',
            newsList: getNewsList()
        })
    })
    .post(function (req, res) {
        putFilterSettings(req, res);
        res.redirect('/news');
    });

app.listen(port, function () {
    console.log('News server listening on port ' + port);
});