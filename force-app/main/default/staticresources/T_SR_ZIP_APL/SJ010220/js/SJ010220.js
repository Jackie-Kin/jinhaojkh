var T_P_NokiCsGyomuCalendar = function () {};
// 画面モードを保持
var gamenMode;

//$(function () {
function initNCSCalPlugin(gamenModeValue) {
    gamenMode = gamenModeValue;

    // メモの入力制限　画面モード3
    if(gamenMode == '3') {
        spmConstraint.setMaxByte($("#memo"), 500);
    }

    /** タイムアウトを設定 */
    setTimeout(function () {
        if ($(".sessyoku-area").length > 0) {
            spmScrollbar.set('.chk-btn-pair-scroll');
        } else {
            $(".chk-btn-pair").css("height", "265");
        }
    }, 0);

    /** カレンダー画面の初期化 */
    _spmCalendarLogic.initialize(function (newDate) {
        if(gamenMode == '3') {
            if ($(".kaNasyaBtn").attr("disabled") == "disabled") {
                $(".kaNasyaBtn").removeAttr("disabled");
            }
        }

        if(gamenMode == '1' || gamenMode == '3' || gamenMode == '5' || gamenMode == '6') {
            $("#calendarSelect").val(newDate);
        }

        if(gamenMode == '3') {
            getRiyuuSetInfo(null, null, newDate);
        }

        // 日付変更時チェック確定ボタンの実行
        if(gamenMode == '1' || gamenMode == '4' || gamenMode == '5') {
            CheckKakuteiBtn();
        } else if(gamenMode == '3') {
            CheckNasyaBtn()
            CheckkaNasyaBtn();
        }
    });

    if(gamenMode == '2') {
         _spmCalendarLogic.initialize();
    }

    /** 確定ボタン押下時イベント モード1、4、5 */
    $(".kakuteiBtn").click(function () {
        window.parent.spmMasterLayout.LoadStart();

        if(gamenMode == '1' || gamenMode == '5' || gamenMode == '6') {
            var newDate = $("#calendarSelect").val();
        }

        if(gamenMode == '4') {
            var newDate = $('.calendar-left').spmCalendar('get');
        }

        if(gamenMode == '1' || gamenMode == '5' || gamenMode == '6') {
            $("[id$='\:paramKakuteiFukaKbn']").val("0");
            $("[id$='\:paramMemo']").val($('textarea[name="memo"]').val());
            $("[id$='\:paramselectDt']").val(newDate);
            $("[id$='\:paramSessyokuKbn']").val($(".sessyoku-area .chk-btn:checked").val());
            $("[id$='\:paramKakuteiKbn']").val("0");
        }
  
        if(gamenMode == '4') {
            $("[id$='\:paramKakuteiFukaKbn']").val("1");
            $("[id$='\:paramSelectRiyuCD']").val($(".riyuu-area .chk-btn:checked").val());
            $("[id$='\:paramMemo']").val($('textarea[name="memo"]').val());
            $("[id$='\:paramselectDt']").val(newDate);
            $("[id$='\:paramKaisiTm']").val($("#start-time").val());
            $("[id$='\:paramKanryoTm']").val($("#end-time").val());
            $("[id$='\:paramSessyokuKbn']").val($(".sessyoku-area .chk-btn:checked").val());
            $("[id$='\:paramKakuteiKbn']").val("0");
        }

        kakuteiAction();
    });

    /** 確定不可ボタン押下時イベント モード3 */
    $(".kakuteiNaiBtn").click(function () {
        window.parent.spmMasterLayout.LoadStart();
        // パラメータ作成
        var params = {};
        params["selectedDt"] = $('.calendar-left').spmCalendar('get');
        params["Id"] = $("#objIDHid").val(); // オブジェクトID
        params["KatsudoNoShurui_ChuBunrui"] = $("#katsudoShuruiHid").val(); // 活動の種類
        params["KeikakuBi"] = $('.calendar-left').spmCalendar('get'); // 選択日付
        params["kakuteiFukaKbn"] = "1"; // 確定不可区分
        // 次回フォロー日入力画面表示
        window.parent.white_popup('/apex/' + T_P_NokiCsGyomuCalendar.NameSpacePrefix + 'T_P_NokiCsGyomuCalendar', params, { width: '1000px', height: '625px', onLoadComplete: onLoadCompleteKakuteiFuka , onClose: onCloseCompleteKakuteiFuka}, 'SJ010220');
    });

    /** 仮納車確定ボタン押下時イベント モード3 */
    $(".kaNasyaBtn").click(function () {
        window.parent.spmMasterLayout.LoadStart();
        var newDate = $("#calendarSelect").val();
        $("[id$='\:paramKakuteiFukaKbn']").val("0");
        $("[id$='\:paramSelectRiyuCD']").val($(".riyuu-area .chk-btn:checked").val());
        $("[id$='\:paramMemo']").val($('textarea[name="memo"]').val());
        $("[id$='\:paramselectDt']").val(newDate);
        $("[id$='\:paramKaisiTm']").val($("#start-time").val());
        $("[id$='\:paramKanryoTm']").val($("#end-time").val());
        $("[id$='\:paramSessyokuKbn']").val($(".sessyoku-area .chk-btn:checked").val());
        $("[id$='\:paramKakuteiKbn']").val("0");

        kariNousyaKakuteiAction();
    });

    /** 納車確定ボタン押下時イベント モード3 */
    $(".nasyaBtn").click(function () {
        window.parent.spmMasterLayout.LoadStart();
        var newDate = $("#calendarSelect").val();
        $("[id$='\:paramKakuteiFukaKbn']").val("0");
        $("[id$='\:paramSelectRiyuCD']").val($(".riyuu-area .chk-btn:checked").val());
        $("[id$='\:paramMemo']").val($('textarea[name="memo"]').val());
        $("[id$='\:paramselectDt']").val(newDate);
        $("[id$='\:paramKaisiTm']").val($("#start-time").val());
        $("[id$='\:paramKanryoTm']").val($("#end-time").val());
        $("[id$='\:paramSessyokuKbn']").val($(".sessyoku-area .chk-btn:checked").val());
        $("[id$='\:paramKakuteiKbn']").val("1");

        kakuteiAction();
    });

    /** 接触方法押下時イベント 画面モード1、3、4、5 */
    if ($(".sessyoku-area").length > 0) {
        $(".sessyoku-area .chk-btn").click(function () {
            if(gamenMode == '3') {
                CheckNasyaBtn();
            } else {
                CheckKakuteiBtn();
            }
        });
    }

    /** 終日押下時イベント 画面モード3、4 */
	$("#chk-mitei").click(function () {
        if ($(this).is(':checked')) {
            $(".dropdown-time").attr("disabled", "disabled");
            $(".dropdown-time").val("");
            $("#start-time").val("");
            $("#end-time").val("");
        } else {
            $(".dropdown-time").removeAttr("disabled")
        }

        if(gamenMode == '3') {
            CheckNasyaBtn();
        }
    });

    /** 「納車開始時間」の時間変更時イベント 画面モード3、4 */
    $("#start-hour").change(function () {
        CheckEndTime();
        if(gamenMode == '3') {
            CheckNasyaBtn();
        }
    });
    
    /** 「納車開始時間」の分変更時イベント 画面モード3、4 */
    $("#start-minutes").change(function () {
        CheckEndTime();
        if(gamenMode == '3') {
            CheckNasyaBtn();
        }
    });
    
    /** 「納車終了時間」の時間変更時イベント 画面モード3、4 */
    $("#end-hour").change(function () {
        if ($("#end-hour").val() != "" && $("#end-minutes").val() != "") {
            $("#end-time").val($("#end-hour").val() + ":" + $("#end-minutes").val());
        } else {
            $("#end-time").val("");
        }
        if(gamenMode == '3') {
            CheckNasyaBtn();
        }
    });
    
    /** 「納車終了時間」の分変更時イベント 画面モード3、4 */
    $("#end-minutes").change(function () {
        if ($("#end-hour").val() != "" && $("#end-minutes").val() != "") {
            $("#end-time").val($("#end-hour").val() + ":" + $("#end-minutes").val());
        } else {
            $("#end-time").val("");
        }
        if(gamenMode == '3') {
            CheckNasyaBtn();
        }
    });

    /** 理由押下時イベント 画面モード3、4 */
   if ($(".riyuu-area").length > 0) {
       $(".riyuu-area .chk-btn").click(function () {
            if(gamenMode == '3') {
                CheckNasyaBtn();
            } else if(gamenMode == '4') {
                CheckKakuteiBtn();
            }
        });
    }

    /** 閉じるボタン押下時イベント */
    $(".closeBtn").click(function () {
    	window.parent.white_popup_close('SJ010220');
    });

    // 初期化時チェック確定ボタンの実行
    if(gamenMode == '1' || gamenMode == '4' || gamenMode == '5') {
        CheckKakuteiBtn();
    } else if(gamenMode == '3') {
        CheckNasyaBtn()
        CheckkaNasyaBtn();
    }
//});
}

