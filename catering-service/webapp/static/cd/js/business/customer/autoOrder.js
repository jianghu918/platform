/**
 * 自动配餐
 * Author:Mr.CT
 * CopyRight(C) xinyi
 * Version 1.0
*/

var isShowTips = false;		//是否已显示提示 只显示一次
var autoOrderPage = null;
//函数：获取屏幕尺寸
function findDimensions(){
	var winWidth = 0;
	var winHeight = 0;
    //获取窗口宽度
    if (window.innerWidth)
    	winWidth = window.innerWidth;
    else if ((document.body) && (document.body.clientWidth))
    	winWidth = document.body.clientWidth;
    //获取窗口高度
    if (window.innerHeight)
    	winHeight = window.innerHeight;
    else if ((document.body) && (document.body.clientHeight))
    	winHeight = document.body.clientHeight;
    //通过深入Document内部对body进行检测，获取窗口大小
    if (document.documentElement  && document.documentElement.clientHeight && document.documentElement.clientWidth){
    	winHeight = document.documentElement.clientHeight;
    	winWidth = document.documentElement.clientWidth;
    }
    return {width:winWidth,height:winHeight};
}




//窗口改变大小
function winResize(){
	var w = findDimensions();
	//$("#rightLayout").css({width:w.width - $("#leftLayout").width() - 2 + "px"});
}

initloginstatus = function(){
	
	//改变主menu所处位置
	$("#header").find('li').removeClass('current');
	
	$("#header").find('li:eq(1)').addClass('current');
	
	$("#navigation").find('li').removeClass('current');
	$("#navigation").find('li:eq(3)').addClass('current');
	$.ajax(
			{
				type: "POST",   
				url: _context+"/custcentercontroller-valRestMember.html",
				dataType:"json",
				data : {customerid:_loginid, restaurantid:restaurantid},
				success: function(json){
					var existed = json.existed;
					if(existed == 'true'){
						$("#liapplymember").hide();	
					}
				}
			});
}

hideSuggesttips = function(){
	$("#tips-box").hide();	
}

$(function(){
	showWaitingMsg(true);
	//初始化复选框状态
	initCheckboxStatus();
	//初始化系统UI事件
	initSystemUIEvent();
	//初始化缓存
	sysCache();
	
	//菜详细页
	$("img[name='foodImg'],.foodTitle").click(function(){
		var foodIdObj = $(this).parent().find("input[name='foodId']").val();
		var ridObj = $("input[name='rid']").val();
		if(restaurantfiltertype == '0'){
			openFoodDetailinfo2(1, foodIdObj, ridObj, '');
		}else{
			openFoodDetailinfo(1, foodIdObj, ridObj, '');
		}
	});
});
var cookieset = {path: _context+'default.htm', domain:'cdian.cn'};
var expires = {expires: -1, path: _context+'default.htm', domain:'cdian.cn'};


/**
 * 初始化系UI事件
 */
