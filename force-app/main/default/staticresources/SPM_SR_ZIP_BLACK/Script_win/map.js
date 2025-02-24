//function setShop(shopX, shopY, textX, textY, textString, color, cdTenpo){
function setShop(shopX, shopY, textX, textY, textString,  color, cdTenpo, staticResourcePath){
// 静的リソースへのパスを引数に追加   2019/02/00 add
	var $myClone;
	var direction = "right";
    
    // 2017/09/28 add start
	var text_ary;
	if (textString.match(/\n/)) {
	    text_ary = textString.split("\n");

	}
    // 2017/09/28 add end


		direction = "right";
		$myClone = $("#map-template .map-arrow").clone();
		$myClone.children(".text").css("right","");
		$myClone.children(".text").css("left",textX + "px");
		$myClone.css("left",shopX+"px");
		$myClone.css("top", shopY + "px");


    // 2017/09/28 mod start
    //$myClone.children(".text").css("top", textY);
	//$myClone.children(".text").text(textString);
	if (text_ary == null) {
		
	    $myClone.children(".text").css("top", textY + "px");
	    str1 = "<div class='selectable'>" + textString + "</div>";
	    $myClone.children(".text").html(str1);

	} else {
	    $myClone.children(".text").css("top", textY + "px");
	    var str2;
	    str2 = "";
	    str2 = str2 + "<div class='selectable'>" + text_ary[0];
	    str2 = str2 + "<div style='text-align: center; line-height: 30px; padding-right: 10px; padding-left: 10px; border-bottom-color: rgb(204, 204, 204); border-bottom-width: 1px; border-bottom-style: solid; pointer-events:auto;'>" + text_ary[1] + "</div></div>";
	    $myClone.children(".text").html(str2);
	    $myClone.children(".text").css("display", "block");
	}
    // 2017/09/28 mod start
    //2018/11/28 add start 70販社地図対応
	var texts = textString.trim();
	var len = texts.length;

    textX = textX - 16;

	if (textX < 0) {
	    var textX2 = 20 * len;
	    textX2 = textX + textX2 + 22;

	    if (textX2 <= 0) {
	        textX = textX2;
	    }
	}

	textY = textY + 11;

	var shopY2 = shopY * -1;
	var textY2 = textY * -1;
	var deg = Math.atan2(textY2, textX);
	deg = deg * 180 / Math.PI * -1;

	var lineLength = textX * textX + textY2 * textY2;
	lineLength = Math.sqrt(lineLength);

    //2018/11/28 add end 70販社地図対応
	$myClone.children(".line").css("transform", "rotate(" + deg + "deg)");
	$myClone.children(".line").css("width",lineLength);
	//$myClone.children(".image").children("img").attr("src", "../IMG/map_icon_" + color + ".png");
    // 静的リソースのパスを使用し画像読み込み    2019/02/00 add
    $myClone.children(".image").children("img").attr("src", staticResourcePath + "map_icon_" + color + ".png");
	$myClone.children(".image").children("img").attr("id", "mapIcon_" + cdTenpo);
	$myClone.children(".arrow").css("display","none");

	$myClone.css("display", "block");
	$myClone.prependTo("#map");

    // 2017/09/28 add start
    /*地図上の選択表示制御*/
    /*テキスト部分をクリックしたとき*/
	$myClone.children(".text").click(
		function () {
		    // clickイベントで発動する処理
		    $("div").removeClass("selectBox");
		    $("span").removeClass("selectBox");
		    $(this).addClass("selectBox");
		}
	);
    ///*アイコン部分をクリックしたとき*/
	$myClone.children(".image").click(
		function () {
		    $("div").removeClass("selectBox");
		    // 選択された店舗のdivを取得
		    $map_arrow = $(this).parent();

		    $(".map_arrow div.text").removeClass("selectBox");
		    $map_arrow.find(".selectable").addClass("selectBox");
		}
	);
    // 2017/09/28 add end
    
    // 店舗アイコンまたは店舗名クリックでその店舗の情報に切り替える
	$myClone.children(".image,.text").click(
		function () {
            // 選択された店舗のdivを取得
		    $map_arrow = $(this).parent();

            // 右向き線のCSS設定
			$(".map-arrow").css("z-index","10");
			$(".map-arrow").css("pointer-events", "");
			$(".map-arrow .arrow").css("display", "none");
		    /* 2017/06/15 mod start 本部管理テスト課題No.9 右側の「HOT数」などの文字サイズと統一(17ptに) */
		    // $(".map-arrow .text").css("font-size", "16px");
			$(".map-arrow .text").css("font-size", "17pt");
		    /* 2017/06/15 mod end 本部管理テスト課題No.9 右側の「HOT数」などの文字サイズと統一(17ptに) */
			$(".map-arrow .text").css("font-weight", "normal");

            // 左向き線のCSS設定
			$(".map-arrow-left").css("z-index", "10");
			$(".map-arrow-left").css("pointer-events","");
			$(".map-arrow-left .arrow").css("display","none");
		    /* 2017/06/15 mod start 本部管理テスト課題No.9 右側の「HOT数」などの文字サイズと統一(17ptに) */
			//$(".map-arrow-left .text").css("font-size", "16px");
			$(".map-arrow-left .text").css("font-size", "17pt");
		    /* 2017/06/15 mod end 本部管理テスト課題No.9 右側の「HOT数」などの文字サイズと統一(17ptに) */
			$(".map-arrow-left .text").css("font-weight", "normal");

		    // 選択された店舗のCSS設定
			$map_arrow.css("z-index", "20");
			$map_arrow.css("pointer-events", "none");
			$map_arrow.children(".arrow").css("display", "block");
		    /* 2017/06/15 mod start 本部管理テスト課題No.9 右側の「HOT数」などの文字サイズと統一(17ptに) */
			//$map_arrow.children(".text").css("font-size", "24px");
			$map_arrow.children(".text").css("font-size", "17pt");
		    /* 2017/06/15 mod end 本部管理テスト課題No.9 右側の「HOT数」などの文字サイズと統一(17ptに) */
			$map_arrow.children(".text").css("font-weight", "bold");

            // 選択された店舗のIDを取得し、画面に情報表示
			var id = $map_arrow.children(".image").children("img").attr("id");
			var tenpoCd = id.replace("mapIcon_", "");
			dispData(tenpoCd);
		}
	);
}
