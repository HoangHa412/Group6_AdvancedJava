package com.group6.HaUISocialMedia_server.service;

import java.time.LocalDateTime;
import java.util.Date;
import java.time.Instant;

import jakarta.transaction.Transactional;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.group6.HaUISocialMedia_server.entity.Token;
import com.group6.HaUISocialMedia_server.repository.TokenRepository;

@Service
public class TokenService {
    private final TokenRepository tokenRepository;

    public TokenService(TokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    public String findEmailByKey(String key) {
        Token token = tokenRepository.findByTokenKey(key);
        return token.getValue();
    }

    public void save(Token token) {
        tokenRepository.save(token);
    }

    public void deleteTokenByEmail(String email) {
        Token token = tokenRepository.findByValue(email);
        tokenRepository.delete(token);
    }

    @Transactional
    @Scheduled(fixedRate = 60000)
    public void deleteExpiredEntries() {
        LocalDateTime fiveMinutesAgo = LocalDateTime.now().minusMinutes(5);
        tokenRepository.deleteByCreatedAtBefore(fiveMinutesAgo);
    }
}
