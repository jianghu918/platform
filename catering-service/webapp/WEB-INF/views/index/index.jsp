<%--
  Created by IntelliJ IDEA.
  User: hu
  Date: 13-7-19
  Time: 上午9:49
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set value="${pageContext.request.contextPath}" var="ctx" />


<!-- 顶部幻灯箱 -->
<div id ="carousel_container">
    <div id="hotactivity">
        <div id="carousel-nav">
            <ul>
                <li class="activeSlide"><em></em><a href="#" ><img src="${ctx}/attached/cd/images/activity/20110608/h-l.png" alt="热门餐厅" height="55" width="140"></a></li>
                <li class=""><em></em><a href="#" ><img src="${ctx}/attached/cd/images/activity/20110608/s-l.png" alt="特色餐厅" height="55" width="140"></a></li>
                <li class=""><em></em><a href="#" ><img src="${ctx}/attached/cd/images/activity/20110608/f-l.png" alt="人气餐厅" height="55" width="140"></a></li>
                <li class=""><em></em><a href="#" ><img src="${ctx}/attached/cd/images/activity/20110608/c-l.png" alt="沪上经典" height="55" width="140"></a></li>
            </ul>
        </div>
        <div id="carousel-slides">
            <div style="width: 820px; height: 220px;" class="transition">
                <div style="position: absolute; top: 0px; left: 0px; display: none; z-index: 4; opacity: 0; width: 820px; height: 220px;" class="slide">
                    <a href="#" target="_blank"> <img src="${ctx}/attached/cd/images/activity/20120628/h-r.jpg" width="820" height="220"/></a>
                </div>
                <div style="position: absolute; top: 0px; left: 0px; display: none; z-index: 4; opacity: 0; width: 820px; height: 220px;" class="slide">
                    <a href="#"  target="_blank"><img src="${ctx}/attached/cd/images/activity/20120628/s-r.jpg" width="820" height="220"/></a>
                </div>
                <div style="position: absolute; top: 0px; left: 0px; display: none; z-index: 4; opacity: 0; width: 820px; height: 220px;" class="slide">
                    <a href="#" target="_blank" ><img src="${ctx}/attached/cd/images/activity/20120628/f-r.jpg" width="820" height="220"/></a>
                </div>
                <div style="position: absolute; top: 0px; left: 0px; display: none; z-index: 4; opacity: 0; width: 820px; height: 220px;" class="slide">
                    <a href="#"  target="_blank"><img src="${ctx}/attached/cd/images/activity/20120628/c-r.jpg" width="820" height="220" /></a>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- 顶部幻灯箱 结束 -->

<!--
<h2><img src="/images/common/cheapest.png" width="221" height="37" alt="巨便宜"/></h2>
<div id="special-goods">
</div>-->

<div class="wrap clearfix">
<div class="wrapLeft">

<!-- 快速导航 -->
<div id="popular-nav">
    <h2>快速导航</h2>
    <div class="pop-nav-list">
        <h3>1<span>类型</span></h3>
        <ul class="ul-list ">
            <c:forEach var="entree" items="${entreeTypes}" >
                <li>
                    <a href="${ctx}/company/getAll?entreeId=${entree.id}">${entree.name}</a>
                </li>
            </c:forEach>
            <li>
                <a class="more" href="javascript:void(0);" onclick="javascript:dishtypesPopNav('', '');return false;">所有类型>></a>
            </li>
        </ul>
    </div>
    <div class="pop-nav-list">
        <h3>2<span>商圈</span></h3>
        <ul class="ul-list ul-list-bg-mid">
            <c:forEach var="tag" items="${tags}" >
                <li>
                    <a href="javascript:void(0);"  onclick="javascript:quarterPopNav('黄浦',343, 22188);return false;">${tag.tag}</a>
                </li>
            </c:forEach>
            <li><a class="more" href="javascript:void(0);" onclick="javascript:quarterPopNav('','', '');return false;">所有商圈>></a></li>
        </ul>
    </div>
    <div class="pop-nav-list pop-nav-list-last">
        <h3>3<span>区域</span></h3>
        <ul class="ul-list ul-list-bg-last">
           <c:forEach var="area" items="${areas}" >
            <li>
                <a href="javascript:void(0);" onclick="javascript:areaPopNav('虹口',342);return false;">${area.name}</a>
            </li>
           </c:forEach>
            <li><a class="more" href="javascript:void(0);" onclick="javascript:areaPopNav('','');return false;">所有区域>></a></li>
        </ul>
    </div>
