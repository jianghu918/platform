package com.le07.framework.api.metadata.parser;



import java.util.HashMap;
import java.util.Map;

import com.le07.framework.api.metadata.Doc;


class DocResult extends Doc {
    public static final DocResult NULL = new NullDocResult();
    private static final long serialVersionUID = 7407566290593035488L;
    private Map<String, Doc> fieldDocs = new HashMap<String, Doc>();
    private Map<String, String> errors = new HashMap<String, String>();

    public Map<String, Doc> getFieldDocs() {
        return fieldDocs;
    }

    public void setFieldDocs(Map<String, Doc> fieldDocs) {
        this.fieldDocs = fieldDocs;
    }

    public Map<String, String> getErrors() {
        return errors;
    }

    public void setErrors(Map<String, String> errors) {
        this.errors = errors;
    }

    public Doc getFidleDoc(String name) {
        return fieldDocs.get(name);
    }

    public String getError(String name) {
        return errors.get(name);
    }

    public void putFieldDoc(String name, Doc doc) {
        fieldDocs.put(name, doc);
    }

    public void putError(String key, String value) {
        errors.put(key, value);
    }

    private static class NullDocResult extends DocResult {
        private static final long serialVersionUID = 3516912271361613911L;

        @Override
        public void setFieldDocs(Map<String, Doc> fieldDocs) {
            throw new UnsupportedOperationException();
        }

        @Override
        public void setErrors(Map<String, String> errors) {
            throw new UnsupportedOperationException();
        }

        @Override
        public void putFieldDoc(String name, Doc doc) {
            throw new UnsupportedOperationException();
        }

        @Override
        public void putError(String key, String value) {
            throw new UnsupportedOperationException();
        }

        @Override
        public void setDesc(String desc) {
            throw new UnsupportedOperationException();
        }

        @Override
        public void putTag(String key, String value) {
            throw new UnsupportedOperationException();
        }

        @Override
        public void putTagIfAbsent(String key, String value) {
            throw new UnsupportedOperationException();
        }
    }
}
