package com.c203.api.controller;

import com.c203.api.dto.Room.RoomCreateDto;
import com.c203.api.dto.Room.RoomDecoDto;
import com.c203.api.dto.Room.RoomModifyDto;
import com.c203.api.dto.Room.RoomShowDto;
import com.c203.api.service.JwtService;
import com.c203.api.service.RoomService;
import com.c203.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin("*")
public class RoomController {
    private final JwtService jwtService;
    private final UserService userService;
    private final RoomService roomService;
    @Autowired
    RoomController(UserService userService, JwtService jwtService,RoomService roomService){
        this.userService = userService;
        this.jwtService = jwtService;
        this.roomService = roomService;
    }
    // 파티룸 생성하기
    @PostMapping("/rooms")
    public ResponseEntity<?> createRoom(@RequestBody RoomCreateDto roomCreateDto,HttpServletRequest request){
        Map<String,Object> result = new HashMap<>();
        HttpStatus status;
        try{
            String accessToken = request.getHeader("accessToken");
            String decodeEmail = jwtService.decodeToken(accessToken);
            // 현재 이 방을 만들고자 하는 사람이 host가 되겠지
            if(!decodeEmail.equals("timeout")){
                roomCreateDto.setPartyHost(decodeEmail);
                RoomDecoDto roomDecoDto = roomService.createRoom(roomCreateDto);
                result.put("result",roomDecoDto);
            }
            status = HttpStatus.OK;
        }catch (Exception e){
            result.put("result","서버에러");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(result,status);
    }
    // 파티룸 삭제하기
    @DeleteMapping("/rooms")
    public ResponseEntity<?> deleteRoom(HttpServletRequest request, @RequestParam("roomIdx")String roomIdx){
        Map<String,Object> result = new HashMap<>();
        HttpStatus status;
        String accessToken = request.getHeader("accessToken");
        String decodeEmail = jwtService.decodeToken(accessToken);
        try{
            // %3D 가 = 로 나와요
            // 특수문자 치환하기
            roomIdx = roomIdx.replace("&","%26");
            roomIdx = roomIdx.replace("+","%2B");
            roomIdx = roomIdx.replace("=","%3D");
            roomIdx = roomIdx.replace("/","%2F");

            // room_idx와 email이 같으면 삭제 - 만든 사람이 삭제하도록
            if(!decodeEmail.equals("timeout")){
                roomService.deleteRoom(decodeEmail,roomIdx);
            }
            result.put("result","success");
            status = HttpStatus.OK;
        }catch (Exception e){
            result.put("result","서버에러");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(result,status);
    }
    // 파티룸 정보 수정하기 - 암호화된 룸 번호 param으로 받기
    @PutMapping("/rooms")
    public ResponseEntity<?> modifyRoom(@RequestBody RoomModifyDto roomModifyDto, HttpServletRequest request, @RequestParam("roomIdx")String roomIdx){
        Map<String,Object> result = new HashMap<>();
        HttpStatus status;
        String accessToken = request.getHeader("accessToken");
        String decodeEmail = jwtService.decodeToken(accessToken);
        try{
            // 호스트만 정보 수정가능 하도록 하기
            if(!decodeEmail.equals("timeout")){
                roomModifyDto.setPartyHost(decodeEmail);
                roomService.modifyRoom(roomModifyDto,roomIdx);
            }
            result.put("result","success");
            status = HttpStatus.OK;
        }catch (Exception e){
            result.put("result","서버에러");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(result,status);
    }
    // 파티정보 불러오기
    @GetMapping("/rooms")
    public ResponseEntity<?> showRoom(HttpServletRequest request,@RequestParam("roomIdx")String roomIdx) {
        Map<String, Object> result = new HashMap<>();
        HttpStatus status;
        String accessToken = request.getHeader("accessToken");
        String decodeEmail = jwtService.decodeToken(accessToken);
        roomIdx = roomIdx.replace("&","%26");
        roomIdx = roomIdx.replace("+","%2B");
        roomIdx = roomIdx.replace("=","%3D");
        roomIdx = roomIdx.replace("/","%2F");
        try {
            // 모두 보여지게 수정하기
            if (!decodeEmail.equals("timeout")) {
                RoomShowDto roomShowDto = roomService.showRoom(decodeEmail,roomIdx);
                roomShowDto.setRoomId(roomIdx);
                result.put("result", roomShowDto);
            }
            status = HttpStatus.OK;
        } catch (Exception e) {
            result.put("result", "서버에러");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(result, status);
    }
}
