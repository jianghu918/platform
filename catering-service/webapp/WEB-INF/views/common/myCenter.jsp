<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set value="${pageContext.request.contextPath}" var="ctx" />

<style type="text/css">
    .tips_title{
        line-height:30px;
        height:30px;
        margin-left:55px;
        font-size:16px;
        font-weight:600;
        color:#006FC5;
        position:relative;
        top:-37px;
    }

    .chooseWindowM{padding:0px 15px;}
    .chooseWindowM ul{ padding:10px 0px;}
    .chooseWindowM ul li{ width:110px; float:left;}
</style>



<div id="cartinfo" style="float:right;">
    <link href="${ctx}/static/cd/css/common/foodcart.css" rel="stylesheet" type="text/css">
    <div id="mycartinfo" class="mycart_inner">
        <div id="mycartstaticinfo" style="">
            <div id="cart_head">
                <div class="cart_title"><h2>我的菜单</h2></div>
                <div id="cart_info">总　数：<span id="totalfoodnums">0</span>&nbsp;份<br>
                    总金额：￥<span id="totalfoodmoney">0</span>
                </div>
            </div>
            <div class="cart_body">
                <div class="dotted_line"></div>
                <div id="cart_list" style="display: none;">
                    <ul></ul>
                </div>
                <div style="clear:both"></div>
                <div id="cart_button" style="margin-top:7px">
                    <!--  <div  style="float:left;margin-right:25px;*margin-right:15px;cursor:pointer" id="cartdetailinfo"><img height="24" width="87" src="/images/common/viewMenu.png"/></div>
                    <div  style="float:left;margin-right:25px;*margin-right:15px;cursor:pointer;display:none" id="carthideinfo" ><img height="24" width="87" src="/images/common/hideMenu.png"/></div>
                    -->

                    <div class="info_down" id="cartdetailinfo" style="display: block;">详情</div>
                    <div class="info_up" style="display: none;" id="carthideinfo">隐藏</div>
                    <div style="float:right;margin-left:15px;margin-right:5px;cursor:pointer">
                        <img height="24" width="66" src="${ctx}/attached/cd/images/common/checkoutbtn.png" onclick="javascript:checkoutmycart4();"></div>
                </div>
            </div>

        </div>

    </div>
</div>







<div id="colrestsuccessdig"  title="收藏成功" style="display:none">
    <img src="${ctx}/attached/cd/images/system/right.gif"/>
    <div class="tips_title" style="margin-left:70px;">餐厅收藏成功</div>
</div>
<div id="colrestfaileddig"  title="收藏失败" style="display:none">
    <img src="${ctx}/attached/cd/images/system/info1.gif"/>
    <div class="tips_title" style="margin-left:70px;">您已经收藏过该餐厅</div>
</div>

<div id="tradereqfaileddig"  title="交易请求失败" style="display:none">
    <img src="images/system/info1.gif"/>
    <div class="tips_title" style="margin-left:70px;">您对该餐厅的交易请求已经超出了一天之内至多10次的规定</div>
</div>

<div id="delrecdig" title="删除美食记录" style="display:none;font-size:14px ">
    <img src="${ctx}/attached/cd/images/system/ask.gif"/>
    <div class="tips_title">您是否确定删除该笔美食?</div>
    <div style="position:relative;top:-20px;">
        <span style="margin-left:60px;">点击'<b style="color:#ff0000">确认</b>',删除该笔美食</span>
        <br/>
        <br/>
        <span style="margin-left:60px;">点击'<b style="color:#ff0000">取消</b>',返回页面</span>
    </div>
</div>

<div id="colfoodsuccessdig" title="收藏成功" style="display:none">
    <img src="${ctx}/attached/cd/images/system/right.gif"/>
    <div class="tips_title" style="margin-left:70px;">美食收藏成功</div>

</div>

<div id="colfoodfaileddig"  title="收藏失败"  style="display:none">
    <img src="${ctx}/attached/cd/images/system/info1.gif"/>
    <div class="tips_title" style="margin-left:70px;">您已经收藏过该美食</div>

</div>
<div id="adddiffrest" title="系统提示" style="display:none;font-size:14px">
    <img src="${ctx}/attached/cd/images/system/ask.gif" />
    <div class="tips_title">您已经进入一家新的餐厅,是否确定在新餐厅中点餐?</div>
    <span style="margin-left:30px;">点击'<b style="color:#ff0000">确认</b>':将会为您生成新的菜单,菜单中原有的美食将被删除</span>
    <br/><br/>
    <span style="margin-left:30px;">点击'<b style="color:#ff0000">取消</b>':保留原有菜单,并返回页面 </span>
</div>
