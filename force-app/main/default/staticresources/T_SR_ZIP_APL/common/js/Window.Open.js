
/**********************/
/*    別ウィンドウ    */
/**********************/

var spmWindow = spmWindow || function () {
};

var spmWindowModel = spmWindowModel || {
    opens: []
};

/* 別ウィンドウの設定値取得 */
spmWindow.GetParameter = function (height, width, top, left) {
    return {
        width: width,
        height: height,
        top: top,
        left: left,
        menubar: "no",                      /* メニューバー     */
        toolbar: "no",                      /* ツールバー       */
        location: "no",                     /* ロケーションバー */
        status: "no",                       /* ステータスバー   */
        resizable: "no",                    /* サイズ変更バー   */
        scrollbars: "no",                   /* スクロールバー   */
    }
}

/* 別ウィンドウ開く時の設定値を生成する */
spmWindow._createUrlParameter = function (p) {

    /* パラメータを生成する */
    return "  width=" + p.width +
           ", height=" + p.height +
           ", top=" + p.top +
           ", left=" + p.left +
           ", menubar=" + p.menubar +       /* メニューバー     */
           ", toolbar=" + p.toolbar +       /* ツールバー       */
           ", location=" + p.location +     /* ロケーションバー */
           ", status=" + p.status +         /* ステータスバー   */
           ", resizable=" + p.resizable +   /* サイズ変更バー   */
           ", scrollbars=" + p.scrollbars;  /* スクロールバー   */
};

/* 別ウィンドウで画面を開く */
spmWindow.open = function (url, name, param) {

    for (var i = 0; i < spmWindowModel.opens.length ; i++) {
        // openしているwindowのオブジェクトがあるか
        if (spmWindowModel.opens[i].name != name) {
            continue;
        }

        // 既にwindowをopenしている
        if (!(!spmWindowModel.opens[i].window || spmWindowModel.opens[i].window.closed)) {
            spmWindowModel.opens[i].window.focus();
            return;
        }

        spmWindowModel.opens.splice(i, 1);
        break;
    }

    // windowを保持する
    spmWindowModel.opens.push(spmWindow._windowObject(name, spmWindow._open(url, name, param)));

    // windowのオブジェクトを返す
    return spmWindowModel.opens[spmWindowModel.opens.length - 1];
};

spmWindow._open = function (url, name, param) {

    if (param != null) {
        /* パラメータ生成    */
        var param = spmWindow._createUrlParameter(param);
    }
    else {
        param = '';
    }

    /* ウィンドウを開く  */
    return window.open(url, name, param);
};

// 画面を開いているwindowをローカル保存用オブジェクトに変換する
spmWindow._windowObject = function (name, obj) {

    return {
        name: name,
        window: obj,
    }
};

spmWindow._searchWindow = function (name) {

    var idx = null;
    // openしているwindowのオブジェクトがあるか
    for (var i = 0; i < spmWindowModel.opens.length ; i++) {
        if (spmWindowModel.opens[i].name == name) {
            idx = i;
            break;
        }
    }
    return idx;
};

// 画面を開いているオブジェクトを取得する
spmWindow.allClose = function () {

    // 既に開いているwindowを全てクローズする
    for (var i = 0; i < spmWindowModel.opens.length ; i++) {
        if (!(!spmWindowModel.opens[i].window || spmWindowModel.opens[i].window.closed)) {
            spmWindowModel.opens[i].window.close();
        }
    }
};

// サブウィンドウを開いているか
spmWindow.IsOpenWindow = function () {

    // 既に開いている画面名を取得する
    var IsOpenName = "";
    for (var i = 0; i < spmWindowModel.opens.length ; i++) {
        if (!(!spmWindowModel.opens[i].window || spmWindowModel.opens[i].window.closed)) {
            IsOpenName = spmWindowModel.opens[i].name;
            break;
        }
    }
    return IsOpenName;
};
