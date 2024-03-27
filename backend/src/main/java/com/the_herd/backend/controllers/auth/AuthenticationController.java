package com.the_herd.backend.controllers.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = {"https://the-herd.netlify.app", "http://localhost:3000", "https://the-herd.vercel.app"})
public class AuthenticationController {
    private final AuthenticationService service;
    private final UserDetailsService userDetailsService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody AuthenticationRequest request
    ) {
        System.out.println("Auth");
        return ResponseEntity.ok(service.authenticate(request));
    }

    @PostMapping("/validateSession")
    public ResponseEntity<ValidationResponse> validateSession(
            @RequestBody ValidationRequest request
    ) {
        return ResponseEntity.ok(service.validateSession(request.getEmail(), request.getToken()));
    }
}
