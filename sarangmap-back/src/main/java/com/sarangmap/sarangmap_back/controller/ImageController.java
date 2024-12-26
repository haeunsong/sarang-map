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

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/images")
@RequiredArgsConstructor
public class ImageController {

    private final ImageService imageService;

    @PostMapping("/upload")
    public String upload(@RequestParam("file") MultipartFile file) {
        String url = imageService.upload(file);
        return url;
    }

    @GetMapping(value="{fileName}", produces ={ MediaType.IMAGE_JPEG_VALUE,MediaType.IMAGE_PNG_VALUE } )
    public Resource getImage(@PathVariable("fileName") String fileName) {
        Resource resource = imageService.getImage(fileName);
        return resource;
    }


}