function initSystemUIEvent(){
	/*if(document.all){

		$(".aricleLayout").animate({"height":"-=" + ($("#restaurantMenu").offset().top + $("#restaurantMenu").height() + 55) + "px"},1);

	}else{
		//$(".aricleLayout").animate({"height":"-=" + ($("#restaurantMenu").offset().top + $("#restaurantMenu").height() + 110) + "px"},1);
	}*/
	
	$(".cbtn").bind("mousedown",function(){
		$(this).css({"background-image":"url(" + cacheImages[2].src + ")"});
	});
	$(".cbtn").bind("mouseup",function(){
		$(this).css({"background-image":"url(images/customer/silder-btnbg.gif)"});
	});
	//初始化对话框
	var initDialog = function(){
		$('input[name="btnAllPutCart"]').click(function() {
			
			var diffrestwidth;
			 var diffrestheight;
				if($.browser.msie){
					diffrestwidth = 500;
					diffrestheight = 280;
				}else{
					diffrestwidth = 450;
					diffrestheight = 280;
				}
			
			
			var suItems = autoOrderPage.getCurpage().suItems;
			var hunItems = autoOrderPage.getCurpage().hunItems;
			
			
			var restid = $('input[name="rid"]').val();
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
	    					
	    					for(var i=0; i<suItems.length; i++){				
	    						var foodid = suItems[i].id;
	    						var foodname = suItems[i].name;
	    						var curprice = suItems[i].curprice;
	    						var restid = $('input[name="rid"]').val();
	    						var foodtype = 1;
	    						addToMyCart(foodid, foodtype, curprice, '', foodname, restid);
	    					}
	    					
	    					for(var i=0; i<hunItems.length; i++){
	    						
	    						var foodid = hunItems[i].id;
	    						var foodname = hunItems[i].name;
	    						var curprice = hunItems[i].curprice;	    						
	    						var foodtype = 1;	    						
	    						addToMyCart(foodid, foodtype, curprice, '', foodname, restid);
	    					}
	    				}	
	    			}
	    		});
	    		
				$("#adddiffrest").dialog('open');	
	    	}else{
	    		
	    		for(var i=0; i<suItems.length; i++){				
					var foodid = suItems[i].id;
					var foodname = suItems[i].name;
					var curprice = suItems[i].curprice;
					var restid = $('input[name="rid"]').val();
					var foodtype = 1;
					addToCart(foodid, foodtype, curprice, '', foodname, restid);
				}
				
				for(var i=0; i<hunItems.length; i++){
					
					var foodid = hunItems[i].id;
					var foodname = hunItems[i].name;
					var curprice = hunItems[i].curprice;					
					var foodtype = 1;
					addToCart(foodid, foodtype, curprice, '', foodname, restid);
				}
	    	} 	
			
	    	
	    	
			
			$("#tips-box").html('全部成功加入菜单');
			$("#tips-box").show();
		
			window.setTimeout(hideSuggesttips,2000);
			/* $.blockUI({
            	message:$('#question'),
            	theme:true,
            	css : {"width":"600px!important"},
            	draggable: true,
            	title : "加入菜单"
            }); */
        }); 
 
        $('.dialogControl img').eq(0).click(function() { 
        }); 
        $('.dialogControl img').eq(1).click(function() { 
            $.unblockUI(); 
            return false; 
        }); 
	};initDialog();
	
	$(".btnCenter .bup img").hover(function(){
		if(autoOrderPage != null && autoOrderPage.hasNext()){
			$(this).attr("src",cacheImages[0].src);
			$(this).css("cursor","pointer");
		}else{
			$(this).css("cursor","default");
		}
	},function(){
		$(this).attr("src","images/customer/up-off.gif");
		$(this).css("cursor","default");
	});
	
	$(".btnCenter .bdown img").hover(function(){
		if(autoOrderPage != null && autoOrderPage.hasPrev()){
			$(this).attr("src",cacheImages[1].src);
			$(this).css("cursor","pointer");
		}else{
			$(this).css("cursor","default");
		}
	},function(){
		$(this).attr("src","images/customer/down-off.gif");
		$(this).css("cursor","default");
	});
	
	$(".selectBar").hover(function(){
		if($(this).css("background-image").indexOf("-click") == -1){
			if($(this).hasClass("t0")){
				$(this).css({"background-image":"url(images/customer/selectBg-over2.gif)"});
			}else{
				$(this).css({"background-image":"url(images/customer/selectBg-over.gif)"});
			}
		}
	},function(){
		if($(this).css("background-image").indexOf("-click") == -1){
			if($(this).hasClass("t0")){
				$(this).css({"background-image":"url(images/customer/selectBg2.gif)"});
			}else{
				$(this).css({"background-image":"url(images/customer/selectBg.gif)"});
			}
		}
	});
	
	$(".selectBar").click(function(){
		if($(this).hasClass("t0")){
			$("input[name='currentSelectType']").val("0");
		}else if($(this).hasClass("t1")){
			$("input[name='currentSelectType']").val("1");
		}else{
			$("input[name='currentSelectType']").val("2");
		}
		if($(this).css("background-image").indexOf("-click") != -1){
			$(this).css({"background-image":"url(images/customer/selectBg.gif)"});
			$(this).css("color","#4F5569");
			$(this).find(".selectItems").slideUp(100,function(){
				$(".selectBar:eq(2)").css({"visibility":"visible"});
			});
		}else if($(this).css("background-image").indexOf("-disabled") != -1){
		
			$(".selectBar").not($(this)).addClass("disabled");
			if($(".selectBar").not($(this)).hasClass(".t0")){
				$(".t0").removeClass("disabled");
				$(".t0").addClass("disabledt0");
			}
			$(".selectBar").not($(this)).find(".selectItems").slideUp(100);
			$(this).removeClass("disabled"); 
			$(this).removeClass("disabledt0");
			$(".selectBar").not($(this)).css("color","#ccc");
			$(this).css("color","#4F5569");
			$(".selectBar:eq(2)").css({"visibility":"visible"});
			sides($("#btnSides")[0],$("input[name='rid']").val(),true);
		}else if($(this).find(".selectItems").size() != 0){
			//$(".selectBar").not($(this)).css({"background-image":"url(images/customer/selectBg.gif)"});
			$(this).css({"background-image":"url(" + cacheImages[5].src +")","color":"#fff"});
			$(".selectBar").not($(this)).find(".selectItems").slideUp(100);
			$(".selectBar").not($(this)).css("color","#ccc");
			$(this).find(".selectItems").slideDown(100);
			if($(this).find("input[name='hotUL']").size() > 0){
				$(".selectBar:eq(2)").css({"visibility":"hidden"});
			}
		}
	});
	
	$(".selectBar .selectItems label").hover(function(){
		$(this).css("color","#000");
	},function(){
		$(this).css("color","#4F5569");
	});
	$(".selectBar .selectItems input").click(function(ev){
		var txt = $(this).parent().find("input:checked").next("label").html();
		$(this).parent().prevAll(".selectBarText").html(txt);
		$(this).parent().slideUp(100);
		$(".selectBar").not($(this)).css("color","#ccc");
		$(this).parent().parent().css({"background-image":"url(images/customer/selectBg.gif)","color":"#4F5569"});
		$(".selectBar:eq(2)").css({"visibility":"visible"});
		cancelEvent(ev);
		sides($("#btnSides")[0],$("input[name='rid']").val(),true);
	});
	
	$(".selectBar").click(function(ev){
		cancelEvent(ev);
	});
	
	$(document).click(function(){
		$(".selectItems:visible").parent().css({"background-image":"url(images/customer/selectBg.gif)","color":"#4F5569"});
		$(".selectBar:eq(2)").css({"visibility":"visible"});
		$(".selectItems:visible").slideUp(100);
	});
		
	//window resite change div
	$(window).bind("resize",function(){
		if(typeof(resizeTimer) != 'undefined' && resizeTimer != null)clearTimeout(resizeTimer);
		resizeTimer = setTimeout(winResize,100);
	});
	
	$(".btnCenter .bup img").mousedown(function(){
		if(autoOrderPage != null && autoOrderPage.hasNext()){
			$(this).attr("src","images/customer/up-click.gif")
		}
	});
	
	$(".btnCenter .bdown img").mousedown(function(){
		if(autoOrderPage != null && autoOrderPage.hasPrev()){
			$(this).attr("src","images/customer/down-click.gif")
		}
	});
	
	$(".btnCenter .bdown img").click(function(){
		
		if(autoOrderPage != null && autoOrderPage.hasPrev()){
			autoOrderPage.prev();
			showItems();
		}
		
		//prevPage();
		if(autoOrderPage != null && autoOrderPage.hasPrev()){
			$(this).attr("src","images/customer/down-on.gif");
			$(this).css("cursor","pointer");
		}else{
			$(this).attr("src","images/customer/down-off.gif");
			$(this).css("cursor","default");
		}
	});
	$(".btnCenter .bup img").click(function(){
		nextpage();
		if(autoOrderPage != null && autoOrderPage.hasNext()){
			$(this).attr("src","images/customer/up-on.gif");
			$(this).css("cursor","pointer");
		}else{
			$(this).attr("src","images/customer/up-off.gif");
			$(this).css("cursor","default");
		}
	});
}

/**
 * 缓存系统图片
 * @type 
 */
var cacheImages = [];
function sysCache(){
	var cacheImgUrls = [];
	cacheImgUrls[cacheImgUrls.length] = "images/customer/up-on.gif";
	cacheImgUrls[cacheImgUrls.length] = "images/customer/down-on.gif";
	cacheImgUrls[cacheImgUrls.length] = "images/customer/silder-btnbg2.gif";
	//cacheImgUrls[cacheImgUrls.length] = "images/customer/close-on.png";
	cacheImgUrls[cacheImgUrls.length] = "images/customer/delete1.png";
	cacheImgUrls[cacheImgUrls.length] = "images/customer/ggbtn-over.gif";
	cacheImgUrls[cacheImgUrls.length] = "images/customer/selectBg-click.gif";
	//cacheImgUrls[cacheImgUrls.length] = "images/customer/add-cart2.gif";
	cacheImgUrls[cacheImgUrls.length] = "images/customer/add_in_mymenu2.png";
	
	for(var i = 0 ; i < cacheImgUrls.length ; i++){
		cacheImages[i] = new Image();
		cacheImages[i].src = cacheImgUrls[i];
	}
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
//			$(targetClassName).removeShadow();
			if(++waitEnd == $(targetClassName).size()){	//the last item 
				//rotateImage("item",30);
				//$(targetClassName).dropShadow();
			}
		});
	});
}

