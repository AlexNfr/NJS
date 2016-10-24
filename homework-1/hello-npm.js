/**
 * Created by galex on 24.10.16.
 */

var ansi = require('ansi');
var cursor = ansi(process.stdout);
console.log('Ansi!');
cursor.beep();
