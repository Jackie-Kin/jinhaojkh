/**
 * システム   : 次期営業支援システム融合版
 * 機能名     : リクエスト情報画面スクリプト
 * ファイル名 : SJ010299.js
 * 
 * VERSION     DATE                BY                 CHANGE/COMMENT
 * ---------------------------------------------------------------------------------
 * 1.00        2019/08/05          FSI                新規作成
 */
(function (base) {

    // 名前空間
    var ns = base.SJ010229 = base.SJ010229 || {};

    /**
     * 要素を参照するセレクター定義。
     */
    ns.Selectors = {

        /**
         * WEB閲覧ボタン。
         */
        WEB_BUTTON: '#S010229-web-button',

        /**
         * MAPボタン。
         */
        MAP_BUTTON: '#S010229-map-button',

        /**
         * 郵便番号(隠しパラメータ)
         */
        HIDDEN_POST: '#S010229-hidden-post',

        /**
         * 住所の表示
         */
        ADDRESS_VIEW: '#S010229-address-view',

        /**
         * 郵便番号の表示
         */
        POST_VIEW: '#S010229-post-view',

        /**
         * お客様コード
         */
        CUSTOMER_CODE_VALUE: '#S010229-okyaku-code-value',

        /**
         * Web閲覧ウィンドウ名
         */
        WINDOW_NAME_WEB: 'webView',

        /**
         * メールアドレスの表示
         */
        MAIL_VIEW: '#S010229-mail-view',

        /**
         * 隠し項目：販売店コード
         */
        HIDDEN_HANBAITEN_CORD: "#S010229-hidden-cd-hanbaiten",

        /**
         * 隠し項目：会社コード
         */
        HIDDEN_KAISYA_CORD: "#S010229-hidden-cd-kaisya",

        /**
         * 隠し項目：店舗コード
         */
        HIDDEN_TENPO_CORD: "#S010229-hidden-cd-tenpo",

        /**
         * 隠し項目：スタッフコード
         */
        HIDDEN_STAFF_CORD: "#S010229-hidden-cd-staff",

        /**
         * 隠し項目：お客様コード
         */
        HIDDEN_OKYAKU_CORD: "#S010229-hidden-cd-okyaku",

        /**
         * 隠し項目：WEB閲覧URL
         */
        HIDDEN_WEB_URL: "#S010229-hidden-web-url"
    };

    /**
     * 動的処理に利用するクラス
     */
    ns.Classes = {

        /**
         * 要素の非表示
         */
        HIDDEN: 'S010229-hidden'
    };

    /**
     * 初期表示処理を行います。
     */
    ns.init = function () {

        initButtonVisible();

        // 各ボタンのクリックイベントを設定
        $(ns.Selectors.WEB_BUTTON).click(onClickWeb);

        $(ns.Selectors.MAP_BUTTON).click(onClickMap);

        // お客様コードのクリックイベントを設定
        $(ns.Selectors.CUSTOMER_CODE_VALUE).click(onClickCustomerCode);

        // お客様コード以外のクリック時に選択状態を解除する
        $(document).click(function(event) {
            if(event.target.id != ns.Selectors.CUSTOMER_CODE_VALUE.replace('#', '')) {
                document.body.style.webkitUserSelect = 'none';
            }
        });
    };

    /**
     * WEB閲覧ボタンクリック時のイベント処理。
     */
    function onClickWeb() {

        /* 無効の時は何も処理しない */
        if ($(this).hasClass("inactive")) {
            return;
        }

        // URLを取得する
        var url = $(ns.Selectors.HIDDEN_WEB_URL).val();

        // 別ウィドウのパラメータをセットする
        var param = spmWindow.GetParameter(648, 1260, 0, 0);

        // 別ウィドウを開く
        spmWindow.open(url, ns.Selectors.WINDOW_NAME_WEB, param);
    }

    /**
     * MAPボタンクリック時のイベント処理。
     */
    function onClickMap() {

        var postCode = $(ns.Selectors.HIDDEN_POST).val();
        var address = $(ns.Selectors.ADDRESS_VIEW).text();

        openMap(postCode, address);
    }

    /**
     * ボタン表示処理
     */
    function initButtonVisible() {

        if ($(ns.Selectors.POST_VIEW).text() || $(ns.Selectors.ADDRESS_VIEW).text()) {

            $(ns.Selectors.MAP_BUTTON).removeClass(ns.Classes.HIDDEN);
        }
    }

    /**
     * 指定された郵便番号・住所に基づく地図を開く
     * @param {string} postCode - 郵便番号
     * @param {string} address - 住所
     */
    function openMap(postCode, address) {

        var parameterArray = [];

        if (postCode && !address) {

            parameterArray.push(encodeURIComponent(postCode));
        }

        if (address) {

            parameterArray.push(encodeURIComponent(address));
        }

        var params = {
            q: parameterArray.join('+')
        };

        var url = $("#S010229-hidden-map-url").val() + '?' + spmUtil.toQueryString(params, false);

        var param = spmWindow.GetParameter(720, 1280, 0, 0);
        spmWindow.open(url, "GoogleMap", param);
    }

    /*
     * お客様コードクリック処理
     */
    function onClickCustomerCode() {
        var element = $(ns.Selectors.CUSTOMER_CODE_VALUE);

        if (0 < element.length) {
            document.body.style.webkitUserSelect = 'auto';
            var range = document.createRange();
            range.selectNode(element[0]);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
        }
    }
})(window);

/**
 * Closeボタン
 */
$(function(){
    $(".popup-close").click(function () {
        window.parent.white_popup_close('SJ010229');
    });
});
