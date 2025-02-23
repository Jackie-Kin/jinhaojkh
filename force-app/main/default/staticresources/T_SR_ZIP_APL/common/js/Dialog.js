
/**
 * @fileoverview 共通のダイアログ
 */

spmDialog = function () {
};

/**
 * 共通の情報ダイアログを表示します。
 * @param {string} msg - メッセージ
 * @param {string} title - タイトル。画面名を指定する
 * @param {Object} arg - コールバック関数に渡すオブジェクト（省略可）
 * @param {Object} ok - OKタップ時に呼ばれるコールバック関数（省略可）
 */
spmDialog.info = function (msg, title, arg, ok) {
  spmDialog.show(msg, title, spmDialog.icons.info, arg, ok, null);
};

/**
 * 共通の確認ダイアログを表示します。
 * @param {string} msg - メッセージ
 * @param {string} title - タイトル。画面名を指定する
 * @param {Object} arg - コールバック関数に渡すオブジェクト（省略可）
 * @param {Object} ok - OKタップ時に呼ばれるコールバック関数（省略可）
 * @param {Object} cancel - キャンセルタップ時に呼ばれるコールバック関数（省略可）
 */
spmDialog.confirm = function (msg, title, arg, ok, cancel) {
  spmDialog.show(msg, title, spmDialog.icons.question, arg, ok, cancel);
};

/**
 * 共通の警告ダイアログを表示します。
 * @param {string} msg - メッセージ
 * @param {string} title - タイトル。画面名を指定する
 * @param {Object} arg - コールバック関数に渡すオブジェクト（省略可）
 * @param {Object} ok - OKタップ時に呼ばれるコールバック関数（省略可）
 */
spmDialog.warning = function (msg, title, arg, ok) {
  spmDialog.show(msg, title, spmDialog.icons.warning, arg, ok, null);
};

/**
 * 共通のエラーダイアログを表示します。
 * @param {number} div - メッセージ区分 (0:取得, 1:登録, 2:更新, 3:削除)
 * @param {string} para1 - パラメータ1:機能名等
 * @param {string} para2 - パラメータ2:機能ID等原因調査に必要な情報
 * @param {string} title - タイトル。画面名を指定する
 * @param {Object} arg - コールバック関数に渡すオブジェクト（省略可）
 * @param {Object} ok - OKタップ時に呼ばれるコールバック関数（省略可）
 */
spmDialog.error = function (div, para1, para2, title, arg, ok) {

  var retMsg = '';
  if (para1) {
    retMsg = para1;
  }

  switch (parseInt(div)) {
    case 0:   // 取得
      retMsg += spmDialog.GetErrorMsg;
      break;
    case 1:   // 登録
      retMsg += spmDialog.InsertErrorMsg;
      break;
    case 2:   // 更新
      retMsg += spmDialog.UpdateErrorMsg;
      break;
    case 3:   // 削除
      retMsg += spmDialog.DeleteErrorMsg;
      break;
    default:  // 論理
      retMsg += spmDialog.SystemErrorMsg;
      break;
  }

  if (para2) {
    retMsg += '\n(' + para2 + ')';
  }

  spmDialog.show(retMsg, title, spmDialog.icons.error, arg, ok, null);
};

/**
 * 共通のエラーダイアログを表示します。
 * @param {string} msg - メッセージ
 * @param {string} title - タイトル。画面名を指定する
 * @param {Object} arg - コールバック関数に渡すオブジェクト（省略可）
 * @param {Object} ok - OKタップ時に呼ばれるコールバック関数（省略可）
 */
spmDialog.errorMsg = function (msg, title, arg, ok) {
  spmDialog.show(msg, title, spmDialog.icons.error, arg, ok, null);
};

//取得失敗用エラーメッセージ
spmDialog.GetErrorMsg = "の取得に失敗しました。システム管理会社にお問い合せ下さい。";
//登録失敗用エラーメッセージ
spmDialog.InsertErrorMsg = "の登録が失敗しました。システム管理会社にお問い合せ下さい。";
//更新失敗用エラーメッセージ
spmDialog.UpdateErrorMsg = "の更新が失敗しました。システム管理会社にお問い合せ下さい。";
//削除失敗用エラーメッセージ
spmDialog.DeleteErrorMsg = "の削除が失敗しました。システム管理会社にお問い合せ下さい。";
//システム失敗用エラーメッセージ
spmDialog.SystemErrorMsg = "システムエラーが発生しました。システム管理会社にお問い合せ下さい。";

/**
 * アイコン種別
 */
spmDialog.icons = {
  /**
   * 情報アイコン
   */
  info: 0,

  /**
   * 確認アイコン
   */
  question: 1,

  /**
   * 警告アイコン
   */
  warning: 2,

  /**
   * エラーアイコン
   */
  error: 3
};

/**
 * アイコンクラス名
 */
spmDialog.iconClass = {
  /**
   * 情報アイコンクラス名
   */
  info: 'spm-dialog-icon-info',

  /**
   * 確認アイコンクラス名
   */
  question: 'spm-dialog-icon-question',

  /**
   * 警告アイコンクラス名
   */
  warning: 'spm-dialog-icon-warning',

  /**
   * エラーアイコンクラス名
   */
  error: 'spm-dialog-icon-error'
};

