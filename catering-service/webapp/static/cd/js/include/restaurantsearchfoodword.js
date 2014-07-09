$(document).ready(function() {
	
	var highlightindex = -1;
	var timeoutId;	
	$("#searchword").blur(function(){		
		$("#rest_search_suggest").hide();
	});
	
	$("#searchword").keyup(function(event){

		//添加键盘按下并弹起的事件
        //处理文本框中的键盘事件
        var myEvent = event||window.event;
        var keyCode = myEvent.keyCode;
        //如果输入的是字母，退格，delete，空格或者数字键，应该将文本框中的最新信息发送给服务器,其中，空格键和数字键的加入使得输入中文也能支持~~
        if((keyCode >= 65 && keyCode<=90) || (keyCode >= 48 && keyCode <= 57) ||(keyCode>=96 && keyCode<=105) || keyCode == 46 || keyCode == 8 || keyCode == 32){            
            //获取文本框的内容
            var wordText = jQuery.trim($("#searchword").val());
            var autoNode = $("#rest_search_suggest");
            if(wordText !='' && wordText.length > 0){//2009.6.7 UPDATE：之前在这加上了退格与delete的keyCode的判断，实际上是没有必要的。
				
            	/*var bval = doValidate(wordText);
            	if(bval == false){ 
            		return;
            	}*/
            	
                //将文本框中的内容发送到服务器端
                //对上次未完成的延时操作进行取消
                clearTimeout(timeoutId);
                //对于服务器端进行交互延迟500ms，避免快速打字造成的频繁请求
                timeoutId = setTimeout(function(){
                	$.ajax({type: "POST",   
							url: _context+"/search.do?method=getIndexRestfoods",
							data : {word:wordText, restaurantname:restaurantname, cityname:cityname},
							dataType:"json",
							success: function(json)
							{
                				var wordNodes  = json.words;
                				autoNode.html(" ");
                				var htmlContent = '<ul style="width:200px;">';
                				for(var m=0; m<wordNodes.length; m++){
                				//新建div节点将单词内容加入到新建的节点中,将新建的节点加入到弹出框的节点中
                					htmlContent += '<li style="font-size:12px;font-weight:normal;" id='+m+' onclick="javascript:selRestFoodWord('+m+')" onmouseover="javascript:mouseOverRestFood(this);" onmouseout="javascript:mouseOutRestFood(this);"><div class="result_food_name" id="indexrestfoodword'+m+'">'+wordNodes[m].foodword+'</div></li>'
                             	};
                             	htmlContent += '</ul>';                            	
                             	autoNode.html(htmlContent);	 	
                             	//如果服务器端有数据返回，则显示弹出框
                               if(wordNodes.length>0){
	                        	   autoNode.show();
	                           }else {
	                               	autoNode.hide();
	                                highlightindex=-1;
	                           } 
							}});									
                },	250);          
            }else{
                	autoNode.hide();
                	highlightindex=-1;
           }
        } else if(keyCode == 38 || keyCode==40){
            //如果输入的是向上38向下40按键
            if(keyCode == 38){
                //up
                var autoNodes = $("#rest_search_suggest").children("ul");
                autoNodes = autoNodes.children("li");
                if(highlightindex !=-1)
                {
                    autoNodes.eq(highlightindex).css("background-color","#EEEEEE");
                    highlightindex--;
                }else{
                    highlightindex = autoNodes.length -1;
                }
                
                if(highlightindex == -1){
                    //如果修改索引值以后index变成-1，则将索引中指向最后一个元素
                    highlightindex = autoNodes.length -1;
                }
               //让现在被高亮的内容变成黄色
                autoNodes.eq(highlightindex).css("background-color","#F8DA44");
            }
            if(keyCode == 40){
                //down
                var autoNodes1 = $("#rest_search_suggest").children("ul");
                autoNodes1 = autoNodes1.children("li");
                
                if(highlightindex !=-1 && highlightindex != autoNodes1.length)
                {
                	autoNodes1.eq(highlightindex).css("background-color","#EEEEEE");
                	highlightindex++;
                }
               
                if(highlightindex == -1){
                   //如果修改索引值以后index变成-1，则将索引中指向最后一个元素
                    highlightindex = 0;
                }
                
                if(highlightindex == autoNodes1.length){
                    //如果修改索引值以后index变成-1，则将索引中指向最后一个元素
                     highlightindex = 0;
                 }
                
                //让现在被高亮的内容变成黄色
                autoNodes1.eq(highlightindex).css("background-color","#F8DA44");
            }
            
        }else if(keyCode == 13){  //如果按下的是回车
                     
            //下拉框有高亮的内容
            if(highlightindex !=-1)
            {
                var comText = $("#rest_search_suggest").hide().find('li').eq(highlightindex).find('div').html();
                highlightindex=-1;
                $("#searchword").val(comText); //将文本框内容改成选中项
                //$("form:first").submit(false); //提交form。若没有这句话，按下回车后，仅仅只改变了文本框里的内容，但是由于form本身就监控了回车按键默认为submit，提交的是文本框改变之前的内容，解决这个问题最简单的方式就是在文本框内容改变以后强制提交form的内容，此时，提交的内容就是选中项。
                var searchword = $("#searchword").val();
                $("form:eq(0)").attr("action", _context+"/orderfood-getRestaurantWordSearch.html&restaurantid="+restaurantid+"&searchword="+encodeURI(encodeURI(searchword))+"&restaurantname="+encodeURI(encodeURI(restaurantname)));
        		$("form:eq(0)").removeAttr("target");
        		$("form:eq(0)").attr("method", "post");
            	$("form:eq(0)").submit();
            } //下拉框没有高亮的内容
            else{   
                $("#rest_search_suggest").hide();
               //让文本框失去焦点
                $("#searchword").get(0).blur();
                
                if($("#searchword").val() != ''){
                	var searchword = $("#searchword").val();
                	$("form:eq(0)").attr("action", _context+"/orderfood-getRestaurantWordSearch.html&restaurantid="+restaurantid+"&searchword="+encodeURI(encodeURI(searchword))+"&restaurantname="+encodeURI(encodeURI(restaurantname)));
            		$("form:eq(0)").removeAttr("target");
            		$("form:eq(0)").attr("method", "post");
                	$("form:eq(0)").submit();
                }
            }
        }
        
	});
	
	 /**
     * 鼠标移到上面
     */
	mouseOutRestFood=function(obj){
		 $(obj).css("background-color","#EEEEEE");		
	}
	
	/**
	 * 鼠标移出
	 */
	mouseOverRestFood=function(obj){
		
		//首先将所有的背景为黄色的都去掉
			$("#rest_search_suggest ul").find('li').each(function(){
				$(this).css("background-color","#EEEEEE");		
			});
			
         highlightindex = $(obj).attr("id");
         $(obj).css("background-color","#F8DA44");	
	}
    
	/**
	 * 选择一条记录
	 */
	selRestFoodWord = function(m){
		 
		
         $("#searchword").val($("#indexrestfoodword"+m).text());
         $("#rest_search_suggest").hide();
         var searchword = $("#searchword").val();
         
	     $("form:eq(0)").attr("action", _context+"/orderfood-getRestaurantWordSearch.html&restaurantid="+restaurantid+"&searchword="+encodeURI(encodeURI(searchword))+"&restaurantname="+encodeURI(encodeURI(restaurantname)));
	 	 $("form:eq(0)").removeAttr("target");
	 	 $("form:eq(0)").attr("method", "post");
	     $("form:eq(0)").submit();
    }
});