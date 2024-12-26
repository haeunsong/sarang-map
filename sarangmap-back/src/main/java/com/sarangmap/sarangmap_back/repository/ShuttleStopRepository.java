package com.sarangmap.sarangmap_back.repository;

import com.sarangmap.sarangmap_back.entity.ShuttleStop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ShuttleStopRepository extends JpaRepository<ShuttleStop, Integer> {

    List<ShuttleStop> findByLine(int line);

    Optional<ShuttleStop> findById(Long shuttleStopId);

}
