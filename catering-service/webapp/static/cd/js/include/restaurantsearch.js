$(document).ready(function() {
	
 
	
	/**
	 * 点击食品详细页面上面显示的菜单按钮, 
	 */
	searchRestMenuItem = function(restid, restname, filterobject){
		
		common = function(){
			$("form:eq(0)").attr("action", _context+"/orderfood-getRestaurantWordSearch.html&restaurantid="+restid+"&filterobject="+filterobject+"&restaurantname="+encodeURI(encodeURI(restname)));
			$("form:eq(0)").removeAttr("target");
			$("form:eq(0)").attr("method", "post");
			$("form:eq(0)").submit();
		}
		
		//当用户点击我吃过的美餐或者我的收藏, 首先判断用户是否登录
    	if(filterobject == 'custconsump' || filterobject == 'custfavorite'){    		
    		
    		$.ajax(
    				{
    					type: "POST",   
    					url: _context+"/custcentercontroller-getLoginid.html",
    					dataType:"json",
    					success: function(json){
    					
    						var _loginid = 	json.customerid;
    						if(_loginid == '' || _loginid == null || _loginid == 'undefined'){
    							$("#customerlogindialog").dialog('open');
    						}else{
    							$("form:eq(0)").attr("action", _context+"/orderfood-getRestaurantWordSearch.html&restaurantid="+restid+"&filterobject="+filterobject+"&restaurantname="+encodeURI(encodeURI(restname)));
    							$("form:eq(0)").removeAttr("target");
    							$("form:eq(0)").attr("method", "post");
    							$("form:eq(0)").submit();
    						}
    					}
    				}
        	);
    		
    		
    		//判断是否登陆		
    		/*var mark = '';
    		var _loginid = '';
    		var intervalHandler = setInterval(			
    				function(){	
    					if(mark == 'ok' &&(_loginid == '' || _loginid == null || _loginid == 'undefined')){	
    						$("form:eq(0)").attr("action", _context+"/jsp/customer/loginRegister.jsp");
    						$("form:eq(0)").attr("target", 'userlogin');
    						$("form:eq(0)").submit();
    						clearInterval(intervalHandler);	
    					}		
    		}, 250);*/
    		
    		//从服务端取得登陆的ID
    		/*$.ajax(
    				{
    					type: "POST",   
    					url: _context+"/custcentercontroller-getLoginid.html",
    					dataType:"json",
    					success: function(json){	
    						_loginid = 	json.customerid;							
    						mark = 'ok';
    						if(_loginid != '' && _loginid != null && _loginid != 'undefined'){							
    							clearInterval(intervalHandler);	
    							$("form:eq(0)").attr("action", _context+"/orderfood-getRestaurantWordSearch.html&restaurantid="+restid+"&filterobject="+filterobject+"&restaurantname="+encodeURI(encodeURI(restname)));
    							$("form:eq(0)").removeAttr("target");
    							$("form:eq(0)").attr("method", "post");
    							$("form:eq(0)").submit();
    						}								
    					}
    				});*/
    		
    	}else{
    		$("form:eq(0)").attr("action", _context+"/orderfood-getRestaurantWordSearch.html&restaurantid="+restid+"&filterobject="+filterobject+"&restaurantname="+encodeURI(encodeURI(restname)));
			$("form:eq(0)").removeAttr("target");
			$("form:eq(0)").attr("method", "post");
			$("form:eq(0)").submit();
    		
    	}
		
		
		
	}
	
	/**
	 * 点击食品详细页面左侧原料的过滤按钮 
	 */
	filterDetailRawmaterialResult = function(restid, restname, foodtype, rawmaterialtype){
		$("form:eq(0)").attr("action", _context+'/orderfood-getRestaurantWordSearch.html&restaurantid='+restid+'&filterobject=allrestfood&foodtype='+foodtype+'&rawmaterialtype='+rawmaterialtype+'&restaurantname='+encodeURI(encodeURI(restname)));
		$("form:eq(0)").removeAttr("target");
		$("form:eq(0)").attr("method", "post");
    	$("form:eq(0)").submit();	
	}
	
	/**
	 * 点击食品详细页面左侧成菜的过滤按钮 
	 */
	filterDetailDishesResult = function(restid, restname, foodtype, dishestype, ismainfood){
		$("form:eq(0)").attr("action", _context+'/orderfood-getRestaurantWordSearch.html&restaurantid='+restid+'&filterobject=allrestfood&foodtype='+foodtype+'&dishestype='+dishestype+'&restaurantname='+encodeURI(encodeURI(restname))+'&ismainfood='+ismainfood);
		$("form:eq(0)").removeAttr("target");
		$("form:eq(0)").attr("method", "post");
    	$("form:eq(0)").submit();	
	}
	
	/**
	 * 点击食品详细页面左侧做法的过滤按钮 
	 */
	filterDetailCookingResult = function(restid, restname, foodtype,  cookingtype){
	
		$("form:eq(0)").attr("action", _context+'/orderfood-getRestaurantWordSearch.html&restaurantid='+restid+'&filterobject=allrestfood&foodtype='+foodtype+'&cookingtype='+cookingtype+'&restaurantname='+encodeURI(encodeURI(restname)));
		$("form:eq(0)").removeAttr("target");
		$("form:eq(0)").attr("method", "post");
    	$("form:eq(0)").submit();	
	}
	
	/**
	 * 点击食品详细页面左侧口味的过滤按钮 
	 */
	filterDetailTasteResult = function(restid, restname, foodtype, tastetype){
		$("form:eq(0)").attr("action", _context+'/orderfood-getRestaurantWordSearch.html&restaurantid='+restid+'&filterobject=allrestfood&foodtype='+foodtype+'&tastetype='+tastetype+'&restaurantname='+encodeURI(encodeURI(restname)));
		$("form:eq(0)").removeAttr("target");
		$("form:eq(0)").attr("method", "post");
    	$("form:eq(0)").submit();	
	}
	
	/**
	 * 点击食品详细页面左侧酒水的过滤按钮 
	 */
	filterDetailAlcoholResult = function(restid, restname, foodtype, dishalcotype){
		$("form:eq(0)").attr("action", _context+'/orderfood-getRestaurantWordSearch.html&restaurantid='+restid+'&filterobject=allrestfood&foodtype='+foodtype+'&dishalcotype='+dishalcotype+'&restaurantname='+encodeURI(encodeURI(restname)));
		$("form:eq(0)").removeAttr("target");
		$("form:eq(0)").attr("method", "post");
    	$("form:eq(0)").submit();	
	}
	
	/**
	 * 点击食品详细页面左侧套餐小吃的过滤按钮 
	 */
	filterDetailSetmealsotherfoodResult = function(restid, restname, foodtype){
		$("form:eq(0)").attr("action", _context+'/orderfood-getRestaurantWordSearch.html&restaurantid='+restid+'&filterobject=allrestfood&foodtype='+foodtype+'&restaurantname='+encodeURI(encodeURI(restname)));
		$("form:eq(0)").removeAttr("target");
		$("form:eq(0)").attr("method", "post");
    	$("form:eq(0)").submit();	
	}
	
	
});