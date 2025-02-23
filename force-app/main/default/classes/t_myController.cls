public with sharing class t_myController {
    private final Account account;

    public t_myController() {
        account = [select id, name, site, NumberOfEmployees, Industry from Account
        where id = :ApexPages.currentPage().getParameters().get('id')];
        system.debug('t_myController:construct:t_myController');
    }

    public Account getAccount() {
        system.debug('t_myController:pro:getAccount');
        return account;
    }

    public PageReference save() {
        system.debug('t_myController:action:save');
        update account;
        return null;
    }

    public PageReference cancel() {
        system.debug('t_myController:pagereference:cancel');
        return null;
    }
}