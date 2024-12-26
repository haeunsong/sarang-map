package com.sarangmap.sarangmap_back.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.UUID;

@Service
public class ImageService {

    @Value("${file.path}")
    private String filePath;
    @Value("${file.url}")
    private String fileUrl;

    public String upload(MultipartFile file) {
        if(file.isEmpty())
            return null;

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

}
