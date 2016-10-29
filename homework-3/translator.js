/**
 * Created by AlexNfr on 28.10.16.
 */

var http = require('http'),
    url = require('url'),
    request = require('request');
var PORT = 3200;

function onRequest(req, response) {
    var incomingRequest,
        translatorTitle = 'Online Translate Service ver. 0.1 (c) 2016 by AlexNfr\n\n',
        helpMessage = '  Usage: localhost:3200[/<word1>[/<word2>...[/<word2>]...]]'
    var wordsEn, wordsRu,
        YANDEX_KEY = 'trnsl.1.1.20161028T132106Z.31c161e395527497.8fc1ff3a44d508aae5b493e6fb7b839936925480',
        requestToYandex;

    response.writeHead(200, {'Content-Type': 'text/plain; charset=utf8'});
    response.write(translatorTitle);

    incomingRequest = url.parse(req.url);
    // console.log(incomingRequest);

    if (incomingRequest.path == '/')
    {
        response.write(helpMessage);
        response.end();
    }
    else
    {
        wordsEn = incomingRequest.path.split('/');
        console.log('En: ', wordsEn.slice(-1));

        requestToYandex = 'https://translate.yandex.net/api/v1.5/tr.json/translate'
            + '?key=' + YANDEX_KEY + wordsEn.join('&text=') + '&lang=en-ru';

        request(requestToYandex, function (error, res, body) {
            if (!error && res.statusCode == 200) {
                wordsRu = JSON.parse(body).text;
                if (wordsRu.length) {
                    console.log('Ru:', wordsRu);
                    wordsRu.forEach(function (wordRu, i, arr) {
                        response.write(wordsEn[i + 1] + ' (en) => ' + wordRu + ' (ru)\n');
                    });
                }
                response.end();
            }
        });
    }
}

http.createServer(onRequest).listen(PORT);
console.log('Translator has started.');
