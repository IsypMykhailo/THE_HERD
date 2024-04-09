package com.the_herd.backend.controllers;

import com.the_herd.backend.repositories.UserRepository;
import com.the_herd.backend.services.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.the_herd.backend.models.user.User;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserRepository userRepo;

    @GetMapping("/validate")
    public ResponseEntity<?> validateAdmin() {
        boolean isAdmin = userIsAdmin();

        if (isAdmin) {
            return ResponseEntity.ok().build(); // User is admin
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User is not an admin"); // User is not admin
        }
    }

    @GetMapping("/getAdminData")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> getAdminData() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            User user = userRepo.findById(userDetails.getId()).orElse(null);
            return ResponseEntity.ok(user);
        } catch(Exception ex) {
            return ResponseEntity.notFound().build();
        }
    }

    private boolean userIsAdmin() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        return authentication != null && authentication.getAuthorities().stream()
                .anyMatch(authority -> authority.getAuthority().equals("ROLE_ADMIN"));
    }
}
