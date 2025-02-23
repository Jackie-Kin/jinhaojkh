/* ConvertFile converted.
 * システム   : 次期営業支援システム（SPM版）
 * 機能名     : すべてのページの対象資源を参照する
 * ファイル名 : SCJhPageLinkController
 *
 *  VERSION    DATE        BY          CHANGE/COMMENT
 * ----------------------------------------------------------------
 *  1.00       2018/11/28  JIN        新規作成
 */
global with sharing class SCJhPageLinkController {
    List<apexpage> apexPageInfos;
    public String totalCnt {get; set;}
    
    public  List<apexpage> getApexPageInfos()
    {
        apexPageInfos = [select id, 
                         name, 
                         masterlabel, 
                         LastModifiedDate from apexpage 
                         order by name];
        
        totalCnt=String.valueof(apexPageInfos.size());
          
        return apexPageInfos;
    }
}