</div>
<!-- 快速导航  结束 -->


<%@ include file="../common/search.jsp"%>


<div id="c_content">
    <div id="main_content">
        <div id="c_main">
            <div id="cart_nav">
                <div id="tabs">
                    <ul id="submenu">
                        <li  class="current"><a href="javascript:void(0);" id="restaurantrecomm"><span>推荐餐厅</span></a></li>
                        <!--                                            <li><a href="javascript:void(0);" id="foodrecomm"><span>推荐美食</span></a></li>-->
                        <li><a href="javascript:void(0);" id="hotrestaurant"><span>热门餐厅</span></a></li>
                        <!--                                            <li><a href="javascript:void(0);" id="hotfood"><span>热门美食</span></a></li>-->
                        <li><a href="javascript:void(0);" id="custoffenrest"><span>我消费过的餐厅</span></a></li>
                        <!--                                            <li><a href="javascript:void(0);" id="custoffenfood"><span>我吃过的美食</span></a></li>				-->
                    </ul>
                </div>
            </div>

            <div id="c_neirong">
                <div id="title_c">
                    <div id="paixu" style="display:none">排序：<a onclick="javascript:sortbyprice(this);" href="javascript:void(0);" id="pricesort">价格</a>&nbsp; <img border="0" src="images/customer/sort.gif"/>&nbsp;|&nbsp;<a onclick="javascript:sortbyeval(this);" href="javascript:void(0);" id="evaluatesort">好评率</a>&nbsp;<img border="0" src="images/customer/sort.gif"/></div>
                    <div class="pricerange" style="display:none">价格:&nbsp;<select onchange="javascript:selectPricerange(this);" id="selpricerange">
                        <option value="">不限</option>
                        <option value="0">￥0&#xFF5E;￥50</option>
                        <option value="1">￥50&#xFF5E;￥100</option>
                        <option value="2">￥100&#xFF5E;￥150</option>
                        <option value="3">￥150&#xFF5E;￥200</option>
                        <option value="4">￥200以上</option>
                    </select></div>
                    <div class="averagerange" style="display:none">人均:&nbsp;
                        <select onchange="javascript:selectaveragerange(this);" id="selaveragerange">
                            <option value="">不限</option>
                            <option value="0">￥0&#xFF5E;￥50</option>
                            <option value="1">￥50&#xFF5E;￥100</option>
                            <option value="2">￥100&#xFF5E;￥200</option>
                            <option value="3">￥200&#xFF5E;￥300</option>
                            <option value="4">￥300以上</option>
                        </select>
                    </div>
                    <div id="orderby"> <span class="displaynumber">
                                                <label>每页显示数量</label>
                                                <a class="current" id="pagesize10" href="javascript:selectPageSize(10, this);">10</a> <a  id="pagesize20" href="javascript:selectPageSize(20, this);">20</a> <a id="pagesize30" href="javascript:selectPageSize(30, this);">30</a> </span> </div>
                </div>
                <div id="dishlist">
                    <div class="GoodsListWrap">
                        <ul>

                            <li>
                                <div class="itemHead">
                                    <div class="flags">
                                    </div>
                                    <div class="clear"></div>
                                </div>
                                <div class="itemContents">
                                    <div class="pic"> <a target="_blank" href="mainpage-loadflagshippage.html&restaurantid=382862717">
                                        <img src="DNFImageService/images/restaurant/38799067/rest/3.jpg" onerror="this.src='/images/no_pic.gif'" width="170" height="155"     /></a></div>
                                    <div class="itemText">
                                        <a target="_blank" href="mainpage-loadflagshippage.html&restaurantid=38799067"><h3>如君蛙庄(吴中路）</h3></a>
                                        <p style="height: 15px;overflow: hidden;"><strong >主打菜：川菜、干锅</strong></p>
                                        <p>


                                            如君蛙庄，原蛙蛙叫干锅年代，是一家主营特色干锅的餐厅，一锅两吃，先...



                                        </p>
                                        <div class="discount_range">8.5&#xFF5E;9.5折</div>
                                    </div>
                                    <div class="clear"></div>
                                </div>
                                <div class="itemFoot">
                                    <div class="footShdw">
                                        <div class="draw">
                                            <div class="drawFootHead">
                                                <p>人均消费：<span class="price">￥40&#xFF5E;￥50</span></p>
                                                <!-- 折扣范围 -->
                                                <a target="_blank" href="orderfood-loadPage.html&restaurantid=38799067"><div class="booking">点餐</div></a>

                                            </div>
                                            <div class="drawFootContent">
                                                <ul>
                                                    <li class="addInFavor"><a href="javascript:colFavoriteRest(38799067)">收藏</a></li>
                                                    <li class="comment"><a target="_blank" href="custcommcontroller-getPageRestAllComments.html&restaurantid=38799067">点评</a></li>
                                                    <li class="seeMap"><a target="_blank" href="restaurantmap-getRestaurantMap.html&restaurantid=38799067&cityname=_25E4_25B8_258A_25E6_25B5_25B7">交通指引</a></li>

                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>

                        </ul>
                    </div>
                    <div id="pager"></div>
                </div>
            </div>
        </div>

    </div>
</div>


<link href="css/mainpage/highsearch.css" rel="stylesheet" type="text/css" />
<div id="highsearchfood"  style="display:none" title="高级搜索框">
    <div class="checkbox_food">
        <div class="cbox">
            <div class="check_content">
                <div class="checkbox_title">
                    高级选项框（<span>美食</span>）
                    所在城市:<span id="dlgcity">上海</span>
                </div>
                <div id="ajaxdlgsuggest"></div>
                <div class="checkbox">
                    <div class="checkbox_text">

                        <div><b>选择区域</b>：<span style="margin-left:400px;font-size:14px;"><a href="javascript:selareaname('', '', this);" >全选</a></span><div class="selected" id="selallareas"></div></div>
                    </div>
                    <div class="cityname" id="areaname">
                        <ul>
                        </ul>
                    </div>
                </div>
                <div class="foodcircle">
                    <div class="checkbox_text">
                        <div><b>选择美食圈</b>：<span style="margin-left:385px;font-size:14px;" id="allhighsearchquarters"><a href="javascript:selquartername('', '', this);">全选</a></span><div class="selected" id="selallquarters"></div></div>

                    </div>
                    <div class="cityname" id="quatername">
                        <ul>
                        </ul>
                    </div>
                </div>

                <div class="cuisine" id="highsearchfooddishtype">
                    <div class="checkbox_text">
                        <div><b>选择菜系</b>：<span style="margin-left:400px;font-size:14px;"><a href="javascript:selhigdishtypes(this, '', '');">全选</a></span><div class="selected" id="selalldishtypes"></div></div>
                    </div>
                    <div class="cityname" id="searchfooddishcontainer">
                        <ul>
                            <!-- 填入大类菜系的名字 -->
                            <div class="entree" id="dishalcotypetitle"></div>
                            <div class="entree_content">
                                <div>
                                    <!-- 填入每个大类下面小类的菜系类别数据 -->
                                    <div class="name" id="dishalcotypelist">
                                    </div>
                                </div>
                        </ul>
                    </div>
                </div>

                <div class="cuisine" id="highsearchresttype" style="display:none">
                    <div class="checkbox_text">
                        <div><b>选择餐厅类别</b>：<span style="margin-left:368px;font-size:14px;"><a href="javascript:selsubresttypes(this, '', '');">全选</a></span><div class="selected" id="selallresttypes"></div></div>
                    </div>
                    <div class="cityname">
                        <ul>
                            <div class="entree" id="restauranttypetitle"></div>
                            <div class="entree_content">
                                <div>
                                    <div class="name" id="resttypelist">
                                    </div>
                                </div>
                        </ul>
                    </div>
                </div>


                <div class="check_bottom" id="slidecontainer">


                    <div class="title" style="margin-bottom:0px;">
                        <p id="pricetitleconvert">菜&#12288;价：</p>
                        <!-- <div id="priceslider"  class="scroll"></div> -->
                        <!-- 价格区间滑动条 -->
                        <div style="float:left">
                            <div id="price-slider-bg" class="yui-bh-slider">
                                <div id="price-slider-tips-min" class="sliderTips"></div>
                                <div id="price-slider-thumb-min" class="yui-slider-thumb">
                                    <img name="sliderBtnMin" src="js/yuislider/yui/slider/assets/thumb-n.gif" />
                                </div>
                                <input type="hidden" name="slider_price_min" />
                                <div id="price-slider-tips-max" class="sliderTips"></div>
                                <div id="price-slider-thumb-max" class="yui-slider-thumb">
                                    <img name="sliderBtnMax" src="js/yuislider/yui/slider/assets/thumb-n.gif" />
                                </div>
                                <input type="hidden" name="slider_price_max" />
                            </div>
                        </div>
                        <span style="float:left;">(单位:元)</span>
                        <span style="float:left;margin-left:10px;"><input type="checkbox" onclick="dispriceslider(this);" id="ltthousantckb"/>不限</span>

                    </div>
                    <div class="gtthousand"><span><input type="checkbox" id="gtthousand" onclick="gtthousandckb(this);"/>1000以上</span></div>


                    <div class="title" id="highsearchfooddiscnt">
                        <p>折&#12288;扣：</p>
                        <!-- <div id="discountslider" class="scroll"></div> -->
                        <!-- 折扣区间滑动条 -->
                        <div style="float:left;">
                            <div id="discnt-slider-bg" class="yui-bh-slider">
                                <div id="discnt-slider-tips-min" class="sliderTips"></div>
                                <div id="discnt-slider-thumb-min" class="yui-slider-thumb" style="">
                                    <img name="sliderBtnMin" src="js/yuislider/yui/slider/assets/thumb-n.gif" />
                                </div>
                                <input type="hidden" name="slider_discnt_min" />
                                <div id="discnt-slider-tips-max" class="sliderTips"></div>
                                <div id="discnt-slider-thumb-max" class="yui-slider-thumb" style="">
                                    <img name="sliderBtnMax" src="js/yuislider/yui/slider/assets/thumb-n.gif" />
                                </div>
                                <input type="hidden" name="slider_discnt_max" />
                            </div>
                        </div>
                        <span style="float:left;">(单位:折)</span>
                        <span style="float:left;margin-left:10px;"><input type="checkbox" onclick="disabledctslider(this);" id="discountrange"/>不限</span>
                    </div>
                    <div class="title">
                        <p>好评率：</p>
                        <!-- <div id="commentrateslider" class="scroll"></div> -->
                        <!-- 好评率滑动条 -->
                        <div style="float:left;">
                            <div id="commentrate-slider-bg" class="yui-bh-slider">
                                <div id="commentrate-slider-tips" class="sliderTips"></div>
                                <div id="commentrate-slider-thumb" class="yui-slider-thumb" style="">
                                    <img name="sliderBtnMin" src="js/yuislider/yui/slider/assets/thumb-n.gif" />
                                </div>
                                <input type="hidden" name="commentrate_value" />
                            </div>
                        </div>
                        <span style="float:left;margin-left:62px;"><input type="checkbox" onclick="disablecommslider(this);" id="commentraterange" checked/>不限</span>
                    </div>

                    <div class="title">
                        <p>人&#12288;气：</p>
                        <!--  <div id="hotrateslider" class="scroll"></div> -->
                        <!-- 人气滑动条 -->
                        <div style="float:left;">
                            <div id="hotrate-slider-bg" class="yui-bh-slider">
                                <div id="hotrate-slider-tips" class="sliderTips"></div>
                                <div id="hotrate-slider-thumb" class="yui-slider-thumb" style="">
                                    <img name="sliderBtnMin" src="js/yuislider/yui/slider/assets/thumb-n.gif" />
                                </div>
                                <input type="hidden" name="hotrate_value" />
                            </div>
                        </div>
                        <span style="float:left;margin-left:62px;"><input type="checkbox" onclick="disablehotslider(this);" id="hotraterange" checked/>不限</span>
                    </div>
                    <div class="special" id="highsearchspecifal">
                        <span style="text-align:center;">特&#12288;价：</span>
                        <span style="text-align:center;width:100px;"><input type="radio" name="specflag" value="1" disabled>是</span>
                        <span style="text-align:center;width:100px;"><input type="radio" name="specflag" value="0" disabled>否</span>
                        <span style="text-align:center;width:200px;"><input type="checkbox"  id="specialchk" onclick="disablespecflag(this);" checked/>不限</span>
                    </div>

                    <div class="special" id="parkingspaces" style="display:none">
                        <span style="text-align:center;margin-left:8px;">车&#12288;位：</span>
                        <span style="text-align:center;width:100px;"><input type="radio" name="parking" value="1" disabled>有</span>
                        <span style="text-align:center;width:100px;"><input type="radio" name="parking" value="0" disabled>无</span>
                        <span style="text-align:center;width:200px;"><input type="checkbox"  id="parkingchk" onclick="disableparkingflag(this);" checked/>不限</span>
                    </div>

                </div>
                <div class="global_tip_button">
                    <button class="bt_tip_normal" id="highsearchfoodbtn" onclick="commandfoodhighsearch();">搜索</button>&nbsp;&nbsp;<button class="bt_tip_normal" style="display:none;" id="highsearchrestbtn" onclick="commandresthighsearch();">搜索</button>&nbsp;&nbsp;<button class="bt_tip_normal" onclick="closehighfooddlg();">关闭</button>
                </div>
            </div>
        </div>
    </div>
</div>






<!-- 请选择烹饪方法 -->
<div class="chooseWindowM" id="selectculinarymethoddlg" style="display:none;height: auto;">
    <ul class="clearfix">
    </ul>
    <p class="OkBtn"></p>
</div>







</div>

<div id="right_sidebar">

    <div class="adv">
        <p style="cursor:pointer;" onclick="javascript:openIntologin();"><img  src="${ctx}/attached/cd/images/mainpage/reg.png"/></p>

    </div>

    <div class="adv">
        <p style="cursor:pointer;" onclick="javascript:recommgift();"><img  src="${ctx}/attached/cd/images/mainpage/recommend.png"/></p>
    </div>
    <div class="adv" style="margin-bottom:10px;">
        <a href="../corp.cdian.cn/agent/agent.htm"><img src="${ctx}/attached/cd/images/mainpage/agent.png" /></a>
    </div>


    <div class="rBlock">
        <p class="help">帮助 </p>
        <p class="intro">
            <strong class="blue"><a href="../corp.cdian.cn/help/help5.htm">网上点餐</a> </strong> -想吃就点，就是这么简单！<br/>
            <strong class="blue"><a href="../corp.cdian.cn/help/help6.htm">网上选座</a> </strong> -不用等位，位子等你！<br/>
            <strong class="blue"><a href="../corp.cdian.cn/help/help7.htm">网上支付</a> </strong> -吃了就闪，是不是很潮！<br/>
            <strong class="blue"><a href="../corp.cdian.cn/help/help8_1.htm">收不到注册激活邮件怎么办?</a> </strong>
        </p>
    </div>
    <div class="adv">
        <a target="_blank" style="outline: none;" href="mainpage-loadRestaurantPolling.htm"><img  src="images/polling.png"/></a>
        <p style="text-align: center;color: #666666">票选：我最希望获得网上点餐服务的餐厅</p>
    </div>
</div>

</div>

<script type="text/javascript">
    var _context = '';
    var _loginid = '';
    var _loginname = '';
    var cityname = '上海';
    var cityid = '287';
    var common;
    var load = 'true';



    setModelPrefix('mainpagehotfood');
    if($.browser.msie){
        document.execCommand("BackgroundImageCache", false, true);
    }





</script>
