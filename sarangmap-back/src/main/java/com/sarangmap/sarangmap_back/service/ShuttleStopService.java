package com.sarangmap.sarangmap_back.service;

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

    // 각 노선별 정류소 목록을 가져온다.
    public List<ShuttleStopResponseDto> getShuttleStops(int line) {
        List<ShuttleStop> shuttleStopList = shuttleStopRepository.findByLine(line);

        return shuttleStopList.stream()
                .map(ShuttleStopResponseDto::from)
                .toList();
    }
}
