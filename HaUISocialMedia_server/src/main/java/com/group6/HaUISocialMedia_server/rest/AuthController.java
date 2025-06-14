package com.group6.HaUISocialMedia_server.rest;

import com.group6.HaUISocialMedia_server.config.JwtTokenProvider;
import com.group6.HaUISocialMedia_server.dto.*;
import com.group6.HaUISocialMedia_server.entity.Token;
import com.group6.HaUISocialMedia_server.entity.User;
import com.group6.HaUISocialMedia_server.repository.UserRepository;
import com.group6.HaUISocialMedia_server.service.AuthService;
import com.group6.HaUISocialMedia_server.service.MailService;
import com.group6.HaUISocialMedia_server.service.TokenService;
import com.group6.HaUISocialMedia_server.service.UserService;
import com.group6.HaUISocialMedia_server.swing.AdminLogin;
import lombok.AllArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final UserService userService;
    private final UserRepository userRepository;
    private final MailService mailService;
    private final TokenService tokenService;

    @Value("${registers.token.urlveryfyToken}")
    private String verifyTokenRegister;

    @Value("${forgetpassword.token.urlVerifyToken}")
    private String verifyTokenReset;

    public AuthController(AuthService authService, UserService userService, UserRepository userRepository,
            TokenService tokenService, MailService mailService) {
        this.authService = authService;
        this.userService = userService;
        this.userRepository = userRepository;
        this.mailService = mailService;
        this.tokenService = tokenService;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<JwtAuthResponse> authenticate(@RequestBody LoginDto loginDto) {
        if (userRepository.getStatusByEmail(loginDto.getEmail())) {
            return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
        }

        try {
            String token = authService.login(loginDto);

            JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
            jwtAuthResponse.setAccessToken(token);

            User currentUser = userService.getCurrentLoginUserEntity();
            if (currentUser == null) {
                return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
            }

            jwtAuthResponse.setLoggedInUser(new UserDto(currentUser));

            if (jwtAuthResponse.getLoggedInUser().getRole().equals("ADMIN")) {
                AdminLogin adminView = new AdminLogin(userService);
                adminView.setVisible(true);
                adminView.setLocationRelativeTo(null);
            }

            return new ResponseEntity<>(jwtAuthResponse, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> sendRegisterEmail(@RequestBody RegisterDto dto) {
        String email = dto.getEmail().trim();
        if (email.isEmpty())
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

        JwtTokenProvider jwtTokenProvider = new JwtTokenProvider();
        String token = jwtTokenProvider.generateTokenRegister();
        Token tokenEntity = new Token();
        tokenEntity.setTokenKey(token);
        tokenEntity.setValue(email);
        tokenService.save(tokenEntity);
        String verifyTokenUrl = this.verifyTokenRegister + token;
        Map<String, String> data = new HashMap<>();
        data.put("verifyTokenUrl", verifyTokenUrl);
        String title = "Hệ thống tạo tài khoản mới";
        String footer = "Hệ thống quản lý đối tượng được hỗ trợ sử dụng dịch vụ của Trường Đại học Công nghiệp Hà Nội";
        data.put("txtFooter", footer);

        this.mailService.sendRegisterEmail(new String[] { email }, data, title);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/registerPassword")
    public ResponseEntity<?> register(@RequestBody RegisterPassword data) {
        String token = data.getToken();

        String email = tokenService.findEmailByKey(token);
        if (email == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Token không hợp lệ");
        }

        if (isValidPassword(data.getPassword().trim())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    "Mật khẩu phải có ít nhất 8 kí tự, bao gồm 1 chữ cái in hoa, 1 chữ số, 1 kí tự đặc biệt");
        }

        if (data.getFirstName() == null || data.getFirstName().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Firstname không được để trống");
        }

        if (data.getLastName() == null || data.getLastName().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Lastname không được để trống");
        }

        if (data.getMsv() == null || data.getMsv().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Mã sinh viên không được để trống");
        }

        userService.register(email, data.getPassword(), data.getFirstName(), data.getLastName(), data.getMsv());
        tokenService.deleteTokenByEmail(email);

        return ResponseEntity.status(HttpStatus.OK).body("Đã Cài đặt mật khẩu thành công");
    }

    @PostMapping("/forgotPassword")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordDto data) {
        String email = data.getEmail().trim();
        if (email.isEmpty())
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

        UserDto oUser = userService.getUserByEmail(email);
        if (oUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email không tồn tại");
        }

        JwtTokenProvider jwtTokenProvider = new JwtTokenProvider();
        String token = jwtTokenProvider.generateTokenRegister();
        Token tokenEntity = new Token();
        tokenEntity.setTokenKey(token);
        tokenEntity.setValue(email);
        tokenService.save(tokenEntity);

        String verifyTokenUrl = this.verifyTokenReset + token;
        Map<String, String> map = new HashMap<>();
        map.put("verifyTokenUrl", verifyTokenUrl);
        String title = "Hệ thống đặt lại mật khẩu";
        String footer = "Hệ thống quản lý đối tượng được hỗ trợ sử dụng dịch vụ của Trường Đại học Công nghiệp Hà Nội";
        map.put("txtFooter", footer);
        this.mailService.sendResetPasswordEmail(new String[] { oUser.getEmail() }, map, title);
        return ResponseEntity.status(HttpStatus.OK).body("Đã gửi email đặt lại mật khẩu");
    }

    @PostMapping("/resetPassword")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordDto data) {
        String token = data.getToken();

        String email = tokenService.findEmailByKey(token);
        if (email == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Token không hợp lệ");
        }

        UserDto oUser = userService.getUserByEmail(email);
        if (oUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email không tồn tại");
        }

        if (isValidPassword(data.getPassword().trim())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    "Mật khẩu phải có ít nhất 8 kí tự, bao gồm 1 chữ cái in hoa, 1 chữ số, 1 kí tự đặc biệt");
        }
        userService.forgetPassword(email, data.getPassword());
        tokenService.deleteTokenByEmail(email);

        return ResponseEntity.status(HttpStatus.OK).body("Đã đặt lại mật khẩu");
    }

    private boolean isValidPassword(@NotNull String password) {
        if (password.length() < 8) {
            return true;
        }
        if (!password.matches(".*\\d.*")) {
            return true;
        }
        if (!password.matches(".*[a-z].*")) {
            return true;
        }
        if (!password.matches(".*[A-Z].*")) {
            return true;
        }
        return !password.matches(".*[!@#$%^&*(),.?\":{}|<>].*");
    }
}
