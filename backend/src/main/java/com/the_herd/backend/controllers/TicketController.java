package com.the_herd.backend.controllers;

import com.the_herd.backend.controllers.requests.TicketRequest;
import com.the_herd.backend.repositories.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.the_herd.backend.repositories.TicketRepository;
import com.the_herd.backend.models.Ticket;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/v1/ticket")
@RequiredArgsConstructor
public class TicketController {

    private final TicketRepository ticketRepository;
    private final EventRepository eventRepository;

    //Creating a ticket: Creating a reservation on a ticket
    @PostMapping("/create")
    public ResponseEntity<?> createTicket(@RequestBody TicketRequest request) {
        
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String email = auth.getName();
            Ticket ticket = new Ticket();
            ticket.setPrice(request.getPrice());
            ticket.setFirstName(request.getFirstName());
            ticket.setLastName(request.getLastName());
            ticket.setEvent(eventRepository.findById(UUID.fromString(request.getEventId())).get());
            ticketRepository.save(ticket);
            return ResponseEntity.ok(ticket);
        } catch (Exception ex) {
            return ResponseEntity.badRequest().build();
        }
    }

    //reading a ticket: checking information on a reserved ticket
    @GetMapping("/get/{id}")
    @PreAuthorize("#email == authentication.principal.username or hasAuthority('ADMIN')")
    public ResponseEntity<?> getTicketById(@PathVariable UUID id) {
        return ticketRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    //Deleting a ticket: Deleting a reservation on a ticket    
    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> deleteTicket(@PathVariable UUID id) {
        return ticketRepository.findById(id)
                .map(ticket -> {
                    ticketRepository.deleteById(id);
                    return ResponseEntity.ok().build();
                }).orElseGet(() -> ResponseEntity.notFound().build());
    }

}