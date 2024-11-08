package com.sarangmap.sarangmap_back.dto.response;

import com.sarangmap.sarangmap_back.entity.ShuttleStop;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Builder
public record ShuttleStopResponseDto(
        Long id,
        String name, // 정류소 이름
        BigDecimal lat,
        BigDecimal lng,
        int line, // 정류소가 속한 노선 번호
        Long number
) {
    // 정적 팩토리 메서드 선언
    public static ShuttleStopResponseDto from(ShuttleStop shuttleStop) {
        return ShuttleStopResponseDto.builder()
                .id(shuttleStop.getId())
                .name(shuttleStop.getName())
                .lat(shuttleStop.getLat())
                .lng(shuttleStop.getLng())
                .line(shuttleStop.getLine())
                .number(shuttleStop.getNumber())
                .build();
    }
}
