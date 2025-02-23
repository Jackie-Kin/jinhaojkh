public class MyTrainingDetailController_Edit { 
    
   public string pRecId{get;set;}
   public string pObjName{get;set;}
   public string pEditMode{get;set;}
    
    public MyTrainingDetailController_Edit()
    {
        pObjName='';
        pRecId='';
        pEditMode='';
    }

    public class objFieldEntity {
        public String objLabel{get; set;}
        public String objName{get; set;}
    }
    
	public List<objFieldEntity> objFields{get;set;}
	public Sobject objRec{get;set;}    

    public string msg{get;set;}

    public void pageload() {
        integer iCnt=0;
        pObjName=ApexPages.currentPage().getParameters().get('objName');
        pRecId=ApexPages.currentPage().getParameters().get('recId');
        pEditMode=ApexPages.currentPage().getParameters().get('editmode');
        objFields=new List<objFieldEntity>();
        
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
        strQuerySql+=' WHERE ID= \''+ pRecId+'\''; 
        SObject objs=  Database.query(strQuerySql);
        
		//新規モード
		if (pEditMode=='1')
        {    
            objs.clear();
            objRec= objs;     
        }   
        
        //コピー新規モード
		if (pEditMode=='2')
        {        
            objRec =objs;  
        }        
        
        //編集モード
		if (pEditMode=='3')
        {        
			objRec=objs;			           
        }        
        
        for (String key : mfields.keySet()) {
            setSObjects(mfields, key);
        }           
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
    
    public pagereference SaveRec(){  

        //新規モード
		if (pEditMode=='1')
        {        
            insert objRec;            
            msg='Insert complete!';            
        }   
        
        //コピー新規モード
		if (pEditMode=='2')
        {
           	Sobject obs =objRec.clone();
           // for (sobjectfield sob : objRec)
            //{
                //obs.put(sob.);
            //}
            
            insert obs;            
            msg='Insertnew complete!';            
        }        
        
        //編集モード
		if (pEditMode=='3')
        {                  
            upsert objRec;            
            msg='update complete!';            
        }

        string url='/apex/myTrainingDetail?objname='+pObjName+'&recid='+pRecId;
        return new pagereference(url);
    }    
    
    public pagereference Cancel(){
        string url='/apex/myTrainingDetail?objname='+pObjName+'&recid='+pRecId;
        return new pagereference(url);
    }
     
    
}// end of class