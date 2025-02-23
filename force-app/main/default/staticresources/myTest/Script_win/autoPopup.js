function SetAutoPopUp(strId, strWidth) {

 	  	$(strId).colorbox({
 	  	    rel: 'lblStatus_white', iframe: true, width: strWidth, height: "740px", top: true,

          	});

          	$(strId).attr("href", $.cookie("user_url"));

          	if ($.cookie("user_url") === undefined) {

          	} else if ($.cookie("user_url") == "") {

		    }else if($(strId).attr("href") != "./") {

              		$(strId).click();
          	}

		var date1 = new Date();
  
		$.cookie("user_url", "");
	}
 	
