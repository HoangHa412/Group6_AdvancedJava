package com.group4.HaUISocialMedia_server.service;

import java.util.Date;
import java.time.Instant;

import org.springframework.stereotype.Service;

import com.group4.HaUISocialMedia_server.entity.Token;
import com.group4.HaUISocialMedia_server.repository.TokenRepository;


@Service
public class TokenService {
    private final TokenRepository tokenRepository;

    public TokenService(TokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }
    public String findEmailByKey(String key) {
        Token token = tokenRepository.findByKey(key);
        return token.getValue();
    }
    
    public void save(Token token) {
        Date currentDate = new Date();

        Date expireDate = new Date(currentDate.getTime() + 5 * 60 * 1000);
        token.setStartDate(currentDate);
        token.setEndDate(expireDate);
        tokenRepository.save(token);
    }

    public void deleteTokenByEmail(String email) {
        Token token = tokenRepository.findByValue(email);
        tokenRepository.delete(token);
    }
}
