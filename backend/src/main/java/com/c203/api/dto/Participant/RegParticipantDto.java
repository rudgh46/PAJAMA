package com.c203.api.dto.Participant;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RegParticipantDto {
    // %2F의 경우 해결되지 않아서 dto이용 해보기
    private String roomIdx;
}
