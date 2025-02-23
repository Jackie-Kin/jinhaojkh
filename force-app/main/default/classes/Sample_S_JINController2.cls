/* ConvertFile converted.
 * システム   : 次期営業支援システム（SPM版）
 * 機能名     : すべてのページの対象資源を参照する
 * ファイル名 : SCJhPageLinkController
 *
 *  VERSION    DATE        BY          CHANGE/COMMENT
 * ----------------------------------------------------------------
 *  1.00       2018/11/28  JIN        新規作成
 */
global with sharing class Sample_S_JINController2 {
    public List<apexpage> apexPageInfos{get; set;}
    public List<apexclass> apexClassInfos{get; set;}
    public List<apexlog> apexLogInfos{get; set;}

    public String debugContent {get; set;}
    public String totalPageCnt {get; set;}
    public String totalClsCnt {get; set;}
    public String searchText;
    
    public String getSearchText() {
        return searchText;
    }
    
    public void setSearchText(String s) {
        searchText = s;
    }

    public List<apexpage> getApexPageInfos() {
        return apexPageInfos;
    }
    
    public List<apexclass> getApexClassInfos() {
        return apexClassInfos;
    }
    
    public List<apexlog> getApexLogInfos() {
        return apexLogInfos;
    }
    
    public PageReference doSearch(){
        
        if (searchText.trim()!=''){
            String query = 'select id, name, masterlabel, LastModifiedDate from apexpage Where name like \'%'+searchText+'%\' order by name';
            apexPageInfos = Database.query(query);
        }else{      
            apexPageInfos = [select id, 
                             name, 
                             masterlabel, 
                             LastModifiedDate
                             from apexpage
                             order by name];    
        }

        if (searchText.trim()!=''){
            String query2 = 'select id, name, LastModifiedDate from apexclass Where name like \'%'+searchText+'%\' order by name';
            apexClassInfos = Database.query(query2);
        }else{      
            apexClassInfos = [select id, 
                              name, 
                              LastModifiedDate from apexclass 
                              order by name];
        }   
        
        String query3 = 'select id, starttime, LastModifiedDate, operation from apexlog Where operation like \'%'+searchText+'%\' and starttime=TODAY order by LastModifiedDate DESC';  
        System.debug(query3);
        apexLogInfos = Database.query(query3);      
        
//      if (searchText.trim()!=''){
//          String query2 = 'select id, LastModifiedDate, operation from apexlog Where operation \'%'+searchText+'%\' order by LastModifiedDate DESC';
//          apexClassInfos = Database.query(query2);
//      }else{      
//          apexClassInfos = [select id, 
//                            starttime,
//                            LastModifiedDate,
//                            operation
//                            from apexlog
//                            location='systemlog' and
//                            starttime=Today
//                            order by starttime DESC];
//      }       
        
        return null;
    }

    public void pageLoad() {
        debugContent='';
    }

    //  public  List<apexpage> getApexPageInfos()
    //  {
    //      debugContent=kinoID;
    //      
    //      if (kinoID.trim()!=''){
    //          apexPageInfos = Database.query('select id, name, masterlabel, LastModifiedDate from apexpage Where name like %'+kinoID+' order by name' );
    //          debugContent=debugContent+kinoID+'1';
    //      }else{      
    //          apexPageInfos = [select id, 
    //                           name, 
    //                           masterlabel, 
    //                           LastModifiedDate
    //                           from apexpage
    //                           order by name];
    //          debugContent=debugContent+kinoID+'2';
    //      }
    //
    //      totalPageCnt=String.valueof(apexPageInfos.size());
    //
    //      return apexPageInfos;
    //  }
    //
    //  public  List<apexclass> getApexClassInfos()
    //  {
    //      apexClassInfos = [select id, 
    //                        name, 
    //                        LastModifiedDate from apexclass 
    //                        order by name];
    //
    //      totalClsCnt=String.valueof(apexClassInfos.size());
    //
    //      return apexClassInfos;
    //  }



}