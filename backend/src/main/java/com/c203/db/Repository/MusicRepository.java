package com.c203.db.Repository;

import com.c203.db.Entity.Music;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MusicRepository extends JpaRepository<Music, Integer> {
    Optional<Music> findByMusicIdx(int musicIdx);
}
