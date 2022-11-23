package com.c203.api.dto.Picture;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PictureRegistDto {
    String roomIdx; // 룸 번호
    String picture; // 사진
}
