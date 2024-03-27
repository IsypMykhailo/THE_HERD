package com.the_herd.backend.controllers.auth;

import com.the_herd.backend.config.JwtService;
import com.the_herd.backend.repositories.UserRepository;
import com.the_herd.backend.models.user.Role;
import com.the_herd.backend.models.user.User;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.CachingUserDetailsService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;

    public String register(RegisterRequest request, HttpServletResponse response) {
        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        repository.save(user);
        String jwtToken = jwtService.generateToken(user);
        var insecureJwtToken = jwtService.generateToken(user);
        setJwtCookie(response, jwtToken);
        return insecureJwtToken;
    }

    public String authenticate(AuthenticationRequest request, HttpServletResponse response) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        var insecureJwtToken = jwtService.generateToken(user);

        setJwtCookie(response, jwtToken);
        return insecureJwtToken;
    }

    private void setJwtCookie(HttpServletResponse response, String token) {
        ResponseCookie jwtCookie = ResponseCookie.from("jwt", token)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(7 * 24 * 60 * 60) // For example, valid for one week
                .sameSite("Lax")
                .build();
        response.addHeader("Set-Cookie", jwtCookie.toString());
    }

    public boolean isSessionValid(String email, String token) {
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(email);
        return jwtService.isTokenValid(token, userDetails);
    }
}
