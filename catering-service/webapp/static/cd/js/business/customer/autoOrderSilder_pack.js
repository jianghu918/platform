/*
 * Compressed by JSA(www.xidea.org)
 */
var priceSliderConfig={slider:null,bg:"price-slider-bg",thumb:"price-slider-thumb",topConstraint:0,bottomConstraint:130,scaleFactor:20,step:2,defaultValue:0,isSetDefault:false,getRealValue:function(B){var D=Math.round(B.slider.getValue()/B.step*(B.scaleFactor-30*B.scaleFactor/B.bottomConstraint)),A=(D+""),C=A.substring(A.length-1,A.length),_=parseInt(C)>=5?10-parseInt(C):-parseInt(C);D+=_;$("input[name='"+B.hiddenElem+"']").val(D);return D},hiddenElem:"slider_price"},personSliderConfig={slider:null,bg:"personNum-slider-bg",thumb:"personNum-slider-thumb",topConstraint:-4,bottomConstraint:132,scaleFactor:1,step:4,defaultValue:16,isSetDefault:false,getRealValue:function(_){var A=Math.round(_.slider.getValue()/_.step*(_.scaleFactor-13*_.scaleFactor/_.bottomConstraint));$("input[name='"+_.hiddenElem+"']").val(A);return A},hiddenElem:"slider_person"},meatDietSliderConfig={slider:null,bg:"meatDiet-slider-bg",thumb:"meatDiet-slider-thumb",topConstraint:0,bottomConstraint:130,scaleFactor:10,step:13,defaultValue:30,isSetDefault:false,getRealValue:function(_){var A=Math.round(_.slider.getValue()/_.step*(_.scaleFactor-0*_.scaleFactor/_.bottomConstraint));$("input[name='"+_.hiddenElem+"']").val(A);return A+" %"},hiddenElem:"slider_meatdiet"},foodNumberSilderConfig={slider:null,bg:"foodNum-silder-bg",minThumb:"foodNum-silder-min-thumb",maxThumb:"foodNum-silder_max_thumb",maxRange:130,tickSize:0,minThumbDistance:-16,initValues:[0,0],minTips:"foodNum-slider-minTips",maxTips:"foodNum-slider-maxTips",isMovePerson:false,onready:function(){},onchange:function(){var A=foodNumberSilderConfig.slider,B=A.minVal,_=A.maxVal,E=foodNumberSilderConfig.minTips,D=foodNumberSilderConfig.maxTips,C=6.7;$("#"+E).html(parseInt(B/C)+1);$("#"+D).html(parseInt(_/C)+1);$("#"+E).css({left:B-parseInt($("#"+E).width()/2)+8});$("#"+D).css({left:_-parseInt($("#"+D).width()/2)+8});foodNumberGotoSides()},setValue:function(B){var A=6.7,$=(B[0]-1)*A;if($>parseInt($))++$;var _=(B[1]-1)*A;if(_>parseInt(_))++_;foodNumberSilderConfig.slider.setValues($,_)}};function foodNumberGotoSides(){if(isMoveing)return;if(!foodNumberSilderConfig.isMovePerson)if(autoOrderSilde.foodsMinNumber==parseInt($("#"+foodNumberSilderConfig.minTips).html())&&autoOrderSilde.foodsMaxNumber==parseInt($("#"+foodNumberSilderConfig.maxTips).html()));else{autoOrderSilde.foodsMinNumber=parseInt($("#"+foodNumberSilderConfig.minTips).html());autoOrderSilde.foodsMaxNumber=parseInt($("#"+foodNumberSilderConfig.maxTips).html());sides($("#btnSides")[0],$("input[name='rid']").val())}}var isMoveing=false,initCount=0;(function(){var D=YAHOO.util.Event,E=YAHOO.util.Dom,F=YAHOO.lang;D.onDOMReady(function(){A(priceSliderConfig);A(personSliderConfig);A(meatDietSliderConfig);_(foodNumberSilderConfig);$("input[name='noPrice']").click(function(){if(!$(this).attr("checked")){$(".controlprice input[name='overPrice']").attr({"disabled":false});$(".controlprice label").css("cursor","pointer");if(!$(".controlprice input[name='overPrice']").attr("checked")){$("#price-slider-tips").css("visibility","visible");$("#price-slider-thumb").css("visibility","visible");$("#price-slider-bg").css({"background-image":"url('js/yui/slider/assets/skins/sam/bg-bh.gif')"});$(".info:eq(0)").css({"color":"black"});$(".controlprice").css({"color":"black"});$(".overBar").hide()}}else{$(".controlprice label").css("cursor","default");$("#price-slider-tips").css("visibility","hidden");$("#price-slider-thumb").css("visibility","hidden");$("#price-slider-bg").css({"background-image":"url('js/yui/slider/assets/skins/sam/bg-bh-gray.gif')"});$(".info:eq(0)").css({"color":"gray"});$(".controlprice").css({"color":"gray"});$(".controlprice input[name='overPrice']").attr({"disabled":true});$(".overBar").show()}sides($("#btnSides")[0],$("input[name='rid']").val())});$(".controlprice input[name='overPrice']").click(function(){if(!$(this).attr("checked")){$(".controlprice input[name='overPrice']").attr({"disabled":false});$("#price-slider-tips").css("visibility","visible");$("#price-slider-thumb").css("visibility","visible");$("#price-slider-bg").css({"background-image":"url('js/yui/slider/assets/skins/sam/bg-bh.gif')"});$(".info:eq(0)").css({"color":"black"});$(".overBar").hide()}else{$("#price-slider-tips").css("visibility","hidden");$("#price-slider-thumb").css("visibility","hidden");$("#price-slider-bg").css({"background-image":"url('js/yui/slider/assets/skins/sam/bg-bh-gray.gif')"});$(".info:eq(0)").css({"color":"gray"});$(".overBar").show()}sides($("#btnSides")[0],$("input[name='rid']").val())});$("#foodNum-silder-min-thumb,#foodNum-silder_max_thumb").mousedown(function($){isMoveing=true});$("#foodNum-silder-min-thumb,#foodNum-silder_max_thumb").mouseup(function($){isMoveing=false;foodNumberGotoSides()});$("body").mouseup(function(_){if(!$.browser.msie)if(isMoveing){isMoveing=false;foodNumberGotoSides()}})});function A(_){_.slider=YAHOO.widget.Slider.getHorizSlider(_.bg,_.thumb,_.topConstraint,_.bottomConstraint,_.step);_.slider.animate=true;_.slider.getRealValue=_.getRealValue;B(_);_.slider.subscribe("change",function($){C(_)});_.slider.subscribe("slideEnd",function(A){if(!_.isSetDefault)sides($("#btnSides")[0],$("input[name='rid']").val());else{initCount++;_.isSetDefault=false;if(initCount==3)loadAllMainDish($("input[name='rid']").val())}})}function _($){$.slider=YAHOO.widget.Slider.getHorizDualSlider($.bg,$.minThumb,$.maxThumb,$.maxRange,$.tickSize,$.initValues);$.slider.minRange=$.minThumbDistance;$.slider.subscribe("change",$.onchange)}function B($){$.isSetDefault=true;$.slider.setValue($.defaultValue)}function C(C){var B=$("#"+C.thumb).find("img[name='sliderBtn']").offset(),_=$("#"+C.thumb).offset(),D=$("#"+C.bg).find(".sliderTips"),A=C.slider.getRealValue(C);D.css({left:C.slider.getValue()-parseInt(D.width()/2)+8});if(C.bg=="meatDiet-slider-bg")$(".changeColor").css({width:C.slider.getValue()-parseInt(D.width()/2)});D.html(A);singleGotoSides()}})();function cancelEvent(_){var $=window.event?window.event:_;if(window.event)$.cancelBubble=true;else $.stopPropagation()}function initCheckboxStatus(){if(!$("input[name='noPrice']").attr("checked")){$(".controlprice input[name='overPrice']").attr({"disabled":false});$(".controlprice label").css("cursor","pointer");if(!$(".controlprice input[name='overPrice']").attr("checked")){$("#price-slider-tips").css("visibility","visible");$("#price-slider-thumb").css("visibility","visible");$("#price-slider-bg").css({"background-image":"url('js/yui/slider/assets/skins/sam/bg-bh.gif')"});$(".info:eq(0)").css({"color":"black"});$(".controlprice").css({"color":"black"});$(".overBar").hide()}}else{$(".controlprice label").css("cursor","default");$("#price-slider-tips").css("visibility","hidden");$("#price-slider-thumb").css("visibility","hidden");$("#price-slider-bg").css({"background-image":"url('js/yui/slider/assets/skins/sam/bg-bh-gray.gif')"});$(".info:eq(0)").css({"color":"gray"});$(".controlprice").css({"color":"gray"});$(".controlprice input[name='overPrice']").attr({"disabled":true});$(".overBar").show()}}