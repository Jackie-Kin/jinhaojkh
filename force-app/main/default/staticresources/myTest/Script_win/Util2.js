
/**
 * @fileoverview 共通のユーティリティ
 */

spmUtil = function () {
};

/**
 * string文字列チェック
 */
spmUtil.stringIsNullOrEmpty = function (str) {
    if (typeof (str) == "undefined") {
        return true;
    } else if ((str == null) || (str == "")){
        return true;
    } else {
        return false;
    }
};

/**
 * 文字列フォーマット
 */
spmUtil.formatString = function (text) {
    // 可変長引数を順番に取り出す
    for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];

        // 配列は内部を展開して表示
        if (Array.isArray(arg)) {
            var tmp = "[";
            for (var j = 0; j < arg.length; j++) {
                tmp += arg[j];
                if (j != arg.length - 1) {
                    tmp += ", ";
                }
            }
            tmp += "]";
            arg = tmp;
        }

        // "{*}"部分(*: 数字)をi番目の引数で置換
        var pattern = new RegExp('\\{' + (i - 1) + '\\}', 'g');
        text = text.replace(pattern, arg);
    }
    return text;
};

/**
 * ゼロ埋め
 */
spmUtil.formatNumber = function (num, i) {
    return (Array(i + 1).join('0') + num.toString()).slice(-i)
};

/**
 * オブジェクトをクエリストリングとしてパラメータ化
 * @param {Object} obj パラメータをプロパティとして定義したオブジェクト
 * @param {boolean} isEncode URLエンコードする場合はtrue、そうでない場合はfalse
 */
spmUtil.toQueryString = function (obj, isEncode) {

    var paramsArray = [];

    for (var key in obj) {

        var value = obj[key];

        if (isEncode) {

            value = encodeURIComponent(value);
        }

        paramsArray.push(key + '=' + value);
    }

    return paramsArray.join('&');
};

/**
 * 文字のバイト数を取得する
 * @see http://javascript.dohow.jp/tips/form/countbyte.shtml
 * @param {string} strSrc パラメータをプロパティとして定義したオブジェクト
 */
spmUtil.getBytes = function (strSrc) {
    var len = 0;
    strSrc = escape(strSrc);
    for (i = 0; i < strSrc.length; i++, len++) {
        if (strSrc.charAt(i) == "%") {
            if (strSrc.charAt(++i) == "u") {
                i += 3;
                len++;
            }
            i++;
        }
    }
    return len;
};

/**
* 文字列内の特殊文字を置き換える
* @param {string} str パラメータ
* @return 置き換えた文字列
*/
spmUtil.escapeHtml = function (str) {
    // 変換する文字列を宣言
    var character = {
        "&": "&amp;",
        ">": "&gt;",
        "<": "&lt;"
    };
    // 正規表現を使用して文字列を置換する
    return ret = str.replace(/[&<>]/g, function (chr) {
        return character[chr];
    });
};

/**
* エスケープした文字列を特殊文字に置き換える
* @param {string} str パラメータ
* @return 置き換えた文字列
*/
spmUtil.unescapeHtml = function (str) {
    // 正規表現を使用して文字列を置換する
    var ret = str.replace(/&lt;/g, "<");
    ret = ret.replace(/&gt;/g, ">");
    ret = ret.replace(/&amp;/g, "&");
    return ret;
};

/**
* 文字列内の特殊文字を置き換える
* @param {string} str パラメータ
* @return 置き換えた文字列
*/
spmUtil.escapeHtml2 = function (str) {
    // 変換する文字列を宣言
    var character = {
        "&": "&amp;",
        ">": "&gt;",
        "<": "&lt;",
        '"': "&quot;"
    };
    // 正規表現を使用して文字列を置換する
    return ret = str.replace(/[&<>]/g, function (chr) {
        return character[chr];
    });
};

/**
* エスケープした文字列を特殊文字に置き換える
* @param {string} str パラメータ
* @return 置き換えた文字列
*/
spmUtil.unescapeHtml2 = function (str) {
    // 正規表現を使用して文字列を置換する
    var ret = str.replace(/&lt;/g, "<");
    ret = ret.replace(/&gt;/g, ">");
    ret = ret.replace(/&amp;/g, "&");
    ret = ret.replace(/&quot;/g, '"');
    return ret;
};