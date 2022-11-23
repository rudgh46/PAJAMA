package com.c203.db.Repository;

import com.c203.db.Entity.Participant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ParticipantRepository extends JpaRepository<Participant, Integer> {
    List<Participant> findByParticipantRoom(int roomIdx);
    Optional<Participant> findByParticipantRoomAndParticipantUser(int roomIdx, String email);
}
