package com.the_herd.backend.controllers;

import com.the_herd.backend.dto.requests.TicketRequest;
import com.the_herd.backend.models.Event;
import com.the_herd.backend.models.Tier;
import com.the_herd.backend.models.user.ERole;
import com.the_herd.backend.repositories.EventRepository;
import com.the_herd.backend.repositories.TierRepository;
import com.the_herd.backend.services.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.the_herd.backend.repositories.TicketRepository;
import com.the_herd.backend.repositories.UserRepository;
import com.the_herd.backend.models.Ticket;
import com.the_herd.backend.models.user.User;

import java.util.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/ticket")
@RequiredArgsConstructor
public class TicketController {

    private final TicketRepository ticketRepository;
    private final TierRepository tierRepository;
    private final UserRepository userRepository;

    //Creating a ticket: Creating a reservation on a ticket
    @PostMapping("/create")
    public ResponseEntity<?> createTicket(@RequestBody TicketRequest request) {
        
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String email = auth.getName();
            
            Ticket ticket = new Ticket();
            Optional<User> userOptional = userRepository.findByEmail(email);

           if (userOptional.isPresent()) {
            User user = userOptional.get();

            ticket.setUser(user);
            Tier tier = tierRepository.findById(UUID.fromString(request.getTierId())).orElse(null);
            if(tier == null) {
                return ResponseEntity.notFound().build();
            }
            ticket.setTier(tier);
            ticketRepository.save(ticket);
            return ResponseEntity.ok(ticket);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }
        } catch (Exception ex) {
            return ResponseEntity.badRequest().build();
        }
    }

    //reading a ticket: checking information on a reserved ticket
    @GetMapping("/get/{id}")
    public ResponseEntity<?> getTicketById(@PathVariable UUID id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();
        User user = userRepository.findById(userDetails.getId()).orElse(null);
        Ticket ticket = ticketRepository.findById(id).orElse(null);
        if(ticket == null) {
            return ResponseEntity.notFound().build();
        } else if (user != null && (Objects.equals(ticket.getUser().getEmail(), user.getEmail()) || user.getRoles().stream().anyMatch(r -> r.getName() == ERole.ROLE_ADMIN))) {
            return ResponseEntity.ok(ticket);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/get/event/{eventId}")
    public ResponseEntity<?> getByEventId(@PathVariable UUID eventId) {
        try{
            List<Tier> tiers = tierRepository.findAllByEvent_EventId(eventId).orElse(null);
            if(tiers == null) {
                return ResponseEntity.notFound().build();
            }
            List<Ticket> eventTickets = new ArrayList<>();
            for(Tier tier: tiers) {
                List<Ticket> tickets = ticketRepository.findByTier_Id(tier.getId());
                eventTickets.addAll(tickets);
            }
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();
            User user = userRepository.findById(userDetails.getId()).orElse(null);

            Ticket myTicket = eventTickets.stream().filter(t -> t.getUser() == user).findFirst().get();
            return ResponseEntity.ok(myTicket);
        } catch (Exception ex) {
            return ResponseEntity.notFound().build();
        }
    }

    //Deleting a ticket: Deleting a reservation on a ticket    
    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> deleteTicket(@PathVariable UUID id) {
        return ticketRepository.findById(id)
                .map(ticket -> {
                    ticketRepository.deleteById(id);
                    return ResponseEntity.ok().build();
                }).orElseGet(() -> ResponseEntity.notFound().build());
    }

}