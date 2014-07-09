/**
 *
 * @param entreeId
 * @param obj
 */
function selSearchRestEntreeType(entreeId, obj){
    $("#loadallentreetype dd").removeClass("selected");
    //如果是全部
    if (entreeId == '') {
        entreeId = 0;
        $("#selallentreetypecls").addClass("selected");
    }
    else {
        $("#selallentreetypecls").removeClass("selected");
        $(obj).addClass("selected");
    }

    processData({});
}


/**
 *
 * @param id
 * @param name
 * @param obj
 */
function selSearchRestArea(areaId, name, obj){
    $("#loadallareas dd").removeClass("selected");
    //如果是全部
    if (areaId == '') {
        areaId = 0;
        $("#selallareascls").addClass("selected");
    }
    else {
        $("#selallareascls").removeClass("selected");
        $(obj).addClass("selected");
    }
    processData({});
}


/**
 *
 * @param tag
 * @param obj
 */
function selSearchRestQuarter(tag, obj){
    $("#loadallquarters dd").removeClass("selected");
    //选择全部
    if (tag == '') {
        $("#selallquarterscls").addClass("selected");
    }
    else {
        $("#selallquarterscls").removeClass("selected");

        $(obj).addClass("selected");
    }

    processData({});
}

/**
 * 分页
 * @param size
 * @param obj
 */
function selectRestSearchPageSize(obj){
    $.each($("#orderby a"), function(i, item){
        $(item).removeClass("current");
    });
    $(obj).addClass("current");

    processData({});
}

function sortsearchrest(type , obj){
    var img = $(obj).next('img');
    var src = $(img).attr('src');
    var baseUrl = src.substring(0,src.lastIndexOf('/') + 1);
    var imgName = src.substring(src.lastIndexOf('/') + 1);
    var url = baseUrl;

    $.each($("#paixu a"), function(i,item){
        $(item).attr('sort','');
    });

    if(imgName == 'sort.gif' || imgName == 'sort-up.gif'){
        url += 'sort-down.gif';
        $(obj).attr('sort','desc');
    }else{
        url += 'sort-up.gif';

        $(obj).attr('sort','asc');
    }
    $(img).attr('src', url);

    $(obj).attr('id') == 'pricesort' ? $("#evaluatesort").next('img').attr('src',baseUrl + 'sort.gif')
        : $("#pricesort").next('img').attr('src',baseUrl + 'sort.gif');

    processData({});
}

/**
 * 包括所的条件和排序
 * @param param
 */
