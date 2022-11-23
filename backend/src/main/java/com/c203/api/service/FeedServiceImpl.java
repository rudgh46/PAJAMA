package com.c203.api.service;

import com.c203.api.dto.Feed.FeedRegistDto;
import com.c203.api.dto.Feed.FeedShowDto;
import com.c203.db.Entity.Feed;
import com.c203.db.Repository.FeedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FeedServiceImpl implements FeedService {
    @Autowired
    private EncryptionService encryptionService;
    @Autowired
    private FeedRepository feedRepository;
    // 피드 대표 값이 있으면 기존 값을 지우고 입력 받은 값으로 설정하기
    @Override
    public FeedShowDto registFeed(FeedRegistDto feedRegistDto,String email) throws Exception {
        String temp = encryptionService.decrypt(feedRegistDto.getRoomIdx());
        int id = Integer.parseInt(temp); // room_idx
        // 방번호, 사진, 사용자가 같은 feed를 가져오기 - present를 true로 만들기
        List<Feed> list = feedRepository.findByFeedRoomIdxAndFeedUser(id, email);
        // 처음 사진이 대표 사진
        Feed feedTitle = list.get(0);
        feedTitle.setFeedRepresent(true);
        feedTitle.setFeed_description(feedRegistDto.getDescription());
        feedRepository.save(feedTitle);
        FeedShowDto feedShowDto = new FeedShowDto();
        feedShowDto.setTime(feedTitle.getFeed_time());
        feedShowDto.setDescription(feedTitle.getFeed_description());
        feedShowDto.setPicture(feedTitle.getFeedPicture());
        return feedShowDto;
    }

    // 피드 삭제
    @Override
    @Transactional
    public boolean deleteFeed(String email, String roomIdx) throws Exception {
        String temp = encryptionService.decrypt(roomIdx);
        int id = Integer.parseInt(temp); // room_idx
        feedRepository.deleteByFeedRoomIdxAndFeedUser(id,email);
        return true;
    }

    // 사진 가져오기
    @Override
    public Map showPicture(String decodeEmail) throws Exception {
        // Map<roomIdx,Map<picture,desc>>
        Map<String,Map> map = new HashMap<>();
        // 확인했는지 체크 하기
        Map<Integer,Integer> check = new HashMap<>();
        // 피드에서 사람 기준으로 list로 가져오기
        List<Feed> listAll = feedRepository.findByFeedUser(decodeEmail);
        int sizeA = listAll.size();
        int index = 0;
        for(int i=0;i<sizeA;i++){
            Feed feedtemp = listAll.get(i);
            int size = check.size();
            int num = 0; // 안들어간 roomIdx인지 확인해주기
            for(int j=0;j<size;j++){
                if(check.get(j) != feedtemp.getFeedRoomIdx()) num++; // 안들어가있는부분
            }
            // roomIdx 없었던 거 니까 집어 넣어줘야함
            if(num == size){
                check.put(index, feedtemp.getFeedRoomIdx());
                index++; // i로 돌리면 안들어간거 있을 수 있는데 j에서 확인 못하니까 변수 선언
                // 룸번호 별 피드 사진 가져오기
                List<Feed> list = feedRepository.findByFeedRoomIdxAndFeedUser(feedtemp.getFeedRoomIdx(), decodeEmail);
                Map<String,Object> innerMap = new HashMap<>();
                int sizeB = list.size();
                // 사진 : [사진1,사진2,사진3];
                String[] arr = new String[sizeB];
                String arr2 = "";
                String time = "";
                for (int k=0;k<sizeB;k++){
                    Feed feedtemp2 = list.get(k);
                    String pictureName = feedtemp2.getFeedPicture();
                    arr[k] = pictureName;
                    // 만약 설명 있으면 넣기
                    if(feedtemp2.getFeedRepresent()) arr2 = feedtemp2.getFeed_description();
                    if(k == 0) time = String.valueOf(feedtemp2.getFeed_time()); // 어차피 다 같은 날짜 (시간만 다름)
                }
                innerMap.put("picture",arr);
                innerMap.put("comment",arr2);
                innerMap.put("time",time);
                // 암호화 하기
                String n = Integer.toString(feedtemp.getFeedRoomIdx());
                String roomIdx = encryptionService.encrypt(n);
                innerMap.put("roomidx", roomIdx);
                map.put(roomIdx,innerMap);
            }
        }

        return map;
    }
}