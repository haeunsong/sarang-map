package com.sarangmap.sarangmap_back.controller;

import com.sarangmap.sarangmap_back.dto.request.ShuttleStopRegisterRequestDto;
import com.sarangmap.sarangmap_back.dto.response.ShuttleStopListResponseDto;
import com.sarangmap.sarangmap_back.dto.response.ShuttleStopRegisterResponseDto;
import com.sarangmap.sarangmap_back.dto.response.ShuttleStopResponseDto;
import com.sarangmap.sarangmap_back.service.ShuttleStopService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/shuttle-stop")
@CrossOrigin
public class ShuttleStopController {
    private final ShuttleStopService shuttleService;

    // 노선별 정류장 목록 조회
    @GetMapping("/{line}")
    public ResponseEntity<ShuttleStopListResponseDto> getShuttleStops(@PathVariable int line) {
        ShuttleStopListResponseDto response = shuttleService.getShuttleStops(line);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 전체 정류장 목록 조회
    @GetMapping("/all")
    public ResponseEntity<ShuttleStopListResponseDto> getAllShuttleStops() {
        ShuttleStopListResponseDto response = shuttleService.getAllShuttleStops();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
