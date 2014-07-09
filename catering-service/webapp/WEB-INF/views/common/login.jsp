<%--
  Created by IntelliJ IDEA.
  User: hu
  Date: 13-9-5
  Time: 下午1:27
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set value="${pageContext.request.contextPath}" var="ctx" />

<!-- 登陆内容框 -->
<div id="customerlogindialog" style="display:none;height: auto;">

    <div class="login">
        <div class="roundTop">
            <div class="roundLeft"></div>
            <div class="roundRight"></div>
        </div>
        <div>
            <div class="roundBody">
                <div class="title">
                    <h3>用户登录&nbsp;&nbsp;|&nbsp;
                        <a href="javascript:void(0);" onclick="openIntologin();">用户注册</a></h3>
                </div>

                <div class="clearfix">
                    <div class="loginContent left">
                        <form name="loginForm"  method="post" autocomplete="off" onsubmit="return checkPopLoginForm(this);">

                            <input type="hidden" id="needmobvalid" name="needmobvalid" value=""/>
                            <input type="hidden" id="gourl" name="gourl" value=""/>
                            <div class="rowItem">
                                <div class="info">
                                    &#x3000;用户名：
                                </div>
                                <div class="values">
                                    <input type="text" name="f_emailOrPhone" class="login-txt" />
                                </div>



                                <div class="errTips" style="color:#EBAB26;padding-left: 60px;">
                                    请填写您的邮箱或手机号
                                </div>


                            </div>
                            <div class="rowItem">
                                <div class="info">
                                    &#x3000;密&#x3000;码：
                                </div>
                                <div class="values">
                                    <input type="password" name="f_password" class="login-txt" />
                                </div>
                                <div class="errTips">

                                </div>
                            </div>
                            <!-- <div class="rowItem checkCode">
                                <div class="info">
                                    &#x3000;验证码：
                                </div>
                                <div class="values">
                                    <input type="text" class="login-txt" name="f_chkCode" id="f_chkCode" maxlength="5"/>
                                </div>



                                        <div class="errTips">
                                        </div>


                                <div class="codeValue">
                                    <img  id="imgcheckcode" border="0" alt="验证码" title="点击更换验证码" src="verify/customerCode.htm?length=5" style="cursor:pointer;width:100px;height:30px;" onclick="this.src='verify/customerCode.htm?length=5&rnd=' + Math.random();"/>
                                    <span>看不清? <a href="javascript:void(0)" onclick="javascript:changechkcode();"/>换一张</a></span>
                                    </div>
                            </div> -->
                            <div class="submitBtnLayout">
                                <input type="submit" value="登  录" class="btnyellow" />
                                &nbsp;&nbsp;
                                <a href="javascript:void(0);" onclick="forgetpass();">忘记密码?</a>
                            </div>
                        </form>
                    </div>
                    <div class="rightWrap left">
                        <ul class="linkBlock2">
                            <!--      <li class="clearfix">
                                   <span></span>
                                    <div class="linkContent">
                                      <p class="blue">用人人网登录</p>

                                        <img src="/images/customer/medium-blue-long.png" />
                                    </div>

                                  </li>-->

                            <!--       <li class="clearfix">
                                   <span></span>
                                    <div class="linkContent">
                                      <p class="blue">用新浪博客登录</p>
                                        <img src="/images/customer/24big.png" />

                                    </div>
                                  </li>-->
                            <!--
                                  <li class="clearfix">
                                   <span></span>
                                    <div class="linkContent">
                                      <p class="blue">用开心网登录</p>
                                        <img src="/images/customer/rlink_btnBig.gif" />
                                    </div>

                                  </li>-->

                            <li class="clearfix">
                                <span></span>
                                <div class="linkContent">
                                    <p class="blue">用支付宝登录</p>
                                    <img src="images/customer/zfb_big.png" onclick="javascript:loginzfb();"/>
                                </div>
                                <p style="margin-top: 10px; margin-left: 2px; padding: 5px; background-color: rgb(255, 255, 204);">不用注册乐吃网，您也可以直接用支付宝帐号登录</p>
                            </li>


                        </ul>

                    </div></div>
            </div>

        </div>
        <div class="roundBottom">
            <div class="roundLeft"></div>
            <div class="roundRight"></div>
        </div>
    </div>



</div>













<!-- 手机验证框 -->
<div id="activePhonedialog" style="display:none">
    <div class="login registerSuccess">
        <div class="roundTop">
            <div class="roundLeft"></div>
            <div class="roundRight"></div>
        </div>
        <div class="roundBody" style="width:500px;">
            <div class="title" >
                <h3>
                    验证您的手机号码
                    <em>以便接收您的就餐凭证</em></h3>
            </div>
            <div class="loginContent">
                <form method="post" onsubmit="return checkLoginForm(this);">
                    <div class="rowItem" style="width:450px;">
                        <div class="info currentPhone" style="margin-left:10px; font-size:14px">
                            您当前手机号码为：<span style="color:#ff0000;font-family:Georgia;font-weight:600" id="custphonenum"></span>
                            <a href="javascript:void(0);" onclick="showEditPhoneLayout(event,this);">[修改]</a>
                            <input type="button" value="获取校验码" name="btnSendPhone" size="30"/>
                            <div class="editPhoneLayout hidden">
                                <input type="text" maxlength="11" name="newPhoneNumber" class="login-txt"/>&nbsp;
                                <input type="button" value="确定" onclick="saveNewPhone(this);"/>
                            </div>
                        </div>
                        <div class="errTips" style="padding-left:20px;">

                        </div>
                    </div>
                    <div class="rowItem" style="width:490px;">
                        <div class="info emailOrPhone" style="float:left;font-size:14px;padding-top:5px">
                            &#x3000;输入您收到的校验码：
                        </div>
                        <div class="values" style="float:left;padding-top:5px">
                            <input type="text" name="phoneCheckCode" class="login-txt" maxlength="6"/>
                        </div>
                        <input type="submit" class="next_button" style="float:left" value="下一步" />



                        <div class="errTips">
                            &nbsp;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;
                            <span>输入手机接收到的校验码</span>
                        </div>


                    </div>
                </form>
            </div>
        </div>
        <div class="roundBottom">
            <div class="roundLeft"></div>
            <div class="roundRight"></div>
        </div>
    </div>
</div>