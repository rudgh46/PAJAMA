package com.c203.api.controller;

import com.c203.api.dto.Picture.PictureRegistDto;
import com.c203.api.service.JwtService;
import com.c203.api.service.PictureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin("*")
public class PictureController {
    private final JwtService jwtService;

    private final PictureService pictureService;
    @Autowired
    PictureController(JwtService jwtService, PictureService pictureService){
        this.jwtService = jwtService;
        this.pictureService = pictureService;
    }
    // 호스트가 사진 찍으면 사진 저장
    @PostMapping("/picture")
    public ResponseEntity<?> registPicture(@RequestBody PictureRegistDto pictureRegistDto){
        Map<String,Object> result = new HashMap<>();
        HttpStatus status;
        try{
            boolean is = pictureService.registPicture(pictureRegistDto);
            if(is){
                result.put("result", "success");
            }
            status = HttpStatus.OK;
        }catch (Exception e){
            result.put("result","서버에러");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(result,status);
    }
}
