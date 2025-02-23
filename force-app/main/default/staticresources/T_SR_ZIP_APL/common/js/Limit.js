/**
 * @fileoverview 入力制限共通部品
 *
 * テキストボックスへのキー入力制限・自動変換を行う共通部品
 *
 * ■利用方法
 *   1. Limit.css と Limit.js の参照
 *     @section styles{
 *       @Html.Css("~/Areas/Common/Content/Limit.css")
 *     }
 *     @section scripts{
 *       @Html.Js("~/Areas/Common/Scripts/Limit.js")
 *     }
 *
 *   2. 文字入力を行う要素に対して該当するクラス名を指定する
 *     <input type="text" class="spm-limit-kana" />
 *
 *   3. 対応するクラス名
 *     クラス名                            | 入力制限内容
 *     ------------------------------------|------------------------
 *     spm-limit-number                    | 数値
 *     spm-limit-tel                       | 電話番号
 *     spm-limit-email                     | メールアドレス
 *     spm-limit-alphanumeric              | 英数字
 *     spm-limit-kana                      | 半角カナ
 *     spm-limit-hankaku                   | 半角（英数字・記号・半角カナ）
 *     spm-limit-zenkaku                   | 全角
 *     spm-limit-date                      | 日付[H../../..]形式
 *     spm-limit-bigalpha-numeric          | 半角(英数字), 英大文字
 *     spm-limit-bigalpha-numeric-hyphen   | 半角(英数字・ハイフン) 英大文字
 *     spm-limit-hankaku-big               | 半角(英数字・記号・半角カナ) 英大文字
 */

/// <reference path="encoding.min.js" />



spmLimit = function () {
};

/**
 * 日本語の入力中を示すフラグ
 */
spmLimit.inputting = false;

/**
 * 入力された文字列を数値に変換します。
 * @param {Object} text - 対象のテキストボックス
 */
spmLimit.convertNumber = function (text) {
  var s = $(text).val();

  // 全角数字を半角数字に変換
  s = s.replace(/[０-９]/g, function (s) {
    return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
  });

  // 数字以外を削除
  s = s.replace(/[^0-9]/g, '');

  if ($(text).val() != s) {
    var cp = text.selectionStart;
    $(text).val(s);
    text.setSelectionRange(cp, cp);
  }
};

/**
 * 入力された文字列を電話番号に変換します。
 * @param {Object} text - 対象のテキストボックス
 */
spmLimit.convertTel = function (text) {
  var s = $(text).val();

  // 全角数字を半角数字に変換
  s = s.replace(/[０-９]/g, function (s) {
    return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
  });

  // ハイフンへの変換
  var haihun = 'ー―－‐ｰ';
  var tel = '';
  for (var i = 0; i < s.length; i++) {
    var c = s.charAt(i);
    var pos = haihun.indexOf(c, 0);
    if (pos == -1) {
      tel += c;
    } else {
      tel += '-';
    }
  }

  // 数字ハイフン以外を削除
  tel = tel.replace(/[^0-9\-]/g, '');

  if ($(text).val() != tel) {
    var cp = text.selectionStart;
    $(text).val(tel);
    text.setSelectionRange(cp, cp);
  }
};

/**
 * 入力された文字列をメールアドレスに変換します。
 * @param {Object} text - 対象のテキストボックス
 */
