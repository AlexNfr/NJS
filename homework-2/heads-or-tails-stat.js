/**
 * Created by AlexNfr on 25.10.16.
 */

var argv = require('minimist')(process.argv.slice(2));
var fs = require('fs');
var colors = require('colors');

var logFileName, logData;
var victoryCntAll = 0, victoryCnt = 0, victoryMaxCnt = 0,
    failureCntAll = 0, failureCnt = 0, failureMaxCnt = 0;

console.log('=== Стаитстика игры "Орел или решка" ===\n\n');

logFileName = ((argv['_'].length < 1) ? 'heads-or-tails' : argv['_'][0]) + '.log';

if (!fs.existsSync(logFileName)) {
    console.log('Файл статистики ' + logFileName + ' не найден!'.red);
} else {
    logData = fs.readFileSync(logFileName, 'utf8').split('\n');
    // контрольный (отладочный) вывод данных статистики
    console.log(logData);

    logData.forEach(function (statElement, i, arr) {
        if (statElement.indexOf('выиграл') != -1) {
            victoryCntAll++;
            if (!failureCnt) {
                victoryCnt++;
                if (victoryCnt > victoryMaxCnt) {
                    victoryMaxCnt = victoryCnt;
                }
            } else {
                victoryCnt = 1;
                failureCnt = 0;
            }
        } else if (statElement.indexOf('проиграл') != -1) {
            failureCntAll++;
            if (!victoryCnt) {
                failureCnt++;
                if (failureCnt > failureMaxCnt) {
                    failureMaxCnt = failureCnt;
                }
            } else {
                failureCnt = 1;
                victoryCnt = 0;
            }
        }
    })

    console.log('Всего сыграно партий: ' + logData.length + ', из них:');
    console.log(('  выиграно - ' + victoryCntAll).green);
    console.log(('  проиграно - ' + failureCntAll).red);
    console.log(('  соотношение - ' + victoryCntAll/failureCntAll));
    console.log();
    console.log(('Максимальное число подряд:'));
    console.log(('  побед - ' + victoryMaxCnt).green);
    console.log(('  проигрышей - ' + failureMaxCnt).red);
    console.log();

}

