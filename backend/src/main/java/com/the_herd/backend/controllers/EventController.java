package com.the_herd.backend.controllers;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.UUID;

import java.util.List;


import com.the_herd.backend.dto.requests.EventRequest;
import com.the_herd.backend.models.Tier;
import com.the_herd.backend.repositories.TierRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.the_herd.backend.repositories.EventRepository;
import com.the_herd.backend.repositories.TicketRepository;
import com.the_herd.backend.models.Event;
import com.the_herd.backend.models.Ticket;
import com.the_herd.backend.dto.responses.GuestResponse;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {
    private final EventRepository eventRepository;
    private final TicketRepository ticketRepository;
    private final TierRepository tierRepository;


    @PostMapping("/create")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> createEvent(@RequestBody EventRequest request) {
        try {
            Event event = new Event();
            event.setName(request.getName());
            event.setLocation(request.getLocation());
            event.setStartTime(LocalDateTime.parse(request.getStartTime()));
            event.setEventPoster(request.getEventPoster());
            eventRepository.save(event);
            return ResponseEntity.status(HttpStatus.CREATED).body(event);
        } catch (Exception ex) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/get/all")
    public ResponseEntity<?> getAllEvents() {
        return ResponseEntity.ok(eventRepository.findAll());
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable UUID id) {
        Event event = eventRepository.findById(id).orElse(null);
        if (event == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(event);
    }

    @GetMapping("/get/{id}/guests")
    public ResponseEntity<?> getEventGuests(@PathVariable UUID id) {
        Event event = eventRepository.findById(id).orElse(null);
        if (event == null) {
            return ResponseEntity.notFound().build();
        }

        List<Tier> tiers = tierRepository.findAllByEvent_EventId(id).orElse(null);
        if(tiers == null) {
            return ResponseEntity.notFound().build();
        }
        List<Ticket> eventTickets = new ArrayList<>();
        for(Tier tier: tiers) {
            List<Ticket> tickets = ticketRepository.findByTier_Id(tier.getId());
            eventTickets.addAll(tickets);
        }
    
        List<GuestResponse> guestsInfo = eventTickets.stream()
            .map(ticket -> new GuestResponse(ticket.getUser().getFirstName(), ticket.getUser().getLastName(), ticket.getUser().getEmail()))
                .toList();
    
        return ResponseEntity.ok(guestsInfo);
    }


    @PutMapping("/update/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> updateEvent(@PathVariable UUID id, @RequestBody EventRequest request) {
        try {
            Event event = eventRepository.findById(id).get();
            event.setName(request.getName());
            event.setLocation(request.getLocation());
            event.setStartTime(LocalDateTime.parse(request.getStartTime()));
            event.setEventPoster(request.getEventPoster());
            eventRepository.save(event);
            return ResponseEntity.ok(event);
        } catch (Exception ex) {
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> deleteEvent(@PathVariable UUID id) {
        if (!eventRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        eventRepository.deleteById(id);
        return ResponseEntity.accepted().build();
    }
}