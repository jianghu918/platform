/*
 * Compressed by JSA(www.xidea.org)
 */
$(document).ready(function(){closedlg=function(_){$(_).parent().parent().hide()};clkSendInvite=function(A,_){common=function(){if(_loginid==_){alert("\u4e0d\u80fd\u9080\u8bf7\u81ea\u5df1");$(A).parent().remove()}else $(A).parent().parent().find(".writeMassage:eq(1)").show()};$.ajax({type:"POST",url:_context+"/custcentercontroller-getLoginid.html",dataType:"json",success:function(B){var C=B.customerid;if(C==""||C==null||C=="undefined")$("#customerlogindialog").dialog("open");else if(C==_){alert("\u4e0d\u80fd\u9080\u8bf7\u81ea\u5df1");$(A).parent().remove()}else $.ajax({type:"POST",url:_context+"/custcentercontroller-validfriend.html",data:{customerid:C,friendid:_},dataType:"json",success:function(_){var B=_.existed;if(B==true)alert("\u8be5\u7528\u6237\u5df2\u7ecf\u5728\u81ea\u5df1\u7684\u98df\u53cb\u5217\u8868\u91cc\u9762\u4e86");else $(A).parent().parent().find(".writeMassage:eq(1)").show()}})}})};clkSendMessage=function(A,_){common=function(){if(_loginid==_){alert("\u4e0d\u80fd\u53d1\u9001\u7ed9\u81ea\u5df1\u6d88\u606f");$(A).parent().remove()}else $(A).parent().parent().find(".writeMassage:eq(0)").show()};$.ajax({type:"POST",url:_context+"/custcentercontroller-getLoginid.html",dataType:"json",success:function(B){var C=B.customerid;if(C==""||C==null||C=="undefined")$("#customerlogindialog").dialog("open");else if(C==_){alert("\u4e0d\u80fd\u53d1\u9001\u7ed9\u81ea\u5df1\u6d88\u606f");$(A).parent().remove()}else $(A).parent().parent().find(".writeMassage:eq(0)").show()}})};sendinvite=function(C,B,A){var _=$(C).parent().parent().find("textarea[name=\"messagecontenttext\"]").val();if(_==""){$(C).prev().show();$(C).parent().parent().find("textarea[name=\"messagecontenttext\"]").focus();return}else $(C).prev().hide();$.ajax({type:"POST",url:_context+"/personalcercontroller-saveinvite.html",dataType:"json",data:{friendid:B,content:_},success:function(_){amq.sendMessage("queue:..//"+A+"_message","<message type='3'/>");$(C).parent().parent().parent().hide()}})};sendmessage=function(C,B,A){var _=$(C).parent().parent().find("textarea[name=\"messagecontenttext\"]").val();if(_==""){$(C).prev().show();$(C).parent().parent().find("textarea[name=\"messagecontenttext\"]").focus();return}else $(C).prev().hide();$.ajax({type:"POST",url:_context+"/personalcercontroller-savemessage.html",dataType:"json",data:{friendid:B,content:_},success:function(_){amq.sendMessage("queue:..//"+A+"_message","<message type='2'/>");$(C).parent().parent().parent().hide()}})}})