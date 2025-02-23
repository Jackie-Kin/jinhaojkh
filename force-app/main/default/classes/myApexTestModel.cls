public class myApexTestModel{
    private static integer StaticMember;
    private integer NonStaticMember;
    // The following produces a system error
    // public static integer MyBadStaticProp { return NonStaticMember; }
    public static integer MyGoodStaticProp {
    get {return StaticMember;}
    set { StaticMember = value; }
    }
    public integer MyGoodNonStaticProp {
    get {return NonStaticMember;}
    set { NonStaticMember = value; }
    }
    
}