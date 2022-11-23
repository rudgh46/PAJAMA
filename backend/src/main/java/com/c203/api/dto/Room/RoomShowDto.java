package com.c203.api.dto.Room;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class RoomShowDto {
    private String partyHost;
    private String roomId;
    private String partyName;
    private String partyNickname;
    private String partyDesc;
    private LocalDateTime partyDate;
    private int partyBg;
    private int partyCake;
    private int partyCandle;
}