//get current Item's index.
function getItemIndex(itemObj){
	var prevItems = itemObj.prevAll(".item:visible");
	return prevItems.size() == 0 ? 0 : prevItems.size() - 1;
}

//init system
function initSys(){
	
	//set the div fit the window size.
	winResize();
	
	//create item in the layout
//	for(var i = 0 ; i < 1 ; i++){
//		$(".round").append(createItem("images/foods/" + (i % 4 + 1) + ".jpg","地道小吃",
//								parseInt(Math.random() * 30 + 24),
//								parseInt(Math.random() * 25),1,1)
//						   );
//	}
	//item set a half of opacity in the begining
	$(".item,.itemModel").css({"opacity" : 0.1});
	
	// mouseover or mouseout to the item handle
	$("#rightLayout .round .item,.itemModel").hover(function(){
		$(this).css({"-moz-box-shadow":"3px 5px 15px #A7A0DC"});
		$(this).find(".closeItem img").eq(0).attr("src",cacheImages[6].src);
		$(this).find(".closeItem img").eq(1).attr("src",cacheImages[3].src);
	},function(){
		$(this).css({"-moz-box-shadow":"0px 1px 2px #333"});
		//$(this).find(".closeItem img").eq(0).attr("src","images/customer/add-cart-off.gif");
		//$(this).find(".closeItem img").eq(1).attr("src","images/customer/close-off.png");
		$(this).find(".closeItem img").eq(0).attr("src","images/customer/add_in_mymenu.png");
		$(this).find(".closeItem img").eq(1).attr("src","images/customer/delete.png");
	});
	
	//close item img click handle.
	$("#rightLayout .round .item .closeItem img,.itemModel .closeItem img").click(function(){
		//if($(this).attr("src").indexOf("cart") != -1){
		if($(this).attr("src").indexOf("mymenu") != -1){	
			var foodid = $(this).parent().find('input[name="foodId"]').val();
			var restid = $('input[name="rid"]').val();
			var curprice = $(this).parent().find('input[name="realmoney"]').val();
			var foodname = $(this).parent().parent().find('.foodTitle').html();
			addToCart8(foodid, 1, curprice, '', foodname, restid);
			$(this).parent().parent().parent().parent().humanMsg('成功加入菜单');
			//$("#tips-box").html('成功加入菜单<strong>  ! !</strong>');
			//$("#tips-box").show();
			window.setTimeout(hideSuggesttips,2000);
		}else{
			var isLeft = parseInt(Math.random() * 1000) % 9 > 4 ? true : false;
			var meatflag = $(this).parent().find("input[name='meetflag']").val();
			var foodid = $(this).parent().find("input[name='foodId']").val();
			var newFoodItem = getNewFoodItem(meatflag,
					foodid,$(this).parent().find("input[name='realmoney']").val());
			
			if(newFoodItem != null){
				replaceItem(newFoodItem,foodid,autoOrderPage.getCurpage(),meatflag);
			}else{
				$(this).parent().parent().parent().parent().humanMsg('没有适合的菜更换');
				return;
			}
			
			
			$(this).parent().parent().parent().parent().animate({left:isLeft ? "-=1500" : "+=1500"},800,function(){
				
				var nextItem = createItem(newFoodItem.picpath ,newFoodItem.name,
										newFoodItem.price,
										newFoodItem.curprice,newFoodItem.id,newFoodItem.meetflag,newFoodItem.unitflag);
				$(this).before(nextItem);
				nextItem.css({left:$(this).offset().left,top:$(this).offset().top,visibility:"visible"});
					nextItem.animate({"left":"0px","top":"0px",opacity:1},800,function(){
						fillPageInfo(autoOrderPage.getCurpage(),sumFoodsMoney(autoOrderPage.getCurpage()));
				});
				$(this).remove();
			});
		}
	});
	
	$("#meatDiet-slider-bg").mouseover(function(){
		if(!isShowTips){
			$(".oneTips").css({opacity:0});
			isShowTips = true;
			$(".oneTips").show().animate({opacity:1},200,function(){
				setTimeout(function(){
					$(".oneTips").animate({opacity:0},2000,function(){
						$(".oneTips").hide();
					});
				},2000);
			});
			
		}
	});
	
	sides($("#btnSides")[0],$("input[name='rid']").val());
}

/**
 * 统计每页食品金额
 * @param {} items
 * @return {}
 */
function sumFoodsMoney(items){
	try{
		var count = 0;
		for(var i = 0 ; i < items.suItems.length ; i++){
			count += items.suItems[i].curprice;
		}
		for(var i = 0 ; i < items.hunItems.length ; i++){
			count += items.hunItems[i].curprice;
		}
		return count;
	}catch(e){
	}
	return 0;
}
/**
 * 获取新食品
 */
function getNewFoodItem(meatflag,foodId,foodMoney){
	var isHunFoods = parseInt(meatflag) == 1 ? true: false; 
	var targetAry;
	var rndItems;
	if(isHunFoods){
		targetAry = autoOrderSilde.allHunFoods;
		rndItems = autoOrderSilde.rndHunFoods;
	}else{
		targetAry = autoOrderSilde.allSuFoods;
		rndItems = autoOrderSilde.rndSuFoods;
	}
	var items = autoOrderPage.getCurpage();
	
	var moneyCount = 0;
	for(var i = 0 ; i < items.hunItems.length ; i++){
		moneyCount += items.hunItems[i].curprice;
	}
	for(var i = 0 ; i < items.suItems.length ; i++){
		moneyCount += items.suItems[i].curprice;
	}
	
	moneyCount -= foodMoney;
	var lastMoney = autoOrderSilde.maxMoney - moneyCount;
	var hunIds = $.map(items.hunItems, function(n){return n.id;}); 
	var suIds = $.map(items.suItems, function(n){return n.id;}); 
	
	var existItems = "," + hunIds.join(",") + "," + suIds.join(",") + ",";
	var noFound = true;
	do{
		for(var i = 0 ; i < targetAry.length ; i ++){
			var rndExistItems = "," + rndItems.join(",") + ",";
			var myItem = targetAry[i];
			var result = existItems.indexOf("," + myItem.id + ",") == -1 && rndExistItems.indexOf("," + myItem.id + ",") == -1 && myItem.id != foodId;
			if(autoOrderSilde.isPriceLimit){
				result = result && myItem.curprice <= lastMoney && moneyCount + myItem.curprice >= autoOrderSilde.minMoney;
			}
			if(result){
				rndItems[rndItems.length] = myItem.id;
				return myItem;
			}
		}
		noFound = rndItems.length == 0;//当没有一次换菜成功，即退出循环
		
		rndItems = [];
		if(isHunFoods){
			autoOrderSilde.rndHunFoods = [];
		}else{
			autoOrderSilde.rndSuFoods = [];
		}
	}while(!noFound);
	return null;
}


