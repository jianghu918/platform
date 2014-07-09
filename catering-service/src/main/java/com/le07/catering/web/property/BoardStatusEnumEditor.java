package com.le07.catering.web.property;

import com.le07.catering.type.BoardStatus;
import org.springframework.util.StringUtils;

import java.beans.PropertyEditorSupport;

/**
 * Created with IntelliJ IDEA.
 * User: hu
 * Date: 13-8-19
 * Time: 下午5:22
 */
public class BoardStatusEnumEditor extends PropertyEditorSupport {

    private final boolean allowEmpty;


    public BoardStatusEnumEditor(boolean allowEmpty){
        this.allowEmpty = allowEmpty;
    }



    @Override
    public void setAsText(String text) throws IllegalArgumentException {
        if (this.allowEmpty && !StringUtils.hasText(text)) {
            // Treat empty String as null value.
            setValue(BoardStatus.DEFAULT);
        }else
        {
            setValue(BoardStatus.findByValue(Integer.valueOf(text)));
        }
    }

    @Override
    public String getAsText() {
        BoardStatus value = (BoardStatus) getValue();
        return value == null ? BoardStatus.DEFAULT.getLabel() : value.getLabel();
    }
}
