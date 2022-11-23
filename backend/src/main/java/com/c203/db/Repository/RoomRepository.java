package com.c203.db.Repository;

import com.c203.db.Entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, Integer> {
    void deleteByRoomIdxAndRoomHost(int roomIdx,String roomHost);
    Room findByRoomIdxAndRoomHost(int roomIdx, String roomHost);
    Optional<Room> findByRoomIdx(int id);
    List<Room> findByRoomHost(String roomHost);
}
