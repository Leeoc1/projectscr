package com.example.thescreen;

import com.example.thescreen.entity.Region;
import com.example.thescreen.repository.RegionRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;

@SpringBootTest
class ThescreenApplicationTests {
	@Autowired
	RegionRepository regionRepository;

	@Test
	@Transactional
	@Rollback(false)
	public void testInsertData() {

		List<Region> regions = Arrays.asList(
				new Region("01", "서울"),
				new Region("02", "인천"),
				new Region("03", "대전"),
				new Region("04", "대구"),
				new Region("05", "광주"),
				new Region("06", "울산"),
				new Region("07", "부산"),
				new Region("08", "경기"),
				new Region("09", "강원"),
				new Region("10", "충북"),
				new Region("11", "충남"),
				new Region("12", "경북"),
				new Region("13", "경남"),
				new Region("14", "전북"),
				new Region("15", "전남"),
				new Region("16", "제주")
		);
		regionRepository.saveAll(regions);

	}

}
