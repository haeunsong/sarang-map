package com.sarangmap.sarangmap_back.dto.request;

import com.sarangmap.sarangmap_back.entity.Image;
import com.sarangmap.sarangmap_back.entity.ShuttleStop;
import lombok.Builder;

@Builder
public record ImageRequestDto (
        String url,
        Long shuttleStopId // 클라이언트가 전달한 정류소 ID
){

    public Image toEntity(ShuttleStop shuttleStop) {
        return Image.builder()
                .url(url)
                .shuttleStop(shuttleStop) // 실제 엔터티 객체 설정
                .build();
    }

}
