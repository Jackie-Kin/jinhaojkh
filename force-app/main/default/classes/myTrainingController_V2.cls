public class myTrainingController_V2 {
    
    public List<string> msg{get;set;}    
    public string searchKey{get;set;}
    Public Integer selIndex{get;set;}     
    public List<SelectOption> items{get;set;}
    public boolean isCustom{get;set;}

    //分页参数
    Public Integer size{get;set;} 
    Public Integer noOfRecords{get; set;} 
    public List<SelectOption> paginationSizeOptions{get;set;}    
         
    public myTrainingController_V2(){
        msg=new list<string>();    
        size=10;
        
        paginationSizeOptions = new List<SelectOption>();
        paginationSizeOptions.add(new SelectOption('5','5'));
        paginationSizeOptions.add(new SelectOption('10','10'));
        paginationSizeOptions.add(new SelectOption('20','20'));
        paginationSizeOptions.add(new SelectOption('50','50'));
        paginationSizeOptions.add(new SelectOption('100','100'));
        
        List<SelectOption> options = new List<SelectOption>();
        options.add(new SelectOption('1','含む'));
        options.add(new SelectOption('2','前方一致'));
        options.add(new SelectOption('3','後方一致'));
        options.add(new SelectOption('4','全部一致')); 
        items=options;        
    }  

    // Initialize setCon and return a list of record    
    public List<mySObject__c> MyObjects {
        get{
           return (List<mySObject__c>) setCon.getRecords(); 
        }
         set;
    }    
    
    public ApexPages.StandardSetController setCon {
        get {
            if(setCon == null) {   
                List<mySObject__c> obs= [SELECT Name,objName__c,objLabel__c,objIsCustom__c  FROM mySObject__c];  
                obs.sort();
                setCon = new ApexPages.StandardSetController(obs); 
                setCon.setPageSize(size);
                noOfRecords = setCon.getResultSize();
            }            
            return setCon;
        }
        set;
    }
    
    //Changes the size of pagination
    public PageReference refreshPageSize() {
         setCon.setPageSize(size);
         return null;
    }    

    public void pageload() {   
        //Delete all data from customize object
        mySObject__c[] myObjectInfo = [SELECT Id FROM mySObject__c];
        if (myObjectInfo.size()>0) delete myObjectInfo;
        
        //Construct data for  customize object 
         Map<String, SObjectType> types = Schema.getGlobalDescribe();
         List<mySObject__c>  myObjectList= new List<mySObject__c>();
                        
        for (String key : types.keySet()) {
           string sLabel=(String) types.get(key).getDescribe().getLabel();   
           boolean bIsCustom=(boolean)types.get(key).getDescribe().isCustom();
            
           mySObject__c ob = new mySObject__c(Name=key,objLabel__c= sLabel,objName__c=key,
                                             objIsCustom__c=bIsCustom);                  
           myObjectList.add(ob);
        }
              
        insert myObjectList;
     
        isCustom = false;
        
        msg.add('pageload');
    }      
    
    public void Search(){
        string sQuery='';
         List<mySObject__c> obs =new  List<mySObject__c>(); 
        
        msg.add('Search');
        
        if (selIndex==1) //含む
        {
            sQuery = 'SELECT Name,objName__c,objLabel__c,objIsCustom__c FROM mySObject__c Where objName__c like \'%'+searchKey+'%\'';
        }
        else if (selIndex==2) //前方一致
        {
            sQuery = 'SELECT Name,objName__c,objLabel__c,objIsCustom__c FROM mySObject__c Where objName__c like \''+searchKey+'%\'';
        }
        else if (selIndex==3) //後方一致
        {
            sQuery = 'SELECT Name,objName__c,objLabel__c,objIsCustom__c FROM mySObject__c Where objName__c like \'%'+searchKey+'\'';
        }
                else //全部一致
        {
            sQuery = 'SELECT Name,objName__c,objLabel__c,objIsCustom__c FROM mySObject__c Where objName__c =\''+searchKey+'\'';
        }
        
        if(isCustom==true)
        {
            sQuery += 'and objIsCustom__c=true';
        }
        else
        {
            sQuery += 'and objIsCustom__c=false';
        }
 
        obs= database.query(sQuery);
            
        obs.sort();
        setCon = new ApexPages.StandardSetController(obs); 
        setCon.setPageSize(size);
        noOfRecords = setCon.getResultSize();          
    }    
}