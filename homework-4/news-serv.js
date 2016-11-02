/**
 * Created by AlexNfr on 02.11.16.
 */

var express = require('express');
    app = express();
var templating = require('consolidate');

app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.get('/', function (req, res) {
    res.render('hello', {
        title: 'Привет, handlebars!'
    });
});