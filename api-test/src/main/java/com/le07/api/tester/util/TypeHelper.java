package com.le07.api.tester.util;

import org.apache.commons.lang.StringEscapeUtils;
import org.apache.commons.lang.StringUtils;
import com.le07.framework.api.metadata.Enum;
import com.le07.framework.api.metadata.*;
import com.le07.framework.api.metadata.Object;
import com.le07.framework.api.metadata.Package;

import java.util.List;
import java.util.Stack;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class TypeHelper {
    private static final Pattern TYPE_PATTERN = Pattern.compile("([\\w.]+|>{1,1})");
    private static final Pattern TRIM_PATTERN = Pattern.compile("(?s)^\"*(.*?)\"*$");

    public static String trim(String s) {
        Matcher matcher = TRIM_PATTERN.matcher(s);
        return matcher.find() ? matcher.group(1) : s;
    }

    public static String generateFieldDefalutValue(Package pk, Field f) {
        StringBuilder sb = new StringBuilder();
        String def = f.getValue();
        if (StringUtils.isNotEmpty(def)) {
            if (f.isPrimitiveType()) {
                sb.append(def);
            } else {
                sb.append(pk.getId()).append(Node.SEPARATOR).append(f.getType()).append(Node.SEPARATOR).append(def);
            }
        } else {
            generateTypeDefalutValue(pk, f.getType(), sb);
        }
        def = sb.toString();
        if ("string".equals(f.getType())) {
            def = trim(def);
        }
        return def;
    }

    public static void generateTypeDefalutValue(Package pk, String type, StringBuilder sb) {
        if (Field.PRIMITIVE_DEFALUTS.containsKey(type)) {
            sb.append(Field.PRIMITIVE_DEFALUTS.get(type));
            return;
        }
        if (pk == null) {
            return;
        }

        Field _const = pk.getConst(type);
        if (_const != null) {
            sb.append(_const.getId());
            return;
        }
        Enum _enum = pk.getEnum(type);
        if (_enum != null) {
            sb.append(_enum.getFields().get(0).getId());
            return;
        }
        Object obj = pk.getObject(type);
        if (obj != null) {
            List<Field> fields = obj.getFields();
            sb.append("new ").append(obj.getId()).append("({");
            for (int i = 0, len = fields.size(); i < len; i++) {
                if (i > 0) {
                    sb.append(", ");
                }
                Field f = fields.get(i);
                sb.append(f.getName()).append(":");
                String def = f.getValue();
                if (StringUtils.isNotEmpty(def)) {
                    if (f.isPrimitiveType()) {
                        sb.append(def);
                    } else {
                        sb.append(pk.getId()).append(Node.SEPARATOR).append(f.getType()).append(Node.SEPARATOR).append(def);
                    }
                } else {
                    generateTypeDefalutValue(pk, f.getType(), sb);
                }
            }
            sb.append("})");
            return;
        }
        type = StringEscapeUtils.unescapeXml(type);
        Matcher matcher = TYPE_PATTERN.matcher(type);
        Stack<String> symbols = new Stack<String>();
        while (matcher.find()) {
            String t = matcher.group(1);
            if ("list".equals(t) || "set".equals(t)) {
                sb.append("[");
                symbols.push("]");
            } else if ("map".equals(t)) {
                sb.append("{");
                symbols.push("}");
                symbols.push(":");
                continue;
            } else if (">".equals(t)) {
                sb.append(symbols.pop());
            } else if (StringUtils.contains(t, '.')) {//cross package eg:Type.Privilege
                String[] arr = StringUtils.split(t, '.');
                generateTypeDefalutValue(MetadataFactory.getInstance().getPackage(arr[0]), arr[1], sb);
            } else {
                generateTypeDefalutValue(pk, t, sb);
            }
            if (!symbols.isEmpty() && ":".equals(symbols.peek())) {
                sb.append(symbols.pop());
            }
        }
    }

    public static void main1(String[] args) {
        Package pk = MetadataFactory.getInstance().getPackage("Identity");
        StringBuilder sb = new StringBuilder();
        generateTypeDefalutValue(pk, "map<string,list<map<string,User>>>", sb);
        System.out.println(sb);
    }

    public static void main(String[] args) {
        Package pk = MetadataFactory.getInstance().getPackage("Authorization");
        StringBuilder sb = new StringBuilder();
        generateTypeDefalutValue(pk, "PrivilegeEntry", sb);
        System.out.println(sb);
    }
}
