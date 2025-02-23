$(function () {
  
    var url = window.location;
    var path = url.href.split('/');
    var file_name = path.pop();
    // DHC一時対応　2018/12/10　start
    var name = file_name.split('?');
    // DHC一時対応　2018/12/10　end
    var id = name[0];
    //本部管理用メニューの緑枠表示
    if ($("#ctl00_kengen").val() == "0") {

        if (id.substr(0, 3) == "SG2") {
            if (file_name.indexOf("MikomiKengen=0") > 0) {
                $('[name=' + id + '_select_hon]').css('display', 'block');
            } else {
                $('[name=' + id + '_select_hon]').css('display', 'none');
                $('[name=' + id + '_select_ten]').css('display', 'block');
                //2018/04/11 add start 運用課題No.553
                if (id == "SG20030" || id == "SG20040" || id == "SG20080" || id == "SG20100") {
                    $('[name=SG20020_select_hon]').css('display', 'none');
                    $('[name=SG20020_select_ten]').css('display', 'block');
                }

                if (id == "SG20060" || id == "SG20070" || id == "SG20090" || id == "SG20110") {
                    $('[name=SG20050_select_hon]').css('display', 'none');
                    $('[name=SG20050_select_ten]').css('display', 'block');
                }
                //2018/04/11 add end 運用課題No.553
            }
        } else if (id.substr(0, 3) == "SG4") {
            if (file_name.indexOf("ServiceKengen=0") > 0) {
                $('[name=' + id + '_select_hon]').css('display', 'block');
            } else {
                $('[name=' + id + '_select_hon]').css('display', 'none');
                $('[name=' + id + '_select_ten]').css('display', 'block');
            }
        } else if (id.substr(0, 6) == "SG6021") {
            if (file_name.indexOf("NoukiCSKengen=0") > 0) {
                $('[name=' + id + '_select_hon]').css('display', 'block');
            } else {
                $('[name=' + id + '_select_hon]').css('display', 'none');
                $('[name=' + id + '_select_ten]').css('display', 'block');
            }
        } else {
            $('[name=' + id + '_select]').css('display', 'block');
        }

        $('[name=' + id.substr(0, 3) + '_select]').css('display', 'block');
        $('[name=' + id.substr(0, 5) + '_select]').css('display', 'block');
        $('[name=' + id + '_text]').css('color', '#7b7c7c');

    } else {
        $('[name=' + id + '_select]').css('display', 'block');
        $('[name=' + id.substr(0, 3) + '_select]').css('display', 'block');
        $('[name=' + id.substr(0, 5) + '_select]').css('display', 'block');
        $('[name=' + id + '_text]').css('color', '#7b7c7c');
    }

    var SetMenu = function () {

        var url = window.location;
        var path = url.href.split('/');
        var file_name = path.pop();
        // DHC一時対応　2018/12/10　start
        var name = file_name.split('?');
        // DHC一時対応　2018/12/10　end
        var id = name[0];

        var obj = $(this).closest('div');

        $("#kokyakulist").css('display', 'none');
        $("#topmenu").css('display', 'none');
        $("#noukics").css('display', 'none');
        //U-Car SPM：2017/11/30 add start
        $("#noukics_ucar").css('display', 'none');
        //U-Car SPM：2017/11/30 add end
        $("#toukatu").css('display', 'none');
        $("#mikomi").css('display', 'none');
        // 2016/01/27 add start
        $("#ServiceFooter").css('display', 'none');
        $("#HokenKeizokuFooter").css('display', 'none');
        $("#HokenSinkiFooter").css('display', 'none');
        // 2016/01/27 add end

        if (obj.attr('id') == 'HonbuKanriFooter') {

            obj.css('display', 'none');

            if (id.substr(0, 3) == "SG7") {
                $("#KPI_Menu").css('display', 'block');
                $.cookie("footer", "#KPI_Menu");

                if (id.substr(0, 7) == "SG70020" || id.substr(0, 7) == "SG70030") {
                    $("#pnlSearch").css('display', 'none');
                }
                if (id.substr(0, 7) == "SG70030") {
                    if (typeof footerSelect) {
                        footerSelect();
                    }
                }
            } else {
                $("#HonbuKanriFooter_Menu").css('display', 'block');
                $.cookie("footer", "#HonbuKanriFooter_Menu");
            }
        } else if (obj.attr('id') == 'KPI_Menu') {

            if ($("#ctl00_kengen").val() == "0") {

                obj.css('display', 'none');
                $("#HonbuKanriFooter").css('display', 'block');
                $.cookie("footer", "#HonbuKanriFooter");

                if (id.substr(0, 7) == "SG70020" || id.substr(0, 7) == "SG70030") {
                    $("#pnlSearch").css('display', 'block');
                }
            } else {
                obj.css('display', 'none');
                $("#toukatu").css('display', 'block');
                if (id.substr(0, 7) == "SG70020") {
                    $("#pnlSearch").css('display', 'block');
                }
                $.cookie("footer", "#toukatu");
            }

        } else if (obj.attr('id') == 'toukatu' && id.substr(0, 5) == "SG700") {

            obj.css('display', 'none');
            if (id.substr(0, 7) == "SG70020") {
                $("#pnlSearch").css('display', 'none');
            }
            $("#KPI_Menu").css('display', 'block');
            $.cookie("footer", "#KPI_Menu");

        } else if (obj.attr('id') == 'HonbuKanriFooter_Menu') {

            obj.css('display', 'none');

            $("#HonbuKanriFooter").css('display', 'block');

            $.cookie("footer", "#HonbuKanriFooter");
            //U-Car SPM：2017/11/30 mod start
        //} else if (obj.attr('id') == 'noukics' || obj.attr('id') == 'toukatu' || obj.attr('id') == 'mikomi' || obj.attr('id') == 'ServiceFooter' || obj.attr('id') == 'HokenSinkiFooter' || obj.attr('id') == 'HokenKeizokuFooter') {
        } else if (obj.attr('id') == 'noukics' || obj.attr('id') == 'noukics_ucar' || obj.attr('id') == 'toukatu' || obj.attr('id') == 'mikomi' || obj.attr('id') == 'ServiceFooter' || obj.attr('id') == 'HokenSinkiFooter' || obj.attr('id') == 'HokenKeizokuFooter') {
            // 2016/01/27 add end
            //U-Car SPM：2017/11/30 mod end
            obj.css('display', 'none');

            $("#topmenu").css('display', 'block');

            $.cookie("footer", "#topmenu");

        } else {

            obj.css('display', 'none');

            //U-Car SPM：2017/11/30
            //if (id.substr(0, 3) == "SG3") {
              if (id.substr(0, 5) == "SG300") {

                $("#noukics").css('display', 'block');

                $.cookie("footer", "#noukics");

            } else if (id.substr(0, 5) == "SG301") {

                  $("#noukics_ucar").css('display', 'block');

                  $.cookie("footer", "#noukics_ucar");
            //U-Car SPM：2017/11/30
            } else if (id.substr(0, 3) == "SG1") {

                $("#toukatu").css('display', 'block');

                $.cookie("footer", "#toukatu");

            } else if (id.substr(0, 3) == "SG2") {

                $("#mikomi").css('display', 'block');

                $.cookie("footer", "#mikomi");

                // 2016/01/27 add start
            } else if (id.substr(0, 3) == "SG4") {

                $("#ServiceFooter").css('display', 'block');

                $.cookie("footer", "#ServiceFooter");

            } else if (id.substr(0, 5) == "SG500") {

                $("#HokenSinkiFooter").css('display', 'block');

                $.cookie("footer", "#HokenSinkiFooter");
                // 2016/01/27 add end

            } else if (id.substr(0, 5) == "SG501") {

                $("#HokenKeizokuFooter").css('display', 'block');

                $.cookie("footer", "#HokenKeizokuFooter");
                // 2016/01/27 add end

            } else if (id.substr(0, 3) == "SG6" || id.substr(0, 3) == "SG7" || id.substr(0, 7) == "SG90900") {

                $("#toukatu").css('display', 'block');

                $.cookie("footer", "#toukatu");

            }
            
        }
    }

    $(document).on("click", '[name=menu]', SetMenu);

});

