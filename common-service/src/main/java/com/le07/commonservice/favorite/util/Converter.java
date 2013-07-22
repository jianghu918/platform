package com.le07.commonservice.favorite.util;

import com.google.common.collect.Lists;
import com.le07.commonservice.favorite.model.Favorite;
import com.le07.framework.util.ThriftUtils;
import org.springframework.util.CollectionUtils;

import java.util.List;

/**
 * Favorite Manager
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-15
 * Time: 上午9:55
 */
public class Converter {


    public static Favorite toFavorite(Favorite origin, com.le07.api.favorite.Favorite favorite) {
        Favorite entity = null != origin ? origin : new Favorite();
        entity.setBizKey(favorite.getBizKey());
        entity.setTitle(favorite.getTitle());
        entity.setUserId(favorite.getUserId());
        entity.setOwner(favorite.getOwner());
        entity.setRemark(favorite.getRemark());
        entity.setUrl(favorite.getUrl());
        return entity;
    }

    public static com.le07.api.favorite.Favorite toApiFavorite(Favorite favorite) {
        com.le07.api.favorite.Favorite entity = new com.le07.api.favorite.Favorite();
        entity.setId(favorite.getId());
        entity.setUrl(favorite.getUrl());
        entity.setRemark(favorite.getRemark());
        entity.setOwner(favorite.getOwner());
        entity.setUserId(favorite.getUserId());
        entity.setTitle(favorite.getTitle());
        entity.setBizKey(favorite.getBizKey());
        entity.setCreateAt(ThriftUtils.toDateValue(favorite.getCreateAt()));
        return entity;
    }


    public static List<com.le07.api.favorite.Favorite> toApiFavorites(List<Favorite> favorites) {
        if(CollectionUtils.isEmpty(favorites))
            return Lists.newArrayList();
        List<com.le07.api.favorite.Favorite> list = Lists.newArrayListWithCapacity(favorites.size());
        for (Favorite favorite : favorites) {
            list.add(toApiFavorite(favorite));
        }
        return list;
    }

    public static Query toQuery(com.le07.api.favorite.Query query) {
        Query entity = new Query();
        entity.setTitle(query.getTitle());
        entity.setBizKey(query.getBizKey());
        entity.setOwner(query.getOwner());
        entity.setRemark(query.getRemark());
        entity.setUrl(query.getUrl());
        entity.setUserId(query.getUserId());
        entity.setBeginTime(ThriftUtils.toDate(query.getBeginTime()));
        entity.setEndTime(ThriftUtils.toDate(query.getEndTime()));
        return entity;
    }
}
