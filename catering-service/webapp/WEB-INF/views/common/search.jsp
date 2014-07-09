<%--
  Created by IntelliJ IDEA.
  User: hu
  Date: 13-9-5
  Time: 下午4:37
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set value="${pageContext.request.contextPath}" var="ctx" />

<div id="search">

    <link href="${ctx}/static/cd/css/common/main_search.css" rel="stylesheet" type="text/css" />
    <div id="searchInner">



        <div id="searchCell">
            <!-- 美食搜索提示 -->
            <div id="search_suggest" class="suggestions"></div>
            <!-- 餐厅搜索提示 -->
            <div id="search_rest_suggest" class="suggestions" style="display: none;"><ul></ul></div>
            <!-- 地图搜索提示 -->
            <div id="search_map_suggest" class="suggestions"></div>
            <!-- 区域的下浮框 -->
            <div class="choose_area" style="display:none;" id="choosearea">
                <div class="cityBg_top"></div>
                <div class="cityBg">
                    <div class="cbox">
                        <div class="city_title">请选择区域</div>
                        <div class="cityname" id="areanamelist">
                        </div>
                        <div class="off"><span style="float:left">[<span style="cursor:pointer" onclick="javascript:selArea('', this);">全部</span>]</span><span style="float:right">[<a href="javascript:closeArea();">关闭</a>]</span></div>
                    </div>
                </div>
                <div class="cityBg_bot"></div>
            </div>
            <!-- 区域的下浮框 -->
            <div class="choose_area" style="display:none;" id="chooserestarea">
                <div class="cityBg_top"></div>
                <div class="cityBg">
                    <div class="cbox">
                        <div class="city_title">请选择区域</div>
                        <div class="cityname" id="areanamelistforrest">
                        </div>
                        <div class="off"><span style="float:left">[<span style="cursor:pointer" onclick="javascript:selRestArea('', this);">全部</span>]</span><span style="float:right">[<a href="javascript:closerestArea();">关闭</a>]</span></div>
                    </div>
                </div>
                <div class="cityBg_bot"></div>
            </div>

            <!-- 区域的下浮框 -->
            <div class="choose_map_area" style="display:none;" id="choosemaparea">
                <div class="cityBg_top"></div>
                <div class="cityBg">
                    <div class="cbox">
                        <div class="city_title">请选择区域</div>
                        <div class="cityname" id="areanamelistformap">
                        </div>
                        <div class="off"><span style="float:left">[<span style="cursor:pointer" onclick="javascript:selMapArea('', this);">全部</span>]</span><span style="float:right">[<a href="javascript:closemapArea();">关闭</a>]</span></div>
                    </div>
                </div>
                <div class="cityBg_bot"></div>
            </div>

            <!-- 美食圈的下浮框 -->
            <div class="choose_quarter" style="display:none;" id="choosequarter">
                <div class="cityBg_top"></div>
                <div class="cityBg">
                    <div class="cbox">
                        <div class="city_title">请选择美食圈</div>
                        <div class="cityname" id="quaternamelist"></div>
                        <div class="off"><span style="float:left">[<span style="cursor:pointer" onclick="javascript:selMapQuarter('', '全部');">全部</span>]</span><span style="float:right">[<a href="javascript:closeQuarter();">关闭</a>]</span></div>
                    </div>
                </div>
                <div class="cityBg_bot"></div>
            </div>




            <div id="search_menu">
                <ul class="clearfix first">
                    <!--  <li class="active"><a href="javascript:searchfoods();">找美食</a></li>
                    <li ><a href="javascript:searchrests();">找餐厅</a></li>
                    <li ><a href="javascript:searchmaps();">美食地图</a></li>-->
                    <li id="searchrestflag" class="active"><span onclick="javascript:searchrests();">找餐厅</span></li>
                    <li id="searchfoodflag" class="moveL"><span onclick="javascript:searchfoods();">找美食</span></li>
                    <li id="searchmapflag" class="moveL"><span onclick="javascript:searchmaps();">地图点餐</span></li>

                </ul>
            </div>
            <h3 id="cityname" style="display:none">上海</h3><span style="display:none">[<a href="javascript:covertCity();">切换城市</a>]</span>
            <div class="choose_city" style="display:none;" id="choosecity">
                <div class="cityBg_top"></div>
                <div class="cityBg">
                    <div class="cbox">
                        <div class="city_title">请选择城市</div>
                        <div class="cityname" id="citynamelist"></div>
                        <div class="off">[<a href="javascript:closeCity();">关闭</a>]</div>
                    </div>
                </div>
                <div class="cityBg_bot"></div>
            </div>

            <div class="search_body" style="display: none;" id="searchfood">

                <div class="searchaction">

                    <div class="search_form">
                        <fieldset class="search_set">
                            <label for="key" style="display:block" id="labelforsearchfood">请在此输入美食名称</label>
                            <input name="key" id="key" onclick="javascript:displayfoodlabel(0);" onblur="javascript:displayfoodlabel(1);" value="">
                            <div class="search_button" style="cursor:pointer;" onclick="javascript:foodSearch();">
                                <div class="searchButton"></div>
                            </div>
                        </fieldset>
                    </div>

                </div>
                <div class="options"> <p>所在区域: [<a href="javascript:convertArea();" id="seldropareas">全部</a>]&nbsp;|&nbsp;[<a href="javascript:hoversearchfood();">高级搜索</a>]</p></div>
            </div>


            <div class="search_body" style="" id="searchrest">
                <div class="searchaction">

                    <div class="search_form">

                        <fieldset class="search_set">
                            <label for="restword" style="display: none;" id="labelforsearchrest">请在此输入餐厅名称、地址、所属菜系</label>
                            <input name="restword" id="restword" onclick="javascript:displayrestlabel(0);" onblur="javascript:displayrestlabel(1);" value="">
                            <div class="search_button" style="cursor:pointer;" onclick="javascript:restaurantSearch();">
                                <div class="searchButton"></div>
                            </div>
                        </fieldset>
                    </div>
                    <div id="clear"></div>
                </div>
                <div class="options"><p>所在区域: [<a href="javascript:convertRestArea();" id="seldroprestareas">全部</a>]&nbsp;|&nbsp;[<a href="javascript:hoversearchrest();">高级搜索</a>]</p></div>

            </div>

            <div class="search_body" style="display: none;" id="searchmap">
                <div class="searchaction">
                    <div class="search_form">
                        <fieldset class="search_set">
                            <label for="searchmapword" style="display:block;left:40px;width:260px" id="searchmapwordlabel">请在此输入餐厅名称、地址、所属菜系</label>
                            <input name="searchmapword" id="searchmapword" onclick="javascript:displaymaplabel(0);" onblur="javascript:displaymaplabel(1);" value="">
                            <div class="search_button" style="cursor:pointer" onclick="javascript:searchRestMap();">
                                <div class="searchButton"></div>
                            </div>
                        </fieldset>
                    </div>
                    <div id="clear"></div>
                </div>
                <div class="options"><p>所在区域: [<a href="javascript:convertMapArea();" id="seldropmapareas">全部</a>]&nbsp;|&nbsp;所在美食圈: [<a href="javascript:convertMapQuarterArea();" id="seldropmapquarters">全部</a>]</p></div>
            </div>
        </div>
    </div>

</div>

