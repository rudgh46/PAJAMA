package com.c203.api.service;

import com.c203.api.dto.Room.RoomCreateDto;
import com.c203.api.dto.Room.RoomDecoDto;
import com.c203.api.dto.Room.RoomModifyDto;
import com.c203.api.dto.Room.RoomShowDto;

public interface RoomService {
    RoomDecoDto createRoom(RoomCreateDto roomCreateDto) throws Exception;
    boolean deleteRoom(String email, String idx) throws Exception;
    boolean modifyRoom(RoomModifyDto roomModifyDto, String roomIdx) throws Exception ;
    RoomShowDto showRoom(String email,String idx) throws Exception ;
}
