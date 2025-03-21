package com.group4.HaUISocialMedia_server.service;

import com.group4.HaUISocialMedia_server.entity.Role;
import com.group4.HaUISocialMedia_server.entity.User;
import com.group4.HaUISocialMedia_server.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@AllArgsConstructor
public class JwtUserDetailService implements UserDetailsService {
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
        // Try to find user by email first
        Optional<User> userOptional = userRepository.findByEmail(usernameOrEmail);
        User user = null;

        if (userOptional.isPresent()) {
            user = userOptional.get();
        } else {
            // If not found by email, try to find by username
            user = userRepository.findByUsername(usernameOrEmail);
        }

        if (user == null) {
            throw new UsernameNotFoundException("User not exists by Username or Email");
        }

        Set<GrantedAuthority> authorities = new HashSet<>();
        authorities.add(new SimpleGrantedAuthority(Role.valueOf(user.getRole()).name()));

        return new org.springframework.security.core.userdetails.User(
                usernameOrEmail,
                user.getPassword(),
                authorities);
    }
}
