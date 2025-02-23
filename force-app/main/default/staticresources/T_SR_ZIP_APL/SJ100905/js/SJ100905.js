/**
 * @fileoverview SJ100905 共通機能 カレンダー
 *
 * カレンダーが表示され、そこで日付を選択することもできる。
 *
 * ■ 利用方法
 *   1. SJ100905.css と SJ100905.js の参照
 *     <apex:stylesheet value="{!URLFOR($Resource.T_SR_ZIP_APL, '/SJ100905/styles/SJ100905.css')}"/>
 *     <apex:includeScript value="{!URLFOR($Resource.T_SR_ZIP_APL, '/SJ100905/js/SJ100905.js')}"/>
 *
 *   2. 日付入力を行う場所に ID を設定した div 要素を配置
 *     <div id="targetID"></div>
 *
 *   3. 初期化
 *     $('#targetID').spmDate();
 *
 *     初期化パラメータとして以下の項目を指定できる。
 *
 *     ・minDate: カレンダーで選択できる範囲の最小日付
 *         'today' を指定すると、今日以降
 *         'yyyy/mm/dd' を指定すると、指定した日付以降
 *         未指定の場合、今日の100年前以降
 *
 *     ・maxDate: カレンダーで選択できる範囲の最大日付
 *         'today' を指定すると、今日以前
 *         'yyyy/mm/dd' を指定すると、指定した日付以前
 *         未指定の場合、今日の100年後以前
 *
 *     ・disabled: 無効設定
 *         true 日付入力コントローラが無効になる
 *         false, 未指定 日付入力コントローラが有効になる
 *
 *     初期化パラメータ指定例
 *     $('#targetID').spmDate({
 *       minDate: 'today',
 *       maxDate: '2099/12/31',
 *       disabled: false
 *     });
 *
 *   4. 日付設定
 *     $('#targetID').spmDate('set', 'yyyy/mm/dd');
 *     'yyyy/mm/dd'形式の文字列で日付を渡す。
 *
 *   5. 日付取得
 *     var date = $('#targetID').spmDate('get');
 *     'yyyy/mm/dd'形式の文字列で日付を取得。
 *     日付が未入力、無効な場合は空文字が戻る。
 *
 *   6. 無効設定
 *     $('#targetID').spmDate('disabled', true);
 *     コントローラを無効にする場合は引数に true を渡す。
 *
 *   7. 日付検証
 *     var ok = $('#targetID').spmDate('validate');
 *     全項目が未入力まはた日付として正しい値が入力されている場合、trueを返す。
 *     入力が不完全または日付として不正な値(2月31日等)が入力されている場合、falseを返す。
 */

// 静的リソースパス格納用の変数
var dateJs = {
    staticResourcePath : ""
};

/**
 * 名前空間対応 静的リソース内ではサーバー変数等使用できないので自己のパスから名前空間を解析する
 * /resource/timestamp/(名前空間)+静的リソース名で出力される
 */
function getNameSpacePrefix() {
  var srcUrl;
  if(dateJs.staticResourcePath != "") {
    srcUrl = dateJs.staticResourcePath;
  } else {
    srcUrl = $("[src$='/SJ100905.js']").prop("src");
  }
  var indexfirst = srcUrl.indexOf("/", srcUrl.indexOf("/resource/") + 10 + 1) + 1; // /resource/timestamp/の次の位置
  var indexlast = srcUrl.indexOf("/", indexfirst);
  var rsourceName  = srcUrl.slice(indexfirst, indexlast);
  // 静的リソース名に名前空間が含まれているか
  var indexWubar = rsourceName.indexOf("__");
  // 含まれていたら名前空間を抜き出す
  var ns = "";
  if(indexWubar > 0) {
    ns = rsourceName.slice(0, indexWubar);
  }
  return ns;
}

/**
 * 名前空間対応 名前空間を取得しクラス名にセットする
 */
function setNameSpacePrefix(className) {
  var fullName;
  var ns = getNameSpacePrefix();
  if(ns != "") {
    fullName = ns + "." + className;
  } else {
    fullName = className;
  }

  return fullName;
}

// 静的リソースパスを渡してカレンダーを初期化
function initDatePlugin(resourcepath) {
  dateJs.staticResourcePath = resourcepath;
  initCalenderPlugIn();
}

/**
 * カレンダープラグイン
 */
