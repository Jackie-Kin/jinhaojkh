public with sharing class t_lifecycle {
    private final Account acct;
    Integer EmpAdd;

    public t_lifecycle(t_myController controller) {
        this.acct = (Account) controller.getAccount();
        system.debug('t_lifecycle:construct:t_lifecycle');
    }

    public String getGreeting() {
        system.debug('t_lifecycle:pro:getGreeting');        
    return acct.name + ' Current Information';
    }

    public void resetEmp() {
        system.debug('t_lifecycle:func:resetEmp');
        acct.numberofemployees = 10;
        update acct;
    }
}