(function (base) {

  // 名前空間
  var ns = base.spmConstraint = base.spmConstraint || {};

  /**
   * 文字列のバイト数単位での切り捨て処理
   * 指定された文字列が、指定されたバイト数を超える場合に、指定バイト数までで文字を切り捨てる。
   * @param {string} str 判定対象の文字列。
   * @param {number} maxByte 文字列の最大バイト数
   * @return {string} 指定バイト数までで切り捨てた文字列
   */
  var _truncate = function (str, maxByte) {

    var byte = 0;

    for (var i = 0; i < str.length; i++) {
      byte += str.charCodeAt(i) <= 0xFF ? 1 : 2;
      if (byte > maxByte) {

        return str.substr(0, i);
      }
    }
    return str;
  };

  /**
   * 指定された要素に対して、最大バイト数による入力制限を設定する
   * @param {string} element 入力制限を設定する要素
   * @param {number} maxByte 入力可能な最大バイト数(未指定の場合は、対象要素のmaxlength属性の値)
   */
  ns.setMaxByte = function (element, maxByte) {

    var jElement = $(element);

    if (!maxByte) {

      maxByte = jElement.attr('maxlength');
    }

    jElement.keyup(function () {
      var inputValue = jElement.val();
      var byteCount = spmUtil.getBytes(inputValue);

      if (maxByte < byteCount) {
        var newInputValue = _truncate(inputValue, maxByte)
        jElement.val(newInputValue);
      }
    });
  };

})(window);