function initCalenderPlugIn() {
  /**
   * オプションデフォルト値
   */
  var defaults = {
    'date': '',
    'minDate': '',
    'maxDate': '',
    'onMonthChange': null,
    'onLoad': null,
    'onDateSelected': null
  };

  /**
   * オプション保持変数
   */
  var settingsStore = {};

  /**
   * 本日
   */
  var today = new Date();

  /**
   * メソッド定義
   */
  var methods = {
    /**
     * 初期化
     */
    init: function (options) {
      var settings = $.extend({}, defaults, options);
      var elem = $(this);

      if (settings.date) {
        if (!spmDateCommon.isDate(settings.date)) {
          console.error('指定された date: ' + settings.date + ' は日付として正しくありません。');
          settings.date = '';
        }
      }

      if (settings.minDate) {
        if (settings.minDate == 'TODAY' || settings.minDate == 'today') {
          settings.minDate = spmDateCommon.formatDateToYYYYsMMsDD(new Date());
        } else if (!spmDateCommon.isDate(settings.minDate)) {
          console.error('指定された minDate: ' + settings.minDate + ' は日付として正しくありません。');
          settings.minDate = '';
        }
      }
      if (!settings.minDate) {
        settings.minDate = spmDateCommon.formatDateToYYYYsMMsDD(spmDateCommon.offsetDateByYears(new Date(), -100));
      }

      if (settings.maxDate) {
        if (settings.maxDate == 'TODAY' || settings.maxDate == 'today') {
          settings.maxDate = spmDateCommon.formatDateToYYYYsMMsDD(new Date());
        } else if (!spmDateCommon.isDate(settings.maxDate)) {
          console.error('指定された maxDate: ' + settings.maxDate + ' は日付として正しくありません。');
          settings.maxDate = '';
        }
      }
      if (!settings.maxDate) {
        settings.maxDate = spmDateCommon.formatDateToYYYYsMMsDD(spmDateCommon.offsetDateByYears(new Date(), 100));
      }

      // 要素のIDで設定を保持
      settingsStore[elem.id] = settings;

      elem.data('date', settings.date);
      elem.data('min-date', settings.minDate);
      elem.data('max-date', settings.maxDate);
      if (settings.date) {
        var selectDay = new Date(settings.date);
        elem.data('year', selectDay.getFullYear());
        elem.data('month', selectDay.getMonth() + 1);
      } else {
        today = new Date();
        elem.data('year', today.getFullYear());
        elem.data('month', today.getMonth() + 1);
      }

      this.addClass('spm-calendar');

      var checkElem = this.children('.spm-calendar-year');
      if (checkElem.length == 0) {
        // カレンダー要素生成
        this.append($(getCalendarElement()));
      }

      /**
       * 本日をタップ
       */
      elem.find('.spm-calendar-today-button').off('click');
      elem.find('.spm-calendar-today-button').on('click', function () {
        if (elem.data('is-loading') == 'true') {
          return;
        }
        today = new Date();
        if (today.getFullYear() != elem.data('year') ||
          today.getMonth() + 1 != elem.data('month')) {
          elem.data('select-today', 'true');
          move(elem, settings, today.getFullYear(), today.getMonth() + 1);
        } else {
          if (isSelectableToday(elem)) {
            var date = spmDateCommon.formatDateToYYYYsMMsDD(today);
            elem.data('date', date);
            updateSelectedDay(elem);
            if (settings.onDateSelected) {
              settings.onDateSelected(date);
            }
          }
        }
      });

      /**
       * 前年をタップ
       */
      elem.find('.spm-calendar-prev-year-button').off('click');
      elem.find('.spm-calendar-prev-year-button').on('click', function () {
        if (elem.data('is-loading') == 'true') {
          return;
        }
        move(elem, settings, elem.data('year') - 1, elem.data('month'));
      });

      /**
       * 次年をタップ
       */
      elem.find('.spm-calendar-next-year-button').off('click');
      elem.find('.spm-calendar-next-year-button').on('click', function () {
        if (elem.data('is-loading') == 'true') {
          return;
        }
        move(elem, settings, elem.data('year') + 1, elem.data('month'));
      });

      /**
       * 月をタップ
       */
      elem.find('.spm-calendar-month').off('click');
      elem.find('.spm-calendar-month').on('click', function () {
        if (elem.data('is-loading') == 'true') {
          return;
        }
        if ($(this).hasClass('spm-calendar-month-disable')) {
          return;
        }
        var newMonth = parseInt($(this).text());
        move(elem, settings, elem.data('year'), newMonth);
      });

      /**
       * 日をタップ
       */
      elem.find('.spm-calendar-day').off('click');
      elem.find('.spm-calendar-day').on('click', function () {
        if (elem.data('is-loading') == 'true') {
          return;
        }
        if ($(this).hasClass('spm-calendar-day-disable')) {
          return;
        }
        var day = parseInt($(this).find('.spm-calendar-day-num').text());
        if (day) {
          var year = elem.data('year');
          var month = elem.data('month');
          if ($(this).hasClass('spm-calendar-day-prev-month')) {
            month--;
          }
          if ($(this).hasClass('spm-calendar-day-next-month')) {
            month++;
          }
          var ym = adjustYearMonth(year, month);
          var date = ym.year + '/' + ('0' + ym.month).slice(-2) + '/' + ('0' + day).slice(-2);
          elem.data('date', date);
          updateSelectedDay(elem);
          if (settings.onDateSelected) {
            settings.onDateSelected(date);
          }
        }
      });

      if (!settings.onMonthChange) {
        request(elem, settings, elem.data('year'), elem.data('month'), null);
      }
    },

    /**
     * カレンダー情報設定
     */
    setInfo: function (data) {
      if (!data) {
        console.error('カレンダー情報設定に渡す data が存在しません。');
        return this;
      }

      var extData = data;
      if (typeof (data) == 'string' || data instanceof String) {
        extData = JSON.parse(data);
      }

      if (!extData.Year || extData.Year < 1 || extData.Year > 9999) {
        console.error('カレンダー情報設定に渡す Year:' + extData.Year + ' が不正です。');
        return this;
      }
      if (!extData.Month || extData.Month < 1 || extData.Month > 12) {
        console.error('カレンダー情報設定に渡す Month:' + extData.Month + ' が不正です。');
        return this;
      }

      var elem = $(this);
      var settings = settingsStore[elem.id];
      if (!settings) {
        console.error('カレンダー情報設定を行う前に初期化処理を行ってください。');
        return this;
      }

      request(elem, settings, extData.Year, extData.Month, extData);
    },

    /**
     * 選択日設定
     */
    set: function (yyyymmdd) {
      var date = '';
      if (yyyymmdd) {
        if (!spmDateCommon.isDate(yyyymmdd)) {
          console.error('指定された ' + yyyymmdd + ' は日付として正しくありません。');
          return this;
        }
        date = yyyymmdd;
      }
      $(this).data('date', date);
      updateSelectedDay($(this));
    },

    /**
     * 選択日取得
     */
    get: function () {
      var date = $(this).data('date');
      if (date) {
        return spmDateCommon.formatDateToYYYYsMMsDD(new Date(date));
      } else {
        return '';
      }
    },
  };

  /**
   * プラグイン定義
   */
  $.fn.spmCalendar = function (method) {

    // 要素が無い場合は終了
    if (this.length == 0) {
      return this;
    }

    // 複数要素が選択されている場合は1件づつ処理
    if (this.length > 1) {
      this.each(function () {
        $(this).spmCalendar(method);
      });
      return this;
    }

    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      console.error('Method ' + method + ' does not exist');
      return this;
    }
  };


  /**
   * 指定された年月へ移動します。
   * @param {Element} elem - 対象のカレンダー
   * @param {Object} settings - オプション
   * @param {number} year - 年
   * @param {number} month - 月
   */
  var move = function (elem, settings, year, month) {
    elem.data('is-loading', 'true');
    if (settings.onMonthChange) {
      settings.onMonthChange.call(elem, year, month);
    } else {
      var moveDate = new Date(year, month - 1, 1);
      var minDate = new Date(settings.minDate);
      var maxDate = new Date(settings.maxDate);
      if (moveDate < minDate) {
        year = minDate.getFullYear();
        month = minDate.getMonth() + 1;
      } else if (moveDate > maxDate) {
        year = maxDate.getFullYear();
        month = maxDate.getMonth() + 1;
      }
      request(elem, settings, year, month);
    }
  };

  /**
   * 指定された年月の情報を取得します。
   * @param {element} elem - 対象のカレンダー
   * @param {object} settings - オプション
   * @param {number} year - 年
   * @param {number} month - 月
   * @param {object} extData - 外部からのカレンダー設定情報
   */
  var request = function (elem, settings, year, month, extData) {
    elem.data('is-loading', 'true');
    var date = elem.data('date');
    var callback = { onSuccess: function(result){
      var data = JSON.parse(result);
      data.Date = data.selectedDate;  // SFDCでDateは予約語で使用できないためここで入れ替える
      render(elem, settings, data, extData);
      if (settings.onLoad) {
        settings.onLoad.call(elem);
      }
    }, onFailure: function(error){
      spmDialog.errorMsg(error.faultstring, 'カレンダー');
    }};
    // 名前空間付きでクラスを呼ぶ必要があれば付与する
    var className = setNameSpacePrefix("T_P_CalendarControllerNew");
    var calendarPage = sforce.apex.execute(className,"getCalendarPage",
        {paramDate: date,
        minDate: settings.minDate,
        maxDate: settings.maxDate,
        year: year,
        month: month},
    callback);
  };
  /**
   * カレンダー要素を取得します。
   * @return {string} カレンダー要素の文字列。
   */
  var getCalendarElement = function () {
    var elem = '<div class="spm-calendar-year"><span class="spm-calendar-era-year">年</span><button class="spm-calendar-today-button">本日</button></div>' +
      '<button class="spm-calendar-prev-year-button">&lt;</button>' +
      '<button class="spm-calendar-next-year-button">&gt;</button>';

    // 月選択
    elem += '<table class="spm-calendar-month-table"><tr>';
    for (var i = 1; i <= 6; i++) {
      elem += '<td><button class="spm-calendar-month">' + i + '</button></td>';
    }
    elem += '</tr><tr>';
    for (var i = 7; i <= 12; i++) {
      elem += '<td><button class="spm-calendar-month">' + i + '</button></td>';
    }
    elem += '</tr></table>';

    // 日選択
    var tt = ['日', '月', '火', '水', '木', '金', '土'];
    elem += '<table class="spm-calendar-day-table"><tr>';
    for (var i = 0; i < 7; i++) {
      elem += '<th>' + tt[i] + '</th>';
    }
    elem += '</tr>';
    for (var row = 0; row < 6; row++) {
      elem += '<tr>';
      for (var col = 0; col < 7; col++) {
        elem += '<td class="spm-calendar-day spm-calendar-day-' + (row * 7 + col) + '">' +
          '<div class="spm-calendar-day-border"><div class="spm-calendar-day-mark">' +
          '<div class="spm-calendar-day-num"></div><div class="spm-calendar-day-six"></div>' +
          '<div class="spm-calendar-day-today-mark">　</div>' +
          '<div class="spm-calendar-day-icon1"></div>' +
          '<div class="spm-calendar-day-icon2"></div>' +
          '<div class="spm-calendar-day-icon3"></div>' +
          '</div></div></td>';
      }
      elem += '</tr>';
    }
    elem += '</tr></table>';

    return elem;
  };

  /**
   * カレンダーを更新します。
   * @param {Element} elem - 更新するカレンダー
   * @param {Object} settings - オプション
   * @param {Object} data - 店舗休日、六曜等の基本データ
   * @param {Object} extData - 背景色、アイコン等の拡張データ
   */
  var render = function (elem, settings, data, extData) {
    elem.data('year', data.year);
    elem.data('month', data.month);
    var minDate = new Date(settings.minDate);
    var maxDate = new Date(settings.maxDate);
    var monthStartDate = new Date(data.year, data.month - 1, 1);
    var monthEndDate = new Date(data.year, data.month, 1);
    monthEndDate.setDate(0);
    today = new Date();
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    elem.find('.spm-calendar-era-year').text(data.dispLabel);

    // 年移動の設定
    if (extData == null) {
      elem.find('.spm-calendar-prev-year-button').prop('disabled', minDate.getFullYear() >= data.year);
      elem.find('.spm-calendar-next-year-button').prop('disabled', maxDate.getFullYear() <= data.year);
    } else {
      elem.find('.spm-calendar-prev-year-button').prop('disabled', 1 >= data.year);
      elem.find('.spm-calendar-next-year-button').prop('disabled', 9999 <= data.year);
    }

    // 月選択の設定
    var prevMonthInactive = false;
    var currentMonthInactive = false;
    var nextMonthInactive = false;
    var prevYearMonth = adjustYearMonth(data.year, data.month - 1);
    var nextYearMonth = adjustYearMonth(data.year, data.month + 1);
    var minActiveMonth = elem.data('min-active-month');
    var maxInactiveMonth = elem.data('max-inactive-month');
    if (extData) {
      // 前月の非活性判定
      prevMonthInactive = isAllInactiveDate(extData.PrevMonth);
      if (prevMonthInactive) {
        maxInactiveMonth = getMaxValue(maxInactiveMonth, prevYearMonth.year, prevYearMonth.month);
      } else {
        minActiveMonth = getMinValue(minActiveMonth, prevYearMonth.year, prevYearMonth.month);
      }
      // 対象月の非活性判定
      currentMonthInactive = isAllInactiveDate(extData.CurrentMonth);
      if (currentMonthInactive) {
        maxInactiveMonth = getMaxValue(maxInactiveMonth, data.year, data.month);
      } else {
        minActiveMonth = getMinValue(minActiveMonth, data.year, data.month);
      }
      // 次月の非活性判定
      nextMonthInactive = isAllInactiveDate(extData.NextMonth);
      if (nextMonthInactive) {
        maxInactiveMonth = getMaxValue(maxInactiveMonth, nextYearMonth.year, nextYearMonth.month);
      } else {
        minActiveMonth = getMinValue(minActiveMonth, nextYearMonth.year, nextYearMonth.month);
      }
      elem.data('min-active-month', minActiveMonth);
      elem.data('max-inactive-month', maxInactiveMonth);
    }
    var months = elem.find('.spm-calendar-month');
    for (var i = 0; i < months.length; i++) {
      $(months[i]).removeClass('spm-calendar-month-selected');
      $(months[i]).removeClass('spm-calendar-month-disable');
      $(months[i]).removeClass('spm-calendar-month-inactive');
      var targetMonth = parseInt($(months[i]).text());
      if (targetMonth == data.month) {
        $(months[i]).addClass('spm-calendar-month-selected');
      }
      if (extData == null) {
        if (!isEnableMonth(data.year, targetMonth, minDate, maxDate)) {
          $(months[i]).addClass('spm-calendar-month-disable');
          $(months[i]).addClass('spm-calendar-month-inactive');
        }
      } else if (extData.MonthInfo) {
        var monthBackColor = getMonthBackColor(extData, targetMonth);
        if (monthBackColor == 1){
          $(months[i]).addClass('spm-calendar-month-inactive');
        }
      } else {
        if (isInactiveMonth(data.year, targetMonth, data.month, prevMonthInactive, nextMonthInactive, minActiveMonth, maxInactiveMonth)) {
          $(months[i]).addClass('spm-calendar-month-inactive');
        }
      }
    }

    // 本日ボタンの設定
    if (extData == null) {
      elem.find('.spm-calendar-today-button').prop('disabled', !isEnableToday(minDate, maxDate));
    } else {
      elem.find('.spm-calendar-today-button').prop('disabled', false);
    }

    elem.find('.spm-calendar-day-icon1').css('background-image', 'none');
    elem.find('.spm-calendar-day-icon2').css('background-image', 'none');
    elem.find('.spm-calendar-day-icon3').css('background-image', 'none');

    var prevMonthOffset = monthStartDate.getDay();
    if (prevMonthOffset == 0) {
      prevMonthOffset = 7;
    }
    var prevMonthEnd = new Date(monthStartDate.getTime());
    prevMonthEnd.setDate(0);
    for (var i = 0; i < prevMonthOffset; i++) {
      var panelElem = elem.find('.spm-calendar-day-' + i);
      var panelData = data.prevMonth[7 - prevMonthOffset + i];
      var panelExtData = getPrevMonthExtData(extData, 7 - prevMonthOffset + i);
      var panelDate = new Date(prevYearMonth.year, prevYearMonth.month - 1, prevMonthEnd.getDate() - prevMonthOffset + i + 1);
      renderDay(panelElem, panelData, panelExtData, panelDate, minDate, maxDate, 'spm-calendar-day-prev-month');
    }

    for (var i = 0; i < monthEndDate.getDate(); i++) {
      var panelElem = elem.find('.spm-calendar-day-' + (prevMonthOffset + i));
      var panelData = data.currentMonth[i];
      var panelExtData = getCurrentMonthExtData(extData, i);
      var panelDate = new Date(data.year, data.month - 1, i + 1);
      renderDay(panelElem, panelData, panelExtData, panelDate, minDate, maxDate);
    }

    var nextMonthOffset = prevMonthOffset + monthEndDate.getDate();
    for (var i = 0; i < 42 - nextMonthOffset; i++) {
      var panelElem = elem.find('.spm-calendar-day-' + (nextMonthOffset + i));
      var panelData = data.nextMonth[i];
      var panelExtData = getNextMonthExtData(extData, i);
      var panelDate = new Date(nextYearMonth.year, nextYearMonth.month - 1, i + 1);
      renderDay(panelElem, panelData, panelExtData, panelDate, minDate, maxDate, 'spm-calendar-day-next-month');
    }

    if (elem.data('select-today') == 'true') {
      if (isSelectableToday(elem)) {
        var date = spmDateCommon.formatDateToYYYYsMMsDD(new Date());
        elem.data('date', date);
        if (settings.onDateSelected) {
          settings.onDateSelected(date);
        }
      }
      elem.data('select-today', 'false');
    }
    updateSelectedDay(elem);
    elem.data('is-loading', 'false');
  };

  /**
   * 指定された月が有効か判定します。
   * @param {number} year - 年
   * @param {number} month - 月
   * @param {Object} minDate - 選択範囲最小日付
   * @param {Object} maxDate - 選択範囲最大日付
   * @return {bool} 有効なら true。
   */
  var isEnableMonth = function (year, month, minDate, maxDate) {
    var checkMonth = new Date(year, month - 1, 1);
    var minMonth = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
    var maxMonth = new Date(maxDate.getFullYear(), maxDate.getMonth(), 1);
    return (checkMonth >= minMonth && checkMonth <= maxMonth);
  };

  /**
   * 全ての日が非活性か判定します。
   * @param {Object} days - 日付情報の配列
   * @return {bool} 全ての日が非活性なら ture。
   */
  var isAllInactiveDate = function (days) {
    if (days == null) {
      return false;
    }
    for (var i = 0; i < days.length; i++) {
      if (days[i].BackColor != 1) {
        return false;
      }
    }
    return true;
  };

  /**
   * 指定された月が非活性か判定します。
   * @param {number} year - 年
   * @param {number} month - 月
   * @param {number} selectedMonth - 選択中の月
   * @param {bool} prevMonthInactive - 先月が不活性か否か
   * @param {bool} nextMonthInactive - 次月が不活性か否か
   * @param {number} minActiveMonth - 最小の活性年月
   * @param {number} maxInactiveMonth - 最大の非活性年月
   * @return {bool} 非活性なら true。
   */
  var isInactiveMonth = function (year, month, selectedMonth, prevMonthInactive, nextMonthInactive, minActiveMonth, maxInactiveMonth) {
    if (month == selectedMonth) {
      return false;
    }
    if (month == selectedMonth - 1) {
      return prevMonthInactive;
    }
    if (month == selectedMonth + 1) {
      return nextMonthInactive;
    }
    if (!maxInactiveMonth) {
      return false;
    }
    if (!minActiveMonth) {
      return true;
    }
    if (minActiveMonth > maxInactiveMonth) {
      return (maxInactiveMonth >= year * 100 + month);
    } else {
      if (month < selectedMonth) {
        return prevMonthInactive;
      } else {
        return nextMonthInactive;
      }
    }
  };

  /**
   * 指定された月の背景色を取得します。
   * @param {Object} extData - 拡張データ
   * @param {number} month - 取得する月
   * @return {number} 0:標準色、1:灰色
   */
  var getMonthBackColor = function (extData, month) {
    if (extData.MonthInfo) {
      for (var i = 0; i < extData.MonthInfo.length; i++) {
        if (extData.MonthInfo[i].Month == month) {
          return extData.MonthInfo[i].MonthBackColor;
        }
      }
    }
    return 0;
  };

  /**
   * 本日が有効か判定します。
   * @param {Object} minDate - 選択範囲最小日付
   * @param {Object} maxDate - 選択範囲最大日付
   */
  var isEnableToday = function (minDate, maxDate) {
    var today = new Date();
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return (minDate <= today && today <= maxDate);
  };

  /**
   * 本日が選択可能か判定します。
   * @param {Element} elem - 対象のカレンダー
   */
  var isSelectableToday = function (elem) {
    var year = elem.data('year');
    var month = elem.data('month');
    today = new Date();
    if (today.getFullYear() != year || today.getMonth() + 1 != month) {
      // カレンダーの表示が当月でないので、判定不可能
      return null;
    }
    var days = elem.find('.spm-calendar-day');
    for (var i = 0; i < days.length; i++) {
      var day = $(days[i]);
      if (!day.hasClass('spm-calendar-day-prev-month') && !day.hasClass('spm-calendar-day-next-month')) {
        var dayNum = parseInt(day.find('.spm-calendar-day-num').text());
        if (dayNum == today.getDate()) {
          return !day.hasClass('spm-calendar-day-disable');
        }
      }
    }
    return false;
  };

  /**
   * 年月の値(年*100+月)を比較して最小年月を取得します。
   * @param {number} org - 比較元の年月
   * @param {number} year - 比較する年
   * @param {number} month - 比較する月
   * @return {number} 最小年月
   */
  var getMinValue = function (org, year, month) {
    var check = year * 100 + month;
    if (org) {
      return Math.min(org, check);
    } else {
      return check;
    }
  };

  /**
   * 年月の値(年*100+月)を比較して最大年月を取得します。
   * @param {number} org - 比較元の年月
   * @param {number} year - 比較する年
   * @param {number} month - 比較する月
   * @return {number} 最大年月
   */
  var getMaxValue = function (org, year, month) {
    var check = year * 100 + month;
    if (org) {
      return Math.max(org, check);
    } else {
      return check;
    }
  };

  /**
   * 前月の拡張データを取得します。
   * @param {Object} extData - 拡張データ
   * @param {number} index - 取得する日のインデックス
   * @return {Object} 指定されたインデックスの拡張データ
   */
  var getPrevMonthExtData = function (extData, index) {
    if (extData && extData.PrevMonth && extData.PrevMonth.length >= index - 1) {
      return extData.PrevMonth[index];
    } else {
      return null;
    }
  };

  /**
   * 今月の拡張データを取得します。
   * @param {Object} extData - 拡張データ
   * @param {number} index - 取得する日のインデックス
   * @return {Object} 指定されたインデックスの拡張データ
   */
  var getCurrentMonthExtData = function (extData, index) {
    if (extData && extData.CurrentMonth && extData.CurrentMonth.length >= index - 1) {
      return extData.CurrentMonth[index];
    } else {
      return null;
    }
  };

  /**
   * 次月の拡張データを取得します。
   * @param {Object} extData - 拡張データ
   * @param {number} index - 取得する日のインデックス
   * @return {Object} 指定されたインデックスの拡張データ
   */
  var getNextMonthExtData = function (extData, index) {
    if (extData && extData.NextMonth && extData.NextMonth.length >= index - 1) {
      return extData.NextMonth[index];
    } else {
      return null;
    }
  };

  /**
   * カレンダーの日を更新します。
   * @param {Element} panelElem - 更新対象のカレンダーの日パネル
   * @param {Object} panelData - 対象日のデータ
   * @param {Object} panelExtData - 対象日の拡張データ
   * @param {Date} date - 対象日
   * @param {Date} minDate - 選択可能範囲最小日
   * @param {Date} maxDate - 選択可能範囲最大日
   * @param {string} otherClass - 追加設定するクラス名
   */
  var renderDay = function (panelElem, panelData, panelExtData, date, minDate, maxDate, otherClass) {
    panelData.date = panelData.calendarPanelDate;  // SFDCでDateは予約語で使用できないためここで入れ替える
    panelElem.find('.spm-calendar-day-num').text(panelData.date);
    panelElem.find('.spm-calendar-day-six').text(panelData.sixLabel);

    panelElem.removeClass('spm-calendar-day-close');
    panelElem.removeClass('spm-calendar-day-holiday');
    panelElem.removeClass('spm-calendar-day-saturday');
    if (panelData.closed) {
      panelElem.addClass('spm-calendar-day-close');
    } else if (date.getDay() == 0) {
      panelElem.addClass('spm-calendar-day-holiday');
    } else if (date.getDay() == 6) {
      panelElem.addClass('spm-calendar-day-saturday');
    }

    panelElem.removeClass('spm-calendar-day-disable');
    panelElem.removeClass('spm-calendar-day-inactive');
    if (panelExtData == null) {
      if (date < minDate || date > maxDate) {
        panelElem.addClass('spm-calendar-day-disable');
        panelElem.addClass('spm-calendar-day-inactive');
      }
    } else {
      if (panelExtData.BackColor == 1) {
        panelElem.addClass('spm-calendar-day-inactive');
      }
      if (panelExtData.Selectable == 0) {
        panelElem.addClass('spm-calendar-day-disable');
      }
    }

    panelElem.removeClass('spm-calendar-day-today');
    if (date.getTime() == today.getTime()) {
      panelElem.addClass('spm-calendar-day-today');
    }

    panelElem.removeClass('spm-calendar-day-prev-month');
    panelElem.removeClass('spm-calendar-day-next-month');
    if (otherClass) {
      panelElem.addClass(otherClass);
    }

    // アイコンの表示制御
    var icons = [];
    if (panelExtData && panelExtData.Icons && panelExtData.Icons.length > 0) {
      for (var i = 0; i < panelExtData.Icons.length; i++) {
        if ($.trim(panelExtData.Icons[i])) {
          icons.push($.trim(panelExtData.Icons[i]));
        }
      }
    }

    var iconPath = dateJs.staticResourcePath + "/SJ100905/images/calendar_icon_";
    if (icons.length > 0) {
      panelElem.find('.spm-calendar-day-six').hide();
      if (icons.length == 1) {
        panelElem.removeClass('spm-calendar-day-iconnum3');
        panelElem.find('.spm-calendar-day-icon1').css('background-image', 'url("' + iconPath + icons[0] + '.png")');
      } else if (icons.length == 2) {
        panelElem.removeClass('spm-calendar-day-iconnum3');
        panelElem.find('.spm-calendar-day-icon1').css('background-image', 'url("' + iconPath + icons[1] + '.png")');
        panelElem.find('.spm-calendar-day-icon2').css('background-image', 'url("' + iconPath + icons[0] + '.png")');
      } else {
        panelElem.addClass('spm-calendar-day-iconnum3');
        panelElem.find('.spm-calendar-day-icon1').css('background-image', 'url("' + iconPath + icons[icons.length - 1] + '.png")');
        panelElem.find('.spm-calendar-day-icon2').css('background-image', 'url("' + iconPath + icons[icons.length - 2] + '.png")');
        panelElem.find('.spm-calendar-day-icon3').css('background-image', 'url("' + iconPath + icons[icons.length - 3] + '.png")');
      }
    } else {
      panelElem.find('.spm-calendar-day-six').show();
    }
  };

  /**
   * 選択日の表示を更新します。
   * @param {Element} elem - 更新対象のカレンダー
   */
  var updateSelectedDay = function (elem) {
    var year = elem.data('year');
    var month = elem.data('month');
    var date = elem.data('date');

    var selectedDate = new Date(date);
    var monthStartDate = new Date(year, month - 1, 1);
    var monthEndDate = new Date(year, month, 1);
    monthEndDate.setDate(0);

    var prevMonthOffset = monthStartDate.getDay();
    if (prevMonthOffset == 0) {
      prevMonthOffset = 7;
    }

    elem.find('.spm-calendar-day-selected').removeClass('spm-calendar-day-selected');

    var prev = adjustYearMonth(year, month - 1);
    if (selectedDate.getFullYear() == prev.year &&
      selectedDate.getMonth() + 1 == prev.month) {
      // 先月に選択日がある
      var prevMonthEnd = new Date(monthStartDate.getTime());
      prevMonthEnd.setDate(0);
      if (selectedDate.getDate() > prevMonthEnd.getDate() - prevMonthOffset) {
        var panelElem = elem.find('.spm-calendar-day-' + (selectedDate.getDate() - prevMonthEnd.getDate() + prevMonthOffset - 1));
        panelElem.addClass('spm-calendar-day-selected');
      }
      return;
    }

    if (selectedDate.getFullYear() == year &&
      selectedDate.getMonth() + 1 == month) {
      // 当月に選択日がある
      var panelElem = elem.find('.spm-calendar-day-' + (prevMonthOffset + selectedDate.getDate() - 1));
      panelElem.addClass('spm-calendar-day-selected');
      return;
    }

    var next = adjustYearMonth(year, month + 1);
    if (selectedDate.getFullYear() == next.year &&
      selectedDate.getMonth() + 1 == next.month) {
      // 次月に選択日がある
      var nextMonthOffset = prevMonthOffset + monthEndDate.getDate();
      if (selectedDate.getDate() < 42 - nextMonthOffset + 1) {
        var panelElem = elem.find('.spm-calendar-day-' + (nextMonthOffset + selectedDate.getDate() - 1));
        panelElem.addClass('spm-calendar-day-selected');
      }
      return;
    }
  };

  /**
   * 年月を調整します。
   * @param {number} year - 年
   * @param {number} month - 月(0～13)
   * @return {Object} 調整した年月
   */
  var adjustYearMonth = function (year, month) {
    var adjusted = new Object();
    adjusted.year = year;
    adjusted.month = month;
    while (adjusted.month < 1) {
      adjusted.year = adjusted.year - 1;
      adjusted.month = adjusted.month + 12;
    }
    while (adjusted.month > 12) {
      adjusted.year = adjusted.year + 1;
      adjusted.month = adjusted.month - 12;
    }
    return adjusted;
  };
}

/**
 * 日付処理の共通処理
 */
spmDateCommon = function () {
};

/**
 * 日付として正しいか判定します。
 * @param {string} str - yyyy/mm/dd形式の日付を表す文字列
 * @return {bool} 日付として正しい場合は true。
 */
spmDateCommon.isDate = function (str) {
  if ($.type(str) !== 'string') {
    return false;
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

/**
 * 指定した年数分移動した日付を取得します。
 * @param {Object} date - 基準の日付
 * @param {number} years - 移動する年数
 * @return {Object} 指定した変数分移動した日付
 */
spmDateCommon.offsetDateByYears = function (date, years) {
  var offsetDate = new Date(date.getTime());
  offsetDate.setFullYear(offsetDate.getFullYear() + years);
  return offsetDate;
};

/**
 * 日付を yyyy/mm/dd 形式に整形します。
 * @param {Object} date - 日付
 * @return {string} yyyy/mm/dd 形式の文字列
 */
spmDateCommon.formatDateToYYYYsMMsDD = function (date) {
  return date.getFullYear() + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + ('0' + date.getDate()).slice(-2);
};
