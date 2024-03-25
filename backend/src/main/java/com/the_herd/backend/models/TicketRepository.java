package com.the_herd.backend.models;

import org.springframework.data.jpa.repository.JpaRepository;

import com.the_herd.backend.models.user.Ticket;

import java.util.Optional;
import java.util.UUID;

public interface TicketRepository extends JpaRepository<Ticket, UUID> { 
    Optional<Ticket> findByFirstNameAndLastName(String firstName, String lastName); }