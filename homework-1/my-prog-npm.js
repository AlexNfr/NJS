/**
 * Created by galex on 24.10.16.
 */

require('colors');
player = require('play-sound')(opt = {});

console.log('Hello,'.yellow + ' World!'.blue);

console.log('It\'s beep # 6'.white);
player.play('beep-06.mp3', function(err){
    if (err) throw err
});

console.log('It\'s beep # 7'.grey);
player.play('beep-07.mp3', function(err){
    if (err) throw err
});

console.log('It\'s beep # 8b'.green);
player.play('beep-08b.mp3', function(err){
    if (err) throw err
});

