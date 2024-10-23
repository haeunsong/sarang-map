package com.sarangmap.sarangmap_back.controller;

import com.sarangmap.sarangmap_back.dto.ShuttleStopDto;
import com.sarangmap.sarangmap_back.entity.ShuttleStop;
import com.sarangmap.sarangmap_back.service.ShuttleStopService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/shuttle")
@CrossOrigin
public class ShuttleStopController {
    private final ShuttleStopService shuttleService;

    // 각 라인에 해당하는 모든 셔틀의 name,lat,lng 불러오기
    @GetMapping("{line}")
    public List<ShuttleStopDto> getShuttleStops(@PathVariable int line) {
        return shuttleService.getShuttleStops(line);
    }

}