/** 完了時刻のチェック 画面モード3、4 */
function CheckEndTime() {
    if ($("#start-hour").val() != "" && $("#start-minutes").val() != "") {
        if ($("#end-hour").val() == "" && $("#end-minutes").val() == "") {
            var hour1 = "";
            var hour = Number($("#start-hour").val()) + 1;
            if (hour == 24) {
                $("#start-time").val($("#start-hour").val() + ":" + $("#start-minutes").val());
                return;
            } else if (hour < 10) {
                hour1 = "0" + hour;
            } else {
                hour1 = hour;
            }
            var minutes = $("#start-minutes").val();
            $("#end-hour").val(hour1);
            $("#end-minutes").val(minutes);
            $("#end-time").val(hour1 + ":" + minutes);
        }
        $("#start-time").val($("#start-hour").val() + ":" + $("#start-minutes").val());
    } else {
        $("#start-time").val("");
    }
}

/** 確定ボタンのチェック 画面モード1、4、5 */
function CheckKakuteiBtn() {
    var newDate = $('.calendar-left').spmCalendar('get');
    if (newDate != "") {
        if ($(".riyuu-area").length > 0) {
            if ($(".riyuu-area .chk-btn").is(':checked')) {
                if ($(".sessyoku-area").length > 0) {
                    if ($(".sessyoku-area .chk-btn").is(':checked')) {
                        $(".kakuteiBtn").removeAttr("disabled");
                        $("#calendarSelect").val(newDate);
                    } else {
                        $(".kakuteiBtn").attr("disabled", "disabled");
                        $("#calendarSelect").val("");
                    }
                } else {
                    $(".kakuteiBtn").removeAttr("disabled");
                    $("#calendarSelect").val(newDate);
                }
            } else {
                $(".kakuteiBtn").attr("disabled", "disabled");
                $("#calendarSelect").val("");
            }
        } else {
            if ($(".sessyoku-area").length > 0) {
                if ($(".sessyoku-area .chk-btn").is(':checked')) {
                    $(".kakuteiBtn").removeAttr("disabled");

                    if(gamenMode == '4') {
                        $("#calendarSelect").val(newDate);
                    }
                } else {
                    $(".kakuteiBtn").attr("disabled", "disabled");

                    if(gamenMode == '4') {
                        $("#calendarSelect").val("");
                    }
                }
            } else {
                $(".kakuteiBtn").removeAttr("disabled");

                if(gamenMode == '4') {
                    $("#calendarSelect").val(newDate);
                }
            }
        }
    } else {
        $(".kakuteiBtn").attr("disabled", "disabled");
        if(gamenMode == '4') {
            $("#calendarSelect").val("");
        }
    }
}

