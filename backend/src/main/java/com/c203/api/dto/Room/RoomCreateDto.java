package com.c203.api.dto.Room;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class RoomCreateDto {
    private String partyHost; // 호스트 이름 - 로그인된 사용자가 호스트니까 안받아도됨
    private String partyName; // 파티 이름
    private String partyDesc;
    private LocalDateTime partyDate;
    private int partyBg;
    private int partyCake;
    private int partyCandle;
}
