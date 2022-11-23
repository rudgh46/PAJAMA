package com.c203.api.dto.User;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserModifyDto {
    private String email;
    private String nickname;
    private String tel;
    private String pwd;
    private String name;
}
