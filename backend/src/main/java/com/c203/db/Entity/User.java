package com.c203.db.Entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor

public class User {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer user_idx;

    @Column(name = "user_name")
    private String userName;
    @Column(name = "user_pwd")
    private String userPwd;
    @Column(name = "user_email")
    private String userEmail;
    @Column(name = "user_nickname")
    private String userNickname;
    @Column(name = "user_tel")
    private String userTel;
}