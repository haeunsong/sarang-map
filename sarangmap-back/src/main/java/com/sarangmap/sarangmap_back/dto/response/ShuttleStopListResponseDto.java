package com.sarangmap.sarangmap_back.dto.response;

import lombok.Builder;

import java.util.List;

@Builder
public record ShuttleStopListResponseDto(
        List<ShuttleStopResponseDto> shuttleStopDtos
){
    // 정적 팩토리 메서드 (List<ShuttleStopResponseDto> -> ShuttleStopListDto
    public static ShuttleStopListResponseDto from(List<ShuttleStopResponseDto> shuttleStopDtos) {
        return ShuttleStopListResponseDto.builder()
                .shuttleStopDtos(shuttleStopDtos)
                .build();
    }
}
