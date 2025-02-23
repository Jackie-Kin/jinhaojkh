public class SearchBookController {
    public List<apexpage> apexPageInfos{get; set;}
    public List<apexclass> apexClassInfos{get; set;}
    public List<ApexComponent> apexComponentInfos{get; set;}

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

        totalPageCnt=String.valueof(apexPageInfos.size());
        totalClsCnt=String.valueof(apexClassInfos.size());  
        totalCompCnt=String.valueof(apexComponentInfos.size()); 
        debugContent=totalPageCnt;

        return null;
    }

    public void pageLoad() {
        debugContent='';
    }
}