/**
 * 替换页面中的菜
 * @param {} targetItem
 * @param {} foodId
 * @param {} curPage
 * @param {} meatflag
 */
function replaceItem(targetItem,foodId,curPage,meatflag){
	var isHunFoods = meatflag == 1 ? true : false;
	var targetAry;
	if(isHunFoods){
		targetAry = curPage.hunItems;
	}else{
		targetAry = curPage.suItems;
	}
	for(var i = 0 ; i < targetAry.length ; i++){
		if(targetAry[i].id == foodId){
			targetAry[i] = targetItem;
			break;
		}
	}
}


//clone a item from model.
function createItem(picPath,foodName,foodPrice,curprice,foodId,meetflag,unitflag){

	var elem = $(".itemModel").eq(0).clone(true);
	elem.find(".picLayout img[name='foodImg']").attr("src",picPath);
	elem.find(".foodTitle").html(foodName);
	elem.find(".foodPrice").html("￥" + foodPrice);
	elem.find(".specPrice").html("￥" + curprice + FoodUnitFlag.getUnitName(unitflag));
	elem.find("input[name='foodId']").val(foodId);
	elem.find("input[name='realmoney']").val(curprice);
	elem.find("input[name='meetflag']").val(meetflag);
	elem.attr("class","item");
	return elem;
}

var allMainDishItems = [];
function loadAllMainDish(rid){
	$.ajax({
		type : "POST",
		url : "autoOrderController.do",
		data : "method=getAllMainDish&rid=" + rid,
		cache : false,
		dataType : "json",
		success : function(msg) {
			allMainDishItems = msg.mainDishList;
			sortMainDish(allMainDishItems);

			initSys();
			
			_loginid = msg.customerid;			
			_loginname = msg.customername;			
			//改变登陆样式
			if(_loginid != ''){
				changelogsyle();
			}else{
				changelogstyle1();
			}
		}
	});
}

/**
 * 将主菜按 素菜,荤菜分类
 * @param {} allMainDish
 */
function sortMainDish(allMainDish){
	autoOrderSilde.allSuFoods = autoOrderSilde.allHunFoods = [];
	
	autoOrderSilde.allSuFoods = $.grep(allMainDish, function(n,i){
  		return parseInt(n.meetflag) <= 0;
	});
	autoOrderSilde.allHunFoods = $.grep(allMainDish, function(n,i){
  		return parseInt(n.meetflag) >= 1;
	});
	autoOrderSilde.allSuFoods.sort(function compare(a,b){return parseInt(b.curprice) - parseInt(a.curprice);});
	autoOrderSilde.allHunFoods.sort(function compare(a,b){return parseInt(b.curprice) - parseInt(a.curprice);});
}

/**
 * 初始化系统配置
 */
function initSysConfig(){
	var price = $("input[name='" + priceSliderConfig.hiddenElem + "']").val();
	var person = $("input[name='" + personSliderConfig.hiddenElem + "']").val();
	var meatdiet = $("input[name='" + meatDietSliderConfig.hiddenElem + "']").val();
	var isOverPrice = $("input[name='overPrice']").attr("checked") ? 1 : 0;
	var isEnabled = $("input[name='noPrice']").attr("checked") ? 1 : 0;
	
	//取回原始数组重新排序
	sortMainDish(allMainDishItems);
	
	if(autoOrderSilde.person != person || (autoOrderSilde.foodsMinNumber == -1 && autoOrderSilde.foodsMaxNumber == -1)){
		autoOrderSilde.foodsMinNumber = parseInt(person) -1;	//设置菜数量最少值
	 	autoOrderSilde.foodsMaxNumber = parseInt(person) + 3;   //设置菜数量最大值
	 	//保证最大值20,最少值18道菜
	 	autoOrderSilde.foodsMinNumber = autoOrderSilde.foodsMinNumber > 20 ? 18 : autoOrderSilde.foodsMinNumber;
	 	autoOrderSilde.foodsMaxNumber = autoOrderSilde.foodsMaxNumber > 20 ? 20 : autoOrderSilde.foodsMaxNumber;
	 	foodNumberSilderConfig.isMovePerson = true;
	 	foodNumberSilderConfig.setValue([autoOrderSilde.foodsMinNumber,autoOrderSilde.foodsMaxNumber]);
	 	foodNumberSilderConfig.isMovePerson = false;
	}
	
	
	autoOrderSilde.isOverPrice = isOverPrice == 1;		//是否1000以上
	
	var priceFirst = 0;var priceEnd = 0 ;
	if(autoOrderSilde.isOverPrice){						//价格1000以上
		priceFirst = 1000;
		priceEnd = 999999999;								//1000 / 0.8
	}else{
		priceFirst = parseInt(price) - 10;			//总价格最小值
		priceEnd = parseInt(price) + 10;			//总价格最大值
	}
	autoOrderSilde.minMoney = priceFirst;
	autoOrderSilde.maxMoney = priceEnd;
	
	autoOrderSilde.person = person;						//吃饭人数
	autoOrderSilde.isPriceLimit = isEnabled == 0;	//是否价格不限
	
	autoOrderSilde.suControl.start = 1;		//素菜坐标索引起始值初始化为1
	autoOrderSilde.suControl.curStartIndex = 0;
	setStep(false);							//设置步长(数组循环获取索引 = start + step)
	
	
	autoOrderSilde.hunControl.start = 1;	//荤菜坐标索引起始值初始化为1
	autoOrderSilde.hunControl.curStartIndex = 0;
	setStep(true);							//设置步长(数组循环获取索引 = start + step)
	
	

	//需要的菜比菜的总数要多，即没有下一组
	autoOrderSilde.hunControl.hasNext = true;
	autoOrderSilde.suControl.hasNext = true;
	if(autoOrderSilde.hunControl.step < 0)autoOrderSilde.hunControl.hasNext = false;
	if(autoOrderSilde.suControl.step < 0)autoOrderSilde.suControl.hasNext = false;

	
	autoOrderSilde.hunControl.isRunAfter = 0;
	autoOrderSilde.suControl.isRunAfter = 0;
	
	autoOrderSilde.rndHunFoods = [];
	autoOrderSilde.rndSuFoods = [];
	autoOrderSilde.suControl.itemsAry1 = [];
	autoOrderSilde.suControl.itemsAry2 = [];
	autoOrderSilde.hunControl.itemsAry1 = [];
	autoOrderSilde.hunControl.itemsAry2 = [];
}

