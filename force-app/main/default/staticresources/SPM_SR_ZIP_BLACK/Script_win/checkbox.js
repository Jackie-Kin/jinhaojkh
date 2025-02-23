

/* チェックボックスの制御
----------------------------------------------------------------------------- */
// 2018/12/21 add start
var checkboxJs = {
    staticResourcePath : ""
};
// 2018/12/21 add end

$(function () {
    //チェックボックスの挙動を画面名で判定
    var scrName = document.title
    var parentScrName = $("[id$=hidScreenID]").val()
    var cd_BlockMode = $("#hidBlockMode").val()

    if (scrName == "SG90030" || scrName == "SG90031" || scrName == "SG90032" || scrName == "SG90033") {
        $(":checkbox").click(ClickCheckBox_Sort);
    }
    else if (scrName == "SG90190") {
        $(":checkbox").click(ClickCheckBox_Siborikomi);
    }
    else if (scrName == "SG90050") {
        $(":checkbox").click(ClickCheckBox_Kihon);
    }
    else if (scrName == "SG90220") {
        $(":checkbox").click(ClickCheckBox_NoukiAnnai);
    }
    else if (scrName == "SG90192" || scrName == "SG90193") {
        // 201510/10 del start
        //$(":checkbox").click(ClickCheckBox_Siborikomi_Mikomi);
        // 201510/10 del end
        // 201510/10 add start

        //2017/09/14 mod start 30010,20,30,40追加
        //if (parentScrName == "SG10020") {
        //    $(":checkbox").click(ClickCheckBox_Siborikomi);
        //} else {
        //    $(":checkbox").click(ClickCheckBox_Siborikomi_Mikomi);
        //}
        //2018/01/18 mod start 本部管理納期CS_U-Car違反切符
        //if (parentScrName == "SG10020" || parentScrName == "SG30010" || parentScrName == "SG30020" || parentScrName == "SG30030" || parentScrName == "SG30040" || ) {
        // 2018/04/16 mod start マネージャーフォローポスト対応
        // if (parentScrName == "SG10020" || parentScrName == "SG30010" || parentScrName == "SG30020" || parentScrName == "SG30030" || parentScrName == "SG30040" ||
            // parentScrName == "SG30110" || parentScrName == "SG30120") {
            if (parentScrName == "SG10020" || parentScrName == "SG30010" || parentScrName == "SG30020" || parentScrName == "SG30030" || parentScrName == "SG30040" ||
            parentScrName == "SG30110" || parentScrName == "SG30120" || parentScrName == "SG10060" || parentScrName == "SG10070") {
            // 2018/04/16 mod end マネージャーフォローポスト対応
            //2018/01/18 mod end
            $(":checkbox").click(ClickCheckBox_Siborikomi);
        } else {
            $(":checkbox").click(ClickCheckBox_Siborikomi_Mikomi);
        }
        //2017/09/14 mod start 10,20,30,40追加

        // 201510/10 add end
    }
    else if (cd_BlockMode == "1" && (scrName == "SG90010" || scrName == "SG90011")) {
        if (parentScrName == "SG20010" || parentScrName == "SG40010" || parentScrName == "SG60030" || parentScrName == "SG60040" ||
            parentScrName == "SG60110" || parentScrName == "SG60120" || parentScrName == "SG60130" || parentScrName == "SG60140" ||
            parentScrName == "SG60150" || parentScrName == "SG60160" || parentScrName == "SG60210" || parentScrName == "SG60310" ||
            parentScrName == "SG60410" || parentScrName == "SG60420") {
            $(":checkbox").click(ClickCheckBox_Zone);
        } else {
            $(":checkbox").click(ClickCheckBox);
        }
    }
    else {
        $(":checkbox").click(ClickCheckBox);
    }

});

$(function () {
    $(".Koumoku_SelectData").click(function () {

        var kengen = $(this).children("span").attr('kengen');

        //権限フラグを判別
        if (kengen == "0") {
            return
        }

        //クリック不可のフラグを判定
        if ($(this).children("span").hasClass("unabled")) {
            return
        }

        //絞り込み条件が一つしかない画面では選択不可
        //2017/09/22 mod start
        //if (document.title == "SG90190") {
        if (document.title == "SG90190" && $("[id$=hidScreenID]").val() != "SG30010" && $("[id$=hidScreenID]").val() != "SG30020") {
            return
        }
        //2017/09/22 mod end

        $(".Koumoku_SelectData").css('border-color', 'white'); //選択項目の囲いをすべて背景色と同じ色に

        $(this).css('border', '1px solid rgb(178,178,178)');   //クリックした選択項目を線で囲う

        //ラベルIDの取得
        var lblid = $(this).children("span").attr('id');

        //表示するパネルの入れ替え
        //項目表示パネルを一度すべて不可視化
        //$("#div_Koumoku").find("div").css("display", "none");
        $($("[id ^= 'PnlKoumoku']")).css("display", "none");
        
        
        //ラベルIDから"lbl_"を削除し、パネルのIDを得る
        var pnlid = lblid.replace("lbl_", "");

        //得られたパネルIDの項目を表示
        $("#" + pnlid).css("display", "block");
        
    });
});


function ClickCheckBox() {
    var flag = $(this).prop('checked'); //クリックしたチェックボックスが既にチェックされているかを判定

    //見込み客表示条時の処理
    if (document.title == "SG90160"){
        if( $(this).parent("label").parent("li").parent("ul").parent("div").attr('id') == "PnlKoumoku_Flag") {
            ClickCheckBox_Flg($(this));
            return
        } else if ($(this).parent("label").parent("li").parent("ul").parent("div").attr('id') == "PnlKoumoku_Memo") {
            ClickCheckBox_Memo($(this));
            return
        }

        if ($(this).parent("label").parent("li").parent("ul").parent("div").attr('id') == "PnlKoumoku_Yokojiku") {
            var mikomi_txt = $("#TextBox_PnlKoumoku_Mikomi").val();
            // 2015/09/26 add start STEP2ユーザーテスト課題17対応
            //if(mikomi_txt == "2"){
            //    return
            //}
            //2015/09/26 add end STEP2ユーザーテスト課題17対応
        }

    }

    $(this).parent("label").parent("li").parent("ul").find(":checkbox").prop('checked', false); //連動させるチェックボックスのチェックを一度すべて外す

    //表示条件画面または絞り込み画面のとき、既にチェックされている項目クリック時は何もしない
    if (document.title == "SG90010" || document.title == "SG90011" || document.title == "SG90191") {
        if ($(this).next(".checkboxView").hasClass('selected')) {
            $(this).prop('checked', true);
            return
        }
    }

    //（仮）絞り込み画面では納期CSのみが選択可能
    if (document.title == "SG90191"
        && $(this).parent("label").parent("li").parent("ul").parent("div").attr('id') == "PnlKoumoku_Jouken1") {
        var KoumokuId = $(this).attr('id');

        if ($(this).parent('label').find("#Koumoku" + KoumokuId).attr("result") != ""
            && $(this).parent('label').find("#Koumoku" + KoumokuId).attr("result") != "02") {
            return
        }
    }

    $(this).parent("label").parent("li").parent("ul").find(".checkboxView").removeClass('selected'); //連動させる装飾のチェックボックスをチェックしてない状態にする(selectedクラスを外す)
    $(this).parent("label").parent("li").parent("ul").find(".checkboxView").next('span').removeClass('selected');

    // 2016/09/29 mod start 活動情報画面の保有車両は、チェック状態の解除ができるようにする
    if (!flag && document.title == "SG90060") {
        return
    }
    // 2016/09/29 mod end   活動情報画面の保有車両は、チェック状態の解除ができるようにする

    //クリックしたチェックボックスがチェックされていた場合、チェック済みチェックボックス画像を表示する
        $(this).prop('checked', true);
        $(this).next(".checkboxView").addClass('selected');
        $(this).next(".checkboxView").next('span').addClass('selected');

        //チェックされた項目を表示する
        //パネルのIDを取得
        var Id = $(this).parent("label").parent("li").parent("ul").parent("div").attr('id');

        //チェックボックスのテキストを取得
        var KoumokuId = $(this).attr('id');
        var text = $(this).parent('label').find("#Koumoku" + KoumokuId).text();
        var result = $(this).parent('label').find("#Koumoku" + KoumokuId).attr("result");

        //テキストの表示(表示箇所のIDは"lbl_" + 項目パネルのIDで指定
        $("#lbl_" + Id).text(text)

        //ラベルの属性値を設定
        $("#lbl_" + Id).attr("value", text)
        $("#lbl_" + Id).attr("result", result)

        //テキストボックスに値を設定
        //$("#TextBox_" + Id).attr("value", result)
        $("#TextBox_" + Id).val(result)
        $("#TextBox_" + Id).attr("value", result)

        //表示条件画面または絞り込み画面のとき、項目変更時に連動する他項目をリセットする
        if (document.title == "SG90010" || document.title == "SG90011" || document.title == "SG90020" || document.title == "SG90021" || document.title == "SG90191") {
                var Id = $(this).parent("label").parent("li").parent("ul").parent("div").attr('id');
                ResetCheckBox(Id);
        }
    
}

function ClickCheckBox_Sort() {

    var resultArray = new Array;
    var obj = $("input[id *= 'TextBox_PnlKoumoku_Sortjoken']")
    var txtId = "TextBox_" + $(this).parent("label").parent("li").parent("ul").parent("div").attr('id');
    var KoumokuId = $(this).attr('id');
    var result = $(this).parent('label').find("#Koumoku" + KoumokuId).attr("result")

    var flag = $(this).prop('checked'); //クリックしたチェックボックスが既にチェックされているかを判定
    var blankcnt = 0;   //ソート条件なしの数

    //他の条件で既にチェックされているものをチェックできないように制御
    for (i = 0 ; i < obj.length; i++) {
        if (obj[i].id != txtId) {
            resultArray[i] = obj[i].value

            if (obj[i].value == "") {
                blankcnt += 1;
            }
        }
    }

    if ($.inArray(result, resultArray) >= 0) {
        if (flag) { $(this).prop('checked', false); }
        return
    };

    //他の条件がすべて「なし」のときには外せないように制御
    if (blankcnt == 3) {
        if ($(this).next(".checkboxView").hasClass('selected')) {
            $(this).prop('checked', true);
            return
        }
    }
    

    $(this).parent("label").parent("li").parent("ul").parent("div").find(":checkbox").prop('checked', false); //連動させるチェックボックスのチェックを一度すべて外す
    $(this).parent("label").parent("li").parent("ul").parent("div").find(".checkboxView").removeClass('selected'); //連動させる装飾のチェックボックスをチェックしてない状態にする(selectedクラスを外す)
    $(this).parent("label").parent("li").parent("ul").parent("div").find(".checkboxView").next('span').removeClass('selected');
    if (flag) { //クリックしたチェックボックスがチェックされていた場合、チェック済みチェックボックス画像を表示する
    $(this).prop('checked', true);
    $(this).next(".checkboxView").addClass('selected');
    $(this).next(".checkboxView").next('span').addClass('selected');

    //チェックされた項目を表示する
    //パネルのIDを取得
    var Id = $(this).parent("label").parent("li").parent("ul").parent("div").attr('id');

    //チェックボックスのテキストを取得
    KoumokuId = $(this).attr('id');    
    result = $(this).parent('label').find("#Koumoku" + KoumokuId).attr("result")
    var text = $(this).parent('label').find("#Koumoku" + KoumokuId).text()

    //テキストの表示(表示項目のIDは"lbl_" + 項目パネルのIDで指定)
    $("#lbl_" + Id).text(text)

    //ラベルの属性値を設定
    $("#lbl_" + Id).attr("value", text)
    $("#lbl_" + Id).attr("result", result)

    //テキストボックスに値を設定
        //$("#TextBox_" + Id).attr("value", result)
    $("#TextBox_" + Id).val(result)

    var Nihongo = Id.replace(/PnlKoumoku_Sortjoken/g, "Nihongo")

        //$("#TextBox_" + Nihongo).attr("value", text)
    $("#TextBox_" + Nihongo).val(text)
    //$("#TextBox_" + Nihongo).text(text)

    }
    else {
        //チェックされた項目がない場合は"なし"を表示
        //パネルのIDを取得
        var Id = $(this).parent("label").parent("li").parent("ul").parent("div").attr('id');

        //テキストの表示(表示項目のIDは"lbl_" + 項目パネルのIDで指定)
        $("#lbl_" + Id).text("なし")

        //テキストボックスに値を設定
        $("#TextBox_" + Id).val("")

        var Nihongo = Id.replace(/PnlKoumoku_Sortjoken/g, "Nihongo")
        $("#TextBox_" + Nihongo).val("")
    }
}

