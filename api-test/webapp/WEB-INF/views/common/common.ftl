<#macro thriftjs service>
<script src="${ctx}/static/api/${service.parent.name}_types.js" type="text/javascript"></script>
<script src="${ctx}/static/api/${service.name}.js" type="text/javascript"></script>
</#macro>