$(document).ready(function() {
	
	//改变交通方式
	selectTrafficManner = function(obj){
		//当选择的是公交方式的时候
		if($(obj).val() == '0'){			
			$("#pubtrafficmanner").show();
			$("#cartrafficmanner").hide();
		}else{
			$("#pubtrafficmanner").hide();
			$("#cartrafficmanner").show();
		}
	}
	
	
	
});