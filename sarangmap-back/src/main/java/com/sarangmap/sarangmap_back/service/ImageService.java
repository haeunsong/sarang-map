package com.sarangmap.sarangmap_back.service;

import com.sarangmap.sarangmap_back.dto.request.ImageRequestDto;
import com.sarangmap.sarangmap_back.entity.Image;
import com.sarangmap.sarangmap_back.entity.ShuttleStop;
import com.sarangmap.sarangmap_back.repository.ImageRepository;
import com.sarangmap.sarangmap_back.repository.ShuttleStopRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ImageService {

    @Value("${file.path}")
    private String filePath;
    @Value("${file.url}")
    private String fileUrl;

    private final ImageRepository imageRepository;
    private final ShuttleStopRepository shuttleStopRepository;

    @Transactional
    public String uploadImage(MultipartFile file, Long shuttleStopId) {
        if(file.isEmpty())
            throw new IllegalArgumentException("파일이 비어있습니다.");

        // 정류소 가져오기
        ShuttleStop shuttleStop = shuttleStopRepository.findById(shuttleStopId)
                .orElseThrow(() -> new IllegalArgumentException("정류소를 찾을 수 없습니다."));


        String originalFileName = file.getOriginalFilename();
        // lastIndexOf로 '.' 의 인덱스 위치를 찾고, substring으로 주어진 시작 인덱스부터 끝까지 자른다.
        // 즉 확장자를 얻어낸다.
        String extension = originalFileName.substring(originalFileName.lastIndexOf("."));
        String uuid = UUID.randomUUID().toString();
        String saveFileName = uuid + extension;
        String savePath = filePath + saveFileName;

        try {
            // 파일데이터를 서버에 저장한다.
            file.transferTo(new File(savePath));
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        String url = fileUrl + saveFileName;

        // Image 엔터티 저장
        ImageRequestDto dto = ImageRequestDto.builder()
                .url(url)
                .shuttleStopId(shuttleStopId)
                .build();

        Image image = dto.toEntity(shuttleStop);
        imageRepository.save(image);

        return url;
    }

    public Resource getImage(String fileName) {
        Resource resource = null;

        try {
            resource = new UrlResource("file:" + filePath + fileName);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        return resource;
    }

    public List<String> getImagesByShuttleStopId(Long shuttleStopId) {
        return imageRepository.findByShuttleStopId(shuttleStopId).stream()
                .map(Image::getUrl)
                .collect(Collectors.toList());
    }

}
