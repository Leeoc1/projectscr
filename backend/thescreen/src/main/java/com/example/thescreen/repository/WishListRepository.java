package com.example.thescreen.repository;

import com.example.thescreen.entity.WishList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WishListRepository extends JpaRepository<WishList, Integer> {
    
    // 영화별 찜 카운트 (wishliststatus가 true인 것만)
    int countByMoviecdAndWishliststatusTrue(String moviecd);
    
    // 유저의 찜 여부 (wishliststatus가 true인 것만)
    boolean existsByUseridAndMoviecdAndWishliststatusTrue(String userid, String moviecd);
    
    // 유저와 영화로 찜 데이터 조회 (상태 관계없이)
    WishList findByUseridAndMoviecd(String userid, String moviecd);
}