function ClickCheckBox_Siborikomi() {

    var resultArray = new Array;
    var obj = $("input[id *= 'TextBox_PnlKoumoku_Sortjoken']")
    var txtId = "TextBox_" + $(this).parent("label").parent("li").parent("ul").parent("div").attr('id');
    var KoumokuId = $(this).attr('id');
    var result = $(this).parent('label').find("#Koumoku" + KoumokuId).attr("result")

    var flag = $(this).prop('checked'); //クリックしたチェックボックスが既にチェックされているかを判定


    $(this).parent("label").parent("li").parent("ul").parent("div").find(":checkbox").prop('checked', false); //連動させるチェックボックスのチェックを一度すべて外す

    $(this).parent("label").parent("li").parent("ul").parent("div").find(".checkboxView").removeClass('selected'); //連動させる装飾のチェックボックスをチェックしてない状態にする(selectedクラスを外す)
    $(this).parent("label").parent("li").parent("ul").parent("div").find(".checkboxView").next('span').removeClass('selected');

    //クリックしたチェックボックスがチェックされていた場合、チェック済みチェックボックス画像を表示する
    $(this).prop('checked', true);
    $(this).next(".checkboxView").addClass('selected');
    $(this).next(".checkboxView").next('span').addClass('selected');

    //チェックされた項目を表示する
    //パネルのIDを取得
    var Id = $(this).parent("label").parent("li").parent("ul").parent("div").attr('id');

    //チェックボックスのテキストを取得
    var KoumokuId = $(this).attr('id');
    var text = $(this).parent('label').find("#Koumoku" + KoumokuId).text();
    var result = $(this).parent('label').find("#Koumoku" + KoumokuId).attr("result");

    //テキストの表示(表示箇所のIDは"lbl_" + 項目パネルのIDで指定
    $("#lbl_" + Id).text(text)

    //ラベルの属性値を設定
    $("#lbl_" + Id).attr("value", text)
    $("#lbl_" + Id).attr("result", result)

    //テキストボックスに値を設定
    //$("#TextBox_" + Id).attr("value", result)
    $("#TextBox_" + Id).val(result)

    //表示条件画面または絞り込み画面のとき、項目変更時に連動する他項目をリセットする
    if (document.title == "SG90010" || document.title == "SG90011" || document.title == "SG90020" || document.title == "SG90021" || document.title == "SG90191") {
        var Id = $(this).parent("label").parent("li").parent("ul").parent("div").attr('id');
        ResetCheckBox(Id);
    }
}

function ClickCheckBox_Siborikomi2(ts) {

    var resultArray = new Array;
    //「すべて」の要素を取得
    var obj = $("div[id *= 'PnlKoumoku']").children("ul").children("li").children("label").children("span[result = '']")
    var txtId = "TextBox_" + $(this).parent("label").parent("li").parent("ul").parent("div").attr('id');
    var KoumokuId = $(this).attr('id');
    var result = $(this).parent('label').find("#Koumoku" + KoumokuId).attr("result");

    var flag = $(this).prop('checked'); //クリックしたチェックボックスが既にチェックされているかを判定

    //「すべて」をクリック
    if (result == "") {
        $(this).parent("label").parent("li").parent("ul").parent("div").find(":checkbox").prop('checked', false); //連動させるチェックボックスのチェックを一度すべて外す

        $(this).parent("label").parent("li").parent("ul").parent("div").find(".checkboxView").removeClass('selected'); //連動させる装飾のチェックボックスをチェックしてない状態にする(selectedクラスを外す)
        $(this).parent("label").parent("li").parent("ul").parent("div").find(".checkboxView").next('span').removeClass('selected');

        //クリックしたチェックボックスがチェックされていた場合、チェック済みチェックボックス画像を表示する
        $(this).prop('checked', true);
        $(this).next(".checkboxView").addClass('selected');
        $(this).next(".checkboxView").next('span').addClass('selected');

        //チェックされた項目を表示する
        //パネルのIDを取得
        var Id = $(this).parent("label").parent("li").parent("ul").parent("div").attr('id');

        //チェックボックスのテキストを取得
        var KoumokuId = $(this).attr('id');
        var text = $(this).parent('label').find("#Koumoku" + KoumokuId).text();
        var result = $(this).parent('label').find("#Koumoku" + KoumokuId).attr("result");

        //テキストの表示(表示箇所のIDは"lbl_" + 項目パネルのIDで指定
        $("#lbl_" + Id).text(text)

        //ラベルの属性値を設定
        $("#lbl_" + Id).attr("value", text)
        $("#lbl_" + Id).attr("result", result)

        //テキストボックスに値を設定
        //$("#TextBox_" + Id).attr("value", result)
        $("#TextBox_" + Id).val(result)
    }
    else {
        //項目クリック時に「すべて」のチェックを外す
        obj.prevAll("input").prop('checked', false);
        obj.prevAll(".checkboxView").removeClass('selected');

        //チェックされている要素全てを取得
        var obj3 = $(this).parent("label").parent("li").parent("ul").parent("div").find("input[type='checkbox']:checked")

        if (result == '08' || result == '01' || result == '02' || result == '03') {

            var elem1 = $("div[id *= 'PnlKoumoku']").children("ul").children("li").children("label").children("span[result = '01'],[result = '02'],[result = '03'],[result = '08']")

            var elem0 = $("div[id *= 'PnlKoumoku']").children("ul").children("li").children("label").children("span[result ='" + result + "']")

            //連動するチェックを全て外す
            elem1.prevAll("input").prop('checked', false);
            elem1.prevAll(".checkboxView").removeClass('selected');

            if (flag) {
                elem0.prevAll("input").prop('checked', true);
                elem0.prevAll(".checkboxView").addClass('selected');
            }


        } else if (result == '04' || result == '05' || result == '09' || result == '06' || result == '07') {

            var elem1 = $("div[id *= 'PnlKoumoku']").children("ul").children("li").children("label").children("span[result = '04'],[result = '05'],[result = '09'],[result = '06'],[result = '07']")

            var elem0 = $("div[id *= 'PnlKoumoku']").children("ul").children("li").children("label").children("span[result ='" + result + "']")

            //連動するチェックを全て外す
            elem1.prevAll("input").prop('checked', false);
            elem1.prevAll(".checkboxView").removeClass('selected');

            if (flag) {
                elem0.prevAll("input").prop('checked', true);
                elem0.prevAll(".checkboxView").addClass('selected');
            }



            //2017/09/22 add start
        } else if (result == '04' || result == '05' || result == '09' || result == '06' || result == '07') {

            var elem1 = $("div[id *= 'PnlKoumoku']").children("ul").children("li").children("label").children("span[result = '04'],[result = '05'],[result = '09'],[result = '06'],[result = '07']")

            var elem0 = $("div[id *= 'PnlKoumoku']").children("ul").children("li").children("label").children("span[result =" + result + "]")

            //連動するチェックを全て外す
            elem1.prevAll("input").prop('checked', false);
            elem1.prevAll(".checkboxView").removeClass('selected');

            if (flag) {
                elem0.prevAll("input").prop('checked', true);
                elem0.prevAll(".checkboxView").addClass('selected');
            }
            //2017/09/22 add end

        }

        //チェック項目数が０の時には「すべて」をチェックする
        if (obj3.length == 0) {
            $(this).parent("label").parent("li").parent("ul").find(":checkbox").prop('checked', false); //連動させるチェックボックスのチェックを一度すべて外す
            $(this).parent("label").parent("li").parent("ul").find(".checkboxView").removeClass('selected'); //連動させる装飾のチェックボックスをチェックしてない状態にする(selectedクラスを外す)

            obj.prevAll("input").prop('checked', true);
            obj.prevAll(".checkboxView").addClass('selected');

            //チェックされた項目を表示する
            //パネルのIDを取得
            var Id = $(this).parent("label").parent("li").parent("ul").parent("div").attr('id');

            //テキストの表示(表示箇所のIDは"lbl_" + 項目パネルのIDで指定
            $("#lbl_" + Id).text("すべて")

            //ラベルの属性値を設定
            $("#lbl_" + Id).attr("value", "すべて")
            $("#lbl_" + Id).attr("result", "")

            //テキストボックスに値を設定
            $("#TextBox_" + Id).val("")

        } else {

            //チェックされた項目を表示する
            //パネルのIDを取得
            var Id = $(this).parent("label").parent("li").parent("ul").parent("div").attr('id');

            var text2 = "";
            var result2 = "";

            obj3.each(function (i, elem) {
                if ($(elem).prop('checked') == true) {
                    text2 = text2 + $(elem).nextAll("span[id *='Koumoku']").text() + " , ";
                    result2 = result2 + $(elem).nextAll("span[id *='Koumoku']").attr("result") + ","
                }
            });

            //末尾の","を削除
            text2 = text2.slice(0, -3)
            result2 = result2.slice(0, -1)

            //テキストの表示(表示箇所のIDは"lbl_" + 項目パネルのIDで指定
            $("#lbl_" + Id).text(text2)

            //ラベルの属性値を設定
            $("#lbl_" + Id).attr("value", text2)
            $("#lbl_" + Id).attr("result", result2)
            //テキストボックスに値を設定
            $("#TextBox_" + Id).val(result2)

        }


    }

}