/**
 * 设置起始点
 * @param {} isHunFoods	是否荤菜
 * @param {} isNotFound	是否未找到
 */
function setStart(isHunFoods,isNotFound){
	var target = null;
	var ary = null;
	if(isHunFoods){
		target = autoOrderSilde.hunControl;
		ary = autoOrderSilde.allHunFoods;
	}else{
		target = autoOrderSilde.suControl;
		ary = autoOrderSilde.allSuFoods;
	}
	//未找到食品
	if(isNotFound){
		var start = Math.ceil(target.step * Math.abs(autoOrderSilde.needsAllFoodsNumber - target.curStartIndex - 1) / autoOrderSilde.needsAllFoodsNumber);
		start = start == 0 ? 1 : start;	//保证不能为0
		target.start += start;
	}else{
		target.start = target.start + 1;
	}
	if(target.start > ary.length)target.hasNext = false;	//没有下一组
	target.curStartIndex = target.start - 1;
}

/**
 * 设置步长
 * @param {} isHunFoods	是否荤菜
 */
function setStep(isHunFoods){
	var target = null;
	var ary = null;
	if(isHunFoods){
		target = autoOrderSilde.hunControl;
		ary = autoOrderSilde.allHunFoods;
	}else{
		target = autoOrderSilde.suControl;
		ary = autoOrderSilde.allSuFoods;
	}
	
	target.step = (1 - target.foodsNumber / ary.length) * 3;
	var step = target.step;
	target.step = step == 0 || step == 0.5 || step == 1.5 ? 1 : Math.round(step);target.step = target.step == 0 ? 1 : target.step;
}


/**
 * 初始化autoOrderSilde对象
 */
function initAutoOrderSilde(){
	autoOrderSilde.suControl.start = 1;	
	autoOrderSilde.suControl.curStartIndex = 0;
	setStep(false);
	
	autoOrderSilde.hunControl.start = 1;	//荤菜坐标索引起始值初始化为1
	autoOrderSilde.hunControl.curStartIndex = 0;
	setStep(true);							//设置步长(数组循环获取索引 = start + step)
	
	//需要的菜比菜的总数要多，即没有下一组
	autoOrderSilde.hunControl.hasNext = true;
	autoOrderSilde.suControl.hasNext = true;
	if(autoOrderSilde.hunControl.step < 0)autoOrderSilde.hunControl.hasNext = false;
	if(autoOrderSilde.suControl.step < 0)autoOrderSilde.suControl.hasNext = false;
	
	autoOrderSilde.hunControl.isRunAfter = 0;
	autoOrderSilde.suControl.isRunAfter = 0;
	autoOrderSilde.rndHunFoods = [];
	autoOrderSilde.rndSuFoods = [];
	autoOrderSilde.hunControl.itemsAry1 = [];
	autoOrderSilde.hunControl.itemsAry2 = [];
	autoOrderSilde.suControl.itemsAry1 = [];
	autoOrderSilde.suControl.itemsAry2 = [];
}
/**
 * 配餐
 * @param {} btnObj
 * @param {} rid
 */
function sides(btnObj,rid,notRunRandom){
	if(typeof(notRunRandom) == 'undefined' || notRunRandom == null || notRunRandom == false){
		$(".sysmsg").hide();
		if(autoOrderPage == null)autoOrderPage = new PageBean([]);autoOrderPage.items = [];
		autoOrderPage.curPage = 1;
		$(btnObj).attr("disabled","true");
		initSysConfig();	//初始化
		for(var fnum = autoOrderSilde.foodsMinNumber ; fnum <= autoOrderSilde.foodsMaxNumber ; fnum++){
			autoOrderSilde.needsAllFoodsNumber = fnum;
			autoOrderSilde.suControl.foodsNumber = Math.ceil(fnum * (parseInt($("input[name='" + meatDietSliderConfig.hiddenElem + "']").val()) / 100));	//素菜需要的个数
			autoOrderSilde.hunControl.foodsNumber = fnum - autoOrderSilde.suControl.foodsNumber;
			initAutoOrderSilde();
			var successItems = randomGetMainDish();
			if(successItems.length != 0){
				$.merge(autoOrderPage.items,successItems);
			}
		}
	}
	window.setTimeout(orderByItems,1,btnObj);//模拟多线程处理(解决假死现像)
}

function orderByItems(btnObj){
	showWaitingMsg(false);
	try{
		if(autoOrderPage.items.length > 0 && 
			typeof(autoOrderPage.items[0].suItems) != 'undefined' && 
			typeof(autoOrderPage.items[0].hunItems) != 'undefined' &&
			autoOrderPage.items[0].suItems != null && 
			autoOrderPage.items[0].hunItems != null){
			
			$(".aricleLayout").removeClass("fixHeight");
			
			var autoOrderType = getAutoOrderType();
			switch(parseInt(autoOrderType.typeIdx)){
				case 0:
					randomType();
					break;
				case 1:
					consumptionHeatType(autoOrderType);
					break;
				case 2:
					reputationType(autoOrderType);
			}
			showItems();
			//alert(typeof(autoOrderPage.items[0].suItems));
		}else{
			showNotFoundFoods();
		}
		$(btnObj).removeAttr("disabled");
	}catch(e){
		showNotFoundFoods();
		$(btnObj).removeAttr("disabled");
	}
}

function getItemsMoney(foodItems){
	if(foodItems == null)return 0;
	var countMoney = 0;
	for(var i = 0 ; i < foodItems.length ; i++){
		if(typeof(foodItems[i].curprice) != 'undefined'){
			countMoney += foodItems[i].curprice;
		}
	}
	return countMoney;
}

/**
 * 分页对象
 * @param {} items
 */
