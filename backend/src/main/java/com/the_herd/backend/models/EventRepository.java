package com.the_herd.backend.models;

import org.springframework.data.jpa.repository.JpaRepository;

import com.the_herd.backend.models.user.Event;

import java.util.Optional;
import java.util.UUID;

public interface EventRepository extends JpaRepository<Event, UUID>{ Optional<Event> findByName(String eventName); }