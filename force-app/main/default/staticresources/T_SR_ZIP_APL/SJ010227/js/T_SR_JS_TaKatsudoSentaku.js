/*
 * システム   : 次期営業支援システム全国版
 * 機能名     : 他活動選択画面
 * ファイル名 : T_SR_JS_TaKatsudoSentaku.js
 *
 *  VERSION    DATE        BY          CHANGE/COMMENT
 * ----------------------------------------------------------------
 *  1.00       2019/06/27  HISOL中原   新規作成
 */

$(function () {
    //====================================
    // 画面処理
    //====================================
    if ($(12 < ".s10111-scroll table tr").length) {
        $(".s10111-list-body").css("margin-right", "0");
    }
    else{
        $(".s10111-list-body").css("margin-right", "18px");
    }
    setTimeout(function () {
        if ($("#errFlg").val() == "1") {
            spmDialog.error('0', '活動一覧', $("#errMsg").val(), '活動一覧');
        }
    }, 100);
    
    $(".popup-close").click(function () {
        window.parent.white_popup_close('T_P_TaKatsudoSentaku');
    });
});