package com.the_herd.backend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @GetMapping("/validate")
    public ResponseEntity<?> validateAdmin() {
        boolean isAdmin = userIsAdmin();

        if (isAdmin) {
            return ResponseEntity.ok().build(); // User is admin
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User is not an admin"); // User is not admin
        }
    }

    private boolean userIsAdmin() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        return authentication != null && authentication.getAuthorities().stream()
                .anyMatch(authority -> authority.getAuthority().equals("ROLE_ADMIN"));
    }
}
