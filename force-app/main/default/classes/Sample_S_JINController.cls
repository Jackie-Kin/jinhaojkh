/* ConvertFile converted.
 * システム   : 次期営業支援システム（SPM版）
 * 機能名     : フォローリスト - 顧客リスト画面
 * ファイル名 : SG10030Controller.cls
 *
 *  VERSION    DATE        BY          CHANGE/COMMENT
 * ----------------------------------------------------------------
 *  1.00       2018/09/27  Auto        新規作成
 */
global with sharing class Sample_S_JINController {

    public PageReference pageLoad() {
        return null;
    }

    List<apexpageinfo> apexPageInfos;
    
    public  List<apexpageinfo> getApexPageInfos()
    {
        apexPageInfos = [select apexpageid, name, masterlabel from apexpageinfo order by name];
          
        return apexPageInfos;
    }
}