package com.example.thescreen;

import com.example.thescreen.csvservice.RegionCsvService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ThescreenApplication {
	@Autowired
	RegionCsvService regionCsvService;

	public static void main(String[] args) {
		SpringApplication.run(ThescreenApplication.class, args);
	}
}