spmLimit.convertEMail = function (text) {
  var s = $(text).val();

  // 全角記号英数字を半角に変換
  s = s.replace(/[！-～]/g, function (match) {
    return String.fromCharCode(match.charCodeAt(0) - 0xFEE0);
  });
  s = s.replace(/”/g, "\"")
    .replace(/’/g, "'")
    .replace(/‘/g, "`")
    .replace(/￥/g, "\\")
    .replace(/　/g, " ")
    .replace(/〜/g, "~");

  // 英数字 . # $ & ' * + / = ? ^ _ ` { | } ~ @ - 以外を削除
  s = s.replace(/[^a-zA-Z0-9.#$&'*+/=?^_`{|}~@-]/g, '');

  if ($(text).val() != s) {
    var cp = text.selectionStart;
    $(text).val(s);
    text.setSelectionRange(cp, cp);
  }
};

/**
 * 入力された文字列を英数字に変換します。
 * @param {Object} text - 対象のテキストボックス
 */
spmLimit.convertAlphanumeric = function (text) {
  var s = $(text).val();

  // 全角英数字を半角に変換
  s = s.replace(/[０-ｚ]/g, function (match) {
    return String.fromCharCode(match.charCodeAt(0) - 0xFEE0);
  });

  // 英数字以外を削除
  s = s.replace(/[^a-zA-Z0-9]/g, '');

  if ($(text).val() != s) {
    var cp = text.selectionStart;
    $(text).val(s);
    text.setSelectionRange(cp, cp);
  }
};

/**
 * 全角カナを半角カナに変換する際に利用する全角カナ定義
 */
spmLimit.zenKana = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン' +
    'ァィゥェォャュョッー―－‐ガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポヴ';

/**
 * 全角カナを半角カナに変換する際に利用する半角カナ定義
 */
spmLimit.hanKana = new Array('ｱ', 'ｲ', 'ｳ', 'ｴ', 'ｵ', 'ｶ', 'ｷ', 'ｸ', 'ｹ', 'ｺ', 'ｻ', 'ｼ', 'ｽ', 'ｾ', 'ｿ',
    'ﾀ', 'ﾁ', 'ﾂ', 'ﾃ', 'ﾄ', 'ﾅ', 'ﾆ', 'ﾇ', 'ﾈ', 'ﾉ', 'ﾊ', 'ﾋ', 'ﾌ', 'ﾍ', 'ﾎ',
    'ﾏ', 'ﾐ', 'ﾑ', 'ﾒ', 'ﾓ', 'ﾔ', 'ﾕ', 'ﾖ', 'ﾗ', 'ﾘ', 'ﾙ', 'ﾚ', 'ﾛ', 'ﾜ', 'ｦ', 'ﾝ',
    'ｧ', 'ｨ', 'ｩ', 'ｪ', 'ｫ', 'ｬ', 'ｭ', 'ｮ', 'ｯ', 'ｰ', 'ｰ', 'ｰ', 'ｰ',
    'ｶﾞ', 'ｷﾞ', 'ｸﾞ', 'ｹﾞ', 'ｺﾞ', 'ｻﾞ', 'ｼﾞ', 'ｽﾞ', 'ｾﾞ', 'ｿﾞ', 'ﾀﾞ', 'ﾁﾞ', 'ﾂﾞ', 'ﾃﾞ', 'ﾄﾞ',
    'ﾊﾞ', 'ﾋﾞ', 'ﾌﾞ', 'ﾍﾞ', 'ﾎﾞ', 'ﾊﾟ', 'ﾋﾟ', 'ﾌﾟ', 'ﾍﾟ', 'ﾎﾟ', 'ｳﾞ');

/**
 * 入力された文字列を半角カナに変換します。
 * @param {Object} text - 対象のテキストボックス
 */
spmLimit.converKana = function (text) {
  var s = $(text).val();

  // ひらがなを全角カナに変換
  s = s.replace(/[\u3041-\u3096]/g, function (match) {
    return String.fromCharCode(match.charCodeAt(0) + 0x60);
  });

  // 全角カナを半角カナに変換
  var han = '';
  var plus = 0;
  for (var i = 0; i < s.length; i++) {
    var c = s.charAt(i);
    var pos = spmLimit.zenKana.indexOf(c, 0);
    if (pos == -1) {
      han += c;
    } else {
      han += spmLimit.hanKana[pos];
      plus += spmLimit.hanKana[pos].length - 1;
    }
  }

  // 半角カナ以外を削除
  han = han.replace(/[^ｱ-ﾝﾞﾟｦｧ-ｫｬ-ｮｯｰ]/g, '');

  if ($(text).val() != han) {
    var cp = text.selectionStart + plus;
    $(text).val(han).change();
    text.setSelectionRange(cp, cp);
  }
};

/**
 * 半角カナを全角カナに変換する際に利用する半角カナ定義
 */
spmLimit.convertZenkakuKana1 = new Array("ｶﾞ", "ｷﾞ", "ｸﾞ", "ｹﾞ", "ｺﾞ", "ｻﾞ", "ｼﾞ", "ｽﾞ", "ｾﾞ", "ｿﾞ", "ﾀﾞ", "ﾁﾞ",
		"ﾂﾞ", "ﾃﾞ", "ﾄﾞ", "ﾊﾞ", "ﾋﾞ", "ﾌﾞ", "ﾍﾞ", "ﾎﾞ", "ﾊﾟ", "ﾋﾟ", "ﾌﾟ", "ﾍﾟ", "ﾎﾟ", "ｦ", "ｧ",
		"ｨ", "ｩ", "ｪ", "ｫ", "ｬ", "ｭ", "ｮ", "ｯ", "ｰ", "ｱ", "ｲ", "ｳ", "ｴ", "ｵ", "ｶ", "ｷ", "ｸ", "ｹ",
		"ｺ", "ｻ", "ｼ", "ｽ", "ｾ", "ｿ", "ﾀ", "ﾁ", "ﾂ", "ﾃ", "ﾄ", "ﾅ", "ﾆ", "ﾇ", "ﾈ", "ﾉ", "ﾊ", "ﾋ",
		"ﾌ", "ﾍ", "ﾎ", "ﾏ", "ﾐ", "ﾑ", "ﾒ", "ﾓ", "ﾔ", "ﾕ", "ﾖ", "ﾗ", "ﾘ", "ﾙ", "ﾚ", "ﾛ", "ﾜ", "ﾝ");

/**
 * 半角カナを全角カナに変換する際に利用する全角カナ定義
 */
spmLimit.convertZenkakuKana2 = new Array("ガ", "ギ", "グ", "ゲ", "ゴ", "ザ", "ジ", "ズ", "ゼ", "ゾ", "ダ", "ヂ",
		"ヅ", "デ", "ド", "バ", "ビ", "ブ", "ベ", "ボ", "パ", "ピ", "プ", "ペ", "ポ", "ヲ", "ァ",
		"ィ", "ゥ", "ェ", "ォ", "ャ", "ュ", "ョ", "ッ", "ー", "ア", "イ", "ウ", "エ", "オ", "カ",
		"キ", "ク", "ケ", "コ", "サ", "シ", "ス", "セ", "ソ", "タ", "チ", "ツ", "テ", "ト", "ナ",
		"ニ", "ヌ", "ネ", "ノ", "ハ", "ヒ", "フ", "ヘ", "ホ", "マ", "ミ", "ム", "メ", "モ", "ヤ",
		"ユ", "ヨ", "ラ", "リ", "ル", "レ", "ロ", "ワ", "ン");

/**
 * 入力された文字列を半角（英数字・記号・半角カナ）に変換します。
 * @param {Object} text - 対象のテキストボックス
 */
spmLimit.converHankaku = function (text) {
  var s = $(text).val();

  // 全角記号英数字を半角に変換
  s = s.replace(/[！-～]/g, function (match) {
    return String.fromCharCode(match.charCodeAt(0) - 0xFEE0);
  });
  s = s.replace(/”/g, "\"")
    .replace(/’/g, "'")
    .replace(/‘/g, "`")
    .replace(/￥/g, "\\")
    .replace(/　/g, " ")
    .replace(/〜/g, "~");

  // ひらがなを全角カナに変換
  s = s.replace(/[\u3041-\u3096]/g, function (match) {
    return String.fromCharCode(match.charCodeAt(0) + 0x60);
  });

  // 全角カナを半角カナに変換
  var han = '';
  var plus = 0;
  for (var i = 0; i < s.length; i++) {
    var c = s.charAt(i);
    var pos = spmLimit.zenKana.indexOf(c, 0);
    if (pos == -1) {
      han += c;
    } else {
      han += spmLimit.hanKana[pos];
      plus += spmLimit.hanKana[pos].length - 1;
    }
  }

  // 英数字記号・半角カナ以外を削除
  han = han.replace(/[^a-zA-Z0-9!-/:-@¥[-`{-~ ｱ-ﾝﾞﾟｦｧ-ｫｬ-ｮｯｰ]/g, '');

  if ($(text).val() != han) {
    var cp = text.selectionStart + plus;
    $(text).val(han).change();
    text.setSelectionRange(cp, cp);
  }
};

/**
 * 入力された文字列を全角に変換します。
 * @param {Object} text - 対象のテキストボックス
 */
spmLimit.convertZenkaku = function (text) {
  var s = $(text).val();

  // 半角記号英数字を全角に変換
  s = s.replace(/[!-~]/g, function (match) {
    return String.fromCharCode(match.charCodeAt(0) + 0xFEE0);
  });
  s = s.replace(/\"/g, "”")
    .replace(/'/g, "’")
    .replace(/`/g, "‘")
    .replace(/\\/g, "￥")
    .replace(/ /g, "　")
    .replace(/~/g, "〜");

  // 半角カナを全角カナに変換
  if (s.match(/[ｦ-ﾝ]/)) {
    for (var i = 0; i < spmLimit.convertZenkakuKana1.length; i++) {
      s = s.replace(new RegExp(spmLimit.convertZenkakuKana1[i], 'g'), spmLimit.convertZenkakuKana2[i]);
    }
  }

  if ($(text).val() != s) {
    var cp = text.selectionStart;
    $(text).val(s);
    text.setSelectionRange(cp, cp);
  }
};


/**
 * 入力された文字列を日付[H../../..]形式に変換します。
 * @param {Object} text - 対象のテキストボックス
 */
spmLimit.convertDate = function (text) {
  var s = $(text).val();

  // 全角英数字スラッシュを半角に変換
  s = s.replace(/[／-ｚ]/g, function (match) {
    return String.fromCharCode(match.charCodeAt(0) - 0xFEE0);
  });

  // 英字小文字を英字大文字に変換
  s = s.replace(/[a-z]/g, function (match) {
    return String.fromCharCode(match.charCodeAt(0) - 32);
  });

  // 英数字スラッシュ以外を削除
  s = s.replace(/[^A-Z0-9/]/g, '');

  // 2文字目以降は数字スラッシュ以外を削除
  if (s.length >= 2) {
    s = s.substr(0, 1) + s.substr(1).replace(/[^0-9/]/g, '');

    // 3個目以降のスラッシュを削除
    var slash1 = s.indexOf('/', 0);
    if (slash1 != -1) {
      var slash2 = s.indexOf('/', slash1 + 1);
      if (slash2 != -1) {
        var slash3 = s.indexOf('/', slash2 + 1);
        if (slash3 != -1) {
          s = s.substr(0, slash3) + s.substr(slash3).replace('/', '');
        }
      }
    }
  }

  if ($(text).val() != s) {
    var cp = text.selectionStart;
    $(text).val(s);
    text.setSelectionRange(cp, cp);
  }
};

/**
 * 入力された文字列を日付[H../../..]形式に整形します。
 * @param {Object} text - 対象のテキストボックス
 */
spmLimit.formatDate = function (text) {
  var s = $(text).val();

  var slash1 = s.indexOf('/', 0);
  if (slash1 == -1) {
    return;
  }
  var slash2 = s.indexOf('/', slash1 + 1);
  if (slash2 == -1) {
    return;
  }

  s = s.substr(0, Math.min(slash1, 3)) + '/' + s.substr(slash1 + 1, Math.min(slash2 - slash1 - 1, 2)) + '/' + s.substr(slash2 + 1, 2);

  if ($(text).val() != s) {
    var cp = text.selectionStart;
    $(text).val(s);
    text.setSelectionRange(cp, cp);
  }
};

/**
* 入力された文字列を半角数値と半角英大文字、半角スペースに変換します。
* @param{Object}text - 対象のテキストボックス
*/
spmLimit.convertBigAlphanumeric = function (text) {
    var s = $(text).val();
    //--- 全角英数字を半角に変換
    s = s.replace(/[０-ｚ]/g, function (match) {
        return String.fromCharCode(match.charCodeAt(0) - 0xFEE0);
    });

    //--- 全角スペースを半角スペースに変換
    s = s.replace(/　/g, ' ');

    //--- 英小文字を英大文字に変換
    s = s.replace(/[a-z]/g, function (match) {
        return String.fromCharCode(match.charCodeAt(0) - 32);
    });

    //--- 英数字、スペース以外を削除
    s = s.replace(/[^A-Z0-9\s]/g, '');

    if ($(text).val() != s) {
        //--- フォーカスの位置を取得する
        var cp = text.selectionStart;
        //--- 対象のテキストボックスに返す
        $(text).val(s);
        //--- フォーカスの位置を指定する
        text.setSelectionRange(cp, cp);
    }
};
/**
* 入力された文字列を半角数値と半角英大文字、半角スペース、半角ハイフンに変換します。
* @param{Object}text - 対象のテキストボックス
*/
spmLimit.convertBigAlphanumericHyphen = function (text) {
    var s = $(text).val();
    //--- 全角英数字を半角に変換
    s = s.replace(/[０-ｚ]/g, function (match) {
        return String.fromCharCode(match.charCodeAt(0) - 0xFEE0);
    });

    //--- 全角ハイフンを半角ハイフンに変換
    s = s.replace(/[‐－―ー]/g, '-');

    //--- 全角スペースを半角スペースに変換
    s = s.replace(/　/g, ' ');

    //--- 英小文字を英大文字に変換
    s = s.replace(/[a-z]/g, function (match) {
        return String.fromCharCode(match.charCodeAt(0) - 32);
    });

    //--- 英数字、スペース以外を削除
    s = s.replace(/[^A-Z0-9-\s]/g, '');

    if ($(text).val() != s) {
        var cp = text.selectionStart;
        $(text).val(s);
        text.setSelectionRange(cp, cp);
    }
};

/**
* 入力された文字列を半角と英大文字に変換します。
* @param{object}text - 対象のテキストボックス
*/
spmLimit.convertHalfsizeBig = function (text) {
  var s = $(text).val();

  // ひらがなを全角カナに変換
  s = s.replace(/[\u3041-\u3096]/g, function (match) {
    return String.fromCharCode(match.charCodeAt(0) + 0x60);
  });

  // 全角カナを半角カナに変換
  var kana = '';
  var plus = 0;
  for (var i = 0; i < s.length; i++) {
    var a = s.charAt(i);
    var pos = spmLimit.zenKana.indexOf(a, 0);
    if (pos == -1) {
      kana += a;
    } else {
      kana += spmLimit.hanKana[pos];
      plus += spmLimit.hanKana[pos].length - 1;
    }
  }

  // 全角記号英数字を半角に変換
  s = kana.replace(/[！-～]/g, function (match) {
    return String.fromCharCode(match.charCodeAt(0) - 0xFEE0);
  });
  s = s.replace(/”/g, "\"")
    .replace(/’/g, "'")
    .replace(/‘/g, "`")
    .replace(/￥/g, "\\")
    .replace(/　/g, " ")
    .replace(/〜/g, "~");

  // 英小文字を英大文字に変換
  s = s.replace(/[a-z]/g, function (match) {
    return String.fromCharCode(match.charCodeAt(0) - 32);
  });

  // 半角カナ、英数字、スペース、記号以外を削除
  s = s.replace(/[^!-~ｱ-ﾝﾞﾟｦｧ-ｫｬ-ｮｯｰ\s]/g, '');

  if ($(text).val() != s) {
    var cp = text.selectionStart + plus;
    $(text).val(s);
    text.setSelectionRange(cp, cp);
  }
};


$(function () {

  // ------------------------------------------------------------------------
  // 入力制限（数値） spm-limit-number
  // ------------------------------------------------------------------------

  /**
   * 入力制限（数値）の日本語入力開始
   */
  $(document).off('compositionstart', '.spm-limit-number');
  $(document).on('compositionstart', '.spm-limit-number', function () {
    spmLimit.inputting = true;
  });

  /**
   * 入力制限（数値）の日本語入力確定
   */
  $(document).off('compositionend', '.spm-limit-number');
  $(document).on('compositionend', '.spm-limit-number', function () {
    spmLimit.inputting = false;
    spmLimit.convertNumber(this);
  });

  /**
   * 入力制限（数値）のキー入力
   */
  $(document).off('keyup', '.spm-limit-number');
  $(document).on('keyup', '.spm-limit-number', function () {
    if (!spmLimit.inputting) {
      spmLimit.convertNumber(this);
    }
  });

  /**
   * 入力制限（数値）のフォーカス喪失
   */
  $(document).off('blur', '.spm-limit-number');
  $(document).on('blur', '.spm-limit-number', function () {
    spmLimit.convertNumber(this);
  });


  // ------------------------------------------------------------------------
  // 入力制限（電話番号） spm-limit-tel
  // ------------------------------------------------------------------------

  /**
   * 入力制限（電話番号）の日本語入力開始
   */
  $(document).off('compositionstart', '.spm-limit-tel');
  $(document).on('compositionstart', '.spm-limit-tel', function () {
    spmLimit.inputting = true;
  });

  /**
   * 入力制限（電話番号）の日本語入力確定
   */
  $(document).off('compositionend', '.spm-limit-tel');
  $(document).on('compositionend', '.spm-limit-tel', function () {
    spmLimit.inputting = false;
    spmLimit.convertTel(this);
  });

  /**
   * 入力制限（電話番号）のキー入力
   */
  $(document).off('keyup', '.spm-limit-tel');
  $(document).on('keyup', '.spm-limit-tel', function () {
    if (!spmLimit.inputting) {
      spmLimit.convertTel(this);
    }
  });

  /**
   * 入力制限（電話番号）のフォーカス喪失
   */
  $(document).off('blur', '.spm-limit-tel');
  $(document).on('blur', '.spm-limit-tel', function () {
    spmLimit.convertTel(this);
  });


  // ------------------------------------------------------------------------
  // 入力制限（メールアドレス） spm-limit-email
  // ------------------------------------------------------------------------

  /**
   * 入力制限（メールアドレス）の日本語入力開始
   */
  $(document).off('compositionstart', '.spm-limit-email');
  $(document).on('compositionstart', '.spm-limit-email', function () {
    spmLimit.inputting = true;
  });

  /**
   * 入力制限（メールアドレス）の日本語入力確定
   */
  $(document).off('compositionend', '.spm-limit-email');
  $(document).on('compositionend', '.spm-limit-email', function () {
    spmLimit.inputting = false;
    spmLimit.convertEMail(this);
  });

  /**
   * 入力制限（メールアドレス）のキー入力
   */
  $(document).off('keyup', '.spm-limit-email');
  $(document).on('keyup', '.spm-limit-email', function () {
    if (!spmLimit.inputting) {
      spmLimit.convertEMail(this);
    }
  });

  /**
   * 入力制限（メールアドレス）のフォーカス喪失
   */
  $(document).off('blur', '.spm-limit-email');
  $(document).on('blur', '.spm-limit-email', function () {
    spmLimit.convertEMail(this);
  });


  // ------------------------------------------------------------------------
  // 入力制限（英数字） spm-limit-alphanumeric
  // ------------------------------------------------------------------------

  /**
   * 入力制限（英数字）の日本語入力開始
   */
  $(document).off('compositionstart', '.spm-limit-alphanumeric');
  $(document).on('compositionstart', '.spm-limit-alphanumeric', function () {
    spmLimit.inputting = true;
  });

  /**
   * 入力制限（英数字）の日本語入力確定
   */
  $(document).off('compositionend', '.spm-limit-alphanumeric');
  $(document).on('compositionend', '.spm-limit-alphanumeric', function () {
    spmLimit.inputting = false;
    spmLimit.convertAlphanumeric(this);
  });

  /**
   * 入力制限（英数字）のキー入力
   */
  $(document).off('keyup', '.spm-limit-alphanumeric');
  $(document).on('keyup', '.spm-limit-alphanumeric', function () {
    if (!spmLimit.inputting) {
      spmLimit.convertAlphanumeric(this);
    }
  });

  /**
   * 入力制限（英数字）のフォーカス喪失
   */
  $(document).off('blur', '.spm-limit-alphanumeric');
  $(document).on('blur', '.spm-limit-alphanumeric', function () {
    spmLimit.convertAlphanumeric(this);
  });


  // ------------------------------------------------------------------------
  // 入力制限（半角カナ） spm-limit-kana
  // ------------------------------------------------------------------------

  /**
   * 入力制限（半角カナ）の日本語入力開始
   */
  $(document).off('compositionstart', '.spm-limit-kana');
  $(document).on('compositionstart', '.spm-limit-kana', function () {
    spmLimit.inputting = true;
  });

  /**
   * 入力制限（半角カナ）の日本語入力確定
   */
  $(document).off('compositionend', '.spm-limit-kana');
  $(document).on('compositionend', '.spm-limit-kana', function () {
    spmLimit.inputting = false;
    spmLimit.converKana(this);
  });

  /**
   * 入力制限（半角カナ）のキー入力
   */
  $(document).off('keyup', '.spm-limit-kana');
  $(document).on('keyup', '.spm-limit-kana', function () {
    if (!spmLimit.inputting) {
      spmLimit.converKana(this);
    }
  });

  /**
   * 入力制限（半角カナ）のフォーカス喪失
   */
  $(document).off('blur', '.spm-limit-kana');
  $(document).on('blur', '.spm-limit-kana', function () {
    spmLimit.converKana(this);
  });


  // ------------------------------------------------------------------------
  // 入力制限（半角） spm-limit-hankaku
  // ------------------------------------------------------------------------

  /**
   * 入力制限（半角）の日本語入力開始
   */
  $(document).off('compositionstart', '.spm-limit-hankaku');
  $(document).on('compositionstart', '.spm-limit-hankaku', function () {
    spmLimit.inputting = true;
  });

  /**
   * 入力制限（半角）の日本語入力確定
   */
  $(document).off('compositionend', '.spm-limit-hankaku');
  $(document).on('compositionend', '.spm-limit-hankaku', function () {
    spmLimit.inputting = false;
    spmLimit.converHankaku(this);
  });

  /**
   * 入力制限（半角）のキー入力
   */
  $(document).off('keyup', '.spm-limit-hankaku');
  $(document).on('keyup', '.spm-limit-hankaku', function () {
    if (!spmLimit.inputting) {
      spmLimit.converHankaku(this);
    }
  });

  /**
   * 入力制限（半角）のフォーカス喪失
   */
  $(document).off('blur', '.spm-limit-hankaku');
  $(document).on('blur', '.spm-limit-hankaku', function () {
    spmLimit.converHankaku(this);
  });


  // ------------------------------------------------------------------------
  // 入力制限（全角） spm-limit-zenkaku
  // ------------------------------------------------------------------------

  /**
   * 入力制限（全角）の日本語入力開始
   */
  $(document).off('compositionstart', '.spm-limit-zenkaku');
  $(document).on('compositionstart', '.spm-limit-zenkaku', function () {
    spmLimit.inputting = true;
  });

  /**
   * 入力制限（全角）の日本語入力確定
   */
  $(document).off('compositionend', '.spm-limit-zenkaku');
  $(document).on('compositionend', '.spm-limit-zenkaku', function () {
    spmLimit.inputting = false;
    spmLimit.convertZenkaku(this);
  });

  /**
   * 入力制限（全角）のキー入力
   */
  $(document).off('keyup', '.spm-limit-zenkaku');
  $(document).on('keyup', '.spm-limit-zenkaku', function () {
    if (!spmLimit.inputting) {
      spmLimit.convertZenkaku(this);
    }
  });

  /**
   * 入力制限（全角）のフォーカス喪失
   */
  $(document).off('blur', '.spm-limit-zenkaku');
  $(document).on('blur', '.spm-limit-zenkaku', function () {
    spmLimit.convertZenkaku(this);
  });


  // ------------------------------------------------------------------------
  // 入力制限（日付[H../../..]形式） spm-limit-XXXXXXXX
  // ------------------------------------------------------------------------

  /**
   * 入力制限（日付[H../../..]形式）の日本語入力開始
   */
  $(document).off('compositionstart', '.spm-limit-date');
  $(document).on('compositionstart', '.spm-limit-date', function () {
    spmLimit.inputting = true;
  });

  /**
   * 入力制限（日付[H../../..]形式）の日本語入力確定
   */
  $(document).off('compositionend', '.spm-limit-date');
  $(document).on('compositionend', '.spm-limit-date', function () {
    spmLimit.inputting = false;
    spmLimit.convertDate(this);
  });

  /**
   * 入力制限（日付[H../../..]形式）のキー入力
   */
  $(document).off('keyup', '.spm-limit-date');
  $(document).on('keyup', '.spm-limit-date', function () {
    if (!spmLimit.inputting) {
      spmLimit.convertDate(this);
    }
  });

  /**
   * 入力制限（日付[H../../..]形式）のフォーカス喪失
   */
  $(document).off('blur', '.spm-limit-date');
  $(document).on('blur', '.spm-limit-date', function () {
    spmLimit.convertDate(this);
    spmLimit.formatDate(this);
  });
    
});
// ------------------------------------------------------------------------
// 入力制限（英大文字） spm-limit-bigalpha-numeric
// ------------------------------------------------------------------------

/**
 * 入力制限（英数字）の日本語入力開始
 */
$(document).off('compositionstart', '.spm-limit-bigalpha-numeric');
$(document).on('compositionstart', '.spm-limit-bigalpha-numeric', function () {
    spmLimit.inputting = true;
});

/**
 * 入力制限（英数字）の日本語入力確定
 */
$(document).off('compositionend', '.spm-limit-bigalpha-numeric');
$(document).on('compositionend', '.spm-limit-bigalpha-numeric', function () {
    spmLimit.inputting = false;
    spmLimit.convertBigAlphanumeric(this);
});

/**
 * 入力制限（英数字）のキー入力
 */
$(document).off('keyup', '.spm-limit-bigalpha-numeric');
$(document).on('keyup', '.spm-limit-bigalpha-numeric', function () {
    if (!spmLimit.inputting) {
        spmLimit.convertBigAlphanumeric(this);
    }
});

/**
 * 入力制限（英数字）のフォーカス喪失
 */
$(document).off('blur', '.spm-limit-bigalpha-numeric');
$(document).on('blur', '.spm-limit-bigalpha-numeric', function () {
    spmLimit.convertBigAlphanumeric(this);
});

// ------------------------------------------------------------------------
// 入力制限（英大文字ハイフン） spm-limit-bigalpha-numeric-hyphen
// ------------------------------------------------------------------------
/**
 * 入力制限（英数字）の日本語入力開始
 */
$(document).off('compositionstart', '.spm-limit-bigalpha-numeric-hyphen');
$(document).on('compositionstart', '.spm-limit-bigalpha-numeric-hyphen', function () {
    spmLimit.inputting = true;
});

/**
 * 入力制限（英数字）の日本語入力確定
 */
$(document).off('compositionend', '.spm-limit-bigalpha-numeric-hyphen');
$(document).on('compositionend', '.spm-limit-bigalpha-numeric-hyphen', function () {
    spmLimit.inputting = false;
    spmLimit.convertBigAlphanumericHyphen(this);
});

/**
 * 入力制限（英数字）のキー入力
 */
$(document).off('keyup', '.spm-limit-bigalpha-numeric-hyphen');
$(document).on('keyup', '.spm-limit-bigalpha-numeric-hyphen', function () {
    if (!spmLimit.inputting) {
        spmLimit.convertBigAlphanumericHyphen(this);
    }
});

/**
 * 入力制限（英数字）のフォーカス喪失
 */
$(document).off('blur', '.spm-limit-bigalpha-numeric-hyphen');
$(document).on('blur', '.spm-limit-bigalpha-numeric-hyphen', function () {
    spmLimit.convertBigAlphanumericHyphen(this);
});

/**
 * 入力制限（shift-JIS）のフォーカス喪失
 * shift-JIS範囲外の文字列を消す
 */
$(document).off('blur', 'input[type=text],textarea');
$(document).on('blur', 'input[type=text],textarea', function () {
    spmLimit.deleteOutOfShiftJISString(this);
});


/**
 * 入力制限（shift-JIS）のキー入力
* shift-JIS範囲外の文字列を消す
 */
$(document).off('keyup', 'input[type=text],textarea');
$(document).on('keyup', 'input[type=text],textarea', function () {
    if (!spmLimit.inputting) {
        spmLimit.deleteOutOfShiftJISString(this);
    }
});

/**
 * 入力制限（英数字）の日本語入力開始
 */
$(document).off('compositionstart', 'input[type=text],textarea');
$(document).on('compositionstart', 'input[type=text],textarea', function () {
    spmLimit.inputting = true;
});

/**
 * 入力制限（英数字）の日本語入力確定
 */
$(document).off('compositionend', 'input[type=text],textarea');
$(document).on('compositionend', 'input[type=text],textarea', function () {
    spmLimit.inputting = false;
    spmLimit.deleteOutOfShiftJISString(this);
});


spmLimit.str2Array = function (str) {
    var array = [], i, il = str.length;
    for (i = 0; i < il; i++) array.push(str.charCodeAt(i));
    return array;
};

/**
* shift-JIS範囲外の文字列を消す
* @param{Object}text - 対象のテキストボックス
*/
spmLimit.deleteOutOfShiftJISString = function (text) {
    var s = $(text).val();
    var result = "";

    for (i = 0; i < s.length; i++) {
        var sjis_array = Encoding.convert([s.charCodeAt(i)], { to: 'SJIS', from: 'UNICODE', type: 'array' });
        var s2 = Encoding.convert(sjis_array, { to: 'UNICODE', from: 'SJIS', type: 'string' });

        if (s.charAt(i) == s2) {
            result += s2;
        }
    }

    if ($(text).val() != result) {
      $(text).val(result);
    }
};

// ------------------------------------------------------------------------
// 入力制限（半角英大文字） spm-limit-hankaku-big
// ------------------------------------------------------------------------
/**
 * 入力制限（半角英大文字）の日本語入力開始
 */
$(document).off('compositionstart', '.spm-limit-hankaku-big');
$(document).on('compositionstart', '.spm-limit-hankaku-big', function () {
  spmLimit.inputting = true;
});

/**
 * 入力制限（半角英大文字）の日本語入力確定
 */
$(document).off('compositionend', '.spm-limit-hankaku-big');
$(document).on('compositionend', '.spm-limit-hankaku-big', function () {
  spmLimit.inputting = false;
  spmLimit.convertHalfsizeBig(this);
});

/**
 * 入力制限（半角英大文字）のキー入力
 */
$(document).off('keyup', '.spm-limit-hankaku-big');
$(document).on('keyup', '.spm-limit-hankaku-big', function () {
  if (!spmLimit.inputting) {
    spmLimit.convertHalfsizeBig(this);
  }
});

/**
 * 入力制限（半角英大文字）のフォーカス喪失
 */
$(document).off('blur', '.spm-limit-hankaku-big');
$(document).on('blur', '.spm-limit-hankaku-big', function () {
  spmLimit.convertHalfsizeBig(this);
});
