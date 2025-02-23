public class t_componentController {
    public String selectedValue
        {get;
         set {
            editMode = (value != null);
            // Side effect here - don't do this!
            selectedValue = value;
             system.debug('t_componentController:Pro:selectedValue');
            }
    }
    public Boolean editMode{get; private set;}
}