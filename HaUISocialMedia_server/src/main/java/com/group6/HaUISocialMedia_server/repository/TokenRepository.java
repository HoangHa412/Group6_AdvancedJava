package com.group6.HaUISocialMedia_server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.group6.HaUISocialMedia_server.entity.Token;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Repository
public interface TokenRepository extends JpaRepository<Token, Long> {
    Token findByTokenKey(String tokenKey);

    Token findByValue(String value);

    void deleteByCreatedAtBefore(LocalDateTime time);
}
