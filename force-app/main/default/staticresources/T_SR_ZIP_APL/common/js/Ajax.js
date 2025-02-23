
/**
 * @fileoverview 共通のAjax
 */

spmAjax = function () {
};

/**
 * Ajax (post)
 */
// 2019.02.21 mod start
spmAjax.post = function (url, arg, successCallback, errorCallback, optTimeout) {
// spmAjax.post = function (url, arg, successCallback, errorCallback) {
// 2019.02.21 mod end
 
    var ajaxDo = $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(arg),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        cache: false,
// 2019.02.21 mod start
        timeout: spmAjax._GetTimeout(60000, optTimeout),
//         timeout: 60000,
// 2019.02.21 mod end
    })
	.done(function (data, textStatus, xhr) {

	    if ($.isFunction(successCallback)) {
	        successCallback(data, textStatus, xhr)
	    }
	})
    .fail(function (XMLHttpRequest, textStatus, errorThrown) {

        var msg = spmAjax.getErrMsg(XMLHttpRequest, textStatus, errorThrown);

        if ($.isFunction(errorCallback)) {
            errorCallback(XMLHttpRequest, textStatus, errorThrown, msg)
        }

// 2019.02.21 mod start
        spmAjax._LogOutput("spmAjax.post", url, JSON.stringify(arg), msg);
//        spmAjax._LogOutput(msg);
// 2019.02.21 mod end

    })

    return ajaxDo;
};

/**
 * Ajax (get)
 */
// 2019.02.21 mod start
spmAjax.get = function (url, arg, successCallback, errorCallback, optTimeout) {
// spmAjax.get = function (url, arg, successCallback, errorCallback) {
// 2019.02.21 mod end
    
    var ajaxDo = $.ajax({
        type: 'GET',
        url: url,
        data: arg,
        cache: false,
// 2019.02.21 mod start
        timeout: spmAjax._GetTimeout(30000, optTimeout),
//         timeout: 30000,
// 2019.02.21 mod end
    })
    .done(function (data, textStatus, xhr) {

        if ($.isFunction(successCallback)) {
            successCallback(data, textStatus, xhr)
        }
    })
    .fail(function (XMLHttpRequest, textStatus, errorThrown) {

        var msg = spmAjax.getErrMsg(XMLHttpRequest, textStatus, errorThrown);

        if ($.isFunction(errorCallback)) {
            errorCallback(XMLHttpRequest, textStatus, errorThrown, msg)
        }
 
// 2019.02.21 mod start
        spmAjax._LogOutput("spmAjax.get", url, JSON.stringify(arg), msg);
//         spmAjax._LogOutput(msg);
// 2019.02.21 mod end
 
    });

    return ajaxDo;
};

/**
 * Ajax (get partial)
 */
// 2019.02.21 mod start
spmAjax.getPrtial = function (url, arg, successCallback, errorCallback, optTimeout) {
// spmAjax.getPrtial = function (url, arg, successCallback, errorCallback) {
// 2019.02.21 mod end
 
    var ajaxDo = $.ajax({
        type: 'POST',
        url: url,
        data: arg,
        cache: false,
// 2019.02.21 mod start
        timeout: spmAjax._GetTimeout(30000, optTimeout),
//         timeout: 30000,
// 2019.02.21 mod end
    })
    .done(function (data, textStatus, xhr) {

        if ($.isFunction(successCallback)) {
            successCallback(data, textStatus, xhr)
        }
    })
    .fail(function (XMLHttpRequest, textStatus, errorThrown) {

        var msg = spmAjax.getErrMsg(XMLHttpRequest, textStatus, errorThrown);

        if ($.isFunction(errorCallback)) {
            errorCallback(XMLHttpRequest, textStatus, errorThrown, msg)
        }
 
// 2019.02.21 mod start
        spmAjax._LogOutput("spmAjax.getPrtial", url, JSON.stringify(arg), msg);
//         spmAjax._LogOutput(msg);
// 2019.02.21 mod end
    });
 
};

// 2019.02.21 add start
/* タイムアウト時間の設定 */
spmAjax._GetTimeout = function (def, param) {

    if ($.isNumeric(param)) {
        return param;
    } else {
        return def;
    }
};
// 2019.02.21 add end
 
/**
 * Log出力
 */
// 2019.02.21 add start
spmAjax._LogOutput = function (func, url, arg, msg) {
// spmAjax._LogOutput = function (msg) {
// 2019.02.21 add end
 
// 2019.02.21 mod start
    var errmsgl = [];
    errmsgl.push("");
    errmsgl.push(" Ajax Err:[" + func + "]");
    errmsgl.push("      url:[" + url + "]");
    errmsgl.push("      arg:[" + arg + "]");
    errmsgl.push("      msg:[" + msg + "]");
    var errmsg = errmsgl.join('\n');
    spmLog.consoleError(errmsg);
//     spmLog.consoleError(msg);
//     spmLog.error(msg);
// 2019.02.21 mod end
};

/**
 * Ajax (エラーメッセージ)
 */
spmAjax.getErrMsg = function (XMLHttpRequest, textStatus, errorThrown) {
    if (errorThrown && errorThrown.message) {
        return errorThrown.message;
    }
    if (XMLHttpRequest.statusText) {
        return XMLHttpRequest.statusText;
    }
}