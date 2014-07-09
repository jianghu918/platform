package com.le07.commonservice.favorite.dao;

import com.le07.commonservice.favorite.model.Favorite;
import com.le07.framework.util.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * Favorite Dao
 * <p/>
 * Created with IDEA
 * User: jh
 * Date: 13-7-10
 * Time: 下午2:00
 */
@Repository
public interface FavoriteDao extends JpaRepository<Favorite, Long>{


    @Modifying
    @Query("delete from Favorite f where f.id in (?1)")
    void removeFavorites(Long... ids);

    @Modifying
    @Query("delete from Favorite f where f.bizId = ?1 and f.owner = ?2")
    void removeFavoritesByOwner(long bizId, String owner);

    @Query("select count(f) from Favorite f where f.bizId = ?1 and f.userId = ?2 and f.owner = ?3")
    long countFavorites(long bizId, long userId, String owner);


}
