package com.le07.framework.api.metadata.parser;


import org.apache.commons.lang.StringUtils;
import org.dom4j.Attribute;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.xml.sax.Attributes;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;
import org.xml.sax.XMLReader;
import org.xml.sax.helpers.DefaultHandler;
import org.xml.sax.helpers.XMLReaderFactory;
import com.le07.framework.api.metadata.*;
import com.le07.framework.api.metadata.Enum;
import com.le07.framework.api.metadata.Object;
import com.le07.framework.api.metadata.Package;

import java.io.InputStream;
import java.util.*;

@SuppressWarnings("unchecked")
public class PackageParser {

    static class GotIdException extends SAXException {
        private static final long serialVersionUID = -8468398815006457415L;
        private String id;

        GotIdException(String id) {
            this.id = id;
        }

        public String getId() {
            return id;
        }
    }

    public String getPackageId(InputStream input) throws Exception {
        XMLReader reader = XMLReaderFactory.createXMLReader();
        reader.setContentHandler(new DefaultHandler() {
            @Override
            public void startElement(String uri, String localName, String qName, Attributes attributes) throws SAXException {
                if ("package".equals(localName)) {
                    throw new GotIdException(attributes.getValue("jsns"));
                }
                super.startElement(uri, localName, qName, attributes);
            }
        });
        try {
            reader.parse(new InputSource(input));
        } catch (GotIdException e) {
            return e.getId();
        } finally {
            input.close();
        }
        return null;
    }

    public Package parse(InputStream input) throws Exception {
        try {
            Element root = new SAXReader().read(input).getRootElement();
            Package pk = parsePackage(root);
            Element consts = root.element("consts");
            if (consts != null) {
                pk.setConsts(parseFields(consts.elements(), null, pk));
            }
            pk.setEnums(parseEnums(root.element("enums"), pk));
            pk.setObjects(parseObjects(root.element("objects"), pk));
            pk.setServices(parseServices(root.element("services"), pk));
            return pk;
        } finally {
            input.close();
        }
    }

    private Package parsePackage(Element el) {
        Package pk = new Package();
        Map<String, String> nsMap = new HashMap<String, String>(4);
        for (Attribute attr : (List<Attribute>) el.attributes()) {
            String name = attr.getName();
            String value = attr.getValue();
            if ("name".equals(name)) {
                pk.setName(value);
            } else {
                nsMap.put(name, value);
            }
        }
        pk.setNamespaces(nsMap);
        pk.setId(pk.getNamespace("js"));
        parseDoc(el, pk);
        return pk;
    }

    private List<Enum> parseEnums(Element el , Node parent) {
        if (el == null) {
            return Collections.EMPTY_LIST;
        }
        List<Element> nodes = el.elements();
        List<Enum> enums = new ArrayList<Enum>(nodes.size());
        for (Element node : nodes) {
            Enum e = new Enum();
            e.setName(node.attributeValue("name"));
            e.setParent(parent);
            e.setFields(parseFields(node.elements("item"), parseDoc(node, e), e));
            enums.add(e);
        }
        return enums;
    }

    private List<Object> parseObjects(Element el, Node parent) {
        if (el == null) {
            return Collections.EMPTY_LIST;
        }
        List<Element> nodes = el.elements();
        List<Object> objects = new ArrayList<Object>(nodes.size());
        for (Element node : nodes) {
            Object object = new Object();
            object.setName(node.attributeValue("name"));
            object.setParent(parent);
            DocResult docResult = parseDoc(node, object);
            object.setEx("true".equals(node.attributeValue("isEx")));
            object.setFields(parseFields(node.elements("field"), docResult, object));
            objects.add(object);
        }
        return objects;
    }

    private List<Service> parseServices(Element el, Node parent) {
        if (el == null) {
            return Collections.EMPTY_LIST;
        }
        List<Element> nodes = el.elements();
        List<Service> services = new ArrayList<Service>(nodes.size());
        for (Element node : nodes) {
            Service service = new Service();
            service.setName(node.attributeValue("name"));
            service.setParent(parent);
            parseDoc(node, service);
            service.setMethods(parseMethods(node.elements("method"), service));
            services.add(service);
        }
        Collections.sort(services);
        return services;
    }

