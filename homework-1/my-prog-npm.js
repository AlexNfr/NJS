/**
 * Created by galex on 24.10.16.
 */

require('colors');
require('sounds');

var soundManager=new Sounds('./',function() {
    console.log('Hello,'.yellow + ' World!'.blue);
    soundManager.play('beep',3);
});
soundManager.register('Beep.ogg');

