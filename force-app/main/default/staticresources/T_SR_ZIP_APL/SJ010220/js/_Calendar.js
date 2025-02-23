var _spmCalendarLogic = {};

_spmCalendarLogic.initialize = function (dateSelectAction) {
    if (!dateSelectAction) {
        // 処理なしの場合は空のアクションを作成する
        dateSelectAction = function () { };
    }

    //====================================
    // イベント処理
    //====================================
    $('.calendar-left').spmCalendar({
        date: $("#selectDtHid").val(),
        minDate: 'today',
        onMonthChange: function (year, month) {
            var monthStr = "";
            if (month < 10) {
                monthStr = "0" + month;
            } else {
                monthStr = "" + month;
            }
            var objID = $("#objIDHid").val(); // オブジェクトID
            var kakuteiFuka = $("#kakuteiFukaKbnHid").val(); // 確定不可区分
            var katudoType = $("#katsudoShuruiHid").val(); // 活動の種類
            var hyoujiYM = year + "/" + monthStr;
            $("#hyoujiYMHid").val(hyoujiYM);
            var selectDt = $("#selectDtHid").val(); // 選択日

            Visualforce.remoting.Manager.invokeAction(
                _spmCalendarLogic.RemoteActionCalendarInfo,
                objID,
                kakuteiFuka,
                katudoType,
                hyoujiYM,
                selectDt,
                function(data, event) {
                    if (event.status) {
                        if (data.Result != "ERR") {
                            var data = data.Result;
                            //カレンダー情報設定
                            $('.calendar-left').spmCalendar('setInfo', data);
                        }
                    } else {
                        // エラーダイアログ
                    }
                },
                {escape: true}
            );
        },
        onDateSelected: dateSelectAction
    });

    // カレンダー情報設定
    var info = $("#setInfoHid");
    if(info) {
        var data = JSON.parse(info.val());
        $('.calendar-left').spmCalendar('setInfo', data);
    }
}