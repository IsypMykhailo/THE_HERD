package com.the_herd.backend.repositories;

import com.the_herd.backend.models.user.User;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.UUID;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, UUID> {
    List<User> findByUserIdIn(List<UUID> userIds);
    Optional<User> findByEmail(String email);
}
