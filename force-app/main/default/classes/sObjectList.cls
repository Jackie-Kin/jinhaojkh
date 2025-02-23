public class sObjectList {
    public ApexPages.StandardSetController contag {get; set;}
    public ApexPages.StandardSetController con {
        get {
            if(contag == null) {
                system.debug('zzzzzzzzzzzzzzz con');
                Map<String, SObjectType> types = Schema.getGlobalDescribe();
                mySObject__c[] myObjectInfo = [SELECT Id FROM mySObject__c]; 
                delete myObjectInfo;
                List<mySObject__c> myObjectList = new List<mySObject__c>();
                for (String key : types.keySet()) {
                    String objlabel = (String)types.get(key).getDescribe().getLabel();
                    boolean objIsCustom = (boolean)types.get(key).getDescribe().isCustom();
                    mySObject__c myObject = new mySObject__c(objName__c=key, objLabel__c=objlabel, objIsCustom__c=objIsCustom);
                    myObjectList.add(myObject);
                }
                insert myObjectList; 
                myObjectList = [SELECT objName__c,objLabel__c,objIsCustom__c  FROM mySObject__c]; 
                contag = new ApexPages.StandardSetController(myObjectList);
                contag.setPageSize(20);
            }
            return contag;
        }
        set;
    }
    
    class Obj {
        public String objName {get; set;}
        
        public String objlabel {get; set;}
        
        public boolean objIsCustom {get; set;}
       
    }
    
    public List<mySObject__c> targets {
        get {
           /* List<Obj> tmp = new List<Obj>();
            for(mySObject__c sobj : (List<mySObject__c>)con.getRecords()){
                Obj obj = new Obj();
                obj.objName = sobj.objName__c;
                obj.objlabel = sobj.objLabel__c;
                obj.objIsCustom = sobj.objIsCustom__c;
                tmp.add(obj);
            }   
            return tmp;*/
            return (List<mySObject__c>)con.getRecords();
    	} 
        set;}
    public Boolean hasPrevious {
        get {
            return contag.getHasPrevious();
        }
        set;
    }
    public Boolean hasNext {
        get {
            return contag.getHasNext();
        }
        set;
    }
    public Integer pageNumber {
        get {
            return contag.getPageNumber();
        }
        set;
    }
    public void first() {
        contag.first();
    }
    public void previous() {
        contag.previous();
    }
    public void next() {
        contag.next();
    }
    public void last() {
        contag.last();
    }
    public String objKey {get; set;}

    public Boolean custom  {get; set;}
    
    public String seleled {get; set;}
    
    public void pageload() {
        targets = new List<mySObject__c>();
    }
    
    public void search() {
        targets = new List<mySObject__c>();
        String queryString;
        List<mySObject__c> objList;
        String customJonken = '';
        if (seleled == '1') {
            queryString = 'SELECT Id,objName__c,objLabel__c,objIsCustom__c FROM mySObject__c Where objName__c like \'%'+objKey+'%\'';
        } else if(seleled == '2') {
            queryString = 'SELECT Id,objName__c,objLabel__c,objIsCustom__c FROM mySObject__c Where objName__c like \''+objKey+'%\'';
        } else if(seleled == '3') {
            queryString = 'SELECT Id,objName__c,objLabel__c,objIsCustom__c FROM mySObject__c Where objName__c like \'%'+objKey+'\''; 
        } else if(seleled == '4') {
            queryString = 'SELECT Id,objName__c,objLabel__c,objIsCustom__c FROM mySObject__c Where objName__c =\''+objKey+'\'';
        }
        if (custom) {
            queryString = queryString +' and objIsCustom__c = true';
        } else {
            queryString = queryString +' and objIsCustom__c = false';
        }
        objList = Database.query(queryString);
        contag = new ApexPages.StandardSetController(objList);  
        contag.setPageSize(20); 
    }
    
    public List<SelectOption> getItems() {
		List<SelectOption> options = new List<SelectOption>();
        options.add(new SelectOption('1','含む'));
		options.add(new SelectOption('2','前方一致'));
		options.add(new SelectOption('3','後方一致'));		
        options.add(new SelectOption('4','全部一致'));
		return options;
	}
    
    private void setTargets(Map<String, SObjectType> types,String key) {
           mySObject__c obj = new mySObject__c();
           obj.objName__c = key;
           obj.objLabel__c = (String)types.get(key).getDescribe().getLabel();
           obj.objIsCustom__c = (boolean)types.get(key).getDescribe().isCustom();
           targets.add(obj);      
    }

    
}