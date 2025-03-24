package com.group4.HaUISocialMedia_server.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterPassword {
    private String token;
    private String password;
    private String confirmPassword;
    private String firstName;
    private String lastName;
    private String MSV;
}
