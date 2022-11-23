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
public class Feed {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int feed_idx;

    @Column(name = "feed_user")
    private String feedUser;
    private String feed_description;
    @Column(name = "feed_room_idx")
    private int feedRoomIdx;
    @Column(name = "feed_represent")
    private Boolean feedRepresent; // 대표하는 사진인지 체크
    private LocalDateTime feed_time;
    @Column(name = "feed_picture")
    private String feedPicture;
}