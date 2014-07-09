<%--
  Created by IntelliJ IDEA.
  User: hu
  Date: 13-8-23
  Time: 下午2:10
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>

<link rel="stylesheet" href="${ctx }/static/assets/kindeditor/themes/default/default.css" />
<script charset="utf-8" src="${ctx }/static/assets/kindeditor/kindeditor.js"></script>
<script charset="utf-8" src="${ctx }/static/assets/kindeditor/zh_CN.js"></script>

<%--多文件--%>
<c:if test="${param._isMulti}">
    <script>
        KindEditor.ready(function(K) {
            var editor = K.editor({
                allowFileManager : true,
                uploadJson:'<c:url value="/common/editor" />',
                fileManagerJson:'<c:url value="/common/editor/fileManager" />'
            });
            K('#J_selectImage').click(function() {
                editor.loadPlugin('multiimage', function() {
                    editor.plugin.multiImageDialog({
                        clickFn : function(urlList) {
                            var div = K('#J_imageView');
                            div.html('');
                            K.each(urlList, function(i, data) {
                                div.append('<input type="hidden" name="${param._name}" value="'+data.url+'" />');
                                div.append('<img class="img-rounded" style="width: 120px; height: 120px; margin: 5px 5px;" src="' + data.url + '">');
                            });
                            editor.hideDialog();
                        }
                    });
                });
            });
        });
    </script>

    <div class="_upload">
        <div id="J_imageView" >
            <c:forEach var="img_src" items="${param._value}">
                <input type="hidden" name="${param._name}" value="${fn:replace(fn:replace(img_src, "[", ""), "]", "")}" />
                <img src="${fn:replace(fn:replace(img_src, "[", ""), "]", "")}" style="width: 120px; height: 120px; margin: 5px 5px;" class="img-rounded">
            </c:forEach>
        </div>
        <button type="button" class="btn btn-primary show-tooltip" id="J_selectImage" > <i class="icon-cloud-upload"></i> 批量上传</button>
    </div>
</c:if>

<c:if test="${!param._isMulti}">
<script type="text/javascript">
    KindEditor.ready(function(K) {
        var editor = K.editor({
            allowFileManager:true,
            uploadJson:'<c:url value="/common/editor" />',
            fileManagerJson:'<c:url value="/common/editor/fileManager" />'
        });

        K("#_showImg_btn").click(function(){
            editor.loadPlugin('image', function(){
                editor.plugin.imageDialog({
                    imageUrl: K("#c_showImg").val(),
                    clickFn:function(url, title, width, height, border, align){
                        K("#_showImg").val(url);
                        $("#_showImg_img").attr('src', url);
                        $("#_showImg_img").fadeIn(600);
                        editor.hideDialog();
                    }
                });
            });
        });
    });


    $(document).ready(function(){
        if('${param._name}')
        {
            $("#_showImg").attr('name', '${param._name}');
        }
        if('${empty param._value}' && '${param._value}' != '')
        {
            $("#_showImg").val('${param._value}');
            $("#_showImg_img").show(500);
            $("#_showImg_img").attr('src', '${param._value}');
        }
    });



</script>

<div class="_upload">
    <input id="_showImg" type="hidden" name="showImg" value="" readonly="readonly" />
    <img style="display: none; height: 120px; " id="_showImg_img" class="img-rounded">
    <button type="button" class="btn btn-primary show-tooltip" id="_showImg_btn" > <i class="icon-cloud-upload"></i> Upload</button>
</div>
</c:if>