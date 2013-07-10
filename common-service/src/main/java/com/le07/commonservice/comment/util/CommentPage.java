package com.le07.commonservice.comment.util;

import java.util.List;
import com.le07.commonservice.comment.model.Comment;

/**
 * Comment Page
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-8
 * Time: 下午1:28
 */
public class CommentPage {

    private List<Comment> items; // optional
    private int total; // optional

    public List<Comment> getItems() {
        return items;
    }

    public void setItems(List<Comment> items) {
        this.items = items;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }
}
