/**
 * @fileoverview 三点リーダー共通部品
 *
 * 表示幅を超える長い文字列の場合、文字列を省略して省略記号（三点リーダー）を表示する共通部品。
 * 省略記号（三点リーダー）を含む文字列をタップすることで、全文をツールチップで表示する。
 *
 * ■利用方法
 *   1. 一行のみの文字列で表示幅を超えると省略記号（三点リーダー）を表示させる場合、
 *      表示幅を設定している要素に spm-omit クラスを指定する。
 *        <div class="spm-omit" style="width:200px;border:solid 1px;">
 *          表示幅を超える長い文字列が存在しています。
 *        </div>
 *
 *   2. 複数行の文字列で表示幅を超えると省略記号（三点リーダー）を表示させる場合、
 *      文字列全体を含む表示幅を設定している要素に spm-omit-multiline クラスを指定し、
 *      各行を div 要素で囲んで spm-omit-line クラスを指定する。
 *        <div class="spm-omit-multiline" style="width:200px;border:solid 1px;">	
 *          <div class="spm-omit-line" style="width:200px;">短い行です。</div>
 *          <div class="spm-omit-line" style="width:200px;">表示幅を超える長い行が存在しています。</div>
 *        </div>
 *
 *   3. リンクと組み合わせる場合、
 *      表示幅を設定している要素に対してはリンクを設定せず、その内部でリンクを設定する。
 *        <div class="spm-omit" style="width:200px;border:solid 1px;">
 *          <a href="index.html">
 *          表示幅を超える長い文字列が存在しています。
 *          </a>
 *        </div>
 *
 *   4. 自動折り返しの複数行を対象として表示領域を超えると省略記号（三点リーダー）を表示させる場合、
 *      表示領域を設定している要素に spm-omit-line-clamp クラスを指定する。
 *      注意点
 *      ・要素の右側に1文字分の余白が設定され、その余白に三点リーダーが表示される。
 *      ・要素に背景色を設定する必要がある。背景色を指定しないと常に三点リーダーが表示される。
 *      ・2行以上になると、表示領域に収まっていてもタップ時にツールチップが表示される。
 *        <div class="spm-omit-line-clamp" style="width:130px;height:54px;background-color:#fff;border:solid 1px;">
 *          自動折り返しをして表示領域を超える長い文字列が存在しています。
 *        </div>
 *
 *   5. 自動折り返しの複数行を対象として表示領域を超えても省略記号（三点リーダー）を表示させず、
 *      表示領域を超えた状態でタップすると全文をツールチップで表示させる場合、
 *      表示領域を設定している要素に spm-omit-none-ellipsis クラスを指定する。
 *        <div class="spm-omit-none-ellipsis" style="width:130px;height:54px;border:solid 1px;">
 *          自動折り返しをして表示領域を超える長い文字列が存在しています。
 *        </div>
 *
 *   6. 計算で自動折り返しされた文字列の表示領域超えを判定し、省略記号（三点リーダー）を表示させる場合、
 *      表示領域を設定しているdiv要素を引数に spmOmit.calculate を実行する。
 *      注意点
 *      ・表示領域を設定する要素は div とする。
 *        テーブルのセルを対象にする場合は th, td の中に別途 div を用意し、表示領域を設定する。
 *      ・計算処理で負荷がかかるため、1画面中で多数の要素に設定しない。
 *      ・表示内容を変更した場合は、その都度 spmOmit.calculate を実行する。
 *      html要素例
 *        <div id="targetId" style="width:130px;height:54px;border:solid 1px;"></div>
 *      JavaScript例
 *        $('#targetId').text('自動折り返しをして表示領域を超える長い文字列を設定します。');
 *        spmOmit.calculate($('#targetId'));
 */

spmOmit = function () {
};

/**
 * 計算で自動折り返しされた文字列の表示領域超えを判定し、省略記号（三点リーダー）を表示します。
 * @param {Elelment} 対象のdiv要素
 */
spmOmit.calculate = function (target) {
  if (target.length > 1) {
    for (var i = 0; i < target.length; i++) {
      spmOmit.calculate(target[i]);
    }
    return;
  }
  spmOmit.calculateInit(target);
  spmOmit.calculateExecute(target);
};

/**
 * 計算で自動折り返しされた文字列の表示領域超えを判定するための初期化を行います。
 * @param {Elelment} 対象のdiv要素
 */