function PageBean(items){
	this.items = items;
	this.maxPageNum = function(){return this.items.length;};
	this.curPage = 1;
	this.next = function(){
		if(this.curPage + 1 > this.maxPageNum()){
			this.curPage = this.maxPageNum();
		}else{
			this.curPage++;
		}
	};
	this.prev = function(){
		if(this.curPage - 1 <= 0){
			this.curPage = 1;
		}else{
			this.curPage --;
		}
	};
	this.hasNext = function(){
		if(this.maxPageNum() > 0 && this.curPage + 1 <= this.items.length)return true;
		return false;
	};
	this.hasPrev = function(){
		if(this.maxPageNum() > 0 && this.curPage - 1 > 0)return true;
		return false;
	};
	this.isFirst = function(){
		if(this.curPage <= 1)return true;
		return false;
	};
	this.isLast = function(){
		if(this.curPage >= this.maxPageNum())return true;
		return false;
	};
	this.gtCurItemIndex = function(){return this.curPage - 1;};
	this.getCurpage = function(){
		return this.items[this.gtCurItemIndex()];
	};
}


/**
 * 随机方式
 * @return {}
 */
function randomType(){
	var str = ",";
	var newAry = [];
	while(newAry.length < autoOrderPage.items.length){
		var idx = parseInt(Math.random() * autoOrderPage.items.length);
		if(str.indexOf(","+idx+",") == -1){
			str += (idx + ",");
			newAry[newAry.length] = autoOrderPage.items[idx];
		}
	}
	autoOrderPage.items = newAry;
}

/**
 * 消费热度方式
 */
function consumptionHeatType(autoOrderType){
	autoOrderPage.items.sort(function compare(a,b){
		var acount = 0;
		for(var i = 0 ; i < a.hunItems.length ; i++){
			acount += a.hunItems[i].consumcounts;
		}
		for(var i = 0 ; i < a.suItems.length ; i++){
			acount += a.suItems[i].consumcounts;
		}
		var avga = acount / (a.hunItems.length + a.suItems.length);	//a 的平均值
		
		var bcount = 0;
		for(var i = 0 ; i < b.hunItems.length ; i++){
			bcount += b.hunItems[i].consumcounts;
		}
		for(var i = 0 ; i < b.suItems.length ; i++){
			bcount += b.suItems[i].consumcounts;
		}
		var avgb = bcount / (b.hunItems.length + b.suItems.length);	//b 的平均值 
		if(autoOrderType.value == 0){
			return avgb - avga;
		}else{
			return -(avgb - avga);
		}
	});
}

/**
 * 好评率方式
 */
function reputationType(autoOrderType){
	autoOrderPage.items.sort(function compare(a,b){
		var acount = 0;
		for(var i = 0 ; i < a.hunItems.length ; i++){
			acount += a.hunItems[i].foodcomm;
		}
		for(var i = 0 ; i < a.suItems.length ; i++){
			acount += a.suItems[i].foodcomm;
		}
		var avga = acount / (a.hunItems.length + a.suItems.length);	//a 的平均值
		
		var bcount = 0;
		for(var i = 0 ; i < b.hunItems.length ; i++){
			bcount += b.hunItems[i].foodcomm;
		}
		for(var i = 0 ; i < b.suItems.length ; i++){
			bcount += b.suItems[i].foodcomm;
		}
		var avgb = bcount / (b.hunItems.length + b.suItems.length);	//b 的平均值 
		if(autoOrderType.value == 0){
			return avgb - avga;
		}else{
			return -(avgb - avga);
		}
	});
}


function getAutoOrderType(){
	var typeIdx = $("input[name='currentSelectType']").val();
	var value = $(".selectBar").eq(typeIdx).find("input:checked").val();
	return {"typeIdx" : typeIdx , "value":value == 'undefined'?-1:value};
}

/**
 * 下一组
 */
function nextpage(){
	if(autoOrderPage != null && autoOrderPage.hasNext()){
		autoOrderPage.next();
		showItems();
	}
}
/**
 * 上一组
 */
function prevPage(){

	if(autoOrderPage != null && autoOrderPage.hasPrev()){
		autoOrderPage.prev();
		showItems();
	}
}

/**
 * 显示未找到记录
 */
function showNotFoundFoods(){

	
	if($(".round .item").size() > 0){
		var waitEnd = 0;
		$(".round .item").each(function(i){
			try{
//				$(this).removeShadow();
				var isLeft = parseInt(Math.random() * 1000) % 9 > 4 ? true : false;
				$(this).stop();
				$(this).animate({left:isLeft ? "-=1500px" : "+=1500px"},parseInt(Math.random() * 1000) + 1,function(){
					if(++waitEnd == $(".round .item").size()){	//the last item 
						$(".round .item").remove();
						$(".sysmsg td").html("抱歉，没有找到任何组合，请试试调整配餐条件");
						$(".sysmsg").show();
						resetPageInfo();
					}
				});
			}catch(ex){alert(ex);}
		});
		
	}else{
		$(".sysmsg td").html("抱歉，没有找到任何组合，请试试调整配餐条件");
		$(".sysmsg").show();
		resetPageInfo();
	}
	$(".aricleLayout").addClass("fixHeight");
}

function resetPageInfo(){
	$(".btnRight .curfoodsNum font").html(0);
	$(".btnRight .curfodsMoney font").html("￥ 0.0");
	$(".btnRight .curPageInfo").html("0/0组");
}

/**
 * 显示找到的菜
 * @param {} suItems
 * @param {} hunItems
 */
function showItems(){
	if($(".round .item").size() > 0){
		var waitEnd = 0;
//		$(".round .item").removeShadow();
		$(".round .item").each(function(i){
			try{
				var isLeft = parseInt(Math.random() * 1000) % 9 > 4 ? true : false;
				$(this).stop();
				$(this).animate({left:isLeft ? "-=1500px" : "+=1500px"},parseInt(Math.random() * 2000) + 1,function(){
					if(++waitEnd == $(".round .item").size()){	//the last item 
//						$(".round .item").removeShadow();
						$(".round .item").remove();
						foodsComming();
					}
				});
				
			}catch(ex){alert(ex);}
		});
	}else{
		foodsComming();
	}
}
function foodsComming(){
	try{
		var item = autoOrderPage.getCurpage();
		var sumMoney = 0;
		for(var i = 0 ; i < item.hunItems.length ; i++){
			$(".round").append(createItem(item.hunItems[i].picpath,item.hunItems[i].name,
									item.hunItems[i].price,
									item.hunItems[i].curprice,item.hunItems[i].id,item.hunItems[i].meetflag,item.hunItems[i].unitflag)
			   );
			sumMoney += item.hunItems[i].curprice;
		}
		for(var i = 0; i < item.suItems.length ; i++){
			$(".round").append(createItem(item.suItems[i].picpath,item.suItems[i].name,
									item.suItems[i].price,
									item.suItems[i].curprice,item.suItems[i].id,item.suItems[i].meetflag,item.suItems[i].unitflag)
			   );
							   
			sumMoney += item.suItems[i].curprice;
		}
		
		fillPageInfo(item,sumMoney);
		itemComing("item");
	}catch(e){}
}