function ClickCheckBox_Siborikomi_Mikomi() {

    var parentScrName = $("[id$=hidScreenID]").val()

    var panelName = $(this).parent("label").parent("li").parent("ul").parent("div").attr('id');

    //見込み客表示条時の処理
    if ($(this).parent("label").parent("li").parent("ul").parent("div").attr('id') == "PnlKoumoku_Jouken1") {
        // 2016/01/26 add start
        //ClickCheckBox_Siborikomi_Joken1($(this));

        //2017/11/08 mod start U-Car_SPM車検画面対応
        if (parentScrName == "SG40020" || parentScrName == "SG40030" || parentScrName == "SG40040" || parentScrName == "SG40050" ||
            parentScrName == "SG40060" || parentScrName == "SG40070" || parentScrName == "SG40080" || parentScrName == "SG40090" ||
            parentScrName == "SG40100" || parentScrName == "SG40110" || parentScrName == "SG40120" || parentScrName == "SG40130" ||
            parentScrName == "SG40140" || parentScrName == "SG40150" || parentScrName == "SG40160" ||
            parentScrName == "SG50020" || parentScrName == "SG50030" || parentScrName == "SG50040" ||
            parentScrName == "SG50120" || parentScrName == "SG50130" || parentScrName == "SG50140") {
            //2017/11/08 mod end
            ClickCheckBox_Siborikomi_Joken1_HS($(this));
        } else {
            ClickCheckBox_Siborikomi_Joken1($(this));
        }
        // 2016/01/26 add end
        return
    } else if ($(this).parent("label").parent("li").parent("ul").parent("div").attr('id') == "PnlKoumoku_Jouken2") {
        ClickCheckBox_Siborikomi_Joken2($(this));
        return

    } else if (parentScrName == "SG20020" && panelName == "PnlKoumoku_Jouken3" ||
               parentScrName == "SG20030" && panelName == "PnlKoumoku_Jouken4" ||
               parentScrName == "SG20040" && panelName == "PnlKoumoku_Jouken4" ||
               parentScrName == "SG20080" && panelName == "PnlKoumoku_Jouken4" ||
               parentScrName == "SG20050" && panelName == "PnlKoumoku_Jouken3" ||
               parentScrName == "SG20060" && panelName == "PnlKoumoku_Jouken4" ||
               parentScrName == "SG20070" && panelName == "PnlKoumoku_Jouken4" ||
               parentScrName == "SG20090" && panelName == "PnlKoumoku_Jouken4" ||
               parentScrName == "SG20100" && panelName == "PnlKoumoku_Jouken3" ||
               parentScrName == "SG20100" && panelName == "PnlKoumoku_Jouken4" ||
               parentScrName == "SG20110" && panelName == "PnlKoumoku_Jouken3" ||
               parentScrName == "SG20110" && panelName == "PnlKoumoku_Jouken4" ||
               parentScrName == "SG20220" && panelName == "PnlKoumoku_Jouken3" ||
               parentScrName == "SG20220" && panelName == "PnlKoumoku_Jouken4") {

        ClickCheckBox_Siborikomi_Single($(this));
        return

    } else {


       
        ClickCheckBox_Siborikomi_Joken3($(this));
        return
    }

    var flag = $(this).prop('checked'); //クリックしたチェックボックスが既にチェックされているかを判定
    var KoumokuId = $(this).attr('id');
    var result0 = $(this).parent('label').find("#Koumoku" + KoumokuId).attr("result")
    //「すべて」の要素を取得
    var obj = $("div[id *= 'PnlKoumoku_Jouken3']").children("ul").children("li").children("label").children("span[id *= 'Koumoku0']")

    if (result0 == "") {
        $(this).parent("label").parent("li").parent("ul").find(":checkbox").prop('checked', false); //連動させるチェックボックスのチェックを一度すべて外す
        $(this).parent("label").parent("li").parent("ul").find(".checkboxView").removeClass('selected'); //連動させる装飾のチェックボックスをチェックしてない状態にする(selectedクラスを外す)
    } else {
        obj.prevAll("input").prop('checked', false);
        obj.prevAll(".checkboxView").removeClass('selected');
    }

    //クリックしたチェックボックスがチェックされていた場合、チェック済みチェックボックス画像を表示する
    if (flag) {
        $(this).prop('checked', true);
        $(this).next(".checkboxView").addClass('selected');

    } else {
        $(this).prop('checked', false);
        $(this).next(".checkboxView").removeClass('selected');
    }

    //チェックされている要素全てを取得
    var check_all = $(this).parent("label").parent("li").parent("ul").find("input[type='checkbox']:checked")

    //チェックされている要素が0のときには「すべて」にチェックを入れる
    if (check_all.length == 0) {
        $(this).parent("label").parent("li").parent("ul").find(":checkbox").prop('checked', false); //連動させるチェックボックスのチェックを一度すべて外す
        $(this).parent("label").parent("li").parent("ul").find(".checkboxView").removeClass('selected'); //連動させる装飾のチェックボックスをチェックしてない状態にする(selectedクラスを外す)

        var obj = $("div[id *= 'PnlKoumoku_Jouken3']").children("ul").children("li").children("label").children("span[id *= 'Koumoku0']")

        obj.prevAll("input").prop('checked', true);
        obj.prevAll(".checkboxView").addClass('selected');
    }

    //チェックされた項目を表示する
    //パネルのIDを取得
    var Id = $(this).parent("label").parent("li").parent("ul").parent("div").attr('id');

    //チェックボックスのテキストを取得
    var KoumokuId = $(this).attr('id');
    var result = ""
    var text = ""

    check_all.each(function (i, elem) {
        if ($(elem).prop('checked') == true) {
            text = text + $(elem).nextAll("span[id *='Koumoku']").text() + " , ";
            result = result + $(elem).nextAll("span[id *='Koumoku']").attr("result") + ","
        }
    });

    //末尾の","を削除
    text = text.slice(0, -3)
    result = result.slice(0, -1)

    if (check_all.length == 0) {
        text = "すべて"
        result = ""
    }

    //テキストの表示(表示箇所のIDは"lbl_" + 項目パネルのIDで指定
    $("#lbl_" + Id).text(text)

    //ラベルの属性値を設定
    $("#lbl_" + Id).attr("value", text)
    $("#lbl_" + Id).attr("result", result)

    //テキストボックスに値を設定
    $("#TextBox_" + Id).val(result)


}

function ClickCheckBox_Siborikomi_Joken1(ts) {

    var flag = ts.prop('checked');
    var KoumokuId = ts.attr('id');
    var result = ts.parent('label').find("#Koumoku" + KoumokuId).attr("result")
    var text = ts.parent('label').find("#Koumoku" + KoumokuId).text();
    //「すべて」、「すべて(当月クローズ)の要素を取得
    var obj = $("div[id *= 'PnlKoumoku_Jouken1']").children("ul").children("li").children("label").children("span[id *= 'Koumoku0']")
    var obj2 = $("div[id *= 'PnlKoumoku_Jouken1']").children("ul").children("li").children("label").children("span[result *= '01']")


    //「すべて」をクリック
    if (result == "") {
        ts.parent("label").parent("li").parent("ul").find(":checkbox").prop('checked', false); //連動させるチェックボックスのチェックを一度すべて外す
        ts.parent("label").parent("li").parent("ul").find(".checkboxView").removeClass('selected'); //連動させる装飾のチェックボックスをチェックしてない状態にする(selectedクラスを外す)

        //チェック済みチェックボックス画像を表示する
        ts.prop('checked', true);
        ts.next(".checkboxView").addClass('selected');

        //チェックされた項目を表示する
        //パネルのIDを取得
        var Id = ts.parent("label").parent("li").parent("ul").parent("div").attr('id');

        //テキストの表示(表示箇所のIDは"lbl_" + 項目パネルのIDで指定
        $("#lbl_" + Id).text(text)

        //ラベルの属性値を設定
        $("#lbl_" + Id).attr("value", text)
        $("#lbl_" + Id).attr("result", result)

        //テキストボックスに値を設定
        $("#TextBox_" + Id).val(result)

    }
    else if (result == "01") {
        //項目クリック時に「すべて」のチェックを外す
        obj.prevAll("input").prop('checked', false);
        obj.prevAll(".checkboxView").removeClass('selected');

        //チェック項目数が０の時には「すべて」をチェックする
        var obj3 = ts.parent("label").parent("li").parent("ul").find("input[type='checkbox']:checked")

        if (obj3.length == 0) {
            ts.parent("label").parent("li").parent("ul").find(":checkbox").prop('checked', false); //連動させるチェックボックスのチェックを一度すべて外す
            ts.parent("label").parent("li").parent("ul").find(".checkboxView").removeClass('selected'); //連動させる装飾のチェックボックスをチェックしてない状態にする(selectedクラスを外す)

            obj.prevAll("input").prop('checked', true);
            obj.prevAll(".checkboxView").addClass('selected');

            //チェックされた項目を表示する
            //パネルのIDを取得
            var Id = ts.parent("label").parent("li").parent("ul").parent("div").attr('id');

            //テキストの表示(表示箇所のIDは"lbl_" + 項目パネルのIDで指定
            $("#lbl_" + Id).text("すべて")

            //ラベルの属性値を設定
            $("#lbl_" + Id).attr("value", "すべて")
            $("#lbl_" + Id).attr("result", "")

            //テキストボックスに値を設定
            $("#TextBox_" + Id).val("")
        } else {

            ts.parent("label").parent("li").parent("ul").find(":checkbox").prop('checked', false); //連動させるチェックボックスのチェックを一度すべて外す
            ts.parent("label").parent("li").parent("ul").find(".checkboxView").removeClass('selected'); //連動させる装飾のチェックボックスをチェックしてない状態にする(selectedクラスを外す)


            //チェック済みチェックボックス画像を表示する
            ts.prop('checked', true);
            ts.next(".checkboxView").addClass('selected');

            //チェックされた項目を表示する
            //パネルのIDを取得
            var Id = ts.parent("label").parent("li").parent("ul").parent("div").attr('id');

            //テキストの表示(表示箇所のIDは"lbl_" + 項目パネルのIDで指定
            $("#lbl_" + Id).text(text)

            //ラベルの属性値を設定
            $("#lbl_" + Id).attr("value", text)
            $("#lbl_" + Id).attr("result", result)

            //テキストボックスに値を設定
            $("#TextBox_" + Id).val(result)
        }

    }
    else {
        //項目クリック時に「すべて」のチェックを外す
        obj.prevAll("input").prop('checked', false);
        obj.prevAll(".checkboxView").removeClass('selected');
        obj2.prevAll("input").prop('checked', false);
        obj2.prevAll(".checkboxView").removeClass('selected');

        //チェック項目数が０の時には「すべて」をチェックする
        var obj3 = ts.parent("label").parent("li").parent("ul").find("input[type='checkbox']:checked")

        if (obj3.length == 0) {
            ts.parent("label").parent("li").parent("ul").find(":checkbox").prop('checked', false); //連動させるチェックボックスのチェックを一度すべて外す
            ts.parent("label").parent("li").parent("ul").find(".checkboxView").removeClass('selected'); //連動させる装飾のチェックボックスをチェックしてない状態にする(selectedクラスを外す)

            obj.prevAll("input").prop('checked', true);
            obj.prevAll(".checkboxView").addClass('selected');

            //チェックされた項目を表示する
            //パネルのIDを取得
            var Id = ts.parent("label").parent("li").parent("ul").parent("div").attr('id');

            //テキストの表示(表示箇所のIDは"lbl_" + 項目パネルのIDで指定
            $("#lbl_" + Id).text("すべて")

            //ラベルの属性値を設定
            $("#lbl_" + Id).attr("value", "すべて")
            $("#lbl_" + Id).attr("result", "")

            //テキストボックスに値を設定
            $("#TextBox_" + Id).val("")
        } else {

            if (flag) {
                //クリックしたチェックボックスがチェックされていた場合、チェック済みチェックボックス画像を表示する
                ts.prop('checked', true);
                ts.next(".checkboxView").addClass('selected');

            } else {
                ts.next(".checkboxView").removeClass('selected');
            }

            //チェックされた項目を表示する
            //パネルのIDを取得
            var Id = ts.parent("label").parent("li").parent("ul").parent("div").attr('id');

            var text2 = "";
            var result2 = "";

            obj3.each(function (i, elem) {
                if ($(elem).prop('checked') == true) {
                    text2 = text2 + $(elem).nextAll("span[id *='Koumoku']").text() + " , ";
                    result2 = result2 + $(elem).nextAll("span[id *='Koumoku']").attr("result") + ","
                }
            });

            //末尾の","を削除
            text2 = text2.slice(0, -3)
            result2 = result2.slice(0, -1)

            //テキストの表示(表示箇所のIDは"lbl_" + 項目パネルのIDで指定
            $("#lbl_" + Id).text(text2)

            //ラベルの属性値を設定
            $("#lbl_" + Id).attr("value", text2)
            $("#lbl_" + Id).attr("result", result2)
            //テキストボックスに値を設定
            $("#TextBox_" + Id).val(result2)

        }
    }

}

