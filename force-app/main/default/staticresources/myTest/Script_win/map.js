function setShop(shopX, shopY, textX, textY, textString, lineRotate, lineLength, color, cdTenpo){

	var $myClone;
	var direction = "right";

    // 2017/09/28 add start
	var text_ary;
	if (textString.match(/\n/)) {
	    text_ary = textString.split("\n");

	}
    // 2017/09/28 add end

	if(lineRotate > 90 && lineRotate < 270){
		direction="left";
		$myClone = $("#map-template .map-arrow-left").clone();
		$myClone.children(".text").css("left","");
		$myClone.children(".text").css("right",textX + "px");
		$myClone.css("right",shopX+"px");
		$myClone.css("top",shopY+"px");
		$myClone.children(".line").css("transform","rotate("+ (lineRotate-180) +"deg)");
	}else{
		direction = "right";
		$myClone = $("#map-template .map-arrow").clone();
		$myClone.children(".text").css("right","");
		$myClone.children(".text").css("left",textX + "px");
		$myClone.css("left",shopX+"px");
		$myClone.css("top",shopY+"px");
		$myClone.children(".line").css("transform","rotate("+lineRotate+"deg)");
	}

    // 2017/09/28 mod start
    //$myClone.children(".text").css("top", textY);
	//$myClone.children(".text").text(textString);
	if (text_ary == null) {
	    $myClone.children(".text").css("top", textY);
	    str1 = "<div class='selectable'>" + textString + "</div>";
	    $myClone.children(".text").html(str1);

	} else {
	    $myClone.children(".text").css("top", textY);
	    var str2;
	    str2 = "";
	    str2 = str2 + "<div class='selectable'>" + text_ary[0];
	    str2 = str2 + "<div style='text-align: center; line-height: 30px; padding-right: 10px; padding-left: 10px; border-bottom-color: rgb(204, 204, 204); border-bottom-width: 1px; border-bottom-style: solid; pointer-events:auto;'>" + text_ary[1] + "</div></div>";
	    $myClone.children(".text").html(str2);
	    $myClone.children(".text").css("display", "block");
	}
    // 2017/09/28 mod start

	$myClone.children(".line").css("width",lineLength);
	$myClone.children(".image").children("img").attr("src", "../IMG/map_icon_" + color + ".png");
	$myClone.children(".image").children("img").attr("id", "mapIcon_" + cdTenpo);
	$myClone.children(".arrow").css("display","none");

	$myClone.css("display", "block");
	$myClone.prependTo("#map");

    // 2017/09/28 add start
    /*�n�}��̑I��\������*/
    /*�e�L�X�g�������N���b�N�����Ƃ�*/
	$myClone.children(".text").click(
		function () {
		    // click�C�x���g�Ŕ������鏈��
		    $("div").removeClass("selectBox");
		    $("span").removeClass("selectBox");
		    $(this).addClass("selectBox");
		}
	);
    ///*�A�C�R���������N���b�N�����Ƃ�*/
	$myClone.children(".image").click(
		function () {
		    $("div").removeClass("selectBox");
		    // �I�����ꂽ�X�܂�div���擾
		    $map_arrow = $(this).parent();

		    $(".map_arrow div.text").removeClass("selectBox");
		    $map_arrow.find(".selectable").addClass("selectBox");
		}
	);
    // 2017/09/28 add end
    
    // �X�܃A�C�R���܂��͓X�ܖ��N���b�N�ł��̓X�܂̏��ɐ؂�ւ���
	$myClone.children(".image,.text").click(
		function () {
            // �I�����ꂽ�X�܂�div���擾
		    $map_arrow = $(this).parent();

            // �E��������CSS�ݒ�
			$(".map-arrow").css("z-index","10");
			$(".map-arrow").css("pointer-events", "");
			$(".map-arrow .arrow").css("display", "none");
		    /* 2017/06/15 mod start �{���Ǘ��e�X�g�ۑ�No.9 �E���́uHOT���v�Ȃǂ̕����T�C�Y�Ɠ���(17pt��) */
		    // $(".map-arrow .text").css("font-size", "16px");
			$(".map-arrow .text").css("font-size", "17pt");
		    /* 2017/06/15 mod end �{���Ǘ��e�X�g�ۑ�No.9 �E���́uHOT���v�Ȃǂ̕����T�C�Y�Ɠ���(17pt��) */
			$(".map-arrow .text").css("font-weight", "normal");

            // ����������CSS�ݒ�
			$(".map-arrow-left").css("z-index", "10");
			$(".map-arrow-left").css("pointer-events","");
			$(".map-arrow-left .arrow").css("display","none");
		    /* 2017/06/15 mod start �{���Ǘ��e�X�g�ۑ�No.9 �E���́uHOT���v�Ȃǂ̕����T�C�Y�Ɠ���(17pt��) */
			//$(".map-arrow-left .text").css("font-size", "16px");
			$(".map-arrow-left .text").css("font-size", "17pt");
		    /* 2017/06/15 mod end �{���Ǘ��e�X�g�ۑ�No.9 �E���́uHOT���v�Ȃǂ̕����T�C�Y�Ɠ���(17pt��) */
			$(".map-arrow-left .text").css("font-weight", "normal");

		    // �I�����ꂽ�X�܂�CSS�ݒ�
			$map_arrow.css("z-index", "20");
			$map_arrow.css("pointer-events", "none");
			$map_arrow.children(".arrow").css("display", "block");
		    /* 2017/06/15 mod start �{���Ǘ��e�X�g�ۑ�No.9 �E���́uHOT���v�Ȃǂ̕����T�C�Y�Ɠ���(17pt��) */
			//$map_arrow.children(".text").css("font-size", "24px");
			$map_arrow.children(".text").css("font-size", "17pt");
		    /* 2017/06/15 mod end �{���Ǘ��e�X�g�ۑ�No.9 �E���́uHOT���v�Ȃǂ̕����T�C�Y�Ɠ���(17pt��) */
			$map_arrow.children(".text").css("font-weight", "bold");

            // �I�����ꂽ�X�܂�ID���擾���A��ʂɏ��\��
			var id = $map_arrow.children(".image").children("img").attr("id");
			var tenpoCd = id.replace("mapIcon_", "");
			dispData(tenpoCd);
		}
	);
}
