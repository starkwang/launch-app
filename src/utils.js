export function loadJS (filename, callback) {
    let script = document.createElement('script');
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

export function versionCompare (versionCurr, versionNext) {
    versionCurr = versionCurr.split('.');
    versionNext = versionNext.split('.');

    const len = Math.min(versionCurr.length, versionNext.length);

    for (let i = 0; i < len; i++) {
        const left = parseInt(versionCurr[i], 10) - parseInt(versionNext[i], 10);

        if (left !== 0) {
            return left;
        }
    }

    return (versionCurr.length - versionNext.length);
}