/** 確定ボタンのチェック 画面モード3 */
function CheckNasyaBtn() {
    var newDate = $('.calendar-left').spmCalendar('get');
    if (newDate != "" && (($("#start-time").val() != "" && $("#end-time").val() != "" && ($("#start-hour").val() < $("#end-hour").val() || ($("#start-hour").val() == $("#end-hour").val() && $("#start-minutes").val() < $("#end-minutes").val()))) || $("#chk-mitei").is(':checked'))) {
        if ($(".riyuu-area").length > 0) {
            if ($(".riyuu-area .chk-btn").is(':checked')) {
                if ($(".sessyoku-area").length > 0) {
                    if ($(".sessyoku-area .chk-btn").is(':checked')) {
                        $(".nasyaBtn").removeAttr("disabled");
                    } else {
                        $(".nasyaBtn").attr("disabled", "disabled");
                    }
                }else{
                    $(".nasyaBtn").removeAttr("disabled");
                }
            } else {
                $(".nasyaBtn").attr("disabled", "disabled");
            }
        } else {
            if ($(".sessyoku-area").length > 0) {
                if ($(".sessyoku-area .chk-btn").is(':checked')) {
                    $(".nasyaBtn").removeAttr("disabled");
                } else {
                    $(".nasyaBtn").attr("disabled", "disabled");
                }
            } else {
                $(".nasyaBtn").removeAttr("disabled");
            }
        }
    } else {
        $(".nasyaBtn").attr("disabled", "disabled");
    }
}

