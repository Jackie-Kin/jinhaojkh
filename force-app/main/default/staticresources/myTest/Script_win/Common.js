function OnLongClick(id) {
    var flug, timer, progress, num, ret;


    // ------------------------------------------------------------
    // マウスのボタンを押すと実行されるイベント
    // ------------------------------------------------------------
    function a(e) {
        var element = window.document.getElementById(id);
        element.onmousedown = function() {
            ret = 0;
            flug = false;
            clearTimeout(timer);
            timer = setTimeout(function() { //0.5秒で長押し
                flug = true;
            }, 500);
        };
    };

    // ------------------------------------------------------------
    // マウスのボタンを離すと実行されるイベント
    // ------------------------------------------------------------
    function b(e) {
        var element = window.document.getElementById(id);
        element.onmouseup = function() {

            clearTimeout(timer);
            // InternetExplorer 用
            if (flug) { //長押し
                document.getElementById("hdnLongclick").value = "true";
            } else { //短押し
                document.getElementById("hdnLongclick").value = "false";
            };
        };
    };

    a();
    b();
    if (document.getElementById("hdnLongclick").value == "true") {
        document.getElementById("hdnLongclick").value = ""
        return true;
    } else {
        document.getElementById("hdnLongclick").value = ""
        return false;
    };

};