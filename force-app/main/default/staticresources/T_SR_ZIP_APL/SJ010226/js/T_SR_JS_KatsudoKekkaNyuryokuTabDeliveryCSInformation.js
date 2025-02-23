/*
 * システム   : 次期営業支援システム全国版
 * 機能名     : 活動結果入力（納期CS納期案内）
 * ファイル名 : T_SR_JS_KatsudoKekkaNyuryokuTabDeliveryCSInformation.js
 *
 *  VERSION    DATE        BY          CHANGE/COMMENT
 * ----------------------------------------------------------------
 *  1.00       2019/08/20  HISOL清水   新規作成
 */
$(function () {

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
        setTimeout(function () {
            spmScrollbar.set('.S10101-ar-scroll');
            if ($(".S10101-delivery-default-check").length > 0) {
                $(".S10101-delivery-info-body-detail .tse-scroll-content").scrollTop($(".S10101-delivery-default-check").parents(".S10101-delivery-info-body-detail-row").offset().top - $(".S10101-delivery-info-body-detail .tse-scroll-content").offset().top);
            }
        }, 0);
        $('.S10101-delivery-default-check').trigger("click");
    });

    $('.S10101-delivery-info').on("click", '.S10101-delivery-info-body-detail-row', function (e) {
        if ($(e.target).hasClass('S10101-check-annai-label')) {
            return;
        }
        var chb = $(this).find('input[type="checkbox"]');
        chb.trigger('click');
    });

    $('.S10101-delivery-info').on("click", '.S10101-delivery-info-body-detail .S10101-delivery-info-body-check input[type="checkbox"]', function (e) {
        e.stopPropagation();
        var chkValue = [];
        var idList = [];
        var statusFlg = "0";
        $('.S10101-delivery-info-body-detail .S10101-delivery-info-body-check input[type="checkbox"]:checked').each(function () {
            chkValue.push($(this).val());
            idList.push($(this).attr("id"));
            if ($('.S10101-delivery-info-body-detail .S10101-delivery-info-body-timing[data-annaicd=' + $(this).attr("id") + ']').attr("data-status") == "0") {
                statusFlg = "1";
            }
        });
        if (chkValue.length != 1) {
            // 複数チェックボックス選択時
            $('.meruBtn').addClass("disabled");
            $('.denwaBtn').addClass("disabled");
            $('.mencyakuBtn').addClass("disabled");
            // チェックボックス選択0（外した場合）
            if (chkValue.length == 0) {
                $('.nasiBtn').addClass("disabled");
            } else {
                // チェックした項目のステイタスが全て0(未案内)以外の場合
                if (statusFlg == "1") {
                    $('.nasiBtn').removeClass("disabled");
                } else {
                    $('.nasiBtn').addClass("disabled");
                }
            }
        } else {
            // ステータス取得
            var status = $('.S10101-delivery-info-body-detail .S10101-delivery-info-body-timing[data-annaicd=' + idList[0] + ']').attr("data-status");

            // 未案内の場合
            if (status == "0") {
                $('.nasiBtn').removeClass("disabled");
            } else {
                $('.nasiBtn').addClass("disabled");
            }

            if ($('.mjSobetu').text() == '在庫' && (chkValue[0] == "0702" || chkValue[0] == "0703" || chkValue[0] == "0704")) {
                // 在庫車且つ長期フォロー又は生産完了予定又は生産完了の場合
                $('.meruBtn').addClass("disabled");
                $('.denwaBtn').addClass("disabled");
                $('.mencyakuBtn').addClass("disabled");
            }
            else {

                // 案内済みの場合
                if (status == "1" || status == " ") {
                    $('.denwaBtn').addClass("disabled");
                    $('.mencyakuBtn').addClass("disabled");
                } else {
                    $('.denwaBtn').removeClass("disabled");
                    $('.mencyakuBtn').removeClass("disabled");
                }

                // 未案内又は案内しない以外の場合で方法がメール以外の場合
                if (status != "0" && status != "2") {
                    var houhou = $('.S10101-delivery-info-body-detail .S10101-delivery-info-body-timing[data-annaicd=' + idList[0] + ']').data("houhou");
                    if (houhou != "3") {
                        $('.meruBtn').addClass("disabled");
                    } else {
                        $('.meruBtn').removeClass("disabled");
                    }
                } else {
                    $('.meruBtn').removeClass("disabled");
                }
            }
        }
    });

    $(".S10101-btnDiv div").on("click", function (e) {
        if (!$(this).hasClass("disabled")) {
            var type = "";
            var status = ""
            if ($(this).hasClass("nasiBtn")) {
                type = "0";
                status = "2";
            } else if ($(this).hasClass("mencyakuBtn")) {
                type = "1";
                status = "1";
            } else if ($(this).hasClass("denwaBtn")) {
                type = "2";
                status = "1";
            } else if ($(this).hasClass("meruBtn")) {
                type = "3";
                status = "1";
            }
            var chkValue = [];
            var idList = [];
            $('.S10101-delivery-info-body-detail .S10101-delivery-info-body-check input[type="checkbox"]:checked').each(function () {
                chkValue.push($(this).val());
                idList.push($(this).attr("id"));
            });
            if (chkValue.length > 0) {
                spmMasterLayout.LoadStart(parent.document);
                var data = {
                    chkValue: chkValue,
                    nokiCsId: $('[id$=hidNokiCsId]').val(),
                    statusKbn: status,
                    taiouKbn: type
                };
                s10101Commit(JSON.stringify(data));
                /*
                Visualforce.remoting.Manager.invokeAction( S10101Const.DELIVERYCSINFORMATIONCOMMIT, 
                        chkValue,
                        $('[id$=hidNokiCsId]').val(),
                        status,
                        type,
                        function(data, event){
                            if (event.status) {
                                if (data.ResultCode == "OK") {
                                    // 納期案内再描画
                                    reloadDeliveryInformation();
                                } else {
                                    window.parent.spmDialog.error('1', '納期CS 納期案内', data.Message, '詳細(納期CS 納期案内)');
                                }
                                spmMasterLayout.LoadEnd(parent.document);
                            } else {
                                // エラーダイアログ
                                window.parent.spmDialog.error('1', '納期CS 納期案内', 'KatsudoKekkaNyuryoku', '詳細(納期CS 納期案内)');
                                spmMasterLayout.LoadEnd(parent.document);
                            }
                });
                */
            } else {
                window.parent.spmDialog.show(S10101Const.MSG_0002/*"１つ以上のチェックボックスをONにしてください。"*/, '入力エラー', window.parent.spmDialog.icons.error, null, null, null);
            }
        }
    });

    //====================================
    // 他画面処理
    //====================================

});

