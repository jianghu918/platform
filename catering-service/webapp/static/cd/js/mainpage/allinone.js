$(document).ready(function () {
    displayfoodlabel = function (_) {
        if (_ == 0)$("#labelforsearchfood").hide(); else {
            var A = $("#key").val();
            if (A == "")$("#labelforsearchfood").show()
        }
        setTimeout(function () {
            $("#search_suggest").hide()
        }, 500)
    };
    displaymaplabel = function (_) {
        if (_ == 0)$("#searchmapwordlabel").hide(); else {
            var A = $("#searchmapword").val();
            if (A == "")$("#searchmapwordlabel").show()
        }
        setTimeout(function () {
            $("#search_map_suggest").hide()
        }, 500)
    };
    displayrestlabel = function (_) {
        if (_ == 0)$("#labelforsearchrest").hide(); else {
            var A = $("#restword").val();
            if (A == "")$("#labelforsearchrest").show()
        }
        setTimeout(function () {
            $("#search_rest_suggest").hide()
        }, 500)
    };
    isSearchInputValue = function () {
        var A = $("#restword").val(), B = $("#key").val(), _ = $("#searchmapword").val();
        if (A != "")$("#labelforsearchrest").hide();
        if (B != "")$("#labelforsearchfood").hide();
        if (_ != "")$("#searchmapwordlabel").hide()
    }
})
$(document).ready(function () {
    ajaxsuggestshow();
    var highlightindex = -1;
    var timeoutId;
    $("#searchmapword").keyup(function (event) {
        var myEvent = event || window.event;
        var keyCode = myEvent.keyCode;
        if ((keyCode >= 65 && keyCode <= 90) || (keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105) || keyCode == 46 || keyCode == 8 || keyCode == 32) {
            var wordText = jQuery.trim($("#searchmapword").val());
            var areaname = $("#seldropmapareas").html();
            var quartername = $("#seldropmapquarters").html();
            var autoNode = $("#search_map_suggest");
            var cityname = jQuery.trim($("#cityname").text());
            if (wordText != '' && wordText.length > 0) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(function () {
                    $.ajax({type: "POST", url: _context + "/search-getIndexRestMapWords.html", data: {word: wordText, areaname: areaname, quartername: quartername, cityname: cityname}, dataType: "json", success: function (json) {
                        var wordNodes = json.words;
                        autoNode.html(" ");
                        var htmlContent = '<ul>';
                        for (var m = 0; m < wordNodes.length; m++) {
                            htmlContent += '<li id=' + m + ' onclick="javascript:selRestMapWord(' + m + ')" onmouseover="javascript:mouseOutRestMap(this);" onmouseout="javascript:mouseOverRestMap(this);"><div class="result_name" id="indexrestmapword' + m + '">' + wordNodes[m].restname + '</div>' + '<div class="statistic">' + wordNodes[m].restaddress + '</div></li>';
                        }
                        ;
                        htmlContent += '</ul>';
                        autoNode.html(htmlContent);
                        if (wordNodes.length > 0) {
                            autoNode.show();
                        } else {
                            autoNode.hide();
                            highlightindex = -1;
                        }
                    }});
                }, 250);
            } else {
                autoNode.hide();
                highlightindex = -1;
            }
        } else if (keyCode == 38 || keyCode == 40) {
            if (keyCode == 38) {
                var autoNodes = $("#search_map_suggest").children("ul");
                autoNodes = autoNodes.children("li");
                if (highlightindex != -1) {
                    autoNodes.eq(highlightindex).css("background-color", "#EEEEEE");
                    highlightindex--;
                } else {
                    highlightindex = autoNodes.length - 1;
                }
                if (highlightindex == -1) {
                    highlightindex = autoNodes.length - 1;
                }
                autoNodes.eq(highlightindex).css("background-color", "#F8DA44");
            }
            if (keyCode == 40) {
                var autoNodes1 = $("#search_map_suggest").children("ul");
                autoNodes1 = autoNodes1.children("li");
                if (highlightindex != -1 && highlightindex != autoNodes1.length) {
                    autoNodes1.eq(highlightindex).css("background-color", "#EEEEEE");
                    highlightindex++;
                }
                if (highlightindex == -1) {
                    highlightindex = 0;
                }
                if (highlightindex == autoNodes1.length) {
                    highlightindex = 0;
                }
                autoNodes1.eq(highlightindex).css("background-color", "#F8DA44");
            }
        } else if (keyCode == 13) {
            if (highlightindex != -1) {
                var comText = $("#search_map_suggest").hide().find('li').eq(highlightindex).find('div:eq(0)').html();
                highlightindex = -1;
                $("#searchmapword").val(comText);
                searchRestMap();
            }
            else {
                $("#search_map_suggest").hide();
                $("#searchmapword").get(0).blur();
                if ($("#searchmapword").val() != '') {
                    searchRestMap();
                }
            }
        }
    });
    mouseOutRestMap = function (obj) {
        $("#search_map_suggest ul").find('li').each(function () {
            $(this).css("background-color", "#EEEEEE");
        })
        highlightindex = $(obj).attr("id");
        $(obj).css("background-color", "#F8DA44");
    }
    mouseOverRestMap = function (obj) {
        $(obj).css("background-color", "#EEEEEE");
    }
    selRestMapWord = function (m) {
        $("#searchmapwordlabel").hide();
        $("#searchmapword").val($("#indexrestmapword" + m).text());
        $("#search_map_suggest").hide();
        searchRestMap();
    }
    $("#restword").keyup(function (event) {
        var myEvent = event || window.event;
        var keyCode = myEvent.keyCode;
        if ((keyCode >= 65 && keyCode <= 90) || (keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105) || keyCode == 46 || keyCode == 8 || keyCode == 32) {
            var wordText = jQuery.trim($("#restword").val());
            var autoNode = $("#search_rest_suggest");
            var areaname = $("#seldroprestareas").html();
            var cityname = jQuery.trim($("#cityname").text());
            if (wordText != '' && wordText != null && wordText.length > 0) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(function () {
                    $.ajax({type: "POST", url: _context + "/search-getIndexRestWords.html", data: {word: wordText, cityname: cityname, areaname: areaname}, dataType: "json", success: function (json) {
                        var wordNodes = json.words;
                        autoNode.html(" ");
                        var htmlContent = '<ul>';
                        for (var m = 0; m < wordNodes.length; m++) {
                            htmlContent += '<li id=' + m + ' onclick="javascript:selRestWord(' + m + ')" onmouseover="javascript:mouseOutRest(this);" onmouseout="javascript:mouseOverRest(this);"><div class="result_name" id="indexrestword' + m + '">' + wordNodes[m].restname + '</div>' + '<div class="statistic">' + wordNodes[m].restaddress + '</div></li>'
                        }
                        ;
                        htmlContent += '</ul>';
                        autoNode.html(htmlContent);
                        if (wordNodes.length > 0) {
                            autoNode.show();
                        } else {
                            autoNode.hide();
                            highlightindex = -1;
                        }
                    }});
                }, 250);
            } else {
                autoNode.hide();
                highlightindex = -1;
            }
        } else if (keyCode == 38 || keyCode == 40) {
            if (keyCode == 38) {
                var autoNodes = $("#search_rest_suggest").children("ul");
                autoNodes = autoNodes.children("li");
                if (highlightindex != -1) {
                    autoNodes.eq(highlightindex).css("background-color", "#EEEEEE");
                    highlightindex--;
                } else {
                    highlightindex = autoNodes.length - 1;
                }
                if (highlightindex == -1) {
                    highlightindex = autoNodes.length - 1;
                }
                autoNodes.eq(highlightindex).css("background-color", "#F8DA44");
            }
            if (keyCode == 40) {
                var autoNodes1 = $("#search_rest_suggest").children("ul");
                autoNodes1 = autoNodes1.children("li");
                if (highlightindex != -1 && highlightindex != autoNodes1.length) {
                    autoNodes1.eq(highlightindex).css("background-color", "#EEEEEE");
                    highlightindex++;
                }
                if (highlightindex == -1) {
                    highlightindex = 0;
                }
                if (highlightindex == autoNodes1.length) {
                    highlightindex = 0;
                }
                autoNodes1.eq(highlightindex).css("background-color", "#F8DA44");
            }
        } else if (keyCode == 13) {
            if (highlightindex != -1) {
                var comText = $("#search_rest_suggest").hide().find('li').eq(highlightindex).find('div:eq(0)').html();
                highlightindex = -1;
                $("#restword").val(comText);
                restaurantSearch();
            } else {
                $("#search_rest_suggest").hide();
                $("#restword").get(0).blur();
                if ($("#restword").val() != '') {
                    restaurantSearch();
                }
            }
        }
    });
    mouseOutRest = function (obj) {
        $("#search_rest_suggest ul").find('li').each(function () {
            $(this).css("background-color", "#EEEEEE");
        })
        highlightindex = $(obj).attr("id");
        $(obj).css("background-color", "#F8DA44");
    }
    mouseOverRest = function (obj) {
        $(obj).css("background-color", "#EEEEEE");
    }
    selRestWord = function (m) {
        $("#labelforsearchrest").hide();
        $("#restword").val($("#indexrestword" + m).text());
        $("#search_rest_suggest").hide();
        restaurantSearch();
    }
    $("#key").keyup(function (event) {
        var myEvent = event || window.event;
        var keyCode = myEvent.keyCode;
        if ((keyCode >= 65 && keyCode <= 90) || (keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105) || keyCode == 46 || keyCode == 8 || keyCode == 32) {
            var wordText = jQuery.trim($("#key").val());
            var autoNode = $("#search_suggest");
            var cityname = jQuery.trim($("#cityname").text());
            var areaname = $("#seldropareas").html();
            if (wordText != '' && wordText.length > 0) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(function () {
                    $.ajax({type: "POST", url: _context + "/search-getIndexWords.html", data: {word: wordText, cityname: cityname, areaname: areaname}, dataType: "json", success: function (json) {
                        var wordNodes = json.words;
                        autoNode.html(" ");
                        var htmlContent = '<ul>';
                        for (var m = 0; m < wordNodes.length; m++) {
                            htmlContent += '<li id=' + m + '  onclick="javascript:selWord(' + m + ')" onmouseover="javascript:mouseOut(this);" onmouseout="javascript:mouseOver(this);"><div class="result_name" id="indexword' + m + '" >' + wordNodes[m].word + '</div>' + '<div class="statistic">' + wordNodes[m].statistic + '条结果</div></li>'
                            htmlContent += '<div class="clear"></div>';
                        }
                        ;
                        htmlContent += '</ul>';
                        autoNode.html(htmlContent);
                        if (wordNodes.length > 0) {
                            autoNode.show();
                        } else {
                            autoNode.hide();
                            highlightindex = -1;
                        }
                    }});
                }, 250);
            } else {
                autoNode.hide();
                highlightindex = -1;
            }
        } else if (keyCode == 38 || keyCode == 40) {
            if (keyCode == 38) {
                var autoNodes = $("#search_suggest").children("ul");
                autoNodes = autoNodes.children("li");
                if (highlightindex != -1) {
                    autoNodes.eq(highlightindex).css("background-color", "#EEEEEE");
                    highlightindex--;
                } else {
                    highlightindex = autoNodes.length - 1;
                }
                if (highlightindex == -1) {
                    highlightindex = autoNodes.length - 1;
                }
                autoNodes.eq(highlightindex).css("background-color", "#F8DA44");
            }
            if (keyCode == 40) {
                var autoNodes1 = $("#search_suggest").children("ul");
                autoNodes1 = autoNodes1.children("li");
                if (highlightindex != -1 && highlightindex != autoNodes1.length) {
                    autoNodes1.eq(highlightindex).css("background-color", "#EEEEEE");
                    highlightindex++;
                }
                if (highlightindex == -1) {
                    highlightindex = 0;
                }
                if (highlightindex == autoNodes1.length) {
                    highlightindex = 0;
                }
                autoNodes1.eq(highlightindex).css("background-color", "#F8DA44");
            }
        } else if (keyCode == 13) {
            if (highlightindex != -1) {
                var comText = $("#search_suggest").hide().find('li').eq(highlightindex).find('div:eq(0)').html();
                highlightindex = -1;
                $("#key").val(comText);
                foodSearch();
            }
            else {
                $("#search_suggest").hide();
                $("#key").get(0).blur();
                if ($("#key").val() != '') {
                    foodSearch();
                }
            }
        }
    });
    mouseOut = function (obj) {
        $("#search_suggest ul").find('li').each(function () {
            $(this).css("background-color", "#EEEEEE");
        });
        highlightindex = $(obj).attr("id");
        $(obj).css("background-color", "#F8DA44");
    }
    mouseOver = function (obj) {
        $(obj).css("background-color", "#EEEEEE");
    }
    selWord = function (m) {
        $("#labelforsearchfood").hide();
        $("#key").val($("#indexword" + m).html());
        $("#search_suggest").hide();
        foodSearch();
    }
    sortPricefilter = function () {
        if ($("#filterobject").val() == 'foodrecomm' || $("#filterobject").val() == 'restaurantrecomm') {
            $("#paixu").hide();
            $(".pricerange").hide();
            $(".averagerange").hide();
        } else {
            $("#paixu").show();
            if ($("#filterobject").val() == 'hotfood' || $("#filterobject").val() == 'custoffenfood') {
                $(".pricerange").show();
                $(".averagerange").hide();
                $("#pricesort").text('价格');
            } else {
                $(".pricerange").hide();
                $(".averagerange").show();
                $("#pricesort").text('人均');
            }
        }
    }
    selectPageSize = function (pageSize) {
        var filterobject = $("#filterobject").val();
        if (filterobject == '') {
            filterobject = 'restaurantrecomm';
        }
        var newsorttype = $("#sorttype").val();
        if (newsorttype == '' || newsorttype == null) {
            newsorttype = '0';
        }
        var pricerangesel = $("#pricerangesel").val();
        if (pricerangesel == null || pricerangesel == '') {
            pricerangesel = 'x';
        }
        var averagerangesel = $("#averagerangesel").val();
        if (averagerangesel == '' || averagerangesel == null) {
            averagerangesel = 'x';
        }
        var hashstr = filterobject + '_1_' + pageSize + '_' + newsorttype + '_' + averagerangesel + '_' + pricerangesel;
        hashstr = hashstr.replace(/^.*#/, '');
        $.historyLoad(hashstr);
    }
    loadData = function () {
        $("#header").find('li').removeClass('current');
        $("#header").find('li:eq(0)').addClass('current');
        if (_loginid != '') {
            changelogsyle();
        } else {
            changelogstyle1();
        }
        isSearchInputValue();
    }
    selectPricerange = function (obj) {
        var filterobject = $("#filterobject").val();
        if (filterobject == '') {
            filterobject = 'restaurantrecomm';
        }
        var newsorttype = $("#sorttype").val();
        if (newsorttype == '' || newsorttype == null) {
            newsorttype = '0';
        }
        var pageSize = $("#pageSize").val();
        if (pageSize == '') {
            pageSize = '10';
        }
        $("#pricerangesel").val('');
        $("#pricerangesel").val($(obj).val());
        var pricerangesel = $("#pricerangesel").val();
        if (pricerangesel == null || pricerangesel == '') {
            pricerangesel = 'x';
        }
        var averagerangesel = $("#averagerangesel").val();
        if (averagerangesel == '' || averagerangesel == null) {
            averagerangesel = 'x';
        }
        var hashstr = filterobject + '_1_' + pageSize + '_' + newsorttype + '_' + averagerangesel + '_' + pricerangesel;
        hashstr = hashstr.replace(/^.*#/, '');
        $.historyLoad(hashstr);
    }
    selectaveragerange = function (obj) {
        var filterobject = $("#filterobject").val();
        if (filterobject == '') {
            filterobject = 'restaurantrecomm';
        }
        var newsorttype = $("#sorttype").val();
        if (newsorttype == '' || newsorttype == null) {
            newsorttype = '0';
        }
        var pageSize = $("#pageSize").val();
        if (pageSize == '') {
            pageSize = '10';
        }
        $("#averagerangesel").val('');
        $("#averagerangesel").val($(obj).val());
        var pricerangesel = $("#pricerangesel").val();
        if (pricerangesel == null || pricerangesel == '') {
            pricerangesel = 'x';
        }
        var averagerangesel = $("#averagerangesel").val();
        if (averagerangesel == '' || averagerangesel == null) {
            averagerangesel = 'x';
        }
        var hashstr = filterobject + '_1_' + pageSize + '_' + newsorttype + '_' + averagerangesel + '_' + pricerangesel;
        hashstr = hashstr.replace(/^.*#/, '');
        $.historyLoad(hashstr);
    }
    sortbyprice = function (obj) {
        var filterobject = $("#filterobject").val();
        if (filterobject == '') {
            filterobject = 'restaurantrecomm';
        }
        var sorttype = $("#sorttype").val();
        if (sorttype == 'priceasc') {
            $("#sorttype").val('pricedesc');
        } else if (sorttype == 'pricedesc') {
            $("#sorttype").val('priceasc');
        } else {
            $("#sorttype").val('priceasc');
        }
        var newsorttype = $("#sorttype").val();
        if (newsorttype == '' || newsorttype == null) {
            newsorttype = '0';
        }
        var pageSize = $("#pageSize").val();
        if (pageSize == '') {
            pageSize = '10';
        }
        var pricerangesel = $("#pricerangesel").val();
        if (pricerangesel == null || pricerangesel == '') {
            pricerangesel = 'x';
        }
        var averagerangesel = $("#averagerangesel").val();
        if (averagerangesel == '' || averagerangesel == null) {
            averagerangesel = 'x';
        }
        var hashstr = filterobject + '_1_' + pageSize + '_' + newsorttype + '_' + averagerangesel + '_' + pricerangesel;
        hashstr = hashstr.replace(/^.*#/, '');
        $.historyLoad(hashstr);
    }
    sortbyeval = function (obj) {
        var filterobject = $("#filterobject").val();
        if (filterobject == '') {
            filterobject = 'restaurantrecomm';
        }
        var sorttype = $("#sorttype").val();
        if (sorttype == 'evaluateasc') {
            $("#sorttype").val('evaluatedesc');
        } else if (sorttype == 'evaluatedesc') {
            $("#sorttype").val('evaluateasc');
        } else {
            $("#sorttype").val('evaluateasc');
        }
        var newsorttype = $("#sorttype").val();
        if (newsorttype == '' || newsorttype == null) {
            newsorttype = '0';
        }
        var pageSize = $("#pageSize").val();
        if (pageSize == '') {
            pageSize = '10';
        }
        var pricerangesel = $("#pricerangesel").val();
        if (pricerangesel == null || pricerangesel == '') {
            pricerangesel = 'x';
        }
        var averagerangesel = $("#averagerangesel").val();
        if (averagerangesel == '' || averagerangesel == null) {
            averagerangesel = 'x';
        }
        var hashstr = filterobject + '_1_' + pageSize + '_' + newsorttype + '_' + averagerangesel + '_' + pricerangesel;
        hashstr = hashstr.replace(/^.*#/, '');
        $.historyLoad(hashstr);
    }
    delAddQuantity = function (index, action) {
        var quantity = $("#quantity" + index).val();
        if (action == 0) {
            $("#quantity" + index).val(parseInt(quantity) + 1);
        } else {
            if (quantity > 1) {
                $("#quantity" + index).val(parseInt(quantity) - 1);
            }
        }
    }
    $("#custoffenfood").click(function () {
        common = function () {
            var hashstr = 'custoffenfood_1_10_0_x_x';
            hashstr = hashstr.replace(/^.*#/, '');
            $.historyLoad(hashstr);
        }
        $.ajax({type: "POST", url: _context + "/custcentercontroller-getLoginid.html", dataType: "json", success: function (json) {
            var _loginid = json.customerid;
            if (_loginid == '' || _loginid == null || _loginid == 'undefined') {
                $("#customerlogindialog").dialog('open');
            } else {
                var hashstr = 'custoffenfood_1_10_0_x_x';
                hashstr = hashstr.replace(/^.*#/, '');
                $.historyLoad(hashstr);
            }
        }});
    });
    $("#custoffenrest").click(function () {
        common = function () {
            var hashstr = 'custoffenrest_1_10_0_x_x';
            hashstr = hashstr.replace(/^.*#/, '');
            $.historyLoad(hashstr);
        }
        $.ajax({type: "POST", url: _context + "/custcentercontroller-getLoginid.html", dataType: "json", success: function (json) {
            var _loginid = json.customerid;
            if (_loginid == '' || _loginid == null || _loginid == 'undefined') {
                $("#customerlogindialog").dialog('open');
            } else {
                var hashstr = 'custoffenrest_1_10_0_x_x';
                hashstr = hashstr.replace(/^.*#/, '');
                $.historyLoad(hashstr);
            }
        }});
    });
    $("#hotfood").click(function () {
        var hashstr = 'hotfood_1_10_0_x_x';
        hashstr = hashstr.replace(/^.*#/, '');
        $.historyLoad(hashstr);
    });
    $("#hotrestaurant").click(function () {
        var hashstr = 'hotrestaurant_1_10_0_x_x';
        hashstr = hashstr.replace(/^.*#/, '');
        $.historyLoad(hashstr);
    });
    $("#foodrecomm").click(function () {
        var hashstr = 'foodrecomm_1_10_0_x_x';
        hashstr = hashstr.replace(/^.*#/, '');
        $.historyLoad(hashstr);
    })
    $("#restaurantrecomm").click(function () {
        var hashstr = 'restaurantrecomm_1_10_0_x_x';
        hashstr = hashstr.replace(/^.*#/, '');
        $.historyLoad(hashstr);
    })
    clickMainpageMenu = function () {
        var filterobject = $("#filterobject").val();
        var pageno = $("#pageno").val();
        var cityid = $("#cityid").val();
        var sorttype = $("#sorttype").val();
        var pricerange = $("#pricerangesel").val();
        var averagerange = $("#averagerangesel").val();
        var pageSize = $("#pageSize").val();
        var number = Math.random();
        if (filterobject == 'hotfood' || filterobject == 'foodrecomm' || filterobject == 'custoffenfood') {
            $.ajax({type: "POST", url: _context + "/mainpage-getMenuList.html", dataType: "json", data: {pageSize: pageSize, pageno: pageno, filterobject: filterobject, cityid: cityid, sorttype: sorttype, pricerange: pricerange, number: number}, success: function (json) {
                var items = json.fooditems;
                if (items.length > 0) {
                    $(".GoodsListWrap").html(getDiv(items));
                    for (var i = 0; i < items.length; i++) {
                        if (items[i].supplytype == 1) {
                            $("#addInCart" + i).html('<span color="#ccc">暂停供应</span>');
                        }
                        if (items[i].specflag == 1) {
                            $("#specflag" + i).show();
                            $("#pricedesc" + i).text("");
                            $("#pricedesc" + i).text("特价");
                        } else {
                            $("#specflag" + i).hide();
                            $("#pricedesc" + i).text("");
                            $("#pricedesc" + i).text("折扣价");
                        }
                        if (items[i].unitflag == 0 || items[i].unitflag == '') {
                            $("#unitflag" + i).text("");
                        } else if (items[i].unitflag == 1) {
                            $("#unitflag" + i).text("_25E4_25BD_258D");
                        } else if (items[i].unitflag == 2) {
                            $("#unitflag" + i).text("_25E6_2596_25A4");
                        } else if (items[i].unitflag == 3) {
                            $("#unitflag" + i).text("_25E4_25BF_25A9");
                        } else if (items[i].unitflag == 4) {
                            $("#unitflag" + i).text("_25E6_2589_2593");
                        } else if (items[i].unitflag == 5) {
                            $("#unitflag" + i).text("_25E5_258D_258A_25E6_2589_2593");
                        } else if (items[i].unitflag == 6) {
                            $("#unitflag" + i).text("_25E5_258F_25AA");
                        } else if (items[i].unitflag == 7) {
                            $("#unitflag" + i).text("_25E5_258D_258A_25E5_258F_25AA");
                        } else if (items[i].unitflag == 8) {
                            $("#unitflag" + i).text("_25E5_25A4_25A7_25E6_259D_25AF");
                        } else if (items[i].unitflag == 9) {
                            $("#unitflag" + i).text("_25E4_25B8_25AD_25E6_259D_25AF");
                        } else if (items[i].unitflag == 10) {
                            $("#unitflag" + i).text("_25E5_25B0_258F_25E6_259D_25AF");
                        } else if (items[i].unitflag == 11) {
                            $("#unitflag" + i).text("_25E5_2590_25AC ");
                        } else {
                            $("#unitflag" + i).text("");
                        }
                    }
                    $("#totalpage").val("");
                    $("#totalpage").val(json.totalpage);
                    if (json.totalpage > 1) {
                        $("#pager").pager({pagenumber: pageno, pagecount: json.totalpage, buttonClickCallback: PageClick});
                    } else {
                        $("#pager").html('');
                    }
                } else {
                    $("#pager").html("");
                    $(".GoodsListWrap").html("");
                    $(".GoodsListWrap").html('<div class="noticeSign"><h3> 很抱歉！暂无记录，请重新操作！</h3> </div>');
                    $(".GoodsListWrap").show();
                }
                sortPricefilter();
            }});
        } else {
            $.ajax({type: "POST", url: _context + "/mainpage-getMenuList.html", dataType: "json", data: {pageSize: pageSize, pageno: pageno, filterobject: filterobject, cityid: cityid, sorttype: sorttype, averagerange: averagerange, number: number}, success: function (json) {
                var items = json.restitems;
                if (items.length > 0) {
                    $(".GoodsListWrap").html("");
                    $(".GoodsListWrap").html(getRestDiv(items));
                    for (var i = 0; i < items.length; i++) {
                        if (items[i].restfiltertype2 != '0') {
                            $("div[name=restaction" + i + "]").append('<a href=' + _context + '"/autoOrderController-loadPage.html&rid=' + items[i].id + '"><div class="auto_booking">自动配餐</div></a>')
                        }
                    }
                    for (var k = 0; k < items.length; k++) {
                        if (items[k].custeatingtype == '1' || items[k].custeatingtype == '2') {
                            $('li[name=isdelivery' + k + ']').show();
                        }
                        if (items[k].promotion) {
                            $('.flags[name=flags' + k + '] img').show();
                        }
                    }
                    $("#totalpage").val(json.totalpage);
                    if (json.totalpage > 1) {
                        $("#pager").pager({pagenumber: pageno, pagecount: json.totalpage, buttonClickCallback: PageClick});
                    } else {
                        $("#pager").html('');
                    }
                } else {
                    $("#pager").html("");
                    $(".GoodsListWrap").html("");
                    $(".GoodsListWrap").html('<div class="noticeSign"><h3> 很抱歉！暂无记录，请重新操作！</h3> </div>');
                    $(".GoodsListWrap").show();
                }
                sortPricefilter();
            }});
        }
    }
    getRestDiv = function (items) {
        var html = '';
        var xmlDom = getModelObject();
        var itemsObj = xmlGetElementsByName(xmlDom, "item", "mainrestpageitem");
        var keys = getModelKeys(itemsObj[0]);
        var modelValue = jQuery.trim(getModelValue(itemsObj[0]));
        var ul = '<ul>';
        for (var i = 0; i < items.length; i++) {
            var item = modelValue;
            item = modelReplace(item, keys, [items[i].name, _context, items[i].recommenddishtype, items[i].avgconsumption, items[i].id, items[i].consumpcnts, items[i].colcnts, items[i].startdiscnt, items[i].enddiscnt, items[i].intro, items[i].averageendconsumption, items[i].picpath, cityname, i]);
            ul += item;
        }
        ul += '</ul>';
        html += ul;
        return html;
    }
    getDiv = function (items) {
        var html = '';
        var xmlDom = getModelObject();
        var itemsObj = xmlGetElementsByName(xmlDom, "item", "mainpageitem");
        var keys = getModelKeys(itemsObj[0]);
        var modelValue = jQuery.trim(getModelValue(itemsObj[0]));
        var ul = '<ul>';
        for (var i = 0; i < items.length; i++) {
            var item = modelValue;
            item = modelReplace(item, keys, [items[i].name, _context, items[i].foodid, items[i].foodtype, items[i].price, items[i].curprice, items[i].restaurantname, items[i].restaurantid, items[i].consumpcnts, items[i].colcnts, items[i].intro, i, items[i].picpath]);
            ul += item;
        }
        ul += '</ul>';
        html += ul;
        return html;
    }
    PageClick = function (pageclickednumber) {
        var totalpages = $("#totalpage").val();
        var body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
        $("#pager").pager({pagenumber: pageclickednumber, pagecount: totalpages, buttonClickCallback: PageClick});
        $("#pageno").val(pageclickednumber);
        var filterobject = $("#filterobject").val();
        if (filterobject == '') {
            filterobject = 'restaurantrecomm';
        }
        var newsorttype = $("#sorttype").val();
        if (newsorttype == '' || newsorttype == null) {
            newsorttype = '0';
        }
        var pageSize = $("#pageSize").val();
        if (pageSize == '') {
            pageSize = '10';
        }
        var pricerangesel = $("#pricerangesel").val();
        if (pricerangesel == null || pricerangesel == '') {
            pricerangesel = 'x';
        }
        var averagerangesel = $("#averagerangesel").val();
        if (averagerangesel == '' || averagerangesel == null) {
            averagerangesel = 'x';
        }
        var hashstr = filterobject + '_' + pageclickednumber + '_' + pageSize + '_' + newsorttype + '_' + averagerangesel + '_' + pricerangesel;
        hashstr = hashstr.replace(/^.*#/, '');
        body.animate({scrollTop: $('#dishlist').offset().top - 100}, 50, function () {
            $.historyLoad(hashstr);
        });
    }
    if (load == 'true') {
        var totalpage = $("#totalpage").val();
        var pageno = $("#pageno").val();
        if (totalpage > 1) {
            $("#pager").pager({pagenumber: pageno, pagecount: totalpage, buttonClickCallback: PageClick});
        }
    }
    $("#disabledZone").ajaxStart(function () {
        $(this).css('visibility', 'visible');
    });
    $("#disabledZone").ajaxStop(function () {
        ajaxsuggesthide();
    });
    covertCity = function () {
        $("#selareas").text("");
        $.ajax({type: "post", url: _context + "/search-getAllCitys.html", dataType: "json", success: function (json) {
            var data = json.citys;
            var html = '<ul>';
            for (var i = 0; i < data.length; i++) {
                if (i != 0 && (i + 1) % 9 == 0) {
                    html += '</ul><ul><li><a  id="cityid' + i + '" onclick="javascript:selectCity(' + data[i].id + ', ' + i + ');">' + data[i].name + '</a></li>';
                } else {
                    html += '<li><a  id="cityid' + i + '" onclick="javascript:selectCity(' + data[i].id + ', ' + i + ');">' + data[i].name + '</a></li>';
                }
            }
            html += '</ul>';
            $("#citynamelist").html(html);
            $("#choosecity").show();
        }});
    }
    selectCity = function (cityid, i) {
        $("#cityid").val(cityid);
        $("#cityname").text($("#cityid" + i + ":parent").text());
        $("#choosecity").hide();
        var filterobject = $("#filterobject").val();
        clickMainMenu(filterobject);
    }
    closeCity = function () {
        $("#choosecity").hide();
    }
    closeArea = function () {
        $(".selfoodpricedroplist").show();
        $(".selrestaveragedroplist").show();
        $("#choosearea").hide();
    }
    convertRestArea = function () {
        closemapArea();
        closeArea();
        var citycode = $("#cityid").val();
        $.ajax({type: "POST", url: _context + "/search-getAreasByCityid.html", dataType: "json", data: {citycode: citycode}, success: function (json) {
            if ($.browser.msie && $.browser.version == '6.0') {
                $(".selrestaveragedroplist").hide();
                $(".selfoodpricedroplist").hide();
            }
            var data = json.areas;
            var html = '<ul>';
            for (var i = 0; i < data.length; i++) {
                html += '<li onclick="javascript:selRestArea(' + data[i].id + ', this)" id="checkbox' + data[i].id + '">' + data[i].name + '</li>';
            }
            html += '</ul>';
            $("#areanamelistforrest").html(html);
            $("#chooserestarea").show();
        }});
    }
    convertArea = function () {
        var citycode = $("#cityid").val();
        $.ajax({type: "POST", url: _context + "/search-getAreasByCityid.html", dataType: "json", data: {citycode: citycode}, success: function (json) {
            if ($.browser.msie && $.browser.version == '6.0') {
                $(".selrestaveragedroplist").hide();
                $(".selfoodpricedroplist").hide();
            }
            var data = json.areas;
            var html = '<ul>';
            for (var i = 0; i < data.length; i++) {
                html += '<li onclick="javascript:selArea(' + data[i].id + ', this)" id="checkbox' + data[i].id + '">' + data[i].name + '</li>';
            }
            html += '</ul>';
            $("#areanamelist").html(html);
            $("#choosearea").show();
        }});
    }
    selRestArea = function (areaid, obj) {
        var areaname = $(obj).text();
        $("#seldroprestareas").html(areaname);
        $("#areadroprestid").val(areaid);
        $("#chooserestarea").hide();
        if ($.browser.msie && $.browser.version == '6.0') {
            $(".selrestaveragedroplist").show();
            $(".selfoodpricedroplist").show();
        }
    }
    closerestArea = function () {
        $(".selrestaveragedroplist").show();
        $(".selfoodpricedroplist").show();
        $("#chooserestarea").hide();
    }
    selArea = function (areaid, obj) {
        var areaname = $(obj).text();
        $("#seldropareas").html(areaname);
        $("#areadropfoodid").val(areaid);
        $("#choosearea").hide();
        if ($.browser.msie && $.browser.version == '6.0') {
            $(".selrestaveragedroplist").show();
            $(".selfoodpricedroplist").show();
        }
    };
    var selcurrent = 'first';
    searchfoods = function () {
        selcurrent = 'second';
        closerestArea();
        closemapArea();
        closeQuarter();
        $("#searchfood").show();
        $("#searchmap").hide();
        $("#searchrest").hide();
        $("#restword").val('');
        displayrestlabel(1)
        $("#searchmapword").val('');
        displaymaplabel(1);
        $("#searchfoodflag").addClass("active");
        $("#searchmapflag").parent().removeClass('first');
        $("#searchmapflag").parent().removeClass('second');
        $("#searchmapflag").parent().removeClass('third');
        $("#searchmapflag").parent().addClass('second');
        $("#searchrestflag").removeClass("active");
        $("#searchmapflag").removeClass("active");
        $("#search_rest_suggest").hide();
        $("#search_map_suggest").hide();
    };
    $("#searchmapflag").hover(function () {
        $("#searchmapflag").parent().removeClass('first');
        $("#searchmapflag").parent().removeClass('second');
        $("#searchmapflag").parent().removeClass('third');
        $("#searchmapflag").parent().addClass('third');
        $("#searchrestflag").removeClass("active");
        $("#searchfoodflag").removeClass("active");
        $(this).addClass("active");
    }, function () {
        $(this).removeClass("active");
        $("#searchmapflag").parent().removeClass('first');
        $("#searchmapflag").parent().removeClass('second');
        $("#searchmapflag").parent().removeClass('third');
        $("#searchmapflag").parent().addClass(selcurrent);
        if (selcurrent == 'first') {
            $("#searchrestflag").addClass("active");
        } else if (selcurrent == 'second') {
            $("#searchfoodflag").addClass("active");
        } else {
            $("#searchmapflag").addClass("active");
        }
    });
    $("#searchfoodflag").hover(function () {
        $("#searchmapflag").parent().removeClass('first');
        $("#searchmapflag").parent().removeClass('second');
        $("#searchmapflag").parent().removeClass('third');
        $("#searchfoodflag").parent().addClass('second');
        $("#searchrestflag").removeClass("active");
        $("#searchmapflag").removeClass("active");
        $(this).addClass("active");
    }, function () {
        $(this).removeClass("active");
        $("#searchmapflag").parent().removeClass('first');
        $("#searchmapflag").parent().removeClass('second');
        $("#searchmapflag").parent().removeClass('third');
        $("#searchmapflag").parent().addClass(selcurrent);
        if (selcurrent == 'first') {
            $("#searchrestflag").addClass("active");
        } else if (selcurrent == 'second') {
            $("#searchfoodflag").addClass("active");
        } else {
            $("#searchmapflag").addClass("active");
        }
    });
    $("#searchrestflag").hover(function () {
        $("#searchmapflag").parent().removeClass('first');
        $("#searchmapflag").parent().removeClass('second');
        $("#searchmapflag").parent().removeClass('third');
        $("#searchrestflag").parent().addClass('first');
        $("#searchfoodflag").removeClass("active");
        $("#searchmapflag").removeClass("active");
        $(this).addClass("active");
    }, function () {
        $(this).removeClass("active");
        $("#searchmapflag").parent().removeClass('first');
        $("#searchmapflag").parent().removeClass('second');
        $("#searchmapflag").parent().removeClass('third');
        $("#searchmapflag").parent().addClass(selcurrent);
        if (selcurrent == 'first') {
            $("#searchrestflag").addClass("active");
        } else if (selcurrent == 'second') {
            $("#searchfoodflag").addClass("active");
        } else {
            $("#searchmapflag").addClass("active");
        }
    });
    searchrests = function () {
        selcurrent = 'first';
        closemapArea();
        closeArea();
        closeQuarter();
        $("#key").val('');
        displayfoodlabel(1);
        $("#searchmapword").val('');
        displaymaplabel(1);
        $("#searchfood").hide();
        $("#searchrest").show();
        $("#searchmap").hide();
        $("#searchrestflag").addClass("active");
        $("#searchmapflag").parent().removeClass('first');
        $("#searchmapflag").parent().removeClass('second');
        $("#searchmapflag").parent().removeClass('third');
        $("#searchmapflag").parent().addClass('first');
        $("#searchfoodflag").removeClass("active");
        $("#searchmapflag").removeClass("active");
        $("#search_suggest").hide();
        $("#search_map_suggest").hide();
    };
    searchmaps = function () {
        selcurrent = 'third';
        closeArea();
        closerestArea();
        closeQuarter();
        $("#searchmap").show();
        $("#searchfood").hide();
        $("#searchrest").hide();
        $("#key").val('');
        displayfoodlabel(1);
        $("#restword").val('');
        displayrestlabel(1);
        $("#searchmapflag").addClass("active");
        $("#searchmapflag").parent().removeClass('first');
        $("#searchmapflag").parent().removeClass('second');
        $("#searchmapflag").parent().removeClass('third');
        $("#searchmapflag").parent().addClass('third');
        $("#searchfoodflag").removeClass("active");
        $("#searchrestflag").removeClass("active");
        $("#search_rest_suggest").hide();
        $("#search_suggest").hide();
        var cityname = $("#cityname").text();
        var cityid = $("#cityid").val();
        if (cityname == '上海') {
            $("#seldropmapareas").html('黄浦');
        }
        if (cityname == '北京') {
            $("#seldropmapareas").html('朝阳');
        }
        var areaname = $("#seldropmapareas").text();
        $.ajax({type: "POST", url: _context + "/search-getAreaidByAreaname.html", dataType: "json", data: {cityid: cityid, areaname: areaname}, success: function (json) {
            var areaid = json.id;
            $("#areadropmapid").val(areaid);
        }});
    };
    selMapAreaDroplist = function (obj) {
        var areacode = $(obj).val();
        var cityid = $("#cityid").val();
        $.ajax({type: "POST", url: _context + "/search-getQuartersByAreaid.html", dataType: "json", data: {areacode: areacode, cityid: cityid}, success: function (json) {
            var data = json.quarters;
            var selhtml = '<option value="">全部</option>';
            for (var i = 0; i < data.length; i++) {
                selhtml += '<option value=' + data[i].id + '>' + data[i].name + '</option>';
            }
            $("#map_quarter_select").html(selhtml);
        }});
    }
    searchRestMap = function () {
        var cityid = $("#cityid").val();
        var areacode = $("#areadropmapid").val();
        var areaname = $("#seldropmapareas").text();
        var quartercode = $("#quartdropmapid").val();
        var quartername = $("#seldropmapquarters").text();
        var searchmapword = $("#searchmapword").val();
        var bval = doValidate(searchmapword);
        if (searchmapword != '' && bval == false) {
            return;
        }
        var cityname = jQuery.trim($("#cityname").text());
    }
    closemapArea = function () {
        $(".selfoodpricedroplist").show();
        $(".selrestaveragedroplist").show();
        $("#choosemaparea").hide();
    }
    convertMapArea = function () {
        var citycode = $("#cityid").val();
        $.ajax({type: "POST", url: _context + "/search-getAreasByCityid.html", dataType: "json", data: {citycode: citycode}, success: function (json) {
            if ($.browser.msie && $.browser.version == '6.0') {
                $(".selfoodpricedroplist").hide();
                $(".selrestaveragedroplist").hide();
            }
            var data = json.areas;
            var html = '<ul>';
            for (var i = 0; i < data.length; i++) {
                html += '<li onclick="javascript:selMapArea(' + data[i].id + ', this);">' + data[i].name + '</li>';
            }
            html += '</ul>';
            $("#areanamelistformap").html(html);
            $("#choosemaparea").show();
        }});
    }
    selMapArea = function (areaid, obj) {
        $("#areadropmapid").val(areaid);
        $("#seldropmapareas").html($(obj).text());
        $("#choosemaparea").hide();
        $("#seldropmapquarters").html('全部');
        $("#quartdropmapid").val('');
        if ($.browser.msie && $.browser.version == '6.0') {
            $(".selfoodpricedroplist").show();
            $(".selrestaveragedroplist").show();
        }
    }
    convertMapQuarterArea = function () {
        var areadropmapid = $("#areadropmapid").val();
        var cityid = $("#cityid").val();
        $.ajax({type: "POST", url: _context + "/search-getQuartersByAreaid.html", dataType: "json", data: {areacode: areadropmapid, cityid: cityid}, success: function (json) {
            if ($.browser.msie && $.browser.version == '6.0') {
                $(".selrestaveragedroplist").hide();
                $(".selfoodpricedroplist").hide();
            }
            var data = json.quarters;
            var html = '<ul>';
            for (var i = 0; i < data.length; i++) {
                html += '<li id="quarterid' + i + '" onclick="javascript:selMapQuarter(' + data[i].id + ', \'' + data[i].name + '\');">' + data[i].name + '</li>';
            }
            html += '</ul>';
            $("#quaternamelist").html(html);
            $("#choosequarter").show();
        }});
    }
    selQuarter = function () {
        var areacode = $("#areadropmapid").val();
        var cityid = $("#cityid").val();
        $.ajax({type: "POST", url: _context + "/search-getQuartersByAreaid.html", dataType: "json", data: {areacode: areacode, cityid: cityid}, success: function (json) {
            var data = json.quarters;
            var html = '<ul>';
            for (var i = 0; i < data.length; i++) {
                html += '<li id="quarterid' + i + '" onclick="javascript:selMapQuarter(' + data[i].id + ', \'' + data[i].name + '\');">' + data[i].name + '</li>';
            }
            html += '</ul>';
            $("#quaternamelist").html(html);
            $("#choosequarter").show();
        }});
    }
    selMapQuarter = function (quarterid, quartername) {
        $("#seldropmapquarters").html(quartername);
        $("#quartdropmapid").val(quarterid);
        $("#choosequarter").hide();
        if (quarterid != '') {
            $.ajax({type: "POST", url: _context + "/search-getAreaByquarterid.html", dataType: "json", data: {quarterid: quarterid}, success: function (json) {
                var areaid = json.id;
                var areaname = json.name;
                $("#seldropmapareas").html(areaname);
                $("#areadropmapid").val(areaid);
            }});
        }
        if ($.browser.msie && $.browser.version == '6.0') {
            $(".selrestaveragedroplist").show();
            $(".selfoodpricedroplist").show();
        }
    }
    closeQuarter = function () {
        $("#choosequarter").hide();
    }
    $("#highsearchfood").dialog({bgiframe: true, draggable: true, autoOpen: false, modal: false, width: 610, close: function (event, ui) {
        clearSliderStatus();
    }, open: function (event, ui) {
        showAllDialogDatas();
        (function () {
            var Event = YAHOO.util.Event, Dom = YAHOO.util.Dom, lang = YAHOO.lang;
            var range = 200;
            var tickSize = 0;
            var minThumbDistance = 0;
            var initValues = [0, 200];
            var pricecf = 1000 / (range);
            var discntcf = 10 / range;
            var priceconvert = function (val) {
                return Math.round(val * pricecf);
            };
            var discntconvert = function (val) {
                return Math.round(val * discntcf);
            }
            var commrateconvert = function (val) {
                if (val == 0) {
                    return 1;
                }
                if (val == 50) {
                    return 2;
                }
                if (val == 100) {
                    return 3;
                }
                if (val == 150) {
                    return 4;
                }
                if (val == 200) {
                    return 5;
                }
            }
            var commratetipconvert = function (val) {
                if (val == 1) {
                    return'差';
                }
                if (val == 2) {
                    return'一般';
                }
                if (val == 3) {
                    return'好';
                }
                if (val == 4) {
                    return'很好';
                }
                if (val == 5) {
                    return'非常好';
                }
            }
            var hotrateconvert = function (val) {
                if (val == 0) {
                    return 0;
                }
                if (val == 100) {
                    return 1;
                }
                if (val == 200) {
                    return 2;
                }
            }
            var hotratetipconvert = function (val) {
                if (val == 0) {
                    return'低';
                }
                if (val == 1) {
                    return'中';
                }
                if (val == 2) {
                    return'高';
                }
            }
            Event.onDOMReady(function () {
                $("#price-slider-tips-min").css("visibility", "hidden");
                $("#price-slider-tips-max").css("visibility", "hidden");
                $("#discnt-slider-tips-min").css("visibility", "hidden");
                $("#discnt-slider-tips-max").css("visibility", "hidden");
                $("#hotrate-slider-tips").css("visibility", "hidden");
                $("#commentrate-slider-tips").css("visibility", "hidden");
                $("#commentrate-slider-thumb").css("visibility", "hidden");
                $("#hotrate-slider-thumb").css("visibility", "hidden");
                var priceslider = Dom.get("price-slider-bg");
                var discntslider = Dom.get("discnt-slider-bg");
                var hotratesliderbg = Dom.get("hotrate-slider-bg");
                var slider = YAHOO.widget.Slider.getHorizDualSlider(priceslider, "price-slider-thumb-min", "price-slider-thumb-max", range, tickSize, initValues);
                slider.minRange = minThumbDistance;
                var discntlider = YAHOO.widget.Slider.getHorizDualSlider(discntslider, "discnt-slider-thumb-min", "discnt-slider-thumb-max", range, 20, initValues);
                discntlider.minRange = minThumbDistance;
                var commentrateslider = YAHOO.widget.Slider.getHorizSlider("commentrate-slider-bg", "commentrate-slider-thumb", 0, 200, 50);
                commentrateslider.lock();
                var hotrateslider = YAHOO.widget.Slider.getHorizSlider("hotrate-slider-bg", "hotrate-slider-thumb", 0, 200, 100);
                hotrateslider.lock();
                function changePriceLocation(slider) {
                    if ($("#ltthousantckb").attr("checked") == true || $("#gtthousand").attr("checked") == true) {
                        return;
                    }
                    $("#price-slider-tips-min").css("visibility", "visible");
                    $("#price-slider-tips-max").css("visibility", "visible");
                    var btnOffSetMin = $("#price-slider-thumb-min").find("img[name='sliderBtnMin']").offset();
                    var btnDivOffSetMin = $("#price-slider-thumb-min").offset();
                    var sliderTipMin = $("#price-slider-bg").find("#price-slider-tips-min");
                    sliderTipMin.css({left: slider.minVal - parseInt(sliderTipMin.width() / 2) + 8});
                    var min = priceconvert(slider.minVal);
                    sliderTipMin.html(min);
                    sliderTipMin.show();
                    var slider_price_min = $("#price-slider-bg").find("input[name='slider_price_min']");
                    slider_price_min.val(min);
                    var btnOffSetMax = $("#price-slider-thumb-max").find("img[name='sliderBtnMax']").offset();
                    var btnDivOffSetMax = $("#price-slider-thumb-max").offset();
                    var sliderTipMax = $("#price-slider-bg").find("#price-slider-tips-max");
                    sliderTipMax.css({left: slider.maxVal - parseInt(sliderTipMax.width() / 2) + 8});
                    var max = priceconvert(slider.maxVal);
                    sliderTipMax.html(max);
                    sliderTipMax.show();
                    var slider_price_max = $("#price-slider-bg").find("input[name='slider_price_max']");
                    slider_price_max.val(max);
                }

                function initPriceLocation(slider) {
                    var slider_price_min = $("#price-slider-bg").find("input[name='slider_price_min']");
                    slider_price_min.val(priceconvert(slider.minVal));
                    var slider_price_max = $("#price-slider-bg").find("input[name='slider_price_max']");
                    slider_price_max.val(priceconvert(slider.maxVal));
                }

                function startPriceLocation(slider) {
                    if ($("#ltthousantckb").attr("checked") == true || $("#gtthousand").attr("checked") == true) {
                        slider.lock();
                    }
                }

                initPriceLocation(slider);
                slider.subscribe('change', function (slider) {
                    changePriceLocation(slider)
                });
                slider.subscribe('slideStart', function (slider) {
                    startPriceLocation(slider)
                });
                function changeDiscntLocation(discntlider) {
                    if ($("#discountrange").attr("checked")) {
                        return;
                    }
                    $("#discnt-slider-tips-min").css("visibility", "visible");
                    $("#discnt-slider-tips-max").css("visibility", "visible");
                    var btnOffSetMin = $("#discnt-slider-thumb-min").find("img[name='sliderBtnMin']").offset();
                    var btnDivOffSetMin = $("#discnt-slider-thumb-min").offset();
                    var sliderTipMin = $("#discnt-slider-bg").find("#discnt-slider-tips-min");
                    sliderTipMin.css({left: discntlider.minVal - parseInt(sliderTipMin.width() / 2) + 8});
                    var min = discntconvert(discntlider.minVal);
                    sliderTipMin.html(min);
                    sliderTipMin.show();
                    var slider_discnt_min = $("#discnt-slider-bg").find("input[name='slider_discnt_min']");
                    slider_discnt_min.val(min);
                    var btnOffSetMax = $("#discnt-slider-thumb-max").find("img[name='sliderBtnMax']").offset();
                    var btnDivOffSetMax = $("#discnt-slider-thumb-max").offset();
                    var sliderTipMax = $("#discnt-slider-bg").find("#discnt-slider-tips-max");
                    sliderTipMax.css({left: discntlider.maxVal - parseInt(sliderTipMax.width() / 2) + 8});
                    var max = discntconvert(discntlider.maxVal);
                    sliderTipMax.html(max);
                    sliderTipMax.show();
                    var slider_discnt_max = $("#discnt-slider-bg").find("input[name='slider_discnt_max']");
                    slider_discnt_max.val(max);
                }

                function initDiscntValue(discntlider) {
                    var slider_discnt_min = $("#discnt-slider-bg").find("input[name='slider_discnt_min']");
                    slider_discnt_min.val(discntconvert(discntlider.minVal));
                    var slider_discnt_max = $("#discnt-slider-bg").find("input[name='slider_discnt_max']");
                    slider_discnt_max.val(discntconvert(discntlider.maxVal));
                }

                initDiscntValue(discntlider);
                discntlider.subscribe('change', function (discntlider) {
                    changeDiscntLocation(discntlider)
                });
                function changeHotrateLocation(hotrateslider) {
                    if ($("#hotraterange").attr("checked") == true) {
                        return;
                    }
                    $("#hotrate-slider-tips").css("visibility", "visible");
                    var btnOffSet = $("#hotrate-slider-thumb").find("img[name='sliderBtnMin']").offset();
                    var btnDivOffSet = $("#hotrate-slider-thumb").offset();
                    var sliderTip = $("#hotrate-slider-bg").find("#hotrate-slider-tips");
                    sliderTip.css({left: hotrateslider - parseInt(sliderTip.width() / 2) + 8});
                    var value = hotrateconvert(hotrateslider);
                    sliderTip.html(hotratetipconvert(value));
                    sliderTip.show();
                    var hotrate_value = $("#hotrate-slider-bg").find("input[name='hotrate_value']");
                    hotrate_value.val(value);
                }

                function initHotrateValue(hotrateslider) {
                    var hotrate_value = $("#hotrate-slider-bg").find("input[name='hotrate_value']");
                    hotrate_value.val(hotrateconvert(hotrateslider.getValue()));
                }

                initHotrateValue(hotrateslider);
                hotrateslider.subscribe('change', function (hotrateslider) {
                    changeHotrateLocation(hotrateslider)
                });
                function changeCommrateLocation(commentrateslider) {
                    if ($("#commentraterange").attr("checked") == true) {
                        return;
                    }
                    $("#commentrate-slider-tips").css("visibility", "visible");
                    var btnOffSet = $("#commentrate-slider-thumb").find("img[name='sliderBtnMin']").offset();
                    var btnDivOffSet = $("#commentrate-slider-thumb").offset();
                    var sliderTip = $("#commentrate-slider-bg").find("#commentrate-slider-tips");
                    sliderTip.css({left: commentrateslider - parseInt(sliderTip.width() / 2) + 8});
                    var value = commrateconvert(commentrateslider);
                    sliderTip.html(commratetipconvert(value));
                    sliderTip.show();
                    var commentrate_value = $("#commentrate-slider-bg").find("input[name='commentrate_value']");
                    commentrate_value.val(value);
                }

                function initCommrateValue(commentrateslider) {
                    var commentrate_value = $("#commentrate-slider-bg").find("input[name='commentrate_value']");
                    commentrate_value.val(commrateconvert(commentrateslider.getValue()));
                }

                initCommrateValue(commentrateslider);
                commentrateslider.subscribe('change', function (commentrateslider) {
                    changeCommrateLocation(commentrateslider)
                });
            });
        })();
    }});
    gtthousandckb = function (obj) {
        if ($(obj).attr("checked")) {
            $("#price-slider-tips-min").css("visibility", "hidden");
            $("#price-slider-thumb-min").css("visibility", "hidden");
            $("#price-slider-tips-max").css("visibility", "hidden");
            $("#price-slider-thumb-max").css("visibility", "hidden");
        } else {
            $("#price-slider-tips-min").css("visibility", "hidden");
            $("#price-slider-thumb-min").css("visibility", "visible");
            $("#price-slider-tips-max").css("visibility", "hidden");
            $("#price-slider-thumb-max").css("visibility", "visible");
        }
    }
    dispriceslider = function (obj) {
        if ($(obj).attr("checked")) {
            $("#price-slider-tips-min").css("visibility", "hidden");
            $("#price-slider-thumb-min").css("visibility", "hidden");
            $("#price-slider-tips-max").css("visibility", "hidden");
            $("#price-slider-thumb-max").css("visibility", "hidden");
            $("#gtthousand").removeAttr("checked");
            $("#gtthousand").attr("disabled", "true");
        } else {
            $("#price-slider-tips-min").css("visibility", "hidden");
            $("#price-slider-thumb-min").css("visibility", "visible");
            $("#price-slider-tips-max").css("visibility", "hidden");
            $("#price-slider-thumb-max").css("visibility", "visible");
            $("#gtthousand").removeAttr("disabled");
        }
    }
    disabledctslider = function (obj) {
        if ($(obj).attr("checked")) {
            $("#discnt-slider-tips-min").css("visibility", "hidden");
            $("#discnt-slider-thumb-min").css("visibility", "hidden");
            $("#discnt-slider-tips-max").css("visibility", "hidden");
            $("#discnt-slider-thumb-max").css("visibility", "hidden");
        } else {
            $("#discnt-slider-tips-min").css("visibility", "hidden");
            $("#discnt-slider-thumb-min").css("visibility", "visible");
            $("#discnt-slider-tips-max").css("visibility", "hidden");
            $("#discnt-slider-thumb-max").css("visibility", "visible");
        }
    }
    disablecommslider = function (obj) {
        if ($(obj).attr("checked")) {
            $("#commentrate-slider-tips").css("visibility", "hidden");
            $("#commentrate-slider-thumb").css("visibility", "hidden");
        } else {
            $("#commentrate-slider-tips").css("visibility", "hidden");
            $("#commentrate-slider-thumb").css("visibility", "visible");
        }
    }
    disablehotslider = function (obj) {
        if ($(obj).attr("checked")) {
            $("#hotrate-slider-tips").css("visibility", "hidden");
            $("#hotrate-slider-thumb").css("visibility", "hidden");
        } else {
            $("#hotrate-slider-tips").css("visibility", "hidden");
            $("#hotrate-slider-thumb").css("visibility", "visible");
        }
    }
    disablespecflag = function (obj) {
        if ($(obj).attr("checked")) {
            $("input[name='specflag']").attr('disabled', 'true');
        } else {
            $("input[name='specflag']").removeAttr('disabled');
        }
    }
    disableparkingflag = function (obj) {
        if ($(obj).attr("checked")) {
            $("input[name='parking']").attr('disabled', 'true');
        } else {
            $("input[name='parking']").removeAttr('disabled');
        }
    }
    createHotRateDiv = function () {
        var slideleft = $("#hotrateslider").offset().left;
        var slidetop = $("#hotrateslider").offset().top;
        var slidehight = $("#hotrateslider").height();
        var widthper = $("#hotrateslider").innerWidth() / 2;
        var valueindex = $("#hotrateslider").slider("value");
        var totalwidth = valueindex * widthper;
        var left = slideleft + totalwidth - $("#highsearchfood").offset().left - 2;
        var top = slidetop - slidehight - 6;
        $("#hotratediv").remove();
        var hotratediv = '<div id="hotratediv" style="background:white;width:10px;height:10px;z-index:999;position:absolute;top:' + top + 'px;left:' + left + 'px;">';
        if (valueindex == 0) {
            hotratediv += '低<span style="display:none">' + valueindex + '<\/span><\/div>';
        } else if (valueindex == 1) {
            hotratediv += '中<span style="display:none">' + valueindex + '<\/span><\/div>';
        } else {
            hotratediv += '高<span style="display:none">' + valueindex + '<\/span><\/div>';
        }
        $("#highsearchfood").append(hotratediv);
    }
    createCommentSliderDiv = function () {
        var slideleft = $("#commentrateslider").offset().left;
        var slidetop = $("#commentrateslider").offset().top;
        var slidehight = $("#commentrateslider").height();
        var widthper = $("#commentrateslider").innerWidth() / 5;
        var valueindex = $("#commentrateslider").slider("value");
        var totalwid = valueindex * widthper;
        var left = slideleft + totalwid - $("#highsearchfood").offset().left - 2;
        var top = slidetop - slidehight - 6;
        $("#commsliderdiv").remove();
        var commsliderdiv = '<div id="commsliderdiv" style="background:white;width:10px;height:10px;z-index:999;position:absolute;top:' + top + 'px;left:' + left + 'px;">';
        if (valueindex == 1) {
            commsliderdiv += '很差<span style="display:none">' + valueindex + '<\/span><\/div>';
        } else if (valueindex == 2) {
            commsliderdiv += '差<span style="display:none">' + valueindex + '<\/span><\/div>';
        } else if (valueindex == 3) {
            commsliderdiv += '一般<span style="display:none">' + valueindex + '<\/span><\/div>';
        } else if (valueindex == 4) {
            commsliderdiv += '好<span style="display:none">' + valueindex + '<\/span><\/div>';
        } else {
            commsliderdiv += '很好<span style="display:none">' + valueindex + '<\/span><\/div>';
        }
        $("#highsearchfood").append(commsliderdiv);
    }
    createDiscountSliderDiv = function () {
        var slideleft = $("#discountslider").offset().left;
        var slidetop = $("#discountslider").offset().top;
        var slidehight = $("#discountslider").height();
        var widthper = $("#discountslider").innerWidth() / 100;
        var valueindex1 = $("#discountslider").slider("values", 0);
        var valueindex2 = $("#discountslider").slider("values", 1);
        var totalindex1wid = valueindex1 * widthper;
        var totalindex2wid = valueindex2 * widthper;
        var index1left = slideleft + totalindex1wid - $("#highsearchfood").offset().left - 2;
        var index1top = slidetop - slidehight - 6;
        var index2left = slideleft + totalindex2wid - $("#highsearchfood").offset().left - 2;
        var index2top = slidetop + slidehight + 6;
        $("#dissliderdiv1").remove();
        $("#dissliderdiv2").remove();
        var dissliderdiv1 = '<div id="dissliderdiv1" style="background:white;width:10px;height:10px;z-index:999;position:absolute;top:' + index1top + 'px;left:' + index1left + 'px;>' + valueindex1 / 10 + '<\/div>';
        var dissliderdiv2 = '<div id="dissliderdiv2" style="background:white;width:10px;height:10px;z-index:999;position:absolute;top:' + index2top + 'px;left:' + index2left + 'px;>' + valueindex2 / 10 + '<\/div>';
        $("#highsearchfood").append(dissliderdiv1);
        $("#highsearchfood").append(dissliderdiv2);
    }
    createPriceSliderDiv = function () {
        var slideleft = $("#priceslider").offset().left;
        var slidetop = $("#priceslider").offset().top;
        var slidehight = $("#priceslider").height();
        var widthper = $("#priceslider").innerWidth() / 1000;
        var valueindex1 = $("#priceslider").slider("values", 0);
        var valueindex2 = $("#priceslider").slider("values", 1);
        var totalindex1wid = valueindex1 * widthper;
        var totalindex2wid = valueindex2 * widthper;
        var index1left = slideleft + totalindex1wid - $("#highsearchfood").offset().left - 2;
        var index1top = slidetop - slidehight - 6;
        var index2left = slideleft + totalindex2wid - $("#highsearchfood").offset().left - 2;
        var index2top = slidetop + slidehight + 6;
        $("#pricesliderdiv1").remove();
        $("#pricesliderdiv2").remove();
        var dissliderdiv1 = '<div id="pricesliderdiv1" style="background:white;width:10px;height:10px;z-index:999;position:absolute;top:' + index1top + 'px;left:' + index1left + 'px;>' + valueindex1 + '<\/div>';
        var dissliderdiv2 = '<div id="pricesliderdiv2" style="background:white;width:10px;height:10px;z-index:999;position:absolute;top:' + index2top + 'px;left:' + index2left + 'px;>' + valueindex2 + '<\/div>';
        $("#highsearchfood").append(dissliderdiv1);
        $("#highsearchfood").append(dissliderdiv2);
    }
    hoversearchrest = function () {
        $("#highsearchfood").find(".checkbox_title span:eq(0)").html("餐厅");
        $("#pricetitleconvert").html('人　均：');
        $("#highsearchfooddishtype").hide();
        $("#highsearchresttype").show();
        $("#highsearchspecifal").hide();
        $("#parkingspaces").show();
        $("#highsearchrestbtn").show();
        $("#highsearchfoodbtn").hide();
        $("#highsearchfood").dialog('open');
    }
    hoversearchfood = function () {
        $("#highsearchfood").find(".checkbox_title span:eq(0)").html("美食");
        $("#pricetitleconvert").html('菜　价：');
        $("#highsearchfooddishtype").show();
        $("#highsearchresttype").hide();
        $("#highsearchfooddiscnt").show();
        $("#highsearchspecifal").show();
        $("#parkingspaces").hide();
        $("#highsearchrestbtn").hide();
        $("#highsearchfoodbtn").show();
        $("#highsearchfood").dialog('open');
    }
    highdlgselallarea = function (obj) {
        $("#selallquarters").removeAttr("checked");
        if ($(obj).attr("checked")) {
            $("#areaname ul li input").each(function () {
                $(this).attr("checked", "true");
                $(this).attr("disabled", "true");
            })
        } else {
            $("#areaname ul li input").each(function () {
                $(this).removeAttr("checked");
                $(this).removeAttr("disabled");
            })
        }
        showhighsearchquarters();
    }
    selquartername = function (quarterid, areaid, areaname, obj) {
        $("#quatername ul").find('li').each(function () {
            $(this).removeClass("selected");
        });
        if (quarterid == '') {
            $("#selallquarters").addClass("selected");
        } else {
            $(obj).addClass("selected");
            $("#selallquarters").removeClass("selected");
        }
        if (quarterid == '' && areaid == '') {
            $("#areaname ul").find('li').each(function () {
                $(this).removeClass("selected");
            });
            $("#selallareas").addClass("selected");
        } else {
            $("#areaname ul").find('li').each(function () {
                $(this).removeClass("selected");
            });
            var areaidname = 'areaname' + areaid;
            $("#areaname ul li").each(function () {
                if (this.id == areaidname) {
                    $(this).addClass("selected");
                }
            });
            $("#selallareas").removeClass("selected");
        }
        $("#highareaidhid").val(areaid);
        $("#highareanamehid").val(areaname);
        $("#highquartercodehid").val(quarterid);
    }
    updatehighdlgareas = function () {
        var quarterids = '';
        $("#quatername ul li input").each(function () {
            if ($(this).attr("checked")) {
                quarterids += this.value + ',';
            }
        })
        if (quarterids == '') {
        } else {
            $.ajax({type: "POST", url: _context + "/search-getAreaidsByQuarterids.html", dataType: "json", data: {quarterids: quarterids}, success: function (json) {
                var areaids = json.areaids;
                for (var i = 0; i < areaids.length; i++) {
                    $("#areaname ul li input").each(function () {
                        if ($(this).val() == areaids[i].areaid) {
                            if (!$(this).attr("checked")) {
                                $(this).attr("checked", "true");
                            }
                        }
                    })
                }
            }});
        }
    }
    selareaname = function (areaid, areaname, obj) {
        $("#areaname ul").find('li').each(function () {
            $(this).removeClass("selected");
        });
        $("#selallquarters").addClass("selected");
        if (areaid == '') {
            $("#selallareas").addClass("selected");
            $("#allhighsearchquarters").html('');
            $("#allhighsearchquarters").html('<a href="javascript:selquartername(\'\', \'\', \'\', this);">全选</a>');
        } else {
            $(obj).addClass("selected");
            $("#allhighsearchquarters").html('');
            $("#allhighsearchquarters").html('<a href="javascript:selquartername(\'\', ' + areaid + ', ' + areaname + ', this);">全选</a>');
            $("#selallareas").removeClass("selected");
        }
        $("#highquartercodehid").val("");
        $("#highareaidhid").val(areaid);
        $("#highareanamehid").val(areaname);
        var number = Math.random();
        $.ajax({type: "POST", url: _context + "/search-getQuartersByAreaid.html", dataType: "json", data: {areacode: areaid, cityid: cityid, number: number}, success: function (json) {
            var quarters = json.quarters;
            var quarterhtml = '';
            for (var i = 0; i < quarters.length; i++) {
                quarterhtml += '<li onclick="javascript:selquartername(' + quarters[i].id + ', ' + quarters[i].areaid + ', \'' + quarters[i].areaname + '\', this)" id="quartername' + quarters[i].id + '">' + quarters[i].name + '</li>';
            }
            $("#quatername ul").html("");
            $("#quatername ul").html(quarterhtml);
        }});
    }
    updatehighdlgquarterbyareas = function (cityid, areaids) {
        $.ajax({type: "POST", url: _context + "/search-getQuartersByAreaids.html", dataType: "json", data: {cityid: cityid, areaids: areaids}, success: function (json) {
            var data = json.quarters;
            var html = '';
            for (var f = 0; f < data.length; f++) {
                html += '<li><input name="cjeclset"  id="quartername' + data[f].id + '" type="checkbox" size="25" class="ckb" onclick="javascript:selquartername(' + data[f].id + ')" value=' + data[f].id + '><p>' + data[f].name + '</p></li>'
            }
            $("#quatername ul").html("");
            $("#quatername ul").html(html);
        }});
    }
    selectallquarters = function (obj) {
        if ($(obj).attr("checked")) {
            $("#quatername ul li input").each(function () {
                $(this).attr("checked", "true");
                $(this).attr("disabled", "true");
            })
            updatehighdlgareas();
        } else {
            $("#quatername ul li input").each(function () {
                $(this).removeAttr("checked");
                $(this).removeAttr("disabled");
            })
        }
    }
    selalldishtype = function (obj) {
        if ($(obj).attr("checked")) {
            $("#dishtypename  ul input").attr("checked", "true");
        } else {
            $("#dishtypename  ul input").removeAttr("checked");
        }
    }
    selfoodtype = function (obj, index) {
        if ($("#selalldishtype").attr("checked")) {
            $("#selalldishtype").removeAttr("checked");
        }
        if (index == 1) {
            if ($(obj).attr("checked")) {
                $("#highsearchmaindish li  input").attr("checked", "true");
            } else {
                $("#highsearchmaindish li  input").removeAttr("checked");
            }
        } else if (index == 2) {
            if ($(obj).attr("checked")) {
                $("#highsearchalcohol li  input").attr("checked", "true");
            } else {
                $("#highsearchalcohol li  input").removeAttr("checked");
            }
        } else if (index == 3) {
        } else {
        }
    }
    selmaindishtype = function (obj, maindishtypeid) {
        if ($("#selalldishtype").attr("checked")) {
            $("#selalldishtype").removeAttr("checked");
        }
        if ($(obj).attr("checked")) {
            $('#subdishtype' + maindishtypeid + ' li  input').attr("checked", "true");
        } else {
            $('#subdishtype' + maindishtypeid + ' li  input').removeAttr("checked");
        }
    }
    selsubdishtype = function (obj, maindishtypeid) {
        if ($("#selalldishtype").attr("checked")) {
            $("#selalldishtype").removeAttr("checked");
        }
        if (!$("#maindishfoodtype").attr("checked")) {
            $("#maindishfoodtype").attr("checked", "true");
        }
        if (!$('#selmaindishtype' + maindishtypeid).attr("checked")) {
            $('#selmaindishtype' + maindishtypeid).attr("checked", "true");
        }
    }
    selmainalcotype = function (obj, mainalcoholid) {
        if (!$("#alcoholfoodtype").attr("checked")) {
            $("#alcoholfoodtype").attr("checked", "true");
        }
        if ($("#selalldishtype").attr("checked")) {
            $("#selalldishtype").removeAttr("checked");
        }
        if ($(obj).attr("checked")) {
            $('#subalcotype' + mainalcoholid + ' li  input').attr("checked", "true");
        } else {
            $('#subalcotype' + mainalcoholid + ' li  input').removeAttr("checked");
        }
    }
    selsubalcotype = function (obj, mainalcoholid) {
        if ($("#selalldishtype").attr("checked")) {
            $("#selalldishtype").removeAttr("checked");
        }
        if (!$("#alcoholfoodtype").attr("checked")) {
            $("#alcoholfoodtype").attr("checked", "true");
        }
        if (!$('#selmainalcotype' + mainalcoholid).attr("checked")) {
            $('#selmainalcotype' + mainalcoholid).attr("checked", "true");
        }
    }
    showAllDialogDatas = function () {
        var citycode = $("#cityid").val();
        $.ajax({type: "POST", url: _context + "/search-getAllDialogDatas.html", dataType: "json", data: {citycode: citycode}, success: function (json) {
            var maindishtypes = json.maindishtypes;
            var alcoholtypes = json.alcoholtypes;
            var mainresttypes = json.mainresttypes;
            var areas = json.areas;
            var quarters = json.quarters;
            var areahtml = '';
            for (var i = 0; i < areas.length; i++) {
                areahtml += '<li onclick="javascript:selareaname(' + areas[i].id + ', \'' + areas[i].name + '\', this)" id="areaname' + areas[i].id + '">' + areas[i].name + '</li>';
            }
            $("#areaname ul").html("");
            $("#areaname ul").html(areahtml);
            var quarterhtml = '';
            for (var i = 0; i < quarters.length; i++) {
                quarterhtml += '<li onclick="javascript:selquartername(' + quarters[i].id + ', ' + quarters[i].areaid + ', \'' + quarters[i].areaname + '\', this)" id="quartername' + quarters[i].id + '">' + quarters[i].name + '</li>';
            }
            $("#quatername ul").html("");
            $("#quatername ul").html(quarterhtml);
            var resttypetitlehtml = '';
            var initresttypehtml = '';
            for (var i = 0; i < mainresttypes.length; i++) {
                if (i == mainresttypes.length - 1) {
                    resttypetitlehtml += '<span onclick="javascript:mouseoverresttitle(this, ' + mainresttypes[i].id + ')">' + mainresttypes[i].name + '</span>';
                } else {
                    resttypetitlehtml += '<span onclick="javascript:mouseoverresttitle(this, ' + mainresttypes[i].id + ')">' + mainresttypes[i].name + '  |  </span>';
                }
                var subresttypes = mainresttypes[i].subresttypes;
                var subresttypediv = '<ul id=subresttype' + mainresttypes[i].id + '><li onclick="selsubresttypes(this, ' + mainresttypes[i].id + ', \'\')"><b>全部</b> </li>';
                for (var j = 0; j < subresttypes.length; j++) {
                    subresttypediv += ' <li id="' + mainresttypes[i].id + '.' + subresttypes[j].id + '" onclick="selsubresttypes(this, ' + mainresttypes[i].id + ', ' + subresttypes[j].id + ')" >' + subresttypes[j].name + '</li>';
                }
                subresttypediv += '</ul>';
                initresttypehtml += subresttypediv;
            }
            $("#restauranttypetitle").html("");
            $("#restauranttypetitle").html(resttypetitlehtml);
            $("#restauranttypetitle span:eq(0)").addClass('fontweight');
            $("#resttypelist").html("");
            $("#resttypelist").html(initresttypehtml);
            $("#resttypelist ul:gt(0)").hide();
            var dishtypehtml = '';
            var initdishalcohtml = '';
            for (var i = 0; i < maindishtypes.length; i++) {
                if (i == maindishtypes.length - 1) {
                    dishtypehtml += '<span onclick="javascript:mouseoverdishtitle(1, ' + maindishtypes[i].id + ', this)">' + maindishtypes[i].name + '</span>';
                } else {
                    dishtypehtml += '<span onclick="javascript:mouseoverdishtitle(1, ' + maindishtypes[i].id + ', this)">' + maindishtypes[i].name + '  |  </span>';
                }
                var subdishtypes = maindishtypes[i].subdishtypes;
                var subdishtypediv = '<ul id=subdishalcol' + maindishtypes[i].id + '><li  onclick="javascript:selhigdishtypes(this, ' + maindishtypes[i].id + ', \'\')"><b>全部:</b> </li>';
                for (var j = 0; j < subdishtypes.length; j++) {
                    subdishtypediv += ' <li id="1.' + maindishtypes[i].id + '.' + [j].id + '" onclick="javascript:selhigdishtypes(this, ' + maindishtypes[i].id + ', ' + subdishtypes[j].id + ')">' + subdishtypes[j].name + '</li>';
                }
                subdishtypediv += '</ul>';
                initdishalcohtml += subdishtypediv;
            }
            $("#dishalcotypetitle").html("");
            $("#dishalcotypetitle").html(dishtypehtml);
            $("#dishalcotypetitle span:eq(0)").addClass('fontweight');
            $("#dishalcotypelist").html("");
            $("#dishalcotypelist").html(initdishalcohtml);
            $("#dishalcotypelist ul:gt(0)").hide();
        }});
    }
    selsubresttypes = function (obj, resttypeid, subresttypeid) {
        $("#resttypelist ul").find('li').each(function () {
            $(this).removeClass('selected');
        });
        if (resttypeid == '' && subresttypeid == '') {
            $("#restauranttypetitle span").each(function () {
                $(this).removeClass('fontweight');
            });
            $("#restauranttypetitle span:eq(0)").addClass('fontweight');
            $("#resttypelist ul").hide();
            $("#resttypelist ul:eq(0)").show();
            $("#selallresttypes").addClass("selected");
        } else {
            $(obj).addClass('selected');
            $("#selallresttypes").removeClass("selected");
        }
        $("#highmainresttypeid").val(resttypeid);
        $("#highsubresttypeid").val(subresttypeid);
    }
    selhigdishtypes = function (obj, maindishid, subdishid) {
        $("#dishalcotypelist ul").find('li').each(function () {
            $(this).removeClass('selected');
        });
        if (maindishid == '' && subdishid == '') {
            $("#dishalcotypetitle span").each(function () {
                $(this).removeClass('fontweight');
            });
            $("#dishalcotypetitle span:eq(0)").addClass('fontweight');
            $("#dishalcotypelist ul").hide();
            $("#dishalcotypelist ul:eq(0)").show();
            $("#selalldishtypes").addClass("selected");
        } else {
            $(obj).addClass('selected');
            $("#selalldishtypes").removeClass("selected");
        }
        $("#highmaindishid").val(maindishid);
        $("#highsubdishid").val(subdishid);
    }
    selallsubresttypes = function (obj, index) {
        if ($(obj).attr("checked")) {
            $('#subresttype' + index + ' li input').attr("checked", "true");
            $('#subresttype' + index + ' li input').attr("disabled", "true");
            $('#subresttype' + index + ' li input:last').removeAttr("disabled");
        } else {
            $('#subresttype' + index + ' li input').removeAttr("checked");
            $('#subresttype' + index + ' li input').removeAttr("disabled");
        }
    }
    selallsubdishtypes = function (obj, index) {
        if ($(obj).attr("checked")) {
            $('#subdishalcol' + index + ' li input').attr("checked", "true");
            $('#subdishalcol' + index + ' li input').attr("disabled", "true");
            $('#subdishalcol' + index + ' li input:last').removeAttr("disabled");
        } else {
            $('#subdishalcol' + index + ' li input').removeAttr("checked");
            $('#subdishalcol' + index + ' li input').removeAttr("disabled");
        }
    }
    mouseoverdishtitle = function (obj1, maindishalcotypeid, obj2) {
        $("#dishalcotypetitle span").each(function () {
            $(this).removeClass('fontweight');
        });
        $(obj2).addClass('fontweight');
        $("#dishalcotypelist ul").hide();
        $("#subdishalcol" + maindishalcotypeid).show();
    }
    mouseoverresttitle = function (obj, mainresttypeid) {
        $("#restauranttypetitle span").each(function () {
            $(this).removeClass('fontweight');
        });
        $(obj).addClass('fontweight');
        $("#resttypelist ul").hide();
        $("#subresttype" + mainresttypeid).show();
    }
    showhighsearchareas = function () {
        var citycode = $("#cityid").val();
        $.ajax({type: "POST", url: _context + "/search-getAreasByCityid.html", dataType: "json", data: {citycode: citycode}, success: function (json) {
            var data = json.areas;
            var html = '';
            for (var i = 0; i < data.length; i++) {
                html += '<li><input name="cjeclset"  type="checkbox" class="ckb" onclick="javascript:selareaname(' + data[i].id + ', \'' + data[i].name + '\', this)" value=' + data[i].id + '><p>' + data[i].name + '</p></li>';
            }
            $("#areaname ul").html("");
            $("#areaname ul").html(html);
        }});
    }
    showhighsearchdishalcotypes = function () {
        $.ajax({type: "POST", url: _context + "/search-getAllDishAlcoTypes.html", dataType: "json", success: function (json) {
            var maindishtypes = json.maindishtypes;
            var alcoholtypes = json.alcoholtypes;
            var dishhtml = '';
            for (var i = 0; i < maindishtypes.length; i++) {
                dishhtml += '<li><input name="cjeclset"  type="checkbox" size="25" class="ckb" onclick="javascript:selmaindishtype(this, ' + maindishtypes[i].id + ')" id="selmaindishtype' + maindishtypes[i].id + '"><p>' + maindishtypes[i].name + ':</p></li>';
                var subdishtypes = maindishtypes[i].subdishtypes;
                dishhtml += '<div id="subdishtype' + maindishtypes[i].id + '">';
                for (var k = 0; k < subdishtypes.length; k++) {
                    dishhtml += '<li><input name="cjeclset"  type="checkbox" size="25" class="ckb" onclick="javascript:selsubdishtype(this, ' + maindishtypes[i].id + ')"><p>' + subdishtypes[k].name + '</p></li>';
                }
                dishhtml += '</div>';
            }
            var alcohtml = '';
            for (var j = 0; j < alcoholtypes.length; j++) {
                alcohtml += '<li><input name="cjeclset"  type="checkbox" size="25" class="ckb" onclick="javascript:selmainalcotype(this, ' + alcoholtypes[j].id + ')" id="selmainalcotype' + alcoholtypes[j].id + '"><p>' + alcoholtypes[j].name + ':</p></li>';
                var subalcotypes = alcoholtypes[j].subalcotypes;
                alcohtml += '<div id="subalcotype' + alcoholtypes[j].id + '">';
                for (var l = 0; l < subalcotypes.length; l++) {
                    alcohtml += '<li><input name="cjeclset"  type="checkbox" size="25" class="ckb" onclick="selsubalcotype(this, ' + alcoholtypes[j].id + ')"><p>' + subalcotypes[l].name + '</p></li>';
                }
                alcohtml += '</div>';
            }
            $("#highsearchmaindish").html("");
            $("#highsearchmaindish").html(dishhtml);
            $("#highsearchalcohol").html("");
            $("#highsearchalcohol").html(alcohtml);
        }});
    }
    showhighsearchquarters = function () {
        var citycode = $("#cityid").val();
        $.ajax({type: "POST", url: _context + "/search-getAllQuartersByCity.html", dataType: "json", data: {citycode: citycode}, success: function (json) {
            var data = json.quarters;
            var html = '';
            for (var i = 0; i < data.length; i++) {
                html += '<li><input name="cjeclset"  id="quartername' + data[i].id + '" type="checkbox" size="25" class="ckb" onclick="javascript:selquartername(' + data[i].id + ')" value=' + data[i].id + '><p>' + data[i].name + '</p></li>'
            }
            $("#quatername ul").html("");
            $("#quatername ul").html(html);
        }});
    }
    showhighsearchresttypes = function () {
        $.ajax({type: "POST", url: _context + "/search-getAllRestaurantTypes.html", dataType: "json", success: function (json) {
            var mainresttypes = json.mainresttypes;
            var resttypehtml = '';
            for (var i = 0; i < mainresttypes.length; i++) {
                resttypehtml += '<div class="name"><li><p>' + mainresttypes[i].name + '</p></li><span class="all"> <li><input name="cjeclset"  type="checkbox" size="25" class="ckb" onclick="selallrestauranttypes(this, ' + i + ')"><p>所有</p></li></span></div><div class="name_content" id="restaurntsubtype' + i + '">';
                var subresttypes = mainresttypes[i].subresttypes;
                for (var k = 0; k < subresttypes.length; k++) {
                    resttypehtml += '<li><input name="cjeclset"  type="checkbox" size="25" class="ckb" value="' + mainresttypes[i].name + '.' + mainresttypes[i].id + '.' + subresttypes[k].id + '"><p>' + subresttypes[k].name + '</p></li>';
                }
                resttypehtml += '</div>';
            }
            $("#highdlgresttypes").html("");
            $("#highdlgresttypes").html(resttypehtml);
        }});
    }
    selectalltypes = function (obj) {
        if ($(obj).attr("checked")) {
            $("#highdlgresttypes input").each(function () {
                $(this).attr("checked", "true");
                $(this).attr("disabled", "true");
            });
        } else {
            $("#highdlgresttypes input").each(function () {
                $(this).removeAttr("checked");
                $(this).removeAttr("disabled");
            });
        }
    }
    selallrestauranttypes = function (obj, index) {
        if ($(obj).attr("checked")) {
            $('#restaurntsubtype' + index + ' li input').each(function () {
                $(this).attr("checked", "true");
                $(this).attr("disabled", "true");
            });
        } else {
            $('#restaurntsubtype' + index + ' li input').each(function () {
                $(this).removeAttr("checked");
                $(this).removeAttr("disabled");
            });
        }
    }
    closehighfooddlg = function () {
        clearSliderStatus();
        $("#highsearchfood").dialog('close');
    }
    clearSliderStatus = function () {
        $("#price-slider-thumb-min").css("left", "0");
        $("#price-slider-thumb-max").css("left", "0");
        $("#discnt-slider-thumb-min").css("left", "0");
        $("#discnt-slider-thumb-max").css("left", "0");
        $("#commentrate-slider-thumb").css("left", "0");
        $("#hotrate-slider-thumb").css("left", "0");
        $("#price-slider-tips-min").css("left", "-16px");
        $("#price-slider-tips-min").html('0');
        $("#price-slider-tips-max").css("left", "184px");
        $("#price-slider-tips-max").html('1000');
        $("#discnt-slider-tips-min").css("left", "-16px");
        $("#discnt-slider-tips-min").html('0');
        $("#discnt-slider-tips-max").css("left", "184px");
        $("#discnt-slider-tips-max").html('10');
        $("#commentrate-slider-tips").css("left", "-16px");
        $("#commentrate-slider-tips").html('差');
        $("#hotrate-slider-tips").css("left", "-16px");
        $("#hotrate-slider-tips").html('低');
        $("#selallareas").addClass("selected");
        $("#selallquarters").addClass("selected");
        $("#selalldishtypes").addClass("selected");
        $("#selallresttypes").addClass("selected");
        if ($("#ltthousantckb").attr("checked")) {
            $("#ltthousantckb").removeAttr("checked");
        }
        if ($("#discountrange").attr("checked")) {
            $("#discountrange").removeAttr("checked");
        }
        if ($("#commentraterange").attr("checked") == false) {
            $("#commentraterange").attr("checked", "true");
        }
        if ($("#hotraterange").attr("checked") == false) {
            $("#hotraterange").attr("checked", "true");
        }
        if ($("#specialchk").attr("checked") == false) {
            $("#specialchk").attr("checked", "true");
        }
        if ($("#parkingchk").attr("checked") == false) {
            $("#parkingchk").attr("checked", "true");
        }
        if ($("#gtthousand").attr("checked")) {
            $("#gtthousand").removeAttr("checked");
        }
        if ($("#price-slider-thumb-min").is(':visible') == false) {
            $("#price-slider-thumb-min").css("visibility", "visible");
        }
        if ($("#price-slider-thumb-max").is(':visible') == false) {
            $("#price-slider-thumb-max").css("visibility", "visible");
        }
        if ($("#discnt-slider-thumb-min").is(':visible') == false) {
            $("#discnt-slider-thumb-min").css("visibility", "visible");
        }
        if ($("#discnt-slider-thumb-max").is(':visible') == false) {
            $("#discnt-slider-thumb-max").css("visibility", "visible");
        }
        if ($("#commentrate-slider-thumb").is(':visible') == false) {
            $("#commentrate-slider-thumb").css("visibility", "visible");
        }
        if ($("#hotrate-slider-thumb").is(':visible') == false) {
            $("#hotrate-slider-thumb").css("visibility", "visible");
        }
        $("input[name='specflag']").each(function () {
            if ($(this).attr("checked")) {
                $(this).removeAttr("checked");
            }
            $(this).attr("disabled", "true");
        })
        $("input[name='parking']").each(function () {
            if ($(this).attr("checked")) {
                $(this).removeAttr("checked");
            }
            $(this).attr("disabled", "true");
        })
    }
    commandresthighsearch = function () {
        var cityid = $("#cityid").val();
        var cityname = $("#cityname").text();
        var areaid = $("#highareaidhid").val();
        var areaname = $("#highareanamehid").val();
        var quarterid = $("#highquartercodehid").val();
        var mainresttypeid = $("#highmainresttypeid").val();
        var subresttypeid = $("#highsubresttypeid").val();
        var startprice = '';
        var endprice = '';
        if (!$("#ltthousantckb").attr("checked")) {
            if ($("#gtthousand").attr("checked")) {
                startprice = '1000';
            } else {
                startprice = $("input[name='slider_price_min']").val();
                endprice = $("input[name='slider_price_max']").val();
            }
        }
        var startdiscnt = '';
        var enddiscnt = '';
        if (!$("#discountrange").attr("checked")) {
            startdiscnt = $("input[name='slider_discnt_min']").val();
            enddiscnt = $("input[name='slider_discnt_max']").val();
        }
        var commentrate = '';
        if (!$("#commentraterange").attr("checked")) {
            commentrate = $("input[name='commentrate_value']").val();
        }
        var hotrate = '';
        if (!$("#hotraterange").attr("checked")) {
            hotrate = $("input[name='hotrate_value']").val();
        }
        var parkingspaces = '';
        if (!$("#parkingchk").attr("checked")) {
            $("input[name='parking']").each(function () {
                if ($(this).attr("checked")) {
                    parkingspaces = this.value;
                }
            });
        }
        $("form:eq(0)").attr("action", _context + "/search-getHighSearchRests.html" + "&cityid=" + cityid + "&cityname=" + encodeURI(encodeURI(cityname)) + "&areaid=" + areaid + "&areaname=" + encodeURI(encodeURI(areaname)) + "&quarterid=" + quarterid + "&mainresttypeid=" + mainresttypeid + "&subresttypeid=" + subresttypeid + "&startprice=" + startprice + "&endprice=" + endprice + "&startdiscnt=" + startdiscnt + "&enddiscnt=" + enddiscnt + "&commentrate=" + commentrate + "&hotrate=" + hotrate + "&parking=" + parkingspaces);
        $("form:eq(0)").attr("method", "post");
        $("form:eq(0)").submit();
    }
    commandfoodhighsearch = function () {
        var cityid = $("#cityid").val();
        var cityname = $("#cityname").text();
        var areaid = $("#highareaidhid").val();
        var areaname = $("#highareanamehid").val();
        var quarterid = $("#highquartercodehid").val();
        var highmaindishid = $("#highmaindishid").val();
        var highsubdishid = $("#highsubdishid").val();
        var startprice = '';
        var endprice = '';
        if (!$("#ltthousantckb").attr("checked")) {
            if ($("#gtthousand").attr("checked")) {
                startprice = '1000';
            } else {
                startprice = $("input[name='slider_price_min']").val();
                endprice = $("input[name='slider_price_max']").val();
            }
        }
        var startdiscnt = '';
        var enddiscnt = '';
        if (!$("#discountrange").attr("checked")) {
            startdiscnt = $("input[name='slider_discnt_min']").val();
            enddiscnt = $("input[name='slider_discnt_max']").val();
        }
        var commentrate = '';
        if (!$("#commentraterange").attr("checked")) {
            commentrate = $("input[name='commentrate_value']").val();
        }
        var hotrate = '';
        if (!$("#hotraterange").attr("checked")) {
            hotrate = $("input[name='hotrate_value']").val();
        }
        var specflag = '';
        if (!$("#specialchk").attr("checked")) {
            $("input[name='specflag']").each(function () {
                if ($(this).attr("checked")) {
                    specflag = this.value;
                }
            });
        }
        $("form:eq(0)").attr("action", _context + "/search-getHighSearchFoods.html" + "&cityid=" + cityid + "&cityname=" + encodeURI(encodeURI(cityname)) + "&areaid=" + areaid + "&areaname=" + encodeURI(encodeURI(areaname)) + "&quarterid=" + quarterid + "&maindishalcotype=" + highmaindishid + "&subdishalcotype=" + highsubdishid + "&startprice=" + startprice + "&endprice=" + endprice + "&startdiscnt=" + startdiscnt + "&enddiscnt=" + enddiscnt + "&commentrate=" + commentrate + "&hotrate=" + hotrate + "&specflag=" + specflag);
        $("form:eq(0)").removeAttr("target");
        $("form:eq(0)").attr("method", "post");
        $("form:eq(0)").submit();
    }
    addToFoodFavorite = function (foodid, foodtype, restaurantid) {
        common = function () {
            colFavoriteFood(foodid, foodtype, restaurantid);
        }
        $.ajax({type: "POST", url: _context + "/custcentercontroller-getLoginid.html", dataType: "json", success: function (json) {
            var _loginid = json.customerid;
            if (_loginid == '' || _loginid == null || _loginid == 'undefined') {
                $("#customerlogindialog").dialog('open');
            } else {
                colFavoriteFood(foodid, foodtype, restaurantid);
            }
        }});
    }
    freeopenrest = function () {
        $("form:eq(1)").attr("action", _context + "/jsp/include/restaurantopen.jsp");
        $("form:eq(1)").attr("target", '_blank');
        $("form:eq(1)").submit();
    }
    registerlogin = function () {
        $("form:eq(0)").attr("action", _context + "/customerController-registerlogin.html");
        $("form:eq(0)").attr("method", "post");
        $("form:eq(0)").submit();
    }
    registerrecomm = function () {
        $("form:eq(0)").attr("action", _context + "/customerController-registerrecomm.html");
        $("form:eq(0)").attr("method", "post");
        $("form:eq(0)").submit();
    }
    dishtypesPopNav = function (resttypeid, subresttypeid) {

    }
    quarterPopNav = function (areaname, areaid, quarterid) {
        var mainresttypeid = '';
        var subresttypeid = '';
        var cityid = $("#cityid").val();
        var cityname = $("#cityname").text();
        var startprice = '0';
        var endprice = '2000';
        var startdiscnt = '0';
        var enddiscnt = '10';
        var commentrate = '';
        var hotrate = '';
        var parkingspaces = '';
        $("form:eq(0)").attr("action", _context + "/search-getHighSearchRests.html" + "&cityid=" + cityid + "&cityname=" + encodeURI(encodeURI(cityname)) + "&areaid=" + areaid + "&areaname=" + encodeURI(encodeURI(areaname)) + "&quarterid=" + quarterid + "&mainresttypeid=" + mainresttypeid + "&subresttypeid=" + subresttypeid + "&startprice=" + startprice + "&endprice=" + endprice + "&startdiscnt=" + startdiscnt + "&enddiscnt=" + enddiscnt + "&commentrate=" + commentrate + "&hotrate=" + hotrate + "&parking=" + parkingspaces);
        $("form:eq(0)").attr("method", "post");
        $("form:eq(0)").submit();
    }
    areaPopNav = function (areaname, areaid) {
        var mainresttypeid = '';
        var subresttypeid = '';
        var cityid = $("#cityid").val();
        var cityname = $("#cityname").text();
        var startprice = '0';
        var endprice = '2000';
        var startdiscnt = '0';
        var enddiscnt = '10';
        var commentrate = '';
        var hotrate = '';
        var parkingspaces = '';
        var quarterid = '';
        $("form:eq(0)").attr("action", _context + "/search-getHighSearchRests.html" + "&cityid=" + cityid + "&cityname=" + encodeURI(encodeURI(cityname)) + "&areaid=" + areaid + "&areaname=" + encodeURI(encodeURI(areaname)) + "&quarterid=" + quarterid + "&mainresttypeid=" + mainresttypeid + "&subresttypeid=" + subresttypeid + "&startprice=" + startprice + "&endprice=" + endprice + "&startdiscnt=" + startdiscnt + "&enddiscnt=" + enddiscnt + "&commentrate=" + commentrate + "&hotrate=" + hotrate + "&parking=" + parkingspaces);
        $("form:eq(0)").attr("method", "post");
        $("form:eq(0)").submit();
    }
});
$(document).ready(function () {
    function _(D) {
        if (D) {
            if ($.browser.msie)D = encodeURIComponent(D);
            var B = D.split("_"), C = B[0];
            $("#filterobject").val(C);
            $("#tabs ul li").removeAttr("class");
            $("#" + C).parent().attr("class", "current");
            $("#pageno").val(B[1]);
            if (B[3] == "0") {
                $("#paixu").find("img:eq(1)").attr("src", _context + "/images/customer/sort.gif");
                $("#paixu").find("img:eq(0)").attr("src", _context + "/images/customer/sort.gif");
                $("#sorttype").val("")
            } else {
                if (B[3] == "pricedesc") {
                    $("#paixu").find("img:eq(1)").attr("src", _context + "/images/customer/sort.gif");
                    $("#paixu").find("img:eq(0)").attr("src", _context + "/images/customer/sort-down.gif")
                } else if (B[3] == "priceasc") {
                    $("#paixu").find("img:eq(1)").attr("src", _context + "/images/customer/sort.gif");
                    $("#paixu").find("img:eq(0)").attr("src", _context + "/images/customer/sort-up.gif")
                } else if (B[3] == "evaluatedesc") {
                    $("#paixu").find("img:eq(0)").attr("src", _context + "/images/customer/sort.gif");
                    $("#paixu").find("img:eq(1)").attr("src", _context + "/images/customer/sort-down.gif")
                } else {
                    $("#paixu").find("img:eq(0)").attr("src", _context + "/images/customer/sort.gif");
                    $("#paixu").find("img:eq(1)").attr("src", _context + "/images/customer/sort-up.gif")
                }
                $("#sorttype").val(B[3])
            }
            var A = B[2];
            $("#pagesize10").removeAttr("class");
            $("#pagesize20").removeAttr("class");
            $("#pagesize30").removeAttr("class");
            if (A == "10")$("#pagesize10").attr("class", "current"); else if (A == "20")$("#pagesize20").attr("class", "current"); else $("#pagesize30").attr("class", "current");
            $("#pageSize").val(A);
            var E = B[5];
            if (E == "x" || E == "") {
                $("#selpricerange option[value='']").attr("selected", true);
                $("#pricerangesel").val("")
            } else {
                $("#selpricerange option[value=" + E + "]").attr("selected", true);
                $("#pricerangesel").val(E)
            }
            var _ = B[4];
            if (_ == "x" || _ == "") {
                $("#selaveragerange option[value='']").attr("selected", true);
                $("#averagerangesel").val("")
            } else {
                $("#selaveragerange option[value=" + _ + "]").attr("selected", true);
                $("#averagerangesel").val(_)
            }
            clickMainpageMenu()
        } else {
            $("#tabs ul li").removeAttr("class");
            $("#restaurantrecomm").parent().attr("class", "current");
            $("#filterobject").val("restaurantrecomm");
            $("#pagesize10").removeAttr("class");
            $("#pagesize20").removeAttr("class");
            $("#pagesize30").removeAttr("class");
            $("#pagesize10").attr("class", "current");
            $("#pageSize").val("10");
            $("#pricerangesel").val("");
            $("#selpricerange option[value='']").attr("selected", true);
            $("#averagerangesel").val("");
            $("#selaveragerange option[value='']").attr("selected", true);
            $("#paixu").find("img:eq(1)").attr("src", _context + "/images/customer/sort.gif");
            $("#paixu").find("img:eq(0)").attr("src", _context + "/images/customer/sort.gif");
            $("#sorttype").val("");
            $("#pageno").val("1");
            clickMainpageMenu()
        }
    }

    if ($.browser.msie)$.historyInit(_); else $.historyInit(_, "#")
})
$(document).ready(function () {
    callback1 = function (carousel, item, i, state, evt) {
    }
    callback2 = function (carousel, item, i, state, evt) {
        var idx = carousel.index(i, 7);
        idx--;
        $('p[name="advertisetitle"]').find('a').removeClass('blue');
        $('p[name="advertisetitle"]').find('a:eq(' + idx + ')').addClass('blue');
    };
    function mycarousel_initCallback(carousel) {
        carousel.clip.hover(function () {
            carousel.stopAuto();
        }, function () {
            carousel.startAuto();
        });
    };
    jQuery('#mycarousel').jcarousel({auto: 5, wrap: 'circular', buttonNextHTML: null, buttonPrevHTML: null, scroll: 1, size: 7, initCallback: mycarousel_initCallback, itemLastInCallback: {onBeforeAnimation: callback1, onAfterAnimation: callback2}});
    selslide = function (index) {
        var carousel = jQuery('#mycarousel').data('jcarousel');
        carousel.scroll(parseInt(index), true);
    }
});
$(document).ready(function () {
    $('.transition').cycle({fx: 'fade', timeout: 5000, pager: '#carousel-nav ul', pagerAnchorBuilder: function (idx, slide) {
        return'#activity_nav ul li:eq(' + (idx) + ') a';
    }, pause: true})
    function onBefore() {
        var pos = $(".activeSlide").next().offset().top;
        $("#marker").animate({top: pos});
    };
    $('#carousel-nav ul li:eq(0)').click(function () {
        $('.transition').cycle(0);
        return false;
    });
    $('#carousel-nav ul li:eq(1)').click(function () {
        $('.transition').cycle(1);
        return false;
    });
    $('#carousel-nav ul li:eq(2)').click(function () {
        $('.transition').cycle(2);
        return false;
    });
    $('#carousel-nav ul li:eq(3)').click(function () {
        $('.transition').cycle(3);
        return false;
    });
    loadMsgs();
    loadSpecialFoods();
});
loadMsgs = function () {
    var number = Math.random();
    /*$.ajax({type: "POST", url: _context + "/mainpage-getAllBulletin.html", dataType: "json", data: {number: number}, success: function (json) {
        var bulletins = json.bulletins;
        var maxLength = 25;
        var notices = new Array(), j = 0;
        var $ul, content, end, $li, html = "", $a;
        for (var i = 0; i < bulletins.length; i++) {
            if (bulletins[i].recommtype == '2')notices[j++] = bulletins[i];
        }
        for (var m = 0; m < notices.length; m++) {
            html = "";
            if (m % 2 == 0) {
                $ul = $("<ul></ul>");
                $("#msgs").append($ul);
            }
            $a = $('<a href="mainpage-loadflagshippage.html&restaurantid=' + notices[m].restid + '"></a>');
            content = notices[m].content;
            end = (maxLength - notices[m].restname.length < content.length ? maxLength - notices[m].restname.length : content.length) - 1;
            html += '[' + notices[m].restname + ']:' + content.substr(0, end) + '...';
            $a.html(html);
            $li = $("<li></li>").append($a);
            $ul.append($li);
        }
        $("#msgs ul:not(:first)").css("display", "none");
        var B = $("#msgs ul:last");
        var C = $("#msgs ul:first");
        setInterval(function () {
            if ($("#msgs ul").length == 1) {
                B.hide();
                B.fadeIn(1000).addClass("in")
            } else if (B.is(":visible")) {
                C.fadeIn(1000).addClass("in");
                B.hide()
            } else {
                $("#msgs ul:visible").addClass("in");
                $("#msgs ul.in").next().fadeIn(1000);
                $("ul.in").hide().removeClass("in")
            }
        }, 8000)
    }});*/
}
loadSpecialFoods = function () {
    var pageno = $("#pageno").val();
    var cityid = $("#cityid").val();
    var sorttype = $("#sorttype").val();
    var pricerange = $("#pricerangesel").val();
    var averagerange = $("#averagerangesel").val();
    var pageSize = $("#pageSize").val();
    var number = Math.random();
    $.ajax({type: "POST", url: _context + "/mainpage-getMenuList.html", dataType: "json", data: {pageSize: '8', filterobject: "foodrecomm", cityid: cityid, sorttype: sorttype, pricerange: pricerange, number: number}, success: function (json) {
        var items = json.fooditems;
        var $ul = $('<ul></ul>');
        var $li;
        html = '';
        for (var m = 0; m < items.length; m++) {
            if (m == 0 || m == 4) {
                $ul = $('<ul></ul>');
                $('#special-goods').append($ul);
            }
            $li = $('<li></li>');
            html = '<img src="' + items[m].picpath + '" width="170" height="155" /> ';
            $a1 = $('<a href="fooddetail-loadPage2.html&foodtype=1&foodid=' + items[m].foodid + '&restaurantid=' + items[m].restaurantid + '&restaurantname=' + items[m].restaurantname + '"target="_blank">' + items[m].name + '</a>')
            $a1.html(html)
            $p = $('<p ></p>').append($a1);
            $div = $('<div class="item"></div>').append($p);
            $li.append($div);
            $a2 = $('<a href="mainpage-loadflagshippage.html&restaurantid=' + items[m].restaurantid + '"target="_blank">' + items[m].restaurantname + ' | </a>');
            $a3 = $('<a href="fooddetail-loadPage2.html&foodtype=1&foodid=' + items[m].foodid + '&restaurantid=' + items[m].restaurantid + '&restaurantname=' + items[m].restaurantname + '"target="_blank">' + items[m].name + '</a>')
            $p = $('<p class="txt"></p>').append($a2).append($a3);
            $price = $('<p class="name"><span class="priceL">原价：¥<del>' + items[m].price + '</del></span>  <span class="priceR">特价：¥' + items[m].curprice + '</span></p>');
            $li.append($p);
            $li.append($price);
            $ul.append($li);
        }
        $('#special-goods ul li:first').css("border-left", "medium none");
        $('#special-goods ul li:eq(4)').css("border-left", "medium none");
    }});
}

