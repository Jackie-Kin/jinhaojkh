/*
 * システム   : 次期営業支援システム全国版
 * 機能名     : 活動結果入力（入庫履歴）
 * ファイル名 : T_SR_JS_KatsudoKekkaNyuryokuTabReceptiHistory.js
 *
 *  VERSION    DATE        BY          CHANGE/COMMENT
 * ----------------------------------------------------------------
 *  1.00       2019/08/20  HISOL清水   新規作成
 */
$(function () {
    // 詳細ボタン
    $(".S10101-rh-list-syousaiBtn").on("click", function (e) {
        openNyukoreki($(this).parents(".button-area").find(".parm-nyukorekiId").val());
    });
});
// 整備情報詳細画面
function openNyukoreki(id) {
    spmWindow.open("/" + id);
}

function iframeClose() {
    $(".iframe ,#SC9S20203").hide();
    $(".iframe ,#SC9S20203").remove();
}

function onLoadCompleteSC9S20203() {
    spmMasterLayout.LoadEnd(parent.document);
}

function tryAction(action, error, complete) {

    try {

        if (action) {

            action.call(this);
        }

    } catch (e) {

        console.log("tryAction Error: " + e.message, e);

        if (error) {

            error.call(this, e);
        }

    } finally {

        if (complete) {

            complete.call(this);
        }
    }
};
