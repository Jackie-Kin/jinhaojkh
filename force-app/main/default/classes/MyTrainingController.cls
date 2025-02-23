public class MyTrainingController {
    class objEntity {
        public String objId
        {get; set;}
        
        public String objName
        {get; set;}
        
        public String objLabel
        {get; set;}
        
        public boolean objIsCustom
        {get; set;}
    }

    public List<objEntity> sMyObjects
    {get;set;}
    
    public String objKey
    {get; set;}
    
    public String selected = '';

    public String getSelected() {
        return selected;
    }

    public void setSelected(String selected) {
        this.selected = selected;
    }

    public boolean checked
    {get;set;}

	//分页参数
    Public Integer size{get;set;} 
    Public Integer noOfRecords{get; set;} 
    public List<SelectOption> paginationSizeOptions{get;set;}
         
    public MyTrainingController(){
        size=10;
        paginationSizeOptions = new List<SelectOption>();
        paginationSizeOptions.add(new SelectOption('5','5'));
        paginationSizeOptions.add(new SelectOption('10','10'));
        paginationSizeOptions.add(new SelectOption('20','20'));
        paginationSizeOptions.add(new SelectOption('50','50'));
        paginationSizeOptions.add(new SelectOption('100','100'));
    }  
    
    public ApexPages.StandardSetController setCon {
        get {
            if(setCon == null) {                
                setCon = new ApexPages.StandardSetController(Database.getQueryLocator(
                      [select id,Name,AccountId,Account.name,Amount,StageName,CloseDate,LastModifiedDate from Opportunity]));
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
 
    // Initialize setCon and return a list of record    
     
    public List<SObject> getMyObjects() {
         return (List<SObject>) setCon.getRecords();
    }    

    public void pageload() {

        checked = false;
    }
    
    public void search() {
        sMyObjects = new List<objEntity>();
        Map<String, SObjectType> types = Schema.getGlobalDescribe();
        for (String key : types.keySet()) {
            if (selected == '1') {
                if (key.indexOfIgnoreCase(objKey) != -1) {
                    if (types.get(key).getDescribe().isCustom() == checked) {
                        setSObjects(types, key);
                    }
                }
            } else if (selected == '2') {
                if (key.startsWithIgnoreCase(objKey)) {
                    if (types.get(key).getDescribe().isCustom() == checked) {
                        setSObjects(types, key);
                    }
                }
            } else if (selected == '3') {
                if (key.endsWithIgnoreCase(objKey)) {
                    if (types.get(key).getDescribe().isCustom() == checked) {
                        setSObjects(types, key);
                    }
                }
            } else if (selected == '4') {
                if (key.equalsIgnoreCase(objKey)) {
                    if (types.get(key).getDescribe().isCustom() == checked) {
                        setSObjects(types, key);
                    }
                }
            }
        }
    }

    public List<SelectOption> getItems() {
        List<SelectOption> options = new List<SelectOption>();
        options.add(new SelectOption('1','含む'));
        options.add(new SelectOption('2','前方一致'));
        options.add(new SelectOption('3','後方一致'));
        options.add(new SelectOption('4','全部一致'));
        return options;
        }
    
    private void setSObjects(Map<String, SObjectType> types, String key) {
        objEntity obj = new objEntity();
        obj.objName = key;
        //obj.objId=(String) types.get(key).getDescribe().getId();
        obj.objLabel = (String) types.get(key).getDescribe().getLabel();
        obj.objIsCustom = (boolean) types.get(key).getDescribe().isCustom();
        sMyObjects.add(obj);
    }
}