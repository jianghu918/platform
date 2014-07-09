<%--
  Created by IntelliJ IDEA.
  User: 虎
  Date: 13-8-3
  Time: 下午1:25
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="tags" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>



<div class="row-fluid">
<div class="span12">
<div class="box">
<div class="box-title">
    <h3><i class="icon-table"></i> Company Panel</h3>

    <div class="box-tool">
        <a data-action="collapse" href="#"><i class="icon-chevron-up"></i></a>
        <a data-action="close" href="#"><i class="icon-remove"></i></a>
    </div>
</div>
<div class="box-content">
<div class="btn-toolbar pull-right">
    <div class="btn-group">
        <a class="btn btn-circle show-tooltip" title="" href="<c:url value="/admin/company/add" />" data-original-title="Add new record"><i
                class="icon-plus"></i></a>
        <a class="btn btn-circle show-tooltip" title="" href="#" data-original-title="Edit selected"><i
                class="icon-edit"></i></a>
        <a class="btn btn-circle show-tooltip" title="" href="#" data-original-title="Delete selected"><i
                class="icon-trash"></i></a>
    </div>
    <div class="btn-group">
        <a class="btn btn-circle show-tooltip" title="" href="#" data-original-title="Print"><i class="icon-print"></i></a>
        <a class="btn btn-circle show-tooltip" title="" href="#" data-original-title="Export to PDF"><i
                class="icon-file-text-alt"></i></a>
        <a class="btn btn-circle show-tooltip" title="" href="#" data-original-title="Export to Exel"><i
                class="icon-table"></i></a>
    </div>
    <div class="btn-group">
        <a class="btn btn-circle show-tooltip" title="" href="#" data-original-title="Refresh"><i
                class="icon-repeat"></i></a>
    </div>
</div>
<table class="table table-advance">
    <thead>
    <tr>
        <th style="width:18px"><input type="checkbox"></th>
        <th>name</th>
        <th>展示</th>
        <th>主打菜系</th>
        <th>area</th>
        <th>summary</th>
        <th>是否外送</th>
        <th class="text-center">contact</th>
        <th>phone</th>
        <th style="width:100px">Action</th>
    </tr>
    </thead>
    <tbody>

    <c:forEach items="${pages.content}" var="d" varStatus="s">
        <tr class="table-flag-blue" id="tr_${d.id}">
            <td><input type="checkbox" value="${d.id}"></td>
            <td>${d.name}</td>
            <td>
                <a rel=sexylightbox[group0] title="${d.name}" href="<c:if test="${!empty d.logo}">${d.logo}</c:if><c:if test="${empty d.logo}">/ctr/attached/default/default.jpg</c:if>" >
                    <img class="img-polaroid" alt="${d.name}"  src="<c:if test="${!empty d.logo}">${d.logo}</c:if><c:if test="${empty d.logo}">/ctr/attached/default/default.jpg</c:if>"  style="width: 100px; height: 60px;" onerror="/ctr/attached/default/default.jpg" />
                </a>
            </td>
            <td>${d.entreeType.name}</td>
            <td>${d.area.name}</td>
            <td>${d.summary}</td>
            <td><c:if test="${d.outSide == 0}"><span class="label label-info"><i class="icon-plane"></i>Y</span></c:if>
                <c:if test="${d.outSide != 0}"><span class="label label-important">N</span></c:if>
            </td>
            <td class="text-center">${d.contact}</td>
            <td><span class="label label-success">${d.phone}</span></td>
            <td>
                <div class="btn-group">

                    <a href="#" data-toggle="dropdown" data-original-title="More" class="btn btn-primary show-tooltip dropdown-toggle"><i class="icon-cog"></i> <span class="caret"></span></a>
                    <ul class="dropdown-menu dropdown-primary">
                        <li><a href="<c:url value="/admin/board/" />${d.id}">Board List</a></li>
                        <li><a data-toggle="modal" data-target="#myModal" href="<c:url value="/common/classification/add/" />${d.id}?ajax=1">Classification List</a></li>
                        <li><a href="<c:url value="/admin/dishes/" />${d.id}">Dishes List</a></li>
                    </ul>

                    <a class="btn btn-lime  show-tooltip" title="" href="<c:url value="/admin/company/get/" />${d.id}?op=view" data-original-title="View"><i
                            class="icon-zoom-in"></i></a>
                    <a class="btn btn-primary show-tooltip" title="" href="<c:url value="/admin/company/get/" />${d.id}" data-original-title="Edit"><i
                            class="icon-edit"></i></a>
                    <a class="btn btn-danger show-tooltip" msg="Delete OK!" title="" href="javascript:UTL.del('<c:url value="/admin/company/del" />' ,'${d.id}')" data-original-title="Delete"><i
                            class="icon-trash"></i></a>
                </div>
            </td>
        </tr>
    </c:forEach>

    </tbody>
</table>

<tags:pagination page="${pages}" paginationSize="10"/>

</div>
</div>
</div>
</div>

<jsp:include page="/common/component/lightBox"></jsp:include>