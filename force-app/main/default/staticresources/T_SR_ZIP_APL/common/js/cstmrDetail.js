/*************************/
/*   新SPM詳細画面呼出   */
/*************************/

var SJCstmrDetail = function () {};
var SJCstmrDetailConst = {};

/* 新SPM詳細画面を開く                   */
/* displayId : 画面ID                    */
/* param     : cstmrDetail.GetParameter  */
SJCstmrDetail.open = function (screenid, url, param, successCallBack, errorCallBack) {
    SJPopup.open(screenid, url, param, '735', '1280');
};

/*******************************/
/*   新SPMお客様検索画面呼出   */
/*******************************/

var SJCstmrSearch = function () { };

/* 新SPM詳細画面を開く                   */
/* displayId : 画面ID                    */
/* param     : cstmrDetail.GetParameter  */
SJCstmrSearch.open = function (screenid, url, param, successCallBack, errorCallBack) {
    SJPopup.open(screenid, url, param, '735', '1280');

    // 2019/06/28 del start SG90900は融合版開発の対象外の為、削除
    //if (window.location.href.indexOf('SG90900') >= 0) {
    //    $(".fteerBar").css('z-index', "599");
    //}
    // 2019/06/28 del end SG90900は融合版開発の対象外の為、削除

};
