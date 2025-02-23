/*
 * システム   : 次期営業支援システム全国版
 * 機能名     : 活動結果入力（見込み客）（S1）
 * ファイル名 : T_SR_JS_KatsudoKekkaNyuryokuTabProspectiveCustomer.js
 *
 *  VERSION    DATE        BY          CHANGE/COMMENT
 * ----------------------------------------------------------------
 *  1.00       2019/08/15  HISOL張     新規作成
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

        // 他活動表示ボタン
        $(".S10101-ai-other-view").on("click", function (e) {
            S10101ActivityInformation.viewOtherActivity();
        });

        $(".S10101-ai-history-memo img").on("click", function (e) {
            S10101InputActivityResult.memoHyouji(this);
        });
        $(".memoHyouji").on("click", function (e) {
            S10101InputActivityResult.memoHide();
        });

        if ($("#important-memo-kensu").val() >= 0) {
            S10101InputActivityResult.memoPagination("memo-pagination");
        }

    }, 0);

    // 市場設置ボタン
    $(document).on("click", "#S10101-na-button-Recall", function (e) {
        S10101Buttons.clickRecallButton($(this));
    });

    // 推奨整備ボタン
    $(document).on("click", "#S10101-na-button-SRT", function (e) {
        S10101Buttons.clickSRTButton($(this));
    });

    // ヘルスチェックレポートボタン
    $(document).on("click", "#S10101-na-button-ParaSts", function (e) {
        S10101Buttons.clickParaStsButton($(this));
    });

    // リクエストボタン
    $(document).on("click", "#S10101-na-button-Request", function (e) {
        S10101Buttons.clickRequestButton($(this));
    });
});
