package com.example.thescreen.service;

import com.example.thescreen.entity.WishList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.thescreen.repository.WishListRepository;

@Service
public class WishListService {

    @Autowired
    private WishListRepository wishListRepository;

    // 영화별 찜 카운트 반환
    public int countByMoviecd(String moviecd) {
        return wishListRepository.countByMoviecdAndWishliststatusTrue(moviecd);
    }

    // 유저의 찜 여부 반환 (true/false)
    public boolean isWishedByUser(String userid, String moviecd) {
        return wishListRepository.existsByUseridAndMoviecdAndWishliststatusTrue(userid, moviecd);
    }

    // 찜 추가/해제 토글
    public boolean toggleWishlist(String userid, String moviecd) {
        // 기존 찜 데이터가 있는지 확인
            WishList existingWishlist = wishListRepository.findByUseridAndMoviecd(userid, moviecd);
        
        if (existingWishlist == null) {
            // 데이터가 없으면 새로 생성 (찜 추가)
            WishList newWishlist = new WishList(userid, moviecd, true);
            wishListRepository.save(newWishlist);
            return true;
        } else {
            // 데이터가 있으면 상태 토글
            existingWishlist.setWishliststatus(!existingWishlist.getWishliststatus());
            wishListRepository.save(existingWishlist);
            return existingWishlist.getWishliststatus();
        }
    }
}
