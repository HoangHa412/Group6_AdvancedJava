package com.group4.HaUISocialMedia_server.rest;

import com.group4.HaUISocialMedia_server.config.JwtTokenProvider;
import com.group4.HaUISocialMedia_server.dto.ForgotPasswordDto;
import com.group4.HaUISocialMedia_server.dto.JwtAuthResponse;
import com.group4.HaUISocialMedia_server.dto.LoginDto;
import com.group4.HaUISocialMedia_server.dto.RegisterDto;
import com.group4.HaUISocialMedia_server.dto.ResetPasswordDto;
import com.group4.HaUISocialMedia_server.dto.UserDto;
import com.group4.HaUISocialMedia_server.entity.Token;
import com.group4.HaUISocialMedia_server.entity.User;
import com.group4.HaUISocialMedia_server.repository.UserRepository;
import com.group4.HaUISocialMedia_server.service.AuthService;
import com.group4.HaUISocialMedia_server.service.MailService;
import com.group4.HaUISocialMedia_server.service.TokenService;
import com.group4.HaUISocialMedia_server.service.UserService;
import com.group4.HaUISocialMedia_server.swing.AdminLogin;
import lombok.AllArgsConstructor;

import java.util.HashMap;
import java.util.Map;

import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.method.P;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MailService mailService;

    @Autowired
    private TokenService tokenService;

    @Value("${registers.token.urlveryfyToken}")
    private String verifyToken;

    @PostMapping("/authenticate")
    public ResponseEntity<JwtAuthResponse> authenticate(@RequestBody LoginDto loginDto) {
        String token = authService.login(loginDto);

        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
        jwtAuthResponse.setAccessToken(token);
        jwtAuthResponse.setLoggedInUser(new UserDto(userService.getCurrentLoginUserEntity()));
        if (userRepository.getStatusByUserName(loginDto.getUsername()))
            return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);

        if (jwtAuthResponse.getLoggedInUser().getRole().equals("ADMIN")) {
            AdminLogin adminView = new AdminLogin(userService);
            adminView.setVisible(true);
            adminView.setLocationRelativeTo(null);
        }

        return new ResponseEntity<>(jwtAuthResponse, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<?> sendRegisterEmail(@RequestBody RegisterDto dto) {
        String email = dto.getEmail().trim();
        if (email.isEmpty())
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

        JwtTokenProvider jwtTokenProvider = new JwtTokenProvider();
        String token = jwtTokenProvider.generateTokenRegister();
        Token tokenEntity = new Token();
        tokenEntity.setKey(token);
        tokenEntity.setValue(email);
        tokenService.save(tokenEntity);
        String verifyToken = this.verifyToken + token;
        Map<String, String> data = new HashMap<>();
        data.put("verifyToken", verifyToken);
        String title = "Hệ thống tạo tài khoản mới";
        String footer = "Hệ thống quản lý đối tượng được hỗ trợ sử dụng dịch vụ của Trường Đại học Công nghiệp Hà Nội";
        data.put("txtFooter", footer);

        this.mailService.sendRegisterEmail(new String[] { email }, data, title);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public ResponseEntity<?> register(@RequestBody ResetPasswordDto data){
        String token = data.getToken();

        String email = tokenService.findEmailByKey(token);
        if (email == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Token không hợp lệ");
        }

        if (!isValidPassword(data.getPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Mật khẩu phải có ít nhất 8 kí tự, bao gồm 1 chữ cái in hoa, 1 chữ số, 1 kí tự đặc biệt và không chứa kí tự đặc biệt");
        }
        userService.forgetPassword(email, data.getPassword());
        tokenService.deleteTokenByEmail(email);

        return ResponseEntity.status(HttpStatus.OK).body("Đã Cài đặt mật khẩu thành công");
    }

    @PostMapping("/forgotPassword")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordDto data) {
        String email = data.getEmail().trim();
        if (email.isEmpty()) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
         
        UserDto oUser = userService.getUserByEmail(email);
        if (oUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email không tồn tại");
        }

        JwtTokenProvider jwtTokenProvider = new JwtTokenProvider();
        String token = jwtTokenProvider.generateTokenRegister();
        Token tokenEntity = new Token();
        tokenEntity.setKey(token);  
        tokenEntity.setValue(email);
        tokenService.save(tokenEntity);

        String verifyToken = this.verifyToken + token;
        Map<String, String> map = new HashMap<>();
        map.put("verifyToken", verifyToken);
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

        if (!isValidPassword(data.getPassword().trim())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Mật khẩu phải có ít nhất 8 kí tự, bao gồm 1 chữ cái in hoa, 1 chữ số, 1 kí tự đặc biệt và không chứa kí tự đặc biệt");
        }
        userService.forgetPassword(email, data.getPassword());
        tokenService.deleteTokenByEmail(email);

        return ResponseEntity.status(HttpStatus.OK).body("Đã đặt lại mật khẩu");
    }

    private boolean isValidPassword(@NotNull String password) {
        // Check character length
        if (password.length() < 8) {
            return true;
        }
        // Check character must least one digit
        if (!password.matches(".*\\d.*")) {
            return true;
        }
        // Check character must least one lowercase letter
        if (!password.matches(".*[a-z].*")) {
            return true;
        }
        // Check character must least one uppercase letter
        if (!password.matches(".*[A-Z].*")) {
            return true;
        }
        // Check character must least one special character
        return !password.matches(".*[!@#$%^&*(),.?\":{}|<>].*");
    }
}
