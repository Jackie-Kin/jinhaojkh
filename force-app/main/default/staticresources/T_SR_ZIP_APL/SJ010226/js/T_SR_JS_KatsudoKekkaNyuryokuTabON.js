/*
 * システム   : 次期営業支援システム全国版
 * 機能名     : 活動結果入力（お客様なし）
 * ファイル名 : T_SR_JS_KatsudoKekkaNyuryokuTabON.js
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

        // 登録ボタン
        $("#S10101-iar-btn-entry").on("click", function (e) {
            S10101InputActivityResult.commit();
        });
        $('#S10101-iar-btn-entry').removeClass('no-select');
    }, 0);
});
