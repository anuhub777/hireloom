package com.anubhav.hireloom_backend.repository;

import com.anubhav.hireloom_backend.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {

    List<Application> findByUserEmail(String email);
    Optional<Application> findByIdAndUserEmail(Long id, String email);

    long countByUserEmail(String email);
    long countByUserEmailAndStatus(
            String email,
            com.anubhav.hireloom_backend.enums.ApplicationStatus status
    );
}
