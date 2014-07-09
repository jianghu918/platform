<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sitemesh" uri="http://www.opensymphony.com/sitemesh/decorator" %>
<c:set value="${pageContext.request.contextPath}" var="ctx" />


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <base />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=7" />
    <title>乐吃网-网上点餐、网上选座、网上支付</title>
    <!--        <link href="/css/mainpage/main.allinone.css" rel="stylesheet" type="text/css" />-->
    <link href="${ctx}/static/cd/css/jquerycss/Pager.css" rel="stylesheet" type="text/css" />
    <link href="${ctx}/static/cd/css/common/uiInteraction.css" rel="stylesheet" type="text/css" />
    <link href="${ctx}/static/cd/css/mainpage/homepage.css" rel="stylesheet" type="text/css" />
    <link href="${ctx}/static/cd/css/jquerycss/ui.all.css" rel="stylesheet" type="text/css" />
    <link href="${ctx}/static/cd/css/mainpage/jquery.jcarousel.css" rel="stylesheet" type="text/css" />
    <!--        <link href="/js/yuislider/yui/fonts/fonts-min.css" rel="stylesheet" type="text/css" />-->
    <link href="${ctx}/static/cd/css/jquerycss/Pager.css" rel="stylesheet" type="text/css" />
    <link href="${ctx}/static/cd/css/mainpage/main.css" rel="stylesheet" type="text/css" />
    <link href="${ctx}/static/cd/css/common/gridGoodsList.css" rel="stylesheet" type="text/css" />
    <link href="${ctx}/static/cd/css/foodsearch/foodsearch.css" rel="stylesheet" type="text/css" />

    <link href="${ctx}/static/cd/js/yuislider/yui/slider/assets/skins/sam/slider.css" rel="stylesheet" type="text/css" />
    <link href="${ctx}/static/cd/css/customer/loginpop.css" rel="stylesheet" type="text/css" />
    <link rel="shortcut icon" href="${ctx}/static/cd/images/favicon.ico" type="image/x-icon" />
    <link href="${ctx}/static/cd/css/common/topBottom.css" rel="stylesheet" type="text/css" />


    <%--<link href="${ctx}/static/css/flaty.css" rel="stylesheet" type="text/css" />
    <link href="${ctx}/static/assets/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />--%>

    <%--<link href="${ctx}/static/assets/bootstrap/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="${ctx}/static/assets/bootstrap/bootstrap-responsive.min.css" rel="stylesheet" type="text/css" />--%>



    <meta name="keywords" content="乐吃网,网上餐厅,网上点菜, 网上点餐,上海餐厅预订,上海餐厅优惠,上海餐厅打折,拼餐,上海餐厅订座,上海餐厅选座,上海餐厅外卖"/>
    <meta name="description" content="乐吃网是国内第一家餐饮网上交易平台，我们不仅提供餐厅信息、评论及预订服务，还为您提供网上点餐、网上选座、网上支付等一系列领先的技术服务，借助互联网使您的家人聚餐，朋友小聚，商务宴请变得更加轻松惬意。想吃就点，生活就是这么简单。"/>
    <!-- <script type="text/javascript" src="js/activity/swfobject.js"></script>  -->

    <script type="text/javascript" src="${ctx}/static/cd/js/jquerylib/jquery-1.10.1.min.js"></script>
    <script type="text/javascript" src="${ctx}/static/assets/bootstrap/bootstrap.min.js"></script>
    <script type="text/javascript" src="${ctx}/static/cd/js/jquerylib/jquery.allinone.js"></script>
    <script type="text/javascript" src="${ctx}/static/cd/js/mainpage.other.allinone.js"></script>
    <script type="text/javascript" src="${ctx}/static/cd/js/include/include.mainpage.allinone.js"></script>
    <script type="text/javascript" src="${ctx}/static/cd/js/yuislider/yuislider.mainpage.allinone.js"></script>
    <script type="text/javascript" src="${ctx}/static/cd/js/mainpage/allinone.js"></script>
    <script type="text/javascript" src="${ctx}/static/cd/js/include/jquery.lightbox-0.5.js"></script>


    <script type="text/javascript">


        var _param = _param || {};
        _param.ctx = '${ctx}/';


        //google 统计分析
        /*var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-739852-2']);
        _gaq.push(['_trackPageview']);
        (function() {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();*/


        var common;
        var _context = _param.ctx;
        var _loginid = '';
        var _loginname = '';
        var cityname = '';
        var cityid = '';
        var load = 'display';

        //餐厅搜索的关键词
        var restword = '';

        //setModelPrefix('mainpagehotfood');



        //设置当前城市
        $(document).ready(function(){

            $.ajax({
                url:"http://api.map.baidu.com/location/ip?ak=5d557add25c3b5fa00d883b79eb3419d",
                dataType:'jsonp',
                data: {},
                jsonp:'callback',
                success:function(result) {
                    console.log(result.content);
                    cityname = result.content.address_detail.city;
                },
                timeout:1000
            });

        });

    </script>



</head>
<body onload="javascript:loadData();" class="yui-skin-sam">




    <%@ include file="header.jsp"%>


    <sitemesh:body></sitemesh:body>



    <div style="clear:both;"></div>

    <style type="text/css">a{text-decoration: none;color:#333333;}</style>
    <center class="footer">


        <div class="protection">
            <div class="sub_box">
                <h1>保障内容</h1>
                <ul>
                    <li><span class="left_span">全额担保</span>点餐成功并支付后，如店家无法为您提供服务，全额退款.</li>
                    <li><span class="left_span">先行赔付</span>如店家提供的服务与网上描述严重不符，乐吃网先行赔付并追究店家责任.</li>
                    <li><span class="left_span">座席优先</span>成功支付的网上订单，店家优先留座.</li>
                </ul>
            </div>
            <div class="middle_box">
                <img alt="消费者保障" src="${ctx}/attached/cd/images/common/protection_icon1.png" />
                <p style="color:#000">已加入消费者保障计划</p>
                <p style="color:#000">请放心购买</p>
            </div>
            <div class="sub_box">
                <h1>维权流程</h1>
                <p>您在消费的过程中，如果遇到问题，可以按照以下步骤获得保障:</p>
                <ul>
                    <li><span>1.</span>主动联系店家进行协商，要求店家履行保障承诺解决问题.</li>
                    <li><span>2.</span>若店家未履行服务承诺，可以申请维权，要求乐吃网介入.</li>
                    <li><span>3.</span>乐吃网会在24小时内介入处理，按照保障条款先行赔付或退款.</li>
                </ul>
            </div>
        </div>
        <p style="margin-bottom:10px;">
            <a href="">关于我们</a> |
            <a href="">友情链接</a> |
            <a href=""> 地区加盟</a> |
            <a href=""> 伙伴计划</a> |
            <a href=""> 帮助</a>
        </p>
        <div class="zfbLink" style="margin-bottom:10px;">
            <img src="${ctx}/attached/cd/images/foot/zfb.png" align="top" style="margin-right:10px">
            <img src="${ctx}/attached/cd/images/foot/logo123x40.jpg">
        </div>
        <div style="clear:both"/>
        <p>乐吃餐饮@2010-2013 copyright all reserved </p>


    </center>


</body>
</html>
