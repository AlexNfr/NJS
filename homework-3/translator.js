/**
 * Created by AlexNfr on 28.10.16.
 */

var http = require('http'),
    url = require('url'),
    request = require('request');
var PORT = 3200;

function translate(word) {
    var YANDEX_KEY = 'trnsl.1.1.20161028T132106Z.31c161e395527497.8fc1ff3a44d508aae5b493e6fb7b839936925480';
    var requestToYandex = 'https://translate.yandex.net/api/v1.5/tr.json/translate '
        + '?key=' + YANDEX_KEY + '&text=' + word + '&lang=en-ru';

    request(requestToYandex, function (error, res, body) {
        console.log(error, body);
        if (!error && res.statusCode == 200) {
            translate = (JSON.parse(body).text);
        }
    });
    // http
    //     .get(requestToYandex, function(res) {
    //         console.log('response: ', res.statusCode);
    //         console.log('http headers: ', res.headers);
    //
    //         // По событию, обрабатываем получаемые данные
    //         res.on('data', function(chunk) {
    //             console.log('BODY: ', chunk.toString());
    //         });
    //
    //         // Отлавливаем конец данных
    //         res.on('end', function() {
    //             console.log('No more data in response.');
    //         });
    //     })
    //     .on('error', function(error) {
    //         throw error;
    //     });
}

function onRequest(req, res) {
    var incoming, wordEn, wordRu;

    incoming = url.parse(req.url);
    wordEn = incoming.query;
    console.log(wordEn);

    wordRu = translate(wordEn);
    console.log(wordRu);

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(wordRu);
    res.end();
}

http.createServer(onRequest).listen(PORT);
console.log('Translator has started.');