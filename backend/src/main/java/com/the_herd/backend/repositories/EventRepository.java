package com.the_herd.backend.repositories;

import com.the_herd.backend.models.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface EventRepository extends JpaRepository<Event, UUID> {
    Optional<Event> findByName(String name);
    Optional<Event> findById(UUID id);
}