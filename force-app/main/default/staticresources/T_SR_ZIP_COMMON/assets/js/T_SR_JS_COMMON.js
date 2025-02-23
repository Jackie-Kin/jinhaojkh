/*
 * システム   : 次期営業支援システム全国版
 * 機能名     : 基盤共通javascript
 * ファイル名 : T_SR_JS_COMMON.js
 *
 *  VERSION    DATE        BY                CHANGE/COMMENT
 * ----------------------------------------------------------------
 *  1.00       2018/02/09  FSI T.Jonishi    新規作成
 */

/* 
 * 処理対象ID配下を無効にする
 * @param id 処理対象ID
 */
function disableAll(id) {

    var obj = document.getElementById(id);
    setDisableAll(obj, true);
}

/* 
 * 処理対象ID配下を有効にする
 * @param id 処理対象ID
 */
function enableAll(id) {

    var obj = document.getElementById(id);
    setDisableAll(obj, false);
}

/* 
 * 処理対象の活性状態を変更する
 * 状態保持のため、元から非活性の項目は変更しない
 * @param obj 処理対象オブジェクト
 * @param disabled 活性区分（true：非活性,false：活性）
 */
function setDisableAll(obj, disabled) {

    if (obj.classList === undefined) {
        //何もしない
    } else {
        var nowDisabled = obj.disabled;
        //非活性処理時、元から非活性の項目に対してはスキップ用の目印をつけておく
        if (disabled && nowDisabled) {
            obj.classList.add("isSkip");
        }
        var isSkip = obj.classList.contains("isSkip");
    }

    //目印がついていないものだけ処理
    if (!isSkip) {
        obj.disabled = disabled;
        for (var i = 0; i < obj.childNodes.length; i++) {
            setDisableAll(obj.childNodes[i], disabled);
        }
    }

    //（必要であれば）活性に戻す際、スキップ用の目印を削除
    if(!disabled){
        if (obj.classList === undefined) {
           //何もしない
        } else {
            obj.classList.remove("isSkip");
        }
    }
}
