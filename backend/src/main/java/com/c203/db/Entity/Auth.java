package com.c203.db.Entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Auth {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer auth_idx;

    @Column(name = "auth_email")
    private String authEmail;
    @Column(name = "auth_num")
    private String authNum;
    @Column(name = "auth_time")
    private String authTime;
}