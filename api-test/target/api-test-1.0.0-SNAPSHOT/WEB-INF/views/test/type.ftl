<#if node??>
	<#if type=='Object'>
		<table class="table table-bordered table-striped">
		    <tr>
		        <th>名称</th>
		        <th>类型</th>
		        <th>读写</th>
		        <th>说明</th>
		    </tr>
			<#list node.fields as f>
		    <tr>
		        <td>${f.name}</td>
		        <td><span class="t-type">${f.type?xml!}</span></td>
		        <td><#if f.readonly??>只读<#else>--</#if></td>
		        <td>${f.desc!}</td>
		    </tr>
			</#list>
		</table>
	<#elseif type=='Enum'>
		<table class="table table-bordered table-striped">
		    <tr>
		        <th>名称</th>
		        <th>索引号</th>
		        <th>说明</th>
		    </tr>
		    <#list node.fields as f>
		        <tr>
		            <td>${f.name}</td>
		            <td>${f.index}</td>
		            <td>${f.desc!}</td>
		        </tr>
		    </#list>
		</table>
	</#if>
</#if>