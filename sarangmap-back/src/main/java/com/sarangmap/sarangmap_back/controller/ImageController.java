package com.sarangmap.sarangmap_back.controller;

import com.sarangmap.sarangmap_back.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/images")
@RequiredArgsConstructor
public class ImageController {

    private final ImageService imageService;

    /**
     * 이미지 업로드를 처리합니다.
     *
     * @param file 업로드할 파일
     * @param shuttleStopId 정류소 ID
     * @return 업로드된 이미지 URL
     */
    @PostMapping("/upload")
    public String upload(@RequestParam("file") MultipartFile file, @RequestParam("shuttle_stop_id") Long shuttleStopId) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("파일이 비어 있습니다.");
        }
        if (shuttleStopId == null) {
            throw new IllegalArgumentException("정류소 ID가 필요합니다.");
        }

        return imageService.uploadImage(file,shuttleStopId );
    }

    /**
     * 업로드된 이미지를 가져옵니다.
     *
     * @param fileName 이미지 파일 이름
     * @return 이미지 리소스
     */
    @GetMapping(value="{fileName}", produces ={ MediaType.IMAGE_JPEG_VALUE,MediaType.IMAGE_PNG_VALUE } )
    public Resource getImage(@PathVariable("fileName") String fileName) {
        Resource resource = imageService.getImage(fileName);
        return resource;
    }

    /**
     * 해당 정류소 ID 에 맞는 이미지 url들을 가져옵니다.
     *
     * @param shuttleStopId 사용자가 클릭한 정류소 ID
     * @return 이미지 리소스 리스트
     */
    @GetMapping("/stop/{shuttleStopId}")
    public List<String> getImageListByShuttleStopId(@PathVariable Long shuttleStopId) {
        return imageService.getImagesByShuttleStopId(shuttleStopId);
    }

}
