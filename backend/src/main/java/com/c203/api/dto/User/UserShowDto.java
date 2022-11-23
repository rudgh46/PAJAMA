package com.c203.api.dto.User;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserShowDto {
    private String email;
    private String name;
    private String tel;
    private String nickname;
}
