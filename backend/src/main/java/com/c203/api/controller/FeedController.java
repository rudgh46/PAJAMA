package com.c203.api.controller;

import com.c203.api.dto.Feed.FeedDeleteDto;
import com.c203.api.dto.Feed.FeedRegistDto;
import com.c203.api.dto.Feed.FeedShowDto;
import com.c203.api.service.FeedService;
import com.c203.api.service.JwtService;
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
public class FeedController {
    private final JwtService jwtService;
    private final UserService userService;
    private final FeedService feedService;
    @Autowired
    FeedController(JwtService jwtService,UserService userService,FeedService feedService){
        this.jwtService = jwtService;
        this.userService = userService;
        this.feedService = feedService;
    }
    // 피드 생성
    @PostMapping("/mypage")
    public ResponseEntity<?> registFeed(@RequestBody FeedRegistDto feedRegistDto, HttpServletRequest request){
        Map<String,Object> result = new HashMap<>();
        HttpStatus status;

        String roomIdx = feedRegistDto.getRoomIdx();
        roomIdx = roomIdx.replace("&","%26");
        roomIdx = roomIdx.replace("+","%2B");
        roomIdx = roomIdx.replace("=","%3D");
        roomIdx = roomIdx.replace( "/","%2F");

        try{
            String accessToken = request.getHeader("accessToken");
            String decodeEmail = jwtService.decodeToken(accessToken);
            if(!decodeEmail.equals("timeout")){
                FeedShowDto feedShowDto = feedService.registFeed(feedRegistDto, decodeEmail);
                result.put("result",feedShowDto);
                status = HttpStatus.OK;
            }
            else {
                result.put("result", "accessToken 타임아웃");
                status = HttpStatus.UNAUTHORIZED;
            }
        }catch (Exception e){
            System.out.println(e);
            result.put("result","서버에러");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(result,status);
    }
    // 피드 삭제
    @DeleteMapping("/mypage")
    public ResponseEntity<?> deleteUser(HttpServletRequest request,@RequestBody FeedDeleteDto feedDeleteDto){
        Map<String,Object> result = new HashMap<>();
        HttpStatus status;

        String roomIdx = feedDeleteDto.getEmail();
        roomIdx = roomIdx.replace("&","%26");
        roomIdx = roomIdx.replace("+","%2B");
        roomIdx = roomIdx.replace("=","%3D");
        roomIdx = roomIdx.replace( "/","%2F");

        String accessToken = request.getHeader("accessToken");
        String decodeEmail = jwtService.decodeToken(accessToken);
        try{
            boolean is = feedService.deleteFeed(decodeEmail,roomIdx);
            if(is){
                result.put("result","success");
            }
            status = HttpStatus.OK;
        }catch (Exception e){
            result.put("result","서버에러");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(result,status);
    }
    // 사진 불러오기
    @GetMapping("/mypage")
    public ResponseEntity<?> showPicture(HttpServletRequest request){
        Map<String,Object> result = new HashMap<>();
        HttpStatus status;

        try{
            String accessToken = request.getHeader("accessToken");
            String decodeEmail = jwtService.decodeToken(accessToken);
            if(!decodeEmail.equals("timeout")){
                Map map = feedService.showPicture(decodeEmail);
                result.put("result",map);
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