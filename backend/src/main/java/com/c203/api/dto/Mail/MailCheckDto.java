package com.c203.api.dto.Mail;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MailCheckDto {
    private String id;
    private int number;
    private String type;
}
