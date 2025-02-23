/*
 * システム   : 次期営業支援システム全国版
 * 機能名     : 活動結果入力（納期CS業務）（S1）
 * ファイル名 : T_SR_JS_KatsudoKekkaNyuryokuTabDeliveryCSBusiness.js
 *
 *  VERSION    DATE        BY          CHANGE/COMMENT
 * ----------------------------------------------------------------
 *  1.00       2019/08/15  HISOL張     新規作成
 */
// 改善対応46 2019/04/09 ADD Start
var KatsudoKekkaNyuryokuDeliveryCSBusinessResultCd = '1';
// 改善対応46 2019/04/09 ADD End
$(function () {
    // 改善対応46 2019/04/09 ADD Start
    try {
        if (window.parent.parent.location.href.indexOf('HISOL_T_P_KanbanPost') >= 0) {
            KatsudoKekkaNyuryokuDeliveryCSBusinessResultCd = '2';
        } else if (window.parent.parent.location.href.indexOf('SC9S00306') >= 0
                && window.parent.parent.parent.location.href.indexOf('HISOL_T_P_KanbanPost') >= 0
                ) {
            KatsudoKekkaNyuryokuDeliveryCSBusinessResultCd = '3';
        }
    } catch(e) {
    }
    // 改善対応46 2019/04/09 ADD End

    //====================================
    // イベント処理
    //====================================
    KatsudoKekkaNyuryoku = {
      Refresh: function (param) {
        // 納期CSでは何も行わない
      }
    },
    // 画面イニシャル処理
    $(function () {
        //メモ入力制限設定
        spmConstraint.setMaxByte($("[id$=katudo-memo]"), 500);

        // スクロールバー設定
        var scrollClassArray = ['.S10101-dcscp-nc-scroll', '.S10101-dcscp-nr-scroll'];
        scrollClassArray.reduce(function (promise, className) {
            return promise.then(function () {
                return setScrollbar(className);
            });
        }, $.Deferred().resolve()).then(function () {
        });
    });

    $(document).on("click", ".tbl_dateBtn", function (e) {

        var parameters = {};
        parameters['Id'] = $("[id$=hidNokiCsId]").val();
        parameters['KatsudoNoShurui_ChuBunrui'] = $(this).data("chubunrui");
        parameters['KeikakuBi'] = $(this).data("plandd");
        window.parent.white_popup("/apex/" + S10101Const.NAMESPACEPREFIX + "T_P_NokiCsGyomuCalendar",
            parameters,
            { width: '1000px', height: '625px', onLoadComplete: null, onClose: function(){} },
            "SJ010220"
        );
        $("[id$=S10101-hidden-memo]").val($("[id$=katudo-memo]").text());
    });

    //重点フォローボタン
    $(".jutenFollowBtn").on("click", function (e) {
        if ($('#hidContactId').val() != "") {
            if (getBytes($("[id$=katudo-memo]").text()) <= 500) {
                spmMasterLayout.LoadStart(parent.document);
                var params = {
                        syoriKbn: "1",
                        input: {
                            contactId: $("[id$=hidContactId]").val()
                        },
                        memo: {
                            memoUpdKbn: "0",
                            seqNo: "0",
                            memo: $("[id$=katudo-memo]").val()
                        },
                };
                Visualforce.remoting.Manager.invokeAction( S10101Const.NOUKICSPLANCOMMIT, JSON.stringify(params), function(data, event){
                    if (event.status) {
                        if (data.ResultCode == "OK") {
                            if ($(".jutenFollowBtn").hasClass("gray")) {
                                $(".jutenFollowBtn").removeClass("gray")
                                $(".jutenFollowBtn").text("重点フォロー");
                            } else {
                                $(".jutenFollowBtn").addClass("gray")
                                $(".jutenFollowBtn").text("重点フォロー中");
                            }
                        } else {
                            window.parent.spmDialog.error('1', '納期CS 業務', data.Message, '詳細(納期CS 業務)');
                        }
                        spmMasterLayout.LoadEnd(parent.document);
                    } else {
                        // エラーダイアログ
                        window.parent.spmDialog.error('1', '納期CS 業務', 'KatsudoKekkaNyuryoku', '詳細(納期CS 業務)');
                        spmMasterLayout.LoadEnd(parent.document);
                    }
                });
            } else {
                window.parent.spmDialog.error('1', '納期CS 業務', S10101Const.MSG_0001/*"メモの入力値を500バイト以下にしてください。"*/);
            }
        }
    });

    //メモ登録ボタン
    $(".memoTourokuBtn").on("click", function (e) {
        if (getBytes($("[id$=katudo-memo]").text()) <= 500) {
            spmMasterLayout.LoadStart(parent.document);
            var params = {
                syoriKbn: "2",
                input: {
                    nokiCsId: $("[id$=hidNokiCsId]").val(),
                    meisaiId: $("[id$=hidMeisaiId]").val()
                },
                noukiKakuteiFukaList: [
                    {NokiKakuteiFukaRiyuId: $("[id$=hidNokiKFRiyuId]").val()}
                ],
                noukiHenkoList: [
                    {nokiHenkoId: $("[id$=hidNokiHenkoId]").val()}
                ],
                memo: {
                    memoUpdKbn: $("#hidMemoUpdKbn").val(),
                    seqNo: $("#hidSeqNo").val(),
                    memo: $("[id$=katudo-memo]").val()
                },
            };
            Visualforce.remoting.Manager.invokeAction( S10101Const.NOUKICSPLANCOMMIT, JSON.stringify(params), function(data, event){
                if (event.status) {
                    if (data.ResultCode == "OK") {
                        //var json = JSON.parse(data.ResultJson);
                        var json = data.ResultJson;
                        if (json.MemoUpdKbn == "1") {
                            $('.noukiKakuteiFuka .list-deta-detail').each(function () {
                                if ($('.seqNoHid', this).text() == json.SeqNo) {
                                    $('.memoHid', this).text(json.Memo);
                                }
                            });
                        } else if (json.MemoUpdKbn == "2") {
                            $('.noukiHenko .list-deta-detail').each(function () {
                                if ($('.seqNoHid', this).text() == json.SeqNo) {
                                    $('.memoHid', this).text(json.Memo);
                                }
                            });
                        }
                        $("[id$=katudo-memo]").text(json.MemoInput);
                        $("#hidMemoUpdKbn").val("0");
                        $("#hidSeqNo").val("0");
                    } else {
                        window.parent.spmDialog.error('1', '納期CS 業務', data.Message, '詳細(納期CS 業務)');
                    }
                    spmMasterLayout.LoadEnd(parent.document);
                } else {
                    // エラーダイアログ
                    window.parent.spmDialog.error('1', '納期CS 業務', 'KatsudoKekkaNyuryoku', '詳細(納期CS 業務)');
                    spmMasterLayout.LoadEnd(parent.document);
                }
            });
        } else {
            window.parent.spmDialog.error('1', '納期CS 業務', S10101Const.MSG_0001/*"メモの入力値を500バイト以下にしてください。"*/);
        }
    });

    //完了ボタン
    $(".kanryouBtn").on("click", function (e) {
        if (!$(this).hasClass("disabled")) {
            if (getBytes($("[id$=katudo-memo]").text()) <= 500) {
                spmMasterLayout.LoadStart(parent.document);
                var params = {
                        syoriKbn: "3",
                        input: {
                            chuBunrui: $("[id$=hidChuBunrui]").val(),
                            nokiCsId: $("[id$=hidNokiCsId]").val(),
                            meisaiId: $("[id$=hidMeisaiId]").val()
                                },
                        memo: {
                            memoUpdKbn: "0",
                            seqNo: "0",
                            memo: $("[id$=katudo-memo]").val()
                        },
                };
                Visualforce.remoting.Manager.invokeAction( S10101Const.NOUKICSPLANCOMMIT, JSON.stringify(params), function(data, event){
                    if (event.status) {
                        if (data.ResultCode == "OK") {
                            window.parent.spmPopup.close({
                                ProgramId: 'KatsudoKekkaNyuryoku',
                                MessageId: '000001',
                                // 改善対応46 2019/04/09 ADD Start
                                //ResultCd: '1'
                                ResultCd: KatsudoKekkaNyuryokuDeliveryCSBusinessResultCd
                                // 改善対応46 2019/04/09 ADD End
                            });
                            window.parent.spmWindow.allClose();
                        } else {
                            window.parent.spmDialog.error('1', '', data.Message, '詳細(納期CS 業務)');
                        }
                        spmMasterLayout.LoadEnd(parent.document);
                    } else {
                        // エラーダイアログ
                        window.parent.spmDialog.error('1', '納期CS 業務', 'KatsudoKekkaNyuryoku', '詳細(納期CS 業務)');
                        spmMasterLayout.LoadEnd(parent.document);
                    }
                });
            } else {
                window.parent.spmDialog.error('1', '納期CS 業務', S10101Const.MSG_0001/*"メモの入力値を500バイト以下にしてください。"*/);
            }
        }
    });
    //====================================
    // 他画面処理
    //====================================

});

