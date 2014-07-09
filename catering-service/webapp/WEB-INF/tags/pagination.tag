<%@tag pageEncoding="UTF-8"%>
<%@ attribute name="page" type="org.springframework.data.domain.Page" required="true"%>
<%@ attribute name="paginationSize" type="java.lang.Integer" required="true"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<%
    int current =  page.getNumber() + 1;
    int begin = Math.max(1, current - paginationSize/2);
    int end = Math.min(begin + (paginationSize - 1), page.getTotalPages());

    request.setAttribute("current", current);
    request.setAttribute("begin", begin);
    request.setAttribute("end", end);


%>


<c:if test="${page.totalElements gt 0}">
<c:set var="sortType" value="${fn:substringBefore(page.sort,':')}" />
<c:set var="order" value="${fn:trim(fn:substringAfter(page.sort, ':'))}" />

<div class="pagination pagination-centered">
    <ul>
        <% if (page.hasPreviousPage()){%>
        <li><a href="?page.page=1&page.sort=${sortType}&page.sort.dir=${order}&searchParams=${searchParams}">First</a></li>
        <li><a href="?page.page=${current-1}&page.sort=${sortType}&page.sort.dir=${order}&searchParams=${searchParams}">Previous</a></li>
        <%}else{%>
        <li class="disabled"><a href="#">First</a></li>
        <li class="disabled"><a href="#">Previous</a></li>
        <%} %>

        <c:forEach var="i" begin="${begin}" end="${end}">
            <c:choose>
                <c:when test="${i == current}">
                    <li class="active"><a href="?page.page=${i}&page.sort=${sortType}&page.sort.dir=${order}&searchParams=${searchParams}">${i}</a></li>
                </c:when>
                <c:otherwise>
                    <li><a href="?page.page=${i}&page.sort=${sortType}&page.sort.dir=${order}&searchParams=${searchParams}">${i}</a></li>
                </c:otherwise>
            </c:choose>
        </c:forEach>

        <% if (page.hasNextPage()){%>
        <li><a href="?page.page=${current+1}&page.sort=${sortType}&page.sort.dir=${order}&searchParams=${searchParams}">Next</a></li>
           <li><a href="?page.page=${page.totalPages}&page.sort=${sortType}&page.sort.dir=${order}&searchParams=${searchParams}">Last</a></li>
        <%}else{%>
        <li class="disabled"><a href="#">Next</a></li>
        <li class="disabled"><a href="#">Last</a></li>
        <%} %>

    </ul>
</div>
</c:if>