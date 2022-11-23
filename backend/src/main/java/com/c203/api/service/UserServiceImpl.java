package com.c203.api.service;

import com.c203.api.dto.User.*;
import com.c203.db.Entity.Feed;
import com.c203.db.Entity.Room;
import com.c203.db.Entity.User;
import com.c203.db.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service

public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private RoomDecoRepository roomDecoRepository;
    @Autowired
    private FeedRepository feedRepository;
    @Autowired
    private ParticipantRepository participantRepository;
    @Override
    public boolean loginUser(UserLoginDto userLoginDto) {
        Optional<User> res = userRepository.findByUserEmailAndUserPwd(userLoginDto.getEmail(), userLoginDto.getPwd());

        if(res.isPresent()){
            return true;
        }else{
             return false;
        }

    }

    // 로그인 후 정보 보여주기
    @Override
    public UserInfoDto infoUser(String email) {
        Optional<User> res = userRepository.findByUserEmail(email);
        if(res.isPresent()){
            // 리턴 타입 dto니까
            UserInfoDto userInfoDto = new UserInfoDto();
            // 값이 비어있겠죠
            userInfoDto.setNickname(res.get().getUserNickname());
            return userInfoDto;
        }
        else return null;
    }

    // 이메일 보낼때 user가 맞는지 확인하기
    @Override
    public boolean findUser(String email, String name) {
        return false;
    }

    // 회원 가입
    @Override
    public boolean registUser(UserRegistDto userRegistDto) {
        Optional<User> userInfo = userRepository.findByUserEmail(userRegistDto.getEmail());
        if(!userInfo.isPresent()){
            User user = new User();
            user.setUserEmail(userRegistDto.getEmail());
            user.setUserNickname(userRegistDto.getNickname());
            user.setUserPwd(userRegistDto.getPwd());
            user.setUserName(userRegistDto.getName());
            user.setUserTel(userRegistDto.getTel());
            userRepository.save(user);
            return true;
        }
        return false;
    }

    // 회원 정보 수정
    @Override
    public boolean modifyUser(UserModifyDto userModifyDto) { // id pwd nickname
        User user = userRepository.findByUserEmail(userModifyDto.getEmail()).get(); // 정확히 동일한 엔티티, 값만 받아오는게 아니라 그 대상을 가지고 있는거
        user.setUserPwd(userModifyDto.getPwd());
        user.setUserNickname(userModifyDto.getNickname());
        user.setUserTel(userModifyDto.getTel());
        user.setUserName(userModifyDto.getName());
        userRepository.save(user);
        return true;
    }

    // 회원 탈퇴
    @Override
    @Transactional
    public boolean deleteUser(String decodeEmail) {
        // 사용자가 호스트인 방, 방데코 모두 삭제
        List<Room> list = roomRepository.findByRoomHost(decodeEmail);
        int size = list.size();
        for(int i=0;i<size;i++){
            Room room = list.get(i);
            int idx = room.getRoomIdx();
            roomRepository.deleteByRoomIdxAndRoomHost(idx, decodeEmail);
            roomDecoRepository.deleteByRoomdecoIdx(idx);
        }
        userRepository.deleteByUserEmail(decodeEmail);
        return true;
    }

    // 전체 정보 보여주기
    @Override
    public UserShowDto showUser(String email) {
        Optional<User> res = userRepository.findByUserEmail(email);
        if(res.isPresent()){
            UserShowDto userShowDto = new UserShowDto();
            userShowDto.setName(res.get().getUserName());
            userShowDto.setEmail(res.get().getUserEmail());
            userShowDto.setNickname(res.get().getUserNickname());
            userShowDto.setTel(res.get().getUserTel());
            return userShowDto;
        }
        else return null;
    }

    // 아이디(이메일) 찾기
    @Override
    public String findEmail(String tel) {
        Optional<User> res = userRepository.findByUserTel(tel); // 전화번호로 가져오기
        String email = res.get().getUserEmail();
        // asdfASDF@naver.com = asd*****@naver.com
        // 이메일 앞자리의 1/3만 보여주기
        int idx = email.indexOf("@");
        int num = (idx-1)/3;
        String front = email.substring(0,num+1);
        String middle = email.substring(num+1,idx);
        String star = "";
        for (int i =0; i<middle.length();i++) star += "*";
        middle = middle.replaceAll(middle,star);
        String back = email.substring(idx,email.length());
        String result = front + middle + back;
        return result;
    }
}