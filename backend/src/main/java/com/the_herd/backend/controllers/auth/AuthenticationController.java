package com.the_herd.backend.controllers.auth;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService service;
    SecurityContextLogoutHandler logoutHandler = new SecurityContextLogoutHandler();

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody RegisterRequest request,
            HttpServletResponse response
    ) {
        service.register(request, response);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(
            @RequestBody AuthenticationRequest request,
            HttpServletResponse response
    ) {
        service.authenticate(request, response);
        return ResponseEntity.ok("User authenticated successfully");
    }

    @GetMapping("/validateSession")
    public ResponseEntity<?> validateSession(HttpServletRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String jwtToken = extractJwtFromRequest(request);

        if (authentication != null && authentication.isAuthenticated() && jwtToken != null) {
            return ResponseEntity.ok("Session is valid");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Session is invalid");
        }
    }

    private String extractJwtFromRequest(HttpServletRequest request) {
        if (request.getCookies() == null) return null;

        for (Cookie cookie : request.getCookies()) {
            if ("jwt".equals(cookie.getName())) {
                return cookie.getValue();
            }
        }
        return null;
    }

    /*@PostMapping("/logout")
    public ResponseEntity<?> logout(Authentication authentication, HttpServletRequest request, HttpServletResponse response) {
        try {
            ResponseCookie jwtCookie = ResponseCookie.from("jwt", "")
                    .httpOnly(true)
                    .secure(true)
                    .path("/")
                    .maxAge(0)
                    .build();

            response.addHeader(HttpHeaders.SET_COOKIE, jwtCookie.toString());
            this.logoutHandler.logout(request, response, authentication);
            return ResponseEntity.ok().body("Logged out successfully");
        } catch (Exception ex){
            return ResponseEntity.ok().body(ex.getMessage());
        }
    }*/
}
