/*
 * Compressed by JSA(www.xidea.org)
 */
$(document).ready(function(){getCartTotalnums=function(C){var A=0,_=new String(C),B=_.split("|"),$=3;while($<B.length){A+=parseInt(B[$]);$+=5}return A};getCartTotalPrice=function(C){var $=0,_=new String(C),B=_.split("|"),A=2;while(A<B.length){$+=formatFloat(B[A],2);A+=5}$=formatFloat($,2);return $};if($.cookie("cartcookie")!=null){var C=$.cookie("cartcookie");$("#totalfoodnums").html("");$("#totalfoodmoney").html("");$("#totalfoodnums").prepend(getCartTotalnums(C));$("#totalfoodmoney").append(getCartTotalPrice(C))}else{$("#totalfoodnums").html("");$("#totalfoodmoney").html("");$("#totalfoodnums").prepend("0");$("#totalfoodmoney").append("0")}var B=setInterval("showcartdetailinfo()",1000);showcartdetailinfo=function(){var E=$.cookie("cartcookie");if(E!=""&&E!=null){var B=new String(E),D=B.split("|"),A=getCartDiv(D),C=getCartTotalnums(E),_=getCartTotalPrice(E);$("#totalfoodnums").text("");$("#totalfoodnums").text(C);$("#totalfoodmoney").text("");$("#totalfoodmoney").text(_);$("#cart_list ul").html(A);$("#cart_list").show()}else{$("#cart_list ul").html("");$("#cart_list").show();$("#totalfoodnums").text("");$("#totalfoodnums").text("0");$("#totalfoodmoney").text("");$("#totalfoodmoney").text("0")}};getCartDiv=function(_){var D="",B=getModelObject(),C=xmlGetElementsByName(B,"item","cartdetailinfo"),$=getModelKeys(C[0]),F=jQuery.trim(getModelValue(C[0]));for(var E=0;E<_.length;E=E+5){var A=F;A=modelReplace(A,$,[_context,_[E+4],E,_[E],_[E+1],_[E+2],_[E+3]]);D+=A}return D};getCartHeadDiv=function(F,$){var D="",B=getModelObject(),C=xmlGetElementsByName(B,"item","cartheadinfo"),_=getModelKeys(C[0]),E=jQuery.trim(getModelValue(C[0])),A=E;A=modelReplace(A,_,[_context,F,$]);D+=A;return D};covertdetailinfo=function(){$("#cart_list").slideUp()};var A={path:_context+"/",domain:"cdian.cn"},_={expires:-1,path:_context+"/",domain:"cdian.cn"};delAddCartQuantity=function(B,K,_,M){var L=$("#cartquantiy"+B).val();if(K==0)$("#cartquantiy"+B).val(parseInt(L)+1);else if(L>1)$("#cartquantiy"+B).val(parseInt(L)-1);var N=$.cookie("cartcookie"),F=new String(N),G=F.split("|"),H=0;while(H<G.length){if(_==G[H]&&M==G[H+1]){var D=G[H+3],J=G[H+2],C=formatFloat(formatFloat(J,2)/parseInt(D),2);G[H+3]=parseInt($("#cartquantiy"+B).val());G[H+2]=formatFloat(C*parseInt($("#cartquantiy"+B).val()),2)}H+=5}var I=G[0];for(var E=1;E<G.length;E++)I+="|"+G[E];N=I;$.cookie("cartcookie",N,A)};delCartRecord=function(B,C){$("#delrecdig").dialog({bgiframe:true,draggable:true,modal:true,buttons:{"\u53d6\u6d88":function(){$(this).dialog("close")},"\u786e\u8ba4":function(){var I=$.cookie("cartcookie"),G=new String(I),H=G.split("|"),E=new Array(),J=0,F=0;while(J<H.length){if(!(B==H[J]&&C==H[J+1])){E[F]=H[J];E[F+1]=H[J+1];E[F+2]=H[J+2];E[F+3]=H[J+3];E[F+4]=H[J+4];F+=5}J+=5}if(E.length>0){var D=E[0];for(F=1;F<E.length;F++)D+="|"+E[F];I=D;$.cookie("cartcookie",I,A)}else $.cookie("cartcookie",null,_);$(this).dialog("destroy")}}});$("#delrecdig").dialog("open")}})