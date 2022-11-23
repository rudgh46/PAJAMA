package com.c203.api.service;

import com.c203.api.dto.Mail.MailDeleteDto;
import com.c203.api.dto.Mail.MailPwdDto;
import com.c203.api.dto.Mail.MailSendDto;

public interface MailService {
    void mailSend(MailSendDto mailSendDto);
    String makeAuthNumber();
    boolean mailCheck(String authNumber, String email);
    void mailPwd(MailPwdDto mailPwdDto);
    void deleteMail(MailDeleteDto mailDeleteDto);
}
