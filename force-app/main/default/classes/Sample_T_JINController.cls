global class Sample_T_JINController{
    String q =
      'SELECT Description__c FROM Invoice_Statement__c WHERE isDeleted=false LIMIT 10';
    String e = 'Invoice_Statement__c';
    String f = 'Description__c';
    String v = 'Updated description';
    
    public Sample_T_JINController() {
        //Id batchInstanceId =Database.executeBatch(new SCJhSessionModel(q,e,f,v), 5);
        
//         List<Map<String, Object>> Dn = null;
//         
//         for(integer i=1;i<=1000;i++){
//             String strHanbai='43401';
//             String strKaisya='01';
//             String strCyumonNO='1';
//             String strCyumonedNO='1';
//             Dn=SG30020Logic.getInstance().getNoukiCSTosyoNousya(strHanbai, strKaisya, strCyumonNO, strCyumonedNO);      
//         }
    }           
}