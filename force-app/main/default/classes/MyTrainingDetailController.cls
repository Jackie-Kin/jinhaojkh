public class MyTrainingDetailController { 
    
    public string pObjName{get;set;}
    public string pRecId{get;set;}  
    public string recId{get;set;}
    
    public List<SObject> objRecords{
        get
        {
            return (List<SObject>) setCon.getRecords(); 
        }
        set;}
    
    public MyTrainingDetailController()
    {
        pObjName='';
        pRecId=''; 
        recId='';
        msg='';
    }
    
    public List<Sobject> conRecords{get;set;}
    
    public List<objFieldEntity> objFields{get;set;}       
        
    public class objFieldEntity {
        public String objLabel{get; set;}
        public String objName{get; set;}
    }

    public string msg{get;set;}

    public void pageload() {

        conRecords=new  List<SObject>();
        objFields=new List<objFieldEntity> ();
        pObjName=ApexPages.currentPage().getParameters().get('objName');
        pRecId=ApexPages.currentPage().getParameters().get('recid');
        
        RefreshData(); 
        
        msg+='my:'+'pageload';
         
    } //end of pageload   
    
    private void setSObjects(Map<String, Schema.SObjectField> mFields, String key) {
        if (mFields.get(key).getDescribe().getType()==Schema.DisplayType.address)
        {
            return;            
        }
        objFieldEntity obj = new objFieldEntity();
        obj.objName = key;
        obj.objLabel = (String) mFields.get(key).getDescribe().getLabel();
        objFields.add(obj);
    }
    
    public PageReference DeleteObject(){  
        //string sQuery='';    
        //sQuery='select id from ' + pObjName +' Where id=\''+ recId + '\' limit 1';
        //msg=recid;
        //sobject ob = database.query(sQuery);
		//if (ob!=null)delete ob;
		//
		Id delId= recId; 
        Database.delete(delId);
        
        RefreshData();
        string url='/apex/myTrainingDetail?objName='+pObjName;
        PageReference acctPage =new  PageReference(url);
        acctPage.setRedirect(true);
        return acctPage;
    }    
    
    public ApexPages.StandardSetController setCon {
        get {
            if(setCon == null) {   
                setCon = new ApexPages.StandardSetController(conRecords); 
                setCon.setPageSize(1);
            }            
            return setCon;
        }
        set;
    }   
    
    public PageReference EditRecord()
    {        
        //return new PageReference(ulr);
        return null;
    }
    
    private void RefreshData()
    {
        integer iCnt=0;   
        
        //get the object
        schema.sObjectType objectDef =schema.getGlobalDescribe().get(pObjName).getDescribe().getSObjectType();

        //get the field info of the object as map
        Map<String, Schema.SObjectField> mfields= objectDef.getDescribe().fields.getMap();
        
        // construct sql sentence to create object list
        string strQuerySql='SELECT ';
        for (string s: mfields.keySet())
        {
            iCnt=iCnt+1;
            
            SObjectField fieldToken = mfields.get(s);
            DescribeFieldResult selectedField = fieldToken.getDescribe();
            strQuerySql+= selectedField.getName();

            if (iCnt!= mfields.keySet().size())
            {
                strQuerySql+=', ';
            }
        }
        strQuerySql+=' FROM '+ pObjName;   
        if (pRecId!=null)
        {
            strQuerySql+=' WHERE id=\''+ pRecId+'\'';
        }

        conRecords =Database.query(strQuerySql);
        conRecords.sort();
        
        for (String key : mfields.keySet()) {
            setSObjects(mfields, key);
        }        
            
    }
    
}// end of class