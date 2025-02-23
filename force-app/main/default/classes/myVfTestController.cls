public class myVfTestController{

    public List<string> msg{get;set;}

    public myVfTestController(){
        msg= new List<string>();
        msg.add('myVfTestController');
    }
    
    public void pageLoad(){
        msg.add('pageLoad');
    }
    
    public void bb(){
        msg= new List<string>();
        msg.add('button click!');
    }

}