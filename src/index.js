import * as platform from './platform';
import { loadJS, versionCompare } from './utils';
class LaunchApp {
    constructor (options) {
        this.scheme = options.scheme;
        this.onFailed = options.onFailed.bind(this);
        this.downloadURL = options.downloadURL || {};
        this._debug = options._debug || false;
        this.timeoutToDownload = 0;
        this.visibility = {
            isInBackground: false,
            hideTime: 0
        };
        this.bindVisibilityChange();
    }

    log (...args) {
        if (this._debug) {
            console.log(...args);
        }
    }

    start () {
        if (platform.isWx()) {
            this.startInWechat();
        } else if (platform.isQQ()) {
            this.startInQQ();
        } else {
            this.openWithScheme();
        }
    }

    startInWechat () {
        this.log('startInWechat');
        // 微信6.5.5禁止scheme直接拉起，只能调用微信api拉起
        const ret = versionCompare(platform.getClientVersion(false), '6.5.5');
        let open;
        if (ret > 0) {
            open = this.openWithWeixinJSBridge.bind(this);
        } else {
            open = this.openWithScheme.bind(this);
        }
        if (typeof window.WeixinJSBridge === 'object' &&
            typeof window.WeixinJSBridge.invoke === 'function') {
            open();
        } else {
            loadJS('//res.wx.qq.com/open/js/jweixin-1.2.0.js');
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', open, false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', open);
                document.attachEvent('onWeixinJSBridgeReady', open);
            }
        }
    }

    startInQQ () {
        if (window.mqq) {
            this.openWithMqq();
        } else {
            loadJS('//open.mobile.qq.com/sdk/qqapi.js?_bid=152', this.openWithMqq.bind(this));
        }
    }

    bindVisibilityChange () {
        this.log('bindVisibilityChange');
        const { visibilityChangeName, hiddenName } = this.getVisibilityChangeName();
        const onHide = () => {
            this.log('onHide');
            this.visibility.isInBackground = true;
            this.visibility.hideTime = new Date().getTime();
        };
        const onShow = () => {
            this.log('onShow');
            const { timeoutToDownload, visibility: { hideTime } } = this;
            const showTime = new Date().getTime();
            if (showTime - hideTime > 1500) {
                this.log('clearTimeout');
                clearTimeout(timeoutToDownload);
            }
            this.visibility.isInBackground = false;
        };
        if (hiddenName) {
            document.addEventListener(visibilityChangeName, (event) => {
                this.log(event);
                const isHidden = platform.isQQ() ? event.hidden : document[hiddenName];
                if (isHidden) {
                    onHide();
                } else {
                    onShow();
                }
            }, false);
        } else {
            window.addEventListener('blur', onHide(), false);
            window.addEventListener('focus', onShow(), false);
        }
    }

    getVisibilityChangeName () {
        let hiddenName, visibilityChangeName;
        if (document.hidden !== undefined) {
            hiddenName = 'hidden';
            visibilityChangeName = 'visibilitychange';
        } else if (document.mozHidden !== undefined) {
            hiddenName = 'mozHidden';
            visibilityChangeName = 'mozvisibilitychange';
        } else if (document.msHidden !== undefined) {
            hiddenName = 'msHidden';
            visibilityChangeName = 'msvisibilitychange';
        } else if (document.webkitHidden !== undefined) {
            hiddenName = 'webkitHidden';
            visibilityChangeName = 'webkitvisibilitychange';
        }
        if (platform.isQQ()) {
            visibilityChangeName = 'qbrowserVisibilityChange';
        }
        return { hiddenName, visibilityChangeName };
    }

    openWithScheme () {
        const { scheme } = this;
        function createLaunchIFrame (url) {
            const iFrame = document.createElement('iframe');
            iFrame.style.cssText = 'display:none;width:0px;height:0px;';
            iFrame.src = url;
            document.body.appendChild(iFrame);
            return iFrame;
        }

        let iFrame;
        if (platform.isIos()) {
            setTimeout(function () {
                window.location.href = scheme;
            }, 500);
        } else if (platform.isAndroid()) {
            setTimeout(function () {
                iFrame = createLaunchIFrame(scheme);
            }, 500);
        }

        this.timeoutToDownload = setTimeout(() => {
            iFrame && document.body.removeChild(iFrame);
            !this.visibility.isInBackground && this.openFailedCallback();
        }, 3000);
    }

    openWithMqq (err) {
        if (err) {
            return;
        }
        window.mqq.invokeURL(this.scheme);
        this.timeoutToDownload = setTimeout(() => {
            if (!this.visibility.isInBackground) this.openFailedCallback();
        }, 3000);
    }

    openWithWeixinJSBridge () {
        this.log('openWithWeixinJSBridge');
        const launchApp = () => {
            window.WeixinJSBridge.invoke('launchApplication', {
                'schemeUrl': this.scheme,
                'showLaunchFaildToast': false
            }, (res) => {
                if (/launchApplication:fail/.test(res.err_msg)) {
                    this.openFailedCallback();
                }
            });
        };

        if (typeof window.WeixinJSBridge === 'object' &&
            typeof window.WeixinJSBridge.invoke === 'function') {
            launchApp();
        } else {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', launchApp, false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', launchApp);
                document.attachEvent('onWeixinJSBridgeReady', launchApp);
            }
        }
    }

    openFailedCallback () {
        const { onFailed, downloadURL } = this;
        onFailed && onFailed();
        if (platform.isIos() && downloadURL.ios) {
            window.location.href = downloadURL.ios;
        } else if (platform.isAndroid() && downloadURL.android) {
            window.location.href = downloadURL.android;
        } else if (downloadURL.home) {
            window.location.href = downloadURL.home;
        }
    }
}

function init (options) {
    return new LaunchApp(options);
}

export default {
    init
};