function fillPageInfo(item,sumMoney){
	$(".btnRight .curfoodsNum font").html(item.suItems.length + item.hunItems.length);
	$(".btnRight .curfodsMoney font").html("￥" + ForDight(sumMoney,1));
	$(".btnRight .curPageInfo").html(autoOrderPage.curPage + "/" + autoOrderPage.maxPageNum() + "组");
}

/**
 * 随机获取主菜
 */
function randomGetMainDish(){
	var targetItems = [];
	var isHunFoods = autoOrderSilde.hunControl.foodsNumber > autoOrderSilde.suControl.foodsNumber;//荤菜是否大于素菜
	var target = isHunFoods ? autoOrderSilde.suControl : autoOrderSilde.hunControl;
	var largeItems = getFoodItems(true,isHunFoods,0,autoOrderSilde.maxMoney);
	for(var i = 0 ; i < largeItems.length; i++){
		var maxMoney = autoOrderSilde.maxMoney - largeItems[i].sumMoney;
		var minMoney = autoOrderSilde.minMoney - largeItems[i].sumMoney;
		minMoney = minMoney < 0 ? 0 : minMoney;
		if(!target.hasNext){
			initAutoOrderSilde();
		}
		
		if(target.foodsNumber != 0){
			var smallItems = getFoodItems(false,!isHunFoods,minMoney,maxMoney);
			if(smallItems.length > 0){
				var nItem = {"suItems" : isHunFoods ? smallItems[0].items : largeItems[i].items,"hunItems":isHunFoods ? largeItems[i].items : smallItems[0].items};
				targetItems[targetItems.length] = nItem;
			}
		}else{
			if(autoOrderSilde.isPriceLimit){
				if(largeItems[i].sumMoney >= autoOrderSilde.minMoney && largeItems[i].sumMoney <= autoOrderSilde.maxMoney){
					var nItem = {"suItems" : isHunFoods ? [] : largeItems[i].items,"hunItems":isHunFoods ? largeItems[i].items : []};
					targetItems[targetItems.length] = nItem;
				}
			}else{
				var nItem = {"suItems" : isHunFoods ? [] : largeItems[i].items,"hunItems":isHunFoods ? largeItems[i].items : []};
				targetItems[targetItems.length] = nItem;
			}
		}
	}
	return targetItems;
}

/**
 * 获取素菜或荤菜所有组合
 * @param {} isLargeFoods	是否比例大的菜
 * @param {} isHunFoods		是否荤菜
 * @param {} minMoney		最小金额
 * @param {} maxMoney		最大金额
 * @return {}
 */
function getFoodItems(isLargeFoods,isHunFoods,minMoney,maxMoney){
	/***************************/
		minMoney = !autoOrderSilde.isPriceLimit?0 : minMoney;
		maxMoney = !autoOrderSilde.isPriceLimit?999999999:maxMoney;
	/***************************/
	
	var target = isHunFoods ? autoOrderSilde.hunControl : autoOrderSilde.suControl;
	var ary = isHunFoods ? autoOrderSilde.allHunFoods : autoOrderSilde.allSuFoods;
	if(target.foodsNumber <= 0){
		target.hasNext = false;
		return [];
	}
	if(!isLargeFoods){//数量少的菜
		if(target.curStartIndex >= ary.length){
			setStart(isHunFoods,target.isRunAfter == 0 ?true:false);
		}
	}
	var targetItems = [];
	var idItems = [];//每组的ID字符串,过滤重复组
	while(target.hasNext){
		var vItems = [];
		var moneyCount = 0;
		for(var i = 0 ; i < target.foodsNumber ; i++){
			while(target.curStartIndex < ary.length){
				var tmpMoney = moneyCount + ary[target.curStartIndex].curprice;
				if(tmpMoney <= maxMoney){
					vItems[vItems.length] = ary[target.curStartIndex];
					moneyCount += ary[target.curStartIndex].curprice;
					target.curStartIndex += target.isRunAfter == 0 ? target.step : 1;//特殊情况+1
					break;
				}else{
					target.curStartIndex += target.isRunAfter == 0? target.step:1;
				}
			}
			
			if(!target.hasNext){
				if(target.isRunAfter == 0){
					target.isRunAfter = -1;
					target.hasNext = true;
					target.start = 1;target.curStartIndex = 0;
					i = -1;moneyCount = 0;vItems=[];
				}else if(target.isRunAfter == 1){
					ary = target.itemsAry1;
					target.isRunAfter = -1;
					target.start = 1;target.curStartIndex = 0;
					i = -1;moneyCount = 0;vItems=[];
					target.hasNext = true;
				}else{
					target.hasNext = false;
					break;
				}
			}
			if(target.curStartIndex >= ary.length){
				setStart(isHunFoods,target.isRunAfter == 0 ?true:false);
				moneyCount = 0;vItems = [];
				i = -1;//循环会++
			}
		}
		if(vItems.length  == target.foodsNumber){
			if(moneyCount < minMoney){
				if(target.isRunAfter == 0){
					for(var k = 0 ; k <= target.curStartIndex; k++){
						if(typeof(ary[k]) != 'undefined')
							target.itemsAry1[target.itemsAry1.length] = ary[k];
					}
					for(var k = target.curStartIndex + 1 ; k < ary.length; k++){
						if(typeof(ary[k]) != 'undefined')
							target.itemsAry2[target.itemsAry2.length] = ary[k];
					}
					ary = target.itemsAry2;
					target.isRunAfter = 1;
					target.hasNext = true;
				}else if(target.isRunAfter == 1){
					ary = target.itemsAry1;
					target.isRunAfter = -1;
					target.hasNext = true;
				}else{
					target.hasNext = false;
					break;
				}
				target.start = 1;target.curStartIndex = 0;
				i = -1;moneyCount = 0;vItems=[];
			}else{
				if(!isLargeFoods){//数量少的菜
					 return [{"sumMoney" : moneyCount , "items" : vItems}];
				}else{
					if(!isCloseItem(idItems,vItems)){
						targetItems[targetItems.length] = {"sumMoney" : moneyCount , "items" : vItems};
					}
				}
				setStart(isHunFoods,false);
			}
		}else{
			return targetItems;
		}
	}
	return targetItems;
}

/**
 * 是否相同组
 * @param {} orItems
 * @param {} vItems
 * @return {Boolean}
 */
