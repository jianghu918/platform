$(document).ready(function () {
    getDateByymdhms = function (_) {
        var $;
        $ = _.getYear() + "-";
        $ = $ + (_.getMonth() + 1) + "-";
        $ += _.getDate() + " ";
        $ += _.getHours() + ":";
        $ += _.getMinutes() + ":";
        $ += _.getSeconds();
        return($)
    };
    doValidate = function ($) {
        return true
    }
})
$(document).ready(function () {
    var cookieset = {expires: 1, path: _context + 'default.htm', domain: 'cdian.cn'};
    var expires = {expires: 1, path: _context + 'default.htm', domain: 'cdian.cn'};
    var diffrestwidth;
    var diffrestheight;
    if ($.browser.msie) {
        diffrestwidth = 500;
        diffrestheight = 280;
    } else {
        diffrestwidth = 450;
        diffrestheight = 280;
    }
    ajaxsuggesthide = function () {
        $('#disabledZone').css('visibility', 'hidden');
    }
    ajaxsuggestshow = function () {
        var disabledZone = document.getElementById('disabledZone');
        if (!disabledZone) {
            disabledZone = document.createElement('div');
            disabledZone.setAttribute('id', 'disabledZone');
            disabledZone.style.position = "fixed";
            disabledZone.style.zIndex = "1000";
            disabledZone.style.left = "0px";
            disabledZone.style.top = "0px";
            disabledZone.style.width = "100%";
            disabledZone.style.height = "100%";
            document.body.appendChild(disabledZone);
            var messageZone = document.createElement('span');
            messageZone.setAttribute('id', 'messageZone');
            messageZone.style.position = "absolute";
            messageZone.style.top = "0px";
            messageZone.style.right = "0px";
            messageZone.style.background = "#FFFFAE";
            messageZone.style.color = "#000";
            messageZone.style.fontFamily = "Arial,Helvetica,sans-serif";
            messageZone.style.padding = "4px";
            messageZone.style.fontSize = "14px";
            var ajaxImage = document.createElement("img");
            ajaxImage.src = _param.ctx + "static/cd/images/ajax-loader.gif";
            ajaxImage.style.border = "0px";
            ajaxImage.style.width = "16px";
            ajaxImage.style.marginRight = "2px";
            ajaxImage.style.height = "16px";
            messageZone.appendChild(ajaxImage);
            disabledZone.appendChild(messageZone);
            var txtSpan = document.createElement("span");
            var text = document.createTextNode("正在加载中...");
            txtSpan.appendChild(text);
            txtSpan.id = "messageText";
            messageZone.appendChild(txtSpan);
            $('#disabledZone').css('visibility', 'hidden');
        }
    }
    $("#skipinfodiv").dialog({bgiframe: true, draggable: true, autoOpen: false, modal: true, height: 250, width: 400, position: [650, 80], title: '跳过登陆信息设置', buttons: {'关闭': function () {
        $(this).dialog('close');
    }, '确定': function () {
        $("form:eq(0)").attr("action", _context + "/customerController-loadCustomerAccountPage.html");
        $("form:eq(0)").attr("method", "post");
        $("form:eq(0)").submit();
    }}});
    skiplogininfo = function () {
        if (email == '' || email == null) {
            alert('由于网上所需的信息您还没有提供, 　请完成个人资料填写.');
            $("#mail").focus();
            return;
        }
        if (mobile == '' || mobile == null) {
            alert('由于网上所需的信息您还没有提供, 　请完成个人资料填写.');
            $("#phone").focus();
            return;
        }
        $("#skipinfodiv").dialog('open');
    }
    $("#futurebegindlg").dialog({bgiframe: true, draggable: true, autoOpen: false, modal: true, height: 250, width: 300, position: [350, 100], title: '将要推出', buttons: {'关闭': function () {
        $(this).dialog('close');
    }}});
    $("#customerlogindialog").dialog({bgiframe: true, draggable: true, autoOpen: false, modal: true, height: 310, width: 530, position: [350, 100], title: '登录'});
    $("#applymemberdlg").dialog({bgiframe: true, draggable: true, autoOpen: false, modal: true, height: 310, width: 400, title: '申请会员'});
    changechkcode = function () {
        $("#imgcheckcode").attr("src", _context + '/verify/customerCode.htm?length=5&rnd=' + Math.random());
    }
    recommgift = function () {
        common = function () {
            $("form:eq(0)").attr("action", _context + "/custcentercontroller-recommgift.html");
            $("form:eq(0)").attr("method", "post");
            $("form:eq(0)").submit();
        }
        $.ajax({type: "POST", url: _context + "/custcentercontroller-getLoginid.html", dataType: "json", success: function (json) {
            var _loginid = json.customerid;
            if (_loginid == '' || _loginid == null || _loginid == 'undefined') {
                $("#customerlogindialog").dialog('open');
            } else {
                $("form:eq(0)").attr("action", _context + "/custcentercontroller-recommgift.html");
                $("form:eq(0)").attr("method", "post");
                $("form:eq(0)").submit();
            }
        }});
    }
    backtoindex = function () {
        $("form:eq(0)").attr("action", "./");
        $("form:eq(0)").attr("method", "post");
        $("form:eq(0)").submit();
    }
    intorestdelivery = function (restaurantid, customerid, obj) {
        var cartlist = $.cookie("cartcookie");
        if (cartlist == '' || cartlist == null) {
            $("#nullmycartsuggest").dialog('open');
            return;
        }
        var otherservicemoney = '';
        $(".servpeoplenumsuggests").html('');
        var peoplenum = '0';
        if (peoplenum == null || peoplenum == '' || peoplenum == 'undefined' || peoplenum == undefined) {
            peoplenum = '';
        }
        var tastelevel = '';
        $("select").each(function () {
            tastelevel += this.id + "|" + this.value + "|";
        });
        $.ajax({type: "POST", url: _context + "/restdelivery.do?method=vallimitmoney&restaurantid=" + restaurantid + "&peoplenum=" + peoplenum, data: {cartlist: cartlist}, dataType: "json", success: function (json) {
            var isvalid = json.isvalid;
            if (isvalid == 'false') {
                $(obj).find(".tips").show();
                setTimeout(function () {
                    $(obj).find(".tips").hide();
                }, 4000);
            } else {
                $("form:eq(0)").attr("action", _context + "/restdelivery.do?method=intorestdelivery&restaurantid=" + restaurantid + "&tastelevel=" + tastelevel + "&peoplenum=" + peoplenum + "&customerid=" + customerid);
                var $cartlist = $('<input type="hidden"  name="cartlist" />').val(cartlist);
                $("form:eq(0)").append($cartlist);
                $("form:eq(0)").attr("method", "post");
                $("form:eq(0)").submit();
            }
        }});
    }
    commitApply = function (restaurantid) {
        $("form:eq(0)").attr("action", _context + "/custcentercontroller-applymember.html&restaurantid=" + restaurantid);
        $("form:eq(0)").attr("method", "post");
        $("form:eq(0)").submit();
    }
    loginzfb = function () {
        $("form:eq(0)").attr("action", _context + "/customerController-loginzfb.html");
        $("form:eq(0)").attr("method", "post");
        $("form:eq(0)").submit();
    }
    intoActivity = function () {
        $("form:eq(0)").attr("action", "../corp.cdian.cn/activity/gtfActivities.htm");
        $("form:eq(0)").attr("target", "_blank");
        $("form:eq(0)").submit();
    }
    intoOnlineSeating = function (restid) {
        common = function () {
            $("form:eq(0)").attr("action", _context + "/orderfood-loadOnlineseatings.html&restaurantid=" + restid);
            $("form:eq(0)").attr("method", "post");
            $("form:eq(0)").submit();
        }
        $.ajax({type: "POST", url: _context + "/custcentercontroller-getLoginid.html", dataType: "json", success: function (json) {
            var _loginid = json.customerid;
            if (_loginid == '' || _loginid == null || _loginid == 'undefined') {
                $("#customerlogindialog").dialog('open');
            } else {
                $("form:eq(0)").attr("action", _context + "/orderfood-loadOnlineseatings.html&restaurantid=" + restid);
                $("form:eq(0)").attr("method", "post");
                $("form:eq(0)").submit();
            }
        }});
    }
    closeApplymember = function () {
        $("#applymemberdlg").dialog('close');
    }
    applymember = function () {
        common = function () {
            $.ajax({type: "POST", url: _context + "/custcentercontroller-valRestMember.html", dataType: "json", data: {customerid: _loginid, restaurantid: restaurantid}, success: function (json) {
                var existed = json.existed;
                if (existed == 'true') {
                    $("#liapplymember").hide();
                    alert('您已经是' + restaurantname + '的会员了.');
                } else {
                    $("form:eq(0)").attr("action", _context + "/custcentercontroller-loadrequestmember.html&restaurantid=" + restaurantid + "&restaurantname=" + restaurantname);
                    $("form:eq(0)").attr("method", "post");
                    $("form:eq(0)").submit();
                }
            }});
        }
        $.ajax({type: "POST", url: _context + "/custcentercontroller-getLoginid.html", dataType: "json", success: function (json) {
            var _loginid = json.customerid;
            if (_loginid == '' || _loginid == null || _loginid == 'undefined') {
                $("#customerlogindialog").dialog('open');
            } else {
                $.ajax({type: "POST", url: _context + "/custcentercontroller-valRestMember.html", dataType: "json", data: {customerid: _loginid, restaurantid: restaurantid}, success: function (json) {
                    var existed = json.existed;
                    if (existed == 'true') {
                        $("#liapplymember").hide();
                        alert('您已经是' + restaurantname + '的会员了.');
                    } else {
                        $("form:eq(0)").attr("action", _context + "/custcentercontroller-loadrequestmember.html&restaurantid=" + restaurantid + "&restaurantname=" + restaurantname);
                        $("form:eq(0)").attr("method", "post");
                        $("form:eq(0)").submit();
                    }
                }});
            }
        }});
    }
    $("#activePhonedialog").dialog({bgiframe: true, draggable: true, autoOpen: false, modal: true, height: 300, width: 540, position: [350, 100], title: '手机验证'})
    $("#colfoodsuccessdig").dialog({bgiframe: true, draggable: true, autoOpen: false, modal: true, buttons: {'关闭': function () {
        $(this).dialog('close');
    }}});
    $("#tradereqfaileddig").dialog({bgiframe: true, draggable: true, autoOpen: false, modal: true, width: 450, height: 200, buttons: {'关闭': function () {
        $(this).dialog('close');
    }}});
    $("#colfoodfaileddig").dialog({bgiframe: true, draggable: true, autoOpen: false, modal: true, buttons: {'关闭': function () {
        $(this).dialog('close');
    }}});
    intofooddetails2 = function (restaurantid, foodid) {
        $("form:eq(0)").attr("action", _context + "/fooddetail-loadPage2.html&restaurantid=" + restaurantid + "&foodid=" + foodid);
        $("form:eq(0)").attr("target", '_blank');
        $("form:eq(0)").attr("method", "post");
        $("form:eq(0)").submit();
    }
    $("#colrestsuccessdig").dialog({bgiframe: true, draggable: true, autoOpen: false, modal: true, buttons: {'关闭': function () {
        $(this).dialog('close');
    }}});
    $("#colrestfaileddig").dialog({bgiframe: true, draggable: true, autoOpen: false, modal: true, buttons: {'关闭': function () {
        $(this).dialog('close');
    }}});
    addToCartnoleave = function (foodid, foodtype, curprice, index, foodname, restid) {
        var restaurid = $.cookie("restaurantid");
        var cartlist = $.cookie("cartcookie");
        if (restaurid != null && restaurid != restid && cartlist != '' && cartlist != null) {
            $("#adddiffrest").dialog({bgiframe: true, draggable: true, modal: true, width: diffrestwidth, height: diffrestheight, buttons: {'取消': function () {
                $(this).dialog('close');
            }, '确认': function () {
                $.cookie("cartcookie", null, expires);
                $(this).dialog('destroy');
                addTomycart3(foodid, foodtype, curprice, index, foodname, restid);
            }}});
            $("#adddiffrest").dialog('open');
        } else {
            addTomycart3(foodid, foodtype, curprice, index, foodname, restid);
        }
    }
    addToCart = function (foodid, foodtype, curprice, index, foodname, restid, restname) {
        var restaurid = $.cookie("restaurantid");
        var cartlist = $.cookie("cartcookie");
        if (restaurid != null && restaurid != restid && cartlist != '' && cartlist != null) {
            $("#adddiffrest").dialog({bgiframe: true, draggable: true, modal: true, width: diffrestwidth, height: diffrestheight, buttons: {'取消': function () {
                $(this).dialog('destroy');
            }, '确认': function () {
                $.cookie("cartcookie", null, expires);
                $(this).dialog('destroy');
                addToMyCart(foodid, foodtype, curprice, index, foodname, restid, restname);
            }}});
            $("#adddiffrest").dialog('open');
        } else {
            addToMyCart(foodid, foodtype, curprice, index, foodname, restid, restname);
        }
    }
    closeCommentRestDialog = function () {
        $("#commentrestdlg").dialog('close');
    }
    closeCommentFoodDialog = function () {
        $("#commentfooddlg").dialog("close");
    }
    openIntologin = function () {
        $("form:eq(0)").attr("action", _context + "/custcentercontroller-login.html");
        $("form:eq(0)").attr("target", 'userlogin');
        $("form:eq(0)").submit();
    }
    intoMainpagefromlogin = function () {
        if (window.opener == null) {
            window.location.href = _context + '/mainpage-loadPage.html';
            return;
        }
        window.opener.location.href = _context + '/mainpage-loadPage.html';
        window.open('', '_top');
        window.top.close();
    }
    intoMyOrderfood = function () {
        if (window.opener == null) {
            window.location.href = _context + '/mainpage-loadSearchRest.html';
            return;
        }
        window.opener.location.href = _context + '/mainpage-loadSearchRest.html';
        window.open('', '_top');
        window.top.close();
    }
    intoSearchrestaurant = function () {
        var cityid = '287';
        var cityname = '上海';
        if (window.opener == null) {
            window.location.href = _context + "/foodrestsearch-loadRestPage.html&cityid=" + cityid + "&cityname=" + cityname;
            return;
        }
        window.opener.location.href = _context + "/foodrestsearch-loadRestPage.html&cityid=" + cityid + "&cityname=" + cityname;
        window.open('', '_top');
        window.top.close();
    }
    intoSearchfood = function () {
        var cityid = '287';
        var cityname = '上海';
        if (window.opener == null) {
            window.location.href = _context + "/foodrestsearch-loadPage.html&cityid=" + cityid + "&cityname=" + cityname;
            return null;
        }
        window.opener.location.href = _context + "/foodrestsearch-loadPage.html&cityid=" + cityid + "&cityname=" + cityname;
        window.open('', '_top');
        window.top.close();
    }
    logoutsystem = function () {
        $.ajax({type: "POST", url: _context + "/customerController-logoutsystem.html", dataType: "json", success: function (json) {
            changelogstyle1();
            _loginid = '';
            _loginname = '';
        }});
    }
    logoutsysintomain = function () {
        $("form:eq(0)").attr("action", _context + "/mainpage-logoutfromsystem.html");
        $("form:eq(0)").attr("method", "post");
        $("form:eq(0)").submit();
    }
    changelogstyle1 = function () {
        $(".logininsys").show();
        $(".logoutsys").hide();
        $(".welinfo").html('您好，欢迎来到乐吃网！');
    }
    changelogsyle = function () {
        $(".logininsys").hide();
        $(".logoutsys").show();
        $(".welinfo").html(_loginname + ' — 想吃就点, 就是这么简单！');
    }
    $("#newmsg").click(function () {
        $("form:eq(0)").attr("action", _context + "/custcentercontroller-loadCustMsgcenter.html");
        $("form:eq(0)").attr("method", "post");
        $("form:eq(0)").submit();
    });
    searchAllFood = function () {
        var cityid = $("#cityid").val();
        cityid = '287';
        var cityname = $("#cityname").text();
        cityname = '上海';
        $("form:eq(0)").attr("action", _context + "/foodrestsearch-loadPage.html&cityid=" + cityid + "&cityname=" + cityname);
        $("form:eq(0)").attr("method", "post");
        $("form:eq(0)").submit();
    }
    searchAllRestaurant = function () {
        var cityid = $("#cityid").val();
        cityid = '287';
        var cityname = $("#cityname").text();
        cityname = '上海';
        $("form:eq(0)").attr("action", _context + "/foodrestsearch-loadRestPage.html&cityid=" + cityid + "&cityname=" + cityname);
        $("form:eq(0)").attr("method", "post");
        $("form:eq(0)").submit();
    }
    intoCustomerCenter2 = function (customerid) {
        common = function () {
            $("form:eq(0)").attr("action", _context + "/customerController-loadCustomerAccountPage2.html?customerid=" + customerid);
            $("form:eq(0)").attr("method", "post");
            $("form:eq(0)").submit();
        }
        $.ajax({type: "POST", url: _context + "/custcentercontroller-getLoginid.html", dataType: "json", success: function (json) {
            var _loginid = json.customerid;
            if (_loginid == '' || _loginid == null || _loginid == 'undefined') {
                $("#customerlogindialog").dialog('open');
            } else {
                $("form:eq(0)").attr("action", _context + "/customerController-loadCustomerAccountPage2.html?customerid=" + customerid);
                $("form:eq(0)").attr("method", "post");
                $("form:eq(0)").submit();
            }
        }});
    }
    intoCustomerCenter = function () {
        common = function () {
            $("form:eq(0)").attr("action", _context + "/customerController-loadCustomerAccountPage.html");
            $("form:eq(0)").attr("method", "post");
            $("form:eq(0)").submit();
        }
        $.ajax({type: "POST", url: _context + "/custcentercontroller-getLoginid.html", dataType: "json", success: function (json) {
            var _loginid = json.customerid;
            if (_loginid == '' || _loginid == null || _loginid == 'undefined') {
                $("#customerlogindialog").dialog('open');
            } else {
                $("form:eq(0)").attr("action", _context + "/customerController-loadCustomerAccountPage.html");
                $("form:eq(0)").attr("method", "post");
                $("form:eq(0)").submit();
            }
        }});
    }
    checkMobile = function (s) {
        var regu = /^[1][3,4,5,8][0-9]{9}$/;
        var re = new RegExp(regu);
        if (re.test(s)) {
            return true;
        } else {
            return false;
        }
    }
    autoOrderFood = function (restid) {
        $("form:eq(0)").attr("action", _context + "/autoOrderController-loadPage.html&rid=" + restid);
        $("form:eq(0)").attr("method", "post");
        $("form:eq(0)").submit();
    }
    addToMyCartnoleave = function (foodid, foodtype, curprice, index, foodname, restid) {
        var restaurid = $.cookie("restaurantid");
        var cartlist = $.cookie("cartcookie");
        if (restaurid != null && restaurid != restid && cartlist != '' && cartlist != null) {
            $("#adddiffrest").dialog({bgiframe: true, draggable: true, modal: true, width: diffrestwidth, height: diffrestheight, buttons: {'取消': function () {
                $(this).dialog('close');
            }, '确认': function () {
                $.cookie("cartcookie", null, expires);
                $(this).dialog('destroy');
                addTomycart2(foodid, foodtype, curprice, index, foodname, restid);
            }}});
            $("#adddiffrest").dialog('open');
        } else {
            addTomycart2(foodid, foodtype, curprice, index, foodname, restid);
        }
    }
    hideSuccesshint = function (index) {
        $("#successtint" + index).hide();
    }
    addTomycart3 = function (foodid, foodtype, curprice, index, foodname, restid) {
        if (foodtype == '1') {
            $.ajax({type: "POST", url: _context + "/customerController-getCulinaryMethods.html", dataType: "json", data: {maindishid: foodid}, cache: false, success: function (json) {
                var culinarymethods = json.culinarymethods;
                if (culinarymethods.length > 0) {
                    var html = '';
                    for (var x = 0; x < culinarymethods.length; x++) {
                        if (x == 0) {
                            html += ' <li><input type="radio" name="cookingStyle" checked/> <label style="font-size:14px;">' + culinarymethods[x].methodname + '</label></li>'
                        } else {
                            html += ' <li><input type="radio" name="cookingStyle"/> <label style="font-size:14px;">' + culinarymethods[x].methodname + '</label></li>'
                        }
                    }
                    $("#selectculinarymethoddlg").dialog({bgiframe: true, draggable: true, modal: true, title: '我要', open: function (event, ui) {
                        $('a.ui-dialog-titlebar-close').hide();
                        $("#selectculinarymethoddlg").find('ul').html('');
                        $("#selectculinarymethoddlg").find('ul').html(html);
                    }, buttons: {'取消': function () {
                        $('a.ui-dialog-titlebar-close').show();
                        $(this).dialog('destroy');
                    }, '确认': function () {
                        $('#selectculinarymethoddlg').dialog('destroy');
                        var methodname = '';
                        $('input[name="cookingStyle"]').each(function () {
                            if ($(this).attr("checked")) {
                                methodname = $(this).next().html();
                            }
                        });
                        foodname = foodname + '(' + methodname + ')';
                        adddishaction3(foodid, foodtype, curprice, index, foodname, restid);
                        $('a.ui-dialog-titlebar-close').show();
                    }}});
                    $("#selectculinarymethoddlg").dialog('open');
                } else {
                    adddishaction3(foodid, foodtype, curprice, index, foodname, restid);
                }
            }});
        } else {
            adddishaction3(foodid, foodtype, curprice, index, foodname, restid);
        }
    }
    addTomycart2 = function (foodid, foodtype, curprice, index, foodname, restid, obj) {
        if (foodtype == '1') {
            $.ajax({type: "POST", url: _context + "/customerController-getCulinaryMethods.html", dataType: "json", data: {maindishid: foodid}, cache: false, success: function (json) {
                var culinarymethods = json.culinarymethods;
                if (culinarymethods.length > 0) {
                    var html = '';
                    for (var x = 0; x < culinarymethods.length; x++) {
                        if (x == 0) {
                            html += ' <li><input type="radio" name="cookingStyle" checked/> <label style="font-size:14px;">' + culinarymethods[x].methodname + '</label></li>'
                        } else {
                            html += ' <li><input type="radio" name="cookingStyle"/> <label style="font-size:14px;">' + culinarymethods[x].methodname + '</label></li>'
                        }
                    }
                    $("#selectculinarymethoddlg").dialog({bgiframe: true, draggable: true, modal: true, title: '我要', open: function (event, ui) {
                        $('a.ui-dialog-titlebar-close').hide();
                        $("#selectculinarymethoddlg").find('ul').html('');
                        $("#selectculinarymethoddlg").find('ul').html(html);
                    }, buttons: {'取消': function () {
                        $('a.ui-dialog-titlebar-close').show();
                        $(this).dialog('destroy');
                    }, '确认': function () {
                        $('#selectculinarymethoddlg').dialog('destroy');
                        var methodname = '';
                        $('input[name="cookingStyle"]').each(function () {
                            if ($(this).attr("checked")) {
                                methodname = $(this).next().html();
                            }
                        });
                        foodname = foodname + '(' + methodname + ')';
                        adddishaction(foodid, foodtype, curprice, index, foodname, restid, obj);
                        $('a.ui-dialog-titlebar-close').show();
                    }}});
                    $("#selectculinarymethoddlg").dialog('open');
                } else {
                    adddishaction(foodid, foodtype, curprice, index, foodname, restid, obj);
                }
            }});
        } else {
            adddishaction(foodid, foodtype, curprice, index, foodname, restid, obj);
        }
    }
    adddishaction3 = function (foodid, foodtype, curprice, index, foodname, restid) {
        $("#addtocartsuccess").show();
        setTimeout(function () {
            $("#addtocartsuccess").hide()
        }, 1000);
        var quantity = $("#quantity" + index).val();
        quantity = 1;
        if ($.cookie("cartcookie") == null) {
            var newcurprice = formatFloat(formatFloat(curprice, 2) * parseInt(quantity), 2);
            var cartlist = foodid + "|" + foodtype + "|" + newcurprice + "|" + quantity + "|" + foodname;
            $.cookie("cartcookie", cartlist, cookieset);
            $.cookie("restaurantid", restid, cookieset);
        } else {
            var seccartlist = $.cookie("cartcookie");
            var tempcartlist = new String(seccartlist);
            var cartlistarray = tempcartlist.split("|");
            var isretryadd = false;
            var i = 0;
            while (i < cartlistarray.length) {
                if (foodid == cartlistarray[i]) {
                    var oriquantity = cartlistarray[i + 3];
                    var orimoney = cartlistarray[i + 2];
                    cartlistarray[i + 3] = parseInt(oriquantity) + parseInt(quantity);
                    cartlistarray[i + 2] = formatFloat(formatFloat(orimoney, 2) + (formatFloat(curprice, 2) * quantity), 2);
                    isretryadd = true;
                }
                i += 5;
            }
            if (isretryadd == true) {
                var resultstr = cartlistarray[0];
                for (var j = 1; j < cartlistarray.length; j++) {
                    resultstr += "|" + cartlistarray[j];
                }
                seccartlist = resultstr;
            }
            if (isretryadd == false) {
                var seccurprice = formatFloat(formatFloat(curprice, 2) * parseInt(quantity), 2);
                var addedstr = "|" + foodid + "|" + foodtype + "|" + seccurprice + "|" + quantity + "|" + foodname;
                seccartlist += addedstr;
            }
            $.cookie("cartcookie", seccartlist, cookieset);
        }
    }
    adddishaction = function (foodid, foodtype, curprice, index, foodname, restid, obj) {
        $(obj).parent().parent().find(".successaddmenu").show();
        var quantity = $("#quantity" + index).val();
        quantity = 1;
        if ($.cookie("cartcookie") == null) {
            var newcurprice = formatFloat(formatFloat(curprice, 2) * parseInt(quantity), 2);
            var cartlist = foodid + "|" + foodtype + "|" + newcurprice + "|" + quantity + "|" + foodname;
            $.cookie("cartcookie", cartlist, cookieset);
            $.cookie("restaurantid", restid, cookieset);
        } else {
            var seccartlist = $.cookie("cartcookie");
            var tempcartlist = new String(seccartlist);
            var cartlistarray = tempcartlist.split("|");
            var isretryadd = false;
            var i = 0;
            while (i < cartlistarray.length) {
                if (foodid == cartlistarray[i]) {
                    var oriquantity = cartlistarray[i + 3];
                    var orimoney = cartlistarray[i + 2];
                    cartlistarray[i + 3] = parseInt(oriquantity) + parseInt(quantity);
                    cartlistarray[i + 2] = formatFloat(formatFloat(orimoney, 2) + (formatFloat(curprice, 2) * quantity), 2);
                    isretryadd = true;
                }
                i += 5;
            }
            if (isretryadd == true) {
                var resultstr = cartlistarray[0];
                for (var j = 1; j < cartlistarray.length; j++) {
                    resultstr += "|" + cartlistarray[j];
                }
                seccartlist = resultstr;
            }
            if (isretryadd == false) {
                var seccurprice = formatFloat(formatFloat(curprice, 2) * parseInt(quantity), 2);
                var addedstr = "|" + foodid + "|" + foodtype + "|" + seccurprice + "|" + quantity + "|" + foodname;
                seccartlist += addedstr;
            }
            $.cookie("cartcookie", seccartlist, cookieset);
        }
        $("#successtint" + index).show();
        setTimeout("hideSuccesshint(" + index + ")", 2000);
        setTimeout(function () {
            $(obj).parent().parent().find(".successaddmenu").hide();
        }, 2000);
    }
    adddishaction2 = function (foodid, foodtype, curprice, index, foodname, restid, restname) {
        var quantity = $("#quantity" + index).val();
        if (index == '') {
            quantity = 1;
        }
        if ($.cookie("cartcookie") == null) {
            var newcurprice = formatFloat(formatFloat(curprice, 2) * parseInt(quantity), 2);
            var cartlist = foodid + "|" + foodtype + "|" + newcurprice + "|" + quantity + "|" + foodname;
            $.cookie("cartcookie", cartlist, cookieset);
            $.cookie("restaurantid", restid, cookieset);
        } else {
            var seccartlist = $.cookie("cartcookie");
            var tempcartlist = new String(seccartlist);
            var cartlistarray = tempcartlist.split("|");
            var isretryadd = false;
            var i = 0;
            while (i < cartlistarray.length) {
                if (foodid == cartlistarray[i]) {
                    var oriquantity = cartlistarray[i + 3];
                    var orimoney = cartlistarray[i + 2];
                    cartlistarray[i + 3] = parseInt(oriquantity) + parseInt(quantity);
                    cartlistarray[i + 2] = formatFloat(formatFloat(orimoney, 2) + (formatFloat(curprice, 2) * quantity), 2);
                    isretryadd = true;
                }
                i += 5;
            }
            if (isretryadd == true) {
                var resultstr = cartlistarray[0];
                for (var j = 1; j < cartlistarray.length; j++) {
                    resultstr += "|" + cartlistarray[j];
                }
                seccartlist = resultstr;
            }
            if (isretryadd == false) {
                var seccurprice = formatFloat(formatFloat(curprice, 2) * parseInt(quantity), 2);
                var addedstr = "|" + foodid + "|" + foodtype + "|" + seccurprice + "|" + quantity + "|" + foodname;
                seccartlist += addedstr;
            }
            $.cookie("cartcookie", seccartlist, cookieset);
        }
        $("form:eq(0)").attr("action", _context + "/orderfood-loadPage.html&restaurantid=" + restid + "&restaurantname=" + restname);
        $("form:eq(0)").removeAttr("target");
        $("form:eq(0)").attr("method", "post");
        $("form:eq(0)").submit();
    }
    addToMyCart = function (foodid, foodtype, curprice, index, foodname, restid, restname) {
        if (foodtype == '1') {
            $.ajax({type: "POST", url: _context + "/customerController-getCulinaryMethods.html", dataType: "json", cache: false, data: {maindishid: foodid}, success: function (json) {
                var culinarymethods = json.culinarymethods;
                if (culinarymethods.length > 0) {
                    var html = '';
                    for (var x = 0; x < culinarymethods.length; x++) {
                        if (x == 0) {
                            html += ' <li><input type="radio" name="cookingStyle" checked/> <label style="font-size:14px;">' + culinarymethods[x].methodname + '</label></li>'
                        } else {
                            html += ' <li><input type="radio" name="cookingStyle"/> <label style="font-size:14px;">' + culinarymethods[x].methodname + '</label></li>'
                        }
                    }
                    $("#selectculinarymethoddlg").dialog({bgiframe: true, draggable: true, modal: true, title: '我要', open: function (event, ui) {
                        $('a.ui-dialog-titlebar-close').hide();
                        $("#selectculinarymethoddlg").find('ul').html('');
                        $("#selectculinarymethoddlg").find('ul').html(html);
                    }, buttons: {'取消': function () {
                        $(this).dialog('destroy');
                        $('a.ui-dialog-titlebar-close').show();
                    }, '确认': function () {
                        $("#selectculinarymethoddlg").dialog('destroy');
                        var methodname = '';
                        $('input[name="cookingStyle"]').each(function () {
                            if ($(this).attr("checked")) {
                                methodname = $(this).next().html();
                            }
                        });
                        foodname = foodname + '(' + methodname + ')';
                        adddishaction2(foodid, foodtype, curprice, index, foodname, restid, restname);
                        $('a.ui-dialog-titlebar-close').show();
                    }}});
                    $("#selectculinarymethoddlg").dialog('open');
                } else {
                    adddishaction2(foodid, foodtype, curprice, index, foodname, restid, restname);
                }
            }});
        } else {
            adddishaction2(foodid, foodtype, curprice, index, foodname, restid, restname);
        }
    }
    commentFoodfrommainpage = function (foodtype, foodid, restid, restname) {
        $("form:eq(0)").attr("action", _context + '/fooddetail-loadPage.html&foodtype=' + foodtype + '&foodid=' + foodid + '&restaurantid=' + restid + '&restaurantname=' + restname + '#1');
        $("form:eq(0)").attr("method", "post");
        $("form:eq(0)").submit();
    }
    searchbyrestword = function (restid, restname) {
        var searchword = $("#searchword").val();
        if (searchword == '') {
            $("#searchword").focus();
            return;
        }
        ;
        $("form:eq(0)").attr("action", _context + "/orderfood-getRestaurantWordSearch.html&restaurantid=" + restid + "&searchword=" + encodeURI(encodeURI(searchword)) + "&restaurantname=" + encodeURI(encodeURI(restname)));
        $("form:eq(0)").removeAttr("target");
        $("form:eq(0)").attr("method", "post");
        $("form:eq(0)").submit();
    }
    getStarfromcomment = function (commentrate) {
        var html = '';
        if (commentrate == 0) {
            html += '<img src="' + _context + '/images/foodrestsearch/kong_03.gif" width="15" height="15" /> <img src="' + _context + '/images/foodrestsearch/kong_03.gif" width="15" height="15" /> <img src="' + _context + '/images/foodrestsearch/kong_03.gif" width="15" height="15"/> <img src="' + _context + '/images/foodrestsearch/kong_03.gif" width="15" height="15"/> <img src="' + _context + '/images/foodrestsearch/kong_03.gif" width="15" height="15"/>';
        } else if (commentrate < 1.5 && commentrate > 0) {
            html += '<img src="' + _context + '/images/foodrestsearch/s1.gif" width="15" height="15" /> <img src="' + _context + '/images/foodrestsearch/kong_03.gif" width="15" height="15" /> <img src="' + _context + '/images/foodrestsearch/kong_03.gif" width="15" height="15"/> <img src="' + _context + '/images/foodrestsearch/kong_03.gif" width="15" height="15"/> <img src="' + _context + '/images/foodrestsearch/kong_03.gif" width="15" height="15"/>';
        } else if (commentrate >= 1.5 && commentrate < 2) {
            html += '<img src="' + _context + '/images/foodrestsearch/s1.gif" width="15" height="15" /> <img src="' + _context + '/images/foodrestsearch/s05.gif" width="15" height="15" /> <img src="' + _context + '/images/foodrestsearch/kong_03.gif" width="15" height="15"/> <img src="' + _context + '/images/foodrestsearch/kong_03.gif" width="15" height="15"/> <img src="' + _context + '/images/foodrestsearch/kong_03.gif" width="15" height="15"/>';
        } else if (commentrate >= 2 && commentrate < 2.5) {
            html += '<img src="' + _context + '/images/foodrestsearch/s1.gif" width="15" height="15" /> <img src="' + _context + '/images/foodrestsearch/s1.gif" width="15" height="15" /> <img src="' + _context + '/images/foodrestsearch/kong_03.gif" width="15" height="15"/> <img src="' + _context + '/images/foodrestsearch/kong_03.gif" width="15" height="15"/> <img src="' + _context + '/images/foodrestsearch/kong_03.gif" width="15" height="15"/>';
        } else if (commentrate >= 2.5 && commentrate < 3) {
            html += '<img src="' + _context + '/images/foodrestsearch/s1.gif" width="15" height="15" /> <img src="' + _context + '/images/foodrestsearch/s1.gif" width="15" height="15" /> <img src="' + _context + '/images/foodrestsearch/s05.gif" width="15" height="15"/> <img src="' + _context + '/images/foodrestsearch/kong_03.gif" width="15" height="15"/> <img src="' + _context + '/images/foodrestsearch/kong_03.gif" width="15" height="15"/>';
        } else if (commentrate >= 3 && commentrate < 3.5) {
            html += '<img src="' + _context + '/images/foodrestsearch/s1.gif" width="15" height="15" /> <img src="' + _context + '/images/foodrestsearch/s1.gif" width="15" height="15" /> <img src="' + _context + '/images/foodrestsearch/s1.gif" width="15" height="15"/> <img src="' + _context + '/images/foodrestsearch/kong_03.gif" width="15" height="15"/> <img src="' + _context + '/images/foodrestsearch/kong_03.gif" width="15" height="15"/>';
        } else if (commentrate >= 3.5 && commentrate < 4) {
            html += '<img src="' + _context + '/images/foodrestsearch/s1.gif" width="15" height="15" /> <img src="' + _context + '/images/foodrestsearch/s1.gif" width="15" height="15" /> <img src="' + _context + '/images/foodrestsearch/s1.gif" width="15" height="15"/> <img src="' + _context + '/images/foodrestsearch/s05.gif" width="15" height="15"/> <img src="' + _context + '/images/foodrestsearch/kong_03.gif" width="15" height="15"/>';
        } else if (commentrate >= 4 && commentrate < 4.5) {
            html += '<img src="' + _context + '/images/foodrestsearch/s1.gif" width="15" height="15" /> <img src="' + _context + '/images/foodrestsearch/s1.gif" width="15" height="15" /> <img src="' + _context + '/images/foodrestsearch/s1.gif" width="15" height="15"/> <img src="' + _context + '/images/foodrestsearch/s1.gif" width="15" height="15"/> <img src="' + _context + '/images/foodrestsearch/kong_03.gif" width="15" height="15"/>';
        } else if (commentrate >= 4.5 && commentrate < 5) {
            html += '<img src="' + _context + '/images/foodrestsearch/s1.gif" width="15" height="15" /> <img src="' + _context + '/images/foodrestsearch/s1.gif" width="15" height="15" /> <img src="' + _context + '/images/foodrestsearch/s1.gif" width="15" height="15"/> <img src="' + _context + '/images/foodrestsearch/s1.gif" width="15" height="15"/> <img src="' + _context + '/images/foodrestsearch/s05.gif" width="15" height="15"/>';
        } else {
            html += '<img src="' + _context + '/images/foodrestsearch/s1.gif" width="15" height="15" /> <img src="' + _context + '/images/foodrestsearch/s1.gif" width="15" height="15" /> <img src="' + _context + '/images/foodrestsearch/s1.gif" width="15" height="15"/> <img src="' + _context + '/images/foodrestsearch/s1.gif" width="15" height="15"/> <img src="' + _context + '/images/foodrestsearch/s1.gif" width="15" height="15"/>';
        }
        return html;
    }
    intoindex = function (mainindexurl) {
        $("form:eq(0)").attr("action", mainindexurl);
        $("form:eq(0)").attr("method", "post");
        $("form:eq(0)").submit();
    }
    forgetpass = function () {
        $("form:eq(0)").attr("action", _context + "/jsp/customer/RequestPassword.jsp");
        $("form:eq(0)").attr("target", '_blank');
        $("form:eq(0)").attr("method", "post");
        $("form:eq(0)").submit();
    }
    activePhone = function (phonenum) {
        common = function () {
            $("form:eq(0)").attr("action", _context + "/customerController-loadCustomerAccountPage.html");
            $("form:eq(0)").attr("method", "post");
            $("form:eq(0)").submit();
        }
        $("#activePhonedialog").dialog('open');
        $("#custphonenum").html(phonenum);
    }
    checkoutmycart4 = function () {
        var cartlist = $.cookie("cartcookie");
        var restaurantid = $.cookie("restaurantid");
        restaurantid = new String(restaurantid);
        if (cartlist == '' || cartlist == null)return;
        common = function () {
            checkoutmycart();
        }
        $("form:eq(0)").attr("action", _context + "/intoflow.do?restid=" + restaurantid + "&flag=0");
        var cartlistinput = $('#cartlist');
        if (cartlistinput == undefined || cartlistinput.val() == null || cartlistinput.val() == '') {
            cartlistinput = $('<input type="hidden"  id="cartlist"  name="cartlist" />').val(cartlist);
            $("form").append(cartlistinput);
        } else {
            cartlistinput.val(cartlist);
        }
        $("form:eq(0)").attr("method", "post");
        $("form:eq(0)").submit();
    }
    checkoutmycart = function () {
        var cartlist = $.cookie("cartcookie");
        var restaurantid = $.cookie("restaurantid");
        restaurantid = new String(restaurantid);
        if (cartlist == '' || cartlist == null)return;
        $("#mycartstaticinfo").animate({"width": "0px"}, 800, function () {
            $(".show_my_menu").show();
            $("#mycartstaticinfo").hide();
            $("div[name='mymenu2']").show();
        });
        common = function () {
            checkoutmycart();
        }
        $("form:eq(0)").attr("action", _context + "/intoflow.do?restid=" + restaurantid + "&flag=0");
        var cartlistinput = $('#cartlist');
        if (cartlistinput == undefined || cartlistinput.val() == null || cartlistinput.val() == '') {
            cartlistinput = $('<input type="hidden"  id="cartlist"  name="cartlist" />').val(cartlist);
            $("form").append(cartlistinput);
        } else {
            cartlistinput.val(cartlist);
        }
        $("form:eq(0)").attr("method", "post");
        $("form:eq(0)").submit();
    }
    checkoutmycart2 = function () {
        var cartlist = $.cookie("cartcookie");
        var restaurantid = $.cookie("restaurantid");
        restaurantid = new String(restaurantid);
        $("#mycartstaticinfo").animate({"width": "0px"}, 800, function () {
            $(".show_my_menu").show();
            $("#mycartstaticinfo").hide();
            $("div[name='mymenu2']").show();
        });
        if (cartlist == '' || cartlist == null)return;
        common = function () {
            checkoutmycart2();
        }
        $("form:eq(0)").attr("action", _context + "/intoflow.do?restid=" + restaurantid + "&customerid=" + _loginid + "&flag=1");
        var cartlistinput = $('#cartlist');
        if (cartlistinput == undefined || cartlistinput.val() == null || cartlistinput.val() == '') {
            cartlistinput = $('<input type="hidden"  id="cartlist"  name="cartlist" />').val(cartlist);
            $("form").append(cartlistinput);
        } else {
            cartlistinput.val(cartlist);
        }
        $("form:eq(0)").attr("method", "post");
        $("form:eq(0)").submit();
    }
    checkoutmycart3 = function () {
        $("#mycartstaticinfo").animate({"width": "0px"}, 800, function () {
            $(".show_my_menu").show();
            $("#mycartstaticinfo").hide();
            $("div[name='mymenu2']").show();
        });
        var cartlist = $.cookie("cartcookie");
        if (cartlist == '' || cartlist == null)return;
        common = function () {
            checkoutmycart3();
        }
        $("form:eq(0)").attr("action", _context + "/intoflow.do?restid=" + restaurantid + "&customerid=" + _loginid + "&flag=0&customername=" + _loginname);
        var cartlistinput = $('#cartlist');
        if (cartlistinput == undefined || cartlistinput.val() == null || cartlistinput.val() == '') {
            cartlistinput = $('<input type="hidden"  id="cartlist"  name="cartlist" />').val(cartlist);
            $("form").append(cartlistinput);
        } else {
            cartlistinput.val(cartlist);
        }
        $("form:eq(0)").attr("method", "post");
        $("form:eq(0)").submit();
    }
    intoCustomerComment = function (customerid) {
        $("form:eq(0)").attr("action", _context + "/custcommcontroller-getPageAllCommentsByCustid.html&customerid=" + customerid);
        $("form:eq(0)").removeAttr("target");
        $("form:eq(0)").attr("method", "post");
        $("form:eq(0)").submit();
    }
    commentrest = function (customerid, restaurantid) {
        $("#commentrestdlg").dialog('open');
    }
    var commentwidth;
    if ($.browser.msie) {
        commentwidth = 735;
    } else {
        commentwidth = 703;
    }
    commentrestfromcustomercenter = function (restaurantid) {
        $("#commentrestdlg").dialog({bgiframe: true, draggable: true, autoOpen: false, modal: true, width: commentwidth, title: "餐厅评论框", open: function (event, ui) {
            $.ajax({type: "POST", url: _context + "/custcommcontroller-isCustomerRestaurantConsump.html", dataType: "json", data: {customerid: _loginid, restaurantid: restaurantid}, success: function (json) {
                var isconsump = json.isconsump;
                if (isconsump == -1) {
                    $("#noconsump").show();
                    $("#everconsump").hide();
                    $("#lgconsumpcnt").hide();
                    $("#givepoints").find('input').each(function () {
                        $(this).attr("disabled", true);
                    });
                    $("#givepoints").css("color", "gray");
                } else if (isconsump == 1) {
                    $("#noconsump").hide();
                    $("#everconsump").show();
                    $("#lgconsumpcnt").hide();
                    $("#givepoints").removeAttr("disabled");
                } else {
                    $("#noconsump").hide();
                    $("#everconsump").hide();
                    $("#lgconsumpcnt").show();
                    $("#givepoints").find('input').each(function () {
                        $(this).attr("disabled", true);
                    });
                    $("#givepoints").css("color", "gray");
                }
                $("#commentcustomname").text('');
                $("#commentcustomname").text(_loginname);
                iscustomerconsump = isconsump;
            }});
        }, buttons: {'关闭': function () {
            $(this).dialog('close');
        }, '发表评论': function () {
            var pageno = $("#pageno").val();
            var taste;
            var service;
            var environment;
            var recommrate;
            var overall;
            if (iscustomerconsump == -1 || iscustomerconsump == 0) {
                taste = 0;
                service = 0;
                environment = 0;
                recommrate = 0;
                overall = 0;
            } else {
                taste = $("input[name='taste']:checked").val();
                service = $("input[name='service']:checked").val();
                environment = $("input[name='environment']:checked").val();
                overall = $("input[name='overall']:checked").val();
                recommrate = $("input[name='recommrate']:checked").val();
            }
            var comment = $("textarea[name='comments']").val();
            if (comment == '我的评论：(不少于5个汉字, 最大可输入2000个汉字)') {
                $("textarea[name='comments']").focus();
                return;
            }
            if (comment == '' || comment.replace(/[^x00-xFF]/g, '**').length < 10) {
                $("textarea[name='comments']").val("我的评论：(不少于5个汉字, 最大可输入2000个汉字)");
                return;
            }
            comment = setContent(comment);
            $.ajax({type: "POST", url: _context + "/custcommcontroller-addCustRestComment.html", dataType: "json", data: {customerid: _loginid, restaurantid: restaurantid, taste: taste, service: service, environment: environment, recommrate: recommrate, overall: overall, comments: comment}, success: function (json) {
                alert('发表成功');
            }});
            $(this).dialog('destroy');
        }}});
        $("#commentrestdlg").dialog('open');
    }
    commentfoodfromcustomercenter = function (foodtype, foodid, restaurantid, restaurantname, foodname) {
        $("#commentfooddlg").dialog({bgiframe: true, draggable: true, autoOpen: false, modal: true, width: commentwidth, title: "食品评论框", open: function (event, ui) {
            $.ajax({type: "POST", url: _context + "/custcommcontroller-isCustomerFoodConsump.html", dataType: "json", data: {customerid: _loginid, foodtype: foodtype, foodid: foodid}, success: function (json) {
                var isconsump = json.isconsump;
                if (isconsump == -1) {
                    $("#foodnoconsump").show();
                    $("#foodeverconsump").hide();
                    $("#foodlgcosumpcnt").hide();
                    $("#foodgivepoints").find('input').each(function () {
                        $(this).attr("disabled", true);
                    });
                    $("#foodgivepoints").css("color", "gray");
                } else if (isconsump == 1) {
                    $("#foodnoconsump").hide();
                    $("#foodeverconsump").show();
                    $("#foodlgcosumpcnt").hide();
                    $("#foodgivepoints").removeAttr("disabled");
                } else {
                    $("#foodnoconsump").hide();
                    $("#foodeverconsump").hide();
                    $("#foodlgcosumpcnt").show();
                    $("#foodgivepoints").find('input').each(function () {
                        $(this).attr("disabled", true);
                    });
                    $("#foodgivepoints").css("color", "gray");
                }
                $("#foodcommentcustomname").text('');
                $("#foodcommentcustomname").text(_loginname);
                iscustomerconsump = isconsump;
            }});
        }, buttons: {'取消': function () {
            $(this).dialog('destroy');
        }, '发表评论': function () {
            var pageno = $("#pageno").val();
            var taste;
            var color;
            var scent;
            var recommendedindex;
            var overall;
            if (iscustomerconsump == -1 || iscustomerconsump == 0) {
                taste = 0;
                color = 0;
                scent = 0;
                recommendedindex = 0;
                overall = 0;
            } else {
                taste = $("input[name='foodtaste']:checked").val();
                color = $("input[name='foodcolor']:checked").val();
                scent = $("input[name='foodscent']:checked").val();
                recommendedindex = $("input[name='foodrecommendindex']:checked").val();
                overall = $("input[name='foodoverall']:checked").val();
            }
            var comment = $("textarea[name='foodcomments']").val();
            if (comment == '我的评论：(不少于5个汉字, 最大可输入2000个汉字)') {
                $("textarea[name='foodcomments']").focus();
                return;
            }
            if (comment == '' || comment.replace(/[^x00-xFF]/g, '**').length < 10) {
                $("textarea[name='foodcomments']").val("我的评论：(不少于5个汉字, 最大可输入2000个汉字)");
                return;
            }
            comment = setContent(comment);
            $.ajax({type: "POST", url: _context + "/custcommcontroller-addCustomerFoodComment.html", dataType: "json", data: {customerid: _loginid, foodtype: foodtype, foodid: foodid, taste: taste, color: color, scent: scent, recommendedindex: recommendedindex, restaurantid: restaurantid, foodname: foodname, overall: overall, comments: comment}, success: function (json) {
                alert('发表成功');
            }});
            $(this).dialog('destroy');
        }}});
        $("#commentfooddlg").dialog('open');
    }
    commentfood = function (customerid, customername, foodtype, foodid, restaurantid) {
        $("#commentfooddlg").dialog('open');
    }
    commentfood2 = function (customerid, customername, foodtype, foodid, restaurantid) {
        $("#commentfooddlg2").dialog('open');
    }
    intoRestaurantMain = function (restaurantid) {
        $("form:eq(0)").attr("action", _context + "/restaurantmain-loadpage.html&restaurantid=" + restaurantid);
        $("form:eq(0)").removeAttr("target");
        $("form:eq(0)").attr("method", "post");
        $("form:eq(0)").submit();
    }
    intoRestFlagshipMain = function (restaurantid) {
        $("form:eq(0)").attr("action", _context + "/mainpage-loadflagshippage.html&restaurantid=" + restaurantid);
        $("form:eq(0)").attr("method", "post");
        $("form:eq(0)").submit();
    }
    openRestaurantMain = function (restaurantid) {
        $("form:eq(0)").attr("action", _context + "/restaurantmain-loadpage.html&restaurantid=" + restaurantid);
        $("form:eq(0)").attr("target", '_blank');
        $("form:eq(0)").attr("method", "post");
        $("form:eq(0)").submit();
    }
    closeOpenFoodMenu = function (linkObj) {
        $("#mycartstaticinfo").animate({"width": "0px"}, 800, function () {
            $(".show_my_menu").show();
            $("#mycartstaticinfo").hide();
            $("div[name='mymenu2']").show();
        });
    }
    commonOpenFoodMenu = function (linkObj) {
        $("#mycartstaticinfo").show();
        $("#mycartstaticinfo").css('width', '0px').animate({"width": "252px"}, 800, function () {
            $(".show_my_menu").show();
        });
    }
    commonOpenFoodMenu2 = function (linkObj) {
        $("#mycartstaticinfo").show();
        $("#mycartstaticinfo").css('width', '0px').animate({"width": "252px"}, 800, function () {
            $(".show_my_menu").show();
        });
        $(linkObj).hide();
    }
    updateSetmealDetails = function (items) {
        for (var i = 0; i < items.length; i++) {
            if (items[i].foodtype == 3) {
                var html = '<div class="open_setmeals" id="setmealsdetailopen' + i + '">' + '<a href="javascript:showsetmealsdetails(' + items[i].foodid + ', ' + items[i].curprice + ', ' + i + ')">套餐详情</a></div>' + '<div class="close_setmeals"  id="setmealsdetailclose' + i + '" style="display:none">' + '<a href="javascript:hidesetmealsdetails(' + i + ')">隐藏详情</a></div>';
                $("#searfoodbutton" + i).prepend(html);
            }
        }
    }
    updateDescription = function (items) {
        for (var i = 0; i < items.length; i++) {
            var html = '';
            if (items[i].foodtype == 1) {
                html += '<span>菜　　系：</span>' + items[i].disalcotypename + '<br><span>口　　味：</span>' + items[i].tastename + '<br><span>主要食材：</span>' + items[i].rawmaterialname + '<br><span>制作方法：</span>' + items[i].makingmethod + '<br><span>描　　述：</span>' + items[i].intro;
            } else if (items[i].foodtype == 2) {
                html += '<span>酒　　类：</span>' + items[i].disalcotypename + '<br><span>品　　牌：</span>' + items[i].tastename + '<br><span>酒 精 度：</span>';
                if (items[i].rawmaterialname == '' || items[i].rawmaterialname == null) {
                    html += '无';
                } else {
                    html += items[i].rawmaterialname + '%';
                }
                html += '<br><span>容量：</span>' + items[i].makingmethod + '<br><span>描　　述：</span>' + items[i].intro;
            } else {
                html += '<span> </span><br><span> </span><br><span> </span><br><span>描　　述：</span>' + items[i].intro;
            }
            $("#description" + i).html(html);
        }
    }
    updatePriceArea = function (items) {
        for (var i = 0; i < items.length; i++) {
            var html = '';
            if (items[i].price == '' || items[i].price == undefined || items[i].price == null || items[i].price == 'undefined') {
                html += '<b>　原　价:　</b><span style="color:#999999">时价</span>';
                $("div[name='foodaction" + i + "\']").html('');
            } else {
                if (items[i].specflag == 0 && items[i].discountrate != 10) {
                    html += '<b>　原　价:　</b><span style="color:#999999"><del>￥' + items[i].price + '</del>[' + items[i].discountrate + '折]</span><br><b>　折扣价:　</b><span>￥' + items[i].curprice + '</span>';
                } else if (items[i].specflag == 0 && items[i].discountrate == 10) {
                    html += '<b>　原　价:　</b><span style="color:#999999"><del>￥' + items[i].price + '</del></span><br><b>　折扣价:　</b><span>￥' + items[i].curprice + '</span>';
                } else {
                    html += '<b>　原　价:　</b><span style="color:#999999"><del>￥' + items[i].price + '</del></span><br><b>　特　价:　</b><span>￥' + items[i].curprice + '</span>';
                }
                if (items[i].unitflag != 0 && items[i].unitflag != '' && items[i].unitflag != null && items[i] != 'undefined') {
                    html += '<span>./' + items[i].unitdesc + '</span>';
                }
            }
            $("#pricearea" + i).html(html);
        }
    }
    orderalco = function (restid) {
        $("form:eq(0)").attr("action", _context + '/orderfood-getRestaurantWordSearch.html&restaurantid=' + restid + '&filterobject=allrestfood&foodtype=2');
        $("form:eq(0)").removeAttr("target");
        $("form:eq(0)").attr("method", "post");
        $("form:eq(0)").submit();
    }
    orderMainfood = function (restid) {
        $("form:eq(0)").attr("action", _context + '/orderfood-getRestaurantMainFood.html&restaurantid=' + restid + '&filterobject=allrestfood&foodtype=1');
        $("form:eq(0)").removeAttr("target");
        $("form:eq(0)").attr("method", "post");
        $("form:eq(0)").submit();
    }
    orderSoup = function (restid) {
        $("form:eq(0)").attr("action", _context + '/orderfood-getRestaurantSoups.html&restaurantid=' + restid + '&filterobject=allrestfood&foodtype=1');
        $("form:eq(0)").removeAttr("target");
        $("form:eq(0)").attr("method", "post");
        $("form:eq(0)").submit();
    }
    hidesetmealsdetails = function (index) {
        $("#setmealsdetailopen" + index).show();
        $("#setmealsdetailclose" + index).hide();
        $("#setmealschilds" + index).slideUp();
    }
    showsetmealsdetails = function (setmealsid, curprice, index) {
        $("#setmealsdetailopen" + index).hide();
        $("#setmealsdetailclose" + index).show();
        if ($("#setmealschilds" + index).html() != '') {
            $("#setmealschilds" + index).slideDown();
            return;
        }
        $.ajax({type: "POST", url: _context + "/orderfood-showSetmealsDetails.html", dataType: "json", data: {setmealsid: setmealsid}, success: function (json) {
            var setmealdetails = json.setmealdetails;
            var origitotalprice = json.origitotalprice;
            var html = '<ul>';
            for (var i = 0; i < setmealdetails.length; i++) {
                var j = i + 1;
                html += '<li><div class="serial" >' + j + '.</div><div  class="setmeals_item_pic" >' + '<img src="' + setmealdetails[i].picpath + '" width="50" height="47" onerror="this.src=\'' + _context + '/images/no_pic.gif\'" onclick="javascript:openFoodDetailinfo(' + setmealdetails[i].foodtype + ', ' + setmealdetails[i].foodid + ', ' + setmealdetails[i].restaurantid + ', \'' + setmealdetails[i].restaurantname + '\')"/>' + '</div><div class="setmeats_item_name"><a href="javascript:openFoodDetailinfo(' + setmealdetails[i].foodtype + ', ' + setmealdetails[i].foodid + ', ' + setmealdetails[i].restaurantid + ', \'' + setmealdetails[i].restaurantname + '\')">' + setmealdetails[i].foodname + '</a></div><div class="setmeats_item_price">原价：<strong><del><span style="color: rgb(153, 153, 153); ">￥' + setmealdetails[i].price + '</span></del></strong></div></li>';
            }
            html += '</ul><div class="clear"></div><div style="float:right;margin-right:10px;margin-bottom:10px;padding-top:0px" class="setmeats_item_price">总价：<strong><del><span style="color: rgb(153, 153, 153); ">￥' + origitotalprice + '</span></del></strong><span style="margin-left:20px;color:#A10000"><strong>套餐价：￥' + curprice + '</strong></span></div>';
            $("#setmealschilds" + index).html(html);
            $("#setmealschilds" + index).slideDown();
        }});
    }
    loginRestMap = function (restaurantid) {
        $("form:eq(0)").attr("action", _context + '/restaurantmap-getRestaurantMap.html&restaurantid=' + restaurantid + '&cityname=' + cityname);
        $("form:eq(0)").removeAttr("target");
        $("form:eq(0)").attr("method", "post");
        $("form:eq(0)").submit();
    }
    openRestMap = function (restaurantid) {
        $("form:eq(0)").attr("action", _context + '/restaurantmap-getRestaurantMap.html&restaurantid=' + restaurantid + '&cityname=' + cityname);
        $("form:eq(0)").attr("target", '_blank');
        $("form:eq(0)").attr("method", "post");
        $("form:eq(0)").submit();
    }
    intoFoodDetailinfo = function (foodtype, foodid, restaurantid, restaurantname) {
        $.ajax({type: "POST", url: _context + "/orderfood-getRestaurantfiltertype.html", dataType: "json", data: {restaurantid: restaurantid}, success: function (json) {
            var restaurantfiltertype = json.restaurantfiltertype;
            if (restaurantfiltertype == '0') {
                $("form:eq(0)").attr("action", _context + '/fooddetail-loadPage2.html&foodtype=' + foodtype + '&foodid=' + foodid + '&restaurantid=' + restaurantid + '&restaurantname=' + restaurantname);
                $("form:eq(0)").removeAttr("target");
                $("form:eq(0)").attr("method", "post");
                $("form:eq(0)").submit();
            } else {
                $("form:eq(0)").attr("action", _context + '/fooddetail-loadPage.html&foodtype=' + foodtype + '&foodid=' + foodid + '&restaurantid=' + restaurantid + '&restaurantname=' + restaurantname);
                $("form:eq(0)").removeAttr("target");
                $("form:eq(0)").attr("method", "post");
                $("form:eq(0)").submit();
            }
        }});
    }
    openFoodDetailinfo2 = function (foodtype, foodid, restaurantid, restaurantname) {
        $("form:eq(0)").attr("action", _context + '/fooddetail-loadPage2.html&foodtype=' + foodtype + '&foodid=' + foodid + '&restaurantid=' + restaurantid + '&restaurantname=' + restaurantname);
        $("form:eq(0)").attr("target", '_blank');
        $("form:eq(0)").attr("method", "post");
        $("form:eq(0)").submit();
    }
    openFoodDetailinfo = function (foodtype, foodid, restaurantid, restaurantname) {
        $("form:eq(0)").attr("action", _context + '/fooddetail-loadPage.html&foodtype=' + foodtype + '&foodid=' + foodid + '&restaurantid=' + restaurantid + '&restaurantname=' + restaurantname);
        $("form:eq(0)").attr("target", '_blank');
        $("form:eq(0)").attr("method", "post");
        $("form:eq(0)").submit();
    }
    colFavoriteRest = function (restaurantid) {
        common = function () {
            colAjaxFavoriteRest(restaurantid);
        };
        $.ajax({type: "POST", url: _context + "/custcentercontroller-getLoginid.html", dataType: "json", success: function (json) {
            var _loginid = json.customerid;
            if (_loginid == '' || _loginid == null || _loginid == 'undefined') {
                $("#customerlogindialog").dialog('open');
            } else {
                colAjaxFavoriteRest(restaurantid);
            }
        }});
    }
    colAjaxFavoriteRest = function (restaurantid) {
        $.ajax({type: "POST", url: _context + "/mainpage-restmainaddtofavorite.html", dataType: "json", data: {restaurantid: restaurantid}, success: function (json) {
            bsuccess = json.bsuccess;
            if (bsuccess == true) {
                var ishotvisible = $("#hotratetitle").is(':visible')
                if (ishotvisible) {
                    $.ajax({type: "POST", url: _context + "/restaurantmain-getHotRateByRestid.html", dataType: "json", data: {restaurantid: restaurantid}, success: function (json) {
                        $("#restmain_consumpcounts").html(json.consumpcounts);
                        $("#restmain_consumprk").html(json.consumprk);
                        $("#restmain_commcounts").html(json.commcounts);
                        $("#restmain_commrk").html(json.commrk);
                        $("#restmain_colcounts").html(json.colcounts);
                        $("#restmain_colrk").html(json.colrk);
                        $("#restmain_hotrk").html(json.hotrk);
                        var hotrk = json.hotrk;
                        $("#hotrkpercent").css("width", hotrk * 300 / 100);
                    }});
                }
                $("#colrestsuccessdig").dialog('open');
            } else {
                $("#colrestfaileddig").dialog('open');
            }
        }});
    }
    colFavoriteFood = function (foodid, foodtype, restaurantid) {
        common = function () {
            $.ajax({type: "POST", url: _context + "/mainpage-addToFavorite.html", dataType: "json", data: {foodid: foodid, foodtype: foodtype, restaurantid: restaurantid}, success: function (json) {
                bsuccess = json.bsuccess;
                if (bsuccess == true) {
                    $("#colfoodsuccessdig").dialog('open');
                } else {
                    $("#colfoodfaileddig").dialog('open');
                }
            }});
        };
        $.ajax({type: "POST", url: _context + "/custcentercontroller-getLoginid.html", dataType: "json", success: function (json) {
            var _loginid = json.customerid;
            if (_loginid == '' || _loginid == null || _loginid == 'undefined') {
                $("#customerlogindialog").dialog('open');
            } else {
                $.ajax({type: "POST", url: _context + "/mainpage-addToFavorite.html", dataType: "json", data: {foodid: foodid, foodtype: foodtype, restaurantid: restaurantid}, success: function (json) {
                    bsuccess = json.bsuccess;
                    if (nologin == true) {
                        $("#loginsuggest").dialog("open");
                    }
                    if (bsuccess == true) {
                        $("#colfoodsuccessdig").dialog('open');
                    } else {
                        $("#colfoodfaileddig").dialog('open');
                    }
                }});
            }
        }});
    }
    mouseoverRestComment = function (restaurantid, index) {
        if ($("#evalate_comment" + index).html() != '') {
            $("#evalate_comment" + index).show();
        } else {
            $.ajax({type: "POST", url: _context + "/foodrestsearch-getRestaurantCommentDetails.html", dataType: "json", data: {restaurantid: restaurantid}, success: function (json) {
                var environment = json.environment;
                var qualityofservice = json.qualityofservice;
                var recommendedindex = json.recommendedindex;
                var recommendrate = json.recommendrate;
                var overall = json.overall;
                var totalcnt = json.totalcnt;
                $("#evalate_comment" + index).html(restaurantStarComment(environment, qualityofservice, recommendedindex, overall, recommendrate, totalcnt, restaurantid));
                $("#evalate_comment" + index).show();
            }});
        }
    }
    mouseoverComment = function (foodid, foodtype, index) {
        if ($("#evalate_comment" + index).html() != '') {
            $("#evalate_comment" + index).show();
        } else {
            $.ajax({type: "POST", url: _context + "/foodrestsearch-getCommentDetails.html", dataType: "json", data: {foodid: foodid, foodtype: foodtype}, success: function (json) {
                var foodtaste = json.foodtaste;
                var foodcolor = json.foodcolor;
                var foodscent = json.foodscent;
                var foodoverall = json.foodoverall
                var recommendedindex = json.recommendedindex
                var totalcnt = json.totalcnt;
                $("#evalate_comment" + index).html(foodStarComment(foodtaste, foodcolor, foodscent, foodoverall, recommendedindex, totalcnt, foodid, foodtype));
                $("#evalate_comment" + index).show();
            }});
        }
    }
    mouseoutComment = function (index) {
        $("#evalate_comment" + index).hide();
    }
    mouseoutRestComment = function (index) {
        $("#evalate_comment" + index).hide();
    }
    intoOrderPage = function (restaurantid, restaurantname) {
        $("form:eq(0)").attr("action", _context + "/orderfood-loadPage.html&restaurantid=" + restaurantid);
        $("form:eq(0)").removeAttr("target");
        $("form:eq(0)").attr("method", "post");
        $("form:eq(0)").submit();
    }
    viewFoodAllComments = function (foodid, foodtype) {
        $("form:eq(0)").attr("action", _context + "/custcommcontroller-getPageFoodAllComments.html&foodid=" + foodid + "&foodtype=" + foodtype);
        $("form:eq(0)").removeAttr("target");
        $("form:eq(0)").attr("method", "post");
        $("form:eq(0)").submit();
    }
    viewRestAllComments = function (restaurantid) {
        $("form:eq(0)").attr("action", _context + "/custcommcontroller-getPageRestAllComments.html&restaurantid=" + restaurantid);
        $("form:eq(0)").removeAttr("target");
        $("form:eq(0)").attr("method", "post");
        $("form:eq(0)").submit();
    }
    formatFloat = function (src, pos) {
        return Math.round(src * Math.pow(10, pos)) / Math.pow(10, pos);
    }
    payment = function (orderid, orderseq, orderstatus) {
        $.ajax({type: "POST", url: _context + "/custcentercontroller-valdeliverystatus.html", dataType: "json", data: {orderid: orderseq}, success: function (json) {
            var deliverystatus = json.deliverystatus;
            if (deliverystatus == 'true') {
                $("form:eq(0)").attr("action", _context + "/restdelivery.do?method=paymentfromcustcenter&orderseq=" + orderseq);
                $("form:eq(0)").attr("method", "post");
                $("form:eq(0)").submit();
            } else {
                $.ajax({type: "POST", url: _context + "/custcentercontroller-valorderstatus.html", dataType: "json", data: {orderid: orderseq, orderstatus: orderstatus}, success: function (json) {
                    var orderstatussuccess = json.orderstatussuccess;
                    if (orderstatussuccess == 'true') {
                        $.ajax({type: "POST", url: _context + "/custcentercontroller-validateOrdertime.html", dataType: "json", data: {orderid: orderid}, success: function (json) {
                            var valid = json.valid;
                            if (valid == 'true') {
                                $("form:eq(0)").attr("action", _context + "/custcentercontroller-paymentfromorder.html&orderid=" + orderseq);
                                $("form:eq(0)").attr("method", "post");
                                $("form:eq(0)").submit();
                            } else {
                                $("form:eq(0)").attr("action", _context + "/custcentercontroller-getSeatingbyunvalidtime.html&orderid=" + orderseq);
                                $("form:eq(0)").attr("method", "post");
                                $("form:eq(0)").submit();
                            }
                        }});
                    } else {
                        if ($.browser.msie) {
                            window.location.href = window.location.href;
                        } else {
                            location.reload(true);
                        }
                    }
                }});
            }
        }});
    }
    isNumber = function (s) {
        var Letters = "1234567890";
        var i;
        var c;
        for (i = 0; i < s.length; i++) {
            c = s.charAt(i);
            if (Letters.indexOf(c) == -1) {
                return false;
            }
        }
        return true;
    }
    setContent = function (str) {
        str = str.replace(/<\/?[^>]*>/g, '');
        str.value = str.replace(/[ | ]*\n/g, '\n');
        return str;
    }
    commentrestfrommainpage = function (restaurantid) {
        $("form:eq(0)").attr("action", _context + "/restaurantmain-loadpage.html&restaurantid=" + restaurantid + "#1");
        $("form:eq(0)").removeAttr("target");
        $("form:eq(0)").attr("method", "post");
        $("form:eq(0)").submit();
    }
    mouseoverbulletin = function (obj) {
        $(obj).stop();
    }
    mouseoutbulletin = function (obj) {
        $(obj).start();
    }
    intoRestaurantFamousCooker = function (restid) {
        $("form:eq(0)").attr("action", _context + "/restaurantmain-getFamousCooker.html&restaurantid=" + restid);
        $("form:eq(0)").removeAttr("target");
        $("form:eq(0)").attr("method", "post");
        $("form:eq(0)").submit();
    }
    intoRestaurantFamousFood = function (restid) {
        $("form:eq(0)").attr("action", _context + "/restaurantmain-getFamousFood.html&restaurantid=" + restid);
        $("form:eq(0)").removeAttr("target");
        $("form:eq(0)").attr("method", "post");
        $("form:eq(0)").submit();
    }
    showFacedlg = function () {
        if ($("#online_face_dlg").is(':hidden')) {
            $("#online_face_dlg").show();
        } else {
            $("#online_face_dlg").hide();
        }
    }
    showZX = function () {
        $("#onlinezx").show();
        $("#onlinely").hide();
        $("#bottomsend").show();
        $(".Rline").css('height', '390px');
    }
    showLY = function () {
        $("#onlinezx").hide();
        $("#onlinely").show();
        $("#bottomsend").hide();
        $(".Rline").css('height', '500px');
    }
    clsregisgift = function (obj) {
        if ($("div[name='registergiftdv']").is(":hidden")) {
            $(obj).parent().next().slideDown('slow');
            $(obj).html('关闭');
            $(obj).css('top', '-28px');
        } else {
            $(obj).parent().next().slideUp('slow');
            $(obj).html('注册有礼');
            $(obj).css('top', '-20px');
        }
    }
    restaurantSearch = function () {
        var cityid = $("#cityid").val() == null || $("cityid").val() == undefined || $("#cityid").val() == 'undefined' || $("#cityid").val() == '' ? '287' : $("#cityid").val();
        var keyword = $("#restword").val() == null || $("#restword").val() == undefined || $("#restword").val() == 'undefined' || $("#restword").val() == '' ? '' : $("#restword").val();
        var cityname = $("#cityname").text() == null || $("#cityname").text() == undefined || $("#cityname").text() == 'undefined' || $("#cityname").text() == '' ? '上海' : $("#cityname").text();
        var areaids = $("#areadroprestid").val() == null || $("#areadroprestid").val() == undefined || $("#areadroprestid").val() == 'undefined' || $("#areadroprestid").val() == '' ? '' : $("#areadroprestid").val();
        var areanames = $("#seldroprestareas").text() == null || $("#seldroprestareas").text() == undefined || $("#seldroprestareas").text() == 'undefined' || $("#seldroprestareas").text() == '' ? '' : $("#seldroprestareas").text();
        $("form:eq(0)").attr("action", _context + "/foodrestsearch-loadRestPage.html&cityid=" + cityid + "&areaid=" + areaids + "&cityname=" + cityname + "&areanames=" + encodeURI(encodeURI(areanames)) + "&word=" + encodeURI(encodeURI(keyword)));
        $("form:eq(0)").removeAttr("target");
        $("form:eq(0)").attr("method", "post");
        $("form:eq(0)").submit();
    }
    foodSearch = function () {
        var cityid = $("#cityid").val() == null || $("cityid").val() == undefined || $("#cityid").val() == 'undefined' || $("#cityid").val() == '' ? '287' : $("#cityid").val();
        var keyword = $("#key").val() == null || $("#key").val() == undefined || $("#key").val() == 'undefined' || $("#key").val() == '' ? '' : $("#key").val();
        var cityname = $("#cityname").text() == null || $("#cityname").text() == undefined || $("#cityname").text() == 'undefined' || $("#cityname").text() == '' ? '上海' : $("#cityname").text();
        var areaid = $("#areadropfoodid").val() == null || $("#areadropfoodid").val() == undefined || $("#areadropfoodid").val() == 'undefined' || $("#areadropfoodid").val() == '' ? '' : $("#areadropfoodid").val();
        var areaname = $("#seldropareas").text() == null || $("#seldropareas").text() == undefined || $("#seldropareas").text() == 'undefined' || $("#seldropareas").text() == '' ? '' : $("#seldropareas").text();
        $("form:eq(0)").attr("action", _context + "/foodrestsearch-loadPage.html&cityid=" + cityid + "&cityname=" + cityname + "&areanames=" + encodeURI(encodeURI(areaname)) + "&word=" + encodeURI(encodeURI(keyword)) + "&areaid=" + areaid);
        $("form:eq(0)").removeAttr("target");
        $("form:eq(0)").attr("method", "post");
        $("form:eq(0)").submit();
    }
});
$(document).ready(function () {
    restaurantStarComment = function (A, D, _, F, $, C, B) {
        var E = "<div class=\"evaluate_llist\"><div><ul><li>\u53e3　　\u5473\uff1a　";
        if (_ == 0)E += "<span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (_ < 1.5)E += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (_ >= 1.5 && _ < 2)E += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s05.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (_ >= 2 && _ < 2.5)E += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (_ >= 2.5 && _ < 3)E += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s05.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (_ >= 3 && _ < 3.5)E += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (_ >= 3.5 && _ < 4)E += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s05.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (_ >= 4 && _ < 4.5)E += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (_ >= 4.5 && _ < 5)E += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s05.gif\" /></span>"; else E += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span>";
        E += "<span style=\"color:red;margin-left:17px\"><strong>" + _ + "</strong></span>\u5206</li><li>\u670d　　\u52a1\uff1a　";
        if (D == 0)E += "<span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (D < 1.5)E += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (D >= 1.5 && D < 2)E += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s05.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (D >= 2 && D < 2.5)E += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (D >= 2.5 && D < 3)E += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s05.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (D >= 3 && D < 3.5)E += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (D >= 3.5 && D < 4)E += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span><span><img src=\"" + _context + "/images/foodrestsearch/s05.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (D >= 4 && D < 4.5)E += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (D >= 4.5 && D < 5)E += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s05.gif\" /></span>"; else E += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span>";
        E += "<span style=\"color:red;margin-left:17px\"><strong>" + D + "</strong></span>\u5206</li><li>\u73af　　\u5883\uff1a　";
        if (A == 0)E += "<span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (A < 1.5)E += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (A >= 1.5 && A < 2)E += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s05.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (A >= 2 && A < 2.5)E += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (A >= 2.5 && A < 3)E += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s05.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (A >= 3 && A < 3.5)E += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (A >= 3.5 && A < 4)E += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s05.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (A >= 4 && A < 4.5)E += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (A >= 4.5 && A < 5)E += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s05.gif\" /></span>"; else E += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span>";
        E += "<span style=\"color:red;margin-left:17px\"><strong>" + A + "</strong></span>\u5206</li><li>\u603b\u4f53\u8bc4\u4ef7\uff1a　";
        if (F == 0)E += "<span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (F < 1.5)E += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (F >= 1.5 && F < 2)E += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s05.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (F >= 2 && F < 2.5)E += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (F >= 2.5 && F < 3)E += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s05.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (F >= 3 && F < 3.5)E += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (F >= 3.5 && F < 4)E += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s05.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (F >= 4 && F < 4.5)E += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (F >= 4.5 && F < 5)E += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s05.gif\" /></span>"; else E += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span>";
        E += "<span style=\"color:red;margin-left:17px\"><strong>" + F + "</strong></span>\u5206</li><li>\u63a8\u8350\u6307\u6570\uff1a　";
        if ($ == 0)E += "<span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if ($ < 1.5)E += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if ($ >= 1.5 && $ < 2)E += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s05.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if ($ >= 2 && $ < 2.5)E += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if ($ >= 2.5 && $ < 3)E += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s05.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if ($ >= 3 && $ < 3.5)E += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if ($ >= 3.5 && $ < 4)E += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s05.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if ($ >= 4 && $ < 4.5)E += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if ($ >= 4.5 && $ < 5)E += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span><span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s05.gif\" /></span>"; else E += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span>";
        E += "<span style=\"color:red;margin-left:17px\"><strong>" + $ + "</strong></span>\u5206</li></ul><a href=\"" + _context + "/custcommcontroller-getPageRestAllComments.html&restaurantid=" + B + "\" style=\"width:200px;text-align:right;height:15px;float:right;font-size:12px;font-weight:bold;margin-top:10px\">\u8be6\u60c5\uff08" + C + "\u6761\u8bc4\u8bba\uff09</a><br><br></div></div>";
        return E
    };
    foodStarComment = function (_, G, C, F, A, B, $, E) {
        var D = "<div class=\"evaluate_llist\"><div><ul><li>\u53e3　　\u5473\uff1a　";
        if (_ == 0)D += "<span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (_ < 1.5 && _ > 0)D += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (_ >= 1.5 && _ < 2)D += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s05.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (_ >= 2 && _ < 2.5)D += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (_ >= 2.5 && _ < 3)D += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s05.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (_ >= 3 && _ < 3.5)D += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (_ >= 3.5 && _ < 4)D += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s05.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (_ >= 4 && _ < 4.5)D += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (_ >= 4.5 && _ < 5)D += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s05.gif\" /></span>"; else D += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span>";
        D += "<span style=\"color:red;margin-left:17px\"><strong>" + _ + "</strong></span>\u5206</li><li>\u9999　　\u5473\uff1a　";
        if (C == 0)D += "<span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (C < 1.5 && C > 0)D += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (C >= 1.5 && C < 2)D += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s05.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (C >= 2 && C < 2.5)D += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (C >= 2.5 && C < 3)D += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s05.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (C >= 3 && C < 3.5)D += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (C >= 3.5 && C < 4)D += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s05.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (C >= 4 && C < 4.5)D += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (C >= 4.5 && C < 5)D += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span><span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span><span><img src=\"" + _context + "/images/foodrestsearch/s05.gif\" /></span>"; else D += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span><span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span><span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span>";
        D += "<span style=\"color:red;margin-left:17px\"><strong>" + C + "</strong></span>\u5206</li><li>\u989c　　\u8272\uff1a　";
        if (G == 0)D += "<span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (G < 1.5 && G > 0)D += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (G >= 1.5 && G < 2)D += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s05.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (G >= 2 && G < 2.5)D += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (G >= 2.5 && G < 3)D += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s05.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (G >= 3 && G < 3.5)D += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (G >= 3.5 && G < 4)D += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s05.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (G >= 4 && G < 4.5)D += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (G >= 4.5 && G < 5)D += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s05.gif\" /></span>"; else D += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span>";
        D += "<span style=\"color:red;margin-left:17px\"><strong>" + G + "</strong></span>\u5206</li><li>\u63a8\u8350\u6307\u6570\uff1a　";
        if (A == 0)D += "<span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (A < 1.5 && A > 0)D += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (A >= 1.5 && A < 2)D += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s05.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (A >= 2 && A < 2.5)D += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (A >= 2.5 && A < 3)D += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s05.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (A >= 3 && A < 3.5)D += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (A >= 3.5 && A < 4)D += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s05.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (A >= 4 && A < 4.5)D += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (A >= 4.5 && A < 5)D += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s05.gif\" /></span>"; else D += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span>";
        D += "<span style=\"color:red;margin-left:17px\"><strong>" + A + "</strong></span>\u5206</li><li>\u603b　　\u8bc4\uff1a　";
        if (F == 0)D += "<span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (F < 1.5 && F > 0)D += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (F >= 1.5 && F < 2)D += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s05.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (F >= 2 && F < 2.5)D += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (F >= 2.5 && F < 3)D += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s05.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (F >= 3 && F < 3.5)D += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (F >= 3.5 && F < 4)D += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s05.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (F >= 4 && F < 4.5)D += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\" /></span>"; else if (F >= 4.5 && F < 5)D += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s05.gif\" /></span>"; else D += "<span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span> <span><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" /></span>";
        D += "<span style=\"color:red;margin-left:17px\"><strong>" + F + "</strong></span>\u5206</li></ul><a href=\"" + _context + "/custcommcontroller-getPageFoodAllComments.html&foodid=" + $ + "&foodtype=" + E + "\" style=\"width:200px;text-align:right;height:15px;float:right;font-size:12px;font-weight:bold;margin-top:10px\">\u8be6\u60c5\uff08" + B + "\u6761\u8bc4\u8bba\uff09</a><br><br></div></div>";
        jQuery.trim(D);
        return D
    };
    updateStarComment = function (A) {
        for (var C = 0; C < A.length; C++) {
            var B = A[C].evaluaterate, _ = "";
            if (B == 0)_ += "<img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\"  width=\"15\" height=\"15\" /> <img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\"  width=\"15\" height=\"15\" /> <img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\"  width=\"15\" height=\"15\" /> <img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\"  width=\"15\" height=\"15\" /> <img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\"  width=\"15\" height=\"15\" />"; else if (B < 1.5)_ += "<img src=\"" + _context + "/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" /> <img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\"  width=\"15\" height=\"15\" /> <img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\"  width=\"15\" height=\"15\" /> <img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\"  width=\"15\" height=\"15\" /> <img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\"  width=\"15\" height=\"15\" />"; else if (B >= 1.5 && B < 2)_ += "<img src=\"" + _context + "/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" /> <img src=\"" + _context + "/images/foodrestsearch/s05.gif\" width=\"15\" height=\"15\" /> <img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\"  width=\"15\" height=\"15\" /> <img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\"  width=\"15\" height=\"15\" /> <img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\"  width=\"15\" height=\"15\" />"; else if (B >= 2 && B < 2.5)_ += "<img src=\"" + _context + "/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" /> <img src=\"" + _context + "/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" /> <img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\"  width=\"15\" height=\"15\" /> <img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\"  width=\"15\" height=\"15\" /> <img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\"  width=\"15\" height=\"15\" />"; else if (B >= 2.5 && B < 3)_ += "<img src=\"" + _context + "/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" /> <img src=\"" + _context + "/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" /> <img src=\"" + _context + "/images/foodrestsearch/s05.gif\" width=\"15\" height=\"15\" /> <img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\"  width=\"15\" height=\"15\" /> <img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\"  width=\"15\" height=\"15\" />"; else if (B >= 3 && B < 3.5)_ += "<img src=\"" + _context + "/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" /> <img src=\"" + _context + "/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" /> <img src=\"" + _context + "/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" /> <img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\"  width=\"15\" height=\"15\" /> <img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\"  width=\"15\" height=\"15\" />"; else if (B >= 3.5 && B < 4)_ += "<img src=\"" + _context + "/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" /> <img src=\"" + _context + "/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" /> <img src=\"" + _context + "/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" /> <img src=\"" + _context + "/images/foodrestsearch/s05.gif\" width=\"15\" height=\"15\" /> <img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\"  width=\"15\" height=\"15\" />"; else if (B >= 4 && B < 4.5)_ += "<img src=\"" + _context + "/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" /> <img src=\"" + _context + "/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" /> <img src=\"" + _context + "/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" /> <img src=\"" + _context + "/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" /> <img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\"  width=\"15\" height=\"15\" />"; else if (B >= 4.5 && B < 5)_ += "<img src=\"" + _context + "/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" /><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" /><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" /><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" /><img src=\"" + _context + "/images/foodrestsearch/s05.gif\" width=\"15\" height=\"15\" />"; else _ += "<img src=\"" + _context + "/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" /><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" /><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" /><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" /><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" />";
            $("#commentstar" + C).prepend(_)
        }
    };
    returnrestmapstar = function (B, A, $) {
        var _ = "<div class=\"wjx\" onmouseover=\"javascript:mouseoverRestComment(" + A + ", " + $ + ");\" id=\"commentstar" + $ + "\">";
        if (B == 0)_ += "<img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\"  width=\"15\" height=\"15\" /><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\"  width=\"15\" height=\"15\" /><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\"  width=\"15\" height=\"15\" /><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\"  width=\"15\" height=\"15\" /><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\"  width=\"15\" height=\"15\" />"; else if (B < 1.5)_ += "<img src=\"" + _context + "/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" /><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\"  width=\"15\" height=\"15\" /><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\"  width=\"15\" height=\"15\" /><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\"  width=\"15\" height=\"15\" /><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\"  width=\"15\" height=\"15\" />"; else if (B >= 1.5 && B < 2)_ += "<img src=\"" + _context + "/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" /><img src=\"" + _context + "/images/foodrestsearch/s05.gif\" width=\"15\" height=\"15\" /><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\"  width=\"15\" height=\"15\" /><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\"  width=\"15\" height=\"15\" /><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\"  width=\"15\" height=\"15\" />"; else if (B >= 2 && B < 2.5)_ += "<img src=\"" + _context + "/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" /><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" /><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\"  width=\"15\" height=\"15\" /><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\"  width=\"15\" height=\"15\" /><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\"  width=\"15\" height=\"15\" />"; else if (B >= 2.5 && B < 3)_ += "<img src=\"" + _context + "/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" /><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" /><img src=\"" + _context + "/images/foodrestsearch/s05.gif\" width=\"15\" height=\"15\" /><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\"  width=\"15\" height=\"15\" /><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\"  width=\"15\" height=\"15\" />"; else if (B >= 3 && B < 3.5)_ += "<img src=\"" + _context + "/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" /><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" /><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" /><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\"  width=\"15\" height=\"15\" /><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\"  width=\"15\" height=\"15\" />"; else if (B >= 3.5 && B < 4)_ += "<img src=\"" + _context + "/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" /><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" /><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" /><img src=\"" + _context + "/images/foodrestsearch/s05.gif\" width=\"15\" height=\"15\" /><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\"  width=\"15\" height=\"15\" />"; else if (B >= 4 && B < 4.5)_ += "<img src=\"" + _context + "/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" /><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" /><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" /><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" /><img src=\"" + _context + "/images/foodrestsearch/kong_03.gif\"  width=\"15\" height=\"15\" />"; else if (B >= 4.5 && B < 5)_ += "<img src=\"" + _context + "/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" /><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" /><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" /><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" /><img src=\"" + _context + "/images/foodrestsearch/s05.gif\" width=\"15\" height=\"15\" />"; else _ += "<img src=\"" + _context + "/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" /><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" /><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" /><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" /><img src=\"" + _context + "/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" />";
        _ += "<div class=\"evaluate\" id=\"evalate_comment" + $ + "\"></div></div>";
        return _
    }
})
$(document).ready(function () {
    getCartTotalnums = function (C) {
        var A = 0, _ = new String(C), B = _.split("|"), $ = 3;
        while ($ < B.length) {
            A += parseInt(B[$]);
            $ += 5
        }
        return A
    };
    getCartTotalPrice = function (C) {
        var $ = 0, _ = new String(C), B = _.split("|"), A = 2;
        while (A < B.length) {
            $ += formatFloat(B[A], 2);
            A += 5
        }
        $ = formatFloat($, 2);
        return $
    };
    if ($.cookie("cartcookie") != null) {
        var C = $.cookie("cartcookie");
        $("#totalfoodnums").html("");
        $("#totalfoodmoney").html("");
        $("#totalfoodnums").prepend(getCartTotalnums(C));
        $("#totalfoodmoney").append(getCartTotalPrice(C))
    } else {
        $("#totalfoodnums").html("");
        $("#totalfoodmoney").html("");
        $("#totalfoodnums").prepend("0");
        $("#totalfoodmoney").append("0")
    }
    var B = setInterval("showcartdetailinfo()", 1000);
    showcartdetailinfo = function () {
        var E = $.cookie("cartcookie");
        if (E != "" && E != null) {
            var B = new String(E), D = B.split("|"), A = getCartDiv(D), C = getCartTotalnums(E), _ = getCartTotalPrice(E);
            $("#totalfoodnums").text("");
            $("#totalfoodnums").text(C);
            $("#totalfoodmoney").text("");
            $("#totalfoodmoney").text(_);
            $("#cart_list ul").html(A);
            $("#cart_list").show()
        } else {
            $("#cart_list ul").html("");
            $("#cart_list").show();
            $("#totalfoodnums").text("");
            $("#totalfoodnums").text("0");
            $("#totalfoodmoney").text("");
            $("#totalfoodmoney").text("0")
        }
    };
    getCartDiv = function (_) {
        var D = "", B = getModelObject(), C = xmlGetElementsByName(B, "item", "cartdetailinfo"), $ = getModelKeys(C[0]), F = jQuery.trim(getModelValue(C[0]));
        for (var E = 0; E < _.length; E = E + 5) {
            var A = F;
            A = modelReplace(A, $, [_context, _[E + 4], E, _[E], _[E + 1], _[E + 2], _[E + 3]]);
            D += A
        }
        return D
    };
    getCartHeadDiv = function (F, $) {
        var D = "", B = getModelObject(), C = xmlGetElementsByName(B, "item", "cartheadinfo"), _ = getModelKeys(C[0]), E = jQuery.trim(getModelValue(C[0])), A = E;
        A = modelReplace(A, _, [_context, F, $]);
        D += A;
        return D
    };
    covertdetailinfo = function () {
        $("#cart_list").slideUp()
    };
    var A = {path: _context + "/", domain: "cdian.cn"}, _ = {expires: -1, path: _context + "/", domain: "cdian.cn"};
    delAddCartQuantity = function (B, K, _, M) {
        var L = $("#cartquantiy" + B).val();
        if (K == 0)$("#cartquantiy" + B).val(parseInt(L) + 1); else if (L > 1)$("#cartquantiy" + B).val(parseInt(L) - 1);
        var N = $.cookie("cartcookie"), F = new String(N), G = F.split("|"), H = 0;
        while (H < G.length) {
            if (_ == G[H] && M == G[H + 1]) {
                var D = G[H + 3], J = G[H + 2], C = formatFloat(formatFloat(J, 2) / parseInt(D), 2);
                G[H + 3] = parseInt($("#cartquantiy" + B).val());
                G[H + 2] = formatFloat(C * parseInt($("#cartquantiy" + B).val()), 2)
            }
            H += 5
        }
        var I = G[0];
        for (var E = 1; E < G.length; E++)I += "|" + G[E];
        N = I;
        $.cookie("cartcookie", N, A)
    };
    delCartRecord = function (B, C) {
        $("#delrecdig").dialog({bgiframe: true, draggable: true, modal: true, buttons: {"\u53d6\u6d88": function () {
            $(this).dialog("close")
        }, "\u786e\u8ba4": function () {
            var I = $.cookie("cartcookie"), G = new String(I), H = G.split("|"), E = new Array(), J = 0, F = 0;
            while (J < H.length) {
                if (!(B == H[J] && C == H[J + 1])) {
                    E[F] = H[J];
                    E[F + 1] = H[J + 1];
                    E[F + 2] = H[J + 2];
                    E[F + 3] = H[J + 3];
                    E[F + 4] = H[J + 4];
                    F += 5
                }
                J += 5
            }
            if (E.length > 0) {
                var D = E[0];
                for (F = 1; F < E.length; F++)D += "|" + E[F];
                I = D;
                $.cookie("cartcookie", I, A)
            } else $.cookie("cartcookie", null, _);
            $(this).dialog("destroy")
        }}});
        $("#delrecdig").dialog("open")
    }
})