function SetNowLoading() {

            //�|�b�v�A�b�v����ʒ����ʒu�ɂȂ�悤�A�c���̃}�[�W�����Z�o
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
                  // 2019/06/28 del start SG90140�͗Z���ŊJ���̑ΏۊO�ׁ̈A�폜
                  // } else if ($(this).attr("id") == "ctl00_txtSearchName_SG90140_1") {
                  // } else if ($(this).attr("id") == "ctl00_txtSearchName_SG90140_2") {
                  // 2019/06/28 del end SG90140�͗Z���ŊJ���̑ΏۊO�ׁ̈A�폜
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

                  //�|�b�v�A�b�v�ɂ�Loading������
                  if ($(this).attr("class") == "mybox") {
                      $(".loadingWrap").show();
                      $(".loadingImage").show();
                  }

                  // 2019/06/28 del start SG10020�͗Z���ŊJ���̑ΏۊO�ׁ̈A�폜
                  // // 2015/9/23 add start
                  // // �ڋq���X�g��onclick���Ƃ�Ȃ��̂ŁA�����Ŕ���
                  // // ������2�d�N���̏ꍇ�͏������Ȃ�
                  // if ($(this).attr("id") == "klist" && window.location.href.indexOf("SG10020?type=99") < 0) {
                  //     $(".loadingWrap").show();
                  //     $(".loadingImage").show();
                  // }
                  // // 2015/9/23 add end
                  // 2019/06/28 del end SG10020�͗Z���ŊJ���̑ΏۊO�ׁ̈A�폜

                  // �ʒm�̏ꍇ�̓��[�f�B���O�A�C�R�����\���ɂ���
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

                  //�|�b�v�A�b�v�̏ꍇ�͐e��ʂ�Loading������
                  // 2019/06/28 mod start �S���ł�SG80,SG90���t��ID�ɑ΂��Đ؂�ւ��Z���Ńy�[�W���ɏC��
                  // if (path.indexOf("SG90") != -1 || path.indexOf("SG80") != -1) {
                  if (path.indexOf("T_P_NokiCsMinyuKingaku") != -1 || path.indexOf("T_P_HyojiTaisho") != -1 || path.indexOf("T_P_ShiborikomiJoken") != -1) {
                  // 2019/06/28 mod end �S���ł�SG80,SG90���t��ID�ɑ΂��Đ؂�ւ��Z����ID�ɏC��
                      $(".loadingWrap", parent.window.document).hide();
                      $(".loadingImage", parent.window.document).hide();
                  }
              });

}