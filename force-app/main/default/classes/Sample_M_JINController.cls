global with sharing class Sample_M_JINController {

    //スクロール終わりにて再取得処理のため必要
    public static String lblprePageV 
    {
        get{
            lblprePageV='1';
            return lblprePageV;
        }
        set;
    }
    
    //ページ数を設定必要　現在は100件単位としている
    public static String lblnextPageV {
        get {
            if (lblnextPageV == null) {
                lblnextPageV = '';
            }
            return lblnextPageV;
        }
        set;
    }    
    
    public static String lblmaxPage {
        get {
            if (lblmaxPage == null) {
                lblmaxPage = '';
            }
            return lblmaxPage;
        }
        set;
    }  
    
    public static String lblscrollVT {
        get {
            if (lblscrollVT == null) {
                lblscrollVT = '';
            }
            return lblscrollVT;
        }
        set;
    }  
    
    public static String lblscrollVB {
        get {
            if (lblscrollVB == null) {
                lblscrollVB = '';
            }
            return lblscrollVB;
        }
        set;
    }  
    
    public static String lblscrollType {
        get {
            if (lblscrollType == null) {
                lblscrollType = '';
            }
            return lblscrollType;
        }
        set;
    }  
    
    public static String lblcurScrollTop {
        get {
            if (lblcurScrollTop == null) {
                lblcurScrollTop = '';
            }
            return lblcurScrollTop;
        }
        set;
    }  
    
    public static String lblcurSelRow {
        get {
            if (lblcurSelRow == null) {
                lblcurSelRow = '';
            }
            return lblcurSelRow;
        }
        set;
    }    
    
    public static String lblnext 
    {
        get{
            lblnext='20';
            return lblnext;
        }
        set;
    }
    
    public static String lblprev 
    {
        get{
            lblprev='1';
            return lblprev;
        }
        set;
    }
    
    public static String lblmax {
        get {
            if (lblmax == null) {
                lblmax = '';
            }
            return lblmax;
        }
        set;
    }   
    
    public static String lblscrollTop {
        get {
            if (lblscrollTop == null) {
                lblscrollTop = '';
            }
            return lblscrollTop;
        }
        set;
    }   
    
    public static String lbldaigaeTitle {
        get {
            if (lbldaigaeTitle == null) {
                lbldaigaeTitle = '';
            }
            return lbldaigaeTitle;
        }
        set;
    }   
    
    public static String lblhdnKbTrial {
        get {
            if (lblhdnKbTrial == null) {
                lblhdnKbTrial = '';
            }
            return lblhdnKbTrial;
        }
        set;
    }  
    
    public static String lblhdnTrialOkyakuSearchUrl {
        get {
            if (lblhdnTrialOkyakuSearchUrl == null) {
                lblhdnTrialOkyakuSearchUrl = '';
            }
            return lblhdnTrialOkyakuSearchUrl;
        }
        set;
    }  
    
    public static String lblhdnTrialOkyakuSearchUrlQuery {
        get {
            if (lblhdnTrialOkyakuSearchUrlQuery == null) {
                lblhdnTrialOkyakuSearchUrlQuery = '';
            }
            return lblhdnTrialOkyakuSearchUrlQuery;
        }
        set;
    }  
    
    public static String lblhdnTrialUrl {
        get {
            if (lblhdnTrialUrl == null) {
                lblhdnTrialUrl = '';
            }
            return lblhdnTrialUrl;
        }
        set;
    }  
    
    public static String lblhdnPopupKbn {
        get {
            if (lblhdnPopupKbn == null) {
                lblhdnPopupKbn = '';
            }
            return lblhdnPopupKbn;
        }
        set;
    }  
    
    public static String lblhdnDataCdStaff {
        get {
            if (lblhdnDataCdStaff == null) {
                lblhdnDataCdStaff = '';
            }
            return lblhdnDataCdStaff;
        }
        set;
    }  
    
    public static String lblhdnDataKjStaffMei {
        get {
            if (lblhdnDataKjStaffMei == null) {
                lblhdnDataKjStaffMei = '';
            }
            return lblhdnDataKjStaffMei;
        }
        set;
    }  
    
    public static String lblhdnSplitChar {
        get {
            if (lblhdnSplitChar == null) {
                lblhdnSplitChar = '';
            }
            return lblhdnSplitChar;
        }
        set;
    }  
    
    public static String lblhdnCdStaff {
        get {
            if (lblhdnCdStaff == null) {
                lblhdnCdStaff = '';
            }
            return lblhdnCdStaff;
        }
        set;
    }  
    

    public void pageLoad(){
        
    }
}