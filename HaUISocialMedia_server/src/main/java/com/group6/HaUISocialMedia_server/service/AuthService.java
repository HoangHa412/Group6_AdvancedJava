package com.group6.HaUISocialMedia_server.service;

import com.group6.HaUISocialMedia_server.dto.LoginDto;
import com.group6.HaUISocialMedia_server.dto.UserDto;

public interface AuthService {
    String login(LoginDto loginDto);

}
