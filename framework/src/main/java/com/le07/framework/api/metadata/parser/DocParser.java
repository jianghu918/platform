package com.le07.framework.api.metadata.parser;



import java.util.HashSet;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.le07.framework.api.metadata.Doc;


public class DocParser {
    private static final Pattern TAG_PATTERN = Pattern.compile("(?s)@(\\w+)\\s*(.*?)\\s*(?=[^\\\\]@\\w+\\s+|$)");
    private static final Pattern VALUE_PATTERN = Pattern.compile("(?s)^(\\S+)\\s*(.*)\\s*");
    private static final Pattern TRIM_PATTERN = Pattern.compile("(?s)^\\s*(.*?)\\s*$");
    private static final Pattern LABEL_PATTERN = Pattern.compile("^([\\w\\u4e00-\\u9fa5]*)");
    private static final Set<String> OBJECT_TAG_NAMES = new HashSet<String>();
    private static final Set<String> FIELD_TAG_NAMES = new HashSet<String>();

    static {
        OBJECT_TAG_NAMES.add("return");
        OBJECT_TAG_NAMES.add("throws");
        OBJECT_TAG_NAMES.add("exception");
        OBJECT_TAG_NAMES.add("error");
        FIELD_TAG_NAMES.add("param");
        FIELD_TAG_NAMES.add("field");
    }

    public static DocResult parse(String text) {
        text = trim(text);
        Matcher nameMatcher = TAG_PATTERN.matcher(text);
        DocResult doc = new DocResult();
        boolean start = true;
        Doc fieldDoc = null;
        while (nameMatcher.find()) {
            if (start) {
                doc.setDesc(trim(text.substring(0, nameMatcher.start())));
                start = false;
            }
            String name = nameMatcher.group(1);
            String value = nameMatcher.group(2);
            if (OBJECT_TAG_NAMES.contains(name)) {
                if (!"return".equals(name)) {
                    Matcher fieldMatcher = VALUE_PATTERN.matcher(value);
                    if (fieldMatcher.find()) {
                        doc.putError(fieldMatcher.group(1), fieldMatcher.group(2));
                    }
                } else {
                    doc.putTag(name, value);
                }
                continue;
            } else if (FIELD_TAG_NAMES.contains(name)) {
                Matcher fieldMatcher = VALUE_PATTERN.matcher(value);
                if (fieldMatcher.find()) {
                    fieldDoc = new Doc();
                    fieldDoc.setDesc(fieldMatcher.group(2));
                    fieldDoc.setLabel(getLabel(fieldDoc.getDesc()));
                    doc.putFieldDoc(fieldMatcher.group(1), fieldDoc);
                }
                continue;
            } else if ("label".equals(name)) {
                if (fieldDoc != null) {
                    fieldDoc.setLabel(value);
                } else {
                    doc.setLabel(value);
                }
                continue;
            }
            if (fieldDoc != null) {
                fieldDoc.putTag(name, value);
            } else {
                doc.putTag(name, value);
            }
        }
        if (doc.getDesc() == null) {
            doc.setDesc(text);
        }
        if (doc.getLabel() == null) {
            doc.setLabel(getLabel(doc.getDesc()));
        }
        return doc;
    }

    public static String trim(String s) {
        Matcher matcher = TRIM_PATTERN.matcher(s);
        return matcher.find() ? matcher.group(1) : s;
    }

    private static String getLabel(String s) {
        Matcher matcher = LABEL_PATTERN.matcher(s);
        return matcher.find() ? matcher.group(1) : null;
    }

    public static void main(String[] args) {
        System.out.println(parse("应用的编号\n" +
                "\n" +
                "@readonly"));
    }
}
