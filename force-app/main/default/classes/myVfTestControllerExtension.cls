public class myVfTestControllerExtension {

    public myVfTestControllerExtension(ApexPages.StandardController controller) {

    }


    public myVfTestControllerExtension() {

    }
    

    public Component.Apex.SectionHeader getHeaderWithDueDateCheck() {
        date dueDate = date.newInstance(2011, 7, 4);
        boolean overdue = date.today().daysBetween(dueDate) < 0;
        
        Component.Apex.SectionHeader sectionHeader = new Component.Apex.SectionHeader();
        if (overdue) {
            sectionHeader.title = 'This Form Was Due On ' + dueDate.format() + '!';
            return sectionHeader;
        }
        else{
            sectionHeader.title = 'Form Submission';
            return sectionHeader;
        }
    }
}