package com.c203.api.service;

import com.c203.api.dto.Mail.MailDeleteDto;
import com.c203.api.dto.Mail.MailPwdDto;
import com.c203.api.dto.Mail.MailSendDto;
import com.c203.db.Entity.Auth;
import com.c203.db.Entity.User;
import com.c203.db.Repository.MailRepository;
import com.c203.db.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Random;

@Service
public class MailServiceImpl implements MailService {

    private final JavaMailSender javaMailSender;
    private final MailRepository mailRepository;
    private final UserRepository userRepository;
    private static final String FROM_ADDRESS = "c203ssafy@gmail.com";
    @Autowired
    public MailServiceImpl(MailRepository mailRepository,JavaMailSender javaMailSender,UserRepository userRepository){
        this.mailRepository = mailRepository;
        this.userRepository = userRepository;
        this.javaMailSender = javaMailSender;
    }
    // 회원가입시 메일 보내기
    @Override
    @Transactional
    public void mailSend(MailSendDto mailSendDto) {
        String authKey = makeAuthNumber();
        SimpleMailMessage message = new SimpleMailMessage();
        String subText = "[PAJAMA] 인증번호 입니다. \n 인증번호 : " + authKey;
        message.setTo(mailSendDto.getId());
        message.setFrom(MailServiceImpl.FROM_ADDRESS);
        message.setSubject("[인증번호]");
        message.setText(subText);
        javaMailSender.send(message); // 메일 전송
        List<Auth> mailCheck = mailRepository.findByAuthEmail(mailSendDto.getId());
        if(!mailCheck.isEmpty()){ // 기존에 인증번호가 있다면 제거
            mailRepository.deleteByAuthEmail(mailSendDto.getId());
        }
        Auth mail = new Auth();
        mail.setAuthEmail(mailSendDto.getId());
        mail.setAuthNum(authKey);
        mailRepository.saveAndFlush(mail); // DB 등록
    }

    public String makeAuthNumber() {
        Random random = new Random();
        String authKey = String.valueOf(random.nextInt(888888)+111111);
        return authKey;
    }

    @Override
    @Transactional
    public boolean mailCheck(String authNumber, String email) {
        if(mailRepository.findByAuthEmailAndAuthNum(email, authNumber).isPresent()){
            mailRepository.deleteByAuthEmail(email);
            return true;
        }
        return false;
    }

    // 임시비밀번호 발급
    @Override
    public void mailPwd(MailPwdDto mailPwdDto) {
        String authKey = makeRanNumber();
        SimpleMailMessage message = new SimpleMailMessage();
        String subText = "[PAJAMA] 임시 비밀번호 안내 관련 입니다. \n임시비밀번호 : " + authKey;
        message.setTo(mailPwdDto.getEmail());
        message.setFrom(MailServiceImpl.FROM_ADDRESS);
        message.setSubject("[임시 비밀번호 발급]"); // 제목
        message.setText(subText);
        javaMailSender.send(message); // 메일 전송
        // 바뀐 임시비밀번호를 DB에 등록해야지
        User user = userRepository.findByUserEmail(mailPwdDto.getEmail()).get(); // entity
        user.setUserPwd(authKey);
        userRepository.saveAndFlush(user);
    }

    // 3분 지나면 DB에 저장된 인증번호 삭제되게 하기
    @Override
    @Transactional
    public void deleteMail(MailDeleteDto mailDeleteDto) {
        mailRepository.deleteByAuthEmail(mailDeleteDto.getEmail());
    }

    // 임시 비밀번호 10자리 생성
    private String makeRanNumber() {
        char[] charSet = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
                'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };
        String str = "";
        int idx = 0;
        for (int i = 0; i < 10; i++) {
            idx = (int) (charSet.length * Math.random());
            str += charSet[idx];
        }
        return str;
    }
}