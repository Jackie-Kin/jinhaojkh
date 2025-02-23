public class myTrainingDetail_v2 {

    public String objName { 
    get
    {
       return ApexPages.currentPage().getParameters().get('objname');
    }
     set; }
}