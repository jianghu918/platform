$(document).ready(function() {
	
	
	
	
	
	
    ajaxsuggestshow();
	
    try{
        if (window.screen) {
			
            window.moveTo(0, 0);
            window.resizeTo(screen.availWidth, screen.availHeight);
        }
    }catch(e){		
    }
	
    //预览订单详情
    viewseatinginfo = function(obj){	
        $(obj).next().show();
    }
	
    //关闭订单详情
    closeseatinginfo = function(obj){
        $(obj).next().hide();
    }
	
	
    //进入大厅详情
    intoDatingdetail = function(){
        $("form:eq(0)").attr("action", _context+"/restaurantmain-getMoreSeating.html&restaurantid="+restaurantid);
        $("form:eq(0)").removeAttr("target");
        $("form:eq(0)").attr("method", "post");
        $("form:eq(0)").submit();
    }
	
    //进入包厢详情
    intoBaoxiangDetail = function(){
        loadmorebaoxiang();
    }
	
	
    /**
	 * 进入餐厅点餐页面
	 */
    intoOrderFood = function(restid, restname){
		
        $("form:eq(0)").attr("action", _context+"/orderfood-loadPage.html&restaurantid="+restid+"&restaurantname="+restname);
        $("form:eq(0)").removeAttr("target");
        $("form:eq(0)").attr("method", "post");
        $("form:eq(0)").submit();
		
    }

    /**
	 * 点击大厅 包厢切换 餐厅 type = 1 表示选中大厅, type=2 表示选中包厢
	 */
    clickSearchType = function(type){
		
		
        if(type == 1){

			
            //大厅列表显示
            $("#seatinglist").show();
			
            //包厢列表隐藏
            $("#baoxiangseatinglist").hide();
		
            //大厅的更多链接显示
            $("#more_dating_buttons").show();
			
            //包厢的更多链接隐藏
            $("#more_baoxiang_buttons").hide();
			
            //隐藏包厢的分页信息
            $("#setmealspager").hide();
			
            //显示大厅的分页信息
            $("#alcoholpager").show();
			
        }else{
			
            //大厅列表隐藏
            $("#seatinglist").hide();

            //包厢列表显示
            $("#baoxiangseatinglist").show();
		
            //大厅的更多链接隐藏
            $("#more_dating_buttons").hide();
			
            //包厢的更多链接显示
            $("#more_baoxiang_buttons").show();
			
            //显示包厢的分页信息
            $("#setmealspager").show();
			
            //隐藏大厅的分页信息
            $("#alcoholpager").hide();
			
        }
		
    }
	
    //点击更多坐席页, 跳装到更多包厢页面
    loadmorebaoxiang = function(){
        $("form:eq(0)").attr("action", _context+"/restaurantmain-getMoreBaoxiangSeating.html&restaurantid="+restaurantid);
        $("form:eq(0)").removeAttr("target");
        $("form:eq(0)").attr("method", "post");
        $("form:eq(0)").submit();
    }
	
	
    morebaoxiangseatings = function(){
        //将更多的链接按钮隐藏
        $("#more_baoxiang_buttons").remove();
		
        //清空作为列表
        $("#baoxiangseatinglist").html("");
        //得到页数
        var pageno = $("#baoxiangpageno").val();
		
        //得到餐厅的id
        var restaurantid = $("#restaurantid").val(); 
	
        $.ajax({
            type: "POST",   
            url: _context+"/restaurantmain-getbaoxiangseatingpagelist.html",
            dataType:"json",
            data : {
                pageno:pageno, 
                restaurantid:restaurantid
            },
            success: function(json)
            { 	
			
                var items = json.seatings;
                var resulthtml = '<li class="first"><span>座席名称</span><span>座席描述</span><span>可容纳人数</span><span>服务时间</span><span>最低消费</span></li>';				
                var html = '';		
                for(var i=0; i<items.length; i++){
                    html += '<li><div class="textinfo">'+items[i].seatingname+'</div><div class="textinfo">'+items[i].seatingdesc+'</div>'+
                    '<div class="textinfo">'+items[i].capacity+'</div>'+	
                    '<div class="textinfo">'+items[i].servstarttime+'~'+items[i].servendtime+'</div>';
                    if(items[i].minconsump == undefined){
                        html += '<div class="mini_charge">无</div></li>';
                    }else{
                        html += '<div class="mini_charge">￥'+items[i].minconsump+'</div></li>';
                    }
					
                }
                resulthtml+=html;
				
                //将返回的结果放回到评论列表中间去
                //jQuery.trim(resulthtml);
                $("#baoxiangseatinglist").html(resulthtml);
				
                //总的页数
                $("#baoxiangtotalpage").val("");
                $("#baoxiangtotalpage").val(json.totalpage);
                if(json.totalpage > 1){
                    $("#setmealspager").pager({
                        pagenumber: pageno, 
                        pagecount: json.totalpage, 
                        buttonClickCallback: PageBaoxiangSeatingClick
                    });
                }else{
                    $("#setmealspager").html('');
                }
            }
        });	
}
	
/**
	 * 当点击餐厅首页的更多坐席的时候, 跳转到更多坐席的页面
	 */
moreseatinginfo = function(){
    $("form:eq(0)").attr("action", _context+"/restaurantmain-getMoreSeating.html&restaurantid="+restaurantid);
    $("form:eq(0)").removeAttr("target");
    $("form:eq(0)").attr("method", "post");
    $("form:eq(0)").submit();
}
	
moreseatings = function(){
    //将更多的链接按钮隐藏
    $("#more_dating_buttons").remove();
		
    //清空作为列表
    $("#seatinglist").html("");
    //得到页数
    var pageno = $("#alcopageno").val();
		
    //得到餐厅的id
    var restaurantid = $("#restaurantid").val(); 
	
    $.ajax({
        type: "POST",   
        url: _context+"/restaurantmain-getseatingpagelist.html",
        dataType:"json",
        data : {
            pageno:pageno, 
            restaurantid:restaurantid
        },
        success: function(json)
        { 	
			
            var items = json.seatings;
            var resulthtml = '<li class="first"><span>座席名称</span><span>座席描述</span><span>可容纳人数</span><span>服务时间</span><span>最低消费</span></li>';
				
            var html = '';
				
            for(var i=0; i<items.length; i++){
                html += '<li><div class="textinfo">'+items[i].seatingname+'</div><div class="textinfo">'+items[i].seatingdesc+'</div>'+
                '<div class="textinfo">'+items[i].capacity+'</div>'+	
                '<div class="textinfo">'+items[i].servstarttime+'~'+items[i].servendtime+'</div>';
					
                if(items[i].minconsump == undefined){
                    html += '<div class="mini_charge">无</div></li>';
                }else{
                    html += '<div class="mini_charge">￥'+items[i].minconsump+'</div></li>';
                }
					
            }
            resulthtml+=html;
            //将返回的结果放回到评论列表中间去
            $("#seatinglist").html(resulthtml);
				
            //总的页数
            $("#alcototalpage").val("");
            $("#alcototalpage").val(json.totalpage);
            if(json.totalpage > 1){
                $("#alcoholpager").pager({
                    pagenumber: pageno, 
                    pagecount: json.totalpage, 
                    buttonClickCallback: PageSeatingClick
                });
            }else{
                $("#alcoholpager").html('');
            }
        }
    });	
}
	
/**
	 * 分页获取大厅座席信息
	 */
PageSeatingClick = function(pageclickednumber) {
    var totalpages =  $("#alcototalpage").val();
    $("#alcoholpager").pager({
        pagenumber: pageclickednumber, 
        pagecount: totalpages, 
        buttonClickCallback: PageSeatingClick
    });
    $("#alcopageno").val(pageclickednumber);	       
    moreseatings();
}
	
/**
	 * 分页获取包厢座席信息
	 */
PageBaoxiangSeatingClick = function(pageclickednumber) {
    var totalpages =  $("#baoxiangtotalpage").val();
    $("#setmealspager").pager({
        pagenumber: pageclickednumber, 
        pagecount: totalpages, 
        buttonClickCallback: PageBaoxiangSeatingClick
    });
    $("#baoxiangpageno").val(pageclickednumber);	       
    moreseatings();
}

/**
	 * 为了定义列表能够循环.将小图中可见的加入列表中间去.
	 */
function mysmallcarousel_itemVisibleInCallback(carousel, item, i, state, evt)
{
    // The index() method calculates the index from a
    // given index who is out of the actual item range.
    var idx = carousel.index(i, mysmallcarousel_itemList.length);
    carousel.add(i, mysmallcarousel_getItemHTML(mysmallcarousel_itemList[idx - 1]));
};
    
/**
     * 将小图中不可见的从视图中删除
     */
function mysmallcarousel_itemVisibleOutCallback(carousel, item, i, state, evt)
{
    carousel.remove(i);
};
    
    
/**
     * 为了定义列表能够循环, 将大图中可见的部分加入到视图中间去
     */
function mybigcarousel_itemVisibleInCallback(carousel, item, i, state, evt)
{
    // The index() method calculates the index from a
    // given index who is out of the actual item range.
    var idx = carousel.index(i, mybigcarousel_itemList.length);
    //更新大图的主题	
    showBigcarousel_title(mybigcarousel_itemList[idx - 1]);
    carousel.add(i, mybiglcarousel_getItemHTML(mybigcarousel_itemList[idx - 1]));
};
      

/**
      * 将不可见的部分从大图中删除
      */  
function mybigcarousel_itemVisibleOutCallback(carousel, item, i, state, evt)
{
    carousel.remove(i);
}
	
    
      
/**
      * 当鼠标移到小图上面的时候, 或者点击前进或者后退按钮的时候, 自动被删除掉，同时大图的自动也相应的被删除
      */ 
function mycarousel_initCallback(carousel)
{
    // Disable autoscrolling if the user clicks the prev or next button.
    carousel.buttonNext.bind('click', function() {
        carousel.startAuto(0);
        //禁止大图
        startBigNextButton();
    });
    carousel.buttonPrev.bind('click', function() {
        carousel.startAuto(0);
        //禁止大图
        startBigPrevButton();
    });
    // Pause autoscrolling if the user moves with the cursor over the clip.
    carousel.clip.hover(function() {
        carousel.stopAuto();
        //禁止大图
        stopBigAuto();
    }, function() {
        carousel.startAuto();
        //禁止大图
        startBigAuto();
    });
	     
    //定义小图的函数，大图可以调用
    stopSmallAuto=function(){
        carousel.stopAuto();
    }
	     
    startSmallAuto = function(){
        carousel.startAuto();
    }
	     
    startSmallNextButton = function(){
        carousel.startAuto(0);
    }
	     
    startSmallPrevButton = function(){
        carousel.startAuto(0);
    }
};
	 
/**
	  * 小图设置成, 竖排
	  * 每次移动一个位置
	  * 每4秒移动一次
	  * 动画时间为1秒
	  * 循环移动
	  * 
	  */
jQuery('#mycarousel').jcarousel({
    vertical: true,
    scroll: 1,
    auto: 4,
    wrap: 'circular',
    animation: 1000,
    buttonNextHTML:null,
    buttonPrevHTML:null,
    initCallback: mycarousel_initCallback,
    itemVisibleInCallback: {
        onBeforeAnimation: mysmallcarousel_itemVisibleInCallback
    },
    itemVisibleOutCallback: {
        onAfterAnimation: mysmallcarousel_itemVisibleOutCallback
    }
	         
});
	 
/**
	  * 定义大图的初始函数，或者点击前进或者后退按钮的时候, 自动被删除掉，同时小图的自动也相应的被删除
	  */
function mybigcarousel_initCallback(carousel)
{
    // Disable autoscrolling if the user clicks the prev or next button.
    carousel.buttonNext.bind('click', function() {
        carousel.startAuto(0);
        //禁止小图的自动
        startSmallNextButton();
    });
    carousel.buttonPrev.bind('click', function() {
        carousel.startAuto(0);
        //禁止小图的自动
        startSmallPrevButton();
    });
    // Pause autoscrolling if the user moves with the cursor over the clip.
    carousel.clip.hover(function() {
        carousel.stopAuto();
        //禁止小图的自动
        stopSmallAuto();
    }, function() {
        carousel.startAuto();
        //开始小图的自动
        startSmallAuto();
    });
	     
    //定义大图的函数, 小图可以调用
    stopBigAuto = function(){
        carousel.stopAuto();
    }
	     
    startBigAuto = function(){
        carousel.startAuto();
    }
	     
    startBigNextButton = function(){
        carousel.startAuto(0);
    }
	     
    startBigPrevButton  = function(){
        carousel.startAuto(0);
    }
	     
}; 
	 
//定义大图的框, 每次移动一个图的位置,  每4秒移动一次,  循环,  并且定制弹动的效果
jQuery('#mybigcarousel').jcarousel({
    scroll: 1,
    auto: 4,
    wrap: 'circular',
    buttonNextHTML:null,
    buttonPrevHTML:null,
    initCallback: mybigcarousel_initCallback,
    easing: 'BounceEaseOut',
    animation: 1000,
    itemVisibleInCallback: {
        onBeforeAnimation: mybigcarousel_itemVisibleInCallback
    },
    itemVisibleOutCallback: {
        onAfterAnimation: mybigcarousel_itemVisibleOutCallback
    }
});
	 
//定义大图的弹动效果
jQuery.easing['BounceEaseOut'] = function(p, t, b, c, d) {
    if ((t/=d) < (1/2.75)) {
        return c*(7.5625*t*t) + b;
    } else if (t < (2/2.75)) {
        return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
    } else if (t < (2.5/2.75)) {
        return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
    } else {
        return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
    }
};
		
		
	
//当用户点击食客评论的时候, 默认显示两条
customerdefaultcomments = function(){
		 
    //得到餐厅的id
    var restaurantid = $("#restaurantid").val(); 
		
    $.ajax({
        type: "POST",   
        url: _context+"/restaurantmain-getRestDefComments.html",
        dataType:"json",
        data : {
            restaurantid:restaurantid
        },
        success: function(json)
        { 	
            var comments = json.restcomments;
            var html = '';
            var html1 = '';
            $("#commentlist").find('.comment_item').remove();
            for(var i=0; i<comments.length; i++){
					 
                html  = ' <div class="comment_item" >'+
                '<div class="comment_item_pic"><div style="cursor:pointer;" onclick="javascript:intoCustomerCenter2('+comments[i].customerid+');"><img src="'+comments[i].headpicpath+'" width="93" height="95" border="0" onerror="this.src=\''+_context+'/images/comments/member_pic.jpg\';"/></div>';
                if(_loginid == '' || _loginid != comments[i].customerid){
                    html += '<div class="blueFont"><a onclick="javascript:clkSendMessage(this, '+comments[i].customerid+');">发消息</a><a onclick="javascript:clkSendInvite(this, '+comments[i].customerid+');">发邀请</a></div><div class="writeMassage" style="display:none;">'+
                    '<p class="writeMassageT"><a class="close" onclick="javascript:closedlg(this);"></a></p>'+
                    '<div class="writeMassageM">'+
                    '<p class="gray"><b>to:</b><span name="tofriendname">'+comments[i].customername+'</span></p>'+
                    '<textarea name="messagecontenttext"></textarea>'+
                    '<p><span name="errormsg" style="float:left;margin-left:10px;display:none;color:red;"></span><a class="smallBtn right" onclick="javascript:sendmessage(this, '+comments[i].customerid+', \''+comments[i].customeremail+'\');">发送</a><span class="clear"></span></p>'+
                    '</div>'+
                    '<p class="writeMassageB"></p>'+
                    '</div><div class="writeMassage" style="display:none;">'+
                    '<p class="writeMassageT"><a class="close" onclick="javascript:closedlg(this);"></a></p>'+
                    '<div class="writeMassageM">'+
                    '<p class="gray"><b>to:</b><span name="tofriendname">'+comments[i].customername+'</span></p>'+
                    '<textarea name="messagecontenttext"></textarea>'+
                    '<p><span name="errormsg" style="float:left;margin-left:10px;display:none;color:red;"></span><a class="smallBtn right" onclick="javascript:sendinvite(this, '+comments[i].customerid+', \''+comments[i].customeremail+'\');">邀请</a><span class="clear"></span></p>'+
                    '</div>'+
                    '<p class="writeMassageB"></p>'+
                    '</div>';
                }
                html += '</div>'+
                '<div class="comment_item_content">'+
                '<div class="comment_top">'+
                '<p>'+comments[i].customername+'发表于：<span>'+comments[i].commentdate+'</span><a href="'+_context+'/custcommcontroller-getPageAllCommentsByCustid.html&customerid='+comments[i].customerid+'">（查看'+comments[i].customername+'的所有评论）</a>'+	                          
                '<a href="javascript:void(0)" onclick="javascript:viewreplyComment('+i+', '+comments[i].commentid+');" style="width:80px;">跟帖(<span id="replycnt'+i+'">'+comments[i].replycommcnt+'</span>)</a>'+
                '</p>'+                 
                '</div>'+
                '<div class="comment_body">'+
                '<br/>';
					 
                if(comments[i].qualityofservice == 0){
                }else{
                    html +=  '<div class="comment_star">'+
                    '<div class="comment_star_bg">'+
                    '<div class="comment_star_body">'+
                    '<p>服　　务：';
					 
					 
                    /*html +=	'&nbsp;<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
											'<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
											'<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
											'<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
											'<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
				         }else*/ if(comments[i].qualityofservice < 1.5 && comments[i].qualityofservice >0){
                        html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                    }else if(comments[i].qualityofservice >= 1.5 && comments[i].qualityofservice < 2){
                        html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s05.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                    }else if(comments[i].qualityofservice >= 2 && comments[i].qualityofservice < 2.5){
                        html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                    }else if(comments[i].qualityofservice >= 2.5 && comments[i].qualityofservice < 3){
                        html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s05.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                    }else if(comments[i].qualityofservice >= 3 && comments[i].qualityofservice < 3.5){
                        html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                    }else if(comments[i].qualityofservice >= 3.5 && comments[i].qualityofservice < 4){
									
                        html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s05.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                    }else if(comments[i].qualityofservice >= 4 && comments[i].qualityofservice < 4.5){
				                			
                        html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                    }else if(comments[i].qualityofservice >= 4.5 && comments[i].qualityofservice < 5){
									
                        html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s05.gif" width="15" height="15" />';
                    }else if(comments[i].qualityofservice == 5){
                        html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />';
                    }
                    html += '</p><p>口　　味：';
                    /*if(comments[i].recommendedindex == 0){
				        	  html +=	'&nbsp;<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
										'<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
										'<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
										'<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
										'<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
			               }else*/ if(comments[i].recommendedindex < 1.5 && comments[i].recommendedindex >0){
                        html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                    }else if(comments[i].recommendedindex >= 1.5 && comments[i].recommendedindex < 2){
                        html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s05.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                    }else if(comments[i].recommendedindex >= 2 && comments[i].recommendedindex < 2.5){
                        html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                    }else if(comments[i].recommendedindex >= 2.5 && comments[i].recommendedindex < 3){
                        html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s05.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                    }else if(comments[i].recommendedindex >= 3 && comments[i].recommendedindex < 3.5){
                        html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                    }else if(comments[i].recommendedindex >= 3.5 && comments[i].recommendedindex < 4){
								
                        html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s05.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                    }else if(comments[i].recommendedindex >= 4 && comments[i].recommendedindex < 4.5){
                        html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                    }else if(comments[i].recommendedindex >= 4.5 && comments[i].recommendedindex < 5){
								
                        html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s05.gif" width="15" height="15" />';
                    }else if(comments[i].recommendedindex == 5){
                        html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />';
                    }
                    html +='</p><p>环　　境：';
                    /*if(comments[i].environment == 0){
									 html += '&nbsp;<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
											'<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
											'<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
											'<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
											'<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
				                		}else*/ if(comments[i].environment < 1.5 && comments[i].environment >0){
                        html +=	'&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                    }else if(comments[i].environment >= 1.5 && comments[i].environment < 2){
                        html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s05.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                    }else if(comments[i].environment >= 2 && comments[i].environment < 2.5){
                        html +='&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                    }else if(comments[i].environment >= 2.5 && comments[i].environment < 3){
                        html +='&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s05.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                    }else if(comments[i].environment >= 3 && comments[i].environment < 3.5){
                        html +='&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                    }else if(comments[i].environment >= 3.5 && comments[i].environment < 4){
									
                        html +='&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s05.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                    }else if(comments[i].environment >= 4 && comments[i].environment < 4.5){
                        html +='&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                    }else if(comments[i].environment >= 4.5 && comments[i].environment < 5){
									
                        html +='&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s05.gif" width="15" height="15" />';
                    }else if(comments[i].environment == 5){
                        html +='&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />';
                    }
                    html += '</p><p>总体评价：';
                    /*if(comments[i].overall == 0){
						        	  html +=	'&nbsp;<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
												'<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
												'<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
												'<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
												'<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
					               }else */if(comments[i].overall < 1.5 && comments[i].overall >0){
                        html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                    }else if(comments[i].overall >= 1.5 && comments[i].overall < 2){
                        html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s05.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                    }else if(comments[i].overall >= 2 && comments[i].overall < 2.5){
                        html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                    }else if(comments[i].overall >= 2.5 && comments[i].overall < 3){
                        html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s05.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                    }else if(comments[i].overall >= 3 && comments[i].overall < 3.5){
                        html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                    }else if(comments[i].overall >= 3.5 && comments[i].overall < 4){
										
                        html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s05.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                    }else if(comments[i].overall >= 4 && comments[i].overall < 4.5){
                        html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                    }else if(comments[i].overall >= 4.5 && comments[i].overall < 5){
										
                        html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s05.gif" width="15" height="15" />';
                    }else if(comments[i].overall == 5){
                        html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />';
                    }
						          
                    html += '</p><p>推荐指数：';
                    /*if(comments[i].recommrate == 0){
						        	  html +=	'&nbsp;<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
												'<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
												'<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
												'<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
												'<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
					               }else */if(comments[i].recommrate < 1.5 && comments[i].recommrate >0){
                        html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                    }else if(comments[i].recommrate >= 1.5 && comments[i].recommrate < 2){
                        html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s05.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                    }else if(comments[i].recommrate >= 2 && comments[i].recommrate < 2.5){
                        html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                    }else if(comments[i].recommrate >= 2.5 && comments[i].recommrate < 3){
                        html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s05.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                    }else if(comments[i].recommrate >= 3 && comments[i].recommrate < 3.5){
                        html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                    }else if(comments[i].recommrate >= 3.5 && comments[i].recommrate < 4){
										
                        html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s05.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                    }else if(comments[i].recommrate >= 4 && comments[i].recommrate < 4.5){
                        html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                    }else if(comments[i].recommrate >= 4.5 && comments[i].recommrate < 5){
										
                        html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s05.gif" width="15" height="15" />';
                    }else if(comments[i].recommrate == 5){
                        html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                        '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />';
                    }
                    html +='</p></div></div></div>';
                }
                html += '<p style="font-size:14px;line-height:22px;padding-left:15px;text-indent:20px">'+comments[i].comment+'</p><div style="clear:both"></div></div><div style="clear:both"></div><div class="comment_bt"></div></div><div style="clear:both"></div>';
                html += '<div id="commentitem_'+i+'" style="display:none;float:right;width:630px; *width:620px;"></div></div>';
                html1 += html;
            }	
				
            //将返回的结果放回到评论列表中间去

            if(comments.length > 0){
                $("#commentlist").prepend(html1);
            }else{
                $("#commentlist").prepend('<div class="comment_item">'+
                    '<div class="comment_item_pic" style="display:none"></div>'+
                    '<div class="comment_item_content">'+
                    '<div class="comment_top">'+
                    '<p><span style="font-size:20px">暂无评论</span>'+
                    '</p>'+
                    '</div>'+
                    '<div class="comment_body">'+
                    '<br/>'+
                    '</div>'+
                    '<div style="clear:both"></div>'+
                    '<div class="comment_bt"></div>'+
                    '</div>'+
                    '<div style="clear:both"></div>'+ 
                    '</div>');
            }
				
            //餐厅环境
            var totalenvironment = json.environment;
				
            //餐厅菜的口味
            var totaltaste = json.recommendedindex;
				
            //餐厅的总体评价
            var totaloverall = json.overall;
				
            //餐厅的推荐指数
            var totalrecommrate = json.recommrate;
				
            //餐厅服务
            var qualityofservice = json.qualityofservice;
								
            //参与评论的人数
            var totalcommentcnts = json.commentcnts;
				
            //参与打分的人数
            var totalcnt = json.cnt;
				
            //总的得分
            var totalscores = json.totalscores;
				
            //参与评论的人数
            $(".totalcommentcnt").html('参与评论的人数:<span style="font-family:Georgia,Helvetica,Arial;color:#999999;font-size:16px">'+totalcommentcnts+'</span>');
				
            //参与打分的人数
            $(".totalcnt").html('餐后打分的人数:<span style="font-family:Georgia,Helvetica,Arial;color:#999999;font-size:16px">'+totalcnt+'</span>');
            //总共的评论条数
            $("#allcomments").html(json.allcomments);
				
            if(totalscores == '0'){
                $("#totalscoresdiv").hide();
            }else{
                //餐厅菜的口味
                $(".totaltaste").html('口　　味：'+getStarfromcomment(totaltaste));
					
                //餐厅服务
                $(".qualityofservice").html('服　　务：'+getStarfromcomment(qualityofservice));
					
                //餐厅环境
                $(".totalenvironment").html('环　　境：'+getStarfromcomment(totalenvironment));
					
                //总的评价
                $(".totaloverall").html('总体评价：'+getStarfromcomment(totaloverall));
					
                //总的推荐指数
                $(".totalrecommrate").html('推荐指数：'+getStarfromcomment(totalrecommrate));
	
                //总的得分
                $(".totalscores").html(totalscores);
                $("#totalscoresdiv").show();
            }
            //判断更多链接是否显示
            var more = json.more;
				
            if(more == true){
                $("#more").show();
            }else{
                $("#more").hide();
            }
				
        }
    });		
}
	
	
//点击更多评论, 分页显示所有评论数据
morecomments = function(){
    //得到页数
    var pageno = $("#pageno").val();
		
    //得到餐厅的id
    var restaurantid = $("#restaurantid").val(); 
		
    $.ajax({
        type: "POST",   
        url: _context+"/restaurantmain-getpagelist.html",
        dataType:"json",
        data : {
            pageno:pageno, 
            restaurantid:restaurantid
        },
        success: function(json)
        { 	
            var comments = json.restcomments;
            var html = '';
            var html1 = '';
            $("#commentlist").html('');
            for(var i=0; i<comments.length; i++){
					 
					 
                html  = ' <div class="comment_item">'+
                '<div class="comment_item_pic"><img src="'+_context+'/images/comments/member_pic.jpg" width="93" height="95" border="0"/></div>'+
                '<div class="comment_item_content">'+
                '<div class="comment_top">'+
                '<p >'+comments[i].customername+'发表于：<span>'+comments[i].commentdate+'</span><a href="javascript:intoCustomerComment('+comments[i].customerid+')">（查看'+comments[i].customername+'的所有评论）</a>'+
                '</p>'+
                '</div>'+
                '<div class="comment_body">'+
                '<br/>'+
                '<div class="comment_star">'+
                '<div class="comment_star_bg">'+
                '<div class="comment_star_body">'+
                '<p>服　　务：'; 
					 
                if(comments[i].qualityofservice == 0){
                    html +=	'&nbsp;<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                }else if(comments[i].qualityofservice < 1.5 && comments[i].qualityofservice >0){
                    html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                }else if(comments[i].qualityofservice >= 1.5 && comments[i].qualityofservice < 2){
                    html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s05.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                }else if(comments[i].qualityofservice >= 2 && comments[i].qualityofservice < 2.5){
                    html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                }else if(comments[i].qualityofservice >= 2.5 && comments[i].qualityofservice < 3){
                    html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s05.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                }else if(comments[i].qualityofservice >= 3 && comments[i].qualityofservice < 3.5){
                    html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                }else if(comments[i].qualityofservice >= 3.5 && comments[i].qualityofservice < 4){
									
                    html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s05.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                }else if(comments[i].qualityofservice >= 4 && comments[i].qualityofservice < 4.5){
				                			
                    html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                }else if(comments[i].qualityofservice >= 4.5 && comments[i].qualityofservice < 5){
									
                    html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s05.gif" width="15" height="15" />';
                }else if(comments[i].qualityofservice == 5){
                    html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />';
                }
                html += '</p><p>口　　味：';
                if(comments[i].recommendedindex == 0){
                    html +=	'&nbsp;<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                }else if(comments[i].recommendedindex < 1.5 && comments[i].recommendedindex >0){
                    html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                }else if(comments[i].recommendedindex >= 1.5 && comments[i].recommendedindex < 2){
                    html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s05.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                }else if(comments[i].recommendedindex >= 2 && comments[i].recommendedindex < 2.5){
                    html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                }else if(comments[i].recommendedindex >= 2.5 && comments[i].recommendedindex < 3){
                    html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s05.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                }else if(comments[i].recommendedindex >= 3 && comments[i].recommendedindex < 3.5){
                    html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                }else if(comments[i].recommendedindex >= 3.5 && comments[i].recommendedindex < 4){
								
                    html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s05.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                }else if(comments[i].recommendedindex >= 4 && comments[i].recommendedindex < 4.5){
                    html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                }else if(comments[i].recommendedindex >= 4.5 && comments[i].recommendedindex < 5){
								
                    html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s05.gif" width="15" height="15" />';
                }else if(comments[i].recommendedindex == 5){
                    html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />';
                }
                html +='</p><p>环　　境：';
                if(comments[i].environment == 0){
                    html += '&nbsp;<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                }else if(comments[i].environment < 1.5 && comments[i].environment >0){
                    html +=	'&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                }else if(comments[i].environment >= 1.5 && comments[i].environment < 2){
                    html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s05.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                }else if(comments[i].environment >= 2 && comments[i].environment < 2.5){
                    html +='&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                }else if(comments[i].environment >= 2.5 && comments[i].environment < 3){
                    html +='&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s05.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                }else if(comments[i].environment >= 3 && comments[i].environment < 3.5){
                    html +='&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                }else if(comments[i].environment >= 3.5 && comments[i].environment < 4){
									
                    html +='&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s05.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                }else if(comments[i].environment >= 4 && comments[i].environment < 4.5){
                    html +='&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                }else if(comments[i].environment >= 4.5 && comments[i].environment < 5){
									
                    html +='&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s05.gif" width="15" height="15" />';
                }else if(comments[i].environment == 5){
                    html +='&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />';
                }
                html += '</p><p>总体评价：';
                if(comments[i].overall == 0){
                    html +=	'&nbsp;<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                }else if(comments[i].overall < 1.5 && comments[i].overall >0){
                    html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                }else if(comments[i].overall >= 1.5 && comments[i].overall < 2){
                    html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s05.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                }else if(comments[i].overall >= 2 && comments[i].overall < 2.5){
                    html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                }else if(comments[i].overall >= 2.5 && comments[i].overall < 3){
                    html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s05.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                }else if(comments[i].overall >= 3 && comments[i].overall < 3.5){
                    html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                }else if(comments[i].overall >= 3.5 && comments[i].overall < 4){
										
                    html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s05.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                }else if(comments[i].overall >= 4 && comments[i].overall < 4.5){
                    html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                }else if(comments[i].overall >= 4.5 && comments[i].overall < 5){
										
                    html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s05.gif" width="15" height="15" />';
                }else if(comments[i].overall == 5){
                    html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />';
                }
						          
                html += '</p><p>推荐指数：';
                if(comments[i].recommrate == 0){
                    html +=	'&nbsp;<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                }else if(comments[i].recommrate < 1.5 && comments[i].recommrate >0){
                    html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                }else if(comments[i].recommrate >= 1.5 && comments[i].recommrate < 2){
                    html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s05.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                }else if(comments[i].recommrate >= 2 && comments[i].recommrate < 2.5){
                    html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                }else if(comments[i].recommrate >= 2.5 && comments[i].recommrate < 3){
                    html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s05.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                }else if(comments[i].recommrate >= 3 && comments[i].recommrate < 3.5){
                    html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                }else if(comments[i].recommrate >= 3.5 && comments[i].recommrate < 4){
										
                    html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s05.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                }else if(comments[i].recommrate >= 4 && comments[i].recommrate < 4.5){
                    html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/kong_03.gif" width="15" height="15" />';
                }else if(comments[i].recommrate >= 4.5 && comments[i].recommrate < 5){
										
                    html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s05.gif" width="15" height="15" />';
                }else if(comments[i].recommrate == 5){
                    html += '&nbsp;<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />&nbsp;'+
                    '<img src="'+_context+'/images/restaurantmain/s1.gif" width="15" height="15" />';
                }
                html +='</p></div></div></div><p style="font-size:14px;line-height:22px;padding-left:15px;text-indent:20px">'+comments[i].comment+'</p><div style="clear:both"></div></div><div style="clear:both"></div><div class="comment_bt"></div></div><div style="clear:both"></div></div>'; 
                html1 += html;
            }	
				
            //将返回的结果放回到评论列表中间去
            //jQuery.trim(html);
            $("#commentlist").html(html1);
            //总的页数
            $("#totalpage").val("");
            $("#totalpage").val(json.totalpage);
            if(json.totalpage > 1){
                $("#pager").pager({
                    pagenumber: pageno, 
                    pagecount: json.totalpage, 
                    buttonClickCallback: PageClick
                });
            }else{
                $("#pager").html('');
            }
        }
    });
}
	
	
PageClick = function(pageclickednumber) {
    var totalpages =  $("#totalpage").val();
    $("#pager").pager({
        pagenumber: pageclickednumber, 
        pagecount: totalpages, 
        buttonClickCallback: PageClick
    });
    $("#pageno").val(pageclickednumber);	       
    morecomments();
}
	
/**
	 * 当大图显示在列表框的时候更新, title 字段
	 */
function showBigcarousel_title(item){
	 
    $("#pictitle").html(item.title);
}
	
function mysmallcarousel_getItemHTML(item)
{	
    return '<li><img src="' + item.url + '" width="100" height="110" title="' + item.title + '" /></li>';
}
	  
function mybiglcarousel_getItemHTML(item)
{
    return '<li><img src="' + item.url + '" width="440" height="380" title="' + item.title + '" /></li>';
}
	  
	  
		
//评论餐厅
commentrestfrommain = function(restaurantid){  

    /* var mark = '';
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
		  
    common = function(){				 
        commentrest(_loginid, restaurantid);
        $("#seatinginfotitle").hide();
        $("#hotratetitle").hide();
        $("#custcommtitle").show();	
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
								
                commentrest(_loginid, restaurantid);
								
                //改变选中以后的样式
                $("#restsheet").removeClass('selsheet');
                $("#restsheet").addClass('unselsheet');
                $("#hotsheet").removeClass('selsheet');
                $("#hotsheet").addClass('unselsheet');
                $("#commsheet").removeClass('unselsheet');
                $("#commsheet").addClass('selsheet');
								
                $("#seatinginfotitle").hide();
                $("#hotratetitle").hide();
                $("#custcommtitle").show();									
								
            }
        }
    }
    );
	 
}
	
	
	  
	  
//点击食客评论
clickcustcomment = function(){
		  
    //改变选中以后的样式
    $("#restsheet").removeClass('selsheet');
    $("#restsheet").addClass('unselsheet');
    $("#hotsheet").removeClass('selsheet');
    $("#hotsheet").addClass('unselsheet');
    $("#commsheet").removeClass('unselsheet');
    $("#commsheet").addClass('selsheet');
		  
    $("#seatinginfotitle").hide();
    $("#hotratetitle").hide();
    $("#custcommtitle").show();
    //触发餐厅食客评论
    //morecomments();
    customerdefaultcomments();
		  
//对mq就行监听, 主要是查看用户和餐厅的回复
//var resmq = $("#restaurantmq").val();
			
//amq.addListener('restreply','queue://restreply', myHandler.rcvMessage);
			
}
	  
//点击详细信息
clickdetailinfo = function(){
    //改变选中以后的样式
    $("#restsheet").removeClass('unselsheet');
    $("#restsheet").addClass('selsheet');
    $("#hotsheet").removeClass('selsheet');
    $("#hotsheet").addClass('unselsheet');
    $("#commsheet").removeClass('selsheet');
    $("#commsheet").addClass('unselsheet');
		  
    $("#seatinginfotitle").show();
    $("#hotratetitle").hide();
    $("#custcommtitle").hide();	  
}
	  
//点击热门指数
clickresthotrate = function(){
		  
    //改变选中以后的样式
    $("#restsheet").removeClass('selsheet');
    $("#restsheet").addClass('unselsheet');
    $("#hotsheet").removeClass('unselsheet');
    $("#hotsheet").addClass('selsheet');
    $("#commsheet").removeClass('selsheet');
    $("#commsheet").addClass('unselsheet');
		  
    $("#seatinginfotitle").hide();
    $("#hotratetitle").show();
    $("#custcommtitle").hide();
		  
    getHotRateByRestid();
		  
}
	  
getHotRateByRestid = function(){
		
    $.ajax({
        type: "POST",   
        url: _context+"/restaurantmain-getHotRateByRestid.html",
        dataType:"json",
        data : {
            restaurantid:restaurantid
        },
        success: function(json)
        {
			  			
            //更新热门指数等信息
				
            //更新消费次数
            $("#restmain_consumpcounts").html(json.consumpcounts);
				
            //更新消费排名
            $("#restmain_consumprk").html(json.consumprk);
				
            //更新评论次数
            $("#restmain_commcounts").html(json.commcounts);
				
            //更新评论排名
            $("#restmain_commrk").html(json.commrk);
				
            //更新收藏次数
            $("#restmain_colcounts").html(json.colcounts);
				
            //更新收藏排名
            $("#restmain_colrk").html(json.colrk);
				
				
            //更新热门指数
            $("#restmain_hotrk").html(json.hotrk);
				
            var hotrk = json.hotrk;
            $("#hotrkpercent").css("width", hotrk*300/100);
			  
        }
    });		  
}
	  
	  
//关闭餐厅评论框
closeCommentRestDialog = function(){
    $("#commentrestdlg").dialog('close');
}
	  
/** ajax 提示*/
$("#disabledZone").ajaxStart(function(){   
    $(this).css('visibility', 'visible'); 
});
			
$("#disabledZone").ajaxStop(function(){   
    ajaxsuggesthide(); 
});
		
		
//改变主menu所处位置
$("#header").find('li').removeClass('current');
		
$("#header").find('li:eq(1)').addClass('current');
		
$("#navigation").find('li').removeClass('current');
$("#navigation").find('li:eq(0)').addClass('current');
		
		
		
//改变登陆样式
if(_loginid != ''){
    changelogsyle();
    //如果已经登录了判断一下是否是该餐厅的会员, 如果是该餐厅的会员, 那么申请会员的按钮将消失
    $.ajax(
    {
        type: "POST",   
        url: _context+"/custcentercontroller-valRestMember.html",
        dataType:"json",
        data : {
            customerid:_loginid, 
            restaurantid:restaurantid
        },
        success: function(json){
            var existed = json.existed;
            if(existed == 'true'){
                $("#liapplymember").hide();	
            }
        }
    });
}else{
    changelogstyle1();
}
		
restlastestscroll = function (element, delay, speed, lineHeight, curline) {
			
    var numpergroup;
    if($.browser.msie){			
        numpergroup = 7;			
    }else{
        numpergroup = 8;			
    }
    if(curline <= numpergroup){
        return;
    }
    var slideBox = (typeof element == 'string')?document.getElementById(element):element;   
    var delay1 = delay||1000;   
    var speed1=speed||20;   
    var lineHeight1 = lineHeight||22;   
    var tid = null, pause = false;   
    var liLength = slideBox.getElementsByTagName('li').length;   
    var lack = numpergroup-liLength%numpergroup;   
    for(i=0;i<lack;i++){   
        slideBox.appendChild(document.createElement("li"));   
    }   
    var start = function() {   
        tid=setInterval(slide, speed1);   
    }   
    var slide = function() {   
        if (pause) return;   
        slideBox.scrollTop += 2;   
        if ( slideBox.scrollTop % lineHeight1 == 0 ) {   
            clearInterval(tid);   
            for(i=0;i<numpergroup;i++){   
                slideBox.appendChild(slideBox.getElementsByTagName('li')[0]);   
            }   
            slideBox.scrollTop = 0;   
            setTimeout(start, delay1);   
        }   
    }   
    slideBox.onmouseover=function(){
        pause=true;
    }   
    slideBox.onmouseout=function(){
        pause=false;
    }   
    setTimeout(start, delay1);   
}
		
//将用户的最新订单拿回来显示
$.ajax(
{
    type: "POST",   
    url: _context+"/restaurantmain-getRestLastestOrders.html",
    dataType:"json",
    data : {
        restaurantid:restaurantid
    },
    success: function(json){
						
        var restaurantorders  = json.restaurantorders;
        var length1 = restaurantorders.length;
						
        if(length1 > 0){
            var html1 = ''; 
            for(var j=0; j<length1; j++){		
                html1 += '<li><span  style="width:50px;">'+restaurantorders[j].phone+'</span>&#x3000;<span style="margin-left:50px;width:100px;">'+restaurantorders[j].username+'</span><span style="margin-left:100px;">'+restaurantorders[j].orderdate+'</span></li>'; 									
							
									
            }												
            $("#restlastestorders").html(html1);
            restlastestscroll('restlastestorders', 5000, 1, 22, length1);												
        }else{												
            $("#restlastestorders").html('<li><span>暂无最新订单</span></li>')
        }
    
    }
});
});
