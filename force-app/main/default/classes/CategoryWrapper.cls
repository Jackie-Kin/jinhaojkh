public class CategoryWrapper {
public Boolean checked{get;set;}

public Account act{get;set;}

public CategoryWrapper(){
act= new Account ();
checked = false;
}

public CategoryWrapper(Account act){
this.act= act;
checked = false;
}
}