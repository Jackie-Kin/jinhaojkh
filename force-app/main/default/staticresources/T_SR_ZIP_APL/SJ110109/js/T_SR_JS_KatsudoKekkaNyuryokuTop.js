/*
 * システム   : 次期営業支援システム全国版
 * 機能名     : 活動結果入力(外側)（S1）
 * ファイル名 : T_SR_JS_KatsudoKekkaNyuryokuTop.js
 *
 *  VERSION    DATE        BY          CHANGE/COMMENT
 * ----------------------------------------------------------------
 *  1.00       2019/08/15  HISOL張     新規作成
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
         * Cカルテボタン
         */
        C_KARTE_BUTTON: '#S00301-c-karte-button',

        /**
         * 活動追加ボタン
         */
        ADD_ACT_BUTTON: '#S00301-add-act-button',

        /**
         * SMBボタン。
         */
        SMB_BUTTON: '#S00301-smb-button',

        /**
         * CHATTERボタン。
         */
        CHATTER_BUTTON: '#S00301-chatter-button',

        /**
         * MAPボタン。
         */
        MAP_BUTTON: '#S00301-map-button',

        /**
         * 郵便番号(隠しパラメータ)
         */
        HIDDEN_POST: '#S00301-hidden-post',

        /**
         * 住所の表示
         */
        ADDRESS_VIEW: '#S00301-address-view',

        /**
         * 郵便番号の表示
         */
        POST_VIEW: '#S00301-post-view',

        /**
         * 詳細画面のPOPUPコンテナID
         */
        POPUP_CONTAINER: '#S00301-popup-container',

        /**
         * 詳細画面のPOPUP閉じるボタン
         */
        POPUP_CLOSE: '.popup-close',

        /**
         * 詳細画面のPOPUP閉じるボタン制御(透過要素)
         */
        POPUP_FILTER: '#S00301-popup-filter',

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
        HIDDEN_FOLLOW_ZUMI_FLG: "#S00301-hidden-followZumiFlg",

        /**
         * 隠し項目：登録No.陸支コード
         */
        HIDDEN_RIKUSI_CORD: "#S00301-hidden-cdRikusi",

        /**
         * 隠し項目：登録No.車種区分
         */
        HIDDEN_SYASYU_KUBN: "#S00301-hidden-kbNosyasyu",

        /**
         * 隠し項目：登録No.業態コード
         */
        HIDDEN_GYOTAI_CORD: "#S00301-hidden-cdNogyotai",

        /**
         * 隠し項目：登録No.整理番号
         */
        HIDDEN_SEIRI_NUM: "#S00301-hidden-noNoseiri",

        /**
         * 隠し項目：SMB_URL
         */
        HIDDEN_SMB_URL: "#S00301-hidden-smb-url",

        /**
         * 隠し項目：SMB_TENPODE
         */
        HIDDEN_SMB_CDTENPO: "#S00301-hidden-smb-cdTenpo",

        /**
         * 隠し項目：GOOGLE_MAP_URL
         */
        HIDDEN_GOOGLE_MAP_URL: "#S00301-hidden-map-url",

        /**
         * 隠し項目：お客様コード
         */
        HIDDEN_OKYAKU_CODE_VALUE: "#S00301-hidden-okyaku-code"
    };

    /**
     * 動的処理に利用するクラス
     */
    ns.Classes = {
        /**
         * 要素の非表示
         */
        HIDDEN: 'S00301-hidden'
    };

    /**
     * WebMessagingAPIで利用するオリジン定義
     */
    ns.Origin = {
        /**
         * SPM
         */
        SPM: '*'
    };

    /**
     * URL定義
     */
    ns.Url = {
        /**
         * 地図表示用の外部URL
         */
        Map: 'https://maps.google.co.jp/maps'
    };

    /**
     * メッセージ定義
     */
    ns.Messages = {
        /**
         * 活動作成
         */
        CREATE_ACTIVITY: 'i-CROP-Jのお客様情報詳細画面を表示します。',

        /**
         * SMB表示
         */
        SHOW_SMB: 'SMBの画面を表示します。',

        /**
         * SMBクリックして、車両詳細の選択車両がなかった場合表示
         */
        NO_SELECTED_CAR_TITLE: 'SMB',
        NO_SELECTED_CAR: '車両詳細から車両を選択してください。'
    };

    /**
     * SMB関連
     */
    ns.Smb = {
        /**
         * パラメータ
         */
        UrlParamNames: {
            /**
             * 連携パターン
             */
            RENKEI_PATTERN: "renkeiPattern",
            /**
             * 操作対象店舗コード
             */
            SOSA_TAISYO_TENPOCD: "sosaTaisyoTenpoCd",
            /**
             * 処理モード
             */
            SYORI_MODE: "syoriMode",
            /**
             * 戻り先URL
             */
            MODORI_URL: "modoriUrl",
            /**
             * 予約日制限
             */
            YOYAKUBI_SEIGEN: "yoyakubiSeigen",
            /**
             * お客様コード
             */
            OKYAKU_CORD: "okyakuCd",
            /**
             * 登録No.陸支コード
             */
            TOROKU_RIKUSI_CORD: "torokuRikusiCd",
            /**
             * 登録No.車種区分
             */
            TOROKU_SYASYU_KUBUN: "torokuSyasyuKubun",
            /**
             * 登録No.業態コード
             */
            TOROKU_GYOTAI_CORD: "torokuGyotaiCd",
            /**
             * 登録No.整理番号
             */
            TOROKU_SEIRI_BANGO: "torokuSeiriBango"
        },
        UrlParamConsts: {
            /**
             * 空
             */
            STRING_EMPTY: "",
            /**
             * 連携パターン
             */
            RENKEI_PATTERN_RENKEI: "10",
            /**
             * 処理モード（修正・登録）
             */
            SYORI_MODE_TOROKU: "1",
            /**
             * 処理モード
             */
            SYORI_MODE_SINKI: "2",
            /**
             * 戻り先URL
             */
            MODORI_URL_SPM: "SFDC",
            /**
             * 予約日制限
             */
            YOYAKUBI_SEIGEN_TOUJITSU: "1"
        }
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
     * リフレッシュの組み合わせ
     */
    ns.RefreshTable = {
        SC9S20101: [
            'T_P_KatsudoKekkaNyuryokuTop',
            'S20201View',
            'T_P_KatsudoKekkaNyuryokuTab'
        ],
        SC9S20102: [
            'S20101View',
            'S20201View',
            'T_P_KatsudoKekkaNyuryokuTab'
        ],
        SC9S20201: [
            'T_P_KatsudoKekkaNyuryokuTab',
            'S20101View'
        ]
    };

    /**
     * 活動作成のかんばん名称
     */
    ns.KANBAN_NAME = '個別追加';

    /**
     * 初期表示処理を行います。
     */
    ns.init = function () {
        initPostCode();
        initButtonVisible();

        // 各ボタンのクリックイベントを設定
        $(ns.Selectors.C_KARTE_BUTTON).click(onClickCKarte);
        $(ns.Selectors.ADD_ACT_BUTTON).click(onClickAddAct);
        $(ns.Selectors.SMB_BUTTON).click(onClickSmb);
        $(ns.Selectors.CHATTER_BUTTON).click(onClickChatter);
        $(ns.Selectors.FOLLOW_FLAG).click(onClickFollowFlag);
        $(ns.Selectors.MAP_BUTTON).click(onClickMap);
        
        // POPUPのクローズイベントを設定
        // spmPopup.addEventListener('close', onClose);
    };

    /**
     * SMBボタンの活性化処理を行います。
     */
    ns.enableSmbButton = function (cdRikusi, kbNosyasyu, cdNogyotai, noNoseiri) {
        // パラメータを保持
        $(ns.Selectors.HIDDEN_RIKUSI_CORD).val(cdRikusi);
        $(ns.Selectors.HIDDEN_SYASYU_KUBN).val(kbNosyasyu);
        $(ns.Selectors.HIDDEN_GYOTAI_CORD).val(cdNogyotai);
        $(ns.Selectors.HIDDEN_SEIRI_NUM).val(noNoseiri);

        // SMBボタン活性化
        if ($(ns.Selectors.SMB_BUTTON).hasClass("inactive")) {
            $(ns.Selectors.SMB_BUTTON).removeClass("inactive");
        }
    }

    /**
     * SMBボタンの非活性化処理を行います。
     */
    ns.disableSmbButton = function () {
        // パラメータを削除
        $(ns.Selectors.HIDDEN_RIKUSI_CORD).val('');
        $(ns.Selectors.HIDDEN_SYASYU_KUBN).val('');
        $(ns.Selectors.HIDDEN_GYOTAI_CORD).val('');
        $(ns.Selectors.HIDDEN_SEIRI_NUM).val('');

        // SMBボタン非活性化
        if (!$(ns.Selectors.SMB_BUTTON).hasClass("inactive")) {
            $(ns.Selectors.SMB_BUTTON).addClass("inactive");
        }
    }

    ns.filteringClose = function (isFilter) {

        var container = $(ns.Selectors.POPUP_CONTAINER);

        if (isFilter) {

            var closeButton = $(ns.Selectors.POPUP_CLOSE, container);

            var filterElement = $('<div></div>');
            filterElement.attr('id', ns.Selectors.POPUP_FILTER.substring(1));
            filterElement.css('position', 'absolute');
            filterElement.offset(closeButton.offset());
            filterElement.width(closeButton.width());
            filterElement.height(closeButton.height());
            filterElement.css('background-color', 'transparent');

            container.append(filterElement);

        } else {

            $(ns.Selectors.POPUP_FILTER, container).remove();
        }
    }

    /**
     * 共通(詳細)の再描画
     */
    ns.Refresh = function (param) {
        refreshCommon(param);
   };

    /**
     * 郵便番号の初期表示処理
     */
    function initPostCode() {
        var postCode = $(ns.Selectors.HIDDEN_POST).val();
        if (postCode) {
            postCode = [postCode.substring(0, 3), postCode.substring(3)].join('-');
            $(ns.Selectors.POST_VIEW).text(postCode);
        }
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
     * SMBボタンクリック時のイベント処理。
     */
    function onClickSmb() {
        // 非活性の場合は処理しない
        if ($(ns.Selectors.SMB_BUTTON).hasClass("inactive")) {
            return;
        }

        // 非表示の場合は処理しない
        if ($(ns.Selectors.SMB_BUTTON).hasClass("hidden")) {
            return;
        }

        T_P_KatsudoKekkaNyuryokuTop.openSmb();
    }

    ns.openSmb = function () {
        // SMB URL取得
        var url = $(ns.Selectors.HIDDEN_SMB_URL).val();
        if (url == "" || url == undefined) {
            return;
        }
        var params = {};
        params[ns.Smb.UrlParamNames.RENKEI_PATTERN] = ns.Smb.UrlParamConsts.RENKEI_PATTERN_RENKEI;
        params[ns.Smb.UrlParamNames.SOSA_TAISYO_TENPOCD] = ns.Smb.UrlParamConsts.STRING_EMPTY;
        params[ns.Smb.UrlParamNames.SYORI_MODE] = ns.Smb.UrlParamConsts.SYORI_MODE_TOROKU;
        params[ns.Smb.UrlParamNames.MODORI_URL] = ns.Smb.UrlParamConsts.MODORI_URL_SPM;
        params[ns.Smb.UrlParamNames.YOYAKUBI_SEIGEN] = ns.Smb.UrlParamConsts.YOYAKUBI_SEIGEN_TOUJITSU;
        params[ns.Smb.UrlParamNames.OKYAKU_CORD] = ($(ns.Selectors.HIDDEN_OKYAKU_CODE_VALUE).val() + "         ").slice(0, 9);
        params[ns.Smb.UrlParamNames.TOROKU_RIKUSI_CORD] = ($(ns.Selectors.HIDDEN_RIKUSI_CORD).val() + "     ").slice(0, 5);
        params[ns.Smb.UrlParamNames.TOROKU_SYASYU_KUBUN] = ($(ns.Selectors.HIDDEN_SYASYU_KUBN).val() + "   ").slice(0, 3);
        params[ns.Smb.UrlParamNames.TOROKU_GYOTAI_CORD] = $(ns.Selectors.HIDDEN_GYOTAI_CORD).val();
        params[ns.Smb.UrlParamNames.TOROKU_SEIRI_BANGO] = $(ns.Selectors.HIDDEN_SEIRI_NUM).val();
        var url2 = url + "?" + spmUtil.toQueryString(params, true);
        var param = spmWindow.GetParameter(720, 1280, 0, 0);
        spmWindow.open(url2, "Smb", param);
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

        var url = $("#S00301-hidden-map-url").val() + '?' + spmUtil.toQueryString(params, false);

        var param = spmWindow.GetParameter(720, 1280, 0, 0);
        spmWindow.open(url, "GoogleMap", param);
    }

    ns.loadS10101 = function () {
        try{
            // SMBボタンの活性非活性制御
            var S10101 = $('#S10101Frame').contents();
            var cdRikusi = S10101.find("[id$='\:S10101-hidden-cdRikusi']").val();
            var kbNosyasyu = S10101.find("[id$='\:S10101-hidden-kbNosyasyu']").val();
            var cdNogyotai = S10101.find("[id$='\:S10101-hidden-cdNogyotai']").val();
            var noNoseiri = S10101.find("[id$='\:S10101-hidden-noNoseiri']").val();

            if ((cdRikusi != "" && cdRikusi != undefined) &&
                (kbNosyasyu != "" && kbNosyasyu != undefined) &&
                (cdNogyotai != "" && cdNogyotai != undefined) &&
                (noNoseiri != "" && noNoseiri != undefined)) {
                T_P_KatsudoKekkaNyuryokuTop.enableSmbButton(cdRikusi, kbNosyasyu, cdNogyotai, noNoseiri);
            } else {
                T_P_KatsudoKekkaNyuryokuTop.disableSmbButton();
            }
        } catch(e) {
        }
    };

    /**
     * POPUPのクローズイベント処理
     */
    function onClose(options, container) {
        if (container.attr('id') !== 'S00301-popup-container') {
            return;
        }
        if (window.parent) {
            var sendOptions = $.extend({
                ProgramId: 'T_P_KatsudoKekkaNyuryokuTop',
                MessageId: '000003',
                ResultCd: '1'

            }, options)

            window.parent.postMessage(JSON.stringify(sendOptions), ns.Origin.SPM);
        }
        spmWindow.allClose();
    }
    ns.popupClose = onClose;

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