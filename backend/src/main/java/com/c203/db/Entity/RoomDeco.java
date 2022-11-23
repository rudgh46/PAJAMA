package com.c203.db.Entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "room_deco")
public class RoomDeco {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "roomdeco_idx")
    private int roomdecoIdx;

    private int roomdeco_bg;
    private int roomdeco_candle;
    private int roomdeco_object;
}