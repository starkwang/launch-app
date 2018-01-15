const ua = navigator.userAgent;

// 检测是否为qq
export function isQQ () {
    return !!navigator.userAgent.match(/QQ\//);
}

// 检测是否为微信
export function isWx () {
    return !!navigator.userAgent.match(/micromessenger/i);
}

// 检测是否为ios手机
export function isIos () {
    const REGEXP_IOS = /.*?(iPad|iPhone|iPod).*/;
    return REGEXP_IOS.test(ua);
}

export function isIpad () {
    const REGEXP_IPAD = /.*?(iPad).*/;
    return REGEXP_IPAD.test(ua);
}

// 检测是否为安卓手机
export function isAndroid () {
    const REGXP_ANDROID = /.*(Android).*/;
    return REGXP_ANDROID.test(ua);
}

// 检测是否为移动浏览器
export function isMobile () {
    return !!(isAndroid() || isIos());
}

export function getClientVersion (number) {
    const mat = ua.match(/MicroMessenger\/([\d\.]+)/i);
    let version;

    if (mat && mat.length > 1) {
        version = mat[1];
    }

    if (!version) {
        return 0;
    }

    return (number ? version.replace(/\./g, '') : version);
}
