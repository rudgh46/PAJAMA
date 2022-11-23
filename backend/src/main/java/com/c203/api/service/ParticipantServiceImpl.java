package com.c203.api.service;

import com.c203.db.Entity.Participant;
import com.c203.db.Repository.ParticipantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ParticipantServiceImpl implements ParticipantService{
    @Autowired
    private EncryptionService encryptionService;
    @Autowired
    private ParticipantRepository participantRepository;

    // 참여하기 버튼을 누른 경우 참여자 목록에 등록
    @Override
    public boolean registParticipant(String roomIdx,String email) throws Exception {
        String temp = encryptionService.decrypt(roomIdx);
        int id = Integer.parseInt(temp); // room_idx
        // 참여하기를 여러번 누르는 경우를 대비하기
        Optional<Participant> participant = participantRepository.findByParticipantRoomAndParticipantUser(id, email);
        if(!participant.isPresent()){
            Participant participant2 = new Participant();
            participant2.setParticipantRoom(id);
            participant2.setParticipantUser(email);
            participantRepository.save(participant2);
        }
        return true;
    }
}
