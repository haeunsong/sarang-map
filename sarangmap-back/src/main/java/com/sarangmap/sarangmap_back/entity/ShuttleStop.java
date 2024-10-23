package com.sarangmap.sarangmap_back.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Entity
@Table(name="shuttleStop")
public class ShuttleStop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long shuttleStopId;
    private String name;

    private BigDecimal lat;
    private BigDecimal lng;

    private int line;

    // 셔틀 정류소 하나에 이미지 여러개
    @JsonIgnore
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @OneToMany(mappedBy="shuttleStop")
    List<Image> images = new ArrayList<>();


    @Builder
    public ShuttleStop(Long shuttleStopId, String name, BigDecimal lat, BigDecimal lng, int line) {
        this.shuttleStopId = shuttleStopId;
        this.name = name;
        this.lat = lat;
        this.lng = lng;
        this.line = line;
    }

    public void initId(Long shuttleStopId) {this.shuttleStopId = shuttleStopId;}
}
