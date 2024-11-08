package com.sarangmap.sarangmap_back.service;

import com.sarangmap.sarangmap_back.dto.response.ShuttleStopListResponseDto;
import com.sarangmap.sarangmap_back.dto.response.ShuttleStopResponseDto;
import com.sarangmap.sarangmap_back.entity.ShuttleStop;
import com.sarangmap.sarangmap_back.repository.ShuttleStopRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ShuttleStopService {

    private final ShuttleStopRepository shuttleStopRepository;

    // 각 노선별 정류장 조회
    public ShuttleStopListResponseDto getShuttleStops(int line) {
        List<ShuttleStop> shuttleStopList = shuttleStopRepository.findByLine(line);
        List<ShuttleStopResponseDto> shuttleStopDtos = shuttleStopList.stream()
                .map(ShuttleStopResponseDto::from)
                .toList();

        return ShuttleStopListResponseDto.from(shuttleStopDtos);
    }

    // 전체 정류장 조회
    public ShuttleStopListResponseDto getAllShuttleStops() {
        List<ShuttleStop> shuttleStopList = shuttleStopRepository.findAll();
        List<ShuttleStopResponseDto> shuttleStopDtos = shuttleStopList.stream()
                .map(ShuttleStopResponseDto::from)
                .toList();

        return ShuttleStopListResponseDto.from(shuttleStopDtos);
    }
}
