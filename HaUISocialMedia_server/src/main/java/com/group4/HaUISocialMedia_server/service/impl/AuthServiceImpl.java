package com.group4.HaUISocialMedia_server.service.impl;

import com.group4.HaUISocialMedia_server.config.JwtTokenProvider;
import com.group4.HaUISocialMedia_server.dto.LoginDto;
import com.group4.HaUISocialMedia_server.dto.UserDto;
import com.group4.HaUISocialMedia_server.entity.Role;
import com.group4.HaUISocialMedia_server.entity.User;
import com.group4.HaUISocialMedia_server.repository.UserRepository;
import com.group4.HaUISocialMedia_server.service.AuthService;
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
                loginDto.getUsername(),
                loginDto.getPassword()
        ));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtTokenProvider.generateToken(authentication);

        return token;
    }

    @Override
    public UserDto register(UserDto dto) {
        User existedUser = userRepository.findByUsername(dto.getUsername());
        if (existedUser != null) return null;

        User newUser = new User();

        newUser.setUsername(dto.getUsername());
        newUser.setPassword(passwordEncoder.encode(dto.getPassword()));

        if (dto.getCode() != null)
            newUser.setCode(dto.getCode());

        if (dto.getFirstName() != null)
            newUser.setFirstName(dto.getFirstName());

        if (dto.getLastName() != null)
            newUser.setLastName(dto.getLastName());

        newUser.setGender(dto.isGender());

//        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//        Date birthDate = null;
//        try {
//            birthDate = dateFormat.parse(dto.getBirthDate()));
//        } catch (ParseException e) {
//            e.printStackTrace();
//        }
//        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSSSSS");
//        Date birthDate = null;
//        try {
//            birthDate = dateFormat.parse(String.valueOf(dto.getBirthDate()));
//        } catch (ParseException e) {
//            e.printStackTrace();
//        }
        newUser.setBirthDate(dto.getBirthDate());
//        newUser.setBirthDate(dto.getBirthDate());

        if (dto.getAddress() != null)
            newUser.setAddress(dto.getAddress());

        if (dto.getPhoneNumber() != null)
            newUser.setPhoneNumber(dto.getPhoneNumber());

        if (dto.getEmail() != null)
            newUser.setEmail(dto.getEmail());
        newUser.setRole(Role.USER.name());

        if (dto.getAvatar() != null)
            newUser.setAvatar(dto.getAvatar());

        newUser.setPhoneNumber(dto.getPhoneNumber());

        User savedUser = userRepository.save(newUser);

        if (savedUser == null) return null;

        return new UserDto(savedUser);
    }
}