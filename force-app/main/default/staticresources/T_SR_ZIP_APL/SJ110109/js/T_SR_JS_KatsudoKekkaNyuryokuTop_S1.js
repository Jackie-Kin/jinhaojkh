/*
 * システム   : 次期営業支援システム全国版
 * 機能名     : 活動結果入力(外側)(S1)
 * ファイル名 : T_SR_JS_KatsudoKekkaNyuryokuTop_S1.js
 *
 *  VERSION    DATE        BY          CHANGE/COMMENT
 * ----------------------------------------------------------------
 *  1.00       2019/09/20  HISOL孫     新規作成
 */
(function (base) {

    // 名前空間
    var ns = base.T_P_KatsudoKekkaNyuryokuTop = base.T_P_KatsudoKekkaNyuryokuTop || {};

    /**
     * 要素を参照するセレクター定義。
     */
    ns.Selectors = {
        /**
         * フォローフラグ
         */
        FOLLOW_FLAG: '#S00301-follow-button',

        /**
         * 隠し項目：お客様オブジェクトID
         */
        HIDDEN_CONTACT_ID: "#S00301-hidden-contactId",
        
        /**
         * 隠し項目：車両オブジェクトID
         */
        HIDDEN_SHARYO_ID: "#S00301-hidden-sharyoId",
        
        /**
         * 隠し項目：活動接触明細オブジェクトID
         */
        HIDDEN_MEISAI_ID: "#S00301-hidden-meisaiId",

        /**
         * 隠し項目：フォロー済フラグ
         */
        HIDDEN_FOLLOW_ZUMI_FLG: "#S00301-hidden-followZumiFlg"
    };

    /**
     * フォローフラグ関連
     */
    ns.FollowFlag = {
        /**
         * Url
         */
        Url: 'UpdateFollowFlag',

        /**
         * パラメータ
         */
        UrlParamNames: {
            /**
             * 活動接触明細オブジェクトID
             */
            MEISAI_ID: "meisaiId",
            /**
             * フォロー済フラグ
             */
            FOLLOW_ZUMI_FLG: "followZumiFlg"
        }
    }

    /**
     * 初期表示処理を行います。
     */
    ns.init = function () {
        // 各ボタンのクリックイベントを設定
        $(ns.Selectors.FOLLOW_FLAG).click(onClickFollowFlag);
    };

    /**
     * フォローフラグクリック時のイベント処理。
     */
    function onClickFollowFlag() {
        // 非活性の場合は処理しない
        if ($(ns.Selectors.FOLLOW_FLAG).hasClass("inactive")) {
            return;
        }
        updateFollowFlag();
    }
})(window);