    private List<Method> parseMethods(List nodes, Node parent) {
        List<Method> methods = new ArrayList<Method>(nodes.size());
        for (Element node : (List<Element>) nodes) {
            Method method = new Method();
            method.setName(node.attributeValue("name"));
            method.setParent(parent);
            DocResult docResult = parseDoc(node, method);
            method.setReturntype(node.attributeValue("returntype"));
            method.setArgs(parseFields(node.elements("arg"), docResult, method));
            method.setExs(parseFields(node.elements("ex"), docResult, method));
            methods.add(method);
        }
        return methods;
    }

    private List<Field> parseFields(List nodes, DocResult outerDoc, Node parent) {
        List<Field> fields = new ArrayList<Field>(nodes.size());
        for (Element node : (List<Element>) nodes) {
            Field field = new Field();
            String name = node.attributeValue("name");
            field.setName(name);
            field.setParent(parent);
            DocResult docResult = parseDoc(node, field);
            String type = node.attributeValue("type");
            field.setType(type);
            field.setRequired(!"optional".equals(node.attributeValue("required")));
            String index = node.attributeValue("index");
            if (index != null) {
                field.setIndex(Integer.parseInt(index));
            }
            String nodeName = node.getName();
            if ("const".equals(nodeName)) {//常量
                field.setValue(node.element("value").getStringValue());
            } else if ("item".equals(nodeName)) {//枚举项
                String value = node.attributeValue("value");
                field.setIndex(Integer.parseInt(value)); //设置枚举项的index为对应value
                field.setValue(value);
            } else if ("ex".equals(nodeName)) {//异常
                Doc fieldDoc = field.getDoc();
                if (fieldDoc == DocResult.NULL) {
                    field.setDoc(fieldDoc = new Doc());
                }
                for (Map.Entry<String, String> entry : docResult.getErrors().entrySet()) {//将doc中的异常信息写入属性
                    fieldDoc.putTag(entry.getKey(), entry.getValue());
                }
                if (outerDoc != null) {//方法文档不为空
                    String outerEx = outerDoc.getError(name);//读取方法文档中的异常描述
                    if (StringUtils.isEmpty(fieldDoc.getDesc()) && outerEx != null) {//如果自己的文档没有注释,则设置为方法的注释
                        fieldDoc.setDesc(outerEx);
                    }
                    if ("Type.AnyException".equals(type)) {//如果是通用的AnyException,则将外部定义的类似@error 315 无效用户状态写入属性
                        for (Map.Entry<String, String> entry : outerDoc.getErrors().entrySet()) {
                            String key = entry.getKey();
                            if (!key.endsWith("Exception")) {//若果是Exception说明不是一个异常代码
                                fieldDoc.putTag(entry.getKey(), entry.getValue());
                            }
                        }
                    }
                }
            } else {
                field.setValue(node.attributeValue("default"));
            }
            if (outerDoc != null) {
                Doc outerFieldDoc = outerDoc.getFidleDoc(field.getName());//判断外部是否定义了字段的描述文档
                if (outerFieldDoc != null) {
                    Doc fieldDoc = field.getDoc();
                    if (fieldDoc == DocResult.NULL) {
                        field.setDoc(outerFieldDoc);
                    } else {
                        if (StringUtils.isEmpty(fieldDoc.getDesc())) {
                            fieldDoc.setDesc(outerFieldDoc.getDesc());
                        }
                        for (Map.Entry<String, String> entry : outerFieldDoc.getTags().entrySet()) {
                            fieldDoc.putTagIfAbsent(entry.getKey(), entry.getValue());//默认内部注视优先
                        }
                    }
                }
            }
            fields.add(field);
        }
        return fields;
    }

    private DocResult parseDoc(Element node, Node n) {
        Element doc = node.element("doc");
        DocResult docResult = null;
        if (doc != null) {
            String text = doc.getStringValue();
            if (StringUtils.isNotEmpty(text)) {
                docResult = DocParser.parse(text);
            }
        }
        if (docResult == null) {
            docResult = DocResult.NULL;
        }
        n.setDoc(docResult);
        return docResult;
    }
}
