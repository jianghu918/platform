/*
 * Compressed by JSA(www.xidea.org)
 */
$(document).ready(function(){var A=-1,_;$("#searchword").blur(function(){$("#rest_search_suggest").hide()});$("#searchword").keyup(function(G){var F=G||window.event,C=F.keyCode;if((C>=65&&C<=90)||(C>=48&&C<=57)||(C>=96&&C<=105)||C==46||C==8||C==32){var E=jQuery.trim($("#searchword").val()),B=$("#rest_search_suggest");if(E!=""&&E.length>0){clearTimeout(_);_=setTimeout(function(){$.ajax({type:"POST",url:_context+"/search.do?method=getIndexRestfoods",data:{word:E,restaurantname:restaurantname,cityname:cityname},dataType:"json",success:function($){var _=$.words;B.html(" ");var D="<ul style=\"width:200px;\">";for(var C=0;C<_.length;C++)D+="<li style=\"font-size:12px;font-weight:normal;\" id="+C+" onclick=\"javascript:selRestFoodWord("+C+")\" onmouseover=\"javascript:mouseOverRestFood(this);\" onmouseout=\"javascript:mouseOutRestFood(this);\"><div class=\"result_food_name\" id=\"indexrestfoodword"+C+"\">"+_[C].foodword+"</div></li>";D+="</ul>";B.html(D);if(_.length>0)B.show();else{B.hide();A=-1}}})},250)}else{B.hide();A=-1}}else if(C==38||C==40){if(C==38){var I=$("#rest_search_suggest").children("ul");I=I.children("li");if(A!=-1){I.eq(A).css("background-color","#EEEEEE");A--}else A=I.length-1;if(A==-1)A=I.length-1;I.eq(A).css("background-color","#F8DA44")}if(C==40){var D=$("#rest_search_suggest").children("ul");D=D.children("li");if(A!=-1&&A!=D.length){D.eq(A).css("background-color","#EEEEEE");A++}if(A==-1)A=0;if(A==D.length)A=0;D.eq(A).css("background-color","#F8DA44")}}else if(C==13)if(A!=-1){var H=$("#rest_search_suggest").hide().find("li").eq(A).find("div").html();A=-1;$("#searchword").val(H);var J=$("#searchword").val();$("form:eq(0)").attr("action",_context+"/orderfood-getRestaurantWordSearch.html&restaurantid="+restaurantid+"&searchword="+encodeURI(encodeURI(J))+"&restaurantname="+encodeURI(encodeURI(restaurantname)));$("form:eq(0)").removeAttr("target");$("form:eq(0)").attr("method","post");$("form:eq(0)").submit()}else{$("#rest_search_suggest").hide();$("#searchword").get(0).blur();if($("#searchword").val()!=""){J=$("#searchword").val();$("form:eq(0)").attr("action",_context+"/orderfood-getRestaurantWordSearch.html&restaurantid="+restaurantid+"&searchword="+encodeURI(encodeURI(J))+"&restaurantname="+encodeURI(encodeURI(restaurantname)));$("form:eq(0)").removeAttr("target");$("form:eq(0)").attr("method","post");$("form:eq(0)").submit()}}});mouseOutRestFood=function(_){$(_).css("background-color","#EEEEEE")};mouseOverRestFood=function(_){$("#rest_search_suggest ul").find("li").each(function(){$(this).css("background-color","#EEEEEE")});A=$(_).attr("id");$(_).css("background-color","#F8DA44")};selRestFoodWord=function(_){$("#searchword").val($("#indexrestfoodword"+_).text());$("#rest_search_suggest").hide();var A=$("#searchword").val();$("form:eq(0)").attr("action",_context+"/orderfood-getRestaurantWordSearch.html&restaurantid="+restaurantid+"&searchword="+encodeURI(encodeURI(A))+"&restaurantname="+encodeURI(encodeURI(restaurantname)));$("form:eq(0)").removeAttr("target");$("form:eq(0)").attr("method","post");$("form:eq(0)").submit()}})