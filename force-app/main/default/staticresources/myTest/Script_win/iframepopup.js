﻿

$(function () {
    /*-------------------------------
    イベント処理「PopUp」を定義
    --------------------------------*/
    var PopUp = function () {

        // 2017/11/09 add start 試行店対応
        // 試行店区分
        var trialKbn = $('#ctl00_main_TrialShop').val();
        // 試行店区分（試行店:1）
        var KBN_TRIAL = '1';
        if (location.href.indexOf('SG90900') >= 0) {
            trialKbn = KBN_TRIAL;
        }

        // 2017/11/21 mod start 試行店対応
        // 2017/11/30 mod start 試行店対応
        var TRIAL_URL = {
//            CUSTOMER_INFO: 'OC9S00301/Index' // 試行店用顧客詳細ポップアップ
            CUSTOMER_INFO: '/apex/OC9S00301' // 試行店用顧客詳細ポップアップ
        };

        // 2018/03/07 add start 新SPM 詳細画面表示対応
        // 試行店用のお客様詳細画面を表示する画面一覧（かんばんポストは別途）
        var trialCmn = $('#ctl00_hdnKbTrial').val();

        var trialScreen = ['SG0001Master',                                          // お客様検索
                           'SG20020', 'SG20100', 'SG20040', 'SG20030', 'SG20080',   // 新規客フォロー
                           'SG20050', 'SG20110', 'SG20070', 'SG20060', 'SG20090',   // 代替客フォロー
                           'SG20210', 'SG20220','SG90900'];                                   // 接触客フォロー

        // 試行店用のお客様詳細画面を開くか判断フラグ
        var IsTrialScreen = ($.inArray($("#geturl").attr('sjdisplay'), trialScreen) != -1 && trialCmn == KBN_TRIAL) ? true : false;
        // 2018/03/07 add end 新SPM 詳細画面表示対応

        // 2017/11/30 mod end 試行店対応
        // 2017/11/21 mod end 試行店対応
        // 2017/11/09 add end 試行店対応

        if ($(this).attr('name') == 'myt') {

            if ($(this).hasClass('mybox')) {

            } else {
                $(this).find("[id$='select']").css('display', 'none');
                $("[name='hight']").find("[id$='select']").css('display', 'block');
                return;
            }
        }

        if (($(this).hasClass('headerclick_taisyo') || $(this).hasClass('headerclick_jyoken') || $(this).hasClass('headerclick_sort')) && $('#square').length != 0) {
            return;
        }

        $('#header_Popup').css('display', 'none');

        //アラートフラグが立っている場合は、キャンセルボタンを表示（顧客詳細　お客様情報画面のフッターとして使用）
        if ($("#ctl00_alertflag").val() == '1') {

            $("#cancel").css('display', 'inline');

            return;
        } else {

            $("#cancel").css('display', 'none');
        }

        //読み込む外部ファイルを取得しておく
        var poplink = ($(this).attr('href'));
        var getlink = $("#geturl").attr('value');
        var url = "";

        if (poplink == undefined || poplink == "") {

            return;
        }

        // 2017/11/09 add start 試行店対応
        // かんばんポスト画面からポップアップを呼び出した場合
        // 2017/11/21 mod start 試行店対応
        // 2017/11/30 mod start 試行店対応

        // 2018/03/07 add start 新SPM 詳細画面表示対応
        // 試行店フラグが立っているかつ試行店用の画面を開く対象かどうか判断する
        if (IsTrialScreen) {
            url = $("#geturl").attr('sjurl');    // urlを取得
            objLink = $("[href $= '" + $('#geturl').attr('sjdisplay') + "']");
        }
        // 2018/03/07 add end 新SPM 詳細画面表示対応
        else if (trialKbn === KBN_TRIAL && location.href.indexOf('SG10040') >= 0 && poplink.indexOf(TRIAL_URL.CUSTOMER_INFO) >= 0) {
            // 2017/11/30 mod end 試行店対応
            // 2017/11/21 mod end 試行店対応

            // 試行店URL
            var trialUrl = $('#ctl00_main_TrialShopUrl').val();
// DHC一時対応　2018/12/10　start
            // NEO画面用パラメータ
            //var getlinkNeo = $("#geturl").attr('valueNeo');
            var getlinkNeo = $("#geturl").attr('valueneo'); //小文字対応
// DHC一時対応　2018/12/10　end

            url = trialUrl + poplink + getlinkNeo;

            // 2017/12/04 add start 試行店対応
            objLink = $("[href $= '" + poplink + "']");
            // 2017/12/04 add end 試行店対応

        }
            // 2018/03/07 add end 新SPM 詳細画面表示対応
        else if (trialKbn === KBN_TRIAL && location.href.indexOf('SG10070') >= 0 && poplink.indexOf(TRIAL_URL.CUSTOMER_INFO) >= 0) {
            // 2017/11/30 mod end 試行店対応
            // 2017/11/21 mod end 試行店対応

            // 試行店URL
            var trialUrl = $('#ctl00_main_TrialShopUrl').val();

            // NEO画面用パラメータ
// DHC一時対応　2018/12/10　start
            //var getlinkNeo = $("#geturl").attr('valueNeo');
            var getlinkNeo = $("#geturl").attr('valueneo'); //小文字対応
// DHC一時対応　2018/12/10　end

            url = trialUrl + poplink + getlinkNeo;

            // 2017/12/04 add start 試行店対応
            objLink = $("[href $= '" + poplink + "']");
            // 2017/12/04 add end 試行店対応

        } else {

            //hiddenのgetuurlに値が入っている場合は、URLの後ろに結合されるように使用
            //SG300系　納期CSのリスト画面にて使用　選択された行のGETパラメータを起動するポップアップに設定
            if (getlink == undefined) {

                getlink = $("#geturl", parent.document).attr('value');
            }

            if (getlink != undefined) {

                if (poplink.indexOf("?") == -1) {

                    url = poplink + getlink;
                } else {

                    url = poplink;
                }
            } else {

                url = poplink;
            }

            var pHeight, pWidth, pZindex;

            var geturl = poplink.split('?');

            if (geturl.length > 1) {

                //選択された行のGETパラメーターをURLの後ろにセット
                $("#geturl").attr('value', "?" + geturl[1]);
            }

            // 2017/12/04 add start 試行店対応
            // DHC一時対応　2018/12/11　start
            //objLink = $("[href $= '" + poplink.replace(/.\//g, "") + "']");
            objLink = $("[href $= '" + poplink + "']");
            // DHC一時対応　2018/12/11　end
            // 2017/12/04 add end 試行店対応

        }
        // 2017/11/09 add end 試行店対応

        //かんばんポストから絞込画面を呼び出す場合
        if (url.indexOf("SG90190") >= 0) {
            var parent_url = window.location;
            var parent_path = parent_url.href.split('/');
            var parent_file_name = parent_path.pop();
            
            // DHC一時対応　2018/12/10　start
            //var parent_name = parent_file_name.split('.');
            var parent_name = parent_file_name.split('?');
            // DHC一時対応　2018/12/10　end
            var parent_id = parent_name[0];

            if (parent_id == "SG10040") {
                objLink = $("#sibori2");
            }
        }


        ///画面ごとの初回起動　顧客詳細ポップアップの設定
        //初期起動の場合を調べ、初期起動ポップアップを指定する
        //起動時のサイズも指定
        if ((url.indexOf("SG90010") != -1 || url.indexOf("SG90011") != -1 || url.indexOf("SG90021") != -1 || url.indexOf("SG90192") != -1 || url.indexOf("SG90193") != -1 || url.indexOf("SG90194") != -1 ||
             url.indexOf("SG90032") != -1 || url.indexOf("SG90033") != -1) && url.indexOf("SG90040") == -1) {

            var main = window.location.href;

            //納期CS系は、ソート条件を最初に表示させる
            if (main.indexOf("SG3") >= 0 && $('#square').length == 0) {

                //納期CSボードTOPから呼ばれたときには２列表示のソート条件画面を表示する
                //ai21から呼ばれたときにも2列表示にする 2015/08/06　add
                //if (main.indexOf("SG30010") >= 0) {
                //U-Car SPM：2017/11/30 mod start
                //if (main.indexOf("SG30010") >= 0 || main.indexOf("SG30030") >= 0) {     //2015/08/06 add
                if (main.indexOf("SG30010") >= 0 || main.indexOf("SG30030") >= 0 || main.indexOf("SG30110") >= 0) {
                    //U-Car SPM：2017/11/30 mod end
                    if ($(this).hasClass('headerclick_taisyo')) {
                        $("#ctl00_imgOther_select").css('display', 'none');
                        $("#ctl00_imgTaisho_select").css('display', 'block');
                        $("#ctl00_sibori_select").css('display', 'none');
                        pHeight = 425;
                        pWidth = 475;
                        pZindex = 1100;

                    } else if ($(this).hasClass('headerclick_joken')) {
                        $("#ctl00_imgOther_select").css('display', 'none');
                        $("#ctl00_imgTaisho_select").css('display', 'none');
                        $("#ctl00_sibori_select").css('display', 'block');
                        pHeight = 480;
                        pWidth = 900;
                        pZindex = 1100;

                    } else if ($(this).hasClass('headerclick_sort')) {
                        $("#ctl00_imgOther_select").css('display', 'block');
                        $("#ctl00_imgTaisho_select").css('display', 'none');
                        $("#ctl00_sibori_select").css('display', 'none');
                        pHeight = 630;
                        pWidth = 800;
                        pZindex = 1100;

                        //2017/12/15 mod start U-Car-SPMテスト課題@U-Car No.14対応
                    } else if (main.indexOf("SG30010") >= 0 || main.indexOf("SG30030") >= 0) {
                        //2017/09/22 mod start
                        //url = url.replace("SG90010", "SG90190");
                        url = url.replace("SG90010", "SG90192");
                        //2017/09/22 mod end
                        $("#ctl00_imgOther_select").css('display', 'none');
                        $("#ctl00_imgTaisho_select").css('display', 'none');
                        $("#ctl00_sibori_select").css('display', 'block');
                        pHeight = 420;
                        pWidth = 900;
                        pZindex = 600;
                    } else if (main.indexOf("SG30110") >= 0) {
                        //2018/01/18 mod start 本部管理納期CS_U-Car違反切符
                        //url = url.replace("SG90010", "SG90190");
                        url = url.replace("SG90010", "SG90192");
                        //2018/01/18 mod end
                        $("#ctl00_imgOther_select").css('display', 'none');
                        $("#ctl00_imgTaisho_select").css('display', 'none');
                        $("#ctl00_sibori_select").css('display', 'block');
                        pHeight = 420;
                        pWidth = 900;
                        pZindex = 600;
                    }
                    //2017/12/15 mod end

                    //U-Car SPM：2017/11/30 del start U-CarSPM要件によりｶﾚﾝﾀﾞｰ削除
                    //} else if (main.indexOf("SG30020") >= 0 || main.indexOf("SG30040") >= 0) {
                    //U-Car SPM：2017/11/30 mod start
                    //} else if (main.indexOf("SG30020") >= 0 || main.indexOf("SG30120")) {
                } else if (main.indexOf("SG30020") >= 0 || main.indexOf("SG30120") >= 0 || main.indexOf("SG30050") >= 0) {
                    //U-Car SPM：2017/11/30 mod end
                    if ($(this).hasClass('headerclick_taisyo')) {
                        $("#ctl00_imgOther_select").css('display', 'none');
                        $("#ctl00_imgTaisho_select").css('display', 'block');
                        $("#ctl00_sibori_select").css('display', 'none');
                        pHeight = 425;
                        pWidth = 475;
                        pZindex = 1100;

                    } else if ($(this).hasClass('headerclick_joken')) {
                        $("#ctl00_imgOther_select").css('display', 'none');
                        $("#ctl00_imgTaisho_select").css('display', 'none');
                        $("#ctl00_sibori_select").css('display', 'block');
                        pHeight = 480;
                        pWidth = 900;
                        pZindex = 1100;

                    } else if ($(this).hasClass('headerclick_sort')) {
                        $("#ctl00_imgOther_select").css('display', 'block');
                        $("#ctl00_imgTaisho_select").css('display', 'none');
                        $("#ctl00_sibori_select").css('display', 'none');
                        pHeight = 630;
                        pWidth = 1000;
                        pZindex = 1100;

                        //2017/12/15 mod start U-Car-SPMテスト課題@U-Car No.14対応
                    } else if (main.indexOf("SG30020") >= 0) {
                        //2017/09/22 mod start
                        //url = url.replace("SG90010", "SG90190");
                        url = url.replace("SG90010", "SG90192");
                        //2017/09/22 mod end
                        $("#ctl00_imgOther_select").css('display', 'none');
                        $("#ctl00_imgTaisho_select").css('display', 'none');
                        $("#ctl00_sibori_select").css('display', 'block');
                        pHeight = 420;
                        pWidth = 900;
                        pZindex = 600;
                    } else if (main.indexOf("SG30120") >= 0) {
                        //2018/01/18 mod start 本部管理納期CS_U-Car違反切符
                        //url = url.replace("SG90010", "SG90190");
                        url = url.replace("SG90010", "SG90192");
                        //2018/01/18 mod end
                        $("#ctl00_imgOther_select").css('display', 'none');
                        $("#ctl00_imgTaisho_select").css('display', 'none');
                        $("#ctl00_sibori_select").css('display', 'block');
                        pHeight = 420;
                        pWidth = 900;
                        pZindex = 600;
                        //2017/12/15 mod end
                    } else if (main.indexOf("SG30050") >= 0) {
                        url = url.replace("SG90010", "SG90190");
                        $("#ctl00_imgOther_select").css('display', 'none');
                        $("#ctl00_imgTaisho_select").css('display', 'none');
                        $("#ctl00_sibori_select").css('display', 'block');
                        pHeight = 450;
                        pWidth = 900;
                        pZindex = 600;
                    }

                    //U-Car SPM：2017/11/30 del start U-CarSPM要件によりｶﾚﾝﾀﾞｰ削除
                    //}else if (main.indexOf("SG30040") >= 0) {     //2015/08/06 add
                    //    url = url.replace("SG90010", "SG90190");

                    //    //ソート条件画面のサイズを設定する
                    //     pHeight = 420;

                    //    pWidth = 900;

                    //    pZindex = 600;

                    //    $("#ctl00_imgOther_select").css('display', 'none');
                    //    $("#ctl00_imgTaisho_select").css('display', 'block');
                    //    $("#ctl00_sibori_select").css('display', 'none');
                    //U-Car SPM：2017/11/30 del end

                } else {

                    url = url.replace("SG90010", "SG90190");

                    //ソート条件画面のサイズを設定する
                    pHeight = 420;

                    pWidth = 900;

                    pZindex = 600;
                }

            } else if (main.indexOf("SG10020") >= 0 && $('#square').length == 0) {

                if ($(this).hasClass('headerclick_taisyo')) {
                    $("#ctl00_imgOther_select").css('display', 'none');
                    $("#ctl00_imgTaisho_select").css('display', 'block');
                    pHeight = 425;
                    pWidth = 475;
                    pZindex = 1100;
                }
                    //2016/8/22 delete start
                    //else{
                    //// 2016/07/01 add start 課題外 表示される絞込条件が間違っている
                    ////  url = url.replace("SG90010", "SG90190");
                    //    url = url.replace("SG90010", "SG90192");
                    //// 2016/07/01 add end   課題外 表示される絞込条件が間違っている
                    //    $("#ctl00_imgOther_select").css('display', 'block');
                    //    $("#ctl00_imgTaisho_select").css('display', 'none');
                    //    pHeight = 420;
                    //    pWidth = 900;
                    //    pZindex = 450;
                    //}
                    //2016/8/22 delete end
                    //2016/8/22 add start
                else if (main.indexOf("SG10020.aspx?type=99") >= 0) {
                    url = url.replace("SG90010", "SG90192");
                    $("#ctl00_imgOther_select").css('display', 'block');
                    $("#ctl00_imgTaisho_select").css('display', 'none');
                    pHeight = 420;
                    pWidth = 900;
                    pZindex = 450;
                } else {
                    // フォローリスト
                    url = url.replace("SG90010", "SG90192");
                    $("#sibori").attr("href", "./SG90192.aspx");
                    $("#ctl00_imgOther_select").css('display', 'none');
                    $("#ctl00_imgTaisho_select").css('display', 'none');
                    $("#ctl00_sibori_select").css('display', 'block');

                    pHeight = 420;
                    pWidth = 900;
                    pZindex = 450;

                }
                //2016/8/22 add end

            } else if (main.indexOf("SG10030") >= 0 && $('#square').length == 0) {

                url = url.replace("SG90010", "SG90191");

                //ソート条件画面のサイズを設定する
                pHeight = 630;

                pWidth = 1000;

                pZindex = 600;


                $("#ctl00_SG90010_select").css('display', 'none');
                $("#ctl00_SG09191_select").css('display', 'block');

            } else if (main.indexOf("SG10040") >= 0 && $('#square').length == 0) {

                url = url.replace("SG90010", "SG90190");

                
                if ($(this).hasClass('headerclick_taisyo')) {
                    $("#ctl00_imgOther_select").css('display', 'none');
                    $("#ctl00_imgTaisho_select").css('display', 'block');
                    pHeight = 425;
                    pWidth = 475;
                    pZindex = 1100;
                } else {
                    //ソート条件画面のサイズを設定する
                    pHeight = 320;

                    pWidth = 900;

                    pZindex = 450;
                }


                $("#ctl00_imgOther_select").css('display', 'block');
                $("#ctl00_imgTaisho_select").css('display', 'none');
                $("#ctl00_sibori_select").css('display', 'none');

            } else if (main.indexOf("SG10050") >= 0 && $('#square').length == 0) {

                if ($(this).hasClass('headerclick_taisyo')) {
                    $("#ctl00_imgOther_select").css('display', 'none');
                    $("#ctl00_imgTaisho_select").css('display', 'block');
                    pHeight = 425;
                    pWidth = 475;
                    pZindex = 1100;

                } else if ($(this).hasClass('headerclick_sort')) {
                    $("#ctl00_imgOther_select").css('display', 'block');
                    $("#ctl00_imgTaisho_select").css('display', 'none');
                    pHeight = 520;
                    pWidth = 900;
                    pZindex = 1100;

                } else {
                    url = url.replace("SG90010", "SG90020");
                    $("#ctl00_imgOther_select").css('display', 'block');
                    $("#ctl00_imgTaisho_select").css('display', 'none');
                    pHeight = 520;
                    pWidth = 900;
                    pZindex = 450;
                }

            } else if (main.indexOf("SG10060") >= 0 && $('#square').length == 0) {

                url = url.replace("SG90010", "SG90192");

                if ($(this).hasClass('headerclick_taisyo')) {
                    pHeight = 425;
                    pWidth = 475;
                    pZindex = 1100;
                    $("#ctl00_imgOther_select").css('display', 'none');
                    $("#ctl00_imgTaisho_select").css('display', 'none');
                    $("#ctl00_sibori_select").css('display', 'none');

                } else {
                    //ソート条件画面のサイズを設定する
                    pHeight = 320;
                    pWidth = 900;
                    pZindex = 450;

                    $("#ctl00_imgOther_select").css('display', 'block');
                    $("#ctl00_imgTaisho_select").css('display', 'none');
                    $("#ctl00_sibori_select").css('display', 'none');
                }

            } else if (main.indexOf("SG10070") >= 0 && $('#square').length == 0) {

                url = url.replace("SG90010", "SG90192");

                //ソート条件画面のサイズを設定する
                pHeight = 420;

                pWidth = 900;

                pZindex = 450;

                $("#ctl00_imgOther_select").css('display', 'block');
                $("#ctl00_imgTaisho_select").css('display', 'none');
                $("#ctl00_sibori_select").css('display', 'none');

            } else if (main.indexOf("SG20010") >= 0 && $('#square').length == 0) {     //2015/08/06 add
                url = url.replace("SG90010", "SG90170");

                //ソート条件画面のサイズを設定する
                pHeight = 630;

                pWidth = 800;

                pZindex = 600;

                $("#sibori").css("display", "none");

                $("#ctl00_imgOther_select").css('display', 'block');
                $("#ctl00_imgTaisho_select").css('display', 'none');
                $("#ctl00_sibori_select").css('display', 'none');

                if ($(this).hasClass('headerclick_taisyo')) {
                    $("#ctl00_imgOther_select").css('display', 'none');
                    $("#ctl00_imgTaisho_select").css('display', 'block');
                    $("#ctl00_sibori_select").css('display', 'none');
                    pHeight = 425;
                    pWidth = 475;
                    pZindex = 1100;
                }

            } else if (((main.indexOf("SG20020") >= 0) || (main.indexOf("SG20030") >= 0) || (main.indexOf("SG20080") >= 0) || (main.indexOf("SG20100") >= 0) ||
                        (main.indexOf("SG20050") >= 0) || (main.indexOf("SG20060") >= 0) || (main.indexOf("SG20090") >= 0) || (main.indexOf("SG20110") >= 0) || (main.indexOf("SG20220") >= 0)) && $('#square').length == 0) {
                //url = url.replace("SG90010", "SG90160");
                if ($(this).hasClass('headerclick_taisyo')) {
                    $("#ctl00_imgOther_select").css('display', 'none');
                    $("#ctl00_imgTaisho_select").css('display', 'block');
                    $("#ctl00_sibori_select").css('display', 'none');
                    pHeight = 425;
                    pWidth = 475;
                    pZindex = 1100;

                } else if ($(this).hasClass('headerclick_joken')) {
                    $("#ctl00_imgOther_select").css('display', 'none');
                    $("#ctl00_imgTaisho_select").css('display', 'none');
                    $("#ctl00_sibori_select").css('display', 'block');
                    pHeight = 550;
                    pWidth = 900;
                    pZindex = 1100;

                    if ((main.indexOf("SG20020") >= 0)) {
                        pHeight = 530;
                    }
                    if ((main.indexOf("SG20050") >= 0)) {
                        pHeight = 600;
                    }
                    if ((main.indexOf("SG20060") >= 0) || (main.indexOf("SG20090") >= 0)) {
                        pHeight = 650;
                    }
                    if ((main.indexOf("SG20110") >= 0)) {
                        pHeight = 620;
                    }

                } else {
                    url = url.replace("SG90010", "SG90160");
                    $("#ctl00_imgOther_select").css('display', 'block');
                    $("#ctl00_imgTaisho_select").css('display', 'none');
                    $("#ctl00_sibori_select").css('display', 'none');
                    pHeight = 630;
                    pWidth = 800;
                    pZindex = 600;
                }

                $("#sibori").attr("href", "./SG90192.aspx");


            } else if (((main.indexOf("SG20040") >= 0) || (main.indexOf("SG20070") >= 0)) && $('#square').length == 0) {     //2015/09/23 add

                if ($(this).hasClass('headerclick_taisyo')) {
                    $("#ctl00_imgOther2_select").css('display', 'none');
                    $("#ctl00_imgTaisho2_select").css('display', 'block');
                    $("#ctl00_imgSort2_select").css('display', 'none');
                    $("#ctl00_sibori2_select").css('display', 'none');
                    pHeight = 425;
                    pWidth = 475;
                    pZindex = 1100;

                } else if ($(this).hasClass('headerclick_joken')) {
                    $("#ctl00_imgOther2_select").css('display', 'none');
                    $("#ctl00_imgTaisho2_select").css('display', 'none');
                    $("#ctl00_imgSort2_select").css('display', 'none');
                    $("#ctl00_sibori2_select").css('display', 'block');
                    pHeight = 550;
                    pWidth = 900;
                    pZindex = 1100;
                    if ((main.indexOf("SG20070") >= 0)) {
                        pHeight = 650;
                    }

                } else if ($(this).hasClass('headerclick_sort')) {
                    $("#ctl00_imgOther2_select").css('display', 'none');
                    $("#ctl00_imgTaisho2_select").css('display', 'none');
                    $("#ctl00_imgSort2_select").css('display', 'block');
                    $("#ctl00_sibori2_select").css('display', 'none');
                    pHeight = 630;
                    pWidth = 800;
                    pZindex = 1100;

                } else {
                    url = url.replace("SG90010", "SG90160");
                    $("#ctl00_imgOther2_select").css('display', 'block');
                    $("#ctl00_imgTaisho2_select").css('display', 'none');
                    $("#ctl00_imgSort2_select").css('display', 'none');
                    $("#ctl00_sibori2_select").css('display', 'none');
                    pHeight = 630;
                    pWidth = 800;
                    pZindex = 600;
                }

                $("#sibori3").attr("href", "./SG90192.aspx");
            } else if (main.indexOf("SG2") >= 0 && $('#square').length == 0) {     //2015/08/06 add
                url = url.replace("SG90010", "SG90160");

                //ソート条件画面のサイズを設定する
                pHeight = 630;

                pWidth = 800;

                pZindex = 600;

                $("#sibori").attr("href", "./SG90192.aspx");

                $("#ctl00_imgOther_select").css('display', 'block');
                $("#ctl00_imgTaisho_select").css('display', 'none');
                $("#ctl00_sibori_select").css('display', 'none');

                // 2016/01/26 add start
                // 2017/11/08 mod start U-Car_SPM車検画面対応
                //} else if (((main.indexOf("SG40030") >= 0) || (main.indexOf("SG40050") >= 0) || (main.indexOf("SG40070") >= 0) || (main.indexOf("SG40090") >= 0)) && $('#square').length == 0) {
            } else if (((main.indexOf("SG40030") >= 0) || (main.indexOf("SG40050") >= 0) || (main.indexOf("SG40070") >= 0) || (main.indexOf("SG40090") >= 0) || (main.indexOf("SG40160") >= 0)) &&
                        $('#square').length == 0) {
                // 2017/11/08 mod end
                //url = url.replace("SG90010", "SG90160");

                if ($(this).hasClass('headerclick_taisyo')) {
                    $("#ctl00_imgOther2_select").css('display', 'none');
                    $("#ctl00_imgTaisho2_select").css('display', 'block');
                    $("#ctl00_imgSort2_select").css('display', 'none');
                    $("#ctl00_sibori2_select").css('display', 'none');
                    pHeight = 425;
                    pWidth = 475;
                    pZindex = 1100;

                } else if ($(this).hasClass('headerclick_joken')) {
                    $("#ctl00_imgOther2_select").css('display', 'none');
                    $("#ctl00_imgTaisho2_select").css('display', 'none');
                    $("#ctl00_imgSort2_select").css('display', 'none');
                    $("#ctl00_sibori2_select").css('display', 'block');
                    pHeight = 550;
                    pWidth = 900;
                    pZindex = 1100;

                } else if ($(this).hasClass('headerclick_sort')) {
                    $("#ctl00_imgOther2_select").css('display', 'none');
                    $("#ctl00_imgTaisho2_select").css('display', 'none');
                    $("#ctl00_imgSort2_select").css('display', 'block');
                    $("#ctl00_sibori2_select").css('display', 'none');
                    pHeight = 630;
                    pWidth = 800;
                    pZindex = 1100;

                } else {
                    url = url.replace("SG90010", "SG90160");
                    $("#ctl00_imgOther2_select").css('display', 'block');
                    $("#ctl00_imgTaisho2_select").css('display', 'none');
                    $("#ctl00_imgSort2_select").css('display', 'none');
                    $("#ctl00_sibori2_select").css('display', 'none');
                    pHeight = 630;
                    pWidth = 800;
                    pZindex = 600;
                }

                $("#sibori3").attr("href", "./SG90192.aspx");

                // 2016/03/24 add start 仕様課題No.11 拡大チップ対応
                // 2017/11/08 mod start U-Car_SPM車検画面対応
                //} else if (((main.indexOf("SG40020") >= 0) || (main.indexOf("SG40040") >= 0) || (main.indexOf("SG40060") >= 0) || (main.indexOf("SG40080") >= 0) ||
                //            (main.indexOf("SG40100") >= 0) || (main.indexOf("SG40110") >= 0) || (main.indexOf("SG40120") >= 0) || (main.indexOf("SG40130") >= 0)) && $('#square').length == 0) {
            } else if (((main.indexOf("SG40020") >= 0) || (main.indexOf("SG40040") >= 0) || (main.indexOf("SG40060") >= 0) || (main.indexOf("SG40080") >= 0) ||
                        (main.indexOf("SG40100") >= 0) || (main.indexOf("SG40110") >= 0) || (main.indexOf("SG40120") >= 0) || (main.indexOf("SG40130") >= 0) ||
                        (main.indexOf("SG40140") >= 0) || (main.indexOf("SG40150") >= 0)) && $('#square').length == 0) {
                // 2017/11/08 mod end
                // 2016/03/24 add end

                if ($(this).hasClass('headerclick_taisyo')) {
                    $("#ctl00_imgOther_select").css('display', 'none');
                    $("#ctl00_imgTaisho_select").css('display', 'block');
                    $("#ctl00_sibori_select").css('display', 'none');
                    pHeight = 425;
                    pWidth = 475;
                    pZindex = 1100;

                } else if ($(this).hasClass('headerclick_joken')) {
                    $("#ctl00_imgOther_select").css('display', 'none');
                    $("#ctl00_imgTaisho_select").css('display', 'none');
                    $("#ctl00_sibori_select").css('display', 'block');
                    pHeight = 550;
                    pWidth = 900;
                    pZindex = 1100;

                } else {
                    url = url.replace("SG90010", "SG90160");
                    $("#ctl00_imgOther_select").css('display', 'block');
                    $("#ctl00_imgTaisho_select").css('display', 'none');
                    $("#ctl00_sibori_select").css('display', 'none');
                    pHeight = 630;
                    pWidth = 800;
                    pZindex = 600;
                }

                $("#sibori").attr("href", "./SG90192.aspx");

            } else if (((main.indexOf("SG50030") >= 0) || (main.indexOf("SG50130") >= 0)) && $('#square').length == 0) {

                if ($(this).hasClass('headerclick_taisyo')) {
                    $("#ctl00_imgOther2_select").css('display', 'none');
                    $("#ctl00_imgTaisho2_select").css('display', 'block');
                    $("#ctl00_imgSort2_select").css('display', 'none');
                    $("#ctl00_sibori2_select").css('display', 'none');
                    pHeight = 425;
                    pWidth = 475;
                    pZindex = 1100;

                } else if ($(this).hasClass('headerclick_joken')) {
                    $("#ctl00_imgOther2_select").css('display', 'none');
                    $("#ctl00_imgTaisho2_select").css('display', 'none');
                    $("#ctl00_imgSort2_select").css('display', 'none');
                    $("#ctl00_sibori2_select").css('display', 'block');
                    pHeight = 550;
                    pWidth = 900;
                    pZindex = 1100;
                    if ((main.indexOf("SG50130") >= 0)) {
                        pHeight = 570;
                    }

                } else if ($(this).hasClass('headerclick_sort')) {
                    $("#ctl00_imgOther2_select").css('display', 'none');
                    $("#ctl00_imgTaisho2_select").css('display', 'none');
                    $("#ctl00_imgSort2_select").css('display', 'block');
                    $("#ctl00_sibori2_select").css('display', 'none');
                    pHeight = 630;
                    pWidth = 800;
                    pZindex = 1100;

                } else {
                    url = url.replace("SG90010", "SG90160");
                    $("#ctl00_imgOther2_select").css('display', 'block');
                    $("#ctl00_imgTaisho2_select").css('display', 'none');
                    $("#ctl00_imgSort2_select").css('display', 'none');
                    $("#ctl00_sibori2_select").css('display', 'none');
                    pHeight = 630;
                    pWidth = 800;
                    pZindex = 600;
                }

                $("#sibori3").attr("href", "./SG90192.aspx");

            } else if (((main.indexOf("SG50020") >= 0) || (main.indexOf("SG50120") >= 0) || (main.indexOf("SG50040") >= 0) || (main.indexOf("SG50140") >= 0)) && $('#square').length == 0) {

                if ($(this).hasClass('headerclick_taisyo')) {
                    $("#ctl00_imgOther_select").css('display', 'none');
                    $("#ctl00_imgTaisho_select").css('display', 'block');
                    $("#ctl00_sibori_select").css('display', 'none');
                    pHeight = 425;
                    pWidth = 475;
                    pZindex = 1100;

                } else if ($(this).hasClass('headerclick_joken')) {
                    $("#ctl00_imgOther_select").css('display', 'none');
                    $("#ctl00_imgTaisho_select").css('display', 'none');
                    $("#ctl00_sibori_select").css('display', 'block');
                    pHeight = 550;
                    pWidth = 900;
                    pZindex = 1100;
                    if ((main.indexOf("SG50120") >= 0 || main.indexOf("SG50140") >= 0)) {
                        pHeight = 570;
                    }

                } else {
                    url = url.replace("SG90010", "SG90160");
                    $("#ctl00_imgOther_select").css('display', 'block');
                    $("#ctl00_imgTaisho_select").css('display', 'none');
                    $("#ctl00_sibori_select").css('display', 'none');
                    pHeight = 630;
                    pWidth = 800;
                    pZindex = 600;
                }

                $("#sibori").attr("href", "./SG90192.aspx");


            } else {
                //その他の画面　または、初回起動ではない場合（すでにポップアップが出ている）
                pHeight = objLink.attr('h');

                pWidth = objLink.attr('w');

                pZindex = objLink.attr('z');

                // ヘッダーテキストから開いた場合はフッターを無効にする
                if ($(this).hasClass('headerclick_taisyo') || $(this).hasClass('headerclick_jyoken') || $(this).hasClass('headerclick_sort')) {
                    pZindex = 1100;
                }

                if ($('#square').length == 0) {

                    $("#ctl00_imgOther_select").css('display', 'none');
                    $("#ctl00_imgTaisho_select").css('display', 'block');
                    $("#ctl00_sibori_select").css('display', 'none');
                }
            }
        } else if ((url.indexOf("SG90240") >= 0) && $('#square').length == 0) {

            pHeight = 670;
            pWidth = 1200;
            pZindex = 600;

            $("#ctl00_imgOther_select").css('display', 'none');
            $("#ctl00_imgTaisho_select").css('display', 'block');
            $("#ctl00_sibori_select").css('display', 'none');

            //2015/10/15 addstart ヘルプ画面を開くときに画面の大きさを設定する
        } else if (url.indexOf("SG80010") >= 0) {
            var main = window.location.href;
            if (main.indexOf("SG10020") >= 0) {
                pHeight = 415;
                pWidth = 480;
                pZindex = 600;
            } else if (main.indexOf("SG10040") >= 0) {
                if (trialKbn === KBN_TRIAL) {
                    pHeight = 673;
                    pWidth = 850;
                    pZindex = 600;
                }
                else {
                    pHeight = 485;
                    pWidth = 540;
                    pZindex = 600;
                }
            } else if (main.indexOf("SG20010") >= 0) {
                pHeight = 460;
                pWidth = 920;
                pZindex = 600;
            } else if (main.indexOf("SG20050") >= 0 || main.indexOf("SG20060") >= 0 || main.indexOf("SG20090") >= 0) {
                pHeight = 560;
                pWidth = 822;
                pZindex = 600;
            } else if (main.indexOf("SG20020") >= 0 || main.indexOf("SG20030") >= 0 || main.indexOf("SG20080") >= 0) {
                pHeight = 660;
                pWidth = 390;
                pZindex = 600;
            } else if (main.indexOf("SG20100") >= 0) {
                pHeight = 660;
                pWidth = 520;
                pZindex = 600;
            } else if (main.indexOf("SG20110") >= 0) {
                pHeight = 660;
                pWidth = 520;
                pZindex = 600;
            } else if (main.indexOf("SG20210") >= 0) {
                pHeight = 660;
                pWidth = 510;
                pZindex = 600;
                //U-Car SPM：2017/11/30 mod start
                //} else if (main.indexOf("SG30020") >= 0) {
            } else if (main.indexOf("SG30020") >= 0 || main.indexOf("SG30120")) {
                //U-Car SPM：2017/11/30 mod end
                pHeight = 625;
                pWidth = 395;
                pZindex = 600;
            } else if (main.indexOf("SG40010") >= 0) {
                pHeight = 560;
                pWidth = 395;
                pZindex = 600;
                //2017/11/08 mod start U-Car_SPM車検画面対応
            } else if (main.indexOf("SG40020") >= 0 || main.indexOf("SG40040") >= 0 || main.indexOf("SG40060") >= 0 || main.indexOf("SG40080") >= 0 || main.indexOf("SG40140") >= 0) {
                //2017/11/08 mod end
                pHeight = 400;
                pWidth = 395;
                pZindex = 600;
            } else if (main.indexOf("SG50020") >= 0) {
                pHeight = 300;
                pWidth = 390;
                pZindex = 600;
            } else if (main.indexOf("SG50120") >= 0) {
                pHeight = 590;
                pWidth = 390;
                pZindex = 600;
            } else {
                pHeight = objLink.attr('h');
                pWidth = objLink.attr('w');
                pZindex = objLink.attr('z');
            }


            //2015/10/15 add end

            //2017/09/22 mod start
        } else if (window.location.href.indexOf("SG300") >= 0) {
            //その他の画面　または、初回起動ではない場合（すでにポップアップが出ている）
            pHeight = objLink.attr('h');

            pWidth = objLink.attr('w');

            pZindex = objLink.attr('z');

            if ($('#square').length == 0) {

                $("#ctl00_imgOther_select").css('display', 'none');
                $("#ctl00_imgTaisho_select").css('display', 'block');
                $("#ctl00_sibori_select").css('display', 'none');
            }

            $("#sibori").attr("href", "./SG90192.aspx");

            //2018/01/18 add start 本部管理納期CS_U-Car違反切符
        } else if (window.location.href.indexOf("SG301") >= 0) {
            //その他の画面　または、初回起動ではない場合（すでにポップアップが出ている）
            pHeight = objLink.attr('h');

            pWidth = objLink.attr('w');

            pZindex = objLink.attr('z');

            if ($('#square').length == 0) {

                $("#ctl00_imgOther_select").css('display', 'none');
                $("#ctl00_imgTaisho_select").css('display', 'block');
                $("#ctl00_sibori_select").css('display', 'none');
            }

            $("#sibori").attr("href", "./SG90192.aspx");
            //2018/01/18 mod end

            //2017/09/22 mod end
            //2017/09/28 add start 本部管理(納期CS)
        } else if (url.indexOf("SG90200") >= 0) {
            pHeight = 650;

            pWidth = 1000;

            pZindex = 700;

            //if ($('#square').length == 0) {

            //    $("#ctl00_imgOther_select").css('display', 'none');
            //    $("#ctl00_imgTaisho_select").css('display', 'block');
            //    $("#ctl00_sibori_select").css('display', 'none');
            //}

            //2017/09/28 add end 本部管理(納期CS)
        } else {
            //その他の画面　または、初回起動ではない場合（すでにポップアップが出ている）
            pHeight = objLink.attr('h');

            pWidth = objLink.attr('w');

            pZindex = objLink.attr('z');

            if ($('#square').length == 0) {

                $("#ctl00_imgOther_select").css('display', 'none');
                $("#ctl00_imgTaisho_select").css('display', 'block');
                $("#ctl00_sibori_select").css('display', 'none');
            }
        }

        //ポップアップを連続で開く場合、前のポップアップを一回閉じる処理
        if ($('#gray,#popup,#square').length > 0) {

            $('#gray,#popup,#square')
           .fadeOut("fast")
           .remove();
        }

        //要素を作成
        var close;
        var addMethod = '';
        if (url.indexOf("SG90040") >= 0 || url.indexOf("SG90041") >= 0) {
            // サイトマップ
            close = "'#ctl00_btnClose_siteMap'";

        } else if (url.indexOf("SG80010") >= 0) {
            // ヘルプ
            close = "'#h_close'";

        } else if (url.indexOf("SG90100") >= 0) {
            // お客様情報
            close = "'#btnClose_4'";

        } else if (url.indexOf("SG90140") >= 0) {
            // 検索結果
            close = "'#ctl00_btnClose_search'";
            addMethod = "$('#noukics_edit').css('display', 'none');$('#hyoujiPopup4', parent.document).css('display', 'block');$('#ctl00_showSearch').val('');";


        } else if (url.indexOf("SG90180") >= 0) {
            // 納期CSai21リスト未入金額
            close = "'#btnClose_3'";

        } else if (url.indexOf("SG90010") >= 0 || url.indexOf("SG90020") >= 0 || url.indexOf("SG90031") >= 0 ||
                   url.indexOf("SG90160") >= 0 || url.indexOf("SG90170") >= 0 ||
                   url.indexOf("SG90190") >= 0 || url.indexOf("SG90192") >= 0 || url.indexOf("SG90240") >= 0) {
            // 各種条件設定
            close = "'#ctl00_btnClose'";
        } else {
            // ポップアップ画面
            close = "'#Span27'";
        }

        // 2017/11/09 add start 試行店対応
        // 2018/03/07 mod start 新SPM 詳細画面表示対応
        // 試行店対応
        if ((trialKbn === KBN_TRIAL && (location.href.indexOf('SG10040') >= 0 || location.href.indexOf('SG10070') >= 0)) ||
            IsTrialScreen) {
        // 2018/03/07 mod end 新SPM 詳細画面表示対応
            // グレー背景部分を選択しても閉じるイベントは生起しない
            $('<div id="gray" class="gray_panel"></div>').appendTo($('#main'));
            $('<div id="square"><iframe id="popup" name="popup"></iframe></div>').appendTo($('#main')).css('display', 'none');

        } else {
            $('<div id="gray" class="gray_panel" onclick="' + addMethod + '$(' + close + ').click();"></div>').appendTo($('#main'));
            $('<div id="square"><iframe id="popup" name="popup"></iframe></div>').appendTo($('#main'))
            .css('display', 'none');
        }
        // 2017/11/09 add end 試行店対応

        //ポップアップの幅を指定
        $('#square').width(pWidth);
        $('#square').height(pHeight);
        $('#popup').width(pWidth);
        $('#popup').height(pHeight);

        $('#gray').css('z-index', pZindex);
        $('#square').css('z-index', parseInt(pZindex) + 1);

        //2015/10/14 add start
        //ヘルプポップアップの場合、画面左下に表示
        if (url.indexOf("SG80010") >= 0) {
            //ポップアップを画面右下位置になるよう、位置関係を算出
            var leftposition = ((($(window).width() - $("#square").width()) / $(window).width()) * 100);
            var topposition = ((($(window).height() - $("#square").height()) / $(window).height()) * 100)

            //ポップアップを画面右下位置になるよう、縦横のマージンを算出
            var leftmargin = 10;
            var topmargin = 65;


            //グレー背景をフェードインで表示
            $('#gray')
             .fadeIn("fast")
             .css("display", "block");
            //ポップアップ表示領域のスタイル定義
            $('#square')
             .fadeIn("fast")
             .css({
                 "position": "fixed",
                 "bottom": "0px",
                 "right": "0px",
                 "display": "block",
                 "overflow": "hidden",
                 "margin-right": leftmargin,
                 "margin-bottom": topmargin,
                 "border-radius": "20px"
             });
            $('#popup')
             //ポップアップ内に外部ファイルを読み込む
             .attr('src', url)
             .css({
                 "position": "fixed",
                 "bottom": "0%",
                 "right": "0%",
                 "display": "block",
                 "overflow": "hidden",
                 "margin-right": leftmargin,
                 "margin-bottom": topmargin,
                 "border-radius": "20px"
             });

        } else {
            if ($(this).hasClass('headerclick_taisyo')) {
                //2016/05/12 add start

                $("#ctl00_imgOther_select").css('display', 'none');
                $("#ctl00_imgTaisho_select").css('display', 'block');
                $("#ctl00_sibori_select").css('display', 'none');

                //ポップアップを画面左上位置になるよう、位置関係を算出
                var leftposition = ((($(window).width() - $("#square").width()) / $(window).width()) * 100);
                var topposition = ((($(window).height() - $("#square").height()) / $(window).height()) * 100)

                //ポップアップを画面左上位置になるよう、縦横のマージンを算出
                var leftmargin = 10;
                var topmargin = 65;


                //グレー背景をフェードインで表示
                $('#gray')
                 .fadeIn("fast")
                 .css("display", "block");
                //ポップアップ表示領域のスタイル定義
                $('#square')
                 .fadeIn("fast")
                 .css({
                     "position": "fixed",
                     "top": "0px",
                     "left": "0px",
                     "display": "block",
                     "overflow": "hidden",
                     "margin-left": leftmargin,
                     "margin-top": topmargin,
                     "border-radius": "20px"
                 });
                $('#popup')
                 //ポップアップ内に外部ファイルを読み込む
                 .attr('src', url)
                 .css({
                     "position": "fixed",
                     "top": "0%",
                     "left": "0%",
                     "display": "block",
                     "overflow": "hidden",
                     "margin-left": leftmargin,
                     "margin-top": topmargin,
                     "border-radius": "20px"
                 });
            } else if ($(this).hasClass('headerclick_joken')) {

                $("#ctl00_imgOther_select").css('display', 'none');
                $("#ctl00_imgTaisho_select").css('display', 'none');
                $("#ctl00_sibori_select").css('display', 'block');

                //ポップアップを画面右上位置になるよう、位置関係を算出
                var leftposition = ((($(window).width() - $("#square").width()) / $(window).width()) * 100);
                var topposition = ((($(window).height() - $("#square").height()) / $(window).height()) * 100)

                //ポップアップを画面右上位置になるよう、縦横のマージンを算出
                var leftmargin = 10;
                var topmargin = 60;


                //グレー背景をフェードインで表示
                $('#gray')
                 .fadeIn("fast")
                 .css("display", "block");
                //ポップアップ表示領域のスタイル定義
                $('#square')
                 .fadeIn("fast")
                 .css({
                     "position": "fixed",
                     "top": "0px",
                     "right": "0px",
                     "display": "block",
                     "overflow": "hidden",
                     "margin-right": leftmargin,
                     "margin-top": topmargin,
                     "border-radius": "20px"
                 });
                $('#popup')
                 //ポップアップ内に外部ファイルを読み込む
                 .attr('src', url)
                 .css({
                     "position": "fixed",
                     "top": "0%",
                     "right": "0%",
                     "display": "block",
                     "overflow": "hidden",
                     "margin-right": leftmargin,
                     "margin-top": topmargin,
                     "border-radius": "20px"
                 });
            } else if ($(this).hasClass('headerclick_sort')) {

                $("#ctl00_imgOther2_select").css('display', 'none');
                $("#ctl00_imgTaisho2_select").css('display', 'none');
                $("#ctl00_imgSort2_select").css('display', 'block');
                $("#ctl00_sibori2_select").css('display', 'none');

                //ポップアップを画面右上位置になるよう、位置関係を算出
                var leftposition = ((($(window).width() - $("#square").width()) / $(window).width()) * 100);
                var topposition = ((($(window).height() - $("#square").height()) / $(window).height()) * 100)

                //ポップアップを画面右上位置になるよう、縦横のマージンを算出
                var leftmargin = 10;
                var topmargin = 60;


                //グレー背景をフェードインで表示
                $('#gray')
                 .fadeIn("fast")
                 .css("display", "block");
                //ポップアップ表示領域のスタイル定義
                $('#square')
                 .fadeIn("fast")
                 .css({
                     "position": "fixed",
                     "top": "0px",
                     "right": "0px",
                     "display": "block",
                     "overflow": "hidden",
                     "margin-right": leftmargin,
                     "margin-top": topmargin,
                     "border-radius": "20px"
                 });
                $('#popup')
                 //ポップアップ内に外部ファイルを読み込む
                 .attr('src', url)
                 .css({
                     "position": "fixed",
                     "top": "0%",
                     "right": "0%",
                     "display": "block",
                     "overflow": "hidden",
                     "margin-right": leftmargin,
                     "margin-top": topmargin,
                     "border-radius": "20px"
                 });
                //2016/05/12 add end
            } else {
                //ポップアップを画面中央位置になるよう、位置関係を算出
                var leftposition = Math.floor(($(window).width() - $("#square").width()) / 2);
                var topposition = Math.floor(($(window).height() - $("#square").height()) / 2)

                //ポップアップを画面中央位置になるよう、縦横のマージンを算出
                var leftmargin = ($("#square").width() / 2) * -1;
                var topmargin = ($("#square").height() / 2) * -1;

                var borderRadius = "20px";
                // 試行店対応ではPopupの角を丸くしない
                if (trialKbn === KBN_TRIAL || IsTrialScreen) {
                    borderRadius = "0px";
                }

                //グレー背景をフェードインで表示
                $('#gray')
                 .fadeIn("fast")
                 .css("display", "block");
                //ポップアップ表示領域のスタイル定義
                $('#square')
                 .fadeIn("fast")
                 .css({
                     "position": "fixed",
                     "top": "50%",
                     "left": "50%",
                     "display": "block",
                     "overflow": "hidden",
                     "margin-left": leftmargin,
                     "margin-top": topmargin,
                     "border-radius": borderRadius
                 });
                $('#popup')
                         //ポップアップ内に外部ファイルを読み込む
                 .attr('src', url)
                 .css({
                     "position": "fixed",
                     "top": "50%",
                     "left": "50%",
                     "display": "block",
                     "overflow": "hidden",
                     "margin-left": leftmargin,
                     "margin-top": topmargin,
                     "border-radius": borderRadius
                 });
            }
        }
        //2015/10/14 add end



        //条件検索のボタンをセレクト表示
        if (url != '') {

            $("[id *='pnlType']").css('display', 'none');

            var myurl = url.split('/');
            var flink = myurl.pop();
            // DHC一時対応　2018/12/10　start
            //var name = flink.split('.');
            var name = flink.split('?');
            // DHC一時対応　2018/12/10　end
            var id = name[0];

            $("img[id $= '" + id + "_select']").css('display', 'block');
            $(this).find("img[id $= 'select']").css('display', 'block');


            //＊＊＊＊＊　　各ポップアップによって表示するフッターを指定している　　＊＊＊＊＊＊＊

            if (id == "SG90050" || id == "SG90060" || id == "SG90070" || id == "SG90090" || id == "SG90130" || id == "SG90070" || id == "SG90080") {

                $("#kokyaku_Popup").css('display', 'block');

                $("[id *='pnlType']").css('display', 'none');

                if ($("div[name='pnlMain_2']").css('display') == "block") {

                    $("div[name='pnlMain_1']").css("display", "none");

                } else {

                    var url = window.location.href;

                    $("div[name *='pnlMain']").css("display", "none");

                    $("div[name='pnlMain_1']").css("display", "block");


                }

                $("#pnlType7").css('display', 'block');

                // 2016/02/25 add start
                // 2016/05/09 add start
                //if (id == "SG90070" && location.href.indexOf("SG4") >= 0) {
                //if ((id == "SG90050" || id == "SG90070") && location.href.indexOf("SG4") >= 0) {
                if ((id == "SG90050") && location.href.indexOf("SG4") >= 0) {
                    // 2016/05/09 add end  
                    $("#pnlType7").css('display', 'none');
                    $("#pnlType20").css('display', 'block');
                }
                // 2016/02/25 add end

            }

            //STEP2の時はコメントアウト解除
            //STEP2 活動にて断念・受注を入力できるよう対応

            // 2016/05/09 add start
            //if (id == "SG90060") {
            if ((id == "SG90050") && location.href.indexOf("SG2") >= 0) {
                // 2016/05/09 add end

                var n = location.href;

                $("[id *='pnlType']").css('display', 'none');

                if (n.indexOf("SG2") >= 0) {

                    $("#pnlType12").css('display', 'block');

                } else {

                    $("#pnlType7").css('display', 'block');
                }

                //$("[id *='pnlType']").css('display', 'none');


                //    $("[id *='pnlType']").css('display', 'none');

                //    if (getlink !== undefined) {

                //        if (getlink.indexOf("kb_area") >= 0) {

                //            if (getlink.indexOf("kb_area=0") >= 0) {

                //                $("#pnlType12").css('display', 'block');
                //            } else {

                //                $("#pnlType7").css('display', 'block');
                //            }
                //        } else {

                //            $("#pnlType12").css('display', 'block');
                //        }


                //    } else {

                //        $("#pnlType12").css('display', 'block');
                //    }

                //}
            }

            //2016/02/15 add start
            //保険ポップアップ　フッター「長期客フォロー」・「保険断念」ボタン対応
            if (id == "SG90080") {

                var n = location.href;

                $("[id *='pnlType']").css('display', 'none');

                if (n.indexOf("SG500") >= 0) {  //保険新規

                    $("#pnlType18").css('display', 'block');

                } else if (n.indexOf("SG501") >= 0) {   //保険継続

                    $("#pnlType19").css('display', 'block');

                } else {

                    $("#pnlType7").css('display', 'block');
                }

            }
            //2016/02/15 add end

            //STEP2の時はコメントアウト解除
            //STEP2 活動にて断念・受注を入力できるよう対応

            if (id == "SG90100" || id == "SG90120") {


                $("[id *='pnlType']").css('display', 'none');

                if (id == "SG90100") {

                    if (url.indexOf("kb_kotei") >= 0) {

                        $("#pnlType10").css('display', 'block');
                    } else {

                        $("#pnlType1").css('display', 'block');
                    }

                } else {

                    if (id == "SG90120") {

                        $("#pnlType2").css('display', 'block');

                    } else {

                        $("#pnlType1").css('display', 'block');
                    }
                }

                $("#kokyaku_Popup").css('display', 'block');

                if ($("div[name='pnlMain_2']").css('display') == "block") {

                    $("div[name='pnlMain_1']").css("display", "none");

                } else {


                    var url = window.location.href;

                    $("div[name *='pnlMain']").css("display", "none");

                    $("div[name='pnlMain_1']").css("display", "block");
                }


                var url = window.location.href;

                //$("div[name *='pnlMain']").css("display", "none");

                //if (url.indexOf("SG3") >= 0 || url.indexOf("SG1") >= 0) {

                //    $("div[name='pnlMain_1']").css("display", "block");

                //} else if (url.indexOf("SG2") >= 0) {

                //$("div[name='pnlMain_2']").css("display", "block");
                //}

            }

            if (id == "SG90150") {

                // $("[id *='pnlType']", parent.document).css('display', 'none');

                $("#kokyaku_Popup").css('display', 'block');

                $("[id *='pnlType']").css('display', 'none');


                if ($("div[name='pnlMain_2']").css('display') == "block") {

                    $("div[name='pnlMain_1']").css("display", "none");

                    $("#SG90150_select").css("display", "block");

                } else {

                    var url = window.location.href;

                    $("div[name *='pnlMain']").css("display", "none");

                    $("div[name='pnlMain_1']").css("display", "block");
                }

                $("#pnlType7").css('display', 'block');

                //$("#tuuti").css("display", "block");

                // $("#kokyaku_Popup").css('display', 'none');



                //$("div[name='pnlMain_1']").css("display", "none");


                //$("#t01_select").css("display", "block");


            }

            if (id == "SG90220") {

                $("#kokyaku_Popup").css('display', 'block');

                $("[id *='pnlType']").css('display', 'none');


                if ($("div[name='pnlMain_2']").css('display') == "block") {

                    $("div[name='pnlMain_1']").css("display", "none");

                    $("#SG90150_select").css("display", "block");

                } else {

                    var url = window.location.href;

                    $("div[name *='pnlMain']").css("display", "none");

                    $("div[name='pnlMain_1']").css("display", "block");
                }

                // 2017/09/04 mod start Eメール対応
                //$("#pnlType13").css('display', 'block');
                $("#pnlType17").css('display', 'block');
                // 2017/09/04 mod end Eメール対応

            }

            // 2015/9/15 add start
            if (id == "SG90210") {

                $("#pnlType1", parent.document).css('display', 'none');
                $("#pnlType2", parent.document).css('display', 'none');
                $("#pnlType3_1", parent.document).css('display', 'none');
                $("#pnlType3_2", parent.document).css('display', 'none');
                $("#pnlType4", parent.document).css('display', 'none');
                $("#pnlType7", parent.document).css('display', 'none');
                $("#pnlType8", parent.document).css('display', 'none');
                $("#pnlType9", parent.document).css('display', 'none');
                $("#pnlType10", parent.document).css('display', 'none');
                $("#pnlType11", parent.document).css('display', 'none');
                $("#pnlType12", parent.document).css('display', 'none');
                $("#pnlType13", parent.document).css('display', 'none');
                $("#pnlType14", parent.document).css('display', 'none');
                $("#pnlType15", parent.document).css('display', 'none');
                // 2015/10/09 add start 課題69対応
                $("#pnlType17", parent.document).css('display', 'none');
                // 2015/10/09 add end 課題69対応

                // 2017/09/05 mod start Eメール対応のため、復活
                // 2015/12/21 del start
                if (url.indexOf("kb_sumi=1") >= 0) {
                    $("#pnlType15", parent.document).css('display', 'block');
                } else {
                    $("#pnlType14", parent.document).css('display', 'block');
                }

                // 2015/12/21 del end
                // 2015/12/21 add start
                //$("#pnlType14", parent.document).css('display', 'block');
                // 2015/12/21 add end
                // 2017/09/05 mod end

            }
            // 2015/9/15 add end

            if (id == "SG90180") {

                //$("#ai21minyuukin").css('display', 'none');
                $("#pnlMinyukin").css('display', 'block');
            }

            if (id == "SG90200") {

                $("#pnlType1", parent.document).css('display', 'none');
                $("#pnlType2", parent.document).css('display', 'none');
                $("#pnlType3_1", parent.document).css('display', 'none');
                $("#pnlType3_2", parent.document).css('display', 'none');
                $("#pnlType4", parent.document).css('display', 'none');
                $("#pnlType7", parent.document).css('display', 'none');
                $("#pnlType8", parent.document).css('display', 'none');
                $("#pnlType9", parent.document).css('display', 'none');
                $("#pnlType10", parent.document).css('display', 'none');
                // 2015/9/15 add start
                $("#pnlType11", parent.document).css('display', 'none');
                $("#pnlType12", parent.document).css('display', 'none');
                $("#pnlType13", parent.document).css('display', 'none');
                $("#pnlType14", parent.document).css('display', 'none');
                $("#pnlType15", parent.document).css('display', 'none');
                // 2015/9/15 add end
                // 2015/10/09 add start 課題69対応
                $("#pnlType17", parent.document).css('display', 'none');
                // 2015/10/09 add end 課題69対応

                //配送の時
                if (url.indexOf("?txtid=04&koteikbn=60") >= 0) {

                    $("#pnlType8", parent.document).css('display', 'block');

                } else {

                    if ($('#k_type').val() == "1") {

                        $("[id *='pnlType']", parent.document).css('display', 'none');

                        //if ($('#hidType').val() == "1") {

                        //    $("#pnlType3_2", parent.document).css('display', 'block');

                        //} else {

                        $("#pnlType3_1", parent.document).css('display', 'block');
                        //}
                    } else {

                        $("#pnlType4", parent.document).css('display', 'block');
                    }
                }

            }

            if (id == "SG90110") {

                //$("#pnlType1", parent.document).css('display', 'none');
                //$("#pnlType2", parent.document).css('display', 'none');
                //$("#pnlType3", parent.document).css('display', 'none');
                //$("#pnlType4", parent.document).css('display', 'none');

                $("[id *='pnlType']", parent.document).css('display', 'none');

                $("#pnlType6", parent.document).css('display', 'block');
            }

        }




        //条件検索フッター表示


        var main_url = window.location;
        var main_path = main_url.href.split('/');
        var main_file_name = main_path.pop();
        // DHC一時対応　2018/12/10　start
        //var main_name = main_file_name.split('.');
        var main_name = main_file_name.split('?');
        // DHC一時対応　2018/12/10　end
        var main_id = main_name[0];

        var backName = '';
        var left;
        var top;
        //U-Car SPM：2017/11/30 add start
        var fontsize;
        //U-Car SPM：2017/11/30 add end

        var lblName = "";
        var PopUrl = "";
        var p_h = "";
        var p_w = "";
        var p_z = "";
        var p_name = "";

        // 2017/11/09 add start 試行店対応
        // かんばんポスト画面を開いた時のフッター制御など
        // 2018/03/07 mod start 新SPM 詳細画面表示対応
        // 2017/11/30 mod start 試行店対応
        if ((IsTrialScreen) ||
            (trialKbn === KBN_TRIAL && (main_id === 'SG10040' || main_id === 'SG10070') && poplink.indexOf(TRIAL_URL.CUSTOMER_INFO) >= 0)) {
            // 2017/11/30 mod end 試行店対応
        // 2018/03/07 mod end 新SPM 詳細画面表示対応
            // フッター内を非表示
            $("[id *='pnlType']").css('display', 'none');
            $("#kokyaku_Popup").css('display', 'none');
            $("#postFooter").css('display', 'none');
            $('#toukatu').css('display', 'none');
            $('#topmenu').css('display', 'none');
            $('#pnlSearch').css('display', 'none');
            $('#noukics_edit').css('display', 'none');

            // ローディング処理消す
            $(".loadingWrap").hide();
            $(".loadingImage").hide();

            // 2017/12/07 add start Neo連携 試行店対応
            // ヘッダー部分を無効に切り替える
            $('.spm_head').addClass('hedder_event_none');
            $('#ctl00_imgSpm').addClass('hedder_event_none');
            $('#ctl00_imgBack').addClass('hedder_event_none');
            // 2017/12/07 add end Neo連携 試行店対応

            return false;
        }
        // 2017/11/09 add end 試行店対応

        if (main_id == "SG30010") {

            //U-Car SPM：2017/12/01 mod start
            backName = '納期CS<br>TOP(新車)';
            left = 15;
            top = 13;
            fontsize = 10;
            //U-Car SPM：2017/12/01 mod end

            lblName = "ソート<br/>条件";
            popUrl = "SG90031.aspx";

            p_h = "630";
            p_w = "800";
            p_z = "600";

            // p_name = "ctl00_imgOther_select";
        } else if (main_id == "SG30020") {

                backName = 'ｽﾃｲﾀｽ<br>(納期CS)';
                left = 16;
                top = 13;

            lblName = "ソート<br/>条件";
            popUrl = "SG90030.aspx";

            p_h = "630";
            p_w = "1000";
            p_z = "600";

            //   p_name = "ctl00_imgOther_select";

        } else if (main_id == "SG30030") {

            backName = 'ai21<br/>ﾘｽﾄ';
            left = 30;
            top = 13;

            lblName = "ソート<br/>条件";
            //2017/09/22 mod start
            //popUrl = "SG90030.aspx";
            popUrl = "SG90031.aspx";
            //2017/09/22 mod end

            p_h = "630";
            p_w = "1000";
            p_z = "600";
            //U-Car SPM：2017/11/30 del start U-CarSPM要件によりｶﾚﾝﾀﾞｰ削除
            //} else if (main_id == "SG30040") {

            //    backName = '納期CS<br/>向上ﾎﾞｰﾄﾞ';
            //    left = 20;
            //    top = 13;

            //    lblName = "ソート<br/>条件";
            //    popUrl = "SG90030.aspx";

            //    p_h = "630";
            //    p_w = "1000";
            //    p_z = "600";

            //$("#henkou").css("display", "block");
            //$("#sibori").css("display", "block");

            //$("#ctl00_imgOther_select").css('display', 'none');
            //$("#ctl00_imgTaisho_select").css('display', 'block');
            //$("#ctl00_sibori_select").css('display', 'none');

            //    p_name = "ctl00_imgOther_select";
            //U-Car SPM：2017/11/30 del end

            //U-Car SPM：2017/12/01 add start
        } else if (main_id == "SG30110") {

            backName = '納期CS<br>TOP(U-CAR)';
            left = 14;
            top = 16;
            fontsize = 9;

            lblName = "ソート<br/>条件";
            popUrl = "SG90031.aspx";

            p_h = "630";
            p_w = "800";
            p_z = "600";

        } else if (main_id == "SG30120") {

            backName = 'ｽﾃｲﾀｽ';
            left = 25;
            top = 21;

            lblName = "ソート<br/>条件";
            popUrl = "SG90030.aspx";

            p_h = "630";
            p_w = "1000";
            p_z = "600";
            //U-Car SPM：2017/12/01 add end

            } else if (main_id == "SG30050") {

                backName = 'ｽﾃｲﾀｽ<br>(納期案内)';
                left = 10;
                top = 9;

                lblName = "ソート<br/>条件";
                popUrl = "SG90030.aspx";

                p_h = "630";
                p_w = "1000";
                p_z = "600";

                //   p_name = "ctl00_imgOther_select";

            } else if (main_id == "SG10010") {

            backName = "統括";
            //left = 30;
            //top = 20;

            lblName = "表示<br/>変更";
            popUrl = "SG90010.aspx";

            //p_h = "375";
            //p_w = "475";
            //p_z = "600";

            //    p_name = "ctl00_imgTaisho_select";

            $("#sibori").css("display", "none");
            $("#henkou").css("display", "none");

            // 2016/8/22 delete start
            //} else if (main_id == "SG10020") {
            // 2016/8/22 end
            //2016/8/22 add start
        } else if (main_id == "SG10020" && main_url.href.indexOf("SG10020.aspx?type=99") >= 0) {
            //2016/8/22 add end
            backName = "顧客<br>ﾘｽﾄ";
            left = 30;
            top = 15;

            lblName = "絞込<br/>条件";
            // 2015/10/14 del start
            //popUrl = "SG90190.aspx";
            // 2015/10/14 del end
            // 2015/10/14 add start
            popUrl = "SG90192.aspx";
            // 2015/10/14 add end

            // 2015/10/14 del start
            //p_h = "320";
            // 2015/10/14 del end
            // 2015/10/14 add start
            p_h = "420";
            // 2015/10/14 add end
            p_w = "900";
            p_z = "600";

            //    p_name = "ctl00_imgTaisho_select";

            $("#sibori").css("display", "none");
            //$("#henkou").css("display", "none");

            //2016/8/22 add start
        } else if (main_id == "SG10020") {

            backName = "顧客<br>ﾘｽﾄ";
            left = 30;
            top = 15;

            lblName = "ソート<br/>条件";
            popUrl = "SG90031.aspx";

            p_h = "630";
            p_w = "800";
            p_z = "600";

            //2016/8/22 add end
        } else if (main_id == "SG10040") {

            backName = "かんばん<br>ﾎﾟｽﾄ";
            left = 20;
            top = 15;

            lblName = "絞込<br/>条件";
            popUrl = "SG90190.aspx";

            p_h = "320";
            p_w = "900";
            p_z = "600";

            if (id == "SG90010") {
                $("[id=Taisho3]").find("[name $= 'SG90010_select']").last().css('display', 'block');
                $("#sibori2").find("[name $= 'SG90190_select']").last().css('display', 'none');
            } else {
                $("[id=Taisho3]").find("[name $= 'SG90010_select']").last().css('display', 'none');
                $("#sibori2").find("[name $= 'SG90190_select']").last().css('display', 'block');
            }

        } else if (main_id == "SG10060") {

            backName = "フォロー<br>ﾎﾟｽﾄ";
            left = 25;
            top = 15;

            lblName = "絞込<br/>条件";
            popUrl = "SG90192.aspx";

            p_h = "320";
            p_w = "900";
            p_z = "450";
            $("#sibori").css("display", "none");

        } else if (main_id == "SG10070") {

            backName = "フォロー<br>ﾎﾟｽﾄ";
            left = 25;
            top = 15;

            lblName = "絞込<br/>条件";
            popUrl = "SG90192.aspx";

            p_h = "420";
            p_w = "900";
            p_z = "600";
            $("#sibori").css("display", "none");
        } else if (main_id == "SG10050") {

            backName = "比較<br>ﾗﾝｷﾝｸﾞ";
            left = 20;
            top = 15;

            lblName = "比較<br/>対象";
            popUrl = "SG90020.aspx";

            p_h = "520";
            p_w = "900";
            p_z = "600";


            $("#sibori").css("display", "none");
            //$("#henkou").css("display", "none");

            //    p_name = "ctl00_imgTaisho_select";

            // $("#sibori").css("display", "none");
            //$("#henkou").css("display", "none");

        } else if (main_id.indexOf("SG20010") >= 0) {

            backName = "見込客<br>TOP";
            left = 30;
            top = 15;

            //lblName = "接触<br/>頻度";
            lblName = "接触<br/>回数";
            popUrl = "SG90170.aspx";

            p_h = "630";
            p_w = "900";
            p_z = "600";



            $("#mikomi").css("display", "none");

            // 2015/11/30 del start
            //} else if (main_id.indexOf("SG20020") >= 0 || main_id.indexOf("SG20030") >= 0 || main_id.indexOf("SG20040") >= 0) {
            // 2015/11/30 del end
            // 2015/11/30 add start
        } else if (main_id.indexOf("SG20020") >= 0 || main_id.indexOf("SG20030") >= 0 || main_id.indexOf("SG20040") >= 0 || main_id.indexOf("SG20080") >= 0 || main_id.indexOf("SG20100") >= 0) {
            // 2015/11/30 add end


            backName = "新規客<br>ﾌｫﾛｰ";
            left = 30;
            top = 15;

            lblName = "表示<br/>変更";
            popUrl = "SG90160.aspx";

            p_h = "630";
            p_w = "900";
            p_z = "600";

            $("#mikomi").css("display", "none");

            // 2015/11/30 del start
            //} else if (main_id.indexOf("SG20050") >= 0 || main_id.indexOf("SG20060") >= 0 || main_id.indexOf("SG20070") >= 0) {
            // 2015/11/30 del end
            // 2015/11/30 add start
        } else if (main_id.indexOf("SG20050") >= 0 || main_id.indexOf("SG20060") >= 0 || main_id.indexOf("SG20070") >= 0 || main_id.indexOf("SG20090") >= 0 || main_id.indexOf("SG20110") >= 0 || main_id.indexOf("SG20220") >= 0) {
            // 2015/11/30 add end


            // 2015/11/30 del start
            //backName = "代替客<br>ﾌｫﾛｰ";
            // 2015/11/30 del end
            // 2015/11/30 add start
            backName = $("#ctl00_daigaeTitle").val() + "<br>ﾌｫﾛｰ";
            // 2015/11/30 add end
            left = 30;
            top = 15;

            lblName = "表示<br/>変更";
            popUrl = "SG90160.aspx";

            p_h = "630";
            p_w = "900";
            p_z = "600";


            $("#mikomi").css("display", "none");

        } else if (main_id.indexOf("SG2") >= 0) {

            backName = "見込客<br>TOP";
            left = 30;
            top = 15;

            lblName = "表示<br/>変更";
            popUrl = "SG90160.aspx";

            p_h = "630";
            p_w = "900";
            p_z = "600";


            $("#mikomi").css("display", "none");

            // 2016/01/26 add start
            // 2016/01/27 add start
        } else if (main_id.indexOf("SG40010") >= 0) {

            backName = "サービス<br>点検";
            left = 25;
            top = 15;

            lblName = "表示<br/>対象";
            popUrl = "SG90010.aspx";

            $("#ServiceFooter").css("display", "none");
            $("#sibori").css("display", "none");
            $("#henkou").css("display", "none");

            //2016/01/27 add end
        } else if (main_id.indexOf("SG4") >= 0) {

            // 2016/03/24 add start 仕様課題No.11 拡大チップ対応
            //if (main_id.indexOf("SG40020") >= 0 || main_id.indexOf("SG40030") >= 0) {
            if (main_id.indexOf("SG40020") >= 0 || main_id.indexOf("SG40030") >= 0 || main_id.indexOf("SG40100") >= 0) {
                // 2016/03/24 add end
                backName = "1無点";
                left = 30;
                top = 20;
                // 2016/03/24 add start 仕様課題No.11 拡大チップ対応
                //} else if (main_id.indexOf("SG40040") >= 0 || main_id.indexOf("SG40050") >= 0) {
            } else if (main_id.indexOf("SG40040") >= 0 || main_id.indexOf("SG40050") >= 0 || main_id.indexOf("SG40110") >= 0) {
                // 2016/03/24 add end
                backName = "6無点";
                left = 30;
                top = 20;
                // 2016/03/24 add start 仕様課題No.11 拡大チップ対応
                //} else if (main_id.indexOf("SG40060") >= 0 || main_id.indexOf("SG40070") >= 0) {
            } else if (main_id.indexOf("SG40060") >= 0 || main_id.indexOf("SG40070") >= 0 || main_id.indexOf("SG40120") >= 0) {
                // 2016/03/24 add end
                backName = "6点検";
                left = 30;
                top = 20;
                // 2016/03/24 add start 仕様課題No.11 拡大チップ対応
                //} else if (main_id.indexOf("SG40080") >= 0 || main_id.indexOf("SG40090") >= 0) {
            } else if (main_id.indexOf("SG40080") >= 0 || main_id.indexOf("SG40090") >= 0 || main_id.indexOf("SG40130") >= 0) {
                // 2016/03/24 add end
                backName = "12点検";
                left = 25;
                top = 20;
                //2017/11/08 add start U-Car_SPM車検画面対応
            } else if (main_id.indexOf("SG40140") >= 0 || main_id.indexOf("SG40150") >= 0 || main_id.indexOf("SG40160") >= 0) {
                backName = "車検";
                left = 35;
                top = 20;
                //2017/11/08 add end
            } else {
                backName = "サービス<br>点検";
                left = 25;
                top = 13;
            }

            lblName = "表示<br/>変更";
            popUrl = "SG90160.aspx";

            p_h = "630";
            p_w = "900";
            p_z = "600";

            $("#ServiceFooter").css("display", "none");

        } else if (main_id.indexOf("SG50010") >= 0) {

            backName = "保険<br>新規";
            left = 34;
            top = 15;

            lblName = "表示<br/>対象";
            popUrl = "SG90010.aspx";

            $("#HokenSinkiFooter").css("display", "none");
            $("#sibori").css("display", "none");
            $("#henkou").css("display", "none");

        } else if (main_id.indexOf("SG50020") >= 0 || main_id.indexOf("SG50030") >= 0 || main_id.indexOf("SG50040") >= 0) {

            if (main_file_name.indexOf("month=03") >= 0) {
                backName = "新規<br>当月";
                left = 34;
            } else if (main_file_name.indexOf("month=02") >= 0) {
                backName = "新規<br>翌月";
                left = 34;
            } else if (main_file_name.indexOf("month=01") >= 0) {
                backName = "新規<br>翌々月";
                left = 25;
            } else {
                backName = "新規<br>当月";
                left = 34;
            }

            top = 15;

            lblName = "表示<br/>変更";
            popUrl = "SG90160.aspx";

            p_h = "630";
            p_w = "900";
            p_z = "600";

            $("#HokenSinkiFooter").css("display", "none");

        } else if (main_id.indexOf("SG50110") >= 0) {

            backName = "保険<br>継続";
            left = 34;
            top = 15;

            lblName = "表示<br/>対象";
            popUrl = "SG90010.aspx";

            $("#HokenKeizokuFooter").css("display", "none");
            $("#sibori").css("display", "none");
            $("#henkou").css("display", "none");

        } else if (main_id.indexOf("SG50120") >= 0 || main_id.indexOf("SG50130") >= 0 || main_id.indexOf("SG50140") >= 0) {

            if (main_file_name.indexOf("month=03") >= 0) {
                backName = "継続<br>当月";
                left = 34;
            } else if (main_file_name.indexOf("month=02") >= 0) {
                backName = "継続<br>翌月";
                left = 34;
            } else if (main_file_name.indexOf("month=01") >= 0) {
                backName = "継続<br>翌々月";
                left = 25;
            } else {
                backName = "継続<br>当月";
                left = 34;
            }

            top = 15;

            lblName = "表示<br/>変更";
            popUrl = "SG90160.aspx";

            p_h = "630";
            p_w = "900";
            p_z = "600";

            $("#HokenKeizokuFooter").css("display", "none");
            // 2016/01/26 add end
        } else if (poplink.indexOf("SG90250") >= 0) {

            backName = "KPI";
            left = 34;
            top = 20;

            $("#Taisho").attr("href", "");
            $("#Taisho").attr("onclick", "");
            $("#Taisho").removeClass("mybox");

            $("#sibori").css("display", "none");
            $("#henkou").css("display", "none");
            $("[id$=_lblExc]").html("グラフ表示");
            $("[id$=_lblExc]").css("right", "10px");
            $("#square").css("display", "none");

        } else if (main_id.indexOf("SG70030") >= 0) {

            backName = "KPI<br>リスト";
            left = 34;
            top = 15;

            lblName = "データ項目<br/>設定";
            popUrl = "SG90240.aspx";

            $("[id$=lblTaisho]").html(lblName);
            $("[id$=lblTaisho]").css('top', '15px');
            $("[id$=lblTaisho]").css('left', '92px');
            $("[id$=lblTaisho]").css('font-size', '9pt');
            $("#Taisho").attr("href", "");
            $("#Taisho").attr("onclick", "");
            $("#sibori").css("display", "none");
            $("#henkou").css("display", "none");
            $("[id$=_lblExc]").html("データ表示");
            $("[id$=_lblExc]").css("right", "10px");
            //$("#hyoujiPopup").find("[id$=_lblExc]").html("リスト<br/>表示")
            //        .css("font-size", "12pt").css("top", "10px").css("right", "23px").css("line-height","18px");
        } else if (main_id.indexOf("SG70010") >= 0) {

            backName = "KPI";
            left = 34;
            top = 20;

            $("#Taisho").attr("href", "");
            $("#Taisho").attr("onclick", "");
            $("#Taisho").removeClass("mybox");
            $("#sibori").css("display", "none");
            $("#henkou").css("display", "none");
            $("[id$=_lblExc]").parent().css("display", "none");
            $("[id$=_lblClose]").css("right", "22px");


        } else if (main_id == "") {

            lblName = "表示<br/>変更";
            popUrl = "SG90010.aspx";

            p_h = "425";
            p_w = "475";
            p_z = "600";

            //    p_name = "ctl00_imgTaisho_select";

        }


        if ($("div[id='hyoujiPopup3']").css('display') == "block") {
            return false;
        }

        // 2015/10/15 add start
        if ($("div[id='help']").css('display') == "block") {
            return false;
        }
        // 2015/10/15 add end

        // 2015/10/08 del start
        //if (main_id == "SG10040") {
        // 2015/10/08 del end
        // 2015/10/08 add start
        if (main_id == "SG10040" &&
            $("#hyoujiPopup4").css('display') == 'none' &&
            $("#ctl00_showSearch").val() == '') {
            // 2015/10/08 add end

            $("#postFooter").css('display', 'block');
            $("#hyoujiPopup").css('display', 'none');
            //2015/09/23 add start
            $("#hyoujiPopup").css('display', 'none');
            //2015/09/23 add end
            $("#ctl00_lblOther").html(lblName);


            $("#lblBackName").html(backName);
            $("#lblBackName").css('top', top);
            $("#lblBackName").css('left', left);

            $("#lblBackName2").html(backName);
            $("#lblBackName2").css('top', top);
            $("#lblBackName2").css('left', left);

            //2015/09/23 add start
            $("#lblBackName3").html(backName);
            $("#lblBackName3").css('top', top);
            $("#lblBackName3").css('left', left);
            //2015/09/23 add edn

            $("#lblBackName_nouki").html(backName);
            $("#lblBackName_nouki").css('top', top);
            $("#lblBackName_nouki").css('left', left);

            $("#pnlSearch").css('display', 'none');


            if ($("#Other2").length > 0) {

                $("#Other2").attr('href', popUrl);
                $("#Other2").attr('w', p_w);
                $("#Other2").attr('h', p_h);
                $("#Other2  ").attr('z', p_z);
                // $("#" + p_name).css('display', 'block');
            }
        } else {

            if ($("div[name='pnlMain_2']").css('display') == "block") {

                // 2015/10/05 add start
            } else if ($("div[id='hyoujiPopup3']").css('display') == "block") {
                // 2015/10/05 add end

            } else {
                //2015/09/23 mod start
                if (main_id == "SG20040" || main_id == "SG20070") {
                    $("#hyoujiPopup2").css('display', 'block');

                    // 2016/01/26 add start
                    //2017/11/08 mod start U-Car_SPM車検画面対応
                } else if (main_id == "SG40030" || main_id == "SG40050" || main_id == "SG40070" || main_id == "SG40090" || main_id == "SG40160") {
                    //2017/11/08 mod end
                    $("#hyoujiPopup2").css('display', 'block');

                } else if (main_id == "SG50030" || main_id == "SG50130") {
                    $("#hyoujiPopup2").css('display', 'block');
                    // 2016/01/26 add start

                } else {
                    $("#hyoujiPopup").css('display', 'block');
                }
                //2015/09/23 mod start
            }

            $("#postFooter").css('display', 'none');

            $("#ctl00_lblOther").html(lblName);


            $("#lblBackName").html(backName);
            $("#lblBackName").css('top', top);
            $("#lblBackName").css('left', left);
            //U-Car SPM：2017/11/30 add start
            $("#lblBackName").css('font-size', fontsize + 'pt');
            //U-Car SPM：2017/11/30 add end

            //2015/09/23 add start
            $("#lblBackName3").html(backName);
            $("#lblBackName3").css('top', top);
            $("#lblBackName3").css('left', left);
            //2015/09/23 add end

            $("#pnlSearch").css('display', 'none');

            $("#lblBackName_nouki").html(backName);
            $("#lblBackName_nouki").css('top', top);
            $("#lblBackName_nouki").css('left', left);
            $("#lblBackName_nouki").css('font-size', fontsize + 'pt');
            if ("popUrl" in window) {

                if ($("#Other").length > 0) {

                    $("#Other").attr('href', popUrl);
                    $("#Other").attr('w', p_w);
                    $("#Other").attr('h', p_h);
                    $("#Other").attr('z', p_z);
                    // $("#" + p_name).css('display', 'block');
                }

                //2015/09/23 add start
                if ($("#Other3").length > 0) {

                    $("#Other3").attr('href', popUrl);
                    $("#Other3").attr('w', p_w);
                    $("#Other3").attr('h', p_h);
                    $("#Other3").attr('z', p_z);
                    // $("#" + p_name).css('display', 'block');
                }
                //2015/09/23 add end
            }
        }


        //}

        // 2015/10/07 del start イベントのハンドリングが何度も登録されるため、Masterへ移動
        //    $("#cancel").click(function () {

        //        $("#ctl00_alertflag").val('');
        //        $("#cancel").css('display', 'none');
        //        ClosePopup();
        //    });

        //    //ポップアップの閉じる処理

        //    $("[name=backname],[id *='btnClose']").click(function () {

        //        // 2015/10/07 add start
        //        var showFlag;
        //        showFlag = $("#ctl00_showSearch").val();
        //        $("#ctl00_searchAlertflag").val($("#ctl00_alertflag").val())
        //        // 2015/10/07 add end

        //        //2015/09/29 delete start
        //        //if (main_id == "SG10020" || main_id == "SG10040" || main_id == "SG30010" || main_id == "SG30020" || main_id == "SG30030" || main_id.indexOf("SG2") >= 0) {
        //        //2015/09/29 delete end
        //        //2015/09/29 add start ポップアップ以外の全画面でresizeflagを判定するように変更
        //        // 2015/10/07 del start
        //        //if (main_id.indexOf("SG1") >= 0 || main_id.indexOf("SG2") >= 0 || main_id.indexOf("SG3") >= 0) {
        //        // 2015/10/07 del end
        //        // 2015/10/07 add start
        //        if (showFlag == '' && (main_id.indexOf("SG1") >= 0 || main_id.indexOf("SG2") >= 0 || main_id.indexOf("SG3") >= 0)) {
        //            // 2015/10/07 add end
        //            //2015/09/29 add end
        //            if ($('#square').length > 0) {

        //                if ($("#ctl00_alertflag").val() == '1') {

        //                    //$("[id *='pnlType']").css('display', 'none');
        //                    //$("#pnlType1").css('display', 'block');

        //                    $("#cancel").css('display', 'inline');
        //                    return;
        //                }

        //                if ($("#ctl00_resizeflag").val() == '2') {

        //                    $("#ctl00_resizeflag").val('');
        //                    $("#ctl00_btnDummy").click();

        //                    return;
        //                }

        //                if ($("#ctl00_resizeflag").val() == '') {

        //                    $("#ctl00_resizeflag").val('');

        //                    if ($("#ai21minyuukin").css('display') == 'block' || $("#noukics_edit").css('display') == 'block') {

        //                        ClosePopup();
        //                    } else {

        //                        ClosePopup('1');
        //                    }
        //                    return;
        //                }

        //                window.location.reload();
        //            } else {

        //                $("div[name='pnlMain_1']").css('display', 'none')
        //                $("div[name='pnlMain_2']").css('display', 'none')

        //                if ($("#ctl00_resizeflag").val() == '2') {

        //                    $("#ctl00_resizeflag").val('');
        //                    $("#ctl00_btnDummy").click();

        //                    return;
        //                }
        //            }
        //        } else {

        //            ClosePopup('1');
        //        }

        //    });

        //   // obj.css('display', 'none');
        // 2015/10/07 del end



        //クリックして別窓表示という本来の動作をキャンセル
        return false;
    };

    // 2015/10/07 del start
    //function ClosePopup(type) {

    //    $("#hyoujiPopup").css('display', 'none');
    //    //2015/09/23 add start
    //    $("#hyoujiPopup2").css('display', 'none');
    //    //2015/09/23 add end
    //    //2015/10/05 add start
    //    $("#hyoujiPopup3").css('display', 'none');
    //    //2015/10/05 add end
    //    $("#postFooter").css('display', 'none');
    //    $("#kokyaku_Popup").css('display', 'none');
    //    $("#pnlMinyukin").css('display', 'none');
    //    $("#tuuti").css("display", "none");

    //    $("div[name='pnlMain_1']").css('display', 'none')
    //    $("div[name='pnlMain_2']").css('display','none')

    //    $("#kokyakulist").css('display', 'none');
    //    $("#topmenu").css('display', 'none');
    //    $("#noukics").css('display', 'none');
    //    $("#toukatu").css('display', 'none');
    //    $("#mikomi").css('display', 'none');

    //    $("#ctl00_category_flag").val('');
    //    //2015/10/02 delete start 通知履歴ポップアップ呼び出し時に消去する処理に変更
    //    ////2015/09/29 add start
    //    //$("#ctl00_select_url").val('');
    //    //$('#geturl').val('');
    //    ////2015/09/29 add end
    //    //2015/10/02 delete start

    //    $($.cookie("footer")).css('display', 'block');

    //    $('#header_Popup').css('display', 'none')

    //    $('#gray,#popup,#square')
    //      .fadeOut("slow")
    //      .remove();

    //    // 2015/10/06 add start
    //    var showFlag;
    //    showFlag = $("#ctl00_showSearch").val();
    //    if (showFlag != '') {
    //        // 検索結果から表示された場合は、pnlSearch を表示しない
    //        $("#search").click();
    //        return;
    //    }
    //    // 2015/10/06 add end

    //    if (type == '1') {

    //        $("#pnlSearch").css('display', 'block');
    //    }

    //}

    ///*-------------------------------
    //イベント処理「PopDown」を定義
    //--------------------------------*/
    ////作成したグレーアウト、iframe、表示領域をフェードアウトさせて削除する
    //var PopDown = function () {
    //    $('#gray,#popup,#square')
    //     .fadeOut("slow")
    //     .remove();

    //    ClosePopup();
    //};
    // 2015/10/07 del end

    /*-------------------------------
    定義した処理を呼び出す指示
    --------------------------------*/
    //リンクをクリックしたらイベント処理「PopUp」を呼び出し
// DHC一時対応　2018/12/10　start
   // $('.mybox').click(PopUp);
   $(document).on("click", '.mybox', PopUp);
// DHC一時対応　2018/12/10　end
    //グレーアウト部分をクリックしたらイベント処理「PopDown」を呼び出し（追加要素へのイベント処理なのでliveメソッド使用）
    // $(document).on("click", '#gray', PopDown);
});
