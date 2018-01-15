# launch-app

[![npm version](https://badge.fury.io/js/launch-app.svg)](https://badge.fury.io/js/launch-app)
[![dependencies Status](https://david-dm.org/starkwang/launch-app/status.svg)](https://david-dm.org/starkwang/launch-app)
[![devDependencies Status](https://david-dm.org/starkwang/launch-app/dev-status.svg)](https://david-dm.org/starkwang/launch-app?type=dev)

launch your app from web page

------

# Install

```bash
npm install --save launch-app
```

------

# Usage
```js
import LaunchApp from 'launch-app'

const myApp = new LaunchApp({
	// your app scheme
	scheme: 'weixin://abc',
	
	// debug mode
	_debug: true,
	
	// download URL for your app
	downloadURL: {
        ios: 'https://itunes.apple.com/cn/app/qq/id444934666',
        android: 'http://im.qq.com',
        home: 'http://www.qq.com'
    },
    
    // if opening app failed, this callback will be invoked
    onFailed () {
        console.log('onFailed');
    }
});

// launch your app
myApp.start()
```

------
# Support browser

* Safari in iOS
* QQ built-in browser
* WeChat built-in browser


------

# Tips

If you use it in wechat, **don't forget to initialize `weixinJSBridge` before**:

1、 Load `jweixin.js`:

```html
<script src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
```

2、Config it:

```js
jWeixin.config({
    appId: '',
    timestamp: ,
    nonceStr: '',
    signature: ''
});
```

[here is official documents](http://qydev.weixin.qq.com/wiki/index.php?title=%E5%BE%AE%E4%BF%A1JS-SDK%E6%8E%A5%E5%8F%A3)

------

# License

MIT License

Copyright (c) 2018 Weijia Wang