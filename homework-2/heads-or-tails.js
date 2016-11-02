/**
 * Created by AlexNfr on 25.10.16.
 */

var argv = require('minimist')(process.argv.slice(2));
var readLine = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
var fs = require('fs');
var colors = require('colors');

var logFileName, inputNumber, randomNumber;

console.log('=== Игра "Орел или решка" ===\n\n' +
            'Для окончания игры введите пустую строку\n'
);

logFileName = ((argv['_'].length < 1) ? 'heads-or-tails' : argv['_'][0]) + '.log';

readLine.question('Угадайте число (1 или 2): ', function (input) {
    inputNumber = parseInt(input, 10);
    if (input == '') {
        console.log('Конец игры!');
        readLine.close();
    } else if ((inputNumber == 1) || (inputNumber == 2)) {
        randomNumber = Math.floor(Math.random() * 2 + 1);

        resultStr = 'Я загадал: ' + randomNumber
            + ', Вы назвали: ' + inputNumber
            + '. ' + ((inputNumber == randomNumber) ? 'Вы выиграли!'.green : 'Вы проиграли...'.red)
            + '\n';
        console.log(resultStr);
        fs.appendFileSync(logFileName, resultStr);
    } else {
        console.log('Введено недопустимое число! Попробуйте еще раз.'.yellow);
    }
    readLine.close();
});


