(function (base) {

  // 名前空間
  var ns = base.spmValidator = base.spmValidator || {};

  /**
   * 全角文字列判定
   * 指定された文字列がすべて全角文字か否かを判定し、判定結果を表す真偽値を返します。
   * @param {string} target 判定対象の文字列。
   * @return {boolean} 判定結果を表すboolean値。
   *                   全角文字列の場合はtrue、全角文字以外の文字列の場合はfalse。
   */
  ns.IsZenkaku = function (target) {
      return target.match(/^[^ -~｡-ﾟ]+$/) ? true : false;
  };

  /**
   * 半角文字列判定
   * 指定された文字列がすべて半角文字か否かを判定し、判定結果を表す真偽値を返します。
   * @param {string} target 判定対象の文字列。
   * @return {boolean} 判定結果を表すboolean値。
   *                   半角文字列の場合はtrue、半角文字以外の文字列の場合はfalse。
   */
  ns.IsHankaku = function (target) {
      return target.match(/^[ -~｡-ﾟ]*$/) ? true : false
  };

  /**
   * 電話番号書式判定
   * 指定された文字列が電話番号の書式として正しいか否かを判定し、判定結果を表す真偽値を返します。
   * @param {string} target 判定対象の文字列。
   * @return {boolean} 判定結果を表すboolean値。
   *                   電話番号書式の場合はtrue、電話番号書式以外の場合はfalse。
   */
  ns.IsPhoneNumber = function (target) {
      return target.match(/^[-0-9a-zA-Z]{0,20}$/) ? true : false;
  };

  /**
   * メールアドレス書式判定
   * 指定されたメールアドレス文字列が書式として正しいか否かを判定し、判定結果を表す真偽値を返します。
   * @param {string} target 判定対象の文字列。
   * @return {boolean} 判定結果を表すboolean値。
   *                   メールアドレスの場合はtrue、メールアドレス以外の書式の場合はfalse。
   */
  ns.IsMail = function (target) {
      return target.match(/^[a-zA-Z0-9.#$&'*+/=?^_`{|}~-]+@\w+(?:[-.]\w+)*\.\w+(?:[-.]\w+)*$/) ? true : false;
  };

  /**
   * メールアドレス禁則文字判定
   * 指定された文字列を"@"前後に分割し、前後それぞれの文字列に
   * メールアドレス禁則文字(※)が含まれるか否かを判定し、判定結果を表す真偽値を返します。
   * ※参考：メールアドレス禁則文字列判定用正規表現パターン：'^.*[!%\s\(&lt;&gt;:@&quot;\\].*$
   *         →詳細は下記の通り
   *             ・!、%、スペース、(、<、>、:、@、'、\ のいずれかが含まれること
   * @param {string} target 判定対象の文字列。
   * @return {boolean} 判定結果を表すboolean値。
   *                   メールアドレス禁則文字が含まれる場合はtrue、含まれない場合はfalse。
   */
  ns.IsMailIllegal = function (target) {
      return target.match(/^.*[!%\s\(<>:@'\\].*$/) ? true : false;
  };
})(window);