package com.group4.HaUISocialMedia_server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.group4.HaUISocialMedia_server.entity.Token;


@Repository
public interface TokenRepository extends JpaRepository<Token, Long> {
    Token findByKey(String key);
    
    Token findByValue(String value);
}
