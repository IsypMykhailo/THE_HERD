package com.the_herd.backend.controllers.auth;

import com.the_herd.backend.controllers.requests.ValidationRequest;
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
        String insecureJwt = service.register(request, response);
        return ResponseEntity.ok(AuthenticationResponse.builder().token(insecureJwt).build());
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(
            @RequestBody AuthenticationRequest request,
            HttpServletResponse response
    ) {
        String insecureJwt = service.authenticate(request, response);
        return ResponseEntity.ok(AuthenticationResponse.builder().token(insecureJwt).build());
    }

    @PostMapping("/validateSession")
    public ResponseEntity<?> validateSession(@RequestBody ValidationRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated() && service.isSessionValid(request.getEmail(), request.getToken())) {
            return ResponseEntity.ok("Session is valid");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Session is invalid");
        }
    }
}
