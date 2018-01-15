import LaunchApp from '../';
var a = new window.VConsole();
var myApp = new LaunchApp({
    scheme: 'tnow://openpage/playmedia?cmd=0x289&subcmd=0xa&type=3&feed_id=feed_634971462_9aa9d14d7ce2a7d6303c6b82f56a7e88&startsrc=H52',
    _debug: true,
    downloadURL: {
        ios: 'https://itunes.apple.com/cn/app/qq/id444934666',
        android: 'http://im.qq.com',
        home: 'http://www.qq.com'
    },
    onFailed () {
        console.log('onFailed');
    }
});

document.getElementById('open').addEventListener('click', () => {
    myApp.start();
});
