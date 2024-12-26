package com.sarangmap.sarangmap_back.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name="images")
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    String url;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="shuttle_stop_id")
    ShuttleStop shuttleStop;
}