function ClickCheckBox_Siborikomi_Joken2(ts) {

    var flag = ts.prop('checked');
    var KoumokuId = ts.attr('id');
    var result = ts.parent('label').find("#Koumoku" + KoumokuId).attr("result")
    var text = ts.parent('label').find("#Koumoku" + KoumokuId).text();
    //「すべて」の要素を取得
    var obj = $("div[id *= 'PnlKoumoku_Jouken2']").children("ul").children("li").children("label").children("span[id *= 'Koumoku0']")


    //「すべて」をクリック
    if (result == "") {
        ts.parent("label").parent("li").parent("ul").find(":checkbox").prop('checked', false); //連動させるチェックボックスのチェックを一度すべて外す
        ts.parent("label").parent("li").parent("ul").find(".checkboxView").removeClass('selected'); //連動させる装飾のチェックボックスをチェックしてない状態にする(selectedクラスを外す)

        //チェック済みチェックボックス画像を表示する
        ts.prop('checked', true);
        ts.next(".checkboxView").addClass('selected');

        //チェックされた項目を表示する
        //パネルのIDを取得
        var Id = ts.parent("label").parent("li").parent("ul").parent("div").attr('id');

        //テキストの表示(表示箇所のIDは"lbl_" + 項目パネルのIDで指定
        $("#lbl_" + Id).text(text)

        //ラベルの属性値を設定
        $("#lbl_" + Id).attr("value", text)
        $("#lbl_" + Id).attr("result", result)

        //テキストボックスに値を設定
        $("#TextBox_" + Id).val(result)

    }
    else {
        //項目クリック時に「すべて」のチェックを外す
        obj.prevAll("input").prop('checked', false);
        obj.prevAll(".checkboxView").removeClass('selected');

        //チェックされている要素全てを取得
        var obj3 = ts.parent("label").parent("li").parent("ul").find("input[type='checkbox']:checked")

        //査定未実施クリック
        if (result == "11"){
            var elem1 = $("div[id *= 'PnlKoumoku_Jouken2']").children("ul").children("li").children("label").children("span[id $= 'Koumoku1']")
            var elem2 = $("div[id *= 'PnlKoumoku_Jouken2']").children("ul").children("li").children("label").children("span[id $= 'Koumoku2']")

            //査定のチェックを全て外す
            elem1.prevAll("input").prop('checked', false);
            elem1.prevAll(".checkboxView").removeClass('selected');
            elem2.prevAll("input").prop('checked', false);
            elem2.prevAll(".checkboxView").removeClass('selected');

            if(flag){
                elem1.prevAll("input").prop('checked', true);
                elem1.prevAll(".checkboxView").addClass('selected');
            }
        }
            //査定実施済クリック
        else if (result == "12"){
            var elem1 = $("div[id *= 'PnlKoumoku_Jouken2']").children("ul").children("li").children("label").children("span[id $= 'Koumoku1']")
            var elem2 = $("div[id *= 'PnlKoumoku_Jouken2']").children("ul").children("li").children("label").children("span[id $= 'Koumoku2']")

            //査定のチェックを全て外す
            elem1.prevAll("input").prop('checked', false);
            elem1.prevAll(".checkboxView").removeClass('selected');
            elem2.prevAll("input").prop('checked', false);
            elem2.prevAll(".checkboxView").removeClass('selected');

            if(flag){
                elem2.prevAll("input").prop('checked', true);
                elem2.prevAll(".checkboxView").addClass('selected');
            }
        }
            //試乗未実施クリック
        else if (result == "13"){
            var elem3 = $("div[id *= 'PnlKoumoku_Jouken2']").children("ul").children("li").children("label").children("span[id *= 'Koumoku3']")
            var elem4 = $("div[id *= 'PnlKoumoku_Jouken2']").children("ul").children("li").children("label").children("span[id *= 'Koumoku4']")

            //試乗のチェックを全て外す
            elem3.prevAll("input").prop('checked', false);
            elem3.prevAll(".checkboxView").removeClass('selected');
            elem4.prevAll("input").prop('checked', false);
            elem4.prevAll(".checkboxView").removeClass('selected');

            if(flag){
                elem3.prevAll("input").prop('checked', true);
                elem3.prevAll(".checkboxView").addClass('selected');
            }
        }
            //試乗実施済クリック
        else if (result == "14"){
            var elem3 = $("div[id *= 'PnlKoumoku_Jouken2']").children("ul").children("li").children("label").children("span[id *= 'Koumoku3']")
            var elem4 = $("div[id *= 'PnlKoumoku_Jouken2']").children("ul").children("li").children("label").children("span[id *= 'Koumoku4']")

            //試乗のチェックを全て外す
            elem3.prevAll("input").prop('checked', false);
            elem3.prevAll(".checkboxView").removeClass('selected');
            elem4.prevAll("input").prop('checked', false);
            elem4.prevAll(".checkboxView").removeClass('selected');

            if(flag){
                elem4.prevAll("input").prop('checked', true);
                elem4.prevAll(".checkboxView").addClass('selected');
            }
        }
            //見積未実施クリック
        else if (result == "15"){
            var elem5 = $("div[id *= 'PnlKoumoku_Jouken2']").children("ul").children("li").children("label").children("span[id *= 'Koumoku5']")
            var elem6 = $("div[id *= 'PnlKoumoku_Jouken2']").children("ul").children("li").children("label").children("span[id *= 'Koumoku6']")

            //見積のチェックを全て外す
            elem5.prevAll("input").prop('checked', false);
            elem5.prevAll(".checkboxView").removeClass('selected');
            elem6.prevAll("input").prop('checked', false);
            elem6.prevAll(".checkboxView").removeClass('selected');

            if(flag){
                elem5.prevAll("input").prop('checked', true);
                elem5.prevAll(".checkboxView").addClass('selected');
            }
        }
            //見積実施済クリック
        else if (result == "16") {
            var elem5 = $("div[id *= 'PnlKoumoku_Jouken2']").children("ul").children("li").children("label").children("span[id *= 'Koumoku5']")
            var elem6 = $("div[id *= 'PnlKoumoku_Jouken2']").children("ul").children("li").children("label").children("span[id *= 'Koumoku6']")

            //見積のチェックを全て外す
            elem5.prevAll("input").prop('checked', false);
            elem5.prevAll(".checkboxView").removeClass('selected');
            elem6.prevAll("input").prop('checked', false);
            elem6.prevAll(".checkboxView").removeClass('selected');

            if (flag) {
                elem6.prevAll("input").prop('checked', true);
                elem6.prevAll(".checkboxView").addClass('selected');
            }

        } else if (result == "17") {
            var elem7 = $("div[id *= 'PnlKoumoku_Jouken2']").children("ul").children("li").children("label").children("span[id *= 'Koumoku7']")
           

            elem7.prevAll("input").prop('checked', false);
            elem7.prevAll(".checkboxView").removeClass('selected');

            if (flag) {

                if (elem7 !== undefined) {

                    elem7.prevAll("input").prop('checked', true);
                    elem7.prevAll(".checkboxView").addClass('selected');
                }
                
            }
        } else if (result == "18") {
            var elem8 = $("div[id *= 'PnlKoumoku_Jouken2']").children("ul").children("li").children("label").children("span[id *= 'Koumoku8']")
           

            elem8.prevAll("input").prop('checked', false);
            elem8.prevAll(".checkboxView").removeClass('selected');

            if (flag) {

                if (elem8 !== undefined) {

                    elem8.prevAll("input").prop('checked', true);
                    elem8.prevAll(".checkboxView").addClass('selected');
                }

            }
        } else if (result == "19") {
            var elem9 = $("div[id *= 'PnlKoumoku_Jouken2']").children("ul").children("li").children("label").children("span[id *= 'Koumoku9']")


            elem9.prevAll("input").prop('checked', false);
            elem9.prevAll(".checkboxView").removeClass('selected');

            if (flag) {

                if (elem9 !== undefined) {

                    elem9.prevAll("input").prop('checked', true);
                    elem9.prevAll(".checkboxView").addClass('selected');
                }

            }

        } else if (result == "110") {
            var elem9 = $("div[id *= 'PnlKoumoku_Jouken2']").children("ul").children("li").children("label").children("span[id *= 'Koumoku10']")


            elem9.prevAll("input").prop('checked', false);
            elem9.prevAll(".checkboxView").removeClass('selected');

            if (flag) {

                if (elem9 !== undefined) {

                    elem9.prevAll("input").prop('checked', true);
                    elem9.prevAll(".checkboxView").addClass('selected');
                }

            }

        } else if (result == "111") {
            var elem9 = $("div[id *= 'PnlKoumoku_Jouken2']").children("ul").children("li").children("label").children("span[id *= 'Koumoku11']")


            elem9.prevAll("input").prop('checked', false);
            elem9.prevAll(".checkboxView").removeClass('selected');

            if (flag) {

                if (elem9 !== undefined) {

                    elem9.prevAll("input").prop('checked', true);
                    elem9.prevAll(".checkboxView").addClass('selected');
                }

            }
        } else if (result == "112") {
            var elem9 = $("div[id *= 'PnlKoumoku_Jouken2']").children("ul").children("li").children("label").children("span[id *= 'Koumoku12']")


            elem9.prevAll("input").prop('checked', false);
            elem9.prevAll(".checkboxView").removeClass('selected');

            if (flag) {

                if (elem9 !== undefined) {

                    elem9.prevAll("input").prop('checked', true);
                    elem9.prevAll(".checkboxView").addClass('selected');
                }

            }
        } else if (result == "113") {
            var elem9 = $("div[id *= 'PnlKoumoku_Jouken2']").children("ul").children("li").children("label").children("span[id *= 'Koumoku13']")


            elem9.prevAll("input").prop('checked', false);
            elem9.prevAll(".checkboxView").removeClass('selected');

            if (flag) {

                if (elem9 !== undefined) {

                    elem9.prevAll("input").prop('checked', true);
                    elem9.prevAll(".checkboxView").addClass('selected');
                }

            }
        } else if (result == "114") {
            var elem9 = $("div[id *= 'PnlKoumoku_Jouken2']").children("ul").children("li").children("label").children("span[id *= 'Koumoku14']")


            elem9.prevAll("input").prop('checked', false);
            elem9.prevAll(".checkboxView").removeClass('selected');

            if (flag) {

                if (elem9 !== undefined) {

                    elem9.prevAll("input").prop('checked', true);
                    elem9.prevAll(".checkboxView").addClass('selected');
                }

            }
        } else if (result == "115") {
            var elem9 = $("div[id *= 'PnlKoumoku_Jouken2']").children("ul").children("li").children("label").children("span[id *= 'Koumoku15']")


            elem9.prevAll("input").prop('checked', false);
            elem9.prevAll(".checkboxView").removeClass('selected');

            if (flag) {

                if (elem9 !== undefined) {

                    elem9.prevAll("input").prop('checked', true);
                    elem9.prevAll(".checkboxView").addClass('selected');
                }

            }
        } else if (result == "116") {
            var elem9 = $("div[id *= 'PnlKoumoku_Jouken2']").children("ul").children("li").children("label").children("span[id *= 'Koumoku16']")


            elem9.prevAll("input").prop('checked', false);
            elem9.prevAll(".checkboxView").removeClass('selected');

            if (flag) {

                if (elem9 !== undefined) {

                    elem9.prevAll("input").prop('checked', true);
                    elem9.prevAll(".checkboxView").addClass('selected');
                }

            }
        } else if (result == "117") {
            var elem9 = $("div[id *= 'PnlKoumoku_Jouken2']").children("ul").children("li").children("label").children("span[id *= 'Koumoku17']")


            elem9.prevAll("input").prop('checked', false);
            elem9.prevAll(".checkboxView").removeClass('selected');

            if (flag) {

                if (elem9 !== undefined) {

                    elem9.prevAll("input").prop('checked', true);
                    elem9.prevAll(".checkboxView").addClass('selected');
                }

            }
        }

        //チェック項目数が０の時には「すべて」をチェックする
        if (obj3.length == 0) {
            ts.parent("label").parent("li").parent("ul").find(":checkbox").prop('checked', false); //連動させるチェックボックスのチェックを一度すべて外す
            ts.parent("label").parent("li").parent("ul").find(".checkboxView").removeClass('selected'); //連動させる装飾のチェックボックスをチェックしてない状態にする(selectedクラスを外す)

            obj.prevAll("input").prop('checked', true);
            obj.prevAll(".checkboxView").addClass('selected');

            //チェックされた項目を表示する
            //パネルのIDを取得
            var Id = ts.parent("label").parent("li").parent("ul").parent("div").attr('id');

            //テキストの表示(表示箇所のIDは"lbl_" + 項目パネルのIDで指定
            $("#lbl_" + Id).text("すべて")

            //ラベルの属性値を設定
            $("#lbl_" + Id).attr("value", "すべて")
            $("#lbl_" + Id).attr("result", "")

            //テキストボックスに値を設定
            $("#TextBox_" + Id).val("")
        } else {

            //チェックされた項目を表示する
            //パネルのIDを取得
            var Id = ts.parent("label").parent("li").parent("ul").parent("div").attr('id');

            var text2 = "";
            var result2 = "";

            obj3.each(function (i, elem) {
                if ($(elem).prop('checked') == true) {
                    text2 = text2 + $(elem).nextAll("span[id *='Koumoku']").text() + " , ";
                    result2 = result2 + $(elem).nextAll("span[id *='Koumoku']").attr("result") + ","
                }
            });

            //末尾の","を削除
            text2 = text2.slice(0, -3)
            result2 = result2.slice(0, -1)

            //テキストの表示(表示箇所のIDは"lbl_" + 項目パネルのIDで指定
            $("#lbl_" + Id).text(text2)

            //ラベルの属性値を設定
            $("#lbl_" + Id).attr("value", text2)
            $("#lbl_" + Id).attr("result", result2)
            //テキストボックスに値を設定
            $("#TextBox_" + Id).val(result2)

        }
        
    }

}

