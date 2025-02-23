/**
 * @fileoverview 共通のユーティリティ
 */

'use strict';

var InputChecker;
var InputCheckerConst;

InputChecker = {};

InputCheckerConst = {
    /**
     * 入力タイプ一覧
     */
    NO_POST: '1',       // 郵便番号（共通）
    CD_JTODOFUK: '2',   // 住所コード(住所都道府県市区郡コード)（共通）
    CD_JSIKUGUN: '3',   // 住所コード(住所町村字コード)（共通）
    CD_JKOAZA: '4',     // 住所コード(住所小字コード)（共通）
    CD_JEDABAN: '5',    // 住所コード(住所枝番コード)（共通）
    NO_FAX: '6',        // FAX（顧客情報詳細）
    MEMO: '7',          // 重要メモ&活動メモ（顧客基本）
    NO_KINMUFAX: '8',   // FAX（勤務先情報）
    NO_KATARUIB: '9',   // 指定類別No.（車両情報詳細）
    CD_COLOR: '10',     // 外鈑色、トリム（車両情報詳細）
    MJ_FRAMEKAT: '11',  // フレーム型式（車両情報詳細）
    NO_FRAME: '12',     // フレームＮＯ（車両情報詳細）
    MJ_ENGINKAT: '13',  // エンジン型式（車両情報詳細）
    NO_SYAKEY: '14',    // 車両キーＮＯ（車両情報詳細）
    JUSHO_CODE: '15'    // 住所コード（共通）
};

/**
 * 文字列間ブランク判定
 * 
 * @param  aValue   {string} 入力値
 * 
 * @return response {object} 結果を格納したオブジェクト
 */
InputChecker.IsTextBlank = function (aValue) {
    // 返り値
    var response = {
        result: false, // 判定結果
        message: '' // 判定失敗時のメッセージ
    };
    // 正規表現
    if (aValue.match(/[ ]/g) !== null &&
        (aValue.match(/^ /g) === null &&
            aValue.match(/ $/g) === null)) {
        response.message = '文字内に半角スペースがあります';
        return response;
    }
    response.result = true;
    return response;
};

/**
 * 入力チェック
 * 
 * @param aType  {string}   入力タイプ
 * @param aValue {string}   入力値
 *
 * @return response {object} 結果を格納したオブジェクト
 * 
 */