/**
 * 共通のダイアログを表示します。
 * @param {string} msg - メッセージ
 * @param {string} title - タイトル。画面名を指定する
 * @param {number} icon - アイコン種別 (0:情報, 1:確認, 2:警告, 3:エラー)
 * @param {Object} arg - コールバック関数に渡すオブジェクト
 * @param {Object} ok - OKタップ時に呼ばれるコールバック関数
 * @param {Object} cancel - キャンセルタップ時に呼ばれるコールバック関数
 */
spmDialog.show = function (msg, title, icon, arg, ok, cancel) {
  spmDialog.createHtmlElement();
  spmDialog.setTitle(title);
  spmDialog.setIcon(icon);
  if (msg == null) {
    msg = '';
  }
  $('.spm-dialog-message').text(msg);
  spmDialog.arg = arg;
  spmDialog.okCallback = ok;
  spmDialog.cancelCallback = cancel;

  if (icon == spmDialog.icons.question || cancel) {
    $('.spm-dialog-cancel').show();
  } else {
    $('.spm-dialog-cancel').hide();
  }

  spmDialog.showCenter();

  if (icon == spmDialog.icons.question || cancel) {
    $('.spm-dialog-cancel').eq(0).focus();
  } else {
    $('.spm-dialog-ok').eq(0).focus();
  }
};

/**
 * コールバック関数に渡すオブジェクト
 */
spmDialog.arg = null;

/**
 * OKタップ時に呼ばれるコールバック関数
 */
spmDialog.okCallback = null;

/**
 * キャンセルタップ時に呼ばれるコールバック関数
 */
spmDialog.cancelCallback = null;

/**
 * ダイアログ要素を生成します。
 */
spmDialog.createHtmlElement = function () {
  var dialog = $('#spmDialog');
  if (dialog.length != 0) {
    return;
  }

  dialog = $('<div id="spmDialog">'
    + '<div class="spm-dialog-back"></div>'
    + '<div class="spm-dialog-border">'
    + '<div class="spm-dialog-title">SPM</div>'
    + '<div class="spm-dialog-main">'
    + '<div class="spm-dialog-icon"></div>'
    + '<div class="spm-dialog-message"></div>'
    + '</div>'
    + '<div class="spm-dialog-buttons">'
    + '<button class="spm-dialog-button spm-dialog-cancel">キャンセル</button>'
    + '<button class="spm-dialog-button spm-dialog-ok">OK</button>'
    + '</div>'
    + '</div>'
    + '</div>');

  $('body').append(dialog);

  /**
   * ダイアログでOKボタンをタップ
   */
  $('.spm-dialog-ok').on('click', function () {
    $('#spmDialog').hide();
    if (spmDialog.okCallback) {
      spmDialog.okCallback(spmDialog.arg);
    }
  });

  /**
   * ダイアログでキャンセルボタンをタップ
   */
  $('.spm-dialog-cancel').on('click', function () {
    $('#spmDialog').hide();
    if (spmDialog.cancelCallback) {
      spmDialog.cancelCallback(spmDialog.arg);
    }
  });

  /**
   * OKボタンにフォーカスがある状態でタブ移動
   */
  $('.spm-dialog-ok').on('keydown', function (event) {
    if (event.keyCode == 9) {
      if ($('.spm-dialog-cancel').is(':visible')) {
        $('.spm-dialog-cancel').eq(0).focus();
      }
      return false;
    }
  });

  /**
   * キャンセルボタンにフォーカスがある状態でタブ移動
   */
  $('.spm-dialog-cancel').on('keydown', function (event) {
    if (event.keyCode == 9) {
      $('.spm-dialog-ok').eq(0).focus();
      return false;
    }
  });
};

/**
 * ダイアログのタイトルを設定します。
 * @param {string} title - タイトル
 */
spmDialog.setTitle = function (title) {
  if (title) {
    $('.spm-dialog-title').text(title);
    return;
  }

  var pageTitle = document.title;
  if (pageTitle) {
    $('.spm-dialog-title').text(pageTitle);
    return;
  }

  $('.spm-dialog-title').text('SPM');
};

/**
 * ダイアログのアイコンを設定します。
 * @param {number} icon - アイコン種別
 */
spmDialog.setIcon = function (icon) {
  var elm = $('.spm-dialog-icon');
  elm.removeClass(spmDialog.iconClass.info);
  elm.removeClass(spmDialog.iconClass.question);
  elm.removeClass(spmDialog.iconClass.warning);
  elm.removeClass(spmDialog.iconClass.error);

  switch (icon) {
    case spmDialog.icons.info:
      elm.addClass(spmDialog.iconClass.info);
      break;

    case spmDialog.icons.question:
      elm.addClass(spmDialog.iconClass.question);
      break;

    case spmDialog.icons.warning:
      elm.addClass(spmDialog.iconClass.warning);
      break;

    case spmDialog.icons.error:
      elm.addClass(spmDialog.iconClass.error);
      break;

    default:
      break;
  }
};

/**
 * ダイアログを画面中央に表示します。
 */
spmDialog.showCenter = function () {
  $('#spmDialog').show();
  var dialog = $('.spm-dialog-border');
  var left = Math.floor(($(window).width() - dialog.width()) / 2);
  var top = Math.floor(($(window).height() - dialog.height()) / 2);
  dialog.css({
    "top": top,
    "left": left
  });
};
