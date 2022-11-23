package com.c203.api.dto.Room;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class RoomDecoDto {
    private String roomId; // 암호화된 룸 번호
    private LocalDateTime date; // 파티룸 시작날짜
    private int bg;
    private int candle;
    private int object;
}
