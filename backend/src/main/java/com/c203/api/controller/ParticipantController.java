package com.c203.api.controller;

import com.c203.api.dto.Participant.RegParticipantDto;
import com.c203.api.service.JwtService;
import com.c203.api.service.ParticipantService;
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
public class ParticipantController {

    private final JwtService jwtService;
    private final UserService userService;
    private final RoomService roomService;
    private final ParticipantService participantService;
    @Autowired
    ParticipantController(JwtService jwtService, UserService userService, RoomService roomService,ParticipantService participantService){
        this.jwtService = jwtService;
        this.userService = userService;
        this.roomService = roomService;
        this.participantService = participantService;
    }
    // 참여하기 버튼 누르는 경우 파티 참여자 정보 추가
    @PostMapping("/participant")
    public ResponseEntity<?> registParticipant(@RequestBody RegParticipantDto regParticipantDto, HttpServletRequest request){
        Map<String,Object> result = new HashMap<>();
        HttpStatus status;
        try{
            String accessToken = request.getHeader("accessToken");
            String decodeEmail = jwtService.decodeToken(accessToken);

            String roomIdx = regParticipantDto.getRoomIdx();
            roomIdx = roomIdx.replace("&","%26");
            roomIdx = roomIdx.replace("+","%2B");
            roomIdx = roomIdx.replace("=","%3D");
            roomIdx = roomIdx.replace( "/","%2F");

            if(!decodeEmail.equals("timeout")){
                boolean is = participantService.registParticipant(roomIdx,decodeEmail);
                if(is) {
                    result.put("result", "success");
                }
                status = HttpStatus.OK;
            }
            else{
                result.put("result","accessToken 타임아웃");
                status = HttpStatus.UNAUTHORIZED;
            }
        }catch (Exception e){
            result.put("result","서버에러");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(result,status);
    }
}
