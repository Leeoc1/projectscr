package com.example.thescreen.data;

import com.example.thescreen.entity.Region;
import com.example.thescreen.repository.RegionRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class RegionData {
    @Autowired
    RegionRepository regionRepository;

    @PostConstruct
    public void initSampleData() {
        // 데이터가 비어 있는 경우에만 삽입
        if (regionRepository.count() == 0) {
            // 지역 이름 배열
            String[] regionNames = {
                    "서울", "인천", "대전", "대구", "광주", "울산", "부산",
                    "경기", "강원", "충북", "충남", "경북", "경남", "전북", "전남", "제주"
            };

            // Region 객체 리스트 생성
            List<Region> regions = new ArrayList<>();
            for (int i = 0; i < regionNames.length; i++) {
                String regionCode = String.format("%02d", i + 1); // 01, 02, ..., 16
                regions.add(new Region(regionCode, regionNames[i]));
            }

            // 리스트를 한 번에 저장
            regionRepository.saveAll(regions);
        }
    }
}
