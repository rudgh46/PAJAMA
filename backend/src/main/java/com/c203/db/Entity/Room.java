package com.c203.db.Entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Room  {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "room_idx")
    private int roomIdx;

    @Column(name = "room_host")
    private String roomHost;
    @Column(name = "room_name")
    private String roomName;
    @Column(name = "room_desc")
    private String roomDesc;
    private LocalDateTime room_date;
    private LocalDateTime room_opendate;
    private String room_link;
}