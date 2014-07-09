$(document).ready(function() {
	
	/**
	 * //取时间，格式为,yyyy-mm-dd hh:mm:ss
	 */
	getDateByymdhms = function(date){
		  var s;
		  s = date.getYear() + "-";             //取年份
		  s = s + (date.getMonth() + 1) + "-";//取月份
		  s += date.getDate() + " ";         //取日期
		  s += date.getHours() + ":";       //取小时
		  s += date.getMinutes() + ":";    //取分
		  s += date.getSeconds();         //取秒		  
		  return(s);  
	}
	
	//过滤掉特殊字符
	doValidate = function(value){		
	   /*var vkeyWords='/^[^`~!@#$%^&*()+=|\\\][\]\{\}:;\,.<>/?]{1}[^`~!@$%^&()+=|\\\][\]\{\}:;\,.<>@]{0,19}$_2F'; 
	   if(!vkeyWords.test(value))
	   {
	
	    return false;
	   } */  
	   	return true;
	} 
	
	
	//
	
});