spmOmit.calculateInit = function (target) {
  var elem = $(target);
  var org = elem[0].innerText;
  elem.data('original-text', org);
  elem.addClass('spm-omit-calc');
};

/**
 * 計算で自動折り返しされた文字列の表示領域超えを判定を行います。
 * @param {Elelment} 対象のdiv要素
 */
spmOmit.calculateExecute = function (target) {
  var elem = $(target);
  var text = elem.data('original-text');
  var clone = elem.clone();
  clone
    .css({
      display: 'none',
      position: 'absolute',
      overflow: 'visible'
    })
    .width(elem.width())
    .height('auto');
  clone.text(text);

  elem.after(clone);
  while ((text.length > 0) && clone.height() > elem.height()) {
    text = text.substr(0, text.length - 1);
    clone.text(text + '...');
  }
  elem.text(clone.text());
  clone.remove();
};

/**
 * 文字列全体を表示するポップアップ画面を生成します。
 * @return {Object} ポップアップ画面
 */
spmOmit.createPopup = function () {
  var pop = $('#spm-omit-pop');
  if (pop.length == 0) {
    pop = $('<div id="spm-omit-pop" tabindex="-1"></div>');
    $('body').append(pop);
    pop.on('click', function () {
      $(this).hide();
    });
    pop.on('blur', function () {
      spmOmit.blurTime = new Date();
      $(this).hide();
    });
  }
  return pop;
};

/**
 * ポップアップ画面からフォーカスが喪失した時刻
 */
spmOmit.blurTime = new Date();

/**
 * ポップアップ画面の位置を設定します。
 * @param {Object} pop - ポップアップ画面
 * @param {Object} e - 座標情報を含むクリックイベントの引数
 * @param {number} rows - 行数
 */
spmOmit.setPopupPosition = function (pop, e, rows) {
  var x = Math.max(0, e.pageX - 15);
  var y = Math.max(0, e.pageY - 45 - rows * 20);
  if (window.innerWidth - x < 200) {
    x = Math.max(0, window.innerWidth - 200);
  }
  pop.css('top', y);
  pop.css('left', x);
};

/**
 * ポップアップ画面の z-index を設定します。
 * @param {Object} pop - ポップアップ画面
 * @param {Object} elem - 対象要素
 */
spmOmit.setPopupZIndex = function (pop, elem) {
  var z = spmOmit.getMaxZIndex(elem);
  pop.css('z-index', z + 1);
};

/**
 * 指定された要素と親要素の中で最大の z-index を取得します。
 * @param {Object} elem - 対象要素
 */
spmOmit.getMaxZIndex = function (elem) {
  var maxZIndex = 0;
  var zIndex = 0;
  
  // 2019/08/23 add 共通部品要望No32対応
  var elemStyle;
  
  while (elem.parentNode) {
    elem = elem.parentNode;
    
    // 2019/08/23 add start 共通部品要望No32対応
    try{       
      elemStyle = elem.currentStyle || (document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(elem) : null);
    }catch(e){
      // 例外発生時はnullを設定する。
      elemStyle = null;
    }
    // 2019/08/23 add end 共通部品要望No32対応
    
    if (elem.style && elem.style.zIndex) {
      zIndex = elem.style.zIndex;

    // 2019/08/23 mod start 共通部品要望No32対応
    //} else if (elem.currentStyle && elem.currentStyle.zIndex) {
    //  zIndex = elem.currentStyle.zIndex;
    } else if (elemStyle && elemStyle.zIndex) {
      zIndex = elemStyle.zIndex;
    // 2019/08/23 mod end 共通部品要望No32対応

    }
    zIndex = parseInt(zIndex);
    if (zIndex) {
      maxZIndex = Math.max(maxZIndex, zIndex);
    }
  }
  return maxZIndex;
}

/**
 * ポップアップ画面にメッセージを設定し、表示・非表示を変更する。
 * @param {Object} pop - ポップアップ画面
 * @param {string} msg - メッセージ
 */
