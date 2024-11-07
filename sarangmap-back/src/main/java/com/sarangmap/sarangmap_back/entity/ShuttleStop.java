package com.sarangmap.sarangmap_back.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
public class ShuttleStop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private BigDecimal lat;
    private BigDecimal lng;
    private Long number; // 노선에서 몇번째 정류장인지
    private int line;

    // 셔틀 정류소 하나에 이미지 여러개
    @JsonIgnore
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @OneToMany(mappedBy="shuttleStop", fetch=FetchType.LAZY, cascade = CascadeType.ALL,orphanRemoval = true)
    List<Image> imageList = new ArrayList<>(); // ShuttleStop 이 사용하는 이미지 목록 (한 정류소에 사진 2장 정도?)
}
