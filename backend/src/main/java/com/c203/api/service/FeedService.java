package com.c203.api.service;

import com.c203.api.dto.Feed.FeedRegistDto;
import com.c203.api.dto.Feed.FeedShowDto;

import java.util.Map;

public interface FeedService {
    FeedShowDto registFeed(FeedRegistDto feedRegistDto,String email) throws Exception;
    boolean deleteFeed(String email,String roomIdx) throws Exception;
    Map showPicture(String decodeEmail) throws Exception;
}
