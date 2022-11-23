package com.c203.db.Repository;

import com.c203.db.Entity.Auth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MailRepository extends JpaRepository<Auth, Integer> {
    Optional<Auth> findByAuthEmailAndAuthNum(String email, String authNumber);
    void deleteByAuthEmail(String email);
    List<Auth> findByAuthEmail(String id);
}
