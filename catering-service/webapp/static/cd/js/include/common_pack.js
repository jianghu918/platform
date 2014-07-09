/*
 * Compressed by JSA(www.xidea.org)
 */
$(document).ready(function(){
    var C={
        path:_context+"/",
        domain:"cdian.cn"
    },A={
        expires:1,
        path:_context+"/",
        domain:"cdian.cn"
    },_,B;
    if($.browser.msie){
        _=500;
        B=280
        }else{
        _=450;
        B=280
        }
        ajaxsuggesthide=function(){
        $("#disabledZone").css("visibility","hidden")
        };
        
    ajaxsuggestshow=function(){
        var A=document.getElementById("disabledZone");
        if(!A){
            A=document.createElement("div");
            A.setAttribute("id","disabledZone");
            A.style.position="fixed";
            A.style.zIndex="1000";
            A.style.left="0px";
            A.style.top="0px";
            A.style.width="100%";
            A.style.height="100%";
            document.body.appendChild(A);
            var C=document.createElement("span");
            C.setAttribute("id","messageZone");
            C.style.position="absolute";
            C.style.top="0px";
            C.style.right="0px";
            C.style.background="#FFFFAE";
            C.style.color="#000";
            C.style.fontFamily="Arial,Helvetica,sans-serif";
            C.style.padding="4px";
            C.style.fontSize="14px";
            var D=document.createElement("img");
            D.src=_context+"/images/ajax-loader.gif";
            D.style.border="0px";
            D.style.width="16px";
            D.style.marginRight="2px";
            D.style.height="16px";
            C.appendChild(D);
            A.appendChild(C);
            var B=document.createElement("span"),_=document.createTextNode("\u6b63\u5728\u52a0\u8f7d\u4e2d...");
            B.appendChild(_);
            B.id="messageText";
            C.appendChild(B);
            $("#disabledZone").css("visibility","hidden")
            }
        };
    
$("#skipinfodiv").dialog({
    bgiframe:true,
    draggable:true,
    autoOpen:false,
    modal:true,
    height:250,
    width:400,
    position:[650,80],
    title:"\u8df3\u8fc7\u767b\u9646\u4fe1\u606f\u8bbe\u7f6e",
    buttons:{
        "\u5173\u95ed":function(){
            $(this).dialog("close")
            },
        "\u786e\u5b9a":function(){
            $("form:eq(0)").attr("action",_context+"/customerController-loadCustomerAccountPage.html");
            $("form:eq(0)").attr("method","post");
            $("form:eq(0)").submit()
            }
        }
});
skiplogininfo=function(){
    if(email==""||email==null){
        alert("\u7531\u4e8e\u7f51\u4e0a\u6240\u9700\u7684\u4fe1\u606f\u60a8\u8fd8\u6ca1\u6709\u63d0\u4f9b, \u3000\u8bf7\u5b8c\u6210\u4e2a\u4eba\u8d44\u6599\u586b\u5199.");
        $("#mail").focus();
        return
    }
    if(mobile==""||mobile==null){
        alert("\u7531\u4e8e\u7f51\u4e0a\u6240\u9700\u7684\u4fe1\u606f\u60a8\u8fd8\u6ca1\u6709\u63d0\u4f9b, \u3000\u8bf7\u5b8c\u6210\u4e2a\u4eba\u8d44\u6599\u586b\u5199.");
        $("#phone").focus();
        return
    }
    $("#skipinfodiv").dialog("open")
    };
    
$("#futurebegindlg").dialog({
    bgiframe:true,
    draggable:true,
    autoOpen:false,
    modal:true,
    height:250,
    width:300,
    position:[350,100],
    title:"\u5c06\u8981\u63a8\u51fa",
    buttons:{
        "\u5173\u95ed":function(){
            $(this).dialog("close")
            }
        }
});
$("#customerlogindialog").dialog({
    bgiframe:true,
    draggable:true,
    autoOpen:false,
    modal:true,
    height:410,
    width:530,
    position:[350,100],
    title:"\u767b\u5f55"
});
$("#applymemberdlg").dialog({
    bgiframe:true,
    draggable:true,
    autoOpen:false,
    modal:true,
    height:310,
    width:400,
    title:"\u7533\u8bf7\u4f1a\u5458"
});
changechkcode=function(){
    $("#imgcheckcode").attr("src",_context+"/verify/customerCode.htm?length=5&rnd="+Math.random())
    };
    
recommgift=function(){
    common=function(){
        $("form:eq(0)").attr("action",_context+"/custcentercontroller-recommgift.html");
        $("form:eq(0)").attr("method","post");
        $("form:eq(0)").submit()
        };
        
    $.ajax({
        type:"POST",
        url:_context+"/custcentercontroller-getLoginid.html",
        dataType:"json",
        success:function(_){
            var A=_.customerid;
            if(A==""||A==null||A=="undefined")$("#customerlogindialog").dialog("open");
            else{
                $("form:eq(0)").attr("action",_context+"/custcentercontroller-recommgift.html");
                $("form:eq(0)").attr("method","post");
                $("form:eq(0)").submit()
                }
            }
    })
};

backtoindex=function(){
    $("form:eq(0)").attr("action","./");
    $("form:eq(0)").attr("method","post");
    $("form:eq(0)").submit()
    };
    
intorestdelivery=function(A,_,F){
    var G=$.cookie("cartcookie");
    if(G==""||G==null){
        $("#nullmycartsuggest").dialog("open");
        return
    }
    var C="";
    if(servicetype!=""){
        if(servicetype=="0"){
            var B=$("#peoplenums").val();
            if(B==""){
                $(".servpeoplenumsuggests").html("\u5c31\u9910\u4eba\u6570\u4e0d\u4e3a\u7a7a");
                $(".servpeoplenumsuggests").focus();
                return
            }
            if(isNumber(B)==false){
                $(".servpeoplenumsuggests").html("\u8bf7\u8f93\u5165\u6570\u5b57\u4e14\u4e3a\u6574\u6570");
                $(".servpeoplenumsuggests").focus();
                return
            }
            if(B=="0"){
                $(".servpeoplenumsuggests").html("\u5c31\u9910\u4eba\u6570\u5fc5\u987b\u662f\u5927\u4e8e\u96f6\u7684\u6709\u6548\u6574\u6570");
                $(".servpeoplenumsuggests").focus();
                return
            }
            if(B.length>4){
                $(".servpeoplenumsuggests").html("\u8bf7\u8f93\u5165\u6709\u6548\u7684\u4eba\u6570\u8303\u56f4");
                $(".servpeoplenumsuggests").focus();
                return
            }
            C=formatFloat(parseInt(B)*formatFloat($("#servmoneyeachperson").html(),2),2)
            }
            if(servicetype=="1")C=$("#totalservicefee").html()
            }
            $(".servpeoplenumsuggests").html("");
    var E=$("#peoplenums").val();
    if(E==null||E==""||E=="undefined"||E==undefined)E="";
    var D="";
    $("select").each(function(){
        D+=this.id+"|"+this.value+"|"
        });
    $.ajax({
        type:"POST",
        url:_context+"/restdelivery.do?method=vallimitmoney&restaurantid="+A+"&cartlist="+encodeURI(encodeURI(G))+"&peoplenum="+E,
        dataType:"json",
        success:function(B){
            var C=B.isvalid;
            if(C=="false"){
                $(F).find(".tips").show();
                setTimeout(function(){
                    $(F).find(".tips").hide()
                    },4000)
                }else{
                $("form:eq(0)").attr("action",_context+"/restdelivery.do?method=intorestdelivery&restaurantid="+A+"&cartlist="+encodeURI(encodeURI(G))+"&tastelevel="+D+"&peoplenum="+E+"&customerid="+_);
                $("form:eq(0)").attr("method","post");
                $("form:eq(0)").submit()
                }
            }
    })
};

commitApply=function(_){
    $("form:eq(0)").attr("action",_context+"/custcentercontroller-applymember.html&restaurantid="+_);
    $("form:eq(0)").attr("method","post");
    $("form:eq(0)").submit()
    };
    
loginzfb=function(){
    $("form:eq(0)").attr("action",_context+"/customerController-loginzfb.html");
    $("form:eq(0)").attr("method","post");
    $("form:eq(0)").submit()
    };
    
intoActivity=function(){
    $("form:eq(0)").attr("action","../corp.cdian.cn/activity/gtfActivities.htm");
    $("form:eq(0)").attr("target","_blank");
    $("form:eq(0)").submit()
    };
    
intoOnlineSeating=function(_){
    common=function(){
        $("form:eq(0)").attr("action",_context+"/orderfood-loadOnlineseatings.html&restaurantid="+_);
        $("form:eq(0)").attr("method","post");
        $("form:eq(0)").submit()
        };
        
    $.ajax({
        type:"POST",
        url:_context+"/custcentercontroller-getLoginid.html",
        dataType:"json",
        success:function(A){
            var B=A.customerid;
            if(B==""||B==null||B=="undefined")$("#customerlogindialog").dialog("open");
            else{
                $("form:eq(0)").attr("action",_context+"/orderfood-loadOnlineseatings.html&restaurantid="+_);
                $("form:eq(0)").attr("method","post");
                $("form:eq(0)").submit()
                }
            }
    })
};

closeApplymember=function(){
    $("#applymemberdlg").dialog("close")
    };
    
applymember=function(){
    common=function(){
        $.ajax({
            type:"POST",
            url:_context+"/custcentercontroller-valRestMember.html",
            dataType:"json",
            data:{
                customerid:_loginid,
                restaurantid:restaurantid
            },
            success:function(_){
                var A=_.existed;
                if(A=="true"){
                    $("#liapplymember").hide();
                    alert("\u60a8\u5df2\u7ecf\u662f"+restaurantname+"\u7684\u4f1a\u5458\u4e86.")
                    }else{
                    $("form:eq(0)").attr("action",_context+"/custcentercontroller-loadrequestmember.html&restaurantid="+restaurantid+"&restaurantname="+restaurantname);
                    $("form:eq(0)").attr("method","post");
                    $("form:eq(0)").submit()
                    }
                }
        })
};

$.ajax({
    type:"POST",
    url:_context+"/custcentercontroller-getLoginid.html",
    dataType:"json",
    success:function(_){
        var A=_.customerid;
        if(A==""||A==null||A=="undefined")$("#customerlogindialog").dialog("open");else $.ajax({
            type:"POST",
            url:_context+"/custcentercontroller-valRestMember.html",
            dataType:"json",
            data:{
                customerid:A,
                restaurantid:restaurantid
            },
            success:function(_){
                var A=_.existed;
                if(A=="true"){
                    $("#liapplymember").hide();
                    alert("\u60a8\u5df2\u7ecf\u662f"+restaurantname+"\u7684\u4f1a\u5458\u4e86.")
                    }else{
                    $("form:eq(0)").attr("action",_context+"/custcentercontroller-loadrequestmember.html&restaurantid="+restaurantid+"&restaurantname="+restaurantname);
                    $("form:eq(0)").attr("method","post");
                    $("form:eq(0)").submit()
                    }
                }
        })
    }
})
};

$("#activePhonedialog").dialog({
    bgiframe:true,
    draggable:true,
    autoOpen:false,
    modal:true,
    height:300,
    width:540,
    position:[350,100],
    title:"\u624b\u673a\u9a8c\u8bc1"
});
$("#colfoodsuccessdig").dialog({
    bgiframe:true,
    draggable:true,
    autoOpen:false,
    modal:true,
    buttons:{
        "\u5173\u95ed":function(){
            $(this).dialog("close")
            }
        }
});
$("#tradereqfaileddig").dialog({
    bgiframe:true,
    draggable:true,
    autoOpen:false,
    modal:true,
    width:450,
    height:200,
    buttons:{
        "\u5173\u95ed":function(){
            $(this).dialog("close")
            }
        }
});
$("#colfoodfaileddig").dialog({
    bgiframe:true,
    draggable:true,
    autoOpen:false,
    modal:true,
    buttons:{
        "\u5173\u95ed":function(){
            $(this).dialog("close")
            }
        }
});
intofooddetails2=function(A,_){
    $("form:eq(0)").attr("action",_context+"/fooddetail-loadPage2.html&restaurantid="+A+"&foodid="+_);
    $("form:eq(0)").attr("target","_blank");
    $("form:eq(0)").attr("method","post");
    $("form:eq(0)").submit()
    };
    
$("#colrestsuccessdig").dialog({
    bgiframe:true,
    draggable:true,
    autoOpen:false,
    modal:true,
    buttons:{
        "\u5173\u95ed":function(){
            $(this).dialog("close")
            }
        }
});
$("#colrestfaileddig").dialog({
    bgiframe:true,
    draggable:true,
    autoOpen:false,
    modal:true,
    buttons:{
        "\u5173\u95ed":function(){
            $(this).dialog("close")
            }
        }
});
addToCartnoleave=function(C,I,F,D,H,G){
    var E=$.cookie("restaurantid"),J=$.cookie("cartcookie");
    if(E!=null&&E!=G&&J!=""&&J!=null){
        $("#adddiffrest").dialog({
            bgiframe:true,
            draggable:true,
            modal:true,
            width:_,
            height:B,
            buttons:{
                "\u53d6\u6d88":function(){
                    $(this).dialog("close")
                    },
                "\u786e\u8ba4":function(){
                    $.cookie("cartcookie",null,A);
                    $(this).dialog("destroy");
                    addTomycart3(C,I,F,D,H,G)
                    }
                }
        });
$("#adddiffrest").dialog("open")
}else addTomycart3(C,I,F,D,H,G)
    };
    
addToCart=function(C,J,G,D,I,H,E){
    var F=$.cookie("restaurantid"),K=$.cookie("cartcookie");
    if(F!=null&&F!=H&&K!=""&&K!=null){
        $("#adddiffrest").dialog({
            bgiframe:true,
            draggable:true,
            modal:true,
            width:_,
            height:B,
            buttons:{
                "\u53d6\u6d88":function(){
                    $(this).dialog("destroy")
                    },
                "\u786e\u8ba4":function(){
                    $.cookie("cartcookie",null,A);
                    $(this).dialog("destroy");
                    addToMyCart(C,J,G,D,I,H,E)
                    }
                }
        });
$("#adddiffrest").dialog("open")
}else addToMyCart(C,J,G,D,I,H,E)
    };
    
closeCommentRestDialog=function(){
    $("#commentrestdlg").dialog("close")
    };
    
closeCommentFoodDialog=function(){
    $("#commentfooddlg").dialog("close")
    };
    
openIntologin=function(){
    $("form:eq(0)").attr("action",_context+"/custcentercontroller-login.html");
    $("form:eq(0)").attr("target","userlogin");
    $("form:eq(0)").submit()
    };
    
intoMainpagefromlogin=function(){
    if(window.opener==null){
        window.location.href=_context+"/mainpage-loadPage.html";
        return
    }
    window.opener.location.href=_context+"/mainpage-loadPage.html";
    window.open("","_top");
    window.top.close()
    };
    
intoMyOrderfood=function(){
    if(window.opener==null){
        window.location.href=_context+"/mainpage-loadSearchRest.html";
        return
    }
    window.opener.location.href=_context+"/mainpage-loadSearchRest.html";
    window.open("","_top");
    window.top.close()
    };
    
intoSearchrestaurant=function(){
    var _="287",$="\u4e0a\u6d77";
    if(window.opener==null){
        window.location.href=_context+"/foodrestsearch-loadRestPage.html&cityid="+_+"&cityname="+$;
        return
    }
    window.opener.location.href=_context+"/foodrestsearch-loadRestPage.html&cityid="+_+"&cityname="+$;
    window.open("","_top");
    window.top.close()
    };
    
intoSearchfood=function(){
    var _="287",$="\u4e0a\u6d77";
    if(window.opener==null){
        window.location.href=_context+"/foodrestsearch-loadPage.html&cityid="+_+"&cityname="+$;
        return null
        }
        window.opener.location.href=_context+"/foodrestsearch-loadPage.html&cityid="+_+"&cityname="+$;
    window.open("","_top");
    window.top.close()
    };
    
logoutsystem=function(){
    $.ajax({
        type:"POST",
        url:_context+"/customerController-logoutsystem.html",
        dataType:"json",
        success:function($){
            changelogstyle1();
            _loginid="";
            _loginname=""
            }
        })
};

logoutsysintomain=function(){
    $("form:eq(0)").attr("action",_context+"/mainpage-logoutfromsystem.html");
    $("form:eq(0)").attr("method","post");
    $("form:eq(0)").submit()
    };
    
changelogstyle1=function(){
    $(".logininsys").show();
    $(".logoutsys").hide();
    $(".welinfo").html("\u60a8\u597d\uff0c\u6b22\u8fce\u6765\u5230\u5403\u70b9\u7f51\uff01")
    };
    
changelogsyle=function(){
    $(".logininsys").hide();
    $(".logoutsys").show();
    $(".welinfo").html(_loginname+"&nbsp;&#151;&nbsp;\u60f3\u5403\u5c31\u70b9, \u5c31\u662f\u8fd9\u4e48\u7b80\u5355\uff01")
    };
    
$("#newmsg").click(function(){
    $("form:eq(0)").attr("action",_context+"/custcentercontroller-loadCustMsgcenter.html");
    $("form:eq(0)").attr("method","post");
    $("form:eq(0)").submit()
    });
searchAllFood=function(){
    var A=$("#cityid").val();
    A="287";
    var _=$("#cityname").text();
    _="\u4e0a\u6d77";
    $("form:eq(0)").attr("action",_context+"/foodrestsearch-loadPage.html&cityid="+A+"&cityname="+_);
    $("form:eq(0)").attr("method","post");
    $("form:eq(0)").submit()
    };
    
searchAllRestaurant=function(){
    var A=$("#cityid").val();
    A="287";
    var _=$("#cityname").text();
    _="\u4e0a\u6d77";
    $("form:eq(0)").attr("action",_context+"/foodrestsearch-loadRestPage.html&cityid="+A+"&cityname="+_);
    $("form:eq(0)").attr("method","post");
    $("form:eq(0)").submit()
    };
    
intoCustomerCenter2=function(_){
    common=function(){
        $("form:eq(0)").attr("action",_context+"/customerController-loadCustomerAccountPage2.html?customerid="+_);
        $("form:eq(0)").attr("method","post");
        $("form:eq(0)").submit()
        };
        
    $.ajax({
        type:"POST",
        url:_context+"/custcentercontroller-getLoginid.html",
        dataType:"json",
        success:function(A){
            var B=A.customerid;
            if(B==""||B==null||B=="undefined")$("#customerlogindialog").dialog("open");
            else{
                $("form:eq(0)").attr("action",_context+"/customerController-loadCustomerAccountPage2.html?customerid="+_);
                $("form:eq(0)").attr("method","post");
                $("form:eq(0)").submit()
                }
            }
    })
};

intoCustomerCenter=function(){
    common=function(){
        $("form:eq(0)").attr("action",_context+"/customerController-loadCustomerAccountPage.html");
        $("form:eq(0)").attr("method","post");
        $("form:eq(0)").submit()
        };
        
    $.ajax({
        type:"POST",
        url:_context+"/custcentercontroller-getLoginid.html",
        dataType:"json",
        success:function(_){
            var A=_.customerid;
            if(A==""||A==null||A=="undefined")$("#customerlogindialog").dialog("open");
            else{
                $("form:eq(0)").attr("action",_context+"/customerController-loadCustomerAccountPage.html");
                $("form:eq(0)").attr("method","post");
                $("form:eq(0)").submit()
                }
            }
    })
};

checkMobile=function($){
    var _=/^[1][3,4,5,8][0-9]{9}$/,A=new RegExp(_);
    if(A.test($))return true;else return false
        };
        
autoOrderFood=function(_){
    $("form:eq(0)").attr("action",_context+"/autoOrderController-loadPage.html&rid="+_);
    $("form:eq(0)").attr("method","post");
    $("form:eq(0)").submit()
    };
    
addToMyCartnoleave=function(C,I,F,D,H,G){
    var E=$.cookie("restaurantid"),J=$.cookie("cartcookie");
    if(E!=null&&E!=G&&J!=""&&J!=null){
        $("#adddiffrest").dialog({
            bgiframe:true,
            draggable:true,
            modal:true,
            width:_,
            height:B,
            buttons:{
                "\u53d6\u6d88":function(){
                    $(this).dialog("close")
                    },
                "\u786e\u8ba4":function(){
                    $.cookie("cartcookie",null,A);
                    $(this).dialog("destroy");
                    addTomycart2(C,I,F,D,H,G)
                    }
                }
        });
$("#adddiffrest").dialog("open")
}else addTomycart2(C,I,F,D,H,G)
    };
    
hideSuccesshint=function(_){
    $("#successtint"+_).hide()
    };
    
addTomycart3=function(_,E,B,A,D,C){
    if(E=="1")$.ajax({
        type:"POST",
        url:_context+"/customerController-getCulinaryMethods.html",
        dataType:"json",
        data:{
            maindishid:_
        },
        cache:false,
        success:function(F){
            var I=F.culinarymethods;
            if(I.length>0){
                var G="";
                for(var H=0;H<I.length;H++)if(H==0)G+=" <li><input type=\"radio\" name=\"cookingStyle\" checked/> <label style=\"font-size:14px;\">"+I[H].methodname+"</label></li>";else G+=" <li><input type=\"radio\" name=\"cookingStyle\"/> <label style=\"font-size:14px;\">"+I[H].methodname+"</label></li>";$("#selectculinarymethoddlg").dialog({
                    bgiframe:true,
                    draggable:true,
                    modal:true,
                    title:"\u8bf7\u9009\u62e9\u70f9\u996a\u65b9\u6cd5",
                    open:function(A,_){
                        $("a.ui-dialog-titlebar-close").hide();
                        $("#selectculinarymethoddlg").find("ul").html("");
                        $("#selectculinarymethoddlg").find("ul").html(G)
                        },
                    buttons:{
                        "\u53d6\u6d88":function(){
                            $("a.ui-dialog-titlebar-close").show();
                            $(this).dialog("destroy")
                            },
                        "\u786e\u8ba4":function(){
                            $("#selectculinarymethoddlg").dialog("destroy");
                            var F="";
                            $("input[name=\"cookingStyle\"]").each(function(){
                                if($(this).attr("checked"))F=$(this).next().html()
                                    });
                            D=D+"("+F+")";
                            adddishaction3(_,E,B,A,D,C);
                            $("a.ui-dialog-titlebar-close").show()
                            }
                        }
                });
        $("#selectculinarymethoddlg").dialog("open")
        }else adddishaction3(_,E,B,A,D,C)
        }
    });else adddishaction3(_,E,B,A,D,C)
    };
    
addTomycart2=function(_,F,B,A,E,D,C){
    if(F=="1")$.ajax({
        type:"POST",
        url:_context+"/customerController-getCulinaryMethods.html",
        dataType:"json",
        data:{
            maindishid:_
        },
        cache:false,
        success:function(G){
            var J=G.culinarymethods;
            if(J.length>0){
                var H="";
                for(var I=0;I<J.length;I++)if(I==0)H+=" <li><input type=\"radio\" name=\"cookingStyle\" checked/> <label style=\"font-size:14px;\">"+J[I].methodname+"</label></li>";else H+=" <li><input type=\"radio\" name=\"cookingStyle\"/> <label style=\"font-size:14px;\">"+J[I].methodname+"</label></li>";$("#selectculinarymethoddlg").dialog({
                    bgiframe:true,
                    draggable:true,
                    modal:true,
                    title:"\u8bf7\u9009\u62e9\u70f9\u996a\u65b9\u6cd5",
                    open:function(A,_){
                        $("a.ui-dialog-titlebar-close").hide();
                        $("#selectculinarymethoddlg").find("ul").html("");
                        $("#selectculinarymethoddlg").find("ul").html(H)
                        },
                    buttons:{
                        "\u53d6\u6d88":function(){
                            $("a.ui-dialog-titlebar-close").show();
                            $(this).dialog("destroy")
                            },
                        "\u786e\u8ba4":function(){
                            $("#selectculinarymethoddlg").dialog("destroy");
                            var G="";
                            $("input[name=\"cookingStyle\"]").each(function(){
                                if($(this).attr("checked"))G=$(this).next().html()
                                    });
                            E=E+"("+G+")";
                            adddishaction(_,F,B,A,E,D,C);
                            $("a.ui-dialog-titlebar-close").show()
                            }
                        }
                });
        $("#selectculinarymethoddlg").dialog("open")
        }else adddishaction(_,F,B,A,E,D,C)
        }
    });else adddishaction(_,F,B,A,E,D,C)
    };
    
adddishaction3=function(_,R,N,B,P,Q){
    $("#addtocartsuccess").show();
    setTimeout(function(){
        $("#addtocartsuccess").hide()
        },1000);
    var O=$("#quantity"+B).val();
    O=1;
    if($.cookie("cartcookie")==null){
        var D=formatFloat(formatFloat(N,2)*parseInt(O),2),S=_+"|"+R+"|"+D+"|"+O+"|"+P;
        $.cookie("cartcookie",S,C);
        $.cookie("restaurantid",Q,C)
        }else{
        var I=$.cookie("cartcookie"),H=new String(I),J=H.split("|"),E=false,K=0;
        while(K<J.length){
            if(_==J[K]){
                var F=J[K+3],M=J[K+2];
                J[K+3]=parseInt(F)+parseInt(O);
                J[K+2]=formatFloat(formatFloat(M,2)+(formatFloat(N,2)*O),2);
                E=true
                }
                K+=5
            }
            if(E==true){
            var L=J[0];
            for(var G=1;G<J.length;G++)L+="|"+J[G];
            I=L
            }
            if(E==false){
            var T=formatFloat(formatFloat(N,2)*parseInt(O),2),A="|"+_+"|"+R+"|"+T+"|"+O+"|"+P;
            I+=A
            }
            $.cookie("cartcookie",I,C)
        }
    };

adddishaction=function(_,S,N,B,Q,R,O){
    $(O).parent().parent().find(".successaddmenu").show();
    var P=$("#quantity"+B).val();
    P=1;
    if($.cookie("cartcookie")==null){
        var D=formatFloat(formatFloat(N,2)*parseInt(P),2),T=_+"|"+S+"|"+D+"|"+P+"|"+Q;
        $.cookie("cartcookie",T,C);
        $.cookie("restaurantid",R,C)
        }else{
        var J=$.cookie("cartcookie"),H=new String(J),I=H.split("|"),E=false,K=0;
        while(K<I.length){
            if(_==I[K]){
                var F=I[K+3],M=I[K+2];
                I[K+3]=parseInt(F)+parseInt(P);
                I[K+2]=formatFloat(formatFloat(M,2)+(formatFloat(N,2)*P),2);
                E=true
                }
                K+=5
            }
            if(E==true){
            var L=I[0];
            for(var G=1;G<I.length;G++)L+="|"+I[G];
            J=L
            }
            if(E==false){
            var U=formatFloat(formatFloat(N,2)*parseInt(P),2),A="|"+_+"|"+S+"|"+U+"|"+P+"|"+Q;
            J+=A
            }
            $.cookie("cartcookie",J,C)
        }
        $("#successtint"+B).show();
    setTimeout("hideSuccesshint("+B+")",2000);
    setTimeout(function(){
        $(O).parent().parent().find(".successaddmenu").hide()
        },2000)
    };
    
adddishaction2=function(_,S,O,B,Q,R,N){
    var P=$("#quantity"+B).val();
    if(B=="")P=1;
    if($.cookie("cartcookie")==null){
        var D=formatFloat(formatFloat(O,2)*parseInt(P),2),T=_+"|"+S+"|"+D+"|"+P+"|"+Q;
        $.cookie("cartcookie",T,C);
        $.cookie("restaurantid",R,C)
        }else{
        var J=$.cookie("cartcookie"),H=new String(J),I=H.split("|"),E=false,K=0;
        while(K<I.length){
            if(_==I[K]){
                var F=I[K+3],M=I[K+2];
                I[K+3]=parseInt(F)+parseInt(P);
                I[K+2]=formatFloat(formatFloat(M,2)+(formatFloat(O,2)*P),2);
                E=true
                }
                K+=5
            }
            if(E==true){
            var L=I[0];
            for(var G=1;G<I.length;G++)L+="|"+I[G];
            J=L
            }
            if(E==false){
            var U=formatFloat(formatFloat(O,2)*parseInt(P),2),A="|"+_+"|"+S+"|"+U+"|"+P+"|"+Q;
            J+=A
            }
            $.cookie("cartcookie",J,C)
        }
        $("form:eq(0)").attr("action",_context+"/orderfood-loadPage.html&restaurantid="+R+"&restaurantname="+N);
    $("form:eq(0)").removeAttr("target");
    $("form:eq(0)").attr("method","post");
    $("form:eq(0)").submit()
    };
    
addToMyCart=function(_,F,C,A,E,D,B){
    if(F=="1")$.ajax({
        type:"POST",
        url:_context+"/customerController-getCulinaryMethods.html",
        dataType:"json",
        cache:false,
        data:{
            maindishid:_
        },
        success:function(G){
            var J=G.culinarymethods;
            if(J.length>0){
                var H="";
                for(var I=0;I<J.length;I++)if(I==0)H+=" <li><input type=\"radio\" name=\"cookingStyle\" checked/> <label style=\"font-size:14px;\">"+J[I].methodname+"</label></li>";else H+=" <li><input type=\"radio\" name=\"cookingStyle\"/> <label style=\"font-size:14px;\">"+J[I].methodname+"</label></li>";$("#selectculinarymethoddlg").dialog({
                    bgiframe:true,
                    draggable:true,
                    modal:true,
                    title:"\u8bf7\u9009\u62e9\u70f9\u996a\u65b9\u6cd5",
                    open:function(A,_){
                        $("a.ui-dialog-titlebar-close").hide();
                        $("#selectculinarymethoddlg").find("ul").html("");
                        $("#selectculinarymethoddlg").find("ul").html(H)
                        },
                    buttons:{
                        "\u53d6\u6d88":function(){
                            $(this).dialog("destroy");
                            $("a.ui-dialog-titlebar-close").show()
                            },
                        "\u786e\u8ba4":function(){
                            $("#selectculinarymethoddlg").dialog("destroy");
                            var G="";
                            $("input[name=\"cookingStyle\"]").each(function(){
                                if($(this).attr("checked"))G=$(this).next().html()
                                    });
                            E=E+"("+G+")";
                            adddishaction2(_,F,C,A,E,D,B);
                            $("a.ui-dialog-titlebar-close").show()
                            }
                        }
                });
        $("#selectculinarymethoddlg").dialog("open")
        }else adddishaction2(_,F,C,A,E,D,B)
        }
    });else adddishaction2(_,F,C,A,E,D,B)
    };
    
commentFoodfrommainpage=function(C,_,B,A){
    $("form:eq(0)").attr("action",_context+"/fooddetail-loadPage.html&foodtype="+C+"&foodid="+_+"&restaurantid="+B+"&restaurantname="+A+"#1");
    $("form:eq(0)").attr("method","post");
    $("form:eq(0)").submit()
    };
    
searchbyrestword=function(A,_){
    var B=$("#searchword").val();
    if(B==""){
        $("#searchword").focus();
        return
    }
    $("form:eq(0)").attr("action",_context+"/orderfood-getRestaurantWordSearch.html&restaurantid="+A+"&searchword="+encodeURI(encodeURI(B))+"&restaurantname="+encodeURI(encodeURI(_)));
    $("form:eq(0)").removeAttr("target");
    $("form:eq(0)").attr("method","post");
    $("form:eq(0)").submit()
    };
    
getStarfromcomment=function(_){
    var $="";
    if(_==0)$+="<img src=\""+_context+"/images/foodrestsearch/kong_03.gif\" width=\"15\" height=\"15\" />&nbsp;<img src=\""+_context+"/images/foodrestsearch/kong_03.gif\" width=\"15\" height=\"15\" />&nbsp;<img src=\""+_context+"/images/foodrestsearch/kong_03.gif\" width=\"15\" height=\"15\"/>&nbsp;<img src=\""+_context+"/images/foodrestsearch/kong_03.gif\" width=\"15\" height=\"15\"/>&nbsp;<img src=\""+_context+"/images/foodrestsearch/kong_03.gif\" width=\"15\" height=\"15\"/>";
    else if(_<1.5&&_>0)$+="<img src=\""+_context+"/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" />&nbsp;<img src=\""+_context+"/images/foodrestsearch/kong_03.gif\" width=\"15\" height=\"15\" />&nbsp;<img src=\""+_context+"/images/foodrestsearch/kong_03.gif\" width=\"15\" height=\"15\"/>&nbsp;<img src=\""+_context+"/images/foodrestsearch/kong_03.gif\" width=\"15\" height=\"15\"/>&nbsp;<img src=\""+_context+"/images/foodrestsearch/kong_03.gif\" width=\"15\" height=\"15\"/>";
    else if(_>=1.5&&_<2)$+="<img src=\""+_context+"/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" />&nbsp;<img src=\""+_context+"/images/foodrestsearch/s05.gif\" width=\"15\" height=\"15\" />&nbsp;<img src=\""+_context+"/images/foodrestsearch/kong_03.gif\" width=\"15\" height=\"15\"/>&nbsp;<img src=\""+_context+"/images/foodrestsearch/kong_03.gif\" width=\"15\" height=\"15\"/>&nbsp;<img src=\""+_context+"/images/foodrestsearch/kong_03.gif\" width=\"15\" height=\"15\"/>";
    else if(_>=2&&_<2.5)$+="<img src=\""+_context+"/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" />&nbsp;<img src=\""+_context+"/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" />&nbsp;<img src=\""+_context+"/images/foodrestsearch/kong_03.gif\" width=\"15\" height=\"15\"/>&nbsp;<img src=\""+_context+"/images/foodrestsearch/kong_03.gif\" width=\"15\" height=\"15\"/>&nbsp;<img src=\""+_context+"/images/foodrestsearch/kong_03.gif\" width=\"15\" height=\"15\"/>";
    else if(_>=2.5&&_<3)$+="<img src=\""+_context+"/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" />&nbsp;<img src=\""+_context+"/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" />&nbsp;<img src=\""+_context+"/images/foodrestsearch/s05.gif\" width=\"15\" height=\"15\"/>&nbsp;<img src=\""+_context+"/images/foodrestsearch/kong_03.gif\" width=\"15\" height=\"15\"/>&nbsp;<img src=\""+_context+"/images/foodrestsearch/kong_03.gif\" width=\"15\" height=\"15\"/>";
    else if(_>=3&&_<3.5)$+="<img src=\""+_context+"/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" />&nbsp;<img src=\""+_context+"/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" />&nbsp;<img src=\""+_context+"/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\"/>&nbsp;<img src=\""+_context+"/images/foodrestsearch/kong_03.gif\" width=\"15\" height=\"15\"/>&nbsp;<img src=\""+_context+"/images/foodrestsearch/kong_03.gif\" width=\"15\" height=\"15\"/>";
    else if(_>=3.5&&_<4)$+="<img src=\""+_context+"/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" />&nbsp;<img src=\""+_context+"/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" />&nbsp;<img src=\""+_context+"/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\"/>&nbsp;<img src=\""+_context+"/images/foodrestsearch/s05.gif\" width=\"15\" height=\"15\"/>&nbsp;<img src=\""+_context+"/images/foodrestsearch/kong_03.gif\" width=\"15\" height=\"15\"/>";
    else if(_>=4&&_<4.5)$+="<img src=\""+_context+"/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" />&nbsp;<img src=\""+_context+"/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" />&nbsp;<img src=\""+_context+"/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\"/>&nbsp;<img src=\""+_context+"/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\"/>&nbsp;<img src=\""+_context+"/images/foodrestsearch/kong_03.gif\" width=\"15\" height=\"15\"/>";
    else if(_>=4.5&&_<5)$+="<img src=\""+_context+"/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" />&nbsp;<img src=\""+_context+"/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" />&nbsp;<img src=\""+_context+"/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\"/>&nbsp;<img src=\""+_context+"/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\"/>&nbsp;<img src=\""+_context+"/images/foodrestsearch/s05.gif\" width=\"15\" height=\"15\"/>";else $+="<img src=\""+_context+"/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" />&nbsp;<img src=\""+_context+"/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\" />&nbsp;<img src=\""+_context+"/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\"/>&nbsp;<img src=\""+_context+"/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\"/>&nbsp;<img src=\""+_context+"/images/foodrestsearch/s1.gif\" width=\"15\" height=\"15\"/>";
    return $
    };
    
intoindex=function(_){
    $("form:eq(0)").attr("action",_);
    $("form:eq(0)").attr("method","post");
    $("form:eq(0)").submit()
    };
    
forgetpass=function(){
    $("form:eq(0)").attr("action",_context+"/jsp/customer/RequestPassword.jsp");
    $("form:eq(0)").attr("target","_blank");
    $("form:eq(0)").attr("method","post");
    $("form:eq(0)").submit()
    };
    
activePhone=function(_){
    common=function(){
        $("form:eq(0)").attr("action",_context+"/customerController-loadCustomerAccountPage.html");
        $("form:eq(0)").attr("method","post");
        $("form:eq(0)").submit()
        };
        
    $("#activePhonedialog").dialog("open");
    $("#custphonenum").html(_)
    };
    
checkoutmycart4=function(){
    var _=$.cookie("cartcookie");
    if(_==""||_==null)return;
    common=function(){
        checkoutmycart()
        };
        
    $.ajax({
        type:"POST",
        url:_context+"/custcentercontroller-getLoginid.html",
        dataType:"json",
        success:function(A){
            var B=A.customerid;
            if(B==""||B==null||B=="undefined")$("#customerlogindialog").dialog("open");else $.ajax({
                type:"POST",
                url:_context+"/customerController-ismobilevalid.html",
                dataType:"json",
                cache:false,
                data:{
                    customerid:B
                },
                success:function(C){
                    var B=C.status;
                    if(B!=""&&B=="0001"){
                        $("#activePhonedialog").dialog("open");
                        $("#custphonenum").html(C.phonenumber)
                        }else if(B!=""){
                        var A=$.cookie("restaurantid");
                        A=new String(A);
                        $.ajax({
                            type:"POST",
                            url:_context+"/custcentercontroller-validTradeCnt.html",
                            dataType:"json",
                            data:{
                                restaurantid:A
                            },
                            success:function(C){
                                var B=C.valid;
                                if(B=="true"){
                                    $("form:eq(0)").attr("action",_context+"/intoflow.do?restid="+A+"&cartlist="+encodeURI(encodeURI(_))+"&flag=0");
                                    $("form:eq(0)").attr("method","post");
                                    $("form:eq(0)").submit()
                                    }else $("#tradereqfaileddig").dialog("open")
                                    }
                                })
                    }
                }
            })
    }
    })
};

checkoutmycart=function(){
    var _=$.cookie("cartcookie");
    if(_==""||_==null)return;
    $("#mycartstaticinfo").animate({
        "width":"0px"
    },800,function(){
        $(".show_my_menu").show();
        $("#mycartstaticinfo").hide();
        $("div[name='mymenu2']").show()
        });
    common=function(){
        checkoutmycart()
        };
        
    $.ajax({
        type:"POST",
        url:_context+"/custcentercontroller-getLoginid.html",
        dataType:"json",
        success:function(A){
            var B=A.customerid;
            if(B==""||B==null||B=="undefined")$("#customerlogindialog").dialog("open");else $.ajax({
                type:"POST",
                url:_context+"/customerController-ismobilevalid.html",
                dataType:"json",
                cache:false,
                data:{
                    customerid:B
                },
                success:function(C){
                    var B=C.status;
                    if(B!=""&&B=="0001"){
                        $("#activePhonedialog").dialog("open");
                        $("#custphonenum").html(C.phonenumber)
                        }else if(B!=""){
                        var A=$.cookie("restaurantid");
                        A=new String(A);
                        $.ajax({
                            type:"POST",
                            url:_context+"/custcentercontroller-validTradeCnt.html",
                            dataType:"json",
                            data:{
                                restaurantid:A
                            },
                            success:function(C){
                                var B=C.valid;
                                if(B=="true"){
                                    $("form:eq(0)").attr("action",_context+"/intoflow.do?restid="+A+"&cartlist="+encodeURI(encodeURI(_))+"&flag=0");
                                    $("form:eq(0)").attr("method","post");
                                    $("form:eq(0)").submit()
                                    }else $("#tradereqfaileddig").dialog("open")
                                    }
                                })
                    }
                }
            })
    }
    })
};

checkoutmycart2=function(){
    $("#mycartstaticinfo").animate({
        "width":"0px"
    },800,function(){
        $(".show_my_menu").show();
        $("#mycartstaticinfo").hide();
        $("div[name='mymenu2']").show()
        });
    var _=$.cookie("cartcookie");
    if(_==""||_==null)return;
    common=function(){
        checkoutmycart2()
        };
        
    $.ajax({
        type:"POST",
        url:_context+"/custcentercontroller-getLoginid.html",
        dataType:"json",
        success:function(A){
            var B=A.customerid;
            if(B==""||B==null||B=="undefined")$("#customerlogindialog").dialog("open");else $.ajax({
                type:"POST",
                url:_context+"/customerController-ismobilevalid.html",
                dataType:"json",
                cache:false,
                data:{
                    customerid:B
                },
                success:function(D){
                    var C=D.status;
                    if(C!=""&&C=="0001"){
                        $("#activePhonedialog").dialog("open");
                        $("#custphonenum").html(D.phonenumber)
                        }else if(C!=""){
                        var A=$.cookie("restaurantid");
                        A=new String(A);
                        $.ajax({
                            type:"POST",
                            url:_context+"/custcentercontroller-validTradeCnt.html",
                            dataType:"json",
                            data:{
                                restaurantid:A
                            },
                            success:function(D){
                                var C=D.valid;
                                if(C=="true"){
                                    $("form:eq(0)").attr("action",_context+"/intoflow.do?restid="+A+"&customerid="+B+"&cartlist="+encodeURI(encodeURI(_))+"&flag=1");
                                    $("form:eq(0)").attr("method","post");
                                    $("form:eq(0)").submit()
                                    }else $("#tradereqfaileddig").dialog("open")
                                    }
                                })
                    }
                }
            })
    }
    })
};

checkoutmycart3=function(){
    $("#mycartstaticinfo").animate({
        "width":"0px"
    },800,function(){
        $(".show_my_menu").show();
        $("#mycartstaticinfo").hide();
        $("div[name='mymenu2']").show()
        });
    var _=$.cookie("cartcookie");
    if(_==""||_==null)return;
    common=function(){
        checkoutmycart3()
        };
        
    $.ajax({
        type:"POST",
        url:_context+"/custcentercontroller-getLoginid.html",
        dataType:"json",
        success:function(A){
            var B=A.customerid;
            if(B==""||B==null||B=="undefined")$("#customerlogindialog").dialog("open");else $.ajax({
                type:"POST",
                url:_context+"/customerController-ismobilevalid.html",
                dataType:"json",
                cache:false,
                data:{
                    customerid:B
                },
                success:function(D){
                    var C=D.status;
                    if(C!=""&&C=="0001"){
                        $("#activePhonedialog").dialog("open");
                        $("#custphonenum").html(D.phonenumber)
                        }else if(C!=""){
                        var A=$.cookie("restaurantid");
                        A=new String(A);
                        $.ajax({
                            type:"POST",
                            url:_context+"/custcentercontroller-validTradeCnt.html",
                            dataType:"json",
                            data:{
                                restaurantid:A
                            },
                            success:function(D){
                                var C=D.valid;
                                if(C=="true"){
                                    $("form:eq(0)").attr("action",_context+"/intoflow.do?restid="+A+"&customerid="+B+"&cartlist="+encodeURI(encodeURI(_))+"&flag=0&customername="+_loginname);
                                    $("form:eq(0)").attr("method","post");
                                    $("form:eq(0)").submit()
                                    }else $("#tradereqfaileddig").dialog("open")
                                    }
                                })
                    }
                }
            })
    }
    })
};

intoCustomerComment=function(_){
    $("form:eq(0)").attr("action",_context+"/custcommcontroller-getPageAllCommentsByCustid.html&customerid="+_);
    $("form:eq(0)").removeAttr("target");
    $("form:eq(0)").attr("method","post");
    $("form:eq(0)").submit()
    };
    
commentrest=function(A,_){
    $("#commentrestdlg").dialog("open")
    };
    
var D;
if($.browser.msie)D=735;else D=703;
commentrestfromcustomercenter=function(_){
    $("#commentrestdlg").dialog({
        bgiframe:true,
        draggable:true,
        autoOpen:false,
        modal:true,
        width:D,
        title:"\u9910\u5385\u8bc4\u8bba\u6846",
        open:function(B,A){
            $.ajax({
                type:"POST",
                url:_context+"/custcommcontroller-isCustomerRestaurantConsump.html",
                dataType:"json",
                data:{
                    customerid:_loginid,
                    restaurantid:_
                },
                success:function(A){
                    var _=A.isconsump;
                    if(_==-1){
                        $("#noconsump").show();
                        $("#everconsump").hide();
                        $("#lgconsumpcnt").hide();
                        $("#givepoints").find("input").each(function(){
                            $(this).attr("disabled",true)
                            });
                        $("#givepoints").css("color","gray")
                        }else if(_==1){
                        $("#noconsump").hide();
                        $("#everconsump").show();
                        $("#lgconsumpcnt").hide();
                        $("#givepoints").removeAttr("disabled")
                        }else{
                        $("#noconsump").hide();
                        $("#everconsump").hide();
                        $("#lgconsumpcnt").show();
                        $("#givepoints").find("input").each(function(){
                            $(this).attr("disabled",true)
                            });
                        $("#givepoints").css("color","gray")
                        }
                        $("#commentcustomname").text("");
                    $("#commentcustomname").text(_loginname);
                    iscustomerconsump=_
                    }
                })
        },
    buttons:{
        "\u5173\u95ed":function(){
            $(this).dialog("close")
            },
        "\u53d1\u8868\u8bc4\u8bba":function(){
            var F=$("#pageno").val(),G,C,B,A,E;
            if(iscustomerconsump==-1||iscustomerconsump==0){
                G=0;
                C=0;
                B=0;
                A=0;
                E=0
                }else{
                G=$("input[name='taste']:checked").val();
                C=$("input[name='service']:checked").val();
                B=$("input[name='environment']:checked").val();
                E=$("input[name='overall']:checked").val();
                A=$("input[name='recommrate']:checked").val()
                }
                var D=$("textarea[name='comments']").val();
            if(D=="\u6211\u7684\u8bc4\u8bba\uff1a(\u4e0d\u5c11\u4e8e5\u4e2a\u6c49\u5b57, \u6700\u5927\u53ef\u8f93\u51652000\u4e2a\u6c49\u5b57)"){
                $("textarea[name='comments']").focus();
                return
            }
            if(D==""||D.replace(/[^x00-xFF]/g,"**").length<10){
                $("textarea[name='comments']").val("\u6211\u7684\u8bc4\u8bba\uff1a(\u4e0d\u5c11\u4e8e5\u4e2a\u6c49\u5b57, \u6700\u5927\u53ef\u8f93\u51652000\u4e2a\u6c49\u5b57)");
                return
            }
            D=setContent(D);
            $.ajax({
                type:"POST",
                url:_context+"/custcommcontroller-addCustRestComment.html",
                dataType:"json",
                data:{
                    customerid:_loginid,
                    restaurantid:_,
                    taste:G,
                    service:C,
                    environment:B,
                    recommrate:A,
                    overall:E,
                    comments:D
                },
                success:function($){
                    alert("\u53d1\u8868\u6210\u529f")
                    }
                });
        $(this).dialog("destroy")
        }
    }
});
$("#commentrestdlg").dialog("open")
};

commentfoodfromcustomercenter=function(E,_,B,A,C){
    $("#commentfooddlg").dialog({
        bgiframe:true,
        draggable:true,
        autoOpen:false,
        modal:true,
        width:D,
        title:"\u98df\u54c1\u8bc4\u8bba\u6846",
        open:function(B,A){
            $.ajax({
                type:"POST",
                url:_context+"/custcommcontroller-isCustomerFoodConsump.html",
                dataType:"json",
                data:{
                    customerid:_loginid,
                    foodtype:E,
                    foodid:_
                },
                success:function(A){
                    var _=A.isconsump;
                    if(_==-1){
                        $("#foodnoconsump").show();
                        $("#foodeverconsump").hide();
                        $("#foodlgcosumpcnt").hide();
                        $("#foodgivepoints").find("input").each(function(){
                            $(this).attr("disabled",true)
                            });
                        $("#foodgivepoints").css("color","gray")
                        }else if(_==1){
                        $("#foodnoconsump").hide();
                        $("#foodeverconsump").show();
                        $("#foodlgcosumpcnt").hide();
                        $("#foodgivepoints").removeAttr("disabled")
                        }else{
                        $("#foodnoconsump").hide();
                        $("#foodeverconsump").hide();
                        $("#foodlgcosumpcnt").show();
                        $("#foodgivepoints").find("input").each(function(){
                            $(this).attr("disabled",true)
                            });
                        $("#foodgivepoints").css("color","gray")
                        }
                        $("#foodcommentcustomname").text("");
                    $("#foodcommentcustomname").text(_loginname);
                    iscustomerconsump=_
                    }
                })
        },
    buttons:{
        "\u53d6\u6d88":function(){
            $(this).dialog("destroy")
            },
        "\u53d1\u8868\u8bc4\u8bba":function(){
            var H=$("#pageno").val(),I,D,J,A,G;
            if(iscustomerconsump==-1||iscustomerconsump==0){
                I=0;
                D=0;
                J=0;
                A=0;
                G=0
                }else{
                I=$("input[name='foodtaste']:checked").val();
                D=$("input[name='foodcolor']:checked").val();
                J=$("input[name='foodscent']:checked").val();
                A=$("input[name='foodrecommendindex']:checked").val();
                G=$("input[name='foodoverall']:checked").val()
                }
                var F=$("textarea[name='foodcomments']").val();
            if(F=="\u6211\u7684\u8bc4\u8bba\uff1a(\u4e0d\u5c11\u4e8e5\u4e2a\u6c49\u5b57, \u6700\u5927\u53ef\u8f93\u51652000\u4e2a\u6c49\u5b57)"){
                $("textarea[name='foodcomments']").focus();
                return
            }
            if(F==""||F.replace(/[^x00-xFF]/g,"**").length<10){
                $("textarea[name='foodcomments']").val("\u6211\u7684\u8bc4\u8bba\uff1a(\u4e0d\u5c11\u4e8e5\u4e2a\u6c49\u5b57, \u6700\u5927\u53ef\u8f93\u51652000\u4e2a\u6c49\u5b57)");
                return
            }
            F=setContent(F);
            $.ajax({
                type:"POST",
                url:_context+"/custcommcontroller-addCustomerFoodComment.html",
                dataType:"json",
                data:{
                    customerid:_loginid,
                    foodtype:E,
                    foodid:_,
                    taste:I,
                    color:D,
                    scent:J,
                    recommendedindex:A,
                    restaurantid:B,
                    foodname:C,
                    overall:G,
                    comments:F
                },
                success:function($){
                    alert("\u53d1\u8868\u6210\u529f")
                    }
                });
        $(this).dialog("destroy")
        }
    }
});
$("#commentfooddlg").dialog("open")
};

commentfood=function(B,D,C,_,A){
    $("#commentfooddlg").dialog("open")
    };
    
commentfood2=function(B,D,C,_,A){
    $("#commentfooddlg2").dialog("open")
    };
    
intoRestaurantMain=function(_){
    $("form:eq(0)").attr("action",_context+"/restaurantmain-loadpage.html&restaurantid="+_);
    $("form:eq(0)").removeAttr("target");
    $("form:eq(0)").attr("method","post");
    $("form:eq(0)").submit()
    };
    
intoRestFlagshipMain=function(_){
    $("form:eq(0)").attr("action",_context+"/mainpage-loadflagshippage.html&restaurantid="+_);
    $("form:eq(0)").attr("method","post");
    $("form:eq(0)").submit()
    };
    
openRestaurantMain=function(_){
    $("form:eq(0)").attr("action",_context+"/restaurantmain-loadpage.html&restaurantid="+_);
    $("form:eq(0)").attr("target","_blank");
    $("form:eq(0)").attr("method","post");
    $("form:eq(0)").submit()
    };
    
closeOpenFoodMenu=function(_){
    $("#mycartstaticinfo").animate({
        "width":"0px"
    },800,function(){
        $(".show_my_menu").show();
        $("#mycartstaticinfo").hide();
        $("div[name='mymenu2']").show()
        })
    };
    
commonOpenFoodMenu=function(_){
    $("#mycartstaticinfo").show();
    $("#mycartstaticinfo").css("width","0px").animate({
        "width":"252px"
    },800,function(){
        $(".show_my_menu").show()
        })
    };
    
commonOpenFoodMenu2=function(_){
    $("#mycartstaticinfo").show();
    $("#mycartstaticinfo").css("width","0px").animate({
        "width":"252px"
    },800,function(){
        $(".show_my_menu").show()
        });
    $(_).hide()
    };
    
updateSetmealDetails=function(_){
    for(var B=0;B<_.length;B++)if(_[B].foodtype==3){
        var A="<div class=\"open_setmeals\" id=\"setmealsdetailopen"+B+"\">"+"<a href=\"javascript:showsetmealsdetails("+_[B].foodid+", "+_[B].curprice+", "+B+")\">\u5957\u9910\u8be6\u60c5</a></div>"+"<div class=\"close_setmeals\"  id=\"setmealsdetailclose"+B+"\" style=\"display:none\">"+"<a href=\"javascript:hidesetmealsdetails("+B+")\">\u9690\u85cf\u8be6\u60c5</a></div>";
        $("#searfoodbutton"+B).prepend(A)
        }
    };
    
updateDescription=function(_){
    for(var B=0;B<_.length;B++){
        var A="";
        if(_[B].foodtype==1)A+="<span>\u83dc&#12288;&#12288;\u7cfb\uff1a</span>"+_[B].disalcotypename+"<br><span>\u53e3&#12288;&#12288;\u5473\uff1a</span>"+_[B].tastename+"<br><span>\u4e3b\u8981\u98df\u6750\uff1a</span>"+_[B].rawmaterialname+"<br><span>\u5236\u4f5c\u65b9\u6cd5\uff1a</span>"+_[B].makingmethod+"<br><span>\u63cf&#12288;&#12288;\u8ff0\uff1a</span>"+_[B].intro;
        else if(_[B].foodtype==2){
            A+="<span>\u9152&#12288;&#12288;\u7c7b\uff1a</span>"+_[B].disalcotypename+"<br><span>\u54c1&#12288;&#12288;\u724c\uff1a</span>"+_[B].tastename+"<br><span>\u9152&nbsp;\u7cbe&nbsp;\u5ea6\uff1a</span>";
            if(_[B].rawmaterialname==""||_[B].rawmaterialname==null)A+="\u65e0";else A+=_[B].rawmaterialname+"%";
            A+="<br><span>\u5bb9\u91cf\uff1a</span>"+_[B].makingmethod+"<br><span>\u63cf&#12288;&#12288;\u8ff0\uff1a</span>"+_[B].intro
            }else A+="<span>&nbsp;</span><br><span>&nbsp;</span><br><span>&nbsp;</span><br><span>\u63cf&#12288;&#12288;\u8ff0\uff1a</span>"+_[B].intro;
        $("#description"+B).html(A)
        }
    };
    
updatePriceArea=function(_){
    for(var B=0;B<_.length;B++){
        var A="";
        if(_[B].price==""||_[B].price==undefined||_[B].price==null||_[B].price=="undefined"){
            A+="<b>&#12288;\u539f&#12288;\u4ef7:&#12288;</b><span style=\"color:#999999\">\u65f6\u4ef7</span>";
            $("div[name='foodaction"+B+"']").html("")
            }else{
            if(_[B].specflag==0&&_[B].discountrate!=10)A+="<b>&#12288;\u539f&#12288;\u4ef7:&#12288;</b><span style=\"color:#999999\"><del>\uffe5"+_[B].price+"</del>["+_[B].discountrate+"\u6298]</span><br><b>&#12288;\u6298\u6263\u4ef7:&#12288;</b><span>\uffe5"+_[B].curprice+"</span>";
            else if(_[B].specflag==0&&_[B].discountrate==10)A+="<b>&#12288;\u539f&#12288;\u4ef7:&#12288;</b><span style=\"color:#999999\"><del>\uffe5"+_[B].price+"</del></span><br><b>&#12288;\u6298\u6263\u4ef7:&#12288;</b><span>\uffe5"+_[B].curprice+"</span>";else A+="<b>&#12288;\u539f&#12288;\u4ef7:&#12288;</b><span style=\"color:#999999\"><del>\uffe5"+_[B].price+"</del></span><br><b>&#12288;\u7279&#12288;\u4ef7:&#12288;</b><span>\uffe5"+_[B].curprice+"</span>";
            if(_[B].unitflag!=0&&_[B].unitflag!=""&&_[B].unitflag!=null&&_[B]!="undefined")A+="<span>./"+_[B].unitdesc+"</span>"
                }
                $("#pricearea"+B).html(A)
        }
    };
    
orderalco=function(_){
    $("form:eq(0)").attr("action",_context+"/orderfood-getRestaurantWordSearch.html&restaurantid="+_+"&filterobject=allrestfood&foodtype=2");
    $("form:eq(0)").removeAttr("target");
    $("form:eq(0)").attr("method","post");
    $("form:eq(0)").submit()
    };
    
orderMainfood=function(_){
    $("form:eq(0)").attr("action",_context+"/orderfood-getRestaurantMainFood.html&restaurantid="+_+"&filterobject=allrestfood&foodtype=1");
    $("form:eq(0)").removeAttr("target");
    $("form:eq(0)").attr("method","post");
    $("form:eq(0)").submit()
    };
    
orderSoup=function(_){
    $("form:eq(0)").attr("action",_context+"/orderfood-getRestaurantSoups.html&restaurantid="+_+"&filterobject=allrestfood&foodtype=1");
    $("form:eq(0)").removeAttr("target");
    $("form:eq(0)").attr("method","post");
    $("form:eq(0)").submit()
    };
    
hidesetmealsdetails=function(_){
    $("#setmealsdetailopen"+_).show();
    $("#setmealsdetailclose"+_).hide();
    $("#setmealschilds"+_).slideUp()
    };
    
showsetmealsdetails=function(B,A,_){
    $("#setmealsdetailopen"+_).hide();
    $("#setmealsdetailclose"+_).show();
    if($("#setmealschilds"+_).html()!=""){
        $("#setmealschilds"+_).slideDown();
        return
    }
    $.ajax({
        type:"POST",
        url:_context+"/orderfood-showSetmealsDetails.html",
        dataType:"json",
        data:{
            setmealsid:B
        },
        success:function(C){
            var D=C.setmealdetails,B=C.origitotalprice,E="<ul>";
            for(var G=0;G<D.length;G++){
                var F=G+1;
                E+="<li><div class=\"serial\" >"+F+".</div><div  class=\"setmeals_item_pic\" >"+"<img src=\""+D[G].picpath+"\" width=\"50\" height=\"47\" onerror=\"this.src='"+_context+"/images/no_pic.gif'\" onclick=\"javascript:openFoodDetailinfo("+D[G].foodtype+", "+D[G].foodid+", "+D[G].restaurantid+", '"+D[G].restaurantname+"')\"/>"+"</div><div class=\"setmeats_item_name\"><a href=\"javascript:openFoodDetailinfo("+D[G].foodtype+", "+D[G].foodid+", "+D[G].restaurantid+", '"+D[G].restaurantname+"')\">"+D[G].foodname+"</a></div><div class=\"setmeats_item_price\">\u539f\u4ef7\uff1a<strong><del><span style=\"color: rgb(153, 153, 153); \">\uffe5"+D[G].price+"</span></del></strong></div></li>"
                }
                E+="</ul><div class=\"clear\"></div><div style=\"float:right;margin-right:10px;margin-bottom:10px;padding-top:0px\" class=\"setmeats_item_price\">\u603b\u4ef7\uff1a<strong><del><span style=\"color: rgb(153, 153, 153); \">\uffe5"+B+"</span></del></strong><span style=\"margin-left:20px;color:#A10000\"><strong>\u5957\u9910\u4ef7\uff1a\uffe5"+A+"</strong></span></div>";
            $("#setmealschilds"+_).html(E);
            $("#setmealschilds"+_).slideDown()
            }
        })
};

loginRestMap=function(_){
    $("form:eq(0)").attr("action",_context+"/restaurantmap-getRestaurantMap.html&restaurantid="+_+"&cityname="+cityname);
    $("form:eq(0)").removeAttr("target");
    $("form:eq(0)").attr("method","post");
    $("form:eq(0)").submit()
    };
    
openRestMap=function(_){
    $("form:eq(0)").attr("action",_context+"/restaurantmap-getRestaurantMap.html&restaurantid="+_+"&cityname="+cityname);
    $("form:eq(0)").attr("target","_blank");
    $("form:eq(0)").attr("method","post");
    $("form:eq(0)").submit()
    };
    
intoFoodDetailinfo=function(C,_,B,A){
    $.ajax({
        type:"POST",
        url:_context+"/orderfood-getRestaurantfiltertype.html",
        dataType:"json",
        data:{
            restaurantid:B
        },
        success:function(D){
            var E=D.restaurantfiltertype;
            if(E=="0"){
                $("form:eq(0)").attr("action",_context+"/fooddetail-loadPage2.html&foodtype="+C+"&foodid="+_+"&restaurantid="+B+"&restaurantname="+A);
                $("form:eq(0)").removeAttr("target");
                $("form:eq(0)").attr("method","post");
                $("form:eq(0)").submit()
                }else{
                $("form:eq(0)").attr("action",_context+"/fooddetail-loadPage.html&foodtype="+C+"&foodid="+_+"&restaurantid="+B+"&restaurantname="+A);
                $("form:eq(0)").removeAttr("target");
                $("form:eq(0)").attr("method","post");
                $("form:eq(0)").submit()
                }
            }
    })
};

openFoodDetailinfo2=function(C,_,B,A){
    $("form:eq(0)").attr("action",_context+"/fooddetail-loadPage2.html&foodtype="+C+"&foodid="+_+"&restaurantid="+B+"&restaurantname="+A);
    $("form:eq(0)").attr("target","_blank");
    $("form:eq(0)").attr("method","post");
    $("form:eq(0)").submit()
    };
    
openFoodDetailinfo=function(C,_,B,A){
    $("form:eq(0)").attr("action",_context+"/fooddetail-loadPage.html&foodtype="+C+"&foodid="+_+"&restaurantid="+B+"&restaurantname="+A);
    $("form:eq(0)").attr("target","_blank");
    $("form:eq(0)").attr("method","post");
    $("form:eq(0)").submit()
    };
    
colFavoriteRest=function(_){
    common=function(){
        colAjaxFavoriteRest(_)
        };
        
    $.ajax({
        type:"POST",
        url:_context+"/custcentercontroller-getLoginid.html",
        dataType:"json",
        success:function(A){
            var B=A.customerid;
            if(B==""||B==null||B=="undefined")$("#customerlogindialog").dialog("open");else colAjaxFavoriteRest(_)
                }
            })
};

colAjaxFavoriteRest=function(_){
    $.ajax({
        type:"POST",
        url:_context+"/mainpage-restmainaddtofavorite.html",
        dataType:"json",
        data:{
            restaurantid:_
        },
        success:function(A){
            bsuccess=A.bsuccess;
            if(bsuccess==true){
                var B=$("#hotratetitle").is(":visible");
                if(B)$.ajax({
                    type:"POST",
                    url:_context+"/restaurantmain-getHotRateByRestid.html",
                    dataType:"json",
                    data:{
                        restaurantid:_
                    },
                    success:function(A){
                        $("#restmain_consumpcounts").html(A.consumpcounts);
                        $("#restmain_consumprk").html(A.consumprk);
                        $("#restmain_commcounts").html(A.commcounts);
                        $("#restmain_commrk").html(A.commrk);
                        $("#restmain_colcounts").html(A.colcounts);
                        $("#restmain_colrk").html(A.colrk);
                        $("#restmain_hotrk").html(A.hotrk);
                        var _=A.hotrk;
                        $("#hotrkpercent").css("width",_*300/100)
                        }
                    });
            $("#colrestsuccessdig").dialog("open")
            }else $("#colrestfaileddig").dialog("open")
            }
        })
};

colFavoriteFood=function(_,B,A){
    common=function(){
        $.ajax({
            type:"POST",
            url:_context+"/mainpage-addToFavorite.html",
            dataType:"json",
            data:{
                foodid:_,
                foodtype:B,
                restaurantid:A
            },
            success:function(_){
                bsuccess=_.bsuccess;
                if(bsuccess==true)$("#colfoodsuccessdig").dialog("open");else $("#colfoodfaileddig").dialog("open")
                    }
                })
    };
    
$.ajax({
    type:"POST",
    url:_context+"/custcentercontroller-getLoginid.html",
    dataType:"json",
    success:function(C){
        var D=C.customerid;
        if(D==""||D==null||D=="undefined")$("#customerlogindialog").dialog("open");else $.ajax({
            type:"POST",
            url:_context+"/mainpage-addToFavorite.html",
            dataType:"json",
            data:{
                foodid:_,
                foodtype:B,
                restaurantid:A
            },
            success:function(_){
                bsuccess=_.bsuccess;
                if(nologin==true)$("#loginsuggest").dialog("open");
                if(bsuccess==true)$("#colfoodsuccessdig").dialog("open");else $("#colfoodfaileddig").dialog("open")
                    }
                })
        }
    })
};

mouseoverRestComment=function(A,_){
    if($("#evalate_comment"+_).html()!="")$("#evalate_comment"+_).show();else $.ajax({
        type:"POST",
        url:_context+"/foodrestsearch-getRestaurantCommentDetails.html",
        dataType:"json",
        data:{
            restaurantid:A
        },
        success:function(E){
            var D=E.environment,G=E.qualityofservice,C=E.recommendedindex,B=E.recommendrate,H=E.overall,F=E.totalcnt;
            $("#evalate_comment"+_).html(restaurantStarComment(D,G,C,H,B,F,A));
            $("#evalate_comment"+_).show()
            }
        })
    };
    
mouseoverComment=function(_,B,A){
    if($("#evalate_comment"+A).html()!="")$("#evalate_comment"+A).show();else $.ajax({
        type:"POST",
        url:_context+"/foodrestsearch-getCommentDetails.html",
        dataType:"json",
        data:{
            foodid:_,
            foodtype:B
        },
        success:function(E){
            var C=E.foodtaste,I=E.foodcolor,G=E.foodscent,H=E.foodoverall,D=E.recommendedindex,F=E.totalcnt;
            $("#evalate_comment"+A).html(foodStarComment(C,I,G,H,D,F,_,B));
            $("#evalate_comment"+A).show()
            }
        })
    };
    
mouseoutComment=function(_){
    $("#evalate_comment"+_).hide()
    };
    
mouseoutRestComment=function(_){
    $("#evalate_comment"+_).hide()
    };
    
intoOrderPage=function(A,_){
    $("form:eq(0)").attr("action",_context+"/orderfood-loadPage.html&restaurantid="+A);
    $("form:eq(0)").removeAttr("target");
    $("form:eq(0)").attr("method","post");
    $("form:eq(0)").submit()
    };
    
viewFoodAllComments=function(_,A){
    $("form:eq(0)").attr("action",_context+"/custcommcontroller-getPageFoodAllComments.html&foodid="+_+"&foodtype="+A);
    $("form:eq(0)").removeAttr("target");
    $("form:eq(0)").attr("method","post");
    $("form:eq(0)").submit()
    };
    
viewRestAllComments=function(_){
    $("form:eq(0)").attr("action",_context+"/custcommcontroller-getPageRestAllComments.html&restaurantid="+_);
    $("form:eq(0)").removeAttr("target");
    $("form:eq(0)").attr("method","post");
    $("form:eq(0)").submit()
    };
    
formatFloat=function($,_){
    return Math.round($*Math.pow(10,_))/Math.pow(10,_)
    };
    
payment=function(A,B,_){
     $("form:eq(0)").attr("action",_context+"/newcustpaymentcontroller.do?method=rePayment&orderid="+B);
     $("form:eq(0)").attr("method","post");
     $("form:eq(0)").submit();
    
//    $.ajax({
//        type:"POST",
//        url:_context+"/custcentercontroller-valdeliverystatus.html",
//        dataType:"json",
//        data:{
//            orderid:B
//        },
//        success:function(D){
//            var C=D.deliverystatus;
//            if(C=="true"){
//                $("form:eq(0)").attr("action",_context+"/restdelivery.do?method=paymentfromcustcenter&orderseq="+B);
//                $("form:eq(0)").attr("method","post");
//                $("form:eq(0)").submit()
//                }else $.ajax({
//                type:"POST",
//                url:_context+"/custcentercontroller-valorderstatus.html",
//                dataType:"json",
//                data:{
//                    orderid:B,
//                    orderstatus:_
//                },
//                success:function(_){
//                    var C=_.orderstatussuccess;
//                    if(C=="true")$.ajax({
//                        type:"POST",
//                        url:_context+"/custcentercontroller-validateOrdertime.html",
//                        dataType:"json",
//                        data:{
//                            orderid:A
//                        },
//                        success:function(A){
//                            var _=A.valid;
//                            if(_=="true"){
//                                $("form:eq(0)").attr("action",_context+"/custcentercontroller-paymentfromorder.html&orderid="+B);
//                                $("form:eq(0)").attr("method","post");
//                                $("form:eq(0)").submit()
//                                }else{
//                                $("form:eq(0)").attr("action",_context+"/custcentercontroller-getSeatingbyunvalidtime.html&orderid="+B);
//                                $("form:eq(0)").attr("method","post");
//                                $("form:eq(0)").submit()
//                                }
//                            }
//                    });
//            else if($.browser.msie)window.location.href=window.location.href;else location.reload(true)
//                }
//            })
//    }
//    })
};

isNumber=function(_){
    var $="1234567890",B,A;
    for(B=0;B<_.length;B++){
        A=_.charAt(B);
        if($.indexOf(A)==-1)return false
            }
            return true
    };
    
setContent=function($){
    $=$.replace(/<\/?[^>]*>/g,"");
    $.value=$.replace(/[ | ]*\n/g,"\n");
    return $
    };
    
commentrestfrommainpage=function(_){
    $("form:eq(0)").attr("action",_context+"/restaurantmain-loadpage.html&restaurantid="+_+"#1");
    $("form:eq(0)").removeAttr("target");
    $("form:eq(0)").attr("method","post");
    $("form:eq(0)").submit()
    };
    
mouseoverbulletin=function(_){
    $(_).stop()
    };
    
mouseoutbulletin=function(_){
    $(_).start()
    };
    
intoRestaurantFamousCooker=function(_){
    $("form:eq(0)").attr("action",_context+"/restaurantmain-getFamousCooker.html&restaurantid="+_);
    $("form:eq(0)").removeAttr("target");
    $("form:eq(0)").attr("method","post");
    $("form:eq(0)").submit()
    };
    
intoRestaurantFamousFood=function(_){
    $("form:eq(0)").attr("action",_context+"/restaurantmain-getFamousFood.html&restaurantid="+_);
    $("form:eq(0)").removeAttr("target");
    $("form:eq(0)").attr("method","post");
    $("form:eq(0)").submit()
    };
    
showFacedlg=function(){
    if($("#online_face_dlg").is(":hidden"))$("#online_face_dlg").show();else $("#online_face_dlg").hide()
        };
        
showZX=function(){
    $("#onlinezx").show();
    $("#onlinely").hide();
    $("#bottomsend").show();
    $(".Rline").css("height","390px")
    };
    
showLY=function(){
    $("#onlinezx").hide();
    $("#onlinely").show();
    $("#bottomsend").hide();
    $(".Rline").css("height","500px")
    };
    
clsregisgift=function(_){
    if($("div[name='registergiftdv']").is(":hidden")){
        $(_).parent().next().slideDown("slow");
        $(_).html("\u5173\u95ed");
        $(_).css("top","-28px")
        }else{
        $(_).parent().next().slideUp("slow");
        $(_).html("\u6ce8\u518c\u6709\u793c");
        $(_).css("top","-20px")
        }
    };

restaurantSearch=function(){
    var D=$("#cityid").val()==null||$("cityid").val()==undefined||$("#cityid").val()=="undefined"||$("#cityid").val()==""?"287":$("#cityid").val(),A=$("#restword").val()==null||$("#restword").val()==undefined||$("#restword").val()=="undefined"||$("#restword").val()==""?"":$("#restword").val(),C=$("#cityname").text()==null||$("#cityname").text()==undefined||$("#cityname").text()=="undefined"||$("#cityname").text()==""?"\u4e0a\u6d77":$("#cityname").text(),B=$("#areadroprestid").val()==null||$("#areadroprestid").val()==undefined||$("#areadroprestid").val()=="undefined"||$("#areadroprestid").val()==""?"":$("#areadroprestid").val(),_=$("#seldroprestareas").text()==null||$("#seldroprestareas").text()==undefined||$("#seldroprestareas").text()=="undefined"||$("#seldroprestareas").text()==""?"":$("#seldroprestareas").text();
    $("form:eq(0)").attr("action",_context+"/foodrestsearch-loadRestPage.html&cityid="+D+"&areaid="+B+"&cityname="+C+"&areanames="+encodeURI(encodeURI(_))+"&word="+encodeURI(encodeURI(A)));
    $("form:eq(0)").removeAttr("target");
    $("form:eq(0)").attr("method","post");
    $("form:eq(0)").submit()
    };
    
foodSearch=function(){
    var D=$("#cityid").val()==null||$("cityid").val()==undefined||$("#cityid").val()=="undefined"||$("#cityid").val()==""?"287":$("#cityid").val(),A=$("#key").val()==null||$("#key").val()==undefined||$("#key").val()=="undefined"||$("#key").val()==""?"":$("#key").val(),C=$("#cityname").text()==null||$("#cityname").text()==undefined||$("#cityname").text()=="undefined"||$("#cityname").text()==""?"\u4e0a\u6d77":$("#cityname").text(),B=$("#areadropfoodid").val()==null||$("#areadropfoodid").val()==undefined||$("#areadropfoodid").val()=="undefined"||$("#areadropfoodid").val()==""?"":$("#areadropfoodid").val(),_=$("#seldropareas").text()==null||$("#seldropareas").text()==undefined||$("#seldropareas").text()=="undefined"||$("#seldropareas").text()==""?"":$("#seldropareas").text();
    $("form:eq(0)").attr("action",_context+"/foodrestsearch-loadPage.html&cityid="+D+"&cityname="+C+"&areanames="+encodeURI(encodeURI(_))+"&word="+encodeURI(encodeURI(A))+"&areaid="+B);
    $("form:eq(0)").removeAttr("target");
    $("form:eq(0)").attr("method","post");
    $("form:eq(0)").submit()
    }
})