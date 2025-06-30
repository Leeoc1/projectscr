package com.example.thescreen.data;

import com.example.thescreen.entity.Region;
import com.example.thescreen.repository.RegionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

@Component
public class RegionData {

    @Autowired
    private RegionRepository regionRepository;

    @PostConstruct
    public void seed() {
        System.out.println("지역 데이터 생성 시작...");

        String[][] regionData = {
            {"R001", "서울"},
            {"R002", "부산"},
            {"R003", "대구"},
            {"R004", "인천"},
            {"R005", "광주"}
        };

        for (String[] data : regionData) {
            Region region = new Region();
            region.setRegioncd(data[0]);
            region.setRegionnm(data[1]);
            regionRepository.save(region);
        }

        System.out.println("지역 데이터 생성 완료!");
    }
} 