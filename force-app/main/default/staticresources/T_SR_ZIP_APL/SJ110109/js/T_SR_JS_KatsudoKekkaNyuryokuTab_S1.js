/*
 * システム   : 次期営業支援システム全国版
 * 機能名     : 活動結果入力（見込み客）
 * ファイル名 : T_SR_JS_KatsudoKekkaNyuryokuTab_S1.js
 *
 *  VERSION    DATE        BY          CHANGE/COMMENT
 * ----------------------------------------------------------------
 *  1.00       2019/08/20  HISOL清水   新規作成
 */
$(function () {

    //====================================
    // イベント処理
    //====================================

    setTimeout(function () {

        // 画面イニシャル処理
        S10101InputActivityResult.initial(['.S10101-ai-history-scroll', '.S10101-ai-plan-scroll', '.S10101-iar-scroll']);

        if ($("#errFlg").val() == "1") {
            window.parent.spmDialog.error('0', '活動結果入力', $("#errMsg").val(), '活動結果入力');
        }

    }, 0);

});
