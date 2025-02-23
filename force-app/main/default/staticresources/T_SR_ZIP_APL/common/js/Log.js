
/**
 * @fileoverview クライアントログを共通で利用するJavaScript
 */

spmLog = function () {
};

// コンソールログを出力する
spmLog.ConsoleLogLevel = 0;

/**
 * コンソールログ
 */
spmLog.consoleTrace = function (message) {
    if (spmLog.ConsoleLogLevel <= 0) {
        _consoleLog(0, message);
    }
};
spmLog.consoleInfo = function (message) {
    if (spmLog.ConsoleLogLevel <= 1) {
        _consoleLog(1, message);
    }
};
spmLog.consoleError = function (message) {
    if (spmLog.ConsoleLogLevel <= 2) {
        _consoleLog(2, message);
    }
};

function _consoleLog(level, msg) {
    
    var dtstr = "";
    var dt = new Date();

    dtstr += dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate() + " ";
    dtstr += dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds() + "." + dt.getMilliseconds() + " ";
    dtstr += msg;

    if (level == 0) {
        console.info(dtstr);
    } else if (level == 1) {
        console.warn(dtstr);
    } else if (level == 2) {
        console.error(dtstr);
    }
}

/**
 * サーバログ出力
 */
// 2019/07/01 del start 融合版では不要のため削除
/*
// サーバログを出力する
spmLog.LogLevel = 0;

spmLog.trace = function (message) {
    if (spmLog.LogLevel <= 0) {
        _writeLog(0, message);
    }
};
spmLog.info = function (message) {
    if (spmLog.LogLevel <= 1) {
        _writeLog(1, message);
    }
};
spmLog.error = function (message) {
    if (spmLog.LogLevel <= 2) {
        _writeLog(2, message);
    }
};

function _writeLog(level, message) {

    var postPath = "/S0/Common/WriteClientLog";

    $.ajax({
        type: "POST",
        url: postPath,
        data: {
            "level": level,
            "message": message
        }
    });
}
*/
// 2019/07/01 del end 融合版では不要のため削除
