package com.c203.db.Entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Letter {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int letter_idx;

    private int letter_to;
    private int letter_from;
    private int letter_room;
    private String letter_title;
    private String letter_content;
}