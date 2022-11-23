package com.c203.api.controller;

import com.c203.api.service.MusicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin("*")
public class MusicController {
    private final MusicService musicService;

    @Autowired
    MusicController(MusicService musicService){
        this.musicService = musicService;
    }
    // 노래 원하는 테마 선택 시 링크 보내주기
    // 호스트 아니어도 선택할 수 있게 설정
    @GetMapping("/music/{musicIdx}")
    public ResponseEntity<?> showMusic(@PathVariable("musicIdx") Integer musicIdx) {
        Map<String, Object> result = new HashMap<>();
        HttpStatus status;
        try {
            String link = musicService.showMusic(musicIdx);
            result.put("result", link);
            status = HttpStatus.OK;
        } catch (Exception e) {
            result.put("result", "서버에러");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(result, status);
    }
}
