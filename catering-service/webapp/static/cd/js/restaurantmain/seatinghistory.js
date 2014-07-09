$(document).ready(function() {
	
	function pageload(hash) {

	      if(hash) {	        
	    	if($.browser.msie) {
	          hash = encodeURIComponent(hash);
	        }
	    	var hashes = hash.split("_"); 
	    	
	    	//得到过滤对象
	    	var selsheet =  hashes[0];
	    	
	    	//所在的页数
	    	var pageno = hashes[1];
	    	
	    	if(selsheet == 'dating'){
	    		$("#pageno").val(pageno);
	    		moredatingrestseatings();
	    		
	    	}else{
	    		$("#baoxiangpageno").val(pageno);
	    		morebaoxiangrestseatings();
	    	}
	      }else{
	    	  $("#pageno").val('1');
	    	  moredatingrestseatings();
	    	  
	      }
	}
	      
	
	if($.browser.msie){
	  	  $.historyInit(pageload);
	 }else{
	  	  $.historyInit(pageload, "#");
	 }

});