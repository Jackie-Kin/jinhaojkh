function SetNowLoading() {

            //ポップアップを画面中央位置になるよう、縦横のマージンを算出
            //var leftmargin = ($(".loadingImage").width() / 2) * -1;
            //var topmargin = ($(".loadingImage").height() / 2) * -1;

            //$(".loadingImage")
            // .css({
            // "position": "absolute",
            // "top": "50%",
            // "left": "50%",
            // "display": "block",
            // "overflow": "hidden",
            // "margin-left": leftmargin,
            // "margin-top": topmargin,
            // "border-radius": "20px"
    // });
 
             

              $("select").change(function () {

                   $(".loadingWrap").show();
                   $(".loadingImage").show();
               });

              $("button").click(function () {

                  if ($(this).attr("id") == "btnLogout") {

                  } else if ($(this).attr("id") == "btnIeClose") {

                  }else{

                      $(".loadingWrap").show();
                      $(".loadingImage").show();
                  }
              });

              $("Input").click(function () {

                  if ($(this).attr("id") == "btnLogout") {

                  } else if ($(this).attr("id") == "btnIeClose") {
                  } else if ($(this).attr("id") == "txtCode") {
                  } else if ($(this).attr("id") == "txtHanbaitn") {
                  } else if ($(this).attr("id") == "txtPassword") {
                  // 2019/06/28 del start SG90140は融合版開発の対象外の為、削除
                  // } else if ($(this).attr("id") == "ctl00_txtSearchName_SG90140_1") {
                  // } else if ($(this).attr("id") == "ctl00_txtSearchName_SG90140_2") {
                  // 2019/06/28 del end SG90140は融合版開発の対象外の為、削除
                  } else if ($(this).attr("id") == "chkBoxCookie") {
                  } else {

                      $(".loadingWrap").show();
                      $(".loadingImage").show();
                  }
              });

              $("div").click(function () {


                  if ($(this).hasClass("mybox")) {

                      $(".loadingWrap").show();
                      $(".loadingImage").show();
                  }

              });

             

              $("img").click(function () {

                  if ($(this).attr("onclick") == undefined) {

                      return;
                  }

                  if ($(this).attr("onclick").indexOf("apex") ==-1) {

                      return;
                  }

                if ($(this).attr("onclick") != "") {

                      $(".loadingWrap").show();
                      $(".loadingImage").show();
                  }
              });

              $("span").click(function () {

                  if ($("#ctl00_alertflag").val() == '1') {
                      return;
                  }

                  if ($("#ctl00_alertflag", parent.document).val() == '1') {
                      return;
                  }

                  //ポップアップにもLoadingを入れる
                  if ($(this).attr("class") == "mybox") {
                      $(".loadingWrap").show();
                      $(".loadingImage").show();
                  }

                  // 2019/06/28 del start SG10020は融合版開発の対象外の為、削除
                  // // 2015/9/23 add start
                  // // 顧客リストはonclickがとれないので、ここで判定
                  // // ただし2重起動の場合は処理しない
                  // if ($(this).attr("id") == "klist" && window.location.href.indexOf("SG10020?type=99") < 0) {
                  //     $(".loadingWrap").show();
                  //     $(".loadingImage").show();
                  // }
                  // // 2015/9/23 add end
                  // 2019/06/28 del end SG10020は融合版開発の対象外の為、削除

                  // 通知の場合はローディングアイコンを非表示にする
                  if ($(this).attr("id") == "tlist") {
                      $(".loadingWrap").hide();
                      $(".loadingImage").hide();
                  }  

                  if ($(this).attr("onclick") == undefined) {

                      return;
                  }

                  if ($(this).attr("onclick").indexOf("apex") == -1) {

                      return;
                  }
               
                  if ($(this).attr("onclick") != "") {
                      $(".loadingWrap").show();
                      $(".loadingImage").show();

                  }
                     
                
              });

              $(window).load(function () {

                  $(".loadingWrap").hide();
                  $(".loadingImage").hide();

                  var path = location.pathname

                  //ポップアップの場合は親画面のLoadingを消す
                  // 2019/06/28 mod start 全国版でSG80,SG90が付くIDに対して切り替わる融合版ページ名に修正
                  // if (path.indexOf("SG90") != -1 || path.indexOf("SG80") != -1) {
                  if (path.indexOf("T_P_NokiCsMinyuKingaku") != -1 || path.indexOf("T_P_HyojiTaisho") != -1 || path.indexOf("T_P_ShiborikomiJoken") != -1) {
                  // 2019/06/28 mod end 全国版でSG80,SG90が付くIDに対して切り替わる融合版IDに修正
                      $(".loadingWrap", parent.window.document).hide();
                      $(".loadingImage", parent.window.document).hide();
                  }
              });

}