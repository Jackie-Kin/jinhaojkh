/*
 * システム   : 次期営業支援システム全国版
 * 機能名     : 活動結果入力（共通）（S1）
 * ファイル名 : T_SR_JS_KatsudoKekkaNyuryokuTabCommon_S1.js
 *
 *  VERSION    DATE        BY          CHANGE/COMMENT
 * ----------------------------------------------------------------
 *  1.00       2019/08/15  HISOL張     新規作成
 */
/**
 *グローバル変数
 */
var S10101InputActivityResult;  // 活動結果入力
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
    // 活動履歴計画
    S10101ActivityInformation = {
        viewOtherActivity: function () {

            parent.jicj.mobile.showBackdrop();
            var contactId = encodeURIComponent($("[id$=S10101-iar-contactId]").val());
            var tenpoId = encodeURIComponent($("[id$=S10101-na-katsudoTenpoId]").val());
            var meisaiId = encodeURIComponent($("[id$=S10101-iar-meisaiId]").val());

            // 他活動選択画面
            parent.goTaKatsudoSentaku(contactId, tenpoId, meisaiId);

        }
    },
    // 活動結果入力
    S10101InputActivityResult = {
        initActivityPlanDate: '',
        isSelectStatus: false,
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
                    try {
                        if (!S10101InputActivityResult.isSelectStatus) {
                            kekkaToStatus($(this).val());
                        }
                    }
                    catch(e) {
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
                S10101InputActivityResult.isSelectStatus = false;
                S10101InputActivityResult.ctrlEntryBtn();
                S10101InputActivityResult.ctrlNextPlan('0');
                S10101InputActivityResult.ctrlSateiBtn('0');
            });

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
        },
        ctrlEntryBtn: function () {
            var mode = $('[id$=S10101-iar-mode]').val();
            if (mode === S10101Const.MODE_UPDATE || $('#on-mode').val() == '1') {
                // 更新モードの場合、登録ボタンは常に押下可能
                $('[id$=S10101-iar-btn-entry]', window.parent.document).removeClass('no-select');
                return;
            }
            var checkedChb = $('#S10101-iar-activity-result .S10101-iar-chk-btn:checked');
            if (checkedChb.length > 0 || $('[id$=S10101-iar-status]').val() != '') {
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
                    if ($(this).attr('readonlyflg') == '1') {
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

            parent.jicj.mobile.showBackdrop();

            // 入力値チェック
            var msg = S10101InputActivityResult.checkInput();

            if (msg !== 'OK') {
                S10101InputActivityResult.showInputErrorDialog(msg);
                // Loading非表示
                parent.jicj.mobile.hideBackdrop();
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

            // 活動メモ変更フラグ
            var activitymemChangeFlg = false;
            if ($('#activity-memo').val() != $('#activity-memo-syoki').val()) {
                activitymemChangeFlg = true;
            }

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
                    warningHoyuKigenbi: $('[id$=S10101-iar-warningHoyuKigenbi]').val(),
                    statusValue: $('[id$=S10101-iar-status]').val(),
                    statusValueBase: $('[id$=S10101-iar-statusBase]').val()
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
        successFunc: function (data, textStatus, xhr) {

            parent.jicj.mobile.hideBackdrop();

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
                parent.goBack();
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

            parent.jicj.mobile.hideBackdrop();

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
            if ($('#S10101-iar-activity-result .S10101-iar-chk-btn:checked').length === 0 && $('[id$=S10101-iar-status]').val() == '') {
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
    }
})();
