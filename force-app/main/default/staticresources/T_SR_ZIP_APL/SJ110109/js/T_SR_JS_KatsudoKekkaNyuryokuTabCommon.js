/*
 * システム   : 次期営業支援システム全国版
 * 機能名     : 活動結果入力（共通）（S1）
 * ファイル名 : T_SR_JS_KatsudoKekkaNyuryokuTabCommon.js
 *
 *  VERSION    DATE        BY          CHANGE/COMMENT
 * ----------------------------------------------------------------
 *  1.00       2019/08/15  HISOL張     新規作成
 */
/**
 *グローバル変数
 */
var KatsudoKekkaNyuryoku;
var S10101InputActivityResult;  // 活動結果入力
// 改善対応46 2019/04/09 ADD Start
var KatsudoKekkaNyuryokuResultCd = '1';
// 改善対応46 2019/04/09 ADD End
// 文字数制御
(function (base) {

    // 名前空間
    var ns = base.katsudoKekkaNyuryokuConstraint = base.katsudoKekkaNyuryokuConstraint || {};

    /**
     * 文字列の文字数単位での切り捨て処理
     * 指定された文字列が、指定された文字数を超える場合に、指定文字数までで文字を切り捨てる。
     * @param {string} str 判定対象の文字列。
     * @param {number} maxLen 文字列の最大文字数
     * @return {string} 指定文字数までで切り捨てた文字列
     */
    var _truncate = function (str, maxLen) {

      if (str.length > maxLen) {
        return str.substr(0, maxLen);
      }
      return str;
    };
  
    /**
     * 指定された要素に対して、最大バイト数による入力制限を設定する
     * @param {string} element 入力制限を設定する要素
     * @param {number} maxLen 入力可能な最大文字数(未指定の場合は、対象要素のmaxlength属性の値)
     */
    ns.setMaxLen = function (element, maxLen) {
  
      var jElement = $(element);
  
      if (!maxLen) {
  
        maxLen = jElement.attr('maxlength');
      }
  
      jElement.keyup(function () {
        var inputValue = jElement.val();
        var curLen = 0;
        if (inputValue) {
          curLen = inputValue.length;
        }
  
        if (maxLen < curLen) {
          var newInputValue = _truncate(inputValue, maxLen);
          jElement.val(newInputValue);
        }
      });
    };
})(window);
(function () {
    // 改善対応46 2019/04/09 ADD Start
    try {
        if (window.parent.parent.location.href.indexOf('HISOL_T_P_KanbanPost') >= 0) {
            KatsudoKekkaNyuryokuResultCd = '2';
        } else if (window.parent.parent.location.href.indexOf('SC9S00306') >= 0
                && window.parent.parent.parent.location.href.indexOf('HISOL_T_P_KanbanPost') >= 0
                ) {
            KatsudoKekkaNyuryokuResultCd = '3';
        }
    } catch(e) {
    }
    // 改善対応46 2019/04/09 ADD End

    //====================================
    // 画面処理
    //====================================
    S10101Const = {
        SATEI_BTN: 'R130',
        MODE_NEW: '0',
        MODE_UPDATE: '1',
        MAX_LENGTH: 1000,
        MAX_LENGTH_KATSUDO_MEMO: 255,
        INSURANCE_INVITATION: '06',
        INSURANCE_INVITATION_MANAGEMENT_RESULT_INPUT: '14',
        ID_VEHICLE_DETAIL: 'SC9S20201',
        NAMESPACEPREFIX: ''
    },
    KatsudoKekkaNyuryoku = {
        Refresh: function (param) {

            // 車両詳細更新で活動結果分類が保険の場合、処理を行わない
            var kbKatubun = $('[id$=S10101-iar-KbKatuBun]').val();
            if ((kbKatubun === S10101Const.INSURANCE_INVITATION || kbKatubun === S10101Const.INSURANCE_INVITATION_MANAGEMENT_RESULT_INPUT)
              && param.originProgram === S10101Const.ID_VEHICLE_DETAIL) {
                return;
            }

            var addParams = {
                cdNorikusi: $('[id$=S10101-hidden-cdRikusi]').val(),
                kbNosyasyu: $('[id$=S10101-hidden-kbNosyasyu]').val(),
                cdNogyotai: $('[id$=S10101-hidden-cdNogyotai]').val(),
                noNoseiri: $('[id$=S10101-hidden-noNoseiri]').val(),
                KbKatuBun: $('[id$=S10101-iar-KbKatuBun]').val()
            }

            // 大文字の登録ナンバーがあれば削除
            delete param.CdNorikusi;
            delete param.KbNosyasyu;
            delete param.CdNogyotai;
            delete param.NoNoseiri;

            $.extend(param, addParams);

            var activityResultFunction = function (data, event) {
                if (event.status) {
                    if (param.originProgram === S10101Const.ID_VEHICLE_DETAIL) {
                        // 車両詳細更新
                        // 車両情報
                        if (data.VehicleInformation != undefined) {
                            // 車名
                            $('[id$=S10101-vi-syamei]').text(data.vehicleInformation.mjSyamei);
                            // 型式
                            $('[id$=S10101-vi-katasiki]').text(data.vehicleInformation.mjKatasiki);
                            // 外鈑色
                            $('[id$=S10101-vi-gaihan]').text(data.vehicleInformation.mjColor);
                            // 登録No.
                            $('[id$=S10101-vi-tourokuno]').text(data.vehicleInformation.kjRikusim + ' ' + data.vehicleInformation.kbNosyasyu + ' ' + data.vehicleInformation.cdNogyotai + ' ' + data.vehicleInformation.noNoseiri);
                            // メンテパック
                            $('[id$=S10101-vi-mente]').text(data.vehicleInformation.kjKanyuSyu);
                            // 車両層別
                            $('[id$=S10101-vi-syaryosoubetu]').text(data.vehicleInformation.mjSyaSobet);
                            // 初度登録日
                            $('[id$=S10101-vi-ddsyotoro]').text(data.vehicleInformation.ddSyotoro);
                            // 車検満了日
                            $('[id$=S10101-vi-ddsyakenmn]').text(data.vehicleInformation.ddSyakenmn);
                        }
                    } else {
                        // 顧客詳細更新
                        $("[id$=important-memo-kensu").val(data.memo.zyuyomemoList.length);
                        if (data.memo.zyuyomemoList.length > 0) {
                            // 重要メモ
                            $('[id$=important-memo]').val(data.memo.zyuyomemoList[0].mjZyuyomem);
                            $('.S10101-sakusei-date-title').text("作成日");
                            $('.S10101-sakusei-date-value').text(data.memo.zyuyomemoList[0].dateCreate);
                            $('[id$=important-memo-id]').val(data.memo.zyuyomemoList[0].cdZyuyomem);
                            $('[id$=important-memo-date]').val(data.memo.zyuyomemoList[0].dateUpdate);
                        }
                        $(".memo-list").html("");
                        var hidHtml = "";
                        for (var i = 0; i < data.memo.zyuyomemoList.length; i++) {
                            var index = i + 1;
                            // 重要メモ(初期)
                            hidHtml = hidHtml + "<input type='hidden' id='important-memo-syoki-" + index + "' value='" + data.memo.zyuyomemoList[i].mjZyuyomem + "' />";
                            // 重要メモID
                            hidHtml = hidHtml + "<input type='hidden' id='important-memo-id-" + index + "' value='" + data.memo.zyuyomemoList[i].cdZyuyomem + "' />";
                            // 重要メモ更新日時
                            hidHtml = hidHtml + "<input type='hidden' id='important-memo-date-" + index + "' value='" + data.memo.zyuyomemoList[i].dateUpdate + "' />";
                            // 重要メモ更新日時(和暦)
                            hidHtml = hidHtml + "<input type='hidden' id='important-memo-wareki-" + index + "' value='" + data.memo.zyuyomemoList[i].dateCreate + "' />";
                        }
                        $(".memo-list").html(hidHtml);
                        $('[id$=memo-pagination]').spmPagination('destroy');
                        if (data.memo.zyuyomemoList.length >= 0) {
                            S10101InputActivityResult.memoPagination("memo-pagination");
                        }

                        // J顧客メモ情報更新日
                        $('[id$=S10101-iar-JKokyakuMemoDBKoshinNichiji]').val(data.inputActivityResult.jKokyakuMemoDBKoshinNichiji);
                    }
                    // 顧客情報更新日
                    $('[id$=S10101-iar-KokyakuKanriDBKoshinNichiji]').val(data.inputActivityResult.kokyakuKanriDBKoshinNichiji);
                    // 顧客排他制御タイムスタンプ
                    $('[id$=S10101-iar-DtKokyakuHaita]').val(data.inputActivityResult.dtKokyakuHaita);
                } else {
                    // エラーダイアログ
                    window.parent.spmDialog.error('0', '活動結果入力', 'KatsudoKekkaNyuryoku', '活動結果入力');
                }
            };

            // 故障予知用再表示
            if (param['Mode'] === '4' || param['mode'] === '4') {
                Visualforce.remoting.Manager.invokeAction( S10101Const.REFRESHWARNING, JSON.stringify(param), activityResultFunction);
            }
            // 活動作成用再表示
            else if (window.parent.OC9S00301.createActivityFlg === '1') {
                Visualforce.remoting.Manager.invokeAction( S10101Const.REFRESHNEWACT, JSON.stringify(param), activityResultFunction);
            } else {
                Visualforce.remoting.Manager.invokeAction( S10101Const.REFRESH, JSON.stringify(param), activityResultFunction);
            }
        }
    },
    // 活動履歴計画
    S10101ActivityInformation = {
        viewOtherActivity: function () {

            spmMasterLayout.LoadStart(parent.document);
            var params = {};
            params['contactId'] = encodeURIComponent($("[id$=S10101-iar-contactId]").val());
            params['tenpoId'] = encodeURIComponent($("[id$=S10101-na-katsudoTenpoId]").val());
            params['meisaiId'] = encodeURIComponent($("[id$=S10101-iar-meisaiId]").val());

            // 他活動選択画面
            window.parent.white_popup("/apex/" + S10101Const.NAMESPACEPREFIX + "T_P_TaKatsudoSentaku",
                params,
                { width: '780px', height: '702px', onLoadComplete: S10101ActivityInformation.onLoadCompleteT_P_TaKatsudoSentaku, onClose: function(){} },
                "T_P_TaKatsudoSentaku"
            );

        },
        onLoadCompleteT_P_TaKatsudoSentaku: function () {
            spmMasterLayout.LoadEnd(parent.document);
        }
    },
    // 活動結果入力
    S10101InputActivityResult = {
        initActivityPlanDate: '',
        initial: function (scrollClassArray) {
            //入力制限
            //重要メモ
            spmConstraint.setMaxByte($("#important-memo"), S10101Const.MAX_LENGTH);
            //活動メモ
            katsudoKekkaNyuryokuConstraint.setMaxLen($("#activity-memo"), S10101Const.MAX_LENGTH_KATSUDO_MEMO);
            //査定車名
            spmConstraint.setMaxByte($("#S10101-iar-activity-kjSateiSyaNm"));
            //査定年式
            spmConstraint.setMaxByte($("#S10101-iar-activity-ddSateiSyaNe"));
            //査定額
            spmConstraint.setMaxByte($("#S10101-iar-activity-kiSateikin"));

            // 活動予定日設定
            if (S10101InputActivityResult.initActivityPlanDate !== '') {
                $('[id$=startDate]').val(S10101InputActivityResult.initActivityPlanDate);
            }

            // チェックボックスクリック制御
            $('.S10101-iar-chk-btn').on('click', function (e) {
                if ($(this).prop('checked')) {
                    // グループ排他処理
                    var grp = $(this).attr('grp');
                    if (grp !== "") {
                        var grps = $(this).attr('grp').split('|');
                        var require = ['.S10101-iar-chk-btn[id != "',
                                        $(this).attr("id"),
                                        '"]'].join('');

                        var selector = '';
                        for (var i = 0; i < grps.length; i++) {
                            if (i > 0) {
                                selector += ' , ';
                            }
                            selector += require;
                            selector += '[grp*="' + grps[i] + '"]';
                        }
                        $(selector).prop('checked', false);
                    }
                } else {
                    var grp = $(this).attr('grp');
                    if (grp !== "") {
                        var grps = $(this).attr('grp').split('|');
                        var require = ['.S10101-iar-chk-btn[id != "',
                                        $(this).attr("id"),
                                        '"][readonlyflg="1"]'].join('');

                        var selector = '';
                        for (var i = 0; i < grps.length; i++) {
                            if (i > 0) {
                                selector += ' , ';
                            }
                            selector += require;
                            selector += '[grp*="' + grps[i] + '"]:checked';
                        }
                        if ($(selector).length > 0) {
                            $(this).prop("disabled", true);
                        }
                    }
                }
                S10101InputActivityResult.ctrlEntryBtn();
                S10101InputActivityResult.ctrlNextPlan('0');
                S10101InputActivityResult.ctrlSateiBtn('0');
            });

            // SMBボタンの活性化処理
            var cdRikusi = $('[id$=S10101-hidden-cdRikusi]').val();
            var kbNosyasyu = $('[id$=S10101-hidden-kbNosyasyu]').val();
            var cdNogyotai = $('[id$=S10101-hidden-cdNogyotai]').val();
            var noNoseiri = $('[id$=S10101-hidden-noNoseiri]').val();

            /* ToDo 融合版用いったん抑止2019/06/19
            if ((cdRikusi != "" && cdRikusi != undefined) &&
                (kbNosyasyu != "") && kbNosyasyu != undefined &&
                (cdNogyotai != "" && cdNogyotai != undefined) &&
                (noNoseiri != "" && noNoseiri != undefined)) {
                window.parent.OC9S00301.enableSmbButton(cdRikusi, kbNosyasyu, cdNogyotai, noNoseiri);
            }
            */

            // 登録ボタンの制御(初期表示時)
            // ※顧客詳細、車両詳細の読み込み後に登録可能とするため
            //   ここでは対応しない。
            //S10101InputActivityResult.ctrlEntryBtn();

            // 次回予定の制御(初期表示時)
            S10101InputActivityResult.ctrlNextPlan('1');

            // 査定の制御(初期表示時)
            setTimeout(function () {
                S10101InputActivityResult.ctrlSateiBtn('1');
            }, 0);

            // スクロールバー設定
            scrollClassArray.reduce(function (promise, className) {
                return promise.then(function () {
                    return S10101InputActivityResult.setScrollbar(className);
                });
            }, $.Deferred().resolve()).then(function () {
            });
        },
        setScrollbar: function (className) {
            var dfd = $.Deferred();
            setTimeout(function () {
                if (className == '.S10101-iar-scroll') {
                    $(className).TrackpadScrollEmulator({ autoHide: false });
                } else {
                    spmScrollbar.set(className);
                }
                dfd.resolve();
            }, 0);
            return dfd.promise;
        },
        ctrlEntryBtn: function () {
            var mode = $('[id$=S10101-iar-mode]').val();
            if (mode === S10101Const.MODE_UPDATE || $('#on-mode').val() == '1') {
                // 更新モードの場合、登録ボタンは常に押下可能
                $('[id$=S10101-iar-btn-entry]', window.parent.document).removeClass('no-select');
                return;
            }
            var checkedChb = $('#S10101-iar-activity-result .S10101-iar-chk-btn:checked');
            if (checkedChb.length > 0) {
                $('[id$=S10101-iar-btn-entry]', window.parent.document).removeClass('no-select');
            } else {
                $('[id$=S10101-iar-btn-entry]', window.parent.document).addClass('no-select');
            }
        },
        ctrlNextPlan: function (initFlg) {
            var endChb = $('#S10101-iar-activity-result .S10101-iar-chk-btn:checked[end = "1"]');
            if (endChb.length > 0) {
                // 非活性化されていない場合のみ処理を行う
                if ($('[id$=startTimeInput]').is(':disabled') === false) {
                    // 活動予定日非活性化処理
                    // 初期表示の場合、値をクリアしない
                    if (initFlg !== '1') {
                        $('[id$=startDate]').val('');
                    }
                    $('[id$=startDate]').prop('disabled', true);
                    // 開始時刻、終了時刻 非活性化処理
                    // 初期表示の場合、値をクリアしない
                    if (initFlg !== '1') {
                        $('[id$=startTimeInput]').val('');
                        $('[id$=endTimeInput]').val('');
                    }
                    $('[id$=startTimeInput]').prop('disabled', true);
                    $('[id$=endTimeInput]').prop('disabled', true);
                    
                    // 次回接触方法 非活性化処理
                    $('#S10101-iar-nextcontact-method').find('.S10101-iar-chk-btn').prop('disabled', true);
                }
            } else {
                // 活動予定日活性化処理
                $('[id$=startDate]').prop('disabled', false);
                // 開始時刻、終了時刻 活性化処理
                $('[id$=startTimeInput]').prop('disabled', false);
                $('[id$=endTimeInput]').prop('disabled', false);
                // 次回接触方法 活性化処理
                $('#S10101-iar-nextcontact-method').find('.S10101-iar-chk-btn').each(function(e) {
                    if ($(this).prop('readonlyflg') == '1') {
                        $(this).prop("disabled", true);
                    }
                    else if ($(this).prop('checked')) {
                        $(this).prop("disabled", false);
                    }
                    else {
                        var grp = $(this).attr('grp');
                        if (grp !== "") {
                            var grps = $(this).attr('grp').split('|');
                            var require = ['.S10101-iar-chk-btn[id != "',
                                            $(this).attr("id"),
                                            '"][readonlyflg="1"]'].join('');
                                            var selector = '';
                            for (var i = 0; i < grps.length; i++) {
                                if (i > 0) {
                                    selector += ' , ';
                                }
                                selector += require;
                                selector += '[grp*="' + grps[i] + '"]:checked';
                            }
                            if ($(selector).length > 0) {
                                $(this).prop("disabled", true);
                            }
                            else {
                                $(this).prop("disabled", false);
                            }
                        }
                        else {
                            $(this).prop("disabled", false);
                        }
                    }
                });
            }
        },
        ctrlSateiBtn: function (initFlg) {
            var satei = $('#S10101-iar-activity-result .S10101-iar-chk-btn:checked[value = "' + S10101Const.SATEI_BTN + '"]');
            if (satei.length > 0) {
                $("#S10101-iar-satei").show();
            } else {
                $("#S10101-iar-satei").hide();
                // 初期表示の場合、値をクリア
                if (initFlg == '1') {
                    $("#S10101-iar-activity-kjSateiSyaNm").val("");
                    $("#S10101-iar-activity-ddSateiSyaNe").val("");
                    $("#S10101-iar-activity-kiSateikin").val("");
                }
            }
        },
        commit: function () {

            // 登録ボタン押下処理
            if ($('[id$=S10101-iar-btn-entry]', window.parent.document).hasClass('no-select')) {
                return false;;
            }

            spmMasterLayout.LoadStart(parent.document);

            // 入力値チェック
            var msg = S10101InputActivityResult.checkInput();

            if (msg !== 'OK') {
                S10101InputActivityResult.showInputErrorDialog(msg);
                // Loading非表示
                spmMasterLayout.LoadEnd(parent.document);
                return false;
            }

            // 入力データ取得処理

            // 接触相手
            var contactPersons = new Array();
            $('#S10101-iar-contact-person .S10101-iar-chk-btn').each(function (i, element) {
                S10101InputActivityResult.pushItems(contactPersons, $(element));
            });
            // 接触方法
            var contactMethods = new Array();
            $('#S10101-iar-contact-method .S10101-iar-chk-btn').each(function (i, element) {
                S10101InputActivityResult.pushItems(contactMethods, $(element));
            });
            // 次回接触方法
            var nextContactMethods = new Array();
            $('#S10101-iar-nextcontact-method .S10101-iar-chk-btn').each(function (i, element) {
                S10101InputActivityResult.pushItems(nextContactMethods, $(element));
            });
            // 活動結果
            var activityResults = new Array();
            $('#S10101-iar-activity-result .S10101-iar-chk-btn').each(function (i, element) {
                S10101InputActivityResult.pushItems(activityResults, $(element));
            });

            var activityPlanDate = $('[id$=startDate]').val().replace(/-/g, '/');
            var startTime = $('#startTimeInput').val().replace(/\:/g, '');
            var endTime =  $('#endTimeInput').val().replace(/\:/g, '');

            // ST-191 ADD NSK陳 2018/02/14 start
            // 活動メモ変更フラグ
            var activitymemChangeFlg = false;
            if ($('#activity-memo').val() != $('#activity-memo-syoki').val()) {
                activitymemChangeFlg = true;
            }
            // ST-191 ADD NSK陳 2018/02/14 end

            // 重要メモ
            var zyuyomem = null;
            if ($('#important-memo').val() != $('#important-memo-syoki').val()) {
                zyuyomem = $('#important-memo').val();
            }

            var data = {
                memo: {
                    kjKdmemo: $('#activity-memo').val(),
                    kdmemoChangeFlg: activitymemChangeFlg,
                    mjZyuyomem: zyuyomem,
                    cdZyuyomem: $('#important-memo-id').val(),
                    dateUpdate: $('#important-memo-date').val()
                },
                inputActivityResult: {
                    contactPersons: contactPersons,
                    contactMethods: contactMethods,
                    nextContactMethods: nextContactMethods,
                    activityResults: activityResults,
                    activityPlanDate: activityPlanDate,
                    startTime: startTime,
                    endTime: endTime,
                    kjSateiSyaNm: $('[id$=S10101-iar-activity-kjSateiSyaNm]').val(),
                    ddSateiSyaNe: $('[id$=S10101-iar-activity-ddSateiSyaNe]').val(),
                    kiSateikin: $('[id$=S10101-iar-activity-kiSateikin]').val(),
                    jikaiId: $('[id$=S10101-iar-jikaiId]').val(),
                    warningHoyuKigenbi: $('[id$=S10101-iar-warningHoyuKigenbi]').val()
                },
                input: {
                    contactId: $('[id$=S10101-iar-contactId]').val(),
                    meisaiId: $('[id$=S10101-iar-meisaiId]').val(),
                    chuBunrui: $('[id$=S10101-iar-chuBunrui]').val()
                },
                nextActivity: {
                    dtShokiHyoji: $('[id$=S10101-na-dtShokiHyoji]').val(),
                    katsudoKekka: $('[id$=S10101-na-katsudoKekka]').val(),
                    icjKatsudoBunrui: $('[id$=S10101-na-icjKatsudoBunrui]').val()
                }
            };

            if (data.input.meisaiId != 0) {
                s10101Commit(JSON.stringify(data));
            }
            else {
                s10101Commit(JSON.stringify(data));
            }
            
            return true;
        },
        warningCommit: function () {

            // 登録ボタン押下処理
            if ($('[id$=S10101-iar-btn-entry]', window.parent.document).hasClass('no-select')) {
                return;
            }

            spmMasterLayout.LoadStart(parent.document);

            // 入力値チェック
            var msg = S10101InputActivityResult.checkInput();

            if (msg !== 'OK') {
                S10101InputActivityResult.showInputErrorDialog(msg);
                // Loading非表示
                spmMasterLayout.LoadEnd(parent.document);
                return;
            }

            // 入力データ取得処理

            // 接触相手
            var contactPersons = new Array();
            $('#S10101-iar-contact-person .S10101-iar-chk-btn').each(function (i, element) {
                S10101InputActivityResult.pushItems(contactPersons, $(element));
            });
            // 接触方法
            var contactMethods = new Array();
            $('#S10101-iar-contact-method .S10101-iar-chk-btn').each(function (i, element) {
                S10101InputActivityResult.pushItems(contactMethods, $(element));
            });
            // 次回接触方法
            var nextContactMethods = new Array();
            $('#S10101-iar-nextcontact-method .S10101-iar-chk-btn').each(function (i, element) {
                S10101InputActivityResult.pushItems(nextContactMethods, $(element));
            });
            // 活動結果
            var activityResults = new Array();
            $('#S10101-iar-activity-result .S10101-iar-chk-btn').each(function (i, element) {
                S10101InputActivityResult.pushItems(activityResults, $(element));
            });

            var activityPlanDate = $('[id$=startDate]').val().replace(/-/g, '/');
            var startTime = $('#startTimeInput').val().replace(/\:/g, '');
            var endTime = $('#endTimeInput').val().replace(/\:/g, '');

            // ST-191 ADD NSK陳 2018/02/14 start
            // 活動メモ変更フラグ
            var activitymemChangeFlg = false;
            if ($('#activity-memo').val() != $('#activity-memo-syoki').val()) {
                activitymemChangeFlg = true;
            }
            // ST-191 ADD NSK陳 2018/02/14 end

            // 重要メモ
            var zyuyomem = null;
            if ($('#important-memo').val() != $('#important-memo-syoki').val()) {
                zyuyomem = $('#important-memo').val();
            }

            var data = {
                memo: {
                    kjKdmemo: $('#activity-memo').val(),
                    kdmemoChangeFlg: activitymemChangeFlg,
                    mjZyuyomem: zyuyomem,
                    cdZyuyomem: $('#important-memo-id').val(),
                    dateUpdate: $('#important-memo-date').val()
                },
                inputActivityResult: {
                    contactPersons: contactPersons,
                    contactMethods: contactMethods,
                    nextContactMethods: nextContactMethods,
                    activityResults: activityResults,
                    activityPlanDate: activityPlanDate,
                    startTime: startTime,
                    endTime: endTime,
                    kjSateiSyaNm: $('[id$=S10101-iar-activity-kjSateiSyaNm]').val(),
                    ddSateiSyaNe: $('[id$=S10101-iar-activity-ddSateiSyaNe]').val(),
                    kiSateikin: $('[id$=S10101-iar-activity-kiSateikin]').val(),
                    jikaiId: $('[id$=S10101-iar-jikaiId]').val(),
                    warningHoyuKigenbi: $('[id$=S10101-iar-warningHoyuKigenbi]').val()
                },
                input: {
                    contactId: $('[id$=S10101-iar-contactId]').val(),
                    meisaiId: $('[id$=S10101-iar-meisaiId]').val(),
                    chuBunrui: $('[id$=S10101-iar-chuBunrui]').val()
                },
                nextActivity: {
                    dtShokiHyoji: $('[id$=S10101-na-dtShokiHyoji]').val(),
                    katsudoKekka: $('[id$=S10101-na-katsudoKekka]').val(),
                    icjKatsudoBunrui: $('[id$=S10101-na-icjKatsudoBunrui]').val()
                }
            };
            Visualforce.remoting.Manager.invokeAction( S10101Const.EXECCOMMIT, JSON.stringify(data), function(data, event){
                if (event.status) {
                    spmMasterLayout.LoadEnd(parent.document);
                    if (!data.isError) {
                        // 正常終了
                        window.parent.spmPopup.close({
                            ProgramId: 'KatsudoKekkaNyuryoku',
                            MessageId: '000001',
                            // 改善対応46 2019/04/09 ADD Start
                            //ResultCd: '1'
                            ResultCd: KatsudoKekkaNyuryokuResultCd,
                            // 改善対応46 2019/04/09 ADD End
                            ChipId: data.chipId
                        });
                        window.parent.spmWindow.allClose();
                    } else if (data.isError) {
                        // 入力チェックエラー
                        if (data.DetailCd != "") {
                            window.parent.spmDialog.errorMsg(data.errorMessage + "IF:" + data.programId + " EC:" + data.detailCd + "(" + data.detailMessage + ")", data.errorTitle);
                        } else {
                            S10101InputActivityResult.showInputErrorDialog(data.detailMessage);
                        }
                    }
                } else {
                    // エラーダイアログ
                    spmMasterLayout.LoadEnd(parent.document);

                    // システムエラー
                    window.parent.spmDialog.error('1', '活動結果入力', 'KatsudoKekkaNyuryoku', '詳細(活動結果入力)');
                }
            });
        },
        successFunc: function (data, textStatus, xhr) {

            spmMasterLayout.LoadEnd(parent.document);

            var data = {
                isError: $('[id$=S10101-iar-isError]').val(),
                chipId: $('[id$=S10101-iar-chipId]').val(),
                detailCd: $('[id$=S10101-iar-detailCd]').val(),
                errorMessage: $('[id$=S10101-iar-errorMessage]').val(),
                programId: $('[id$=S10101-iar-programId]').val(),
                detailMessage: $('[id$=S10101-iar-detailMessage]').val(),
                errorTitle: $('[id$=S10101-iar-errorTitle]').val()
            };
            if (data.isError == 'false') {
                // 正常終了
                window.parent.spmPopup.close({
                    ProgramId: 'KatsudoKekkaNyuryoku',
                    MessageId: '000001',
                    // 改善対応46 2019/04/09 ADD Start
                    //ResultCd: '1'
                    ResultCd: KatsudoKekkaNyuryokuResultCd,
                    // 改善対応46 2019/04/09 ADD End
                    ChipId: data.chipId
                });
                window.parent.spmWindow.allClose();
            } else {
                // 入力チェックエラー
                if (data.detailCd != "") {
                    window.parent.spmDialog.errorMsg(data.errorMessage + "IF:" + data.programId + " EC:" + data.detailCd + "(" + data.detailMessage + ")", data.errorTitle);
                } else {
                    S10101InputActivityResult.showInputErrorDialog(data.detailMessage);
                }
            }
        },
        errorFunc: function (XMLHttpRequest, textStatus, errorThrown, msg) {

            spmMasterLayout.LoadEnd(parent.document);

            // システムエラー
            window.parent.spmDialog.error('1', '活動結果入力', 'KatsudoKekkaNyuryoku', '詳細(活動結果入力)');
        },
        pushItems: function (array, element) {
            var selected = false;
            if (element.prop('checked')) {
                selected = true;
            }
            array.push({ Value: element.attr("value"), Selected: selected, KbKatubun: element.attr("katubun"), KbIcjpush: element.attr("kbicjpush"), name: element.attr("nm") });
        },
        checkInput: function () {

            // お客様なしモードの場合true
            if ($('#on-mode').val() == '1') {
                return 'OK';
            }

            // 活動結果
            if ($('#S10101-iar-activity-result .S10101-iar-chk-btn:checked').length === 0) {
                // 必須チェック（新規のみ）
                if ($('[id$=S10101-iar-Mode]').val() === S10101Const.MODE_NEW) {
                    return S10101InputActivityResult.MSG_ERR_ACTIVITY_RESULT_REQUIRE;
                } else {
                    // 更新モードで活動結果が未選択の場合、全ての入力項目をクリア
                    // 接触相手 + 接触方法
                    $('.S10101-iar-chk-btn:checked').prop('checked', false);
                    // 査定
                    $('#S10101-iar-satei > input[type="text"]').val('');
                    // 活動予定日
                    $('[id$=startDate]').val('');
                    // 開始時刻 + 終了時刻
                    
                     $('[id$=startTimeInput]').val('');
                     $('[id$=endTimeInput]').val('');
                }
            }

            var activityPlanDate =$('[id$=startDate]').val().replace(/-/g, '/');
            if (activityPlanDate) {
                activityPlanDate = activityPlanDate.trim();
            }
            var _isDate = function (str) {
                if ($.type(str) !== 'string') {
                    return false;
                }
                var strTrim = str.trim();
                if (strTrim == '') {
                    return true;
                }
                var arr = str.split('/');
                if (arr.length !== 3) {
                    return false;
                }
                var date = new Date(arr[0], arr[1] - 1, arr[2]);
                if (parseInt(arr[0]) !== date.getFullYear() ||
                        parseInt(arr[1]) !== date.getMonth() + 1 ||
                        parseInt(arr[2]) !== date.getDate()) {
                    return false;
                } else {
                    return true;
                }
            };

            // 活動予定日
            // 日付整合性チェック
            if (!_isDate(activityPlanDate)) {
                return S10101InputActivityResult.MSG_ERR_PLAN_DATE_FAIL;
            }

            // 必須チェック（活動継続が選択されている場合のみ）

            var endChb = $('#S10101-iar-activity-result .S10101-iar-chk-btn:checked[end = "1"]');
            var continueChb = $('#S10101-iar-activity-result .S10101-iar-chk-btn:checked[end != "1"]');

            if (endChb.length === 0 && continueChb.length > 0 && activityPlanDate === '') {
                return S10101InputActivityResult.MSG_ERR_PLAN_DATE_REQUIRE;
            }

            // 大小チェック
            if (activityPlanDate !== '') {
                var now = new Date();
                var nowStr = now.getFullYear() + ('0' + (now.getMonth() + 1)).slice(-2) + ('0' + now.getDate()).slice(-2);

                if (activityPlanDate.replace(/\//g, '') < nowStr) {
                    return S10101InputActivityResult.MSG_ERR_PLAN_DATE_OLD;
                }
            }

            // 開始時刻
            // 入力値欠落チェック
            var startTime = $('#startTimeInput').val().replace(/\:/g, '');;
            if (0 < startTime.length && startTime.length < 4) {
                return S10101InputActivityResult.MSG_ERR_START_TIME_REQUIRE;
            }
            // 終了時刻
            // 入力値欠落チェック
            var endTime = $('#endTimeInput').val().replace(/\:/g, ''); 
            if (0 < endTime.length && endTime.length < 4) {
                return S10101InputActivityResult.MSG_ERR_END_TIME_REQUIRE;
            }

            // 活動結果＋活動予定日時
            // 次回予定整合性チェック（次回予定が活性化している場合のみ）
            var endChb = $('#S10101-iar-activity-result .S10101-iar-chk-btn:checked[end = "1"]');
            if (endChb.length > 0 && $('[id$=startTimeInput]').is(':disabled') === false) {
                if (activityPlanDate.length > 0 || startTime.length > 0 || endTime.length > 0) {
                    var itemName = $('label[for = "' + endChb.attr('id') + '"]').text();
                    return itemName + S10101InputActivityResult.MSG_ERR_PLAN;
                }
            }

            // 活動予定日＋開始時刻＋終了時刻
            // 活動予定日なし 開始時刻 or 終了時刻ありエラー
            if (activityPlanDate.length === 0 && (startTime.length > 0 || endTime.length > 0)) {
                return S10101InputActivityResult.MSG_ERR_PLAN_DATE_TIME_FAIL;
            }

            // 開始時刻＋終了時刻
            // 開始時刻なし 終了時刻ありエラー
            if (startTime.length === 0 && endTime.length === 4) {
                return S10101InputActivityResult.MSG_ERR_START_END_TIME_REQUIRE;
            }

            // 大小チェック
            if (startTime.length === 4 && endTime.length === 4 && startTime >= endTime) {
                return S10101InputActivityResult.MSG_ERR_START_END_TIME_BIGGER;
            }

            return "OK";
        },
        showInputErrorDialog: function (msg) {
            window.parent.spmDialog.show(msg, '入力エラー', window.parent.spmDialog.icons.error, null, null, null);
        },
        memoHyouji: function (obj) {
            var memo = $(obj).parent().data("memo");
            var comment = $(obj).parent().data("comment");
            if (memo == "") {
                $(".memoHyouji #memo-pop").hide();
                $(".memoLine").hide();
            } else {
                $(".memoHyouji #memo-pop").text("【活動メモ】\n" + memo);
                $(".memoHyouji #memo-pop").show();
            }
            if (comment == "") {
                $(".memoHyouji #comment-pop").hide();
                $(".memoLine").hide();
            } else {
                $(".memoHyouji #comment-pop").text("【オペレーターコメント】\n" + comment);
                $(".memoHyouji #comment-pop").show();
            }
            if (memo != "" && comment != "") {
                $(".memoLine").show();
            }

            $(".memoHyouji #hyouji-pop").css("left", ($(obj).offset().left + $(obj).innerWidth()));
            $(".memoHyouji #hyouji-pop").css("top", $(obj).offset().top);
            $(".memoHyouji").show();
        },
        memoHide: function (obj) {
            $(".memoHyouji").hide();
        },
        memoPagination: function (obj) {
            $('#' + obj).spmPagination({
                totalRows: Math.max(parseInt($("#important-memo-kensu").val()), 1),
                visibleRows: 1,
                visiblePages: 3,
                initiateStartPageClick: true,
                totalRowsOnly: true,
                onPageCheck: function (event, page) {
                    if (S10101InputActivityResult.IsJuyoMemoChanged()) {
                        // 変更が有る場合は、警告表示を行う
                        window.parent.spmDialog.confirm(S10101Const.MSG_0003/*"編集中の重要メモは破棄されます。よろしいですか？"*/, "確認", null,
                        function () {
                            console.info('ページ' + page + 'に移動');
                            $('#' + obj).spmPagination('show', page);
                        },
                        function () {
                            console.info('ページ変更キャンセル');
                        });
                    } else {
                        console.info('ページ' + page + 'に移動');
                        $('#' + obj).spmPagination('show', page);
                    }

                },
                onPageClick: function (event, page) {
                    //ページ変更時の処理を記述
                    console.info('ページ' + page + 'に移動');
                    if ($("#important-memo-syoki-" + page)) {
                        $("#important-memo").val($("#important-memo-syoki-" + page).val());
                        $(".S10101-sakusei-date-value").text($("#important-memo-wareki-" + page).val());
                        $("#important-memo-syoki").val($("#important-memo-syoki-" + page).val());
                        $("#important-memo-id").val($("#important-memo-id-" + page).val());
                        $("#important-memo-date").val($("#important-memo-date-" + page).val());
                        $("#important-memo-page").val(page);
                    }
                }
            });
        },
        IsJuyoMemoChanged: function () {
            var page = $("#important-memo-page").val();
            if ($("#important-memo").val() != $("#important-memo-syoki-" + page).val()) {
                return true;
            } else {
                return false;
            }
        },
        MSG_ERR_ACTIVITY_RESULT_REQUIRE: S10101Const.MSG_0004/*'活動結果を1つ以上選択してください。'*/,
        MSG_ERR_START_TIME_REQUIRE: S10101Const.MSG_0008/*'開始時刻を入力する場合、時間と分を入力してください。'*/,
        MSG_ERR_END_TIME_REQUIRE: S10101Const.MSG_0009/*'終了時刻を入力する場合、時間と分を入力してください。'*/,
        MSG_ERR_START_END_TIME_REQUIRE: S10101Const.MSG_0012/*'終了時刻を入力する場合、開始時刻を入力してください。'*/,
        MSG_ERR_START_END_TIME_BIGGER: S10101Const.MSG_0013/*'終了時刻は開始時刻より後の時刻を入力してください。'*/,
        MSG_ERR_PLAN_DATE_REQUIRE: S10101Const.MSG_0006/*'活動予定日を入力してください。'*/,
        MSG_ERR_PLAN_DATE_FAIL: S10101Const.MSG_0005/*'活動予定日を正しく入力してください。'*/,
        MSG_ERR_PLAN_DATE_OLD: S10101Const.MSG_0007/*'活動予定日は本日以降の日付を入力してください。'*/,
        MSG_ERR_PLAN_DATE_TIME_FAIL: S10101Const.MSG_0011/*'開始時刻、終了時刻を入力する場合、活動予定日を入力してください'*/,
        MSG_ERR_PLAN: S10101Const.MSG_0010/*'が選択されている場合、活動予定日、開始時刻、終了時刻は入力できません。'*/,
    },
    // ボタン
    S10101Buttons = {
        // ボタン初期化
        Refresh: function () {
            s10101ButtonsRefresh();
        },

        // 市場設置ボタン
        clickRecallButton: function (obj) {
            /* 無効の時は何も処理しない */
            if (obj.hasClass("inactive")) {
                return;
            }

            // URLを取得する
            var url = $("[id$=S10101-na-URL-Recall]").val();

            // 別ウィドウのパラメータをセットする
            var param = window.parent.spmWindow.GetParameter(720, 1280, 0, 0);

            // 別ウィドウを開く
            window.parent.spmWindow.open(url, "ShijyoSyochi", param);
        },

        // 推奨整備ボタン
        clickSRTButton: function (obj) {
            /* 無効の時は何も処理しない */
            if (obj.hasClass("inactive")) {
                return;
            }

            // URLを取得する
            var url = $("[id$=S10101-na-URL-SRT]").val();

            // 別ウィドウのパラメータをセットする
            var param = window.parent.spmWindow.GetParameter(648, 1152, 0, 0);

            // 別ウィドウを開く
            window.parent.spmWindow.open(url, "SRT", param);
        },

        // ヘルスチェックレポートボタン
        clickParaStsButton: function (obj) {
            /* 無効の時は何も処理しない */
            if (obj.hasClass("inactive")) {
                return;
            }

            // URLを取得する
            var url = $("[id$=S10101-na-URL-ParaSts]").val();

            // 別ウィドウのパラメータをセットする
            var param = window.parent.spmWindow.GetParameter(720, 1280, 0, 0);

            // 別ウィドウを開く
            window.parent.spmWindow.open(url, "ShinHealthCheck", param);
        },

        // Web閲覧ボタン
        clickWebButton: function (obj) {
            /* 無効の時は何も処理しない */
            if (obj.hasClass("inactive")) {
                return;
            }

            // URLを取得する
            var url = $("#S10101-na-URL-Web").val();

            // 別ウィドウのパラメータをセットする
            var param = window.parent.spmWindow.GetParameter(648, 1260, 0, 0);

            // 別ウィドウを開く
            window.parent.spmWindow.open(url, "", param);
        },

        // リクエストボタン
        clickRequestButton: function (obj) {

            /* 無効の時は何も処理しない */
            if (obj.hasClass("inactive")) {
                return;
            }

            spmMasterLayout.LoadStart(parent.document);

            // URLを取得する
            var url = $("[id$=S10101-na-URL-Request]").val();

            var parameters = url.match(/\?([^?]*)$/);
            var params = {};

            if (parameters) {
                parameters = parameters[1];
                var keyValues = parameters.split('&');
                for (var index = 0; index < keyValues.length; index++) {
                    var keyValue = keyValues[index].split('=');
                    if (keyValue.length == 2) {
                        var key = keyValue[0];
                        keyValue[1] = decodeURIComponent(keyValue[1]);
                        var value = keyValue[1];
                        params[key] = value;
                    }
                }
            } else {
                return;
            }

            window.parent.white_popup("/apex/" + S10101Const.NAMESPACEPREFIX + "T_P_RequestJoho",
                params,
                { width: '1280px', height: '625px', onLoadComplete: S10101Buttons.onLoadCompleteButtons, onClose: function(){} },
                "SJ010229"
            );
        },
        onLoadCompleteButtons: function () {
            spmMasterLayout.LoadEnd(parent.document);
        }
    }
})();
