/* ConvertFile converted.
 * システム   : 次期営業支援システム（SPM版）
 * 機能名     : すべてのページの対象資源を参照する
 * ファイル名 : myMetaSearchController 
 *
 *  VERSION    DATE        BY          CHANGE/COMMENT
 * ----------------------------------------------------------------
 *  1.00       2018/11/28  JIN        新規作成
 */
global with sharing class myMetaSearchController {
 
    public List<apexpage> apexPageInfos{get; set;}
    public List<apexclass> apexClassInfos{get; set;}
    public List<ApexComponent> apexComponentInfos{get; set;}
    public List<myObjectInfo> apexObjectInfos{get; set;}    

    public String debugContent {get; set;}

    public  String totalPageCnt {
        get {
            if (totalPageCnt == null) {
              totalPageCnt = '0';
            }
            return totalPageCnt;
        }
       private set;
    }
    
    public  String totalClsCnt {
        get {
            if (totalClsCnt == null) {
              totalClsCnt = '0';
            }
            return totalClsCnt;
        }
       private set;
    }    
    
    public  String totalCompCnt {
        get {
            if (totalCompCnt == null) {
              totalCompCnt = '0';
            }
            return totalCompCnt;
        }
       private set;
    }
    
    public  String totalObjectCnt {
        get {
            if (totalObjectCnt == null) {
                totalObjectCnt = '0';
            }
            return totalObjectCnt;
        }
       private set;
    }    
    
    public String searchText;

//    public String getTotalPageCnt() {
//        return totalPageCnt;
//    }
//    
//    public String getTotalCompCnt() {
//      return totalCompCnt;
//    }   
    
//    public String getTotalClsCnt() {
//        return totalClsCnt;
//    }     
    
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
    
    public List<ApexComponent> getApexComponentInfos() {
        return apexComponentInfos;
    }
    
    public List<myObjectInfo> getApexObjectInfos() {
        return apexObjectInfos;
    }    

    public PageReference doSearch(){
        if (searchText.trim()!=''){
            String query = 'select id, name, masterlabel  , LastModifiedDate from apexpage Where name like \'%'+searchText+'%\' order by name';
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

        if (searchText.trim()!=''){
            String query3 = 'select id, name, controllerkey, LastModifiedDate from apexcomponent Where name like \'%'+searchText+'%\' order by name';
            apexComponentInfos= Database.query(query3);
        }else{      
            apexComponentInfos= [select id, 
                              name, 
                              controllerkey,
                              LastModifiedDate from apexcomponent 
                              order by name];
        }  
        
        //オブジェクト
//        Map<String, SObjectType> types = Schema.getGlobalDescribe();
//        List<myObjectInfo> objs=new list<myObjectInfo>();
//                       
//       for (String key : types.keySet()) {
//          string sLabel=(String) types.get(key).getDescribe().getLabel();   
//           
//          myObjectInfo ob = new myObjectInfo();
//          ob.objId=key;
//          ob.objName= sLabel;                  
//          objs.add(ob);
//       } 
       
        totalPageCnt=String.valueof(apexPageInfos.size());
        totalClsCnt=String.valueof(apexClassInfos.size());  
        totalCompCnt=String.valueof(apexComponentInfos.size()); 
//        totalObjectCnt=String.valueof(apexObjectInfos.size()); 
        debugContent=totalPageCnt;

        return null;
    }

    public void pageLoad() {
        debugContent='';
    }
    
    public class myObjectInfo
    {
        public string objId{get;set;}
        public string objName{get;set;}
    }
}