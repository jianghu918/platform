<%@ page language="java" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>


<div id="sidebar" class="nav-collapse">
    <ul class="nav nav-list" style="height: auto;">
        <li>
            <form target="#" method="GET" class="search-form">
                <span class="search-pan">
                <button type="submit">
                    <i class="icon-search"></i>
                </button>
                <input type="text" name="search" placeholder="Search ..." autocomplete="off">
                </span>
            </form>
        </li>

        <li class="active">
            <a href="${ctx}/admin">
                <i class="icon-dashboard"></i>
                <span>Dashboard</span>
            </a>
        </li>


        <!--  公共通用设置管理  -->
        <li>
            <a href="#" class="dropdown-toggle">
                <i class="icon-gears icon-2x"></i>
                <span>Common settings</span>
                <b class="arrow icon-angle-right"></b>
            </a>

            <ul class="submenu">
                <li><a href="${ctx}/common/classification/add/0">菜系配置</a></li>
            </ul>

        </li>

        <!--  商家信息管理  -->
        <li>
            <a href="#" class="dropdown-toggle">
                <i class="icon-desktop"></i>
                <span>Company</span>
                <b class="arrow icon-angle-right"></b>
            </a>

            <ul class="submenu">
                <li><a href="${ctx}/admin/company">company info</a></li>
            </ul>

        </li>


        <div id="sidebar-collapse" class="visible-desktop">
            <i class="icon-double-angle-left"></i>
        </div>

</div>