function ClickCheckBox_Siborikomi_Joken3(ts) {

    var flag = ts.prop('checked');
    var KoumokuId = ts.attr('id');
    var result = ts.parent('label').find("#Koumoku" + KoumokuId).attr("result")
    var text = ts.parent('label').find("#Koumoku" + KoumokuId).text();


    //「すべて」、「すべて(当月クローズ)の要素を取得

    var myId = ts.parent("label").parent("li").parent("ul").parent("div").attr('id');

    var obj = $("div[id *= '" + myId + "']").children("ul").children("li").children("label").children("span[id *= 'Koumoku0']")
    //var obj2 = $("div[id *= 'PnlKoumoku_Jouken1']").children("ul").children("li").children("label").children("span[result *= '01']")


    //「すべて」をクリック
    if (result == "") {
        ts.parent("label").parent("li").parent("ul").find(":checkbox").prop('checked', false); //連動させるチェックボックスのチェックを一度すべて外す
        ts.parent("label").parent("li").parent("ul").find(".checkboxView").removeClass('selected'); //連動させる装飾のチェックボックスをチェックしてない状態にする(selectedクラスを外す)

        //チェック済みチェックボックス画像を表示する
        ts.prop('checked', true);
        ts.next(".checkboxView").addClass('selected');

        //チェックされた項目を表示する
        //パネルのIDを取得
        var Id = ts.parent("label").parent("li").parent("ul").parent("div").attr('id');

        //テキストの表示(表示箇所のIDは"lbl_" + 項目パネルのIDで指定
        $("#lbl_" + Id).text(text)

        //ラベルの属性値を設定
        $("#lbl_" + Id).attr("value", text)
        $("#lbl_" + Id).attr("result", result)

        //テキストボックスに値を設定
        $("#TextBox_" + Id).val(result)

    } else {
        //項目クリック時に「すべて」のチェックを外す
        obj.prevAll("input").prop('checked', false);
        obj.prevAll(".checkboxView").removeClass('selected');
        //obj2.prevAll("input").prop('checked', false);
        //obj2.prevAll(".checkboxView").removeClass('selected');

        //チェック項目数が０の時には「すべて」をチェックする
        var obj3 = ts.parent("label").parent("li").parent("ul").find("input[type='checkbox']:checked")

        if (obj3.length == 0) {
            ts.parent("label").parent("li").parent("ul").find(":checkbox").prop('checked', false); //連動させるチェックボックスのチェックを一度すべて外す
            ts.parent("label").parent("li").parent("ul").find(".checkboxView").removeClass('selected'); //連動させる装飾のチェックボックスをチェックしてない状態にする(selectedクラスを外す)

            obj.prevAll("input").prop('checked', true);
            obj.prevAll(".checkboxView").addClass('selected');

            //チェックされた項目を表示する
            //パネルのIDを取得
            var Id = ts.parent("label").parent("li").parent("ul").parent("div").attr('id');

            //テキストの表示(表示箇所のIDは"lbl_" + 項目パネルのIDで指定
            $("#lbl_" + Id).text("すべて")

            //ラベルの属性値を設定
            $("#lbl_" + Id).attr("value", "すべて")
            $("#lbl_" + Id).attr("result", "")

            //テキストボックスに値を設定
            $("#TextBox_" + Id).val("")

        //} else if (result.substring(0, 1) == '4') {

        //    //項目クリック時に「すべて」のチェックを外す
        //    obj.prevAll("input").prop('checked', false);
        //    obj.prevAll(".checkboxView").removeClass('selected');

        //    var objId = result.substring(1, 2);

        //    var pnlName = ts.parents("div")[0].id;

        //    $("div[id *= '" + pnlName + "']").find("input").prop('checked', false);
        //    $("div[id *= '" + pnlName + "']").find(".checkboxView").removeClass('selected');
           
        //    var elem = $("div[id *= '" + pnlName + "']").children("ul").children("li").children("label").children("span[id *= 'Koumoku" + objId + "']")


        //    if (flag) {

        //        if (elem !== undefined) {

        //            elem.prevAll("input").prop('checked', true);
        //            elem.prevAll(".checkboxView").addClass('selected');
        //        }
        //    }

        //    //チェックされた項目を表示する
        //    //パネルのIDを取得
        //    var Id = ts.parent("label").parent("li").parent("ul").parent("div").attr('id');

        //    var text2 = "";
        //    var result2 = "";

        //    obj3.each(function (i, elem) {
        //        if ($(elem).prop('checked') == true) {
        //            text2 = text2 + $(elem).nextAll("span[id *='Koumoku']").text() + " , ";
        //            result2 = result2 + $(elem).nextAll("span[id *='Koumoku']").attr("result") + ","
        //        }
        //    });

        //    //末尾の","を削除
        //    text2 = text2.slice(0, -3)
        //    result2 = result2.slice(0, -1)

        //    //テキストの表示(表示箇所のIDは"lbl_" + 項目パネルのIDで指定
        //    $("#lbl_" + Id).text(text2)

        //    //ラベルの属性値を設定
        //    $("#lbl_" + Id).attr("value", text2)
        //    $("#lbl_" + Id).attr("result", result2)
        //    //テキストボックスに値を設定
        //    $("#TextBox_" + Id).val(result2)


        } else {

            if (flag) {
                //クリックしたチェックボックスがチェックされていた場合、チェック済みチェックボックス画像を表示する
                ts.prop('checked', true);
                ts.next(".checkboxView").addClass('selected');

            } else {
                ts.next(".checkboxView").removeClass('selected');
            }

            //チェックされた項目を表示する
            //パネルのIDを取得
            var Id = ts.parent("label").parent("li").parent("ul").parent("div").attr('id');

            var text2 = "";
            var result2 = "";

            obj3.each(function (i, elem) {
                if ($(elem).prop('checked') == true) {
                    text2 = text2 + $(elem).nextAll("span[id *='Koumoku']").text() + " , ";
                    result2 = result2 + $(elem).nextAll("span[id *='Koumoku']").attr("result") + ","
                }
            });

            //末尾の","を削除
            text2 = text2.slice(0, -3)
            result2 = result2.slice(0, -1)

            //テキストの表示(表示箇所のIDは"lbl_" + 項目パネルのIDで指定
            $("#lbl_" + Id).text(text2)

            //ラベルの属性値を設定
            $("#lbl_" + Id).attr("value", text2)
            $("#lbl_" + Id).attr("result", result2)
            //テキストボックスに値を設定
            $("#TextBox_" + Id).val(result2)

        }
    }

}

function ClickCheckBox_Siborikomi_Joken4(ts) {

    var flag = ts.prop('checked');
    var KoumokuId = ts.attr('id');
    var result = ts.parent('label').find("#Koumoku" + KoumokuId).attr("result")
    var text = ts.parent('label').find("#Koumoku" + KoumokuId).text();
    //「すべて」、「すべて(当月クローズ)の要素を取得

    var myId = ts.parent("label").parent("li").parent("ul").parent("div").attr('id');

    var obj = $("div[id *= '" + myId + "']").children("ul").children("li").children("label").children("span[id *= 'Koumoku0']")
    //var obj2 = $("div[id *= 'PnlKoumoku_Jouken1']").children("ul").children("li").children("label").children("span[result *= '01']")


    //「すべて」をクリック
    if (result == "") {
        ts.parent("label").parent("li").parent("ul").find(":checkbox").prop('checked', false); //連動させるチェックボックスのチェックを一度すべて外す
        ts.parent("label").parent("li").parent("ul").find(".checkboxView").removeClass('selected'); //連動させる装飾のチェックボックスをチェックしてない状態にする(selectedクラスを外す)

        //チェック済みチェックボックス画像を表示する
        ts.prop('checked', true);
        ts.next(".checkboxView").addClass('selected');

        //チェックされた項目を表示する
        //パネルのIDを取得
        var Id = ts.parent("label").parent("li").parent("ul").parent("div").attr('id');

        //テキストの表示(表示箇所のIDは"lbl_" + 項目パネルのIDで指定
        $("#lbl_" + Id).text(text)

        //ラベルの属性値を設定
        $("#lbl_" + Id).attr("value", text)
        $("#lbl_" + Id).attr("result", result)

        //テキストボックスに値を設定
        $("#TextBox_" + Id).val(result)
 
    } else {
        //項目クリック時に「すべて」のチェックを外す
        obj.prevAll("input").prop('checked', false);
        obj.prevAll(".checkboxView").removeClass('selected');
       
        //チェック項目数が０の時には「すべて」をチェックする
        var obj3 = ts.parent("label").parent("li").parent("ul").find("input[type='checkbox']:checked")

        if (obj3.length == 0) {
            ts.parent("label").parent("li").parent("ul").find(":checkbox").prop('checked', false); //連動させるチェックボックスのチェックを一度すべて外す
            ts.parent("label").parent("li").parent("ul").find(".checkboxView").removeClass('selected'); //連動させる装飾のチェックボックスをチェックしてない状態にする(selectedクラスを外す)

            obj.prevAll("input").prop('checked', true);
            obj.prevAll(".checkboxView").addClass('selected');

            //チェックされた項目を表示する
            //パネルのIDを取得
            var Id = ts.parent("label").parent("li").parent("ul").parent("div").attr('id');

            //テキストの表示(表示箇所のIDは"lbl_" + 項目パネルのIDで指定
            $("#lbl_" + Id).text("すべて")

            //ラベルの属性値を設定
            $("#lbl_" + Id).attr("value", "すべて")
            $("#lbl_" + Id).attr("result", "")

            //テキストボックスに値を設定
            $("#TextBox_" + Id).val("")
        } else {

            ts.parent("label").parent("li").parent("ul").find(":checkbox").prop('checked', false); //連動させるチェックボックスのチェックを一度すべて外す
            ts.parent("label").parent("li").parent("ul").find(".checkboxView").removeClass('selected'); //連動させる装飾のチェックボックスをチェックしてない状態にする(selectedクラスを外す)

            if (flag) {
                //クリックしたチェックボックスがチェックされていた場合、チェック済みチェックボックス画像を表示する
                ts.prop('checked', true);
                ts.next(".checkboxView").addClass('selected');

            } else {
                ts.next(".checkboxView").removeClass('selected');
            }

            //チェックされた項目を表示する
            //パネルのIDを取得
            var Id = ts.parent("label").parent("li").parent("ul").parent("div").attr('id');

            var text2 = "";
            var result2 = "";

            obj3.each(function (i, elem) {
                if ($(elem).prop('checked') == true) {
                    text2 = text2 + $(elem).nextAll("span[id *='Koumoku']").text() + " , ";
                    result2 = result2 + $(elem).nextAll("span[id *='Koumoku']").attr("result") + ","
                }
            });

            //末尾の","を削除
            text2 = text2.slice(0, -3)
            result2 = result2.slice(0, -1)

            //テキストの表示(表示箇所のIDは"lbl_" + 項目パネルのIDで指定
            $("#lbl_" + Id).text(text2)

            //ラベルの属性値を設定
            $("#lbl_" + Id).attr("value", text2)
            $("#lbl_" + Id).attr("result", result2)
            //テキストボックスに値を設定
            $("#TextBox_" + Id).val(result2)

        }
    }

}

// 2016/01/26 add start
function ClickCheckBox_Siborikomi_Joken1_HS(ts) {

    var flag = ts.prop('checked');
    var KoumokuId = ts.attr('id');
    var result = ts.parent('label').find("#Koumoku" + KoumokuId).attr("result")
    var text = ts.parent('label').find("#Koumoku" + KoumokuId).text();

    var myId = ts.parent("label").parent("li").parent("ul").parent("div").attr('id');

    var obj = $("div[id *= '" + myId + "']").children("ul").children("li").children("label").children("span[id *= 'Koumoku0']")


    //「すべて」をクリック
    if (result == "") {
        ts.parent("label").parent("li").parent("ul").find(":checkbox").prop('checked', false); //連動させるチェックボックスのチェックを一度すべて外す
        ts.parent("label").parent("li").parent("ul").find(".checkboxView").removeClass('selected'); //連動させる装飾のチェックボックスをチェックしてない状態にする(selectedクラスを外す)

        //チェック済みチェックボックス画像を表示する
        ts.prop('checked', true);
        ts.next(".checkboxView").addClass('selected');

        //チェックされた項目を表示する
        //パネルのIDを取得
        var Id = ts.parent("label").parent("li").parent("ul").parent("div").attr('id');

        //テキストの表示(表示箇所のIDは"lbl_" + 項目パネルのIDで指定
        $("#lbl_" + Id).text(text)

        //ラベルの属性値を設定
        $("#lbl_" + Id).attr("value", text)
        $("#lbl_" + Id).attr("result", result)

        //テキストボックスに値を設定
        $("#TextBox_" + Id).val(result)

    } else {
        //項目クリック時に「すべて」のチェックを外す
        obj.prevAll("input").prop('checked', false);
        obj.prevAll(".checkboxView").removeClass('selected');

        //チェック項目数が０の時には「すべて」をチェックする
        var obj3 = ts.parent("label").parent("li").parent("ul").find("input[type='checkbox']:checked")

        if (obj3.length == 0) {
            ts.parent("label").parent("li").parent("ul").find(":checkbox").prop('checked', false); //連動させるチェックボックスのチェックを一度すべて外す
            ts.parent("label").parent("li").parent("ul").find(".checkboxView").removeClass('selected'); //連動させる装飾のチェックボックスをチェックしてない状態にする(selectedクラスを外す)

            obj.prevAll("input").prop('checked', true);
            obj.prevAll(".checkboxView").addClass('selected');

            //チェックされた項目を表示する
            //パネルのIDを取得
            var Id = ts.parent("label").parent("li").parent("ul").parent("div").attr('id');

            //テキストの表示(表示箇所のIDは"lbl_" + 項目パネルのIDで指定
            $("#lbl_" + Id).text("すべて")

            //ラベルの属性値を設定
            $("#lbl_" + Id).attr("value", "すべて")
            $("#lbl_" + Id).attr("result", "")

            //テキストボックスに値を設定
            $("#TextBox_" + Id).val("")

        } else {

            if (flag) {
                //クリックしたチェックボックスがチェックされていた場合、チェック済みチェックボックス画像を表示する
                ts.prop('checked', true);
                ts.next(".checkboxView").addClass('selected');

            } else {
                ts.next(".checkboxView").removeClass('selected');
            }

            //チェックされた項目を表示する
            //パネルのIDを取得
            var Id = ts.parent("label").parent("li").parent("ul").parent("div").attr('id');

            var text2 = "";
            var result2 = "";

            obj3.each(function (i, elem) {
                if ($(elem).prop('checked') == true) {
                    text2 = text2 + $(elem).nextAll("span[id *='Koumoku']").text() + " , ";
                    result2 = result2 + $(elem).nextAll("span[id *='Koumoku']").attr("result") + ","
                }
            });

            //末尾の","を削除
            text2 = text2.slice(0, -3)
            result2 = result2.slice(0, -1)

            //テキストの表示(表示箇所のIDは"lbl_" + 項目パネルのIDで指定
            $("#lbl_" + Id).text(text2)

            //ラベルの属性値を設定
            $("#lbl_" + Id).attr("value", text2)
            $("#lbl_" + Id).attr("result", result2)
            //テキストボックスに値を設定
            $("#TextBox_" + Id).val(result2)

        }
    }

}
// 2016/01/26 add end

