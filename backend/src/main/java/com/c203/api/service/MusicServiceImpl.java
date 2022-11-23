package com.c203.api.service;

import com.c203.db.Entity.Music;
import com.c203.db.Repository.MusicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MusicServiceImpl implements MusicService{
    @Autowired
    MusicRepository musicRepository;
    // 해당 테마 링크 던져주기
    @Override
    public String showMusic(int musicIdx) {
        Optional<Music> music = musicRepository.findByMusicIdx(musicIdx);
        String link = music.get().getMusic_link();
        return link;
    }
}