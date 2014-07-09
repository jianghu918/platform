<%--
  Created by IntelliJ IDEA.
  User: hu
  Date: 13-9-5
  Time: 下午1:47
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set value="${pageContext.request.contextPath}" var="ctx"/>


<div class="headwidth">
    <div class="left" onclick="javascript:backtoindex();" style="cursor:pointer;"><img
            src="http://www.le07.com/template/comiis_x3dfmh/comiis_pic/le07_bbs.png"/></div>
    <!--    <div id="popad-lightbox" style="position:absolute;top:10px;left: 237px;width:202px;height:31px;">
            <a id="lightbox" href="/images/activity/image8.jpg"><img src="/images/common/LOGO1.png" width="202" height="31" alt="" /></a>
        </div>-->
    <div class="mainlink"><a href="<c:url value="/"/>">乐吃点餐首页</a><span>&#x3000;|&#x3000;</span><a
            href="javascript:restaurantSearch();">找餐厅</a><span>&#x3000;|&#x3000;</span><a
            href="javascript:foodSearch();">找美食</a></div>
    <div class="right">
        <!--        <div ><a href="/applyforopen-index.html" target="_blank">免费开店</a></div>-->
        <div style="padding-right:0px;text-align:right;width:480px;height:39px;" class="custservice">
            写点什么好呢？
        </div>

        <div class="smallManue"><span class="welinfo">您好，欢迎来到乐吃点餐！</span>
            <span class="logininsys">
            <a  href="javascript:openIntologin();">[请登录]</a>&#x3000;
            <a class="link-regist" href="javascript:openIntologin();">[注册]</a></span>
            <span class="logoutsys" style="display:none">
            <a href="javascript:logoutsystem();">[退出]</a></span><span>|</span>
            <a onclick="javascript:intoCustomerCenter();">我的乐吃</a>
            <span>|</span>
            <a onclick="javascript:commonOpenFoodMenu(this);return false">我的菜单</a>
        </div>

    </div>
    <div id="my_menu" style="display:block;">
        <div id="mycartstaticinfo" style="display:none;float:right;position:relative">
            <div id="cart_head">
                <div class="cart_title"><h2>我的菜单</h2></div>
                <div id="cart_info">总&#12288;数：<span id="totalfoodnums"></span>&nbsp;份<br>
                    总金额：￥<span id="totalfoodmoney"></span>
                </div>
            </div>
            <div class="cart_body">
                <div class="dotted_line"></div>
                <div id="cart_list" style="display:none">
                    <ul>
                    </ul>
                </div>
                <div style="clear:both"></div>
                <div id="cart_button" style="margin-top:7px">
                    <div id="carthideinfo" class="info_hide" onclick="javascript:closeOpenFoodMenu(this);return false;">
                        隐藏
                    </div>
                    <div style="float:right;margin-left:15px;margin-right:5px;cursor:pointer">
                        <img height="24" width="66" src="images/common/checkoutbtn.png" onclick="javascript:checkoutmycart();"/>
                    </div>
                </div>
            </div>
            <!--<div class="hide_my_menu" onclick="javascript:closeOpenFoodMenu(this);return false;" style="display:none">
           </div>-->
        </div>
    </div>
    <div class="clearboth"></div>
</div>


<!-- 最新优惠 -->
<div id="hot-promotion">
    <dl class="scrollmsg" >
        <dt>
            <strong>最新优惠</strong>
        </dt>
        <dd id="msgs">

        </dd>
    </dl>
</div>