InputChecker.check = function (aType, aValue) {

    // 入力チェックの返り値
    var response = {
        result: false,  // 判定結果
        message: ''     // 判定失敗時のメッセージ
    };

    switch (aType) {
        // 郵便番号（共通）
        case InputCheckerConst.NO_POST:
            // 文字列間ブランク判定
            var isBlank = InputChecker.IsTextBlank(aValue);
            if (isBlank.result === false) return isBlank;
            // 正規表現
            if (aValue.match(/^\d{3}-?\d{0}$/g) === null &&
                aValue.match(/^\d{3}-?\d{2}$/g) === null &&
                aValue.match(/^\d{3}-?\d{4}$/g) === null) {
                response.message = '郵便番号の書式が異なります';
                return response;
            }
            break;
        // 住所コード桁数判定（共通）
        case InputCheckerConst.JUSHO_CODE:
            // 桁数
            switch (aValue.length) {
                case 2:
                    break;
                case 5:
                    break;
                case 9:
                    break;
                case 12:
                    break;
                case 14:
                    break;
                default:
                    response.message = '入力桁数が間違っています';
                    return response;
            }
            break;
            // 住所コード(住所都道府県市区郡コード)（共通）
        case InputCheckerConst.CD_JTODOFUK:
            // 文字列間ブランク判定
            var isBlank = InputChecker.IsTextBlank(aValue);
            if (isBlank.result === false) return isBlank;
            // 桁数
            if (aValue.length !== 5) {
                response.message = '入力桁数が間違っています';
                return response;
            }
            // 正規表現
            if (aValue.match(/^\d{5}$/g) === null) {
                response.message = '書式が異なる入力があります';
                return response;
            }
            break;
            // 住所コード(住所町村字コード)（共通）
        case InputCheckerConst.CD_JSIKUGUN:
            // 文字列間ブランク判定
            var isBlank = InputChecker.IsTextBlank(aValue);
            if (isBlank.result === false) return isBlank;
            // 桁数
            if (aValue.length !== 4) {
                response.message = '入力桁数が間違っています';
                return response;
            }
            // 正規表現
            if (aValue.match(/^\d{4}$/g) === null) {
                response.message = '書式が異なる入力があります';
                return response;
            }
            break;
            // 住所コード(住所小字コード)（共通）
        case InputCheckerConst.CD_JKOAZA:
            // 文字列間ブランク判定
            var isBlank = InputChecker.IsTextBlank(aValue);
            if (isBlank.result === false) return isBlank;
            // 桁数
            if (aValue.length !== 3) {
                response.message = '入力桁数が間違っています';
                return response;
            }
            // 正規表現
            if (aValue.match(/^\d{3}$/g) === null) {
                response.message = '書式が異なる入力があります';
                return response;
            }
            break;
            // 住所コード(住所枝番コード)（共通）
        case InputCheckerConst.CD_JEDABAN:
            // 文字列間ブランク判定
            var isBlank = InputChecker.IsTextBlank(aValue);
            if (isBlank.result === false) return isBlank;
            // 桁数
            if (aValue.length !== 2) {
                response.message = '入力桁数が間違っています';
                return response;
            }
            // 正規表現
            if (aValue.match(/^\d{2}$/g) === null) {
                response.message = '書式が異なる入力があります';
                return response;
            }
            break;
            // FAX（顧客情報詳細）
        case InputCheckerConst.NO_FAX:
            // 文字列間ブランク判定
            var isBlank = InputChecker.IsTextBlank(aValue);
            if (isBlank.result === false) return isBlank;
            // 桁数
            if (aValue.length < 1 || aValue.length > 13) {
                response.message = '入力桁数が間違っています';
                return response;
            }
            // 正規表現
            if (aValue.match(/^[A-Z0-9-]{1,13}$/g) === null) {
                response.message = '書式が異なる入力があります';
                return response;
            }
            break;
            // 重要メモ&活動メモ（顧客基本）
        case InputCheckerConst.MEMO:
            // 桁数
            if (aValue.length < 1 || aValue.length > 1000) {
                response.message = '入力桁数が間違っています';
                return response;
            }
            break;
            // FAX（勤務先情報）
        case InputCheckerConst.NO_KINMUFAX:
            // 文字列間ブランク判定
            var isBlank = InputChecker.IsTextBlank(aValue);
            if (isBlank.result === false) return isBlank;
            // 桁数
            if (aValue.length < 1 || aValue.length > 20) {
                response.message = '入力桁数が間違っています';
                return response;
            }
            // 正規表現
            if (aValue.match(/^[A-Z0-9-]{1,20}$/g) === null) {
                response.message = '書式が異なる入力があります';
                return response;
            }
            break;
            // 指定類別No.（車両情報詳細）
        case InputCheckerConst.NO_KATARUIB:
            // 文字列間ブランク判定
            var isBlank = InputChecker.IsTextBlank(aValue);
            if (isBlank.result === false) return isBlank;
            // 桁数
            if (aValue.length > 9) {
                response = { result: false, message: '入力桁数が間違っています' };
                return response;
            }
            // 正規表現
            if (aValue.match(/^[A-Z0-9-]{0,9}$/g) === null) {
                response.message = '書式が異なる入力があります';
                return response;
            }
            break;
            // 外鈑色、トリム（車両情報詳細）
        case InputCheckerConst.CD_COLOR:
            // 文字列間ブランク判定
            var isBlank = InputChecker.IsTextBlank(aValue);
            if (isBlank.result === false) return isBlank;
            // 桁数
            if (aValue.length < 1 || aValue.length > 4) {
                response.message = '入力桁数が間違っています';
                return response;
            }
            // 正規表現
            if (aValue.match(/^[A-Z0-9-]{1,4}$/g) === null) {
                response.message = '書式が異なる入力があります';
                return response;
            }
            break;
            // フレーム型式（車両情報詳細）
        case InputCheckerConst.MJ_FRAMEKAT:
            // 文字列間ブランク判定
            var isBlank = InputChecker.IsTextBlank(aValue);
            if (isBlank.result === false) return isBlank;
            // 桁数
            if (aValue.length < 1 || aValue.length > 11) {
                response.message = '入力桁数が間違っています';
                return response;
            }
            // 正規表現
            if (aValue.match(/^[A-Z0-9-]{1,11}$/g) === null) {
                response.message = '書式が異なる入力があります';
                return response;
            }
            break;
            // フレームＮＯ（車両情報詳細）
        case InputCheckerConst.NO_FRAME:
            // 文字列間ブランク判定
            var isBlank = InputChecker.IsTextBlank(aValue);
            if (isBlank.result === false) return isBlank;
            // 桁数
            if (aValue.length < 1 || aValue.length > 9) {
                response.message = '入力桁数が間違っています';
                return response;
            }
            // 正規表現
            if (aValue.match(/^[A-Z0-9-]{1,9}$/g) === null) {
                response.message = '書式が異なる入力があります';
                return response;
            }
            break;
            // エンジン型式（車両情報詳細）
        case InputCheckerConst.MJ_ENGINKAT:
            // 文字列間ブランク判定
            var isBlank = InputChecker.IsTextBlank(aValue);
            if (isBlank.result === false) return isBlank;
            // 桁数
            if (aValue.length < 1 || aValue.length > 5) {
                response.message = '入力桁数が間違っています';
                return response;
            }
            // 正規表現
            if (aValue.match(/^[A-Z0-9-]{1,5}$/g) === null) {
                response.message = '書式が異なる入力があります';
                return response;
            }
            break;
            // 車両キーＮＯ（車両情報詳細）
        case InputCheckerConst.NO_SYAKEY:
            // 文字列間ブランク判定
            var isBlank = InputChecker.IsTextBlank(aValue);
            if (isBlank.result === false) return isBlank;
            // 桁数
            if (aValue.length < 1 || aValue.length > 6) {
                response.message = '入力桁数が間違っています';
                return response;
            }
            // 正規表現
            if (aValue.match(/^[A-Z0-9-]{1,6}$/g) === null) {
                response.message = '書式が異なる入力があります';
                return response;
            }
            break;
        default:
            response = {
                result: false,
                message: "対象データは、チェック対象外です:" + aType + aValue
            };
            return response;
    }

    // 入力形式のチェックを通過した場合はチェック成功
    response.result = true;
    return response;
};