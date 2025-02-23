(function (base) {

    if (base.spmPopup) {
        return;
    }

    // 名前空間
    var ns = base.spmPopup = base.spmPopup || {};

    var listeners = {
        onClose: []
    };

    var containerOptions = {};

    /**
     * デフォルトのIDの接頭辞
     */
    ns.DefaultIdPrefix = '__spmPopup';

    /**
     * セレクター定義
     */
    ns.Selectors = {
        /**
         * POPUPの裏に表示するオーバーレイ
         */
        OVERLAY: '#overlay',
        /**
         * POPUPの内容を格納するコンテナ
         */
        POPUP_CONTAINER: '.popup-container',
        /**
         * 複数のPOPUPコンテナの親
         */
        POPUP_CONTAINERS: '#popup-containers',
        /**
         * ドラッグ可能範囲
         */
        CONTAINMENT: 'body',
        /**
         * ドラッグ操作のハンドル
         */
        HANDLE: 'header',
        /**
         * POPUPの閉じるボタン
         */
        POPUP_CLOSE: '.popup-close'
    };

    /**
     * 動的処理で利用するクラス
     */
    ns.Classes = {

        /**
         * POPUPのコンテナ
         */
        POPUP_CONTAINER: 'popup-container',
        /**
         * POPUPを中央表示するための一時クラス
         */
        CENTERING: 'centering',
        /**
         * 最前面以外のPOPUPを背面に隠すためのクラス
         */
        BACKGROUND: 'background',

        /**
         * POPUPの閉じる制御用クラス
         */
        POPUP_CLOSEABLE: 'popup-closeable'
    };

    /**
     * デフォルトオプション
     */
    ns.DefaultOptions = {

        /**
         * 幅
         */
        width: '100%',
        /**
         * 高さ
         */
        height: '100%',
        
        /**
         * ×ボタン押下時に閉じることが可能か否か
         */
        isCloseable: true,

        /**
         * POPUPコンテナのID (デフォルト未定義)
         */
        containerId: undefined,

        /**
         * POPUPコンテナのクラス (デフォルト未定義)
         */
        containerClass: undefined,

        /**
         * 読み込み完了イベント
         */
        onLoadComplete: function () { },
 
// 2019.02.21 add start
        /**
         * エラーイベント
         */
        onError: function () { },

        /**
         * 最終実施イベント
         */
        onFinal: function () { },
// 2019.02.21 add end
 
        /**
         * クローズイベント
         */
        onClose: function (results) { }
    };

    /**
     * クローズ時のデフォルトオプション
     */
    ns.DefaultCloseOptions = {

        /**
         * 処理結果コード
         */
        ResultCd: '1',
    };

    /**
     * POSTによるPOPUP画面の取得・表示
     */
    ns.post = function (url, args, options) {

        ns._ajax(url, args, spmAjax.post, options);
    };

    /**
     * GETによるPOPUP画面の取得・表示
     */
    ns.get = function (url, args, options) {

        ns._ajax(url, args, spmAjax.get, options);
    };

    /**
     * POPUPを閉じる処理
     */
    ns.close = function (options, container) {

        // 閉じる対象が指定されていない場合は、最前面のPOPUPを閉じる
        if (!container) {

          ns.close(options, $(ns.Selectors.POPUP_CONTAINER).last());
          return;
        }

        var containerId = $(container).attr('id');

        containerOptions[containerId].onClose(options);
        delete containerOptions[containerId];

        if ($(container).hasClass(ns.Classes.POPUP_CLOSEABLE)) {

          $(container).remove();
        }

        options = $.extend({}, ns.DefaultCloseOptions, options);

        var containers = $(ns.Selectors.POPUP_CONTAINER);

        // POPUPが1つも残っていない場合
        if (containers.length <= 0) {

            // 暗転を解除
            $(ns.Selectors.OVERLAY).hide();

            // POPUPが1つ以上残っている場合
        } else {

            // 最後のPOPUPをオーバーレイより前面に表示
            containers.last().removeClass(ns.Classes.BACKGROUND);
        }

        fireEvent('close', options, container);
    };

    /**
     * POPUPのイベントリスナーを追加します。
     * @param {string} eventName イベント名
     * @param {function} listener イベントリスナー
     * @return {boolean} リスナー追加の成否
     */
    ns.addEventListener = function (eventName, listener) {

        for (var key in listeners) {

            if (key.toLowerCase() === ('on' + eventName).toLowerCase()) {

                listeners[key].push(listener);

                return true;
            }
        }

        return false;
    };

    /**
     * POPUPの数を取得します
     * @return {number} POPUPの数
     */
    ns.getLength = function () {

      return $(ns.Selectors.POPUP_CONTAINER).length;
    };

    function fireEvent(eventName, args) {

        for (var key in listeners) {

            if (key.toLowerCase() === ('on' + eventName).toLowerCase()) {

                for (var index = 0; index < listeners[key].length; index++) {

                    listeners[key][index].apply(null, Array.prototype.slice.call(arguments, 1));
                }

                return;
            }
        }
    }

    /**
     * POPUPの生成
     */
    ns._createPopup = function (options) {

        var popup = $('<div></div>');
        popup.addClass(ns.Classes.POPUP_CONTAINER);

        if (options.isCloseable) {

          popup.addClass(ns.Classes.POPUP_CLOSEABLE);
        }

        var id = options.containerId || (ns.DefaultIdPrefix + $(ns.Selectors.POPUP_CONTAINER).length);

        popup.attr('id', id);
        containerOptions[id] = $.extend({}, options);

        if (options.containerClass) {

          popup.addClass(options.containerClass);
        }

        popup.appendTo(ns.Selectors.POPUP_CONTAINERS);

        return popup;
    };

    /**
     * ajaxによるPOPUP用データの取得、表示
     * @param {string} url POPUP画面のURL
     * @param {object} args POPUP画面に渡すパラメータ
     * @param {function} ajaxFunc ajaxアクセスする関数(GET or POST)
     * @param {object} options POPUP表示のオプション(内容の詳細はデフォルトオプションを参照)
     */
    ns._ajax = function (url, args, ajaxFunc, options) {
 
        options = $.extend({}, ns.DefaultOptions, options);
 
        $(ns.Selectors.OVERLAY).show();

// 2019.02.21 mod start
        var success = function (data, status, xhr) {

            popupEvent(data, status, xhr, options, false);

        };
        var error = function (xhr, status, data) {

            popupEvent(xhr.responseText, status, xhr, options, true);

        }

        ajaxFunc(url, args, success, error);

/*
        var success = function (data) {

            $(ns.Selectors.POPUP_CONTAINER).addClass(ns.Classes.BACKGROUND);

            var container = ns._createPopup(options);

            container.css('width', options.width);
            container.css('height', options.height);

            // 中央配置
            container.addClass(ns.Classes.CENTERING);
            // 中央配置後の位置を取得して直接設定
            container.css('left', container.offset().left);
            container.css('top', container.offset().top);
            // 中央配置用のクラスを解除(transformによってドラッグの挙動がおかしくなるため)
            container.removeClass(ns.Classes.CENTERING);

            // ドラッグ設定
            container.draggable({
                handle: ns.Selectors.HANDLE,
                containment: ns.Selectors.CONTAINMENT
            });

            // 内容の表示
            container.html(data);

            // 閉じるボタンのイベント設定
            $(ns.Selectors.POPUP_CLOSE, container).click(onClickPopupClose);

            options.onLoadComplete(container);
        };

        ajaxFunc(url, args, success);
*/
 // 2019.02.21 mod end
    };

// 2019.02.21 add start
    /**
     * POPUP画面表示時のイベント処理
     */
    function popupEvent(data, status, xhr, options, isError) {

        $(ns.Selectors.POPUP_CONTAINER).addClass(ns.Classes.BACKGROUND);

        var container = ns._createPopup(options);

        container.css('width', options.width);
        container.css('height', options.height);

        // 中央配置
        container.addClass(ns.Classes.CENTERING);
        // 中央配置後の位置を取得して直接設定
        container.css('left', container.offset().left);
        container.css('top', container.offset().top);
        // 中央配置用のクラスを解除(transformによってドラッグの挙動がおかしくなるため)
        container.removeClass(ns.Classes.CENTERING);

        // ドラッグ設定
        container.draggable({
            handle: ns.Selectors.HANDLE,
            containment: ns.Selectors.CONTAINMENT
        });

        // 内容の表示
        container.html(data);

        // 閉じるボタンのイベント設定
        $(ns.Selectors.POPUP_CLOSE, container).click(onClickPopupClose);

        if (isError) {
            options.onError(container);
        } else {
            options.onLoadComplete(container);
        }

        options.onFinal(container);
    }
// 2019.02.21 add end
 
    /**
     * 閉じるボタンクリック時のイベント処理
     */
    function onClickPopupClose(e) {

      var container = $(e.target).parents(ns.Selectors.POPUP_CONTAINER);
      ns.close({}, container);
    }

    /**
      * 開かれた際に閉じる処理をバインドする
      * @param {object} options POPUP表示のオプション(内容の詳細はデフォルトオプションを参照)
      */
    ns.bindCloseEvent = function (options) {

        options = $.extend({}, ns.DefaultOptions, options);

        $(ns.Selectors.OVERLAY).show();

        $(ns.Selectors.POPUP_CONTAINER).addClass(ns.Classes.BACKGROUND);

        var container = $('#' + ns._wrapInnerPopup(options).attr('id'));

        container.css('width', options.width);
        container.css('height', options.height);

        // 中央配置
        container.addClass(ns.Classes.CENTERING);
        // 中央配置後の位置を取得して直接設定
        container.css('left', container.offset().left);
        container.css('top', container.offset().top);
        // 中央配置用のクラスを解除(transformによってドラッグの挙動がおかしくなるため)
        container.removeClass(ns.Classes.CENTERING);

        // ドラッグ設定
        container.draggable({
            handle: ns.Selectors.HANDLE,
            containment: ns.Selectors.CONTAINMENT
        });

        // 閉じるボタンのイベント設定
        $(ns.Selectors.POPUP_CLOSE, container).click(onClickPopupClose);

        options.onLoadComplete(container);
    };

    /**
     * POPUPの生成
     */
    ns._wrapInnerPopup = function (options) {

        var popup = $('<div></div>');
        popup.addClass(ns.Classes.POPUP_CONTAINER);

        if (options.isCloseable) {

            popup.addClass(ns.Classes.POPUP_CLOSEABLE);
        }

        var id = options.containerId || (ns.DefaultIdPrefix + $(ns.Selectors.POPUP_CONTAINER).length);

        popup.attr('id', id);
        containerOptions[id] = $.extend({}, options);

        if (options.containerClass) {

            popup.addClass(options.containerClass);
        }

        $(ns.Selectors.POPUP_CONTAINERS).wrapInner(popup);

        return popup;
    };

})(window);