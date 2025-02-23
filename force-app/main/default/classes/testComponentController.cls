public class testComponentController {
public String selectedValue {
get;
set {
testComponent= (value != null);
// Side effect here - don't do this!
selectedValue = value;
}
}
public Boolean testComponent {get; private set;}
}