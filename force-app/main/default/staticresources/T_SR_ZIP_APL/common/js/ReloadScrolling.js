
var _scrollFlag = false;
var _reloadFlag = true;


function ReloadScroll(topScroll, bottomScroll) {

    $(document).ready(function () {

        //$(".sData").bottom({ proximity: 0.05 });

        var SHEIGHT = 100;

        $(".sData").bind("bottom", function () {
            var obj = $(this);

            if (!obj.data("loading")) {
                obj.data("loading", true);
                setTimeout(function () {

                    $("#ctl00_curSelRow").val('');

                    var s = $("#ctl00_prePageV").attr("value");
                    var n = $("#ctl00_nextPageV").attr("value");
                    var max = $("#ctl00_maxPage").attr("value");


                    $("#ctl00_nextPageV").attr("value", n);

                    if (parseInt(n) < parseInt(max)) {

                        s = parseInt(s) + (SHEIGHT / 2);
                        n = parseInt(n) + (SHEIGHT / 2);

                        $("#ctl00_prePageV").attr("value", s);
                        $("#ctl00_nextPageV").attr("value", n);

                        $(".loadingWrap").show();
                        $(".loadingImage").show();

                        if ($("#ctl00_scrollVT").val() == "") {

                            //var hh = $(".sData")[0].innerHeight()-$(".sData")[0].height())+($(".sData")[0].outerHeight()-$(".sData")[0].innerHeight();
                            var objH = $("#mCSB_1_container").outerHeight(false) - $(".sData").height()

                            //画面単位で数値の微調整必要　※注意※
                            $("#ctl00_scrollVT").val((parseInt(objH) * topScroll));
                            $("#ctl00_scrollVB").val((parseInt(objH) * bottomScroll));
                            //画面単位で数値の微調整必要　※注意※
                        }

                        $("#ctl00_scrollType").val('Bottom');

                        $("#ctl00_btnReload").click();
                    }

                    obj.data("loading", false);
                }, 500);
            }
        });

        $(".sData").bind("top", function () {
            var obj = $(this);

            if (!obj.data("loading")) {

                $("#ctl00_curSelRow").val('');

                obj.data("loading", true);

                setTimeout(function () {

                    var s = $("#ctl00_prePageV").attr("value");

                    var plaseValue = 100;

                    var n = $("#ctl00_nextPageV").attr("value");



                    if (parseInt(s) > 1) {

                        n = parseInt(n) - (SHEIGHT / 2);
                        s = parseInt(s) - (SHEIGHT / 2);

                        $("#ctl00_prePageV").attr("value", s);
                        $("#ctl00_nextPageV").attr("value", n);

                        $(".loadingWrap").show();
                        $(".loadingImage").show();

                        $("#ctl00_scrollType").val('Top');

                        $("#ctl00_btnReload").click();
                    }

                    obj.data("loading", false);
                }, 500);
            }
        });


    });

    $(window).load(function () {

        var scrollValue;

        scrollValue = 0;

        if ($("#ctl00_scrollType").val() == "Top") {

            scrollValue =$("#ctl00_scrollVT").val();


        } else if ($("#ctl00_scrollType").val() == "Bottom") {

            scrollValue = $("#ctl00_scrollVB").val();

        } else {
            scrollValue = $("#ctl00_curScrollTop").val();
            if (scrollValue == "") {
                scrollValue = 0;
            }
        }

        var prePos = 0;
        //2016/8/04 C#32 add start
        var scrollPixel = $(".sData").height() * ($.cookie("MouseScroll") / 100);
        //2016/8/04 C#32 add end
        $(".sData").mCustomScrollbar({
            setTop: scrollValue + "px",
            theme: "light",
            contentTouchScroll: 25,
            // 2016/8/04 C#32 add start 
            mouseWheelPixels: scrollPixel,
            // 2016/8/04 C#32 add end
            axis: "y",
            callbacks: {
                whileScrolling: function () {

                    if (this.mcs.topPct == "0" && _reloadFlag == false) {

                        _reloadFlag = true
                        $(this).trigger("top");

                    } else if (this.mcs.topPct == "100" && _reloadFlag == false) {

                        _reloadFlag = true
                        $(this).trigger("bottom");

                    } else if (this.mcs.topPct != "100" &&   this.mcs.topPct != "0") {
                        _reloadFlag = false
                    }
                    if (Math.abs(prePos - this.mcs.topPct) > 1)
                    {
                        _scrollFlag = true;
                    }
                },
                onScrollStart: function () {
                    prePos = this.mcs.topPct;
                },
                onScroll: function () {
                    _scrollFlag = false;
                    $("#ctl00_curScrollTop").attr("value", this.mcs.top);

                }
            }
        });

    });

}