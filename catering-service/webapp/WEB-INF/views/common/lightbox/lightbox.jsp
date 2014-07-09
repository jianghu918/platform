<%--
  Created by IntelliJ IDEA.
  User: hu
  Date: 13-8-23
  Time: 下午2:38
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="tags" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>

<link rel="stylesheet" href="${ctx}/static/assets/box/sexylightbox.css">
<script src="${ctx}/static/assets/box/jquery-migrate-1.2.1.js" type="text/javascript"></script>
<script src="${ctx}/static/assets/box/jquery.easing.1.3.js" type="text/javascript"></script>
<script src="${ctx}/static/assets/box/sexylightbox.js" type="text/javascript"></script>

<script>
    $(document).ready(function(){
        SexyLightbox.initialize({color:'white', dir: '<c:url value="/static/assets/box/theme" />'});
    });
</script>