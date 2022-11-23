package com.c203.api.dto.Feed;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class FeedShowDto {
    private String description;
    private String picture;
    private LocalDateTime time;
}
