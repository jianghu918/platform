package com.le07.commonservice.base;

import com.le07.commonservice.app.dao.AppDao;
import com.le07.commonservice.app.dao.BizDao;
import com.le07.commonservice.comment.dao.CommentDao;
import com.le07.commonservice.counter.dao.CountDao;
import com.le07.commonservice.favorite.dao.FavoriteDao;
import com.le07.commonservice.file.dao.FileStroeDao;
import com.le07.commonservice.identity.dao.RoleDao;
import com.le07.commonservice.identity.dao.UserDao;
import com.le07.commonservice.rating.dao.RatingDao;
import com.le07.commonservice.standard.dao.AreaDao;
import com.le07.commonservice.standard.dao.ClassificationDao;
import com.le07.commonservice.standard.dao.UnitDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * <p/>
 * Created with IDEA
 * User: 虎
 * Date: 13-8-3
 * Time: 下午10:19
 */
@Repository(value = "baseManager")
public class BaseManagerImpl {

    @Autowired
    private AppDao appDao;

    @Autowired
    private BizDao bizDao;



    @Autowired
    protected AreaDao areaDao;

    @Autowired
    protected ClassificationDao classificationDao;

    @Autowired
    protected UnitDao unitDao;

    @Autowired
    protected CommentDao commentDao;

    @Autowired
    protected CountDao countDao;


    @Autowired
    protected UserDao userDao;

    @Autowired
    protected RoleDao roleDao;

    @Autowired
    protected FavoriteDao favoriteDao;

    @Autowired
    protected RatingDao ratingDao;

    @Autowired
    protected FileStroeDao fileStroeDao;


    public long getBizId(String bizKey)
    {
        return bizDao.getBizId(bizKey);
    }

    public String getBizKey(long bizId)
    {
        return bizDao.getBizKey(bizId);
    }

}
