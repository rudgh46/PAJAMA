package com.c203.api.service;

import com.c203.api.dto.Picture.PictureRegistDto;
import com.c203.db.Entity.Feed;
import com.c203.db.Entity.Participant;
import com.c203.db.Entity.Picture;
import com.c203.db.Entity.Room;
import com.c203.db.Repository.FeedRepository;
import com.c203.db.Repository.ParticipantRepository;
import com.c203.db.Repository.PictureRepository;
import com.c203.db.Repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PictureServiceImpl implements PictureService {
    @Autowired
    private EncryptionService encryptionService;
    @Autowired
    private FeedRepository feedRepository;
    @Autowired
    private PictureRepository pictureRepository;
    @Autowired
    private ParticipantRepository participantRepository;
    @Autowired
    private RoomRepository roomRepository;
    // 사진 저장
    @Override
    public boolean registPicture(PictureRegistDto pictureRegistDto) throws Exception {
        String temp = encryptionService.decrypt(pictureRegistDto.getRoomIdx());
        int id = Integer.parseInt(temp);
        // 사진 테이블에 저장
        Picture picture = new Picture();
        picture.setPicture(pictureRegistDto.getPicture());
        picture.setPicture_roomIdx(id);
        picture.setPicture_time(LocalDateTime.now());
        pictureRepository.save(picture);
        // 해당 방에 있는 모든 참여자들의 feed테이블에 사진 값 저장하기
        List<Participant> list = participantRepository.findByParticipantRoom(id);
        int size = list.size();
        for(int i=0;i<size;i++){
            // 참여자들 목록 확인해서 각자 피드에 사진 넣어주기
            Participant participant = list.get(i);
            Feed feed2 = new Feed();
            feed2.setFeedUser(participant.getParticipantUser());
            feed2.setFeedPicture(picture.getPicture());
            feed2.setFeed_time(picture.getPicture_time());
            feed2.setFeedRoomIdx(id);
            feed2.setFeedRepresent(false);
            feedRepository.save(feed2);
        }
        return true;
    }
}