function memoHyouji(obj) {
    $("[id$=katudo-memo]").text($(obj).siblings(".memoHid").text());
    $("#hidMemoUpdKbn").val($(obj).data("kbn"));
    $("#hidSeqNo").val($(obj).siblings(".seqNoHid").text());
    $("#hidNokiKFId").val($(obj).siblings(".nokiKFRiyuIdHid").text());
    $("#hidNokiHenkoId").val($(obj).siblings(".nokiHenkoIdHid").text());
}

// 改善対応46 2019/04/09 ADD Start
//function calendarClose(isReload) {
function calendarClose(isReload, isUpdateTip) {
// 改善対応46 2019/04/09 ADD End
    // 改善対応46 2019/04/09 ADD Start
    if (isUpdateTip) {
        try {
            window.parent.parent.updateTipGrayCSB_SG10040([{
                    noCyumon: $('[id$=hidCyumonNo]').val(),
                    noCyumonEd: $('[id$=hidCyumonedNo]').val(),
                    kbFollow: $("[id$=hidFollowKbn]").val(),
                    kbFollowKotei: $('[id$=hidFollowKoteiKbn]').val()
            }]);
        } catch(e) {
        }
    }
    // 改善対応46 2019/04/09 ADD End

    if (isReload) {
      reloadDelCsCreatePlan();
    }
}

function getBytes(strSrc) {
    var len = 0;
    strSrc = escape(strSrc);
    for (i = 0; i < strSrc.length; i++, len++) {
        if (strSrc.charAt(i) == "%") {
            if (strSrc.charAt(++i) == "u") {
                i += 3;
                len++;
            }
            i++;
        }
    }
    return len;
}

function reloadDelCsCreatePlanAfter()
{
  $("[id$=katudo-memo]").text($("#S10101-hidden-memo").val());
}

function setScrollbar(className) {
    var dfd = $.Deferred();
    setTimeout(function () {
        spmScrollbar.set(className);
        dfd.resolve();
    }, 0);
    return dfd.promise;
}