function ClickCheckBox_Kihon() {
    var flag = $(this).prop('checked'); //クリックしたチェックボックスが既にチェックされているかを判定

    $(this).parent("label").parent("li").parent("ul").find(":checkbox").prop('checked', false); //連動させるチェックボックスのチェックを一度すべて外す
    $(this).parent("label").parent("li").parent("ul").find(".checkboxView").removeClass('selected'); //連動させる装飾のチェックボックスをチェックしてない状態にする(selectedというクラスを外す)
    $(this).parent("label").parent("li").parent("ul").find(".hoyuuSyaryo").removeClass('selected');
    //クリックしたチェックボックスがチェックされていた場合、チェック済みチェックボックス画像を表示する
    $(this).prop('checked', true);
    $(this).next(".checkboxView").addClass('selected');
    $(this).nextAll(".hoyuuSyaryo").addClass('selected');

    //チェックされた項目を表示する
    //パネルのIDを取得
    var Id = $(this).parent("label").parent("li").parent("ul").parent("div").attr('id');

    //チェックボックスのテキストを取得
    var KoumokuId = $(this).attr('id');
    var result = $(this).parent('label').find("#Koumoku" + KoumokuId).attr("result")

    //テキストボックスに値を設定
    $("#TextBox_" + Id).val(result)

    //ボタンのクリックイベントを呼びだす
    //document.getElementById('btnSyaryo').click();
}

function ClickCheckBox_NoukiAnnai() {

    //2016/03/02 add start TDIS連携時はチェックボックスを押せなくする
    var status_tdis = getParam("fromTdis")

    if (status_tdis == "1") {

        return;

    }
    //2016/03/02 add end

    var flag = $(this).prop('checked'); //クリックしたチェックボックスが既にチェックされているかを判定

    //$(this).parent("label").parent("td").parent("tr").parent("tbody").find(":checkbox").prop('checked', false); //連動させるチェックボックスのチェックを一度すべて外す
    //$(this).parent("label").parent("td").parent("tr").parent("tbody").find(".checkboxView").removeClass('selected'); //連動させる装飾のチェックボックスをチェックしてない状態にする(selectedというクラスを外す)

    //クリックしたチェックボックスがチェックされていた場合、チェック済みチェックボックス画像を表示する
    if (flag) {
        $(this).prop('checked', true);
        $(this).next(".checkboxView").addClass('selected');

        //チェックされた項目を表示する
        //パネルのIDを取得
        var Id = $(this).parent("label").parent("li").parent("ul").parent("div").attr('id');

        //チェックボックスのテキストを取得
        var KoumokuId = $(this).attr('id');
        var result = $(this).parent('label').find("#Koumoku" + KoumokuId).attr("result")

        //テキストボックスに値を設定
        $("#TextBox_" + Id).val(result)

    } else {
        $(this).prop('checked', false);
        $(this).next(".checkboxView").removeClass('selected');
    }

    var check = $(this).parent("label").parent("td").parent("tr").parent("tbody").find(":checkbox")
    var annai
    var sumi
    var houhou
    // 2015/10/09 add start 課題69対応
    var henkokahi
    // 2015/10/09 add end 課題69対応
    var cnt = 0
    var annaiCD = ""
    var sumiFlg = ""
    var annaiHouhou = ""
    // 2015/10/09 add start 課題69対応
    var jidoHenkokahi = ""
    // 2015/10/09 add end 課題69対応

    check.each(function (i,elem) {
        if ($(elem).prop('checked') == true) {
            cnt = cnt + 1
            annai = $(elem).parent("label").parent("td").parent("tr").find("[id*='hidAnnai']");
            sumi = $(elem).parent("label").parent("td").parent("tr").find("[id*='hidStatus']");
            houhou = $(elem).parent("label").parent("td").parent("tr").find("[id*='hidHouhou']");
            // 2015/10/09 add start 課題69対応
            henkokahi = $(elem).parent("label").parent("td").parent("tr").find("[id*='hidHenkoKahi']");
            // 2015/10/09 add end 課題69対応
            if (annai.length > 0) {
                annaiCD = annaiCD + annai.eq(0).attr('value') + ",";
            }
            if (sumi.length > 0) {
                sumiFlg = sumiFlg + sumi.eq(0).attr('value') + ",";
            }
            if (houhou.length > 0) {
                annaiHouhou = annaiHouhou + houhou.eq(0).attr('value') + ",";
            }
            // 2015/10/09 add start 課題69対応
            if (henkokahi.length > 0) {
                jidoHenkokahi = jidoHenkokahi + henkokahi.eq(0).attr('value') + ",";
            }
            // 2015/10/09 add end 課題69対応
        }
    });

    annaiCD = annaiCD.slice(0, -1)
    sumiFlg = sumiFlg.slice(0, -1)
    annaiHouhou = annaiHouhou.slice(0, -1)
    // 2015/10/09 add start 課題69対応
    jidoHenkokahi = jidoHenkokahi.slice(0, -1)
    // 2015/10/09 add end 課題69対応

    $('#txtBoxCnt').val(cnt)
    $('#txtBoxAnnaiKB').val(annaiCD)
    $('#txtBoxSumiKB').val(sumiFlg)
    $('#txtBoxHouhou').val(annaiHouhou)
    // 2015/10/09 add start 課題69対応
    $('#txtBoxHenkoKahi').val(jidoHenkokahi)
    // 2015/10/09 add end 課題69対応

    // 2015/10/13 add start
    setEnableButton();
    // 2015/10/13 add end
}

function ClickCheckBox_Flg(ts) {

    var flag = ts.prop('checked');
    var KoumokuId = ts.attr('id');
    var result = ts.parent('label').find("#Koumoku" + KoumokuId).attr("result")
    var text = ts.parent('label').find("#Koumoku" + KoumokuId).text();
    var obj = $("div[id *= 'PnlKoumoku_Flag']").children("ul").children("li").children("label").children("span[id *= 'Koumoku0']")
    var imgNonePath = checkboxJs.staticResourcePath + "/IMG/none.png"; // 2018/12/21 add 画像の静的リソース対応

    //表示の初期化
    $("#lbl_PnlKoumoku_Flag").text("")
    $("#lbl_PnlKoumoku_Flag1").text("")
    $("#lbl_PnlKoumoku_Flag2").text("")
    // 2015/11/26 add start
    $("#lbl_PnlKoumoku_Flag3").text("")
    // 2015/11/26 add end
    //2018/01/30 add start
    $("#lbl_PnlKoumoku_Flag4").text("")
    //2018/01/30 add end

    // 2018/12/21 mod start 画像の静的リソース対応
    $("#img_PnlKoumoku_Flag0").attr("src", imgNonePath)
    $("#img_PnlKoumoku_Flag1").attr("src", imgNonePath)
    $("#img_PnlKoumoku_Flag2").attr("src", imgNonePath)
    // 2015/11/26 add start
    $("#img_PnlKoumoku_Flag3").attr("src", imgNonePath)
    // 2015/11/26 add end
    //2018/01/30 add start
    $("#img_PnlKoumoku_Flag4").attr("src", imgNonePath)
    //2018/01/30 add end
    //2018/12/21 mod end

    $("#TextBox_PnlKoumoku_Flag").val("")
    $("#TextBox_PnlKoumoku_Flag1").val("")
    $("#TextBox_PnlKoumoku_Flag2").val("")
    // 2015/11/26 add start
    $("#TextBox_PnlKoumoku_Flag3").val("")
    // 2015/11/26 add end
    //2018/01/30 add start
    $("#TextBox_PnlKoumoku_Flag4").val("")
    //2018/01/30 add end



    //「なし」をクリック
    if (result == "") {
        ts.parent("label").parent("li").parent("ul").find(":checkbox").prop('checked', false); //連動させるチェックボックスのチェックを一度すべて外す
        ts.parent("label").parent("li").parent("ul").find(".checkboxView").removeClass('selected'); //連動させる装飾のチェックボックスをチェックしてない状態にする(selectedクラスを外す)

        //チェック済みチェックボックス画像を表示する
        ts.prop('checked', true);
        ts.next(".checkboxView").addClass('selected');

        //チェックされた項目を表示する
        //パネルのIDを取得
        var Id = ts.parent("label").parent("li").parent("ul").parent("div").attr('id');

        //テキストの表示(表示箇所のIDは"lbl_" + 項目パネルのIDで指定
        $("#lbl_" + Id).text(text)

        //ラベルの属性値を設定
        $("#lbl_" + Id).attr("value", text)
        $("#lbl_" + Id).attr("result", result)

        //テキストボックスに値を設定
        $("#TextBox_" + Id).val(result)

    } else {
        //項目クリック時に「なし」のチェックを外す
        obj.prevAll("input").prop('checked', false);
        obj.prevAll(".checkboxView").removeClass('selected');

        //チェック項目数が０の時には「なし」をチェックする
        var obj2 = ts.parent("label").parent("li").parent("ul").find("input[type='checkbox']:checked")

        if (obj2.length == 0) {
            obj.prevAll("input").prop('checked', true);
            obj.prevAll(".checkboxView").addClass('selected');

            //チェックされた項目を表示する
            //パネルのIDを取得
            var Id = ts.parent("label").parent("li").parent("ul").parent("div").attr('id');

            //テキストの表示(表示箇所のIDは"lbl_" + 項目パネルのIDで指定
            $("#lbl_" + Id).text("なし")

            //ラベルの属性値を設定
            $("#lbl_" + Id).attr("value", "なし")
            $("#lbl_" + Id).attr("result", "")

            //テキストボックスに値を設定
            $("#TextBox_" + Id).val("")
        }

        if (flag) {
            //クリックしたチェックボックスがチェックされていた場合、チェック済みチェックボックス画像を表示する
            ts.prop('checked', true);
            ts.next(".checkboxView").addClass('selected');

            //チェックされた項目を表示する
            //パネルのIDを取得
            var Id = ts.parent("label").parent("li").parent("ul").parent("div").attr('id');

            //テキストボックスに値を設定
            $("#TextBox_" + Id).val(result)
        } else {
            ts.next(".checkboxView").removeClass('selected');
        }

        //チェックされた項目を表示する
        //パネルのIDを取得
        var Id = ts.parent("label").parent("li").parent("ul").parent("div").attr('id');

        var text2 = "";
        var result2 = "";

        //チェックされている項目の文字列を取得
        for (i = 0 ; i < obj2.length; i++) {
            text2 = obj2.eq(i).nextAll("span[id *='Koumoku']").text();
            result2 = obj2.eq(i).nextAll("span[id *='Koumoku']").attr("result")
            var img = ""
            img = obj2.eq(i).nextAll("img").attr("src")

            if (img == '') {

                img = '"' + imgNonePath + '"';
            }

            $("#img_" + Id + i).attr("src", img);

            if (i == 0) {
                $("#lbl_" + Id).text(text2)
                //ラベルの属性値を設定
                $("#lbl_" + Id).attr("value", text2)
                $("#lbl_" + Id).attr("result", result2)
                //テキストボックスに値を設定
                $("#TextBox_" + Id).val(result2)
            } else {
                $("#lbl_" + Id + i).text(text2)
                //ラベルの属性値を設定
                $("#lbl_" + Id + i).attr("value", text2)
                $("#lbl_" + Id + i).attr("result", result2)
                //テキストボックスに値を設定
                $("#TextBox_" + Id + i).val(result2)
            }
        }        

        

    }

}

