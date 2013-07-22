package com.le07.commonservice.rating.util;

import com.google.common.collect.Lists;
import com.le07.api.type.RatingType;
import com.le07.commonservice.rating.model.Rating;
import com.le07.framework.util.ThriftUtils;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


/**
 * 转换类
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-10
 * Time: 下午4:08
 */
public class Converter {


    public static Rating toRating(com.le07.api.rating.Rating rating) {
        Rating entity = new Rating();
        //entity.setId(rating.getUserId());
        entity.setBizKey(rating.getBizKey());
        entity.setOwner(rating.getOwner());
        //entity.setUpdateAt();
        entity.setScore(rating.getScore());
        entity.setType(rating.getType().getValue());
        entity.setUserId(rating.getUserId());
        return entity;
    }


    public static com.le07.api.rating.Rating toApiRating(Rating rating) {
        com.le07.api.rating.Rating entity = new com.le07.api.rating.Rating();
        entity.setBizKey(rating.getBizKey());
        entity.setOwner(rating.getOwner());
        entity.setUpdateAt(ThriftUtils.toDateValue(rating.getUpdateAt()));
        entity.setScore(rating.getScore());
        entity.setType(RatingType.findByValue(rating.getType()));
        entity.setUserId(rating.getUserId());
        return entity;
    }

    public static List<Rating> toRatings(List<com.le07.api.rating.Rating> ratings)
    {
        if(CollectionUtils.isEmpty(ratings))
            return Collections.emptyList();
        List<Rating> list = Lists.newArrayListWithCapacity(ratings.size());
        for (com.le07.api.rating.Rating rating : ratings) {
            list.add(toRating(rating));
        }
        return list;
    }

    public static List<com.le07.api.rating.Rating> toApiRatings(List<Rating> ratings)
    {
        if(CollectionUtils.isEmpty(ratings))
            return Collections.emptyList();
        List<com.le07.api.rating.Rating> list = Lists.newArrayListWithCapacity(ratings.size());
        for (Rating rating : ratings) {
            list.add(toApiRating(rating));
        }
        return list;
    }

}
