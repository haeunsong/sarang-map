package com.sarangmap.sarangmap_back.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name="images")
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String url;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="shuttle_stop_id")
    private ShuttleStop shuttleStop;

    @Builder
    public Image(String url, ShuttleStop shuttleStop) {
        this.url = url;
        this.shuttleStop = shuttleStop;
    }
}
