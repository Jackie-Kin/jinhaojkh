public with sharing class testExtension {
private final Account acct;
Integer EmpAdd;
public testExtension (testController controller) {
this.acct = (Account)controller.getAccount();
}
public String getGreeting() {
return acct.name + ' Current Information';
}
public void resetEmp() {
acct.numberofemployees = 10;
update acct;
}
}