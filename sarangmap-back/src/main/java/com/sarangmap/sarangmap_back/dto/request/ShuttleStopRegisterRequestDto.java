package com.sarangmap.sarangmap_back.dto.request;

import com.sarangmap.sarangmap_back.dto.response.ShuttleStopResponseDto;
import com.sarangmap.sarangmap_back.entity.ShuttleStop;

import java.math.BigDecimal;

public record ShuttleStopRegisterRequestDto(
        String name,
        BigDecimal lat,
        BigDecimal lng,
        Long number,
        int line
){
    public ShuttleStop toEntity() {
        return ShuttleStop.builder()
                .name(name)
                .lat(lat)
                .lng(lng)
                .number(number)
                .line(line)
                .build();
    }
}