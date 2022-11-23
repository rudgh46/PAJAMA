package com.c203.api.service;

import com.c203.api.dto.User.*;

public interface UserService {
    boolean loginUser(UserLoginDto userLoginDto);
    UserInfoDto infoUser(String email);
    boolean findUser(String email,String name);
    boolean registUser(UserRegistDto userRegistDto);
    boolean modifyUser(UserModifyDto userModifyDto);
    boolean deleteUser(String decodeEmail);
    UserShowDto showUser(String email);
    String findEmail(String tel);
}
