package com.sarangmap.sarangmap_back.repository;

import com.sarangmap.sarangmap_back.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImageRepository extends JpaRepository<Image, Long> {
    List<Image> findByShuttleStopId(Long shuttleStopId);
}