function reloadDeliveryInformationAfter()
{
      $('.meruBtn').addClass("disabled");
      $('.denwaBtn').addClass("disabled");
      $('.mencyakuBtn').addClass("disabled");
      $('.nasiBtn').addClass("disabled");
      setTimeout(function () {
          spmScrollbar.set('.S10101-ar-scroll');
      }, 0);
}
// 改善対応46 2019/04/09 ADD Start
function reloadDeliveryInformationBefore() {
    try {
        // かんばんポストから開かれた場合のみグレーアウト処理を行う
        if(typeof window.parent.parent.updateTipGrayCSI_SG10040 === 'function') {
            var meisaiId = $('[id$=S10101-ncs-MeisaiId]').val();
            var meisaiIdList = [];
            // 更新するチップが2つ以上の場合
            if (meisaiId.indexOf(',') != -1) {
                var maisaiIdArray = meisaiId.split(",");
                for (var i = 0; i < maisaiIdArray.length; i++) {
                    meisaiIdList.push({
                        Id: maisaiIdArray[i]
                    });
                }
            } else {
                meisaiIdList.push({
                    Id: meisaiId
                });
            }
            // チップのグレーアウト
            window.parent.parent.updateTipGrayCSI_SG10040(meisaiIdList);
        }
    } catch(e) {
    }
}
// 改善対応46 2019/04/09 ADD End
/*
// 納期案内 リロード処理
function reloadDeliveryInformation()
{
  var url = location.href;
  var parameters = url.match(/\?([^?]*)$/);
  var params = {};
  if (parameters) {

    parameters = parameters[1];

    var keyValues = parameters.split('&');

    for (var index = 0; index < keyValues.length; index++) {

      var keyValue = keyValues[index].split('=');
      var key = keyValue[0];
      var value = decodeURIComponent(keyValue[1]);

      params[key] = value;
    }
  } else {
    return;
  }

  params.View = 'RefreshDeliveryInformation';
  var url = './KatsudoKekkaNyuryoku_DeliveryCSPartial';
  spmAjax.getPrtial(
    url,
    params
    ,
    function (data) {
      $(".S10101-delivery-info").html(getHTMLString(data));
      $('.meruBtn').addClass("disabled");
      $('.denwaBtn').addClass("disabled");
      $('.mencyakuBtn').addClass("disabled");
      $('.nasiBtn').addClass("disabled");
      setTimeout(function () {
          spmScrollbar.set('.S10101-ar-scroll');
      }, 0);
    },
    function (XMLHttpRequest, textStatus, errorThrown, msg) {
      // エラーダイアログ
      spmDialog.error('0', '納期CS 納期案内', 'KatsudoKekkaNyuryoku', '納期CS 納期案内');
    }
  );


  spmAjax.getPrtial(
    "/S1/KatsudoKekkaNyuryoku/RefreshDeliveryInformation",
    params
    ,
    function (data) {
      $(".S10101-delivery-info").html(data);
      $('.meruBtn').addClass("disabled");
      $('.denwaBtn').addClass("disabled");
      $('.mencyakuBtn').addClass("disabled");
      $('.nasiBtn').addClass("disabled");
      setTimeout(function () {
          spmScrollbar.set('.S10101-ar-scroll');
      }, 0);
    },
    function (XMLHttpRequest, textStatus, errorThrown, msg) {
      // エラーダイアログ
      spmDialog.error('0', '納期CS 納期案内', 'KatsudoKekkaNyuryoku', '納期CS 納期案内');
    });

}
*/

function getHTMLString(value) {
  var result = value;
  if (result) {
    var idxStart = result.indexOf('/*--');
    var idxEnd = result.indexOf('--*/');
    if (0 <= idxStart && 0 <= idxEnd && idxStart + 4 < idxEnd) {
      result = result.slice(idxStart + 4, idxEnd - 1);
    }
  }
  return result;
}

function s10101CommitAfter() {
    var data = {
        ResultCode: $('[id$=S10101-ncs-ResultCode]').val(),
        Message: $('[id$=S10101-ncs-Message]').val(),
        MeisaiId: $('[id$=S10101-ncs-MeisaiId]').val()
    };
    if (data.ResultCode == "OK") {
        // 納期案内再描画
        reloadDeliveryInformation();
    } else {
        window.parent.spmDialog.error('1', '納期CS 納期案内', data.Message, '詳細(納期CS 納期案内)');
    }
    spmMasterLayout.LoadEnd(parent.document);
}