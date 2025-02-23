public class myTrainingDetailController_v2 {

    public string getObjName() {
       return  ApexPages.currentPage().getParameters().get('objName');
    }
    
    public string getrcid() {
       string sQuery='select id from '+ApexPages.currentPage().getParameters().get('objName')+' order by id limit 1';
       return  (string)Database.query(sQuery).id;
    }    

}