function ClickCheckBox_Memo(ts) {

    var flag = ts.prop('checked');
    var KoumokuId = ts.attr('id');
    var result = ts.parent('label').find("#Koumoku" + KoumokuId).attr("result")
    var text = ts.parent('label').find("#Koumoku" + KoumokuId).text();
    var obj = $("div[id *= 'PnlKoumoku_Memo']").children("ul").children("li").children("label").children("span[id *= 'Koumoku0']")

    //表示の初期化
    $("#lbl_PnlKoumoku_Memo").text("")
    $("#lbl_PnlKoumoku_Memo1").text("")
    $("#lbl_PnlKoumoku_Memo2").text("")
    $("#lbl_PnlKoumoku_Memo3").text("")
    $("#lbl_PnlKoumoku_Memo4").text("")
    $("#lbl_PnlKoumoku_Memo5").text("")


    $("#TextBox_PnlKoumoku_Memo").val("")
    $("#TextBox_PnlKoumoku_Memo1").val("")
    $("#TextBox_PnlKoumoku_Memo2").val("")
    $("#TextBox_PnlKoumoku_Memo3").val("")
    $("#TextBox_PnlKoumoku_Memo4").val("")
    $("#TextBox_PnlKoumoku_Memo5").val("")



    //「なし」をクリック
    if (result == "") {
        ts.parent("label").parent("li").parent("ul").find(":checkbox").prop('checked', false); //連動させるチェックボックスのチェックを一度すべて外す
        ts.parent("label").parent("li").parent("ul").find(".checkboxView").removeClass('selected'); //連動させる装飾のチェックボックスをチェックしてない状態にする(selectedクラスを外す)

        //チェック済みチェックボックス画像を表示する
        ts.prop('checked', true);
        ts.next(".checkboxView").addClass('selected');

        //チェックされた項目を表示する
        //パネルのIDを取得
        var Id = ts.parent("label").parent("li").parent("ul").parent("div").attr('id');

        //テキストの表示(表示箇所のIDは"lbl_" + 項目パネルのIDで指定
        $("#lbl_" + Id).text(text)

        //ラベルの属性値を設定
        $("#lbl_" + Id).attr("value", text)
        $("#lbl_" + Id).attr("result", result)

        //テキストボックスに値を設定
        $("#TextBox_" + Id).val(result)

    } else {
        //項目クリック時に「なし」のチェックを外す
        obj.prevAll("input").prop('checked', false);
        obj.prevAll(".checkboxView").removeClass('selected');

        //チェック項目数が０の時には「なし」をチェックする
        var obj2 = ts.parent("label").parent("li").parent("ul").find("input[type='checkbox']:checked")

        if (obj2.length == 0) {
            obj.prevAll("input").prop('checked', true);
            obj.prevAll(".checkboxView").addClass('selected');

            //チェックされた項目を表示する
            //パネルのIDを取得
            var Id = ts.parent("label").parent("li").parent("ul").parent("div").attr('id');

            //テキストの表示(表示箇所のIDは"lbl_" + 項目パネルのIDで指定
            $("#lbl_" + Id).text("すべて")

            //ラベルの属性値を設定
            $("#lbl_" + Id).attr("value", "すべて")
            $("#lbl_" + Id).attr("result", "")

            //テキストボックスに値を設定
            $("#TextBox_" + Id).val("")

        } else {
            
        // 2015/12/15 del start 
        //  単一選択でよいとのことなので、「なし」以外の全項目を対象にする
        //  念のため、コメントにして戻せる状態にしておく
        //    if (result == "2" || result == "3" || result == "4" || result == "5") {
        //        // 1週間以内、1ヶ月以内、3ヶ月以内、6ヶ月以内のいずれかが選択された場合は、未読以外のチェックを外す
        // 2015/12/15 del end 
            var objKikan1 = $("div[id *= 'PnlKoumoku_Memo']").children("ul").children("li").children("label").children("span[id *= 'Koumoku1']")
            var objKikan2 = $("div[id *= 'PnlKoumoku_Memo']").children("ul").children("li").children("label").children("span[id *= 'Koumoku2']")
            var objKikan3 = $("div[id *= 'PnlKoumoku_Memo']").children("ul").children("li").children("label").children("span[id *= 'Koumoku3']")
            var objKikan4 = $("div[id *= 'PnlKoumoku_Memo']").children("ul").children("li").children("label").children("span[id *= 'Koumoku4']")
            var objKikan5 = $("div[id *= 'PnlKoumoku_Memo']").children("ul").children("li").children("label").children("span[id *= 'Koumoku5']")

            if (result != "1") {
                objKikan1.prevAll("input").prop('checked', false);
                objKikan1.prevAll(".checkboxView").removeClass('selected');
            }

            if (result != "2") {
                objKikan2.prevAll("input").prop('checked', false);
                objKikan2.prevAll(".checkboxView").removeClass('selected');
            }

            if (result != "3") {
                objKikan3.prevAll("input").prop('checked', false);
                objKikan3.prevAll(".checkboxView").removeClass('selected');
            }

            if (result != "4") {
                objKikan4.prevAll("input").prop('checked', false);
                objKikan4.prevAll(".checkboxView").removeClass('selected');
            }

            if (result != "5") {
                objKikan5.prevAll("input").prop('checked', false);
                objKikan5.prevAll(".checkboxView").removeClass('selected');
            }

            // 再度、チェックされている項目を取得する
            obj2 = ts.parent("label").parent("li").parent("ul").find("input[type='checkbox']:checked")

        // 2015/12/15 del start 
        //    }
        // 2015/12/15 del end 

        }

        if (flag) {
            //クリックしたチェックボックスがチェックされていた場合、チェック済みチェックボックス画像を表示する
            ts.prop('checked', true);
            ts.next(".checkboxView").addClass('selected');

            //チェックされた項目を表示する
            //パネルのIDを取得
            var Id = ts.parent("label").parent("li").parent("ul").parent("div").attr('id');

            //テキストボックスに値を設定
            $("#TextBox_" + Id).val(result)
        } else {
            ts.next(".checkboxView").removeClass('selected');
        }

        //チェックされた項目を表示する
        //パネルのIDを取得
        var Id = ts.parent("label").parent("li").parent("ul").parent("div").attr('id');

        var text2 = "";
        var result2 = "";

        //チェックされている項目の文字列を取得
        for (i = 0 ; i < obj2.length; i++) {
            text2 = obj2.eq(i).nextAll("span[id *='Koumoku']").text();
            result2 = obj2.eq(i).nextAll("span[id *='Koumoku']").attr("result")
            var img = ""
            img = obj2.eq(i).nextAll("img").attr("src")

            $("#img_" + Id + i).attr("src", img)

            if (i == 0) {
                $("#lbl_" + Id).text(text2)
                //ラベルの属性値を設定
                $("#lbl_" + Id).attr("value", text2)
                $("#lbl_" + Id).attr("result", result2)
                //テキストボックスに値を設定
                $("#TextBox_" + Id).val(result2)
            } else {
                $("#lbl_" + Id + i).text(text2)
                //ラベルの属性値を設定
                $("#lbl_" + Id + i).attr("value", text2)
                $("#lbl_" + Id + i).attr("result", result2)
                //テキストボックスに値を設定
                $("#TextBox_" + Id + i).val(result2)
            }
        }



    }

}


function ClickCheckBox_Siborikomi_Single(ts) {
    var flag = ts.prop('checked'); //クリックしたチェックボックスが既にチェックされているかを判定

    ts.parent("label").parent("li").parent("ul").find(":checkbox").prop('checked', false); //連動させるチェックボックスのチェックを一度すべて外す

    ////表示条件画面または絞り込み画面のとき、既にチェックされている項目クリック時は何もしない
    //if (document.title == "SG90010" || document.title == "SG90191") {
    //    if ($(this).next(".checkboxView").hasClass('selected')) {
    //        $(this).prop('checked', true);
    //        return
    //    }
    //}

    ts.parent("label").parent("li").parent("ul").find(".checkboxView").removeClass('selected'); //連動させる装飾のチェックボックスをチェックしてない状態にする(selectedクラスを外す)
    ts.parent("label").parent("li").parent("ul").find(".checkboxView").next('span').removeClass('selected');

    //クリックしたチェックボックスがチェックされていた場合、チェック済みチェックボックス画像を表示する
    ts.prop('checked', true);
    ts.next(".checkboxView").addClass('selected');
    ts.next(".checkboxView").next('span').addClass('selected');

    //チェックされた項目を表示する
    //パネルのIDを取得
    var Id = ts.parent("label").parent("li").parent("ul").parent("div").attr('id');

    //チェックボックスのテキストを取得
    var KoumokuId = ts.attr('id');
    var text = ts.parent('label').find("#Koumoku" + KoumokuId).text();
    var result = ts.parent('label').find("#Koumoku" + KoumokuId).attr("result");

    //テキストの表示(表示箇所のIDは"lbl_" + 項目パネルのIDで指定
    $("#lbl_" + Id).text(text)

    //ラベルの属性値を設定
    $("#lbl_" + Id).attr("value", text)
    $("#lbl_" + Id).attr("result", result)

    //テキストボックスに値を設定
    //$("#TextBox_" + Id).attr("value", result)
    $("#TextBox_" + Id).val(result)
    $("#TextBox_" + Id).attr("value", result)

    ////表示条件画面または絞り込み画面のとき、項目変更時に連動する他項目をリセットする
    //if (document.title == "SG90010" || document.title == "SG90020" || document.title == "SG90191") {
        //var Id = $(this).parent("label").parent("li").parent("ul").parent("div").attr('id');
        //ResetCheckBox(Id);
    //}

}

