package com.the_herd.backend.controllers;

import com.the_herd.backend.controllers.auth.AuthenticationService;
import com.the_herd.backend.controllers.auth.ValidationRequest;
import com.the_herd.backend.controllers.requests.TicketRequest;
import com.the_herd.backend.repositories.EventRepository;
import com.the_herd.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.the_herd.backend.repositories.TicketRepository;
import com.the_herd.backend.models.Ticket;

import java.util.Objects;
import java.util.Optional;
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
    private final UserRepository userRepository;
    private final AuthenticationService service;

    //Creating a ticket: Creating a reservation on a ticket
    @PostMapping("/create")
    public ResponseEntity<?> createTicket(@RequestBody TicketRequest request) {
        if(service.validateSession(request.getEmail(), request.getToken()).isValid()) {
            try {
                Ticket ticket = new Ticket();
                ticket.setEmail(request.getEmail());
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
        return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
    }
 
    //reading a ticket: checking information on a reserved ticket
    @GetMapping("/get/{id}")
    public ResponseEntity<?> getTicketById(@PathVariable UUID id, @RequestBody ValidationRequest request) {
        if(service.validateSession(request.getEmail(), request.getToken()).isValid()){
            try {
                Ticket ticket = ticketRepository.findById(id).get();
                if(Objects.equals(ticket.getEmail(), request.getEmail()) || service.isAdmin(request.getToken())) {
                    return ResponseEntity.ok(ticket);
                }
                return ResponseEntity.badRequest().build();
            } catch (Exception ex) {
                return ResponseEntity.notFound().build();
            }
        }
        return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
    }

    //Deleting a ticket: Deleting a reservation on a ticket    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteTicket(@PathVariable UUID id, @RequestBody ValidationRequest request) {
        if (ticketRepository.existsById(id) && service.validateSession(request.getEmail(), request.getToken()).isValid() && service.isAdmin(request.getToken())) {
            ticketRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
        
}