/*
 * Compressed by JSA(www.xidea.org)
 */
$(document).ready(function(){checkPopLoginForm=function(D){var E=true;if($.trim($("form[name='loginForm'] input[name='f_emailOrPhone']").val())==""){var C=$("form[name='loginForm'] input[name='f_emailOrPhone']").parent().next(".errTips");C.html("\u8bf7\u586b\u5199\u7528\u6237\u540d");C.addClass("err");E=false}if($.trim($("form[name='loginForm'] input[name='f_password']").val())==""){C=$("form[name='loginForm'] input[name='f_password']").parent().next(".errTips");C.html("\u8bf7\u586b\u5199\u5bc6\u7801");C.addClass("err");E=false}if(E==false)return false;var G=$("form[name='loginForm'] input[name='f_emailOrPhone']").val(),_=$("form[name='loginForm'] input[name='f_password']").val(),B=$("form[name='loginForm'] input[name='f_chkCode']").val(),A=$("form[name='loginForm'] input[name='gourl']").val(),F=$("form[name='loginForm'] input[name='needmobvalid']").val();$.ajax({type:"POST",url:"customerController-login.html",dataType:"json",data:{f_emailOrPhone:G,f_password:_,gourl:A,needmobvalid:F},success:function(D){var B=D.result,A=D.errorType,C=D.errorInfo;if(B==false){if(A==1){var E=$("form[name='loginForm'] input[name='f_chkCode']").parent().next(".errTips");E.html(C);E.addClass("err")}else{E=$("form[name='loginForm'] input[name='f_emailOrPhone']").parent().next(".errTips");E.html(C);E.addClass("err")}}else{try{_loginid=D.customerid;_loginname=D.customername;common();changelogsyle();$("#customerlogindialog").dialog("close");return false}catch(_){$("#customerlogindialog").dialog("close");return false}}}});return false}})