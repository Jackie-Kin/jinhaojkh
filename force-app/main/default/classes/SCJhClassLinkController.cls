/* ConvertFile converted.
 * システム   : 次期営業支援システム（SPM版）
 * 機能名     : すべてのページの対象資源を参照する
 * ファイル名 : SCJhClassLinkController
 *
 *  VERSION    DATE        BY          CHANGE/COMMENT
 * ----------------------------------------------------------------
 *  1.00       2018/11/28  JIN        新規作成
 */
global with sharing class SCJhClassLinkController{
    List<apexclass> apexClassInfos;
    public String totalCnt {get; set;}
    
    public  List<apexclass> getApexClassInfos()
    {
        apexClassInfos = [select id, 
                         name, 
                         LastModifiedDate from apexclass 
                         order by name];
        
        totalCnt=String.valueof(apexClassInfos.size());
          
        return apexClassInfos;
    }
}