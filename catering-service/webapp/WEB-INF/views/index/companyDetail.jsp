<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="tags" tagdir="/WEB-INF/tags" %>
<c:set value="${pageContext.request.contextPath}" var="ctx" />



<%--
<link href="${ctx}/static/cd/css/common/restauranthead.css" rel="stylesheet" type="text/css" />
<link href="${ctx}/static/cd/css/common/restaurantmain.css" rel="stylesheet" type="text/css" />
<link href="${ctx}/static/cd/css/common/restaurantfilter.css" rel="stylesheet" type="text/css" />
--%>
<link href="${ctx}/static/assets/bootstrap/bootstrap.min.css" rel="stylesheet" type="text/css" />
<link href="${ctx}/static/css/flaty.css" rel="stylesheet" type="text/css" />
<link href="${ctx}/static/cd/css/common/uiInteraction.css" rel="stylesheet" type="text/css" />
<link href="${ctx}/static/assets/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
<link href="${ctx}/static/assets/bootstrap/bootstrap-responsive.min.css" rel="stylesheet" type="text/css" />

<link href="${ctx}/static/cd/css/common/restaurantmain.css" rel="stylesheet" type="text/css" />


<div class="rest_head_pic">
    <img src="${company.logo}" onerror="this.src='/images/no_pic.gif'" width="960" height="200">
</div>



<div id="navigation" class="div_shadow">



        <div class="col">


            <ul>
                <li class="current">
                    <a href="#">
                        <em>餐厅首页</em>
                        <span>餐厅首页</span>
                    </a>
                </li>
                <li >
                 <a href="#">
                     <em>名师名厨</em>
                     <span>名师名厨</span>
                 </a>
                </li>
                <li class="">
                    <a href="#">
                        <em>招牌菜</em>
                        <span>招牌菜</span>
                    </a>
                </li>



                <li class="">
                    <a href="#">
                        <em>点餐</em>
                        <span>点餐</span>
                    </a>
                </li>




                <li class="">
                    <a href="#">
                        <em>自动配餐</em>
                        <span>自动配餐</span>
                    </a>
                </li>

                <li class="">
                    <a href="#">
                        <em>交通指引</em>
                        <span>交通指引</span>
                    </a>
                </li>
                <li class="">
                    <a href="#">
                        <em>用户点评</em>
                        <span>用户点评</span>
                    </a>
                </li>
                <li id="liapplymember" class="">
                    <a href="javascript:void(0);" onclick="javascript:applymember();">
                        <em>申请会员</em>
                        <span>申请会员</span>
                    </a>
                </li>
                <li id="employ" style="" class="">
                    <a href="#">
                        <em>招兵买马</em>
                        <span>招兵买马</span>
                    </a>
                </li>
            </ul>


        </div>


</div>


<div>

    <!-- 左边轮播  -->
    <div id="myCarousel" class="carousel slide div_shadow1" style="width: 70%;  float: left;">
        <ol class="carousel-indicators">
            <c:forEach var="img_src" items="${company.showImgs}" varStatus="i">
            <li data-target="#myCarousel" data-slide-to="${i.index}" class="<c:if test="${i.first}">active</c:if>"></li>
            </c:forEach>
        </ol>
        <div class="carousel-inner" >
            <c:forEach var="img_src" items="${company.showImgs}" varStatus="i">
            <div class="item <c:if test="${i.first}">active</c:if>">
                <img src="${img_src}" alt="" style="width: 670px; height: 340px;">
                <div class="carousel-caption">
                    <%--<h4>${company.summary}</h4>--%>
                    <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                </div>
            </div>
            </c:forEach>
        </div>
        <a class="left carousel-control" href="#myCarousel" data-slide="prev">‹</a>
        <a class="right carousel-control" href="#myCarousel" data-slide="next">›</a>
    </div>

    <!-- 右边简介 -->

    <div class="div_shadow" style="float: right; width: 29.5%;height: 340px; ">
        <div class="head">
            <span> ${company.name}</span>
        </div>
        <div class="drawFootContent">
            <ul>
                <li class="">
                   <i class="f16 icon-folder-open-alt"></i>收藏
                </li>
                <c:if test="${company.outSide == 0}">
                    <li class="left_button">
                        <span class="label label-success">送</span>支持外送
                    </li>
                </c:if>
            </ul>
        </div>
        <div class="f14">

            <p><strong>菜系：</strong> ${company.entreeType.name} </p>
            <p><strong>地址：</strong>${company.address} </p>
            <p><strong>交通路线：</strong>地铁1号线</p>
            <p><strong>营业时间：</strong>AM ${company.bhBegin}:00 - PM ${company.bhEnd}:00</p>

            <p class="f16 ">
                <strong>人均消费：</strong> <i class="icon-jpy"></i> <span class="red">${company.axfMin}</span>　～　<i class="icon-jpy"></i><span class="red"> ${company.axfMax}</span>
            </p>

            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p><button type="button" class="btn btn-primary"><i class="icon-share"></i>&nbsp;点餐&nbsp;</button></p>

        </div>
    </div>

