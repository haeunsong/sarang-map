package com.sarangmap.sarangmap_back.dto;

import com.sarangmap.sarangmap_back.entity.ShuttleStop;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ShuttleStopDto {

    private Long shuttleStopId;
    private String name;

    private BigDecimal lat;
    private BigDecimal lng;

    private int line;

    @Builder
    public ShuttleStopDto(Long shuttleStopId, String name, BigDecimal lat, BigDecimal lng, int line) {
        this.shuttleStopId = shuttleStopId;
        this.name = name;
        this.lat = lat;
        this.lng = lng;
        this.line = line;
    }

    public ShuttleStop toEntity() {
        return ShuttleStop.builder()
                .shuttleStopId(shuttleStopId)
                .name(name)
                .lat(lat)
                .lng(lng)
                .line(line)
                .build();
    }
}
