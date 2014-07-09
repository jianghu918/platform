    <%--
  Created by IntelliJ IDEA.
  User: hu
  Date: 13-9-5
  Time: 下午3:16
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="tags" tagdir="/WEB-INF/tags" %>
<c:set value="${pageContext.request.contextPath}" var="ctx" />

<%@ include file="../common/search.jsp"%>
<%@ include file="../common/myCenter.jsp"%>

<script type="text/javascript" src="${ctx}/static/cd/js/uiInteraction/uiInteraction.js" ></script>

<script>
    $(document).ready(function(){
        if(${!empty param.entreeId}){
            $("#selallentreetypecls").removeClass("selected");
            $("#loadallentreetype dd").each(function(index, domEle){
                if($(domEle).attr('value') == '${param.entreeId}')
                {
                    $(domEle).addClass("selected");
                }
            });
        }

        if(${!empty param.areaId}){
            $("#selallareascls").removeClass("selected");
            $("#loadallareas dd").each(function(index, domEle){
                if($(domEle).attr('value') == '${param.areaId}')
                {
                    $(domEle).addClass("selected");
                }
            });
        }

        if(${!empty param.tagId}){
            $("#selallquarterscls").removeClass("selected");
            $("#loadallquarters dd").each(function(index, domEle){
                if($(domEle).attr('value') == '${param.tagId}')
                {
                    $(domEle).addClass("selected");
                }
            });
        }


        /*$("#item_lists").animate({top:'70px'}, function(){
            $('#lists_content').height($(this).height() + 70);
        });*/
    });
</script>

<div id="c_content">
<div id="main_content">
<div id="food_right">
    <div style="margin-bottom:15px !important;margin-bottom:7px">
        <img width="280" height="34" alt="filterByArea" src="${ctx}/static/cd/images/foodrestsearch/filter_area_heading.png">
    </div>

    <div class="food_list">
        <div class="food_line"></div>
        <div class="food_con">
            <div class="con_title">菜系<span style="margin-left:185px; font-size:14px;">
                <a href="javascript:selSearchRestEntreeType('', this)">全部</a></span>
                <div class="selected" id="selallentreetypecls"></div>
            </div>
            <div class="subcategory" style="margin-left:10px;margin-right:0px">
                <dl id="loadallentreetype">
                    <c:forEach var="entree" items="${entreeTypes}" >
                        <dd onclick="javascript:selSearchRestEntreeType(${entree.id}, this)" name="entreeId" value="${entree.id}">${entree.name}</dd>
                    </c:forEach>
                </dl>
            </div>
        </div>
        <div class="food_line"><img src="${ctx}/static/cd/images/foodrestsearch/line01_03.jpg"></div>
    </div>

    <div class="food_list">
        <div class="food_line"></div>
        <div class="food_con">
            <div class="con_title">区域<span style="margin-left:185px; font-size:14px;">
                <a href="javascript:selSearchRestArea('', '', this)">全部</a></span>
                <div class="selected" id="selallareascls"></div>
            </div>
            <div class="subcategory" style="margin-left:10px;margin-right:0px">
                <dl id="loadallareas">
                    <c:forEach var="area" items="${areas}" >
                        <dd onclick="javascript:selSearchRestArea(${area.id}, '${area.name}', this)" name="areaId" value="${area.id}">${area.name}</dd>
                    </c:forEach>
                </dl>
            </div>
        </div>
        <div class="food_line"><img src="${ctx}/static/cd/images/foodrestsearch/line01_03.jpg"></div>
    </div>

    <div class="food_list">
        <div class="food_line"></div>
        <div class="food_con">
            <div class="con_title">美食圈<span style="margin-left:170px; font-size:14px;" id="allquartersclick">
                <a href="javascript:selSearchRestQuarter('', this)">全部</a></span>
                <div class="selected" id="selallquarterscls"></div>
            </div>
            <div class="subcategory">
                <dl id="loadallquarters">
                    <c:forEach var="tag" items="${tags}">
                        <dd onclick="javascript:selSearchRestQuarter('${tag.tag}', this)" name="tag" value="${tag.id}">
                            ${tag.tag}
                        </dd>
                    </c:forEach>
                </dl>
            </div>
        </div>
        <div class="food_line"><img src="${ctx}/static/cd/images/foodrestsearch/line01_03.jpg"></div>
    </div>
    <div style="margin-bottom:5px;margin-top:25px"><img width="280" height="34" alt="filterByArea" src="${ctx}/static/cd/images/foodrestsearch/filter_food_heading.png"></div>
    <div class="food_list">
        <div class="food_line"></div>
        <div class="food_con">
            <div class="con_title" style="color:#2FBD40">餐厅类别<span style="margin-left:160px; font-size:14px;"><a
                    href="javascript:selectResttypefilter('', '', '', this);">全部</a></span>

                <div class="" id="selallresttypecls"></div>
            </div>
            <div id="loadresttype">
                <div class="dishtypes_unselected" onclick="javascript:selectResttypefilter(22342, '中餐馆', '', this)"
                     id="mainresttype22342">中餐馆:
                </div>
                <div class="subcategory" style="margin-right:10px; margin-left:25px;">
                    <dl>
                        <dd style="margin-right:7px"
                            onclick="javascript:selectResttypefilter('22342.22400', '中餐馆', '素食', this)"
                            id="subresttype22400">素食
                        </dd>
                        <dd style="margin-right:7px"
                            onclick="javascript:selectResttypefilter('22342.22399', '中餐馆', '农家菜', this)"
                            id="subresttype22399">农家菜
                        </dd>
                    </dl>
                </div>
                <div style="clear:both"></div>
            </div>
        </div>
        <div class="food_line"><img src="${ctx}/static/cd/images/foodrestsearch/line01_03.jpg"></div>
    </div>