function SetCheckBox(id) {
    var chk = $("#" + id).children("ul").children("li");
    
    for (var i = 0; i < chk.length; i++) {
        var chk_c = chk.eq(i);
        var chkbox = chk_c.children("label").children("input");
        if (chkbox.prop('checked')) {

            //チェックボックスのテキストを取得
            var KoumokuId = chkbox.attr('id');
            var text = chkbox.parent('label').find("#Koumoku" + KoumokuId).text()
            var result = chkbox.parent('label').find("#Koumoku" + KoumokuId).attr("result")
            $("#lbl_" + id).text(text);
            //ラベルの属性値を設定
            $("#lbl_" + id).attr("value", text)
            $("#lbl_" + id).attr("result", result)
        }
    }
}
// 2018/05/18 ゾーン対応 add start
function ClickCheckBox_Zone() {

    if ($(this).parent("label").parent("li").parent("ul").parent("div").attr('id') == "PnlKoumoku_Eigyo") {
        //ゾーン表示(複数選択)
        ClickCheckBox_Zone1($(this));
    } else {
        //営業部パネル以外(単一選択)
        ClickCheckBox2($(this));
    }
}
function ClickCheckBox_Zone1(ts) {

    var flag = ts.prop('checked');
    var KoumokuId = ts.attr('id');
    var blockkbn = ts.parent('label').find("#Koumoku" + KoumokuId).attr('blockkbn');
    var result = ts.parent('label').find("#Koumoku" + KoumokuId).attr("result")
    var text = ts.parent('label').find("#Koumoku" + KoumokuId).text();

    var myId = ts.parent("label").parent("li").parent("ul").parent("div").attr('id');

    var obj = $("div[id *= '" + myId + "']").children("ul").children("li").children("label").children("span[id *= 'Koumoku0']")

    var myId2 = ts.parent("label").parent("span").attr('id');
    //「すべて」をクリック
    if (result == "") {
        ts.parent("label").parent("li").parent("ul").find(":checkbox").prop('checked', false); //連動させるチェックボックスのチェックを一度すべて外す
        ts.parent("label").parent("li").parent("ul").find(".checkboxView").removeClass('selected'); //連動させる装飾のチェックボックスをチェックしてない状態にする(selectedクラスを外す)
        ts.parent("label").parent("li").parent("ul").find(".checkboxView").next('span').removeClass('selected'); 

        //チェック済みチェックボックス画像を表示する
        ts.prop('checked', true);
        ts.next(".checkboxView").addClass('selected');

        //チェックされた項目を表示する
        //パネルのIDを取得
        var Id = ts.parent("label").parent("li").parent("ul").parent("div").attr('id');

        //テキストの表示(表示箇所のIDは"lbl_" + 項目パネルのIDで指定
        $("#lbl_" + Id).text(text)

        //ラベルの属性値を設定
        $("#lbl_" + Id).attr("value", text)
        $("#lbl_" + Id).attr("result", result)

        //テキストボックスに値を設定
        $("#TextBox_" + Id).val(result)

        //ブロックコード、ブロック名を設定
        $("#TextBox_PnlKoumoku_CDBlock").val(result)
        //$("#TextBox_PnlKoumoku_CDBlock").attr("value", result)
        $("#TextBox_PnlKoumoku_KJBlock").val(text)
        //$("#TextBox_PnlKoumoku_KJBlock").attr("value", text)
    } else {
        //項目クリック時に「すべて」のチェックを外す
        obj.prevAll("input").prop('checked', false);
        obj.prevAll(".checkboxView").removeClass('selected');
        obj.prevAll(".checkboxView").next('span').removeClass('selected');

        //チェック項目数が０の時には「すべて」をチェックする
        var obj3 = ts.parent("label").parent("li").parent("ul").find("input[type='checkbox']:checked")

        if (obj3.length == 0) {
            ts.parent("label").parent("li").parent("ul").find(":checkbox").prop('checked', false); //連動させるチェックボックスのチェックを一度すべて外す
            ts.parent("label").parent("li").parent("ul").find(".checkboxView").removeClass('selected'); //連動させる装飾のチェックボックスをチェックしてない状態にする(selectedクラスを外す)
            ts.parent("label").parent("li").parent("ul").find(".checkboxView").next('span').removeClass('selected'); 

            obj.prevAll("input").prop('checked', true);
            obj.prevAll(".checkboxView").addClass('selected');
            obj.prevAll(".checkboxView").next('span').addClass('selected');

            //チェックされた項目を表示する
            //パネルのIDを取得
            var Id = ts.parent("label").parent("li").parent("ul").parent("div").attr('id');

            //テキストの表示(表示箇所のIDは"lbl_" + 項目パネルのIDで指定
            $("#lbl_" + Id).text("すべて")

            //ラベルの属性値を設定
            $("#lbl_" + Id).attr("value", "すべて")
            $("#lbl_" + Id).attr("result", "")

            //テキストボックスに値を設定
            $("#TextBox_" + Id).val("")
            
            //ブロックコード、ブロック名を設定
            $("#TextBox_PnlKoumoku_CDBlock").val("")
            //$("#TextBox_PnlKoumoku_CDBlock").attr("value", "")
            $("#TextBox_PnlKoumoku_KJBlock").val("すべて")
            //$("#TextBox_PnlKoumoku_KJBlock").attr("value", text)
        } else {
            if (flag) {
                //クリックしたチェックボックスがチェックされていた場合、チェック済みチェックボックス画像を表示する
                ts.prop('checked', true);
                ts.next(".checkboxView").addClass('selected');
                ts.next(".checkboxView").next('span').addClass('selected');
            } else {
                ts.next(".checkboxView").removeClass('selected');
                ts.next(".checkboxView").next('span').removeClass('selected');
            }
            //チェックされた項目を表示する
            //パネルのIDを取得
            var Id = ts.parent("label").parent("li").parent("ul").parent("div").attr('id');

            var text2 = "";
            var result2 = "";

            obj3.each(function (i, elem) {
                if ($(elem).prop('checked') == true) {
                    text2 = text2 + $(elem).nextAll("span[id *='Koumoku']").text() + " , ";
                    result2 = result2 + $(elem).nextAll("span[id *='Koumoku']").attr("result") + ","
                }
            });
            //末尾の","を削除
            text2 = text2.slice(0, -3)
            result2 = result2.slice(0, -1)

            //テキストの表示(表示箇所のIDは"lbl_" + 項目パネルのIDで指定
            $("#lbl_" + Id).text(text2)

            //ラベルの属性値を設定
            $("#lbl_" + Id).attr("value", text2)
            $("#lbl_" + Id).attr("result", result2)

            //テキストボックスに値を設定
            $("#TextBox_" + Id).val(result2)

            //ブロックコード、ブロック名を設定
            $("#TextBox_PnlKoumoku_CDBlock").val(result2)
            //$("#TextBox_PnlKoumoku_CDBlock").attr("value", result2)
            $("#TextBox_PnlKoumoku_KJBlock").val(text2)
            //$("#TextBox_PnlKoumoku_KJBlock").attr("value", text2)
        }
    }
    var parentScrName = $("[id$=hidScreenID]").val()
    var blockkbn = ts.parent('label').find("#Koumoku" + KoumokuId).attr('blockkbn');
    if (blockkbn == '1' && obj3.length != 0) {
        //店舗
        $('#lbl_PnlKoumoku_Tenpo').addClass('unabled');
        $("#lbl_PnlKoumoku_Tenpo").text("すべて");
        $("#lbl_PnlKoumoku_Tenpo").attr("value", "すべて");
        $("#lbl_PnlKoumoku_Tenpo").attr("result", "");
        $("#TextBox_PnlKoumoku_Tenpo").val("");

        //課
        $('#lbl_PnlKoumoku_Ka').addClass('unabled');
        $("#lbl_PnlKoumoku_Ka").text("すべて");
        $("#lbl_PnlKoumoku_Ka").attr("value", "すべて");
        $("#lbl_PnlKoumoku_Ka").attr("result", "");
        $("#TextBox_PnlKoumoku_Ka").val("");

        //スタッフ
        $('#lbl_PnlKoumoku_Staff').addClass('unabled');
        $("#lbl_PnlKoumoku_Staff").text("すべて");
        $("#lbl_PnlKoumoku_Staff").attr("value", "すべて");
        $("#lbl_PnlKoumoku_Staff").attr("result", "");
        $("#TextBox_PnlKoumoku_Staff").val("");
    } else if (parentScrName == "SG60030" || parentScrName == "SG60040" || parentScrName == "SG60110" ||
               parentScrName == "SG60120" || parentScrName == "SG60130" || parentScrName == "SG60140" ||
               parentScrName == "SG60150" || parentScrName == "SG60160" || parentScrName == "SG60210" ||
               parentScrName == "SG60310" || parentScrName == "SG60410" || parentScrName == "SG60420") {
        //上記画面ではブロック区分が0でも店舗、スタッフを非選択にしない
    } else {
        //店舗
        $('#lbl_PnlKoumoku_Tenpo').removeClass('unabled');
        //スタッフ
        $('#lbl_PnlKoumoku_Staff').removeClass('unabled');
    }
}
function ClickCheckBox2(ts) {

    var flag = ts.prop('checked'); //クリックしたチェックボックスが既にチェックされているかを判定

    //見込み客表示条時の処理
    if (document.title == "SG90160") {
        if (ts.parent("label").parent("li").parent("ul").parent("div").attr('id') == "PnlKoumoku_Flag") {
            ClickCheckBox_Flg(ts);
            return
        } else if (ts.parent("label").parent("li").parent("ul").parent("div").attr('id') == "PnlKoumoku_Memo") {
            ClickCheckBox_Memo(ts);
            return
        }
        if (ts.parent("label").parent("li").parent("ul").parent("div").attr('id') == "PnlKoumoku_Yokojiku") {
            var mikomi_txt = $("#TextBox_PnlKoumoku_Mikomi").val();
        }
    }

    ts.parent("label").parent("li").parent("ul").find(":checkbox").prop('checked', false); //連動させるチェックボックスのチェックを一度すべて外す

    //表示条件画面または絞り込み画面のとき、既にチェックされている項目クリック時は何もしない
    if (document.title == "SG90010" || document.title == "SG90011" || document.title == "SG90191") {
        if (ts.next(".checkboxView").hasClass('selected')) {
            ts.prop('checked', true);
            return
        }
    }
    //（仮）絞り込み画面では納期CSのみが選択可能
    if (document.title == "SG90191"
        && ts.parent("label").parent("li").parent("ul").parent("div").attr('id') == "PnlKoumoku_Jouken1") {
        var KoumokuId = ts.attr('id');

        if (ts.parent('label').find("#Koumoku" + KoumokuId).attr("result") != ""
            && ts.parent('label').find("#Koumoku" + KoumokuId).attr("result") != "02") {
            return
        }
    }

    ts.parent("label").parent("li").parent("ul").find(".checkboxView").removeClass('selected'); //連動させる装飾のチェックボックスをチェックしてない状態にする(selectedクラスを外す)
    ts.parent("label").parent("li").parent("ul").find(".checkboxView").next('span').removeClass('selected');

    // 2016/09/29 mod start 活動情報画面の保有車両は、チェック状態の解除ができるようにする
    if (!flag && document.title == "SG90060") {
        return
    }
    // 2016/09/29 mod end   活動情報画面の保有車両は、チェック状態の解除ができるようにする

    //クリックしたチェックボックスがチェックされていた場合、チェック済みチェックボックス画像を表示する
    ts.prop('checked', true);
    ts.next(".checkboxView").addClass('selected');
    ts.next(".checkboxView").next('span').addClass('selected');

    //チェックされた項目を表示する
    //パネルのIDを取得
    var Id = ts.parent("label").parent("li").parent("ul").parent("div").attr('id');

    //チェックボックスのテキストを取得
    var KoumokuId = ts.attr('id');
    var text = ts.parent('label').find("#Koumoku" + KoumokuId).text();
    var result = ts.parent('label').find("#Koumoku" + KoumokuId).attr("result");

    //テキストの表示(表示箇所のIDは"lbl_" + 項目パネルのIDで指定
    $("#lbl_" + Id).text(text)

    //ラベルの属性値を設定
    $("#lbl_" + Id).attr("value", text)
    $("#lbl_" + Id).attr("result", result)

    //テキストボックスに値を設定
    //$("#TextBox_" + Id).attr("value", result)
    $("#TextBox_" + Id).val(result)
    $("#TextBox_" + Id).attr("value", result)

    //表示条件画面または絞り込み画面のとき、項目変更時に連動する他項目をリセットする
    if (document.title == "SG90010" || document.title == "SG90011" || document.title == "SG90020" || document.title == "SG90021" || document.title == "SG90191") {
        var Id = ts.parent("label").parent("li").parent("ul").parent("div").attr('id');
        ResetCheckBox(Id);
    }

    var parentScrName = $("[id$=hidScreenID]").val()
    var blockkbn = ts.parent('label').find("#Koumoku" + KoumokuId).attr('blockkbn');
    if (blockkbn == '1') {
        //店舗
        $('#lbl_PnlKoumoku_Tenpo').addClass('unabled');
        $("#lbl_PnlKoumoku_Tenpo").text("すべて");
        $("#lbl_PnlKoumoku_Tenpo").attr("value", "すべて");
        $("#lbl_PnlKoumoku_Tenpo").attr("result", "");
        $("#TextBox_PnlKoumoku_Tenpo").val("");

        //スタッフ
        $('#lbl_PnlKoumoku_Staff').addClass('unabled');
        $("#lbl_PnlKoumoku_Staff").text("すべて");
        $("#lbl_PnlKoumoku_Staff").attr("value", "すべて");
        $("#lbl_PnlKoumoku_Staff").attr("result", "");
        $("#TextBox_PnlKoumoku_Staff").val("");
    } else if (parentScrName == "SG60030" || parentScrName == "SG60040" || parentScrName == "SG60110" ||
               parentScrName == "SG60120" || parentScrName == "SG60130" || parentScrName == "SG60140" ||
               parentScrName == "SG60150" || parentScrName == "SG60160" || parentScrName == "SG60210" ||
               parentScrName == "SG60310" || parentScrName == "SG60410" || parentScrName == "SG60420") {
        //上記画面ではブロック区分が0でも店舗、スタッフを非選択にしない
    } else {
        //店舗
        $('#lbl_PnlKoumoku_Tenpo').removeClass('unabled');
        //スタッフ
        $('#lbl_PnlKoumoku_Staff').removeClass('unabled');
    }

}
// 2018/05/18 ゾーン対応 add end