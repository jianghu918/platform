$(document).ready(function() {
	
	
	
	
	/*delPngBackground = function(){
		
		$('#cart_head').pngFix( );
	}*/
	 
	
	
	
	/*$("#searchword").keyup(function(event){
		
		//添加键盘按下并弹起的事件
        //处理文本框中的键盘事件
        var myEvent = event||window.event;
        var keyCode = myEvent.keyCode;
        
        if(keyCode == 13){
        	if($("#searchword").val() != ''){
        		$("#searchrest").trigger('click');
        	}
        }
        
	});*/
	
	
	
	
	
	//移进食品过滤得栏目里面
	moveoversubfilterfood = function(obj){
		$(obj).prev().addClass('filtercurrent');		
	}
	
	
	//导入菜的详细页左边过滤数据 
	loadDetailClassfitlerdatas = function(){
		var number = Math.random(); 
		$.ajax({
			type: "POST",   
			url: _context+"/orderfood.do?method=getClassfilterDatas",
			dataType:"json",
			data : {restaurantid:restaurantid, number:number},
			success: function(json)
			{ 
				
				//取得餐厅酒水类别
				var alcoltypes = json.alcoltypes;
				
				//取得口味类别
				var tastetypes = json.tastetypes;
				
				//取得制作方式
				var cookingmodetypes = json.cookingmodetypes;
				
				//取得成菜分类
				var dishestypes = json.dishestypes;
				
				//取得原料类别
				var rawmaterialtypes = json.rawmaterialtypes;
				
				//取得餐厅所属类别
				//var restdishtypes = json.restdishtypes;
				
				var rawmaterialhtml = '';
				for(var i=0; i<rawmaterialtypes.length; i++){					
					rawmaterialhtml += '<a href="javascript:filterDetailRawmaterialResult('+restaurantid+', \''+restaurantname+'\', 1, '+rawmaterialtypes[i].id+')">'+rawmaterialtypes[i].name+'</a>';					
				}
				
				//将原料类别加入到结果中间去
				//$("#rawmateriallist").html("");
				$("#rawmateriallist").html(rawmaterialhtml);
				
				var disheshtml = '';
				for(var j=0; j<dishestypes.length; j++){
					if(dishestypes[j].name != '主食'){
						disheshtml += '<a href="javascript:filterDetailDishesResult('+restaurantid+', \''+restaurantname+'\', 1, '+dishestypes[j].id+', 0)">'+dishestypes[j].name+'</a>';
					}
				}
				
				//将成菜分类加入到结果中间去
				//$("#disheslist").html("");
				$("#disheslist").html(disheshtml);
				
				
				var cookingmethodhtml = '';
				for(var k=0; k<cookingmodetypes.length; k++){
					cookingmethodhtml += '<a href="javascript:filterDetailCookingResult('+restaurantid+', \''+restaurantname+'\', 1, '+cookingmodetypes[k].id+')">'+cookingmodetypes[k].name+'</a>';
				}
				
				//将制作方式加入到结果中间去
				$("#cookinglist").html(cookingmethodhtml);
					
				var tastehtml = '';
				for(var m=0; m<tastetypes.length; m++){
					tastehtml += '<a href="javascript:filterDetailTasteResult('+restaurantid+', \''+restaurantname+'\', 1, '+tastetypes[m].id+')">'+tastetypes[m].name+'</a>';
				}
				//将口味类别加入到结果中
				$("#tastelist").html(tastehtml);
						
				var alcohtml = '';
				for(var a=0; a<alcoltypes.length; a++){
				 	alcohtml+=  '<a href="javascript:filterDetailAlcoholResult('+restaurantid+', \''+restaurantname+'\', 2, '+alcoltypes[a].id+')">'+alcoltypes[a].name+'</a>';
				}				
				//将酒水类方式加入到结果中间去
				$("#alcohollist").html(alcohtml);
				
				var setmealshtml  = '<a href="javascript:filterDetailSetmealsotherfoodResult('+restaurantid+', \''+restaurantname+'\', 3)">套餐</a>';
				
				//将套餐分类加入到结果中去
				$("#setmealslist").html(setmealshtml);
				
				var otherfoodhtml = '<a href="javascript:filterDetailSetmealsotherfoodResult('+restaurantid+', \''+restaurantname+'\', 4)">小吃</a>';
				
				//将小吃分类加入到结果中去
				$("#otherfoodlist").html(otherfoodhtml);
				
				//将主食分类加入到结果中去
				var mainfoodhtml = '';
				var bmainfood = false;
				for(var j=0; j<dishestypes.length; j++){	
					if(dishestypes[j].name == '主食'){
							mainfoodhtml  = '<a href="javascript:filterDetailDishesResult('+restaurantid+', \''+restaurantname+'\', 1, '+dishestypes[j].id+', 1)">主食</a>';
							bmainfood = true;
					}
				}
				
				if(bmainfood == false){
					
					mainfoodhtml  = '<a href="javascript:filterDetailDishesResult('+restaurantid+', \''+restaurantname+'\', 1, 0, 1)">主食</a>';
				}
				
			
				$("#mainfoodlist").html(mainfoodhtml);

				//将菜的总体评价信息显示出来
				getFoodTotalComment();
				
			}});
		
	}
	
	
	/**
	 * 在菜的详细介绍页面中, 将菜的总体评价显示出来
	 */
	getFoodTotalComment = function(){
		var number = Math.random(); 
		$.ajax({type: "POST",   
			url: _context+"/fooddetail.do?method=getTotalCommentinfo",
			dataType:"json",
			data : {foodid:fooddetailid, foodtype:foodtype, number:number},
			success: function(json)
			{ 
				//菜的颜色
				var color = json.color;
				
				//菜的味道
				var taste = json.taste;
				
				//菜的总体评价
				var overall = json.overall;
				
				//菜的香味
				var scent = json.scent;
				
				//菜的推荐指数
				var recommendindex = json.recommendindex;
								
				//参与评论的人数
				var commentcnts = json.commentcnts;
				
				//菜的总的得分
				var totalscores = json.totalscores;
				
				
				//参与打分的人数
				var cnt = json.cnt;
				
				//参与评论的人数
				$(".totalcommentcnt").append('<span style="font-family:Georgia,Helvetica,Arial;color:#999999;font-size:16px">'+commentcnts+'</span>');
				
				//参与打分的人数
				$(".totalcnt").append('<span style="font-family:Georgia,Helvetica,Arial;color:#999999;font-size:16px">'+cnt+'</span>');
				
				
				if(totalscores == '0'){
					//总的口味
					$(".totaltaste").append(getStarfromcomment(taste));
					
					//总的菜色
					$(".totalcolor").append(getStarfromcomment(color));
					
					//总的香味
					$(".totalscent").append(getStarfromcomment(scent));
					
					//总的评价
					$(".totaloverall").append(getStarfromcomment(overall));
					
					//总的推荐指数
					$(".totalrecommindex").append(getStarfromcomment(recommendindex));
									
					//菜的总的得分
					$(".totalscores").html('---');
				}else{
					//总的口味
					$(".totaltaste").append(getStarfromcomment(taste));
					
					//总的菜色
					$(".totalcolor").append(getStarfromcomment(color));
					
					//总的香味
					$(".totalscent").append(getStarfromcomment(scent));
					
					//总的评价
					$(".totaloverall").append(getStarfromcomment(overall));
					
					//总的推荐指数
					$(".totalrecommindex").append(getStarfromcomment(recommendindex));
									
					//菜的总的得分
					$(".totalscores").html(totalscores);
				}
				
				//如果进入套餐类型的详细页, 在详细介绍的一栏里面将套餐的明细显示出来	
				if(foodtype == 3){			
					getSetmealsInfo(fooddetailid);						
				}
			}
		});
		
	}
	
	//item is coming effect
	function itemComing(htmlControlClassName){
		var targetClassName = "." + htmlControlClassName;
		//var pointer = getRelativeXY(targetClassName);	//see rotateImage.js
		$(targetClassName).each(function(i){
			var isLeft = parseInt(Math.random() * 1000) % 9 > 4 ? true : false;
			if(isLeft){
				$(this).css({left:$(this).offset().left - 1000});
			}else{
				$(this).css({left:$(this).offset().left + 1000});
			}
		});
		$(targetClassName).css({"visibility":"visible"});
		//$(targetClassName).css({position:"absolute"});
		var waitEnd = 0;	//wait for all item animate end.
		$(targetClassName).each(function(i){
			
			$(this).stop();
			$(this).animate({left:"0px",opacity:1},parseInt(Math.random() * 2000) + 1,function(){
//				$(targetClassName).removeShadow();
				if(++waitEnd == $(targetClassName).size()){	//the last item 
					//rotateImage("item",30);
					//$(targetClassName).dropShadow();
				}
			});
		});
	}
	
	
	PageFoodClick2 = function(pageclickednumber){
       var totalpages =  $("#totalpage").val();
       $("#pager").pager({ pagenumber: pageclickednumber, pagecount: totalpages, buttonClickCallback: PageFoodClick2});
       $("#pageno").val(pageclickednumber);
       var filterobject = $("#filterobject").val();
       if(filterobject == ''){
    	   filterobject = 'allrestfood';
       }
       
       var restfoodtype = $("#restfoodtype").val();
       if(restfoodtype == ''){
    	   restfoodtype = '0';
       }
       
       var searchword = $("#searchword").val();
       if(searchword == ''){
    	   searchword = '0';
       }
       
       var hashstr = filterobject+'_'+pageclickednumber+'_'+restaurantid+'_'+restfoodtype+'_'+searchword;		
       hashstr = hashstr.replace(/^.*#/, '');
       $.historyLoad(hashstr);
	}
	
	
	//导入主菜
	getPageFood2 = function(){
		var pageno = $("#pageno").val();
		
		var restfoodtype = $("#restfoodtype").val();
		
		var filterobject = $("#filterobject").val();
		
		var searchword = $("#searchword").val();
		if(searchword != ''){
			$("#labelforrestsearch").hide();
		}else{
			$("#labelforrestsearch").show();
		}
		var restaurantid = $("#restaurantid").val();
		var number = Math.random(); 
		$.ajax({type: "POST",   
			url: _context+"/orderfood.do?method=getPageRestaurantFood2",
			dataType:"json",
			data : {searchword:searchword, restfoodtype:restfoodtype, filterobject:filterobject, pageno:pageno, restaurantid:restaurantid, number:number},
			success: function(json){
				
				var foods = json.foods;
				var totalpage = json.totalpage;
				var length = foods.length;
				var html2 = '';
				for(var j=0; j<length; j++){							
					html2 += '<div  class="divli">'+
				       '<img src="'+foods[j].picpath+'" width="93" height="95" border="0" onerror="this.src=\''+_context+'/images/no_pic.gif\'"/>'+
				       '<div class="clearfix foodTittleAndPrice blueFont" style="cursor:pointer;" onclick="javascript:intofooddetails2(\''+restaurantid+'\', \''+foods[j].foodid+'\');">'+foods[j].name+'</div>';
					
					if(foods[j].price == ''){
						html2 += '<p><del>时价</del><b class="greenFont">&nbsp;</b>'+
				         '<a class="blueFont">加入菜单</a>'+
					       '</p>'+ 
					   '</div>';
					}else{
						html2 += '<p><del>￥'+foods[j].price+'</del><b class="greenFont">￥'+foods[j].curprice+'</b>'+
				         '<a class="blueFont" onclick="javascript:addToCart(\''+foods[j].foodid+'\', \''+foods[j].foodtype+'\', \''+foods[j].curprice+'\', \'0\', \''+foods[j].name+'\', \''+restaurantid+'\');">加入菜单</a>'+
					       '</p>'+ 
					   '</div>';	
					}   						
				}
				$('div[name="foodlist"]').html(html2);
				itemComing("divli");
				$("#totalpage").val(totalpage);
				if(totalpage > 1){
					$("#pager").pager({ pagenumber: pageno, pagecount: totalpage, buttonClickCallback: PageFoodClick2});
				}else{
					$("#pager").html('');
				}
				
				if(length <=0){
						$('div[name="foodlist"]').html('  <div class="noticeSign "><h3> 很抱歉！暂无记录，请重新操作！</h3></div>');	
						$("#pager").html('');
				}
			}});
		
	}
	
	
	
	//导入点餐主页左边过滤栏数据
	loadClassfilterdatas2 = function(){
		
		
		var number = Math.random(); 
		
		$.ajax({type: "POST",   
			url: _context+"/orderfood.do?method=getClassfilterDatas2",
			dataType:"json",
			data : {restaurantid:restaurantid, number:number},
			success: function(json){ 
				
				var restfoodtypes = json.restfoodtypes;				
				var html  = '';				
				for(var i=0; i<restfoodtypes.length; i++){	
					if(biztype == '0' || biztype == '1'){
						html += '<li>'+
				         '<a href="javascript:void(0);" onclick="clkrestfoodtype(\''+restfoodtypes[i].id+'\')">'+restfoodtypes[i].name+'展示</a>'+
				       '</li>';					
					}else{
						html += '<li>'+
				         '<a href="javascript:void(0);" onclick="clkrestfoodtype(\''+restfoodtypes[i].id+'\')">'+restfoodtypes[i].name+'</a>'+
				       '</li>';
					}
				}
				$("#filtertypelist").html(html);
				getPageFood2();
				
			}});
	}
	
	//导入点餐主页左边过滤栏数据
	loadClassfilterdatas = function(){
		var number = Math.random(); 
		$.ajax({type: "POST",   
			url: _context+"/orderfood.do?method=getClassfilterDatas",
			dataType:"json",
			data : {restaurantid:restaurantid, number:number},
			success: function(json)
			{ 
				//取得餐厅酒水类别
				var alcoltypes = json.alcoltypes;
				
				//取得口味类别
				var tastetypes = json.tastetypes;
				
				//取得制作方式
				var cookingmodetypes = json.cookingmodetypes;
				
				//取得成菜分类
				var dishestypes = json.dishestypes;
				
				//取得原料类别
				var rawmaterialtypes = json.rawmaterialtypes;
				
				//取得餐厅所属类别
				//var restdishtypes = json.restdishtypes;
				
				var rawmaterialhtml = '';
				for(var i=0; i<rawmaterialtypes.length; i++){					
					rawmaterialhtml += '<a href="javascript:filterRawmaterialResult(1, '+rawmaterialtypes[i].id+')">'+rawmaterialtypes[i].name+'</a>';					
				}
				//将原料类别加入到结果中间去
				$("#rawmateriallist").html(rawmaterialhtml);
				var disheshtml = '';
				for(var j=0; j<dishestypes.length; j++){
					if(dishestypes[j].name != '主食'){
						disheshtml += '<a href="javascript:filterDishesResult(1, '+dishestypes[j].id+', 0)">'+dishestypes[j].name+'</a>';
					}
				}
				//将成菜分类加入到结果中间去
				$("#disheslist").html(disheshtml);
				var cookingmethodhtml = '';
				for(var k=0; k<cookingmodetypes.length; k++){
					cookingmethodhtml += '<a href="javascript:filterCookingResult(1, '+cookingmodetypes[k].id+')">'+cookingmodetypes[k].name+'</a>';
				}
				
				//将制作方式加入到结果中间去
				$("#cookinglist").html(cookingmethodhtml);
				var tastehtml = '';
				for(var m=0; m<tastetypes.length; m++){
					tastehtml += '<a href="javascript:filterTasteResult(1, '+tastetypes[m].id+')">'+tastetypes[m].name+'</a>';
				}
				//将口味类别加入到结果中
				$("#tastelist").html(tastehtml);
				var alcohtml = '';
				for(var a=0; a<alcoltypes.length; a++){
				 	alcohtml+=  '<a href="javascript:filterAlcoholResult(2, '+alcoltypes[a].id+')">'+alcoltypes[a].name+'</a>';
				}				
				//将酒水类方式加入到结果中间去
				$("#alcohollist").html(alcohtml);
				var setmealshtml  = '<a href="javascript:filterSetmealsResult(3)">套餐</a>'; 
				//将套餐方式加入到结果中间去
				$("#setmealslist").html(setmealshtml);
				
				
				var otherfoodhtml = '<a href="javascript:filterotherfoodResult(4)">小吃</a>';
				
				//将小吃分类加入到结果中去
				$("#otherfoodlist").html(otherfoodhtml);
				
				//将主食分类加入到结果中去
				var mainfoodhtml = '';
				var bmainfood = false;
				for(var j=0; j<dishestypes.length; j++){	
					if(dishestypes[j].name == '主食'){
							mainfoodhtml  = '<a href="javascript:filterDishesResult(1, '+dishestypes[j].id+', 1)">主食</a>';
							bmainfood = true;
					}
				}
				
				if(bmainfood == false){
					mainfoodhtml  = '<a href="javascript:filterDishesResult(1, 0, 1)">点主食</a>';
				}
				$("#mainfoodlist").html(mainfoodhtml);
			}});
	
	}
	
	

	/**
	 * 清除不在一个菜单里面的以前保存记录
	 */
	clearInfo=function(menuname){
		//对当前所处的菜单进行过滤, 如果不是停留在本搜索菜单中，将之前的分页,分类, 过滤信息全部清除
		var filterobject = $("#filterobject").val();
		if(filterobject != '' && filterobject != menuname){			
			//清除第几页
			$("#pageno").val("");
			$("#pageno").val("1");
		
			//清除总的页数
			$("#totalpage").val("");
			
			//清除排序信息
			$("#sorttype").val("");
						
			//清除所处菜单信息
			$("#filterobject").val("");
			
			//清除保留的每页大小
			$("#pageSize").val("");
						
			//将每页尺寸的标识复位
			$(".displaynumber").find('a').removeClass('current');
			$(".displaynumber").find('a:eq(0)').addClass('current');
			
			//复位排序箭头, 在不同menu切换的时候
			$("#paixu").find('img').attr("src",_context+"/images/customer/sort.gif");
			
			//服务人均和价格的下拉框, 清空人均和价格的值
			$(".pricerange").find('select').val('');
			$("#pricerangesel").val('');
		}
	};
	
	/**
	 * 点击左边的过滤栏, 点击加号展开, 点击减号就收缩
	 */
	$("#maindishfilter img:eq(1)").click(function(){
		
		if($("#maindishfilter .cart_cai").is(":hidden")){
			
			$("#maindishfilter img:eq(1)").attr("src", ''+_context+'/images/orderfood/jian_03.jpg');
			$("#maindishfilter .cart_cai").show();
		}else{	
			$("#maindishfilter img:eq(1)").attr("src", ''+_context+'/images/orderfood/jia_03.jpg');
			$("#maindishfilter .cart_cai").hide();
		}
	});
	
	/**
	 * 对酒水的加号减号就行展开 收缩
	 */
	$("#alcoholfilter img:eq(1)").click(function(){
		
		if($("#alcoholfilter .cart_cai").is(":hidden")){
			
			$("#alcoholfilter img:eq(1)").attr("src", ''+_context+'/images/orderfood/jian_03.jpg');
			$("#alcoholfilter .cart_cai").show();
		}else{	
			$("#alcoholfilter img:eq(1)").attr("src", ''+_context+'/images/orderfood/jia_03.jpg');
			$("#alcoholfilter .cart_cai").hide();
		}
	});

	searchrestword = function(){
		
		//得到搜索词
		var searchword = $("#searchword").val();
		if(searchword == ''){
			$("#searchword").focus();		
			return;
		};
		
		//定义所在菜单
		$("#filterobject").val("wordsearch");		
		
		var filterobject = $("#filterobject").val();
		
		//得到页数
		var pageno = $("#pageno").val();
		//得到总的页数
		//var totalpage=$("#totalpage").val();
			
		//得到餐厅的id
		var restaurantid = $("#restaurantid").val();
			
		//得到排序类别
		var sorttype = $("#sorttype").val();
		//得到价格区间
		var pricerange = $("#pricerangesel").val();
		
		//得到食品类别
		var foodtype = $("#foodtype").val();
			
		//得到食品所属类别
		var dishalcotype = $("#dishalcotype").val();
		
		//得到成菜类别
		var dishestype = $("#dishestype").val();
		
		//得到做法类别 
		var cookingtype = $("#cookingtype").val();
		
		//得到口味类别
		var tastetype = $("#tastetype").val();
		
		//得到原料类别
		var rawmaterialtype = $("#rawmaterialtype").val();		
		
		//得到每页显示的条数
		var pageSize = $("#pageSize").val();
		
		var number = Math.random(); 
		
		$.ajax({type: "POST",   
			url: _context+"/orderfood.do?method=getWordSearch",
			dataType:"json",
			data : {searchword:searchword, pageSize:pageSize, pageno:pageno, 
			restaurantid:restaurantid, filterobject:filterobject, 
			sorttype:sorttype, foodtype:foodtype, dishalcotype:dishalcotype, 
			dishestype:dishestype, cookingtype:cookingtype, tastetype:tastetype,
			rawmaterialtype:rawmaterialtype, pricerange:pricerange, number:number},
			success: function(json)
			{ 
				var items = json.fooditems;
				if(items.length > 0){
					$("#orderitems").html("")
					$("#orderitems").html(getDiv(items));
					
					//更新食品信息内容
					updateFoodDescription(items);
				
				
					//更新是否显示特价标识
				for(var i=0; i<items.length; i++){
					if(items[i].specflag == 1){
						$("#specflag"+i).show();
					}else{
						$("#specflag"+i).hide();
					}
					
					if(items[i].unitflag == 0 || items[i].unitflag == '' || items[i].unitflag == null){								
							$("#unitflag"+i).text("");	
					}else{
							$("#unitflag"+i).text("./"+items[i].unitdesc);	
					}
					
				}
				
				//更新折扣率
				for(var i=0; i<items.length; i++){
					var html = '';
					if(items[i].specflag == 1){
					}else if(items[i].specflag == 0 && items[i].discountrate != 10){
						html += '['+items[i].discountrate+'折]';
						$("#pricearea"+i).append(html);
					}
				}
					
					//更新美食记录下面的星级
					updateStarComment(items);
					
					//对结果进行过滤, 是否显示套餐详情内容
					updateSetmealDetails(items);
					
					
					//总的页数	
					 $("#totalpage").val("");
					 $("#totalpage").val(json.totalpage);
					 
					 if(json.totalpage >1){
					 	if(pageno == '') pageno = '1';
					 	
					 	$("#pager").pager({ pagenumber: pageno, pagecount: json.totalpage, buttonClickCallback: PageClick});
					 }else{
					 	$("#pager").html("");
					 }
				 	 //显示排序, 每页数量栏
					// $("#title_c").show();
				}else{
					$("#pager").html("");
					$("#orderitems").html('  <div class="noticeSign "><h3> 很抱歉！暂无记录，请重新操作！</h3> </div>');
					$("#orderitems").show();
					
					//隐藏排序, 每页数量栏
					//$("#title_c").hide();
				}
			}});	
	}
	
	
	
	searchorderfood = function(){
		
		
		
		//得到搜索词
		var searchword = $("#searchword").val();
		
		if(searchword != ''){
			$("#labelforrestsearch").hide();
		}else{
			$("#labelforrestsearch").show();
		}
		
		//得到过滤对象信息
		var filterobject = $("#filterobject").val();
		
		//得到页数
		var pageno = $("#pageno").val();
		
		//得到餐厅的id
		var restaurantid = $("#restaurantid").val();
		
		//得到排序类别
		var sorttype = $("#sorttype").val();
			
		//得到食品类别
		var foodtype = $("#foodtype").val();
		
		//得到价格区间
		var pricerange = $("#pricerangesel").val();
		
		//得到食品所属类别
		var dishalcotype = $("#dishalcotype").val();
		
		//得到成菜类别
		var dishestype = $("#dishestype").val();
		
		//得到做法类别 
		var cookingtype = $("#cookingtype").val();
		
		//得到口味类别
		var tastetype = $("#tastetype").val();
		
		//得到原料类别
		var rawmaterialtype = $("#rawmaterialtype").val();		
		
		//得到每页显示的条数
		var pageSize = $("#pageSize").val();
		
		var number = Math.random(); 
		$.ajax({type: "POST",   
			url: _context+"/orderfood.do?method=getWordSearch",
			dataType:"json",
			data : {searchword:searchword, pageSize:pageSize, pageno:pageno, 
			restaurantid:restaurantid, filterobject:filterobject, 
			sorttype:sorttype, foodtype:foodtype, dishalcotype:dishalcotype, 
			dishestype:dishestype, cookingtype:cookingtype, tastetype:tastetype,
			rawmaterialtype:rawmaterialtype, pricerange:pricerange,  number:number},
			success: function(json)
			{ 

				var items = json.fooditems;
				if(items.length > 0){

					$("#orderitems").html(getDiv(items));
					
					if(biztype == '0' || biztype == '1' ){
						$(".addin_menu").hide();
					}
					
					//更新食品信息内容
					updateFoodDescription(items);
				
				
					//更新是否显示特价标识
					for(var i=0; i<items.length; i++){
						if(items[i].specflag == 1){
							$("#specflag"+i).show();
						}else{
							$("#specflag"+i).hide();
						}
					
						if(items[i].price == '0' || items[i].price == null || items[i].price == ''){
							$("#pricearea"+i).html('<span style="color:#999999">时价</span>');	
							$("#addtocart"+i).hide();
							$("span[name='curprice"+i+"']").hide();
							
						}else{
						
							//更新折扣率
							var html = '';
							if(items[i].specflag == 1){
							}else if(items[i].specflag == 0 && items[i].discountrate != 10){
									html += '['+items[i].discountrate+'折]';
									$("#pricearea"+i).append(html);
							}
							
							//更新是否供应
							if(items[i].supplytype == 1){
								$("#addtocart"+i).html('<span style="color:#999;cursor:default;">暂停供应</span>');
							}
						
						}


						$("#unitflag"+i).text("./"+items[i].unitdesc);	
				}
					//更新美食记录下面的星级
					updateStarComment(items);
					
					//对结果进行过滤, 是否显示套餐详情内容
					updateSetmealDetails(items);
					
					
					
					
					//总的页数	
					 $("#totalpage").val("");
					 $("#totalpage").val(json.totalpage);
					 
					 if(json.totalpage >1){
					 	$("#pager").pager({ pagenumber: pageno, pagecount: json.totalpage, buttonClickCallback: PageClick});
					 }else{
					 	$("#pager").html("");
					 }
					 
					
							
					 //显示排序, 每页数量栏
					$("#title_c").show();
				}else{
					$("#pager").html("");
					$("#orderitems").html('  <div class="noticeSign "><h3> 很抱歉！暂无记录，请重新操作！</h3> </div>');
					$("#orderitems").show();
					//隐藏排序, 每页数量栏
					$("#title_c").hide();
				}
			}});
		
		
	}
	
	
	$("#searchrest").click(function() {		
		
		$("#left_menu").find('li').removeClass('filtercurrent');		
		var restfiltertype =  $("#restfiltertype").val();
		//得到搜索词
		var searchword = $("#searchword").val();
		if(searchword == ''){
			$("#searchword").focus();	
			return;
		};
		$("#rest_search_suggest").hide();
		
		//过滤掉特殊字符
		doValidate = function(value){
			
		   var vkeyWords='/^[^`~!@#$%^&*()+=|\\\][\]\{\}:;\,.<>/?]{1}[^`~!@$%^&()+=|\\\][\]\{\}:;\,.<>@]{0,19}$_2F'; 
		   if(!vkeyWords.test(value)){		
		    return false;
		   }   
		   	return true;
		} 
		
		
		/*var bval = doValidate(searchword);
    	if(bval == false){ 
    		return;
    	}*/
    	
    	var hashstr = '';
		if(restfiltertype == '0'){
			
			hashstr= 'wordsearch_1_'+restaurantid+'_0_'+searchword;
		}else{
		
		
			//hash规则多个hash用_隔开 
			//第一个代表所在的menu 
			//第二个代表所在的页数
			//第三个代表所在的页数尺寸
			//第四个代表所在的餐厅的id 
			//第五个代表排序类型, 如果为0表示为默认排序类型
			//第六个代表所在的食品类别  为0表示不限
			//第七个代表食品所属类别  为0表示不限
			//第八个代表价格区间 为x表示不限
			//第九个代表成菜类别  为0表示成菜类别不限
			//第十个表示做法类别 为0表示做法不限
			//第十一个表示口味类别  为0表示口味类别不限
			//第十二个表示原料类别  为0表示原料类别不限
			//第十三个表示搜索的关键词 为0表示搜索关键词为空		
			hashstr= 'wordsearch_1_10_'+restaurantid+'_0_0_0_x_0_0_0_0_'+searchword;		
		}
		hashstr = hashstr.replace(/^.*#/, '');
        // moves to a new page. 
        // pageload is called at once. 
        // hash don't contain "#", "?"
        $.historyLoad(hashstr);
		/*//得到搜索词
		var searchword = $("#searchword").val();
		if(searchword == ''){
			$("#searchword").focus();	
			return;
		};
		
		clearInfo('wordsearch');
		
		clearfilterobjectdata();
		
		//定义所在菜单
		$("#filterobject").val("wordsearch");		
		
		var filterobject = $("#filterobject").val();
		
		//得到页数
		var pageno = $("#pageno").val();
		//得到总的页数
		//var totalpage=$("#totalpage").val();
			
		//得到餐厅的id
		var restaurantid = $("#restaurantid").val();
			
		//得到排序类别
		var sorttype = $("#sorttype").val();
			
		//得到食品类别
		var foodtype = $("#foodtype").val();
			
		//得到食品所属类别
		var dishalcotype = $("#dishalcotype").val();
		
		//得到成菜类别
		var dishestype = $("#dishestype").val();
		
		//得到做法类别 
		var cookingtype = $("#cookingtype").val();
		
		//得到口味类别
		var tastetype = $("#tastetype").val();
		
		//得到原料类别
		var rawmaterialtype = $("#rawmaterialtype").val();		
		
		//得到每页显示的条数
		var pageSize = $("#pageSize").val(pageSize);
		
		var number = Math.random(); 
		
		$.ajax({type: "POST",   
			url: _context+"/orderfood.do?method=getWordSearch",
			dataType:"json",
			data : {searchword:searchword, pageSize:pageSize, pageno:pageno, 
			restaurantid:restaurantid, filterobject:filterobject, 
			sorttype:sorttype, foodtype:foodtype, dishalcotype:dishalcotype, 
			dishestype:dishestype, cookingtype:cookingtype, tastetype:tastetype,
			rawmaterialtype:rawmaterialtype, number:number},
			success: function(json)
			{ 
				var items = json.fooditems;
				if(items.length > 0){
					$("#orderitems").html("")
					$("#orderitems").html(getDiv(items));
					
					//更新食品信息内容
					updateFoodDescription(items);
				
				
					//更新是否显示特价标识
				for(var i=0; i<items.length; i++){
					if(items[i].specflag == 1){
						$("#specflag"+i).show();
					}else{
						$("#specflag"+i).hide();
					}
					
					if(items[i].unitflag == 0 || items[i].unitflag == '' || items[i].unitflag == null){								
							$("#unitflag"+i).text("");	
					}else{
							$("#unitflag"+i).text("./"+items[i].unitdesc);	
					}
					
				}
				
				//更新折扣率
				for(var i=0; i<items.length; i++){
					var html = '';
					if(items[i].specflag == 1){
					}else if(items[i].specflag == 0 && items[i].discountrate != 10){
						html += '['+items[i].discountrate+'折]';
						$("#pricearea"+i).append(html);
					}
				}
					
					
					//更新美食记录下面的星级
					updateStarComment(items);
					
					//对结果进行过滤, 是否显示套餐详情内容
					updateSetmealDetails(items);
					
					
					//总的页数	
					 $("#totalpage").val("");
					 $("#totalpage").val(json.totalpage);
					 
					 if(json.totalpage >1){
					 	$("#pager").pager({ pagenumber: pageno, pagecount: json.totalpage, buttonClickCallback: PageClick});
					 }else{
					 	$("#pager").html("");
					 }
				 	 //显示排序, 每页数量栏
					 $("#title_c").show();
				}else{
					$("#pager").html("");
					$("#orderitems").html("<div>搜索到0条记录, 请选择其它条件继续检索</div>");
					$("#orderitems").show();
					
					//隐藏排序, 每页数量栏
					$("#title_c").hide();
				}
			}});	*/
	});
	
	/**
	 * 当点击主食列表上面的分页的时候, 触发此函数
	 */
    PageClick = function(pageclickednumber) {
    	
    	/*if($.browser.msie && $.browser.version == '6.0'){
			delPngBackground();
		}*/
    	
       var totalpages =  $("#totalpage").val();
       $("#pager").pager({ pagenumber: pageclickednumber, pagecount: totalpages, buttonClickCallback: PageClick });
       $("#pageno").val(pageclickednumber);
       
       /*//过滤餐厅搜索以后的结果
        var filterobject = $("#filterobject").val();
    	if(filterobject == 'wordsearch'){   			
    			searchrestword();
    	}else{
    			clickFilterItem(filterobject);
    	}*/
    	
    	//得到搜索词
		var searchword = $("#searchword").val();
		if(searchword == ''){
    		searchword = '0';
    	}
		
		//得到过滤对象信息
		var filterobject = $("#filterobject").val();
		if(filterobject == ''){
			filterobject = 'allrestfood';
		}
		
		//得到餐厅的id
    	var restaurantid = $("#restaurantid").val();
    	
    	//得到食品类别
    	var foodtype = $("#foodtype").val();
    	if(foodtype == ''){    		
			foodtype = '0';
    	}
    	
    	//得到价格区间
    	var pricerange = $("#pricerangesel").val();
    	if(pricerange == ''){	
    		pricerange = 'x';
    	}
    	
    	//得到食品所属类别
    	var dishalcotype = $("#dishalcotype").val();
    	if(dishalcotype == ''){
    		dishalcotype = '0';
    	}
    	
    	//得到成菜类别
		var dishestype = $("#dishestype").val();
		if(dishestype == ''){
			dishestype = '0';
		}
		
		//得到做法类别 
		var cookingtype = $("#cookingtype").val();
		if(cookingtype == ''){
			cookingtype = '0';
		}
		
		//得到口味类别
		var tastetype = $("#tastetype").val();
		if(tastetype == ''){
			tastetype = '0';
		}
		
		//得到原料类别
		var rawmaterialtype = $("#rawmaterialtype").val();
    	if(rawmaterialtype == ''){			
			rawmaterialtype = '0';
		}
		
    	//得到每页显示的条数
		var pageSize = $("#pageSize").val();
       	if(pageSize == ''){
			pageSize = '10';
		}
		
    	var newsorttype = $("#sorttype").val();
    	if(newsorttype == ''){
			newsorttype = '0';
		}
    	var hashstr = filterobject+'_'+pageclickednumber+'_'+pageSize+'_'+restaurantid+'_'+newsorttype+'_'+foodtype+'_'+dishalcotype+'_'+pricerange+'_'+dishestype+'_'+cookingtype+'_'+tastetype+'_'+rawmaterialtype+'_'+searchword;		
        hashstr = hashstr.replace(/^.*#/, '');
        $.historyLoad(hashstr);
    	
    	
    	
    }
	
    /**
	 * 选择菜价在一个区间里面的 
	 */
	selectPricerange = function(obj){
		
		/* //清空当前所有的页号
		$("#pageno").val('');
		$("#pageno").val('1');
		
	    $("#pricerangesel").val('');
	    $("#pricerangesel").val($(obj).val());
		var filterobject = $("#filterobject").val();
    	if(filterobject == ''){    		
    		return;
    	}else{    		
    		//过滤餐厅搜索以后的结果
    		if(filterobject == 'wordsearch'){   			
    			//$("#searchrest").trigger('click');
    			searchrestword();
    		}else{
    			clickFilterItem(filterobject);
    		}		
    	}*/
		
    	$("#pricerangesel").val('');
    	$("#pricerangesel").val($(obj).val());
    	
    	//得到搜索词
		var searchword = $("#searchword").val();
		if(searchword == ''){
    		searchword = '0';
    	}
		
		//得到过滤对象信息
		var filterobject = $("#filterobject").val();
		if(filterobject == ''){
			filterobject = 'allrestfood';
		}
		
		//得到餐厅的id
    	var restaurantid = $("#restaurantid").val();
    	
    	//得到食品类别
    	var foodtype = $("#foodtype").val();
    	if(foodtype == ''){    		
			foodtype = '0';
    	}
    	
    	//得到价格区间
    	var pricerange = $("#pricerangesel").val();
    	if(pricerange == ''){	
    		pricerange = 'x';
    	}
    	
    	//得到食品所属类别
    	var dishalcotype = $("#dishalcotype").val();
    	if(dishalcotype == ''){
    		dishalcotype = '0';
    	}
    	
    	//得到成菜类别
		var dishestype = $("#dishestype").val();
		if(dishestype == ''){
			dishestype = '0';
		}
		
		//得到做法类别 
		var cookingtype = $("#cookingtype").val();
		if(cookingtype == ''){
			cookingtype = '0';
		}
		
		//得到口味类别
		var tastetype = $("#tastetype").val();
		if(tastetype == ''){
			tastetype = '0';
		}
		
		//得到原料类别
		var rawmaterialtype = $("#rawmaterialtype").val();
    	if(rawmaterialtype == ''){			
			rawmaterialtype = '0';
		}
		
    	//得到每页显示的条数
		var pageSize = $("#pageSize").val();
       	if(pageSize == ''){
			pageSize = '10';
		}
		
    	var newsorttype = $("#sorttype").val();
    	if(newsorttype == ''){
			newsorttype = '0';
		}
    	
    	var hashstr = filterobject+'_1_'+pageSize+'_'+restaurantid+'_'+newsorttype+'_'+foodtype+'_'+dishalcotype+'_'+pricerange+'_'+dishestype+'_'+cookingtype+'_'+tastetype+'_'+rawmaterialtype+'_'+searchword;		
        hashstr = hashstr.replace(/^.*#/, '');
        $.historyLoad(hashstr);

	}
    
    /**
     * 对每页显示的条数进行选择
     */
    selectPageSize = function(pageSize, id){
    	
    	//得到搜索词
		var searchword = $("#searchword").val();
		if(searchword == ''){
    		searchword = '0';
    	}
		
		//得到过滤对象信息
		var filterobject = $("#filterobject").val();
		if(filterobject == ''){
			filterobject = 'allrestfood';
		}
		
		//得到餐厅的id
    	var restaurantid = $("#restaurantid").val();
    	
    	//得到食品类别
    	var foodtype = $("#foodtype").val();
    	if(foodtype == ''){    		
			foodtype = '0';
    	}
    	
    	//得到价格区间
    	var pricerange = $("#pricerangesel").val();
    	if(pricerange == ''){	
    		pricerange = 'x';
    	}
    	
    	//得到食品所属类别
    	var dishalcotype = $("#dishalcotype").val();
    	if(dishalcotype == ''){
    		dishalcotype = '0';
    	}
    	
    	//得到成菜类别
		var dishestype = $("#dishestype").val();
		if(dishestype == ''){
			dishestype = '0';
		}
		
		//得到做法类别 
		var cookingtype = $("#cookingtype").val();
		if(cookingtype == ''){
			cookingtype = '0';
		}
		
		//得到口味类别
		var tastetype = $("#tastetype").val();
		if(tastetype == ''){
			tastetype = '0';
		}
		
		//得到原料类别
		var rawmaterialtype = $("#rawmaterialtype").val();
    	if(rawmaterialtype == ''){			
			rawmaterialtype = '0';
		}
    	//得到每页显示的条数
		//var pageSize = $("#pageSize").val();
       	
    	var newsorttype = $("#sorttype").val();
    	if(newsorttype == ''){
			newsorttype = '0';
		}
    	
    	$("#pageSize").val(pageSize);
    	
    	var hashstr = filterobject+'_1_'+pageSize+'_'+restaurantid+'_'+newsorttype+'_'+foodtype+'_'+dishalcotype+'_'+pricerange+'_'+dishestype+'_'+cookingtype+'_'+tastetype+'_'+rawmaterialtype+'_'+searchword;		
        hashstr = hashstr.replace(/^.*#/, '');
        $.historyLoad(hashstr);
    	
    	/*var filterobject = $("#filterobject").val();
    	if(filterobject == ''){    		
    		return;
    	}else{   
    		$("#pageno").val("");
    		$("#pageno").val("1");
    		$("#pageSize").val(pageSize);
    		//过滤餐厅搜索以后的结果
    		if(filterobject == 'wordsearch'){   			
    			//$("#searchrest").trigger('click');
    			searchrestword();
    		}else{
    			clickFilterItem(filterobject);
    		}	
    	}*/
    }
    
    
    /**
     * 对返回的结果进行价格过滤
     */
    sortbyprice = function(obj){
    	
    	//得到搜索词
		var searchword = $("#searchword").val();
		if(searchword == ''){
    		searchword = '0';
    	}
		
		//得到过滤对象信息
		var filterobject = $("#filterobject").val();
		if(filterobject == ''){
			filterobject = 'allrestfood';
		}
		
		//得到餐厅的id
    	var restaurantid = $("#restaurantid").val();
    	
    	//得到食品类别
    	var foodtype = $("#foodtype").val();
    	if(foodtype == ''){    		
			foodtype = '0';
    	}
    	
    	//得到价格区间
    	var pricerange = $("#pricerangesel").val();
    	if(pricerange == ''){	
    		pricerange = 'x';
    	}
    	
    	//得到食品所属类别
    	var dishalcotype = $("#dishalcotype").val();
    	if(dishalcotype == ''){
    		dishalcotype = '0';
    	}
    	
    	//得到成菜类别
		var dishestype = $("#dishestype").val();
		if(dishestype == ''){
			dishestype = '0';
		}
		
		//得到做法类别 
		var cookingtype = $("#cookingtype").val();
		if(cookingtype == ''){
			cookingtype = '0';
		}
		
		//得到口味类别
		var tastetype = $("#tastetype").val();
		if(tastetype == ''){
			tastetype = '0';
		}
		
		//得到原料类别
		var rawmaterialtype = $("#rawmaterialtype").val();
    	if(rawmaterialtype == ''){			
			rawmaterialtype = '0';
		}
		
    	//得到每页显示的条数
		var pageSize = $("#pageSize").val();
		if(pageSize == ''){
			pageSize = '10';
		}
		
    	//对字段进行升序降序的切换,
    	var oldsorttype = $("#sorttype").val();
    		
    	if(oldsorttype == 'priceasc'){
    	 	$("#sorttype").val('pricedesc');    		
    	}else if(oldsorttype == 'pricedesc'){
    	  	$("#sorttype").val('priceasc');    		
    	}else{
    		$("#sorttype").val('priceasc');
    	}
       	
    	var newsorttype = $("#sorttype").val();
    	
    	
    	var hashstr = filterobject+'_1_'+pageSize+'_'+restaurantid+'_'+newsorttype+'_'+foodtype+'_'+dishalcotype+'_'+pricerange+'_'+dishestype+'_'+cookingtype+'_'+tastetype+'_'+rawmaterialtype+'_'+searchword;		
        hashstr = hashstr.replace(/^.*#/, '');
        $.historyLoad(hashstr);
    	
    	
    	/* //清空当前所有的页号
		$("#pageno").val('');
		$("#pageno").val('1');
		
		$("#paixu").find('img').not($(obj).parent().find("img:eq(0)")).attr("src",_context+"/images/customer/sort.gif");
		
		var sortSrc = $(obj).parent().find("img:eq(0)").attr("src");
		if(sortSrc.indexOf("sort.gif") != -1 || sortSrc.indexOf("down.gif") != -1){//升序
			$(obj).parent().find("img:eq(0)").attr("src",_context+"/images/customer/sort-up.gif");
		}else if(sortSrc.indexOf("up.gif") != -1){//降序
			$(obj).parent().find("img:eq(0)").attr("src",_context+"/images/customer/sort-down.gif");
		}
    	
    	
    	var filterobject = $("#filterobject").val();
    	if(filterobject == ''){    		
    		return;
    	}else{
    		
    		//对字段进行升序降序的切换,
    		var sorttype = $("#sorttype").val();
    		
    		if(sorttype == 'priceasc'){
    			$("#sorttype").val('pricedesc');
    		}else if(sorttype == 'pricedesc'){
    			$("#sorttype").val('priceasc');
    		}else{
    			$("#sorttype").val('priceasc');
    		}
    		
    		//过滤餐厅搜索以后的结果
    		if(filterobject == 'wordsearch'){   			
    			//$("#searchrest").trigger('click');
    			searchrestword();
    		}else{
    			clickFilterItem(filterobject);
    		}		
    	}	*/
    }
    
    
    /**
     * 对返回的结果进行好评率过滤
     */
    sortbyeval = function(obj){
    	
    	//得到搜索词
		var searchword = $("#searchword").val();
		if(searchword == ''){
    		searchword = '0';
    	}
		
		//得到过滤对象信息
		var filterobject = $("#filterobject").val();
		if(filterobject == ''){
			
			filterobject = 'allrestfood';
		}
		
		//得到餐厅的id
    	var restaurantid = $("#restaurantid").val();
    	
    	//得到食品类别
    	var foodtype = $("#foodtype").val();
    	if(foodtype == ''){    		
			foodtype = '0';
    	}
    	
    	//得到价格区间
    	var pricerange = $("#pricerangesel").val();
    	if(pricerange == ''){	
    		pricerange = 'x';
    	}
    	
    	//得到食品所属类别
    	var dishalcotype = $("#dishalcotype").val();
    	if(dishalcotype == ''){
    		dishalcotype = '0';
    	}
    	
    	//得到成菜类别
		var dishestype = $("#dishestype").val();
		if(dishestype == ''){
			dishestype = '0';
		}
		
		//得到做法类别 
		var cookingtype = $("#cookingtype").val();
		if(cookingtype == ''){
			cookingtype = '0';
		}
		
		
		//得到口味类别
		var tastetype = $("#tastetype").val();
		if(tastetype == ''){
			tastetype = '0';
		}
		
		//得到原料类别
		var rawmaterialtype = $("#rawmaterialtype").val();
    	if(rawmaterialtype == ''){			
			rawmaterialtype = '0';
		}
		
    	//得到每页显示的条数
		var pageSize = $("#pageSize").val();
		if(pageSize == ''){
			pageSize = '10';
		}
		
    	//对字段进行升序降序的切换,
    	var oldsorttype = $("#sorttype").val();
    		
    	if(oldsorttype == 'evaluateasc'){
    			$("#sorttype").val('evaluatedesc');
    	}else if(oldsorttype == 'evaluatedesc'){
    			$("#sorttype").val('evaluateasc');
    	}else{
    			$("#sorttype").val('evaluateasc');
    	}
       	
    	var newsorttype = $("#sorttype").val();

    	
    	var hashstr = filterobject+'_1_'+pageSize+'_'+restaurantid+'_'+newsorttype+'_'+foodtype+'_'+dishalcotype+'_'+pricerange+'_'+dishestype+'_'+cookingtype+'_'+tastetype+'_'+rawmaterialtype+'_'+searchword;		
        hashstr = hashstr.replace(/^.*#/, '');
        $.historyLoad(hashstr);
	
    	/* //清空当前所有的页号
		$("#pageno").val('');
		$("#pageno").val('1');
		
		$("#paixu").find('img').not($(obj).parent().find("img:eq(1)")).attr("src",_context+"/images/customer/sort.gif");
		
		var sortSrc = $(obj).parent().find("img:eq(1)").attr("src");
		if(sortSrc.indexOf("sort.gif") != -1 || sortSrc.indexOf("down.gif") != -1){//升序
			$(obj).parent().find("img:eq(1)").attr("src",_context+"/images/customer/sort-up.gif");
		}else if(sortSrc.indexOf("up.gif") != -1){//降序
			$(obj).parent().find("img:eq(1)").attr("src",_context+"/images/customer/sort-down.gif");
		}
    	
    	var filterobject = $("#filterobject").val();
    	if(filterobject == ''){    		
    		return;
    	}else{
    		
    		//对字段进行升序降序的切换,
    		var sorttype = $("#sorttype").val();
    		
    		if(sorttype == 'evaluateasc'){
    			$("#sorttype").val('evaluatedesc');
    		}else if(sorttype == 'evaluatedesc'){
    			$("#sorttype").val('evaluateasc');
    		}else{
    			$("#sorttype").val('evaluateasc');
    		}
    		
    		//过滤餐厅搜索以后的结果
    		if(filterobject == 'wordsearch'){   			
    			//$("#searchrest").trigger('click');
    			searchrestword();
    		}else{
    			clickFilterItem(filterobject);
    		}	
    	}    	*/
    }
    
 
    
    isnullfilterobject = function(filterobject){
    	if(filterobject == ''){    		
    		return;
    	}else
    	
    	//过滤餐厅搜索以后的结果
    	if(filterobject == 'wordsearch'){ 
    			
    		//得到搜索词, 如果为空不进行过滤
			var searchword = $("#searchword").val();
			if(searchword == ''){						
				return;
			}
    	}
    }
    
 
    
    
    /**
     * 清空所有过滤数据, 主食品类别, 主菜和酒水的子类, 原料类别,  成菜, 做法, 可味
     */
    clearfilterobjectdata = function(){
    	
    	$("#foodtype").val("");    		
    	$("#dishalcotype").val("");
    	$("#dishestype").val("");
    	$("#cookingtype").val("");
    	$("#tastetype").val("");
    	$("#rawmaterialtype").val("");
    	
    }
    
    
    /**
     * 过滤原料类型数据
     */
    filterRawmaterialResult = function(foodtype, rawmaterialtype){
    	
    	$("#navChildraw").hide();
    	$(".left_menu_inner").find('li').removeClass('filtercurrent');
    	$("#left_menu").find("li:eq(2)").addClass('filtercurrent');
    	
    	clearfilterobjectdata();
    	
    	//得到搜索词, 过滤得时候将搜索的词置为空
		$("#searchword").val('');
		displayrestsearchlabel(1);
		var searchword = $("#searchword").val();
		if(searchword == ''){
    		searchword = '0';
    	}
				
		$("#filterobject").val('allrestfood');
		//得到过滤对象信息
		var filterobject = $("#filterobject").val();
		
		//得到餐厅的id
    	var restaurantid = $("#restaurantid").val();
    	
    	//得到食品类别
    	$("#foodtype").val(foodtype); 
    	if(foodtype == ''){    		
			foodtype = '0';
    	}
    	//得到价格区间
    	$("#pricerangesel").val('');
    	var pricerange = $("#pricerangesel").val();
    	if(pricerange == ''){	
    		pricerange = 'x';
    	}
    	
    	
    	//得到食品所属类别
    	var dishalcotype = $("#dishalcotype").val();
    	if(dishalcotype == ''){
    		dishalcotype = '0';
    	}
    	
    	//得到成菜类别
		var dishestype = $("#dishestype").val();
		if(dishestype == ''){
			dishestype = '0';
		}
			
		//得到做法类别 
		var cookingtype = $("#cookingtype").val();
		if(cookingtype == ''){
			cookingtype = '0';
		}
		
		
		//得到口味类别
		var tastetype = $("#tastetype").val();
		if(tastetype == ''){
			tastetype = '0';
		}
		
		
		//得到原料类别
		$("#rawmaterialtype").val(rawmaterialtype);
		if(rawmaterialtype == ''){			
			rawmaterialtype = '0';
		}
		
    	//得到每页显示的条数
		$("#pageSize").val('');
		var pageSize = $("#pageSize").val();
		if(pageSize == ''){
			pageSize = '10';
		}
		
    	//对字段进行升序降序的切换,     
		$("#sorttype").val('');
    	var newsorttype = $("#sorttype").val();
		if(newsorttype == ''){
			newsorttype = '0';
		}
    	
    	var hashstr = filterobject+'_1_'+pageSize+'_'+restaurantid+'_'+newsorttype+'_'+foodtype+'_'+dishalcotype+'_'+pricerange+'_'+dishestype+'_'+cookingtype+'_'+tastetype+'_'+rawmaterialtype+'_'+searchword;		
        hashstr = hashstr.replace(/^.*#/, '');
        $.historyLoad(hashstr);
    }
    
    /**
     * 过滤成菜类型数据 type判断是否注释  0 不为主食  1为主食
     */
    filterDishesResult = function(foodtype,  dishestype, type){
    	
    	$(".left_menu_inner").find('li').removeClass('filtercurrent');
    	$("#navChilddishes").hide();
    	$("#navChildmainfood").hide();
    	if(type == '0'){
    		$("#left_menu").find("li:eq(1)").addClass('filtercurrent');
    	}else{
    		$("#left_menu").find("li:eq(5)").addClass('filtercurrent');
    	}
    	clearfilterobjectdata();
    	
    	//得到搜索词, 过滤得时候将搜索的词置为空
		$("#searchword").val('');
		displayrestsearchlabel(1);
		var searchword = $("#searchword").val();
		if(searchword == ''){
    		searchword = '0';
    	}
				
		$("#filterobject").val('allrestfood');
		//得到过滤对象信息
		var filterobject = $("#filterobject").val();
		
		//得到餐厅的id
    	var restaurantid = $("#restaurantid").val();
    	
    	//得到食品类别
    	$("#foodtype").val(foodtype); 
    	if(foodtype == ''){    		
			foodtype = '0';
    	}
    	
    	//得到价格区间
    	$("#pricerangesel").val('');
    	var pricerange = $("#pricerangesel").val();
    	if(pricerange == ''){	
    		pricerange = 'x';
    	}
    	
    	
    	//得到食品所属类别
    	var dishalcotype = $("#dishalcotype").val();
    	if(dishalcotype == ''){
    		dishalcotype = '0';
    	}
    	
    	//得到成菜类别
		$("#dishestype").val(dishestype);
		if(dishestype == ''){
			dishestype = '0';
		}
			
		//得到做法类别 
		var cookingtype = $("#cookingtype").val();
		if(cookingtype == ''){
			cookingtype = '0';
		}
		
		
		//得到口味类别
		var tastetype = $("#tastetype").val();
		if(tastetype == ''){
			tastetype = '0';
		}
		
		
		//得到原料类别
		var rawmaterialtype = $("#rawmaterialtype").val();
		if(rawmaterialtype == ''){			
			rawmaterialtype = '0';
		}
		
	
    	//得到每页显示的条数
		$("#pageSize").val('');
		var pageSize = $("#pageSize").val();
		if(pageSize == ''){
			pageSize = '10';
		}
		
    	//对字段进行升序降序的切换, 
		$("#sorttype").val('');
    	var newsorttype = $("#sorttype").val();
		if(newsorttype == ''){
			newsorttype = '0';
		}
    	
    	var hashstr = filterobject+'_1_'+pageSize+'_'+restaurantid+'_'+newsorttype+'_'+foodtype+'_'+dishalcotype+'_'+pricerange+'_'+dishestype+'_'+cookingtype+'_'+tastetype+'_'+rawmaterialtype+'_'+searchword;		
        hashstr = hashstr.replace(/^.*#/, '');
        $.historyLoad(hashstr);
    }
    
    /**
     * 过滤做法类型数据
     */
    filterCookingResult = function(foodtype, cookingtype){
    	
    	$(".left_menu_inner").find('li').removeClass('filtercurrent');
    	$("#navChildcooking").hide();
    	$("#left_menu").find("li:eq(0)").addClass('filtercurrent');
    	
    	clearfilterobjectdata();
    	
    	//得到搜索词, 过滤得时候将搜索的词置为空
		$("#searchword").val('');
		displayrestsearchlabel(1);
		var searchword = $("#searchword").val();
		if(searchword == ''){
    		searchword = '0';
    	}
				
		$("#filterobject").val('allrestfood');
		//得到过滤对象信息
		var filterobject = $("#filterobject").val();
		
		//得到餐厅的id
    	var restaurantid = $("#restaurantid").val();
    	
    	//得到食品类别
    	$("#foodtype").val(foodtype); 
    	if(foodtype == ''){    		
			foodtype = '0';
    	}
    	
    	//得到价格区间
    	$("#pricerangesel").val('');
    	var pricerange = $("#pricerangesel").val();
    	if(pricerange == ''){	
    		pricerange = 'x';
    	}
    	
    	
    	//得到食品所属类别
    	var dishalcotype = $("#dishalcotype").val();
    	if(dishalcotype == ''){
    		dishalcotype = '0';
    	}
    	
    	//得到成菜类别
		var dishestype = $("#dishestype").val();
		if(dishestype == ''){
			dishestype = '0';
		}
			
		//得到做法类别 
		$("#cookingtype").val(cookingtype);
		if(cookingtype == ''){
			cookingtype = '0';
		}
		
		
		//得到口味类别
		var tastetype = $("#tastetype").val();
		if(tastetype == ''){
			tastetype = '0';
		}
		
		
		//得到原料类别
		var rawmaterialtype = $("#rawmaterialtype").val();
		if(rawmaterialtype == ''){			
			rawmaterialtype = '0';
		}
		
	
    	//得到每页显示的条数
		$("#pageSize").val('');
		var pageSize = $("#pageSize").val();
		if(pageSize == ''){
			pageSize = '10';
		}
		
    	//对字段进行升序降序的切换,  
		$("#sorttype").val('');
    	var newsorttype = $("#sorttype").val();
		if(newsorttype == ''){
			newsorttype = '0';
		}
    	
    	
    	
    	var hashstr = filterobject+'_1_'+pageSize+'_'+restaurantid+'_'+newsorttype+'_'+foodtype+'_'+dishalcotype+'_'+pricerange+'_'+dishestype+'_'+cookingtype+'_'+tastetype+'_'+rawmaterialtype+'_'+searchword;		
        hashstr = hashstr.replace(/^.*#/, '');
        $.historyLoad(hashstr);
    	
    	
    }
    
    /**
     * 过滤口味类型数据
     */
    filterTasteResult = function(foodtype, tastetype){
    	
    	/*$("#tabs ul li").removeAttr("class");	
    	$("#allrestfood").parent().attr("class", "current");
    	
    	clearfilterobjectdata();
    	$("#pageno").val("");
    	$("#filterobject").val('allrestfood');
    	var filterobject = $("#filterobject").val();
    	isnullfilterobject(filterobject);
    	$("#foodtype").val(foodtype);  
    	$("#tastetype").val(tastetype);
    	triggerFoodSearch(filterobject);*/
    	
    	$("#navChildtaste").hide();
    	$(".left_menu_inner").find('li').removeClass('filtercurrent');
    	$("#left_menu").find("li:eq(3)").addClass('filtercurrent');
    	
    	clearfilterobjectdata();
    	
    	//得到搜索词, 过滤得时候将搜索的词置为空
		$("#searchword").val('');
		displayrestsearchlabel(1);
		var searchword = $("#searchword").val();
		if(searchword == ''){
    		searchword = '0';
    	}
				
		$("#filterobject").val('allrestfood');
		//得到过滤对象信息
		var filterobject = $("#filterobject").val();
		
		//得到餐厅的id
    	var restaurantid = $("#restaurantid").val();
    	
    	//得到食品类别
    	$("#foodtype").val(foodtype); 
    	if(foodtype == ''){    		
			foodtype = '0';
    	}
    	
    	//得到价格区间
    	$("#pricerangesel").val('');
    	var pricerange = $("#pricerangesel").val();
    	if(pricerange == ''){	
    		pricerange = 'x';
    	}
    	
    	
    	//得到食品所属类别
    	var dishalcotype = $("#dishalcotype").val();
    	if(dishalcotype == ''){
    		dishalcotype = '0';
    	}
    	
    	//得到成菜类别
		var dishestype = $("#dishestype").val();
		if(dishestype == ''){
			dishestype = '0';
		}
			
		//得到做法类别 
		var cookingtype = $("#cookingtype").val();
		if(cookingtype == ''){
			cookingtype = '0';
		}
		
		
		//得到口味类别
		$("#tastetype").val(tastetype);
		if(tastetype == ''){
			tastetype = '0';
		}
		
		
		//得到原料类别
		var rawmaterialtype = $("#rawmaterialtype").val();
		if(rawmaterialtype == ''){			
			rawmaterialtype = '0';
		}
		
	
    	//得到每页显示的条数
		$("#pageSize").val('');
		var pageSize = $("#pageSize").val();
		if(pageSize == ''){
			pageSize = '10';
		}
		
    	//对字段进行升序降序的切换,  
		$("#sorttype").val('');
    	var newsorttype = $("#sorttype").val();
		if(newsorttype == ''){
			newsorttype = '0';
		}
    	
    	
    	
    	var hashstr = filterobject+'_1_'+pageSize+'_'+restaurantid+'_'+newsorttype+'_'+foodtype+'_'+dishalcotype+'_'+pricerange+'_'+dishestype+'_'+cookingtype+'_'+tastetype+'_'+rawmaterialtype+'_'+searchword;		
        hashstr = hashstr.replace(/^.*#/, '');
        $.historyLoad(hashstr);
    	
    	
    }
  
    /**
     * 过滤酒水类型
     */
    filterAlcoholResult = function(foodtype, alcoholtype){
    	
    	/*$("#tabs ul li").removeAttr("class");	
    	$("#allrestfood").parent().attr("class", "current");
    	
    	clearfilterobjectdata();
    	$("#pageno").val("");
    	$("#filterobject").val('allrestfood');
    	var filterobject = $("#filterobject").val();
    	isnullfilterobject(filterobject);
    	$("#foodtype").val(foodtype);    		
    	$("#dishalcotype").val(alcoholtype);
    	triggerFoodSearch(filterobject);*/
    	$(".left_menu_inner").find('li').removeClass('filtercurrent');
    	$("#navChildalco").hide();	
    	$("#left_menu").find("li:eq(7)").addClass('filtercurrent');
    	clearfilterobjectdata();
    	
    	//得到搜索词, 过滤得时候将搜索的词置为空
		$("#searchword").val('');
		displayrestsearchlabel(1);
		var searchword = $("#searchword").val();
		if(searchword == ''){
    		searchword = '0';
    	}
				
		$("#filterobject").val('allrestfood');
		//得到过滤对象信息
		var filterobject = $("#filterobject").val();
		
		//得到餐厅的id
    	var restaurantid = $("#restaurantid").val();
    	
    	//得到食品类别
    	$("#foodtype").val(foodtype); 
    	if(foodtype == ''){    		
			foodtype = '0';
    	}
    	
    	//得到价格区间
    	$("#pricerangesel").val('');
    	var pricerange = $("#pricerangesel").val();
    	if(pricerange == ''){	
    		pricerange = 'x';
    	}
    	
    	//得到食品所属类别
    	$("#dishalcotype").val(alcoholtype);
    	var dishalcotype = $("#dishalcotype").val();
    	if(dishalcotype == ''){
    		dishalcotype = '0';
    	}
    	
    	//得到成菜类别
		var dishestype = $("#dishestype").val();
		if(dishestype == ''){
			dishestype = '0';
		}
			
		//得到做法类别 
		var cookingtype = $("#cookingtype").val();
		if(cookingtype == ''){
			cookingtype = '0';
		}
		
		
		//得到口味类别
		var tastetype = $("#tastetype").val();
		if(tastetype == ''){
			tastetype = '0';
		}
		
		
		//得到原料类别
		var rawmaterialtype = $("#rawmaterialtype").val();
		if(rawmaterialtype == ''){			
			rawmaterialtype = '0';
		}
		
	
    	//得到每页显示的条数
		$("#pageSize").val('');
		var pageSize = $("#pageSize").val();
		if(pageSize == ''){
			pageSize = '10';
		}
		
    	//对字段进行升序降序的切换,  
		$("#sorttype").val('');
    	var newsorttype = $("#sorttype").val();
		if(newsorttype == ''){
			newsorttype = '0';
		}
    	
    	
    	
    	var hashstr = filterobject+'_1_'+pageSize+'_'+restaurantid+'_'+newsorttype+'_'+foodtype+'_'+dishalcotype+'_'+pricerange+'_'+dishestype+'_'+cookingtype+'_'+tastetype+'_'+rawmaterialtype+'_'+searchword;		
        hashstr = hashstr.replace(/^.*#/, '');
        $.historyLoad(hashstr);
    	
    	
    	
    }
    
    /**
     * 过滤套餐小吃类型
     */
    filterSetmealsResult = function(foodtype){    
    	
    	/*$("#tabs ul li").removeAttr("class");	
    	$("#allrestfood").parent().attr("class", "current");
    	
    	clearfilterobjectdata();
    	$("#pageno").val("");
    	$("#filterobject").val('allrestfood');
    	var filterobject = $("#filterobject").val();
    	isnullfilterobject(filterobject);	
    	$("#foodtype").val(foodtype);    		
    	triggerFoodSearch(filterobject);*/

    	$(".left_menu_inner").find('li').removeClass('filtercurrent');
    	$("#navChildsetmeals").hide();
    	
    	$("#left_menu").find("li:eq(4)").addClass('filtercurrent');
    	
    	clearfilterobjectdata();
    	
    	//得到搜索词, 过滤得时候将搜索的词置为空
		$("#searchword").val('');
		displayrestsearchlabel(1);
		var searchword = $("#searchword").val();
		if(searchword == ''){
    		searchword = '0';
    	}
				
		$("#filterobject").val('allrestfood');
		//得到过滤对象信息
		var filterobject = $("#filterobject").val();
		
		//得到餐厅的id
    	var restaurantid = $("#restaurantid").val();
    	
    	//得到食品类别
    	$("#foodtype").val(foodtype); 
    	if(foodtype == ''){    		
			foodtype = '0';
    	}
    	
    	//得到价格区间
    	$("#pricerangesel").val('');
    	var pricerange = $("#pricerangesel").val();
    	if(pricerange == ''){	
    		pricerange = 'x';
    	}
    	
    	
    	//得到食品所属类别
    	var dishalcotype = $("#dishalcotype").val();
    	if(dishalcotype == ''){
    		dishalcotype = '0';
    	}
    	
    	//得到成菜类别
		var dishestype = $("#dishestype").val();
		if(dishestype == ''){
			dishestype = '0';
		}
			
		//得到做法类别 
		var cookingtype = $("#cookingtype").val();
		if(cookingtype == ''){
			cookingtype = '0';
		}
		
		
		//得到口味类别
		var tastetype = $("#tastetype").val();
		if(tastetype == ''){
			tastetype = '0';
		}
		
		
		//得到原料类别
		var rawmaterialtype = $("#rawmaterialtype").val();
		if(rawmaterialtype == ''){			
			rawmaterialtype = '0';
		}
		
	
    	//得到每页显示的条数
		$("#pageSize").val('');
		var pageSize = $("#pageSize").val();
		if(pageSize == ''){
			pageSize = '10';
		}
		
    	//对字段进行升序降序的切换,
		$("#sorttype").val('');
    	var newsorttype = $("#sorttype").val();
		if(newsorttype == ''){
			newsorttype = '0';
		}
    	
    	
    	
    	var hashstr = filterobject+'_1_'+pageSize+'_'+restaurantid+'_'+newsorttype+'_'+foodtype+'_'+dishalcotype+'_'+pricerange+'_'+dishestype+'_'+cookingtype+'_'+tastetype+'_'+rawmaterialtype+'_'+searchword;		
        hashstr = hashstr.replace(/^.*#/, '');
        $.historyLoad(hashstr);
    	
    }
    
    filterotherfoodResult= function(foodtype){ 
    	
    	/*$("#tabs ul li").removeAttr("class");	
    	$("#allrestfood").parent().attr("class", "current");
    	
    	clearfilterobjectdata();
    	$("#pageno").val("");
    	$("#filterobject").val('allrestfood');
    	var filterobject = $("#filterobject").val();
    	isnullfilterobject(filterobject);	
    	$("#foodtype").val(foodtype);    		
    	triggerFoodSearch(filterobject);*/
    	$(".left_menu_inner").find('li').removeClass('filtercurrent');
    	$("#navChildotherfood").hide();
    	$("#left_menu").find("li:eq(6)").addClass('filtercurrent');
    	clearfilterobjectdata();
    	
    	//得到搜索词, 过滤得时候将搜索的词置为空
		$("#searchword").val('');
		displayrestsearchlabel(1);
		var searchword = $("#searchword").val();
		if(searchword == ''){
    		searchword = '0';
    	}
				
		$("#filterobject").val('allrestfood');
		//得到过滤对象信息
		var filterobject = $("#filterobject").val();
		
		//得到餐厅的id
    	var restaurantid = $("#restaurantid").val();
    	
    	//得到食品类别
    	$("#foodtype").val(foodtype); 
    	if(foodtype == ''){    		
			foodtype = '0';
    	}
    	
    	//得到价格区间
    	$("#pricerangesel").val('');
    	var pricerange = $("#pricerangesel").val();
    	if(pricerange == ''){	
    		pricerange = 'x';
    	}
    	
    	
    	//得到食品所属类别
    	var dishalcotype = $("#dishalcotype").val();
    	if(dishalcotype == ''){
    		dishalcotype = '0';
    	}
    	
    	//得到成菜类别
		var dishestype = $("#dishestype").val();
		if(dishestype == ''){
			dishestype = '0';
		}
			
		//得到做法类别 
		var cookingtype = $("#cookingtype").val();
		if(cookingtype == ''){
			cookingtype = '0';
		}
		
		
		//得到口味类别
		var tastetype = $("#tastetype").val();
		if(tastetype == ''){
			tastetype = '0';
		}
		
		
		//得到原料类别
		var rawmaterialtype = $("#rawmaterialtype").val();
		if(rawmaterialtype == ''){			
			rawmaterialtype = '0';
		}
		
	
    	//得到每页显示的条数
		$("#pageSize").val('');
		var pageSize = $("#pageSize").val();
		if(pageSize == ''){
			pageSize = '10';
		}
		
    	//对字段进行升序降序的切换,
		$("#sorttype").val('');
    	var newsorttype = $("#sorttype").val();
		if(newsorttype == ''){
			newsorttype = '0';
		}
    	
    	
    	
    	var hashstr = filterobject+'_1_'+pageSize+'_'+restaurantid+'_'+newsorttype+'_'+foodtype+'_'+dishalcotype+'_'+pricerange+'_'+dishestype+'_'+cookingtype+'_'+tastetype+'_'+rawmaterialtype+'_'+searchword;		
        hashstr = hashstr.replace(/^.*#/, '');
        $.historyLoad(hashstr);
    	
    }
    
    triggerFoodSearch = function(filterobject){
    	//过滤餐厅搜索以后的结果
    	if(filterobject == 'wordsearch'){ 
    			//$("#searchrest").trigger('click');
    			searchrestword();
    	}else{
    			clickFilterItem(filterobject);
    	}
    }
    
	/**
	 * 分类过滤检索回来的结果
	 */
    filterResult = function(filtertype){
    	
    	var str = new String(filtertype);
    	var filterobject = $("#filterobject").val();
    	
    	//过滤餐厅搜索以后的结果
    	if(filterobject == 'wordsearch'){ 
    			
    		//得到搜索词, 如果为空不进行过滤
			var searchword = $("#searchword").val();
			if(searchword == ''){						
				return;
			}
    	}
    	
    	if(filterobject == ''){    		
    		return;
    	}else{
    		
    		var strs = str.split(".");
    		
    		$("#foodtype").val("");    		
    		$("#dishalcotype").val("");
    		
    		
    		$("#foodtype").val(strs[0]);
    		
    		//改变标题 
    		if(strs[0] == 1){   			
    			/*$("#biaoti").text($("#maindishclass").text()); */  			
    			//去掉二级标题
    			/*if(strs.length > 1){
    				$("#biaoti").text($("#maindishclass").text()+":"+$("#filter"+strs[1]).text());
    			}*/
    		}else if(strs[0] == 2){
    			/*$("#biaoti").text($("#alcoholclass").text());*/ 
    			/*if(strs.length > 1){
    				$("#biaoti").text($("#alcoholclass").text()+":"+$("#filter"+strs[1]).text());
    			}*/
    		}else if(strs[0] == 3){
    			/*$("#biaoti").text($("#setmealsclass").text()); */
    		}else{
    			/*$("#biaoti").text($("#otherfoodclass").text()); */
    		}
    		 		
    		if(strs.length > 1){ 
    			$("#dishalcotype").val(strs[1]);    	
    		}
    		
    		//过滤餐厅搜索以后的结果
    		if(filterobject == 'wordsearch'){ 
    			//$("#searchrest").trigger('click');
    			searchrestword();
    		}else{
    			clickMeanItem(filterobject);
    		}
    	}
    }
    
    //对美食搜索ajax调用以后, 根据食品类别, 显示合适的描述信息
	updateFoodDescription = function(items){
		
		for(var i=0; i<items.length; i++){
			var html = '';
			if(items[i].foodtype == 1){
				
				html += '<div><span>菜&#12288;&#12288;系：</span><span class="text_content">'+items[i].disalcotypename+'</span><br></div>'+
	                                     '<div><span>口&#12288;&#12288;味：</span><span class="text_content">'+items[i].tastename+'</span><br></div>'+
	                                     '<div><span>主要食材：</span><span class="text_content">'+items[i].rawmaterialname+'</span><br></div>'+
	                                     '<div><span>制作方法：</span><span class="text_content">'+items[i].makingmethod+'</span><br></div>'+
					                     '<span>描&#12288;&#12288;述：</span><span class="text_content">'+items[i].intro+'</span>';
			}else if(items[i].foodtype == 2){
				
				html += '<div><span>酒&#12288;&#12288;类：</span><span class="text_content">'+items[i].disalcotypename+'</span><br></div><div><span>品&#12288;&#12288;牌：</span><span class="text_content">'+items[i].tastename+'</span><br></div><div><span>酒&nbsp;精&nbsp;度：</span><span class="text_content">';
				
				if(items[i].rawmaterialname == '' || items[i].rawmaterialname == null){
											
		               html +=	'无';
				}else{	
					   html += items[i].rawmaterialname+'%';
				}	
										 
					   html += '</span><br></div><div><span>容量：</span><span class="text_content">'+items[i].makingmethod+'</span><br></div><span>描&#12288;&#12288;述：</span><span class="text_content">'+items[i].intro+'</span>';
				
			}else{
				
					   html += '<div><span></span><span class="text_content"></span><br></div>'+
                                     	'<div><span></span><span class="text_content"></span><br></div>'+
				                     	'<span>描&#12288;&#12288;述：</span><span class="text_content">'+items[i].intro+'</span>';
			}
			
			$("#description"+i).html(html);
		}
	}
    
	
	clickFilterItem = function(menuitem){
		
		//定义所在菜单
		$("#filterobject").val(menuitem);
		
		var filterobject = $("#filterobject").val();
    	
		//得到页数
		var pageno = $("#pageno").val();
		
		
		

		//得到总的页数
		var totalpage=$("#totalpage").val();
			
		//得到餐厅的id
		var restaurantid = $("#restaurantid").val();
			
		//得到排序类别
		var sorttype = $("#sorttype").val();
		
		//得到价格区间
		var pricerange = $("#pricerangesel").val();
		
		//得到食品类别
		var foodtype = $("#foodtype").val();
		
			
		//得到食品所属类别
		var dishalcotype = $("#dishalcotype").val();
		
		//得到成菜类别
		var dishestype = $("#dishestype").val();
		
		//得到做法类别 
		var cookingtype = $("#cookingtype").val();
		
		//得到口味类别
		var tastetype = $("#tastetype").val();
		
		//得到原料类别
		var rawmaterialtype = $("#rawmaterialtype").val();
		
		//得到每页显示的条数
		var pageSize = $("#pageSize").val();
		
		var number = Math.random(); 
		
		$.ajax({type: "POST",   
			url: _context+"/orderfood.do?method=getWordSearch",
			dataType:"json",
			data : {pageSize:pageSize, pageno:pageno, restaurantid:restaurantid, 
			filterobject:filterobject, sorttype:sorttype, foodtype:foodtype, 
			dishalcotype:dishalcotype, dishestype:dishestype, cookingtype:cookingtype, 
			tastetype:tastetype, rawmaterialtype:rawmaterialtype, pricerange:pricerange, 
			number:number},
			success: function(json)
			{ 
				var items = json.fooditems;
				if(items.length > 0){
				$("#orderitems").html("");
				$("#orderitems").html(getDiv(items));
				
				//更新食品信息内容
				updateFoodDescription(items);
				
				
				//更新是否显示特价标识
				for(var i=0; i<items.length; i++){
					if(items[i].specflag == 1){
						$("#specflag"+i).show();
					}else{
						$("#specflag"+i).hide();
					}
					
					if(items[i].unitflag == 0 || items[i].unitflag == '' || items[i].unitflag == null){								
							$("#unitflag"+i).text("");	
					}else{
							$("#unitflag"+i).text("./"+items[i].unitdesc);	
					}
					
				}
				
				//更新折扣率
				for(var i=0; i<items.length; i++){
					var html = '';
					if(items[i].specflag == 1){
					}else if(items[i].specflag == 0 && items[i].discountrate != 10){
						html += '['+items[i].discountrate+'折]';
						$("#pricearea"+i).append(html);
					}
				}
				
				
				
				//改变评论星级的内容
				updateStarComment(items);
				
				//对结果进行过滤, 是否显示套餐详情内容
				updateSetmealDetails(items);
				
				
				
				 //总的页数
				 $("#totalpage").val("");
				 $("#totalpage").val(json.totalpage);
				 
				 if(json.totalpage > 1){
				 	if(pageno == '') pageno = '1';
				 	
				 	$("#pager").pager({ pagenumber: pageno, pagecount: json.totalpage, buttonClickCallback: PageClick});
				 }else{
				 	
				 	$("#pager").html('');
				 }
				 //显示排序, 每页数量栏
				 //$("#title_c").show();
				 
				}else{
					$("#pager").html("");
					$("#orderitems").html('  <div class="noticeSign "><h3> 很抱歉！暂无记录，请重新操作！</h3> </div>');
					//隐藏排序, 每页数量栏
					//$("#title_c").hide();
					
					$("#orderitems").show();
				}
			}});	
			
			
			
			
        	
        	//return false;
			
			
	}
	
	clkrestfoodtype = function(restfoodtype){
		
		var filterobject = $("#filterobject").val();
		var searchword = $("#searchword").val();
		if(searchword == ''){
    		searchword = '0';
    	}
		
		
		
		var hashstr = filterobject+'_1_'+restaurantid+'_'+restfoodtype+'_'+searchword;
		hashstr = hashstr.replace(/^.*#/, '');
        // moves to a new page. 
        // pageload is called at once. 
        // hash don't contain "#", "?"
        $.historyLoad(hashstr);
	}
	
	$("#allrestfood").click(function(){
		$("#left_menu").find('li').removeClass('filtercurrent');
		
		var restfiltertype = $("#restfiltertype").val();
		
		var hashstr = '';
		if(restfiltertype == '0'){
			//hash规则多个hash用_隔开 
			//第一个代表所在的menu 
			//第二个代表所在的页数
			//第三个代表所在的餐厅的id 
			//第四个代表菜所处的分类类别 0为不限
			//第五个表示搜索的关键词 为0表示搜索关键词为空
			hashstr = 'allrestfood_1_'+restaurantid+'_0_0';
		}else{
			//hash规则多个hash用_隔开 
			//第一个代表所在的menu 
			//第二个代表所在的页数
			//第三个代表所在的页数尺寸
			//第四个代表所在的餐厅的id 
			//第五个代表排序类型, 如果为0表示为默认排序类型
			//第六个代表所在的食品类别  为0表示不限
			//第七个代表食品所属类别  为0表示不限
			//第八个代表价格区间 为x表示不限
			//第九个代表成菜类别  为0表示成菜类别不限
			//第十个表示做法类别 为0表示做法不限
			//第十一个表示口味类别  为0表示口味类别不限
			//第十二个表示原料类别  为0表示原料类别不限
			//第十三个表示搜索的关键词 为0表示搜索关键词为空
			hashstr = 'allrestfood_1_10_'+restaurantid+'_0_0_0_x_0_0_0_0_0';		
	        
		}
		hashstr = hashstr.replace(/^.*#/, '');
        // moves to a new page. 
        // pageload is called at once. 
        // hash don't contain "#", "?"
        $.historyLoad(hashstr);
	   }
	);
	
	
	$("#restrecommfood").click(function(){
		$("#left_menu").find('li').removeClass('filtercurrent');
		var restfiltertype = $("#restfiltertype").val();
		
		var hashstr = '';
		if(restfiltertype == '0'){
			//hash规则多个hash用_隔开 
			//第一个代表所在的menu 
			//第二个代表所在的页数
			//第三个代表所在的餐厅的id 
			//第四个代表菜所处的分类类别 0为不限
			//第五个表示搜索的关键词 为0表示搜索关键词为空
			hashstr = 'restrecommfood_1_'+restaurantid+'_0_0';
		}else{
		
			//hash规则多个hash用_隔开 
			//第一个代表所在的menu 
			//第二个代表所在的页数
			//第三个代表所在的页数尺寸
			//第四个代表所在的餐厅的id 
			//第五个代表排序类型, 如果为0表示为默认排序类型
			//第六个代表所在的食品类别  为0表示不限
			//第七个代表食品所属类别  为0表示不限
			//第八个代表价格区间 为x表示不限
			//第九个代表成菜类别  为0表示成菜类别不限
			//第十个表示做法类别 为0表示做法不限
			//第十一个表示口味类别  为0表示口味类别不限
			//第十二个表示原料类别  为0表示原料类别不限
			//第十三个表示搜索的关键词 为0表示搜索关键词为空
			hashstr = 'restrecommfood_1_10_'+restaurantid+'_0_0_0_x_0_0_0_0_0';		
       
		}
		 hashstr = hashstr.replace(/^.*#/, '');
	     // moves to a new page. 
	     // pageload is called at once. 
	     // hash don't contain "#", "?"
	     $.historyLoad(hashstr);
	}
	);
	
	$("#restspecfood").click(function(){
		$("#left_menu").find('li').removeClass('filtercurrent');
		var restfiltertype = $("#restfiltertype").val();
		
		var hashstr = '';
		if(restfiltertype == '0'){
			//hash规则多个hash用_隔开 
			//第一个代表所在的menu 
			//第二个代表所在的页数
			//第三个代表所在的餐厅的id 
			//第四个代表菜所处的分类类别 0为不限
			//第五个表示搜索的关键词 为0表示搜索关键词为空
			hashstr = 'restspecfood_1_'+restaurantid+'_0_0';
		}else{
			//hash规则多个hash用_隔开 
			//第一个代表所在的menu 
			//第二个代表所在的页数
			//第三个代表所在的页数尺寸
			//第四个代表所在的餐厅的id 
			//第五个代表排序类型, 如果为0表示为默认排序类型
			//第六个代表所在的食品类别  为0表示不限
			//第七个代表食品所属类别  为0表示不限
			//第八个代表价格区间 为x表示不限
			//第九个代表成菜类别  为0表示成菜类别不限
			//第十个表示做法类别 为0表示做法不限
			//第十一个表示口味类别  为0表示口味类别不限
			//第十二个表示原料类别  为0表示原料类别不限
			//第十三个表示搜索的关键词 为0表示搜索关键词为空
			hashstr = 'restspecfood_1_10_'+restaurantid+'_0_0_0_x_0_0_0_0_0';		
       
		}
		
		 	hashstr = hashstr.replace(/^.*#/, '');
	        // moves to a new page. 
	        // pageload is called at once. 
	        // hash don't contain "#", "?"
		 	$.historyLoad(hashstr);
		}
	);
	
	
	$("#custconsump").click(function(){
		$("#left_menu").find('li').removeClass('filtercurrent');
		common = function(){ 
			var restfiltertype = $("#restfiltertype").val();
			var hashstr = '';
			if(restfiltertype == '0'){
				//hash规则多个hash用_隔开 
				//第一个代表所在的menu 
				//第二个代表所在的页数
				//第三个代表所在的餐厅的id 
				//第四个代表菜所处的分类类别 0为不限
				//第五个表示搜索的关键词 为0表示搜索关键词为空
				hashstr = 'custconsump_1_'+restaurantid+'_0_0';
			}else{
				hashstr = 'custconsump_1_10_'+restaurantid+'_0_0_0_x_0_0_0_0_0';		
					       
			}
			hashstr = hashstr.replace(/^.*#/, '');
		    $.historyLoad(hashstr);
        }

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
							var restfiltertype = $("#restfiltertype").val();
							
							var hashstr = '';
							if(restfiltertype == '0'){
								//hash规则多个hash用_隔开 
								//第一个代表所在的menu 
								//第二个代表所在的页数
								//第三个代表所在的餐厅的id 
								//第四个代表菜所处的分类类别 0为不限
								//第五个表示搜索的关键词 为0表示搜索关键词为空
								hashstr = 'custconsump_1_'+restaurantid+'_0_0';
							}else{
								//hash规则多个hash用_隔开 
								//第一个代表所在的menu 
								//第二个代表所在的页数
								//第三个代表所在的页数尺寸
								//第四个代表所在的餐厅的id 
								//第五个代表排序类型, 如果为0表示为默认排序类型
								//第六个代表所在的食品类别  为0表示不限
								//第七个代表食品所属类别  为0表示不限
								//第八个代表价格区间 为x表示不限
								//第九个代表成菜类别  为0表示成菜类别不限
								//第十个表示做法类别 为0表示做法不限
								//第十一个表示口味类别  为0表示口味类别不限
								//第十二个表示原料类别  为0表示原料类别不限
								//第十三个表示搜索的关键词 为0表示搜索关键词为空
								hashstr = 'custconsump_1_10_'+restaurantid+'_0_0_0_x_0_0_0_0_0';		
							}
							hashstr = hashstr.replace(/^.*#/, '');
					        $.historyLoad(hashstr);
						}
					}
				}
    	);
        
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
							var hashstr = 'custconsump_1_10_'+restaurantid+'_0_0_0_x_0_0_0_0_0';		
					        hashstr = hashstr.replace(/^.*#/, '');
					        $.historyLoad(hashstr);
						}						
					}				
				});*/
	});
	
	
	$("#custfavorite").click(function(){
		$("#left_menu").find('li').removeClass('filtercurrent');
		//hash规则多个hash用_隔开 
		//第一个代表所在的menu 
		//第二个代表所在的页数
		//第三个代表所在的页数尺寸
		//第四个代表所在的餐厅的id 
		//第五个代表排序类型, 如果为0表示为默认排序类型
		//第六个代表所在的食品类别  为0表示不限
		//第七个代表食品所属类别  为0表示不限
		//第八个代表价格区间 为x表示不限
		//第九个代表成菜类别  为0表示成菜类别不限
		//第十个表示做法类别 为0表示做法不限
		//第十一个表示口味类别  为0表示口味类别不限
		//第十二个表示原料类别  为0表示原料类别不限
		//第十三个表示搜索的关键词 为0表示搜索关键词为空
		
		common = function(){
				var restfiltertype = $("#restfiltertype").val();
				
				var hashstr = '';
				if(restfiltertype == '0'){
					//hash规则多个hash用_隔开 
					//第一个代表所在的menu 
					//第二个代表所在的页数
					//第三个代表所在的餐厅的id 
					//第四个代表菜所处的分类类别 0为不限
					//第五个表示搜索的关键词 为0表示搜索关键词为空
					hashstr = 'custfavorite_1_'+restaurantid+'_0_0';
				}else{
					hashstr = 'custfavorite_1_10_'+restaurantid+'_0_0_0_x_0_0_0_0_0';		
				}
				hashstr = hashstr.replace(/^.*#/, '');
				$.historyLoad(hashstr);
        }
        
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
							var restfiltertype = $("#restfiltertype").val();
							
							var hashstr = '';
							if(restfiltertype == '0'){
								//hash规则多个hash用_隔开 
								//第一个代表所在的menu 
								//第二个代表所在的页数
								//第三个代表所在的餐厅的id 
								//第四个代表菜所处的分类类别 0为不限
								//第五个表示搜索的关键词 为0表示搜索关键词为空
								hashstr = 'custfavorite_1_'+restaurantid+'_0_0';
							}else{
								hashstr = 'custfavorite_1_10_'+restaurantid+'_0_0_0_x_0_0_0_0_0';		
					        
							}
							hashstr = hashstr.replace(/^.*#/, '');
					        $.historyLoad(hashstr);
						}
					}
				}
    	);
		
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
							var hashstr = 'custfavorite_1_10_'+restaurantid+'_0_0_0_x_0_0_0_0_0';		
					        hashstr = hashstr.replace(/^.*#/, '');
					        $.historyLoad(hashstr);
						}								
					}
				});*/
	});

	
	/**
	         * 点击所有食品菜单
	         */
	        clickMeanItem = function(menuitem){
	        	common = function(){	        		
	        		clickOrderfoodMeanItem(menuitem);
	        	}
	        	//当用户点击我吃过的美餐或者我的收藏, 首先判断用户是否登录
	        	if(menuitem == 'custconsump' || menuitem == 'custfavorite'){    		
	        		//判断是否登陆
	    			if(_loginid == ''){
	    				openIntologin();
	    				return;
	    			}    		
	        	}
	        	
	        	clickOrderfoodMeanItem(menuitem);
	        	
	        	
	        }
	

    clickOrderfoodMeanItem = function(menuitem){
					        	
	        	$("#tabs ul li").removeAttr("class");

	        	
	        	$("#"+menuitem).parent().attr("class", "current");
	        	
	        	
	        	clearInfo(menuitem);
	    		
	        	//清除餐厅搜索框里面的输入词
	        	$("#searchword").val("");
	        	
	    		//定义所在菜单
	    		$("#filterobject").val(menuitem);
	    		
	    		var filterobject = $("#filterobject").val();
	        	
	    		//得到页数
	    		var pageno = $("#pageno").val();
	    		
	    			
	    		//得到餐厅的id
	    		var restaurantid = $("#restaurantid").val();
	    			
	    		//得到排序类别
	    		var sorttype = $("#sorttype").val();
	    			
	    		//得到食品类别
	    		var foodtype = $("#foodtype").val();
	    		
	    			
	    		//得到食品所属类别
	    		var dishalcotype = $("#dishalcotype").val();
	    		
	    		//得到成菜类别
	    		var dishestype = $("#dishestype").val();
	    		
	    		//得到做法类别 
	    		var cookingtype = $("#cookingtype").val();
	    		
	    		//得到口味类别
	    		var tastetype = $("#tastetype").val();
	    		
	    		//得到原料类别
	    		var rawmaterialtype = $("#rawmaterialtype").val();
	    		
	    		//得到每页显示的条数
	    		var pageSize = $("#pageSize").val();
	    		
	    		var number = Math.random(); 
	    		
	    		$.ajax({type: "POST",   
	    			url: _context+"/orderfood.do?method=getWordSearch",
	    			dataType:"json",
	    			data : {pageSize:pageSize, pageno:pageno, restaurantid:restaurantid, 
	    			filterobject:filterobject, sorttype:sorttype, foodtype:foodtype, 
	    			dishalcotype:dishalcotype, dishestype:dishestype, cookingtype:cookingtype, 
	    			tastetype:tastetype, rawmaterialtype:rawmaterialtype, number:number},
	    			success: function(json)
	    			{ 
	    				var items = json.fooditems;
	    				if(items.length > 0){
	    				$("#orderitems").html("");
	    				$("#orderitems").html(getDiv(items));
	    				
	    				//更新食品信息内容
	    				updateFoodDescription(items);
	    				
	    				
	    				//更新是否显示特价标识
	    				for(var i=0; i<items.length; i++){
	    					if(items[i].specflag == 1){
	    						$("#specflag"+i).show();
	    					}else{
	    						$("#specflag"+i).hide();
	    					}
	    					
	    					
	    					if(items[i].unitflag == 0 || items[i].unitflag == '' || items[i].unitflag == null){								
	    							$("#unitflag"+i).text("");	
	    					}else{
	    							$("#unitflag"+i).text("./"+items[i].unitdesc);	
	    					}
	    					
	    				}
	    				
	    				//更新折扣率
	    				for(var i=0; i<items.length; i++){
	    					var html = '';
	    					if(items[i].specflag == 1){
	    					}else if(items[i].specflag == 0 && items[i].discountrate != 10){
	    						html += '['+items[i].discountrate+'折]';
	    						$("#pricearea"+i).append(html);
	    					}
	    				}
	    				
	    				//改变评论星级的内容
	    				updateStarComment(items);
	    				
	    				//对结果进行过滤, 是否显示套餐详情内容
	    				updateSetmealDetails(items);
	    				
	    				
	    				
	    				 //总的页数
	    				 $("#totalpage").val("");
	    				 $("#totalpage").val(json.totalpage);
	    				 
	    				 if(json.totalpage > 1){
	    				 	$("#pager").pager({ pagenumber: pageno, pagecount: json.totalpage, buttonClickCallback: PageClick});
	    				 }else{
	    				 	
	    				 	$("#pager").html('');
	    				 }
	    				 //显示排序, 每页数量栏
	    				 //$("#title_c").show();
	    				 
	    				}else{
	    					$("#pager").html("");
	    					$("#orderitems").html('  <div class="noticeSign "><h3> 很抱歉！暂无记录，请重新操作！</h3> </div>');
	    					//隐藏排序, 每页数量栏
	    					$("#title_c").show();
	    					
	    					$("#orderitems").show();
	    				}
	    			}});	
	        		
	    			
	        }
    

	var cookieset = {path: _context+'default.htm', domain:'cdian.cn'};
    var expires = {expires: -1, path: _context+'default.htm', domain:'cdian.cn'};
    
    
    
	//直接删除餐车中的一条记录
	delCartRecord = function(foodid, foodtype){
	
		$("#delrecdig").dialog({
			bgiframe: true,
			draggable: true,
			modal: true,
			buttons: {
				
				'取消': function() {
					$(this).dialog('close');
				},
				'确认': function() {					
					//更新cookie
					var cartlist = $.cookie("cartcookie");							
					var tempcartlist = new String(cartlist);
					    		
					var cartlistarray = tempcartlist.split("|");
					var newarray = new Array();
					var i=0;
					var j=0;
					while(i<cartlistarray.length){
					  	//寻找购餐车的本菜
					    if(!(foodid == cartlistarray[i] && foodtype == cartlistarray[i+1])){
					    	newarray[j] = 	cartlistarray[i];
					    	newarray[j+1] = cartlistarray[i+1];
					    	newarray[j+2] = cartlistarray[i+2];
					    	newarray[j+3] = cartlistarray[i+3];
					    	newarray[j+4] = cartlistarray[i+4];
					    	j+=5;
					    }
					    	i+=5;
					    }
						
						if(newarray.length > 0){
							var resultstr= newarray[0];
						    for(var j=1; j<newarray.length; j++){	    			
						    	resultstr += "|"+newarray[j] ;				    			
						    }
						    	cartlist = resultstr;
					    		$.cookie("cartcookie", cartlist, cookieset);
							}else{
								$.cookie("cartcookie", null, expires); 
						}
						
						$(this).dialog('destroy');
				}	
				
			}
			});
			$("#delrecdig").dialog('open');
		
	}
	
	//增加删除餐车中的数量, 从而可以放入餐车, action=0 表示增加 , 1 表示减少
    delAddCartQuantity = function(index, action , foodid, foodtype){

    	//取得餐车中的数量
    	var quantity = $("#cartquantiy"+index).val();
    	
    	//更新当前的数量
		if(action == 0){
			$("#cartquantiy"+index).val(parseInt(quantity)+1);
		}else{
			if(quantity >1){				
				$("#cartquantiy"+index).val(parseInt(quantity)-1);
			}
		}		
		//更新cookie
		var cartlist = $.cookie("cartcookie");			
    	var tempcartlist = new String(cartlist);    		
    	var cartlistarray = tempcartlist.split("|");
    	var i=0;
    	while(i<cartlistarray.length){
    			//寻找购餐车的本菜
    			if(foodid == cartlistarray[i] && foodtype == cartlistarray[i+1]){
    				
    				//更新当前的份数和金额
    				var oriquantity = cartlistarray[i+3];
    				var orimoney = cartlistarray[i+2];
    				
    				var moneyperquantity =formatFloat(formatFloat(orimoney, 2)/parseInt(oriquantity), 2);
    				
    				cartlistarray[i+3] = parseInt($("#cartquantiy"+index).val()); //得到新的份数    				
    				cartlistarray[i+2] = formatFloat(moneyperquantity*parseInt($("#cartquantiy"+index).val()), 2); //得到新的金额
    				
    				
    			}    			
    			i+=5;
    		}
			
			var resultstr= cartlistarray[0];
	    	for(var j=1; j<cartlistarray.length; j++){	    			
	    		resultstr += "|"+cartlistarray[j] ;
	    			
	    	}
	    	cartlist = resultstr;
    		$.cookie("cartcookie", cartlist, cookieset);
		
    }
    
    
    /**
     * 增加删除每条记录的数量,从而可以放入餐车  action=0 表示增加, 1表示减少
     */
    delAddQuantity = function(index, action){
    	
    		var quantity = $("#quantity"+index).val();
    		
    		//更新当前的数量
			if(action == 0){
				$("#quantity"+index).val(parseInt(quantity)+1);
			}else{
				if(quantity >1){				
					$("#quantity"+index).val(parseInt(quantity)-1);
				}
			}	
    }
		
	
	var diffrestwidth;
	 var diffrestheight;
		if($.browser.msie){
			diffrestwidth = 500;
			diffrestheight = 280;
		}else{
			diffrestwidth = 450;
			diffrestheight = 280;
		}
		
		/**
	     * 将食品加入到餐车
	     */
	    addToCart8 = function(foodid, foodtype, curprice, index, foodname, restid){
	    	
	    	var restaurid = $.cookie("restaurantid");
	    	var cartlist = $.cookie("cartcookie");
	    	if(restaurid != null && restaurid != restid && cartlist != '' && cartlist != null){ 
	    		
	    		$("#adddiffrest").dialog({
	    			bgiframe: true,
	    			draggable: true,
	    			modal: true,
	    			width:diffrestwidth,
	    			height:diffrestheight,
	    			buttons: {
	    				'取消': function() {
	    					$(this).dialog('close');
	    				},
	    				'确认': function() {	
	    					//如果用户添加了不同餐厅的菜，那么以前的选择结果都将被删除。
	    					$.cookie("cartcookie", null, expires);     					
	    					$(this).dialog('destroy');
	    					addToMyCart8(foodid, foodtype, curprice, index, foodname, restid);
	    				}	
	    			}
	    		});
	    		
				$("#adddiffrest").dialog('open');	
	    	}else{
	    		addToMyCart8(foodid, foodtype, curprice, index, foodname, restid);
	    	} 	
	    }
		
    /**
     * 将食品加入到餐车
     */
    addToCart = function(foodid, foodtype, curprice, index, foodname, restid){
    	
    	var restaurid = $.cookie("restaurantid");
    	var cartlist = $.cookie("cartcookie");
    	if(restaurid != null && restaurid != restid && cartlist != '' && cartlist != null){ 
    		
    		$("#adddiffrest").dialog({
    			bgiframe: true,
    			draggable: true,
    			modal: true,
    			width:diffrestwidth,
    			height:diffrestheight,
    			buttons: {
    				'取消': function() {
    					$(this).dialog('close');
    				},
    				'确认': function() {	
    					//如果用户添加了不同餐厅的菜，那么以前的选择结果都将被删除。
    					$.cookie("cartcookie", null, expires);     					
    					$(this).dialog('destroy');
    					addToMyCart(foodid, foodtype, curprice, index, foodname, restid);
    				}	
    			}
    		});
    		
			$("#adddiffrest").dialog('open');	
    	}else{
    		addToMyCart(foodid, foodtype, curprice, index, foodname, restid);
    	} 	
    }
    
    addToMyCart8 = function(foodid, foodtype, curprice, index, foodname, restid){
    	
    	//判断该食品的做法是否唯一，如果不唯一那么要让用户选择做法
		if(foodtype == '1'){
			$.ajax(
					{
						type: "POST",   
						url: _context+"/customerController-getCulinaryMethods.html",
						dataType:"json",
						cache:false,
						data:{maindishid:foodid},
						success: function(json){
						var culinarymethods = json.culinarymethods;
						if(culinarymethods.length > 0){
							var html='';
							for(var x=0; x<culinarymethods.length; x++){
								if(x == 0){
									html += ' <li><input type="radio" name="cookingStyle" checked/> <label style="font-size:14px;">'+culinarymethods[x].methodname+'</label></li>'	
								}else{
									html += ' <li><input type="radio" name="cookingStyle"/> <label style="font-size:14px;">'+culinarymethods[x].methodname+'</label></li>'	
								}
							}

							$("#selectculinarymethoddlg").dialog({
				    			bgiframe: true,
				    			draggable: true,
				    			modal: true,
				    			title:'请选择烹饪方法',
				    			open:function(event,ui){
									$('a.ui-dialog-titlebar-close').hide(); 
									$("#selectculinarymethoddlg").find('ul').html('');
									 $("#selectculinarymethoddlg").find('ul').html(html);
								},
				    			buttons: {
					    			'取消': function() {
										$(this).dialog('destroy');
										$('a.ui-dialog-titlebar-close').show(); 
									},
				    				
									'确认': function() {					    									
				    					
										$("#selectculinarymethoddlg").dialog('destroy');
				    					
				    					//选择烹饪方法
				    					var methodname = '';
				    					$('input[name="cookingStyle"]').each(function(){
				    						
				    						if($(this).attr("checked")){
				    							methodname = $(this).next().html();
				    						}
				    						
				    					});
				    					
				    					foodname = foodname+'('+methodname+')';
				    					adddishaction8(foodid, foodtype, curprice, index, foodname, restid);
				    					$('a.ui-dialog-titlebar-close').show(); 
				    				}	
				    			}
				    		});
							$("#selectculinarymethoddlg").dialog('open');
							
						}else{
							
							adddishaction8(foodid, foodtype, curprice, index, foodname, restid);
						}
					
					}});
			
			
		}else{			
			adddishaction8(foodid, foodtype, curprice, index, foodname, restid);
		}
    }
    
    
    adddishaction8 =  function(foodid, foodtype, curprice, index, foodname, restid){
    	
    	//取得食品份数 
    	
    	//var quantity = $("#quantity"+index).val();
    	
    	//设定数量为1
    	var quantity = "1";
    	if($.cookie("cartcookie") == null){
    		var newcurprice =formatFloat(formatFloat(curprice,2)*parseInt(quantity), 2);
    		//存的顺序是食品号|食品类别|当前价格|数量|食品名称
    		var cartlist = foodid+"|"+foodtype+"|"+newcurprice+"|"+quantity+"|"+foodname;    		
    		$.cookie("cartcookie", cartlist, cookieset); 
    		$.cookie("restaurantid", restid, cookieset);
    	}else{
    		var cartlist = $.cookie("cartcookie");    		
    		var tempcartlist = new String(cartlist);    		
    		var cartlistarray = tempcartlist.split("|");    		
    		var isretryadd = false;
    		var i=0;
    		while(i<cartlistarray.length){
    			//判断是否添加已经在购餐车的菜
    			if(foodid == cartlistarray[i]){
    				
    				//更新当前的份数和金额
    				var oriquantity = cartlistarray[i+3];  //原来的份数	
    				var orimoney = cartlistarray[i+2];
    				cartlistarray[i+3] = parseInt(oriquantity) + parseInt(quantity); //得到新的份数    	
    				cartlistarray[i+2] = formatFloat(formatFloat(orimoney,2)+(formatFloat(curprice, 2)*quantity), 2); //得到新的金额
    				isretryadd  = true;
    			}
    			
    			i+=5;
    		}
    		
    		if(isretryadd == true){
	    		
    			var resultstr= cartlistarray[0];
	    		for(var j=1; j<cartlistarray.length; j++){	    			
	    			resultstr += "|"+cartlistarray[j] ;	    			
	    		}
	    		cartlist = resultstr;
    		}
    		//表示添加新的食品
    		if(isretryadd == false){   			
    			//将新的食品放到字符串的末尾
    			var newcurprice = formatFloat(formatFloat(curprice,2)*parseInt(quantity), 2);    			
    			var addedstr = "|"+foodid+"|"+foodtype+"|"+newcurprice+"|"+quantity+"|"+foodname;    			
    			cartlist += addedstr;  			
    		}
    		$.cookie("cartcookie", cartlist, cookieset);
    	}
    }
    
    addToMyCart=function(foodid, foodtype, curprice, index, foodname, restid){
    	
    	//取得食品份数 
    	
    	//var quantity = $("#quantity"+index).val();
    	
    	//设定数量为1
    	var quantity = "1";
    	if($.cookie("cartcookie") == null){
    		
    		var newcurprice =formatFloat(formatFloat(curprice,2)*parseInt(quantity), 2);
    		//存的顺序是食品号|食品类别|当前价格|数量|食品名称
    		var cartlist = foodid+"|"+foodtype+"|"+newcurprice+"|"+quantity+"|"+foodname;
    		
    		$.cookie("cartcookie", cartlist, cookieset); 
    		$.cookie("restaurantid", restid, cookieset);
    	}else{
    		var cartlist = $.cookie("cartcookie");
    		
    		var tempcartlist = new String(cartlist);
    		
    		var cartlistarray = tempcartlist.split("|");
    		
    		var isretryadd = false;
    		var i=0;
    		while(i<cartlistarray.length){
    			//判断是否添加已经在购餐车的菜
    			if(foodid == cartlistarray[i]){
    				
    				//更新当前的份数和金额
    				var oriquantity = cartlistarray[i+3];  //原来的份数	
    				var orimoney = cartlistarray[i+2];
    				cartlistarray[i+3] = parseInt(oriquantity) + parseInt(quantity); //得到新的份数    	
    				cartlistarray[i+2] = formatFloat(formatFloat(orimoney,2)+(formatFloat(curprice, 2)*quantity), 2); //得到新的金额
    				isretryadd  = true;
    			}
    			
    			i+=5;
    		}
    		
    		if(isretryadd == true){
	    		
    			var resultstr= cartlistarray[0];
	    		for(var j=1; j<cartlistarray.length; j++){	    			
	    			resultstr += "|"+cartlistarray[j] ;	    			
	    		}
	    		cartlist = resultstr;
    		}
    		//表示添加新的食品
    		if(isretryadd == false){   			
    			//将新的食品放到字符串的末尾
    			var newcurprice = formatFloat(formatFloat(curprice,2)*parseInt(quantity), 2);    			
    			var addedstr = "|"+foodid+"|"+foodtype+"|"+newcurprice+"|"+quantity+"|"+foodname;    			
    			cartlist += addedstr;  			
    		}
    		$.cookie("cartcookie", cartlist, cookieset);
    	}
    }
     //对cookie用定时器刷新， 每秒刷新 
   	var MyInterval=setInterval("showcartdata()", 1000);
    
   	var cartpagesize = 1;
   	
    //显示数据, 为了做多窗口同步， 用定时器刷新
	showcartdata = function(){
		
		var cartlist = $.cookie("cartcookie");
		if(cartlist != '' && cartlist != null){
			//将美食列表加到餐车中间去
			//$("div#cart_list ul").html("");
			
			$("div#cart_list ul").html(getCartDiv(cartlist, cartpagesize));
			/*var html = '';
			for(var i=0; i<5; i++){
				html += '<span>adfadf</span>';
				
			}
			$("div#cart_list ul").html(html);*/
			
			
			//更新总金额和总份数
			$("#totalnums").text("");
			$("#totalnums").text(getCartTotalnums(cartlist));
			
			$("#totalmoney").text("");
			$("#totalmoney").text(getCartTotalPrice(cartlist));
		}else{
			//如果cookie的值为空,那么清除所有的值
			$("div#cart_list ul").html("");
			//更新总金额和总份数
			$("#totalnums").text("0");
			$("#totalmoney").text("0");
		}
	}
    
	
	//var MyInterval=setTimeout(showcartdata, 1000);
	
    //得到餐车总的金额
    getCartTotalPrice = function(cartlist){
    	var totalmoney = 0.0;    	
    	var tempcartlist = new String(cartlist);   		
    	var cartlistarray = tempcartlist.split("|");
    	var i=2;	
    	while(i < cartlistarray.length){    	
    		totalmoney += formatFloat(cartlistarray[i], 2);
    		i+=5;
    	}
    	totalmoney = formatFloat(totalmoney, 2);
    	
    	return totalmoney;
    }
    
    //得到餐车总的份数 
    getCartTotalnums = function(cartlist){
    	var totalnums = 0;
    	var tempcartlist = new String(cartlist);   		
    	var cartlistarray = tempcartlist.split("|");
    	var i=3;	
    	while(i < cartlistarray.length){    	
    		totalnums += parseInt(cartlistarray[i]);
    		i+=5;
    	}
    	return totalnums;
    }
    
    //将美食加入收藏
    colFavoriteFood = function(foodid, foodtype, restaurantid){
    	common = function(){	
			ajaxColFavoriteFood(foodid, foodtype, restaurantid);
		};
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
							ajaxColFavoriteFood(foodid, foodtype, restaurantid);
						}
					}
				}
    	);
    }
    
    
    ajaxColFavoriteFood = function(foodid, foodtype, restaurantid){
    	$.ajax({
    		type: "POST",   
			url: _context+"/orderfood.do?method=fooddetailAddToFavorite",
			dataType:"json",
			data : {foodid:foodid, foodtype:foodtype, restaurantid:restaurantid},
			success: function(json)
			{ 
				
				//更新消费次数
				$("#fooddetail_consumpcounts").html(json.consumpcounts);
						
				//更新消费排名
				$("#fooddetail_consumprk").html(json.consumprk);
						
				//更新评论次数
				$("#fooddetail_commcounts").html(json.commcounts);
						
				//更新评论排名
				$("#fooddetail_commrk").html(json.commrk);
						
				//更新收藏次数
				$("#fooddetail_colcounts").html(json.colcounts);
						
				//更新收藏排名
				$("#fooddetail_colrk").html(json.colrk);
						
				//更新热门指数
				$("#fooddetail_hotrk").html(json.hotrk);
				
				var hotrk = json.hotrk;
				$("#hotrkpercent").css("width", hotrk*300/100);
				
				bsuccess = json.bsuccess;
				if(bsuccess == true){
					$("#colfoodsuccessdig").dialog('open');
				}else{
					$("#colfoodfaileddig").dialog('open');
				}
			}});	
		}
	
		
    //得到餐车的每列
    getCartDiv=function(cartlist, cartpagesize){

    	var tempcartlist = new String(cartlist);
    		
    	var cartlistarray = tempcartlist.split("|");
		
    	var totalpagesize = parseInt(parseInt(cartlistarray.length + 45 -1)/parseInt(45));
    	if(cartpagesize > totalpagesize) {
    		
    		cartpagesize = totalpagesize;
    	}
    	var html = '';
    	
    	var i=(cartpagesize-1)*45;

    	var pagelength = parseInt(cartpagesize)*45;
    	
    	

    	while(i<cartlistarray.length && i < pagelength){
			

	    	
	    	html += '<li><span style="margin-left:2px;margin-right:7px;padding-top:1px;float:left;"><img src="'+_context+'/images/orderfood/lite_10.jpg" width="11" height="11" /></span>'+
				'<span class="food_name">'+cartlistarray[i+4]+'</span>'+
              	'<div class="suokuai"><span class="decrease" onclick="javascript:delAddCartQuantity('+i+', 1, '+cartlistarray[i]+', '+cartlistarray[i+1]+')"><img src="'+_context+'/images/orderfood/yjian.jpg"/></span>'+
                '<div style="position:relative;top:-1px !important;"><input id="cartquantiy'+i+'" value="'+cartlistarray[i+3]+'"/></div>'+
               	'<span class="increase" onclick="javascript:delAddCartQuantity('+i+', 0, '+cartlistarray[i]+', '+cartlistarray[i+1]+')"><img src="'+_context+'/images/orderfood/yjia.jpg"/>&nbsp;&nbsp;</span></div>'+
              	'<span style="float:left;">'+cartlistarray[i+2]+'元</span ><span class="delete"><a href="javascript:delCartRecord('+cartlistarray[i]+', '+cartlistarray[i+1]+')">删除</a></span></li>';
    		
    		i+=5;
    	}
    	
    	if(totalpagesize > 1){    

    		if(cartpagesize >1 && cartpagesize < totalpagesize){
    			html+= '<li style="text-align:center;"><span><a href="javascript:prevPage();">上一页</a></span><span style="margin-left:10px;"><a href="javascript:cartNextPage();">下一页</a></span></li>';
    		}else if(cartpagesize == totalpagesize ){
    			html+= '<li style="text-align:center;"><span><a href="javascript:prevPage();">上一页</a></span><span style="margin-left:10px;color:gray;">下一页</span></li>';
    		}else{
    			html+= '<li style="text-align:center;"><span style="color:gray;">上一页</a></span><span style="margin-left:10px;"><a href="javascript:cartNextPage();">下一页</a></span></li>';
    		}	
    	}
    	
    	jQuery.trim(html);
    	return html;
    }
     cartNextPage = function(){
     	cartpagesize++;
     }
     
     prevPage =function(){
     	cartpagesize--;
     }
     
	getDiv=function(items){
		var html='';		
		var xmlDom = getModelObject();
		var itemsObj = xmlGetElementsByName(xmlDom, "item", "orderfooditem");
		var keys = getModelKeys(itemsObj[0]);
		var modelValue = jQuery.trim(getModelValue(itemsObj[0]));
		  		
		for(var i=0; i<items.length; i++){
		  		var item = modelValue;
		  		item=modelReplace(item,keys,[items[i].name,items[i].intro,_context,items[i].price,items[i].curprice,items[i].foodid,items[i].foodtype, i, $("#restaurantid").val(), $("#restaurantname").val(), items[i].colcounts, items[i].consumpcounts, items[i].picpath]);
		 		html+=item;		  
		   }		   
		   return html;		 
	}
	
	$("#ajaxsuggest").ajaxStart(function(){   
	$(this).show(); 
	});
	
	$("#ajaxsuggest").ajaxStop(function(){   
	$(this).hide(); 
	});
	
	//第一次进页面的时候通过标识将分页信息显示出来
	if(load == 'true'){
		var totalpage = $("#totalpage").val();
		var pageno = $("#pageno").val();
		if(totalpage > 1){		
			$("#pager").pager({ pagenumber: pageno, pagecount: totalpage, buttonClickCallback: PageClick});	
		}
	}
	
	
	//移动到主食上面
	moveovermainfood = function(obj){
		$(obj).parent().find('li').each(function(){
			$(this).find('div:eq(0)').hide();
		});
	}
	
	//移动到小吃或者套餐上面
	moveoversetmealsotherfood = function(obj){
		$(obj).parent().find('li').each(function(){
			$(this).find('div:eq(0)').hide();
		});
	}
	
			
	function stopEvent(ev){
	var evt = window.event ? window.event : ev;
	if(window.event){
		evt.cancelBubble = true; 
	}else{
		evt.stopPropagation(); 
	}
}

   $(document).mouseover(function(){
   	
   		$(".left_menu_inner").find('.navChild').hide();		
   });
   
   
   //移到菜的过滤信息上面, 显示菜的字列表
	moveoverfilterfood = function(ev, obj){
		//$(obj).removeClass("filtercurrent");
		
		$(obj).parent().find('li').each(function(){
			$(this).find('div:eq(0)').hide();
		});
		
		var childs = 0;
		$(obj).find('a').each(function(){
		
			childs += 1;
		});
		
		
		if(childs == 1){
			$(obj).find('.navChild').hide();
			return;
		}
		
		$(obj).find('div:eq(0)').show();
		$(obj).find('div:eq(2)').show();
		
		
		stopEvent(ev);
	}
	
	//从子的菜的类别上面移出
	moveoutfilterfood = function(obj){
		$(obj).prev().removeClass();
		$(obj).hide();
	}
	
	//移动评论上面去, 显示评论的详细信息
	/*mouseoverComment = function(foodid, foodtype, index){

		$.ajax({type: "POST",   
			url: _context+"/foodrestsearch.do?method=getCommentDetails",
			dataType:"json",
			data : {foodid:foodid, foodtype:foodtype},
			success: function(json)
			{ 		
			  	//得到口味
				var foodtaste = json.foodtaste;
				
				//得到颜色
				var foodcolor = json.foodcolor;
			
				//得到香味
				var foodscent = json.foodscent;
			
				//得到总评
				var foodoverall = json.foodoverall
			
				//得到推荐指数
				var recommendedindex = json.recommendedindex
			
				//得到参与评论人数
				var totalcnt = json.totalcnt;
				
				$("#evalate_comment"+index).html("");
				$("#evalate_comment"+index).html(foodStarComment(foodtaste, foodcolor, foodscent, foodoverall, recommendedindex, totalcnt));
			} });
	}*/
	
});