function processData(param){

    $.each($(".selected"), function(i, item){
        var key = $(item).attr('name');
        var value = $(item).attr('value');
        if(key){
            if(key == 'entreeId')
            {
                param.entreeId = value;
            }else if(key == 'areaId'){
                param.areaId = value;
            }else{
                param.tag = value;
            }
        }
    });

    $.each($("#orderby a"), function(i, item){
        if($(item).attr('class') == 'current'){
            param['page.size'] = $(item).attr('size');
        }
    });

    $.each($("#paixu a"), function(i,item){
        var sort = $(item).attr('sort');
        if(sort){
            if($(item).attr('type') == 'evaluate'){
                param['page.sort']  = 'evaluate';
            }else if($(item).attr('type') == 'price'){
                param['page.sort'] ='axfMin';
            }
            param['page.sort.dir'] = sort;
        }
    });


    param.number = Math.random();

    $.ajax({
        url: _param.ctx + 'company/ajaxGetAll',
        type: 'get',
        dataType:'json',
        data: param,
        success: function (data) {
            $("#pager").html('');
            $("#item_lists").html('')/*.css('top','1000px')*/;
            if (data.content.length > 0) {
                var html = '';
                for(var i=0; i< data.content.length; i++){
                    var item = data.content[i];
                    html += '<div class="item">'
                        + '<div class="item_title">'
                        + '     <div style="float:left;height:23px;line-height:23px;margin-top:7px">'
                        + '         <a class="food_name" target="_blank" href="#">'+ item.name +'</a>'
                        + '     </div>'
                        + ' <ul>'
                        + '     <li class="favor"><span>10人收藏</span></li>'
                        + '     <li class="consumption"><span>10人消费</span></li>'
                        + ' </ul>'
                        + '</div>'
                        + '<div class="item_con">'
                        + ' <div class="item_pic">'
                        + '     <a target="_blank" href="#">'
                        + '         <img src="' + item.showImg + '" onerror="this.src='+ _param.ctx +'\'/static/cd/images/no_pic.jpg\'" width="130" height="120" border="0"></a>'
                        + '     </div>'
                        + '     <div class="description">'
                        + '         <span>主打菜系：</span>' + item.entreeType.name + '<br/>'
                        + '         <span>简介:</span>' + item.summary + '<br/>'
                        + '         <span>地址：</span>' + item.address + '<br/>'
                        + '         <span>其他信息：</span>' + item.remark
                        + '         </div>'
                        + '         <div class="price_area">'
                        + '             <b>人均消费:</b><span>￥' + item.axfMin +'~￥' + item.axfMax + '</span><br>'
                        + '             <b>折扣范围:</b><span>9.0折~9.5折</span>'
                        + '         </div>'
                        + '             <div class="clear"></div>'
                        + '         </div>'
                        + '         <div class="item_bottom">'
                        + '             <div class="wjx" onmouseover="javascript:mouseoverRestComment(\'3849045\', 0);" onmouseout="javascript:mouseoutRestComment(0)">'
                        + '                 <span class="stars star9"></span><em class="vam f15">4.5</em>'
                        + '                    <div class="evaluate" id="evalate_comment0" style="display:none"></div>'
                        + '             </div>'
                        + '             <div class="auto_dining" onclick="javascript:autoOrderFood(3849045);"></div>'
                        + '                   <div class="dining" onclick="javascript:intoOrderPage(3849045, \'润湘之(延安西路店)\');"></div>'
                        + '             </div>'
                        + '             <div style="clear:both"></div>'
                        + '                 <div class="itemFoot">'
                        + '                     <div class="footShdw">'
                        + '                           <div class="drawFootHead">'
                        + '                     </div>'
                        + '                     <div class="drawFootContent">'
                        + '                         <ul>'
                        + '                             <li class="left_button">'
                        + '                                <div class="details"><a target="_blank" href="/restaurantmain-loadpage.html&amp;restaurantid=3849045">详细信息</a></div>'
                        + '                                <div class="comments"><a target="_blank" href="/custcommcontroller-getPageRestAllComments.html&amp;restaurantid=3849045">点评</a></div>'
                        + '                                <div class="favor"><a href="javascript:colFavoriteRest(3849045)">收藏</a></div>'
                        + '                             </li>'
                        + '                         </ul>'
                        + '                      </div>'
                        + '                 </div>'
                        + '           </div>'
                        + ' </div>';
                }

                $("#item_lists").fadeIn(600).append(html);
            } else {
                $("#item_lists").fadeIn(600).append('<h3>很抱歉，没有找到记录！</h3>');
            }


            var pager = getPager(data, 10);
            $("#pager").html(pager);
            /*$("#item_lists").animate({top:'70px'}, function(){
                $('#lists_content').height($(this).height() + 70);
            });*/
        }
    });
}




function getPager(data, paginationSize){
    var pager = '';
    if(data.totalPages > 0){
        var current =  data.number + 1;
        var begin = Math.max(1, current - paginationSize/2);
        var end = Math.min(begin + (paginationSize - 1), data.totalPages);
        var sortType = 'id';
        var order = 'asc';
        var searchParams = '';




        pager += '<div class="pagination pagination-centered">'
              +  '<ul>';
        if(data.number > 0){
            pager += '<li><a href="javascript:processData({\'page.page\':'+current+'})">First</a></li>'
                  + '<li><a href="javascript:processData({\'page.page\':'+(current-1)+'})">Previous</a></li>';
        }else{
            pager += '<li class="disabled"><a href="javascript:void(0)">First</a></li><li class="disabled"><a href="javascript:void(0)">Previous</a></li>';
        }

        for(var i=begin; i<=end; i++){
            if(i == current){
                pager += '<li class="active"><a href="javascript:processData({\'page.page\':'+i+'})">'+i+'</a></li>';
            }else{
                pager += '<li><a href="javascript:processData({\'page.page\':'+i+'})">'+i+'</a></li>';
            }
        }
        if((data.number + 1) < data.totalPages){
            pager += '<li><a href="javascript:processData({\'page.page\':'+(current+1)+'})">Next</a></li>'
                  +  '<li><a href="javascript:processData({\'page.page\':'+data.totalPages+'})">Last</a></li>';
        }else{
            pager += '<li class="disabled"><a href="javascript:void(0)">Next</a></li><li class="disabled"><a href="javascript:void(0)">Last</a></li>';
        }
        pager += '</ul></div>';
    }
    return pager;
}


