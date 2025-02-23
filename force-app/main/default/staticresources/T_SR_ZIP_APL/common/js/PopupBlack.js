/*****************************/
/*   ポップアップ画面呼出    */
/*****************************/

var SJPopup = function () { };

SJPopup.open = function (screenid, url, params, height, width) {

    $("#linkOpen").attr('href', screenid);
    $("#linkOpen").attr('h', height + "");
    $("#linkOpen").attr('w', width + "");

    $('#geturl').attr('sjdisplay', screenid);
    $('#geturl').attr('sjurl', url + params);

    // リンクの無効化
    changeLinkStatus(false);

    /*** 下部メニューボタン非表示 ***/
    
    // 2019/06/28 del start SG20050, SG20100, SG20110は融合版開発の対象外の為、削除
    //$('#hyoujiPopup').hide();   // SG20050, SG20100, SG20110用
    
    // 2019/06/28 del start SG20020, SG20040, SG20070は融合版開発の対象外の為、削除
    //$('#mikomi').hide();        // SG20020, SG20040, SG20070用
    
    $('#topmenu').hide();
    $('#ServiceFooter').hide();
    $('#HokenSinkiFooter').hide();
    $('#noukics_ucar').hide();
    $('#noukics').hide();

    // URLを実行する
    $("#linkOpen").click();

    // リスナー
    window.addEventListener('message', receiveMessage, false);

    /**
     * リンク有効/無効切替
     */
    function changeLinkStatus(bool) {

        var linkStatus = '';

        if (bool == true) {
            linkStatus = 'auto';
        }
        else {
            linkStatus = 'none';
        }

        /*** ヘッダーのリンク無効化 ***/
        // SPMロゴ
        $("#ctl00_imgSpm").css('pointer-events', linkStatus);
        // 戻るアイコン
        $("#ctl00_imgBack").css('pointer-events', linkStatus);
        // スタッフ名、最終更新日時
        $(".spm_head").css('pointer-events', linkStatus);

        /*** フッターのリンク無効化 ***/
        $(".fteerBar").css('pointer-events', linkStatus);
    }

    /**
     *  ポストメッセージ受信処理
     *
     *  @param {String} aMessage    ポストメッセージ
     */
    function receiveMessage(aMessage) {

        // ポストメッセージ以外は処理しない
        if (aMessage == null
            || aMessage.data == null) {
            return;
        }

        var result = JSON.parse(aMessage.data);

        if (result.ResultCd != null) {

            // 結果区分が'1':更新有りの場合
            if (result.ResultCd === '1') {
                // 2019/06/28 del start 予定日変更画面は融合版開発の対象外の為、削除
                //// 予定日変更画面はリロードしない
                //if (window.location.href.indexOf('SG90900') >= 0) {
                //    if (result.MessageId === '000003' || result.MessageId === '000001' || result.MessageId === '000004' || result.MessageId === '000007') {
                //        $('.spm_head').removeClass('hedder_event_none');
                //        $('#ctl00_imgSpm').removeClass('hedder_event_none');
                //        $('#ctl00_imgBack').removeClass('hedder_event_none');
                //        ClosePopup('1');
                //        changeLinkStatus(true);
                //        $("#geturl").removeAttr('sjdisplay');
                // 2019/06/28 del end 予定日変更画面は融合版開発の対象外の為、削除
                    
                // 2019/07/16 del start 予定日変更画面は融合版開発の対象外の為、削除
                //     // 2019/06/28 mod start 上記削除の為
                //     //} else if (result.MessageId !== '000005') {
                //     if (result.MessageId !== '000005') {
                //     // 2019/06/28 mod end 上記削除の為
                    
                //         $('#ctl00_btnUpdateField').click();
                //         $(".fteerBar").css('z-index', "600");

                //     } else {
                //         $(".fteerBar").css('z-index', "599");

                //     }


                // } else {
                // 2019/07/16 del start 予定日変更画面は融合版開発の対象外の為、削除
                    $('#ctl00_btnUpdateField').click();

                // 2019/07/16 del start 予定日変更画面は融合版開発の対象外の為、削除
                // }
                // 2019/07/16 del end 予定日変更画面は融合版開発の対象外の為、削除
            }
            // 2019/06/28 del start 割賦情報画面(お客様向け)画面(SC9S20206)は融合版開発の対象外の為、削除
            // else {
            //
            //    switch (result.MessageId) {
            //
            //        case '000009':
            //            // MessageIdが000009の場合、割賦情報画面(お客様向け)を全画面表示
            //            var url = result.Option.Url;    // URL取得
            //
            //            if (!$('#ifrmKappuOkyaku').size()) {
            //                $('#kappuOkyakuArea').append('<iframe id="ifrmKappuOkyaku" scrolling="no" frameborder="no"></iframe>');
            //                $('#ifrmKappuOkyaku').attr('src', url);
            //                $('#kappuOkyakuArea').css('display', 'block');
            //            }
            //
            //            break;
            //
            //        case '000010':
            //            // MessageIdが000010の場合、割賦情報画面(お客様向け)を閉じる
            //            $('#kappuOkyakuArea').css('display', 'none');
            //            $('#ifrmKappuOkyaku').remove();
            //
            //            break;
            //    }
            //
            //
            // }
            //2019/06/28 del end割賦情報画面(お客様向け)画面(SC9S20206)は融合版開発の対象外の為、削除

        }

    }

};