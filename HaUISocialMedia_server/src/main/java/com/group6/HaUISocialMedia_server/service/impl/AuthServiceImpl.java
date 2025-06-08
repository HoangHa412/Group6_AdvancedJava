package com.group6.HaUISocialMedia_server.service.impl;

import com.group6.HaUISocialMedia_server.config.JwtTokenProvider;
import com.group6.HaUISocialMedia_server.dto.LoginDto;
import com.group6.HaUISocialMedia_server.dto.UserDto;
import com.group6.HaUISocialMedia_server.entity.Role;
import com.group6.HaUISocialMedia_server.entity.User;
import com.group6.HaUISocialMedia_server.repository.UserRepository;
import com.group6.HaUISocialMedia_server.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public String login(LoginDto loginDto) {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.getEmail(),
                loginDto.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtTokenProvider.generateToken(authentication);

        return token;
    }
}