</div>

<div id="lists_content"<%-- style="position: relative;"--%>>

<div id="lists_head">
    <div id="paixu">
        &nbsp;排序：
        <a onclick="javascript:sortsearchrest('price', this);" href="javascript:void(0)" type="price" id="pricesort">人均</a>&nbsp;
        <img border="0" src="${ctx}/static/cd/images/customer/sort.gif">&nbsp;|&nbsp;
        <a onclick="javascript:sortsearchrest('evaluate', this);" href="javascript:void(0)" type="evaluate" id="evaluatesort">好评率</a>&nbsp;
        <img border="0" src="${ctx}/static/cd/images/customer/sort.gif">
    </div>

    <div id="orderby">
        <span class="displaynumber">
            <label>每页显示数量</label>
            <a class="current" size="10" href="javascript:void(0)"  onclick="javascript:selectRestSearchPageSize(this);">10</a>
            <a size="20" href="javascript:void(0)" onclick="javascript:selectRestSearchPageSize(this);">20</a>
            <a size="30" href="javascript:void(0)" onclick="javascript:selectRestSearchPageSize(this);">30</a>
        </span>
    </div>
</div>
<div id="item_lists" <%--style="position: absolute; top: 70px;"--%>>

<c:forEach var="c" items="${pages.content}">
<div class="item" id="_items">
    <div class="item_title">
        <div style="float:left;height:23px;line-height:23px;margin-top:7px">
            <a class="food_name" target="_blank" href="<c:url value="/company/detail/${c.id}" />">${c.name}</a>
        </div>
        <ul>
            <li class="favor"><span>10人收藏</span></li>
            <li class="consumption"><span>10人消费</span></li>
        </ul>
    </div>

    <div class="item_con">
        <div class="item_pic">
            <a target="_blank" href="<c:url value="/company/detail/${c.id}" />">
            <img src="${c.logo}" onerror="this.src='${ctx}/static/cd/images/no_pic.jpg'" width="130" height="120" border="0"></a>
        </div>
        <div class="description">
            <span>主打菜系：</span>  ${c.entreeType.name}<br/>
            <span>简介:</span>${c.summary} <br/>
            <span>地址：</span>${c.address} <br/>
            <span>其他信息：</span> ${c.remark}
            <%--<div class="see_map"><a  href="#">交通指引</a></div>--%>
        </div>
        <div class="price_area">
            <b>人均消费:</b><span>￥${c.axfMin}~￥${c.axfMax}</span><br>
            <b>折扣范围:</b><span>9.0折~9.5折</span>
        </div>
        <div class="clear"></div>
    </div>
    <div class="item_bottom">
        <div class="wjx" onmouseover="javascript:mouseoverRestComment('3849045', 0);" onmouseout="javascript:mouseoutRestComment(0)">
            <span class="stars star7"></span><em class="vam f15">3.5</em>
            <div class="evaluate" id="evalate_comment0" style="display:none"></div>
        </div>
        <div class="auto_dining" onclick="javascript:autoOrderFood(3849045);"></div>
        <div class="dining" onclick="javascript:intoOrderPage(3849045, '润湘之(延安西路店)');"></div>
    </div>

    <div style="clear:both"></div>

    <div class="itemFoot">
        <div class="footShdw">
            <div class="drawFootHead" >
            </div>
            <div class="drawFootContent">
                <ul>
                    <li class="left_button">
                        <div class="details"><a target="_blank" href="/">详细信息</a></div>
                        <div class="comments"><a target="_blank" href="/">点评</a></div>
                        <div class="favor"><a href="javascript:colFavoriteRest(3849045)">收藏</a></div>

                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
</c:forEach>

</div>

    <div id="pager" <%--style="position: absolute; bottom : 0; left: 0;"--%>>
        <tags:pagination page="${pages}" paginationSize="10"/>
    </div>

</div>
</div>
</div>