/** 仮納車確定ボタンのチェック 画面モード3 */
function CheckkaNasyaBtn() {
    var newDate = $('.calendar-left').spmCalendar('get');
    if (newDate == "") {
        $(".kaNasyaBtn").attr("disabled", "disabled");
    }
}

/** Tipの更新するかどうか 画面モード3、4、5 */
function isUpdateTip() {
    var valKbFollow = $("#followKbHid").val();
    if(gamenMode == '3') {
        return (valKbFollow != '115'
            && valKbFollow != '117'
            && valKbFollow != '119'
            && valKbFollow != '121'
            && valKbFollow != '206'
        );
    }
    if(gamenMode == '4') {
        return (valKbFollow != '115'
            && valKbFollow != '117'
            && valKbFollow != '123'
        );
    }

    if(gamenMode == '5') {
        return (valKbFollow == '113' || valKbFollow == '207');
    }
}

// 以下画面モード3用の関数
/** ポップアップを閉じる */
function popupClose() {
    $("#S10104-nextFollow").hide();
  
    setTimeout(function () {
      $("#S10104-nextFollow iframe").remove();
      $("#S10104-nextFollow").remove();
    }, 200);
}
  
/** 次回フォロー日入力画面表示終了処理 */
function onLoadCompleteKakuteiFuka() {
    window.parent.spmMasterLayout.LoadEnd();
}
  
/** 次回フォロー日入力画面終了処理 */
function onCloseCompleteKakuteiFuka() {
}

/** riyuuSetInfoAfter実行後処理 */
function GetRiyuuSetInfoAfter() {
    CheckNasyaBtn();
    $(".riyuu-area .chk-btn").click(function () {
        CheckNasyaBtn();
    });
}

/* 納車確定ボタン押下後処理 */
function updateKakuteiAfter() {
    if(gamenMode == '1') {
        var gamenStr = '書類計画日入力';
    } else if(gamenMode == '3') {
        var gamenStr = '納車予定日入力';
    } else if(gamenMode == '4') {
        var gamenStr = '次回フォロー日入力';
    } else if(gamenMode == '5') {
        var gamenStr = '下取り計画日入力';
    } else if(gamenMode == '6') {
        var gamenStr = '回収計画日入力';
    }

    var resultCode = $("[id$='\:updateResultCd']").val();

    window.parent.spmMasterLayout.LoadEnd();
    if (resultCode == "OK"){
        if(gamenMode == '1' || gamenMode == '3' ) {
            window.parent.$("#S10101Frame")[0].contentWindow.calendarClose(true, true);
        } else {
            window.parent.$("#S10101Frame")[0].contentWindow.calendarClose(true, isUpdateTip());
        }
        window.parent.white_popup_close('SJ010220');
    } else {
        // エラーダイアログ
        var resultMessage = $("[id$='\:updateResultMsg']").val();
        spmDialog.error('-1', gamenStr, resultMessage, '納期CS カレンダー');
    }
}

/* 仮納車確定ボタン押下後処理 */
function updatekariNousyaKakuteiAfter() {
    var resultCode = $("[id$='\:updateResultCd']").val();

    window.parent.spmMasterLayout.LoadEnd();
    if (resultCode == "OK"){
        window.parent.$("#S10101Frame")[0].contentWindow.calendarClose(true, isUpdateTip());
        window.parent.white_popup_close('SJ010220');
    } else {
        // エラーダイアログ
        var resultMessage = $("[id$='\:updateResultMsg']").val();
        spmDialog.error('-1', '納車予定日入力', resultMessage, '納期CS カレンダー');
    }
}