spmOmit.setPopupMessage = function (pop, msg) {
  // ポップアップ対象が前回と同じか判定する
  var same = pop.text() == msg;
  pop.text(msg);

  if (same && pop.is(':visible')) {
    // ポップアップ対象が前回と同一で、現在表示中なら非表示にする
    pop.hide();
  } else if (same && (new Date().getTime() - spmOmit.blurTime.getTime()) < 300) {
    // ポップアップ対象が前回と同一で、直前にフォーカス喪失で非表示になっている場合は何もしない
  } else {
    // ポップアップを表示する
    pop.show();
    pop.focus();
    if (pop.offset().top + pop.outerHeight() > window.innerHeight) {
      // ポップアップ位置を調整
      var orgY = pop.offset().top;
      var y = window.innerHeight - pop.outerHeight();
      if (y < 0) {
        y = 0;
      }
      pop.css('top', y);
      if (y == 0) {
        var x = pop.offset().left - 200;
        if (x < 0) {
          x = 0;
        }
        pop.css('left', x);
        pop.css('top', orgY);
        if (pop.offset().top + pop.outerHeight() > window.innerHeight) {
          y = window.innerHeight - pop.outerHeight();
          if (y < 0) {
            y = 0;
          }
          pop.css('top', y);
        }
      }
    }
  }
};

$(function () {

  /**
   * 1行の省略文字列をタップ
   */
  $(document).off('click', '.spm-omit');
  $(document).on('click', '.spm-omit', function (e) {
    var pop = spmOmit.createPopup();

    var elem = $(this);
    var isTable = (this.tagName == 'TH' || this.tagName == 'TD');
    if ((isTable == false && elem.innerWidth() >= elem[0].scrollWidth) ||
        (isTable == true && elem.outerWidth() >= elem[0].scrollWidth)) {
      // 省略されてないので終了
      pop.hide();
      return;
    }

    var msg = elem[0].innerText;

    spmOmit.setPopupPosition(pop, e, 1);
    spmOmit.setPopupZIndex(pop, this);
    spmOmit.setPopupMessage(pop, msg);
  });

  /**
   * 複数行の省略文字列をタップ
   */
  $(document).off('click', '.spm-omit-multiline');
  $(document).on('click', '.spm-omit-multiline', function (e) {
    var pop = spmOmit.createPopup();

    var omitExists = false;
    var elems = $(this).find('.spm-omit-line');
    var isTable = (this.tagName == 'TH' || this.tagName == 'TD');
    var msg = '';
    for (var i = 0; i < elems.length; i++) {
      if ((isTable == false && elems.innerWidth() < elems[i].scrollWidth) ||
          (isTable == true && elems.outerWidth() < elems[i].scrollWidth)) {
        omitExists = true;
      }
      if (msg) {
        msg += '\n' + elems[i].innerText;
      } else {
        msg = elems[i].innerText;
      }
    }
    if (omitExists == false) {
      // 省略されてないので終了
      pop.hide();
      return;
    }

    spmOmit.setPopupPosition(pop, e, elems.length);
    spmOmit.setPopupZIndex(pop, this);
    spmOmit.setPopupMessage(pop, msg);
  });

  /**
   * 自動折り返し複数行の省略文字列をタップ
   */
  $(document).off('click', '.spm-omit-line-clamp, .spm-omit-none-ellipsis');
  $(document).on('click', '.spm-omit-line-clamp, .spm-omit-none-ellipsis', function (e) {
    var pop = spmOmit.createPopup();

    var elem = $(this);
    if (elem.outerHeight() >= elem[0].scrollHeight) {
      // 省略されてないので終了
      pop.hide();
      return;
    }

    var msg = elem[0].innerText;

    spmOmit.setPopupPosition(pop, e, 1);
    spmOmit.setPopupZIndex(pop, this);
    spmOmit.setPopupMessage(pop, msg);
  });

  /**
   * 計算で自動折り返しされた文字列の表示領域超えを判定した要素をタップ
   */
  $(document).off('click', '.spm-omit-calc');
  $(document).on('click', '.spm-omit-calc', function (e) {
    var pop = spmOmit.createPopup();

    var elem = $(this);
    var msg = elem.data('original-text');
    if (msg == elem[0].innerText) {
      // 省略されていないので終了
      pop.hide();
      return;
    }

    spmOmit.setPopupPosition(pop, e, 1);
    spmOmit.setPopupZIndex(pop, this);
    spmOmit.setPopupMessage(pop, msg);
  });

  /**
   * サイズ変更時に自動折り返しされた文字列の表示領域超えを判定を再計算
   */
  var timerId = null;
  $(window).off('resize.spmOmit');
  $(window).on('resize.spmOmit', function () {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(function () {
      var targets = $('.spm-omit-calc');
      for (var i = 0; i < targets.length; i++) {
        spmOmit.calculateExecute(targets[i]);
      }
    }, 100);
  });
});
