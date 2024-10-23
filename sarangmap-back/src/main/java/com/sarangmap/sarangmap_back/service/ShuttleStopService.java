package com.sarangmap.sarangmap_back.service;

import com.sarangmap.sarangmap_back.dto.ShuttleStopDto;
import com.sarangmap.sarangmap_back.entity.ShuttleStop;
import com.sarangmap.sarangmap_back.repository.ShuttleStopRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ShuttleStopService {

    private final ShuttleStopRepository shuttleRepository;

    public List<ShuttleStopDto> getShuttleStops(int line) {
        return shuttleRepository.findByLine(line)
                .stream()
                .map(shuttleStop -> {
                    return ShuttleStopDto.builder()
                            .shuttleStopId(shuttleStop.getShuttleStopId())
                            .name(shuttleStop.getName())
                            .lat(shuttleStop.getLat())
                            .lng(shuttleStop.getLng())
                            .line(shuttleStop.getLine())
                            .build();
                }).toList();
    }
}
