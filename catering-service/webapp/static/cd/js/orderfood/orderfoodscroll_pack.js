/*
 * Compressed by JSA(www.xidea.org)
 */
$(document).ready(function(){ajaxsuggestshow();$(window).scroll(function(){var _;if($.browser.msie&&($.browser.version=="7.0"||$.browser.version=="8.0")){_=document.documentElement.scrollTop;var A=388-_;if(A<0)A=10;$("#c_rightinner").css("top",A+"px")}else if(self.pageYOffset){_=self.pageYOffset;A=388-_;if(A<0)A=30;$("#c_rightinner").css("top",A+"px")}else if(document.documentElement&&(document.documentElement.scrollTop||document.documentElement.scrollTop==0)&&$.browser.msie&&$.browser.version=="6.0"){_=document.documentElement.scrollTop;A=0;if(_==0)A=10;else if(_<=365)A=10;else if(_>365)A=_-365;$("#c_rightinner").css("top",A+"px")}else if(document.body){_=document.body.scrollTop;A=388-_;if(A<0)A=30;$("#c_rightinner").css("top",A+"px")}});$("#disabledZone").ajaxStart(function(){$(this).css("visibility","visible")});$("#disabledZone").ajaxStop(function(){ajaxsuggesthide()})})