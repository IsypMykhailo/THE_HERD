package com.the_herd.backend.controllers;

import com.the_herd.backend.dto.requests.RoleRequest;
import com.the_herd.backend.models.user.Role;
import com.the_herd.backend.models.user.User;
import com.the_herd.backend.repositories.RoleRepository;
import com.the_herd.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UsersController {
    private final UserRepository userRepo;
    private final RoleRepository roleRepo;

    @GetMapping("/get/all")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(userRepo.findAll());
    }

    @GetMapping("/get/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> getUserById(@PathVariable UUID id) {
        try {
            User user = userRepo.findById(id).get();
            return ResponseEntity.ok(user);
        } catch (Exception ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/get/roles/all")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> getRoles() {
        return ResponseEntity.ok(roleRepo.findAll());
    }

    @PostMapping("/updateRole")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> updateRole(@RequestBody RoleRequest updateRequest) {
        try{
            User user = userRepo.findById(UUID.fromString(updateRequest.getUserId())).orElse(null);
            Set<Role> roles = new HashSet<>();
            Role role = roleRepo.findById(UUID.fromString(updateRequest.getRoleId())).orElse(null);
            if(role == null || user == null) {
                return ResponseEntity.notFound().build();
            }
            roles.add(role);
            user.setRoles(roles);
            userRepo.save(user);
            return ResponseEntity.ok().build();
        } catch(Exception ex) {
            return ResponseEntity.notFound().build();
        }
    }
}
