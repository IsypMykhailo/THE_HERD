package com.the_herd.backend.repositories;

import com.the_herd.backend.models.user.ERole;
import com.the_herd.backend.models.user.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface RoleRepository extends JpaRepository<Role, UUID> {
    Optional<Role> findByName(ERole name);
}
