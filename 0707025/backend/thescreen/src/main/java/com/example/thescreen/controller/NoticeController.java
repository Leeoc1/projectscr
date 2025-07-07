package com.example.thescreen.controller;

import com.example.thescreen.entity.Notice;
import com.example.thescreen.repository.NoticeRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/notice")
public class NoticeController {

    private final NoticeRepository noticeRepository;

    public NoticeController(NoticeRepository noticeRepository) {
        this.noticeRepository = noticeRepository;
    }

    @GetMapping("/top5")
    public List<String> getTop5Notices() {
        return noticeRepository.findTop5ByNoticetypeNotOrderByNoticenumDesc("문의")
        .stream()
        .map(notice -> notice.getNoticesub())
        .collect(Collectors.toList());
    }

    @GetMapping("/notice")
    public List<Notice> getNotices() {
        return noticeRepository.findAll();
    }
}