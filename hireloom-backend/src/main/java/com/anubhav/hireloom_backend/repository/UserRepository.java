package com.anubhav.hireloom_backend.repository;

import com.anubhav.hireloom_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    /*
    save()
    findAll()
    findById()
    deleteById()
    count()
     */

    Optional<User> findByEmail(String email);
}