function isCloseItem(orItems,vItems){
	var targetItems = $.map(vItems,function(n){return n;}).sort(function compare(a,b){return parseInt(b.id) - parseInt(a.id);});
	var targetItemsStr = "," + $.map(targetItems,function(n){return n.id;}).join(",") + ",";
	var i = 0 ;
	for(; i < orItems.length ; i++){
		if(orItems[i] == targetItemsStr){
			break;
		}
	}
	if(i == orItems.length){
		orItems[orItems.length] = targetItemsStr;
		return false;
	}else{
		return true;
	}
}

/**
 * 核心控制对象
 * @param {} start				起点位置
 * @param {} step				步长
 * @param {} curStartIndex		当前数组索引
 * @param {} foodsNumber		素菜或荤菜数量
 * @param {} startMoney			开始金额
 * @param {} endMoney			结束金额
 */
function CoreControl(start,step,curStartIndex,foodsNumber,startMoney,endMoney,hasNext){
	/**起点位置*/
	this.start = start;
	/**步长*/
	this.step = step;
	/**当前数组索引*/
	this.curStartIndex = curStartIndex;
	
	/**素菜或荤菜数量*/
	this.foodsNumber = foodsNumber;
	/**开始金额*/
	this.startMoney = startMoney;
	/**结束金额*/
	this.endMoney = endMoney;
	/**是否有下一组*/
	this.hasNext = hasNext;
	
	/**分解数组1*/
	this.itemsAry1 = [];
	/**分解数组2*/
	this.itemsAry2 = [];
	/**结果比价格最小值小的
	 * 特殊情况是否已运行 0 未运行 1正在运行 -1运行完成*/
	this.isRunAfter = 0;
}

/**
 * 自动定餐滑动配置
 * @type 
 */
var autoOrderSilde = {
	/**总菜个数*/
	needsAllFoodsNumber:-1,
	/**总人数*/
	person : -1,
	/**素菜数据*/
	allSuFoods : [],
	/**荤菜数据*/
	allHunFoods : [],
	/**是否1000以上*/
	isOverPrice : false,
	/**价格是否不限*/
	isPriceLimit : false,
	
	/**素菜核心控制*/
	suControl : new CoreControl(-1,1,0,-1,-1,-1,true),
	/**荤菜核心控制*/
	hunControl : new CoreControl(-1,1,0,-1,-1,-1,true),
	/**是否有下一组*/
	//hasNext : true,
	
	/**随机换素菜食品列表*/
	rndSuFoods : [],
	/**随机换荤菜食品列表*/
	rndHunFoods : [],
	/**需要菜的最小值*/
	foodsMinNumber : -1,
	/**需要菜的最大值*/
	foodsMaxNumber : -1,
	/**花费总价最小值*/
	minMoney : 0,
	/**花费总价最大值*/
	maxMoney : 0      
	               
};

/**
 * 主菜单位
 * @type 
 */
var FoodUnitFlag = {
	/**份*/
	FEN		:	0,
	/**位*/
	WEI		:	1,
	/**斤*/
	JIN		:	2,
	/**俩*/
	LIAN	:	3,
	/**打*/
	DA		:	4,
	/**半打*/
	BANDA	:	5,
	/**只*/
	JI		:	6,
	/**半只*/
	BANJI	:	7,
	getUnitName : function(unitflag){
		var targetUnitFlag = "";	//默认份不写
		
		if(unitflag != null){
			switch(parseInt(unitflag)){
				case FoodUnitFlag.FEN:
					targetUnitFlag =  "";//默认份不写
					break;
				case FoodUnitFlag.WEI:
					targetUnitFlag =  "_25E4_25BD_258D";
					break;
				case FoodUnitFlag.JIN:
					targetUnitFlag =  "_25E6_2596_25A4";
					break;
				case FoodUnitFlag.LIAN:
					targetUnitFlag =  "_25E4_25BF_25A9";
					break;
				case FoodUnitFlag.DA:
					targetUnitFlag =  "_25E6_2589_2593";
					break;
				case FoodUnitFlag.BANDA:
					targetUnitFlag =  "_25E5_258D_258A_25E6_2589_2593";
					break;
				case FoodUnitFlag.JI:
					targetUnitFlag =  "_25E5_258F_25AA";
					break;
				case FoodUnitFlag.BANJI:
					targetUnitFlag =  "_25E5_258D_258A_25E5_258F_25AA";
			}
		}
		return targetUnitFlag;
	}
};

//四舍五入
function ForDight(Dight,How) { 
	Dight =(Dight*Math.pow(10,How)/Math.pow(10,How)).toFixed(How); 
	return Dight; 
}
Number.prototype.toFixed = function(len){ 
	var add = 0; 
	var s,temp; 
	var s1 = this + ""; 
	var start = s1.indexOf("."); 
	if(s1.substr(start+len+1,1)>=5)add=1; 
	var temp = Math.pow(10,len); 
	s = Math.floor(this * temp) + add; 
	return s/temp; 
}


/**
    功能：修改 window.setTimeout，使之可以传递参数和对象参数
    使用方法： setTimeout(回调函数,时间,参数1,,参数n)
*/
var __sto = setTimeout;
window.setTimeout = function(callback,timeout,param)
{
    var args = Array.prototype.slice.call(arguments,2);
    var _cb = function()
    {
    	if(typeof(callback) == 'string'){
    		var method = callback.split("(")[0];
    		eval("var targetMethod = " + method + ";");
    		targetMethod.apply(null,args);
    	}else{
    		callback.apply(null,args);
    	}
    }
    
    __sto(_cb,timeout);
}

function openFoodMenu(linkObj){
	
	if($(linkObj).html().indexOf("我的") != -1){
		$(".cartlayout").animate({"width":"250px"},800,function(){
			$(linkObj).html("关闭菜单");
		});
	}else{
		$(".cartlayout").animate({"width":"0px"},800,function(){
			$(linkObj).html("我的菜单");
		});
	}
}


function closeFoodMenu(){
	$(".cartlayout").animate({"width":"0px"},800,function(){
		
		$(".cartlayout").hide();
	});
}




function viewMyMenu(){
	

	$(".cartlayout").css('width', '0px').animate({"width":"250px"},800,function(){
		$("#myfoodmenu").html("关闭菜单");
	});
}

function showWaitingMsg(isShow){

	if(isShow){
		$("#fade").css({"display":"block"});
		$(".white_content").css({"display":"block","bottom" : parseInt(($("#fade").height() - 20) /2),"left" : parseInt(($("#fade").width() - 100) /2)});
	}else{
		$("#fade").hide();
		$(".white_content").hide();
	}
}