</div>

<!-- 简介 公告栏等 -->
<div class="cDetail">
    <div class="detail_content div_shadow">
        <div class="head">餐厅介绍</div>
        <div class="content">${company.introduce}</div>
    </div>

    <div class="detail_content div_shadow">
        <div class="head">最新订单</div>
        <div class="content">
            暂无订单信息!
        </div>
    </div>

    <div class="detail_content div_shadow">
        <div class="head">餐桌信息</div>
        <div class="content">
            <ul id="seatinglist">
                <li class="first">
                    <span>座席名称</span>
                    <span style="margin-left:37px">可容纳人数</span>
                    <span style="margin-left:35px">服务时间</span>
                    <span style="margin-left:40px">最低消费</span>
                </li>
                <c:forEach begin="1" end="10">
                <li>
                    <div class="textinfo">1楼1号</div>
                    <div class="textinfo">4</div>
                    <div class="textinfo">11:00~22:00</div>
                    <div class="mini_charge">
                        ￥0
                    </div>
                    <div class="textinfo" style="width:30px;position:relative;overflow:visible"><a href="javascript:void(0);" onmouseover="javascript:viewseatinginfo(this);" onmouseout="javascript:closeseatinginfo(this);" onclick="javascript:intoDatingdetail();">详情</a>
                        <div class="hint" style="display:none">
                            <span class="hint-pointer"> </span>
                        </div>
                    </div>
                </li>
                </c:forEach>
            </ul>

        </div>
    </div>

    <div class="detail_content div_shadow">
        <div class="head"><span>餐厅公告</span></div>
        <div class="content">${company.notice}</div>
    </div>
</div>


<style type="text/css">
    #fixed{position:fixed;bottom:0px;z-index:999;}
</style>

<script>


</script>

<div id="fixed">
    <div id="bookingflow" style="margin: 0px; width: 960px; display: none;">
        <div id="closebookingflow" style="float:right;cursor:pointer;width:48px;padding:0 10px;border:1px solid #F7F7C5;background-color:#FFFFAE;">关闭提示</div>
        <div><img src="${ctx}/static/cd/images/bookflow.png" alt="吃点网点餐流程"></div>
    </div>
    <%--<div class="footwidth2">
       <div class="closeWindow" onclick="javascript:clsregisgift(this);" name="registergiftdiv1">关 闭</div>
     </div>
     <div class="footwidth" name="registergiftdiv2">
      <p class="left footL"></p>
      <div class="footM left">
       <div class="left">
        <p><img src="${ctx}/static/cd/images/common/words1.gif" /></p>
        <p class="top20">只需轻点鼠标，就可以安排一次家庭聚会、商务邀请、朋友小聚&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0);" class="blue">查看演示</a></p>
       </div>
       <div class="right footInner" name="registergiftdv">
        <p class="left footInnerL"></p>

        <div class="left footInnerM">
            <p class="blank10Px"></p>
            <img src="${ctx}/static/cd/images/common/words2.gif" />
            <a href="javascript:void(0);" onclick="javascript:openIntologin();"><img src="/images/common/signUpBtn.gif" /></a></div>
        <p class="left footInnerR"></p>
        <p class="clear"></p>
       </div>
      </div>
      <p class="right footR"></p>
      <p class="clearboth"></p>
     </div>--%>
</div>