(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _platform = __webpack_require__(1);

var platform = _interopRequireWildcard(_platform);

var _utils = __webpack_require__(2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LaunchApp = function () {
    function LaunchApp(options) {
        _classCallCheck(this, LaunchApp);

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

    _createClass(LaunchApp, [{
        key: 'log',
        value: function log() {
            if (this._debug) {
                var _console;

                (_console = console).log.apply(_console, arguments);
            }
        }
    }, {
        key: 'start',
        value: function start() {
            if (platform.isWx()) {
                this.startInWechat();
            } else if (platform.isQQ()) {
                this.startInQQ();
            } else {
                this.openWithScheme();
            }
        }
    }, {
        key: 'startInWechat',
        value: function startInWechat() {
            this.log('startInWechat');
            // 微信6.5.5禁止scheme直接拉起，只能调用微信api拉起
            var ret = (0, _utils.versionCompare)(platform.getClientVersion(false), '6.5.5');
            var open = void 0;
            if (ret > 0) {
                open = this.openWithWeixinJSBridge.bind(this);
            } else {
                open = this.openWithScheme.bind(this);
            }
            if (_typeof(window.WeixinJSBridge) === 'object' && typeof window.WeixinJSBridge.invoke === 'function') {
                open();
            } else {
                (0, _utils.loadJS)('//res.wx.qq.com/open/js/jweixin-1.2.0.js');
                if (document.addEventListener) {
                    document.addEventListener('WeixinJSBridgeReady', open, false);
                } else if (document.attachEvent) {
                    document.attachEvent('WeixinJSBridgeReady', open);
                    document.attachEvent('onWeixinJSBridgeReady', open);
                }
            }
        }
    }, {
        key: 'startInQQ',
        value: function startInQQ() {
            if (window.mqq) {
                this.openWithMqq();
            } else {
                (0, _utils.loadJS)('//open.mobile.qq.com/sdk/qqapi.js?_bid=152', this.openWithMqq.bind(this));
            }
        }
    }, {
        key: 'bindVisibilityChange',
        value: function bindVisibilityChange() {
            var _this = this;

            this.log('bindVisibilityChange');

            var _getVisibilityChangeN = this.getVisibilityChangeName(),
                visibilityChangeName = _getVisibilityChangeN.visibilityChangeName,
                hiddenName = _getVisibilityChangeN.hiddenName;

            var onHide = function onHide() {
                _this.log('onHide');
                _this.visibility.isInBackground = true;
                _this.visibility.hideTime = new Date().getTime();
            };
            var onShow = function onShow() {
                _this.log('onShow');
                var timeoutToDownload = _this.timeoutToDownload,
                    hideTime = _this.visibility.hideTime;

                var showTime = new Date().getTime();
                if (showTime - hideTime > 1500) {
                    _this.log('clearTimeout');
                    clearTimeout(timeoutToDownload);
                }
                _this.visibility.isInBackground = false;
            };
            if (hiddenName) {
                document.addEventListener(visibilityChangeName, function (event) {
                    _this.log(event);
                    var isHidden = platform.isQQ() ? event.hidden : document[hiddenName];
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
    }, {
        key: 'getVisibilityChangeName',
        value: function getVisibilityChangeName() {
            var hiddenName = void 0,
                visibilityChangeName = void 0;
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
            return { hiddenName: hiddenName, visibilityChangeName: visibilityChangeName };
        }
    }, {
        key: 'openWithScheme',
        value: function openWithScheme() {
            var _this2 = this;

            var scheme = this.scheme;

            function createLaunchIFrame(url) {
                var iFrame = document.createElement('iframe');
                iFrame.style.cssText = 'display:none;width:0px;height:0px;';
                iFrame.src = url;
                document.body.appendChild(iFrame);
                return iFrame;
            }

            var iFrame = void 0;
            if (platform.isIos()) {
                setTimeout(function () {
                    window.location.href = scheme;
                }, 500);
            } else if (platform.isAndroid()) {
                setTimeout(function () {
                    iFrame = createLaunchIFrame(scheme);
                }, 500);
            }

            this.timeoutToDownload = setTimeout(function () {
                iFrame && document.body.removeChild(iFrame);
                !_this2.visibility.isInBackground && _this2.openFailedCallback();
            }, 3000);
        }
    }, {
        key: 'openWithMqq',
        value: function openWithMqq(err) {
            var _this3 = this;

            if (err) {
                return;
            }
            window.mqq.invokeURL(this.scheme);
            this.timeoutToDownload = setTimeout(function () {
                if (!_this3.visibility.isInBackground) _this3.openFailedCallback();
            }, 3000);
        }
    }, {
        key: 'openWithWeixinJSBridge',
        value: function openWithWeixinJSBridge() {
            var _this4 = this;

            this.log('openWithWeixinJSBridge');
            var launchApp = function launchApp() {
                window.WeixinJSBridge.invoke('launchApplication', {
                    'schemeUrl': _this4.scheme,
                    'showLaunchFaildToast': false
                }, function (res) {
                    if (/launchApplication:fail/.test(res.err_msg)) {
                        _this4.openFailedCallback();
                    }
                });
            };

            if (_typeof(window.WeixinJSBridge) === 'object' && typeof window.WeixinJSBridge.invoke === 'function') {
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
    }, {
        key: 'openFailedCallback',
        value: function openFailedCallback() {
            var onFailed = this.onFailed,
                downloadURL = this.downloadURL;

            onFailed && onFailed();
            if (platform.isIos() && downloadURL.ios) {
                window.location.href = downloadURL.ios;
            } else if (platform.isAndroid() && downloadURL.android) {
                window.location.href = downloadURL.android;
            } else if (downloadURL.home) {
                window.location.href = downloadURL.home;
            }
        }
    }]);

    return LaunchApp;
}();

exports.default = LaunchApp;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isQQ = isQQ;
exports.isWx = isWx;
exports.isIos = isIos;
exports.isIpad = isIpad;
exports.isAndroid = isAndroid;
exports.isMobile = isMobile;
exports.getClientVersion = getClientVersion;
var ua = navigator.userAgent;

// 检测是否为qq
function isQQ() {
    return !!navigator.userAgent.match(/QQ\//);
}

// 检测是否为微信
function isWx() {
    return !!navigator.userAgent.match(/micromessenger/i);
}

// 检测是否为ios手机
function isIos() {
    var REGEXP_IOS = /.*?(iPad|iPhone|iPod).*/;
    return REGEXP_IOS.test(ua);
}

function isIpad() {
    var REGEXP_IPAD = /.*?(iPad).*/;
    return REGEXP_IPAD.test(ua);
}

// 检测是否为安卓手机
function isAndroid() {
    var REGXP_ANDROID = /.*(Android).*/;
    return REGXP_ANDROID.test(ua);
}

// 检测是否为移动浏览器
function isMobile() {
    return !!(isAndroid() || isIos());
}

function getClientVersion(number) {
    var mat = ua.match(/MicroMessenger\/([\d\.]+)/i);
    var version = void 0;

    if (mat && mat.length > 1) {
        version = mat[1];
    }

    if (!version) {
        return 0;
    }

    return number ? version.replace(/\./g, '') : version;
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loadJS = loadJS;
exports.versionCompare = versionCompare;
function loadJS(filename, callback) {
    var script = document.createElement('script');
    script.async = false;
    script.src = filename;

    script.addEventListener('load', function () {
        script.parentNode.removeChild(script);
        callback();
    }, false);

    script.addEventListener('error', function () {
        script.parentNode.removeChild(script);
        callback(new Error('loading script failed'));
    }, false);
    document.body.appendChild(script);
}

function versionCompare(versionCurr, versionNext) {
    versionCurr = versionCurr.split('.');
    versionNext = versionNext.split('.');

    var len = Math.min(versionCurr.length, versionNext.length);

    for (var i = 0; i < len; i++) {
        var left = parseInt(versionCurr[i], 10) - parseInt(versionNext[i], 10);

        if (left !== 0) {
            return left;
        }
    }

    return versionCurr.length - versionNext.length;
}

/***/ })
/******/ ]);
});