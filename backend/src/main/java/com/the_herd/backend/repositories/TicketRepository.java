package com.the_herd.backend.repositories;

import com.the_herd.backend.models.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface TicketRepository extends JpaRepository<Ticket, UUID> {
    Optional<Ticket> findByFirstNameAndLastName(String firstName, String lastName);
}