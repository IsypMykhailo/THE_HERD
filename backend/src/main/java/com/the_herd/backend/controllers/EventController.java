package com.the_herd.backend.controllers;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.List;


import com.the_herd.backend.controllers.requests.EventRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.the_herd.backend.repositories.EventRepository;
import com.the_herd.backend.repositories.TicketRepository;
import com.the_herd.backend.models.Event;
import com.the_herd.backend.models.Ticket;

@RestController
@RequestMapping("/api/v1/events")
@RequiredArgsConstructor
public class EventController {
    private final EventRepository eventRepository;
    private final TicketRepository ticketRepository;

    @PostMapping("/create")
    @PreAuthorize("hasAuthority('ADMIN')")
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
        Optional<Event> event = eventRepository.findById(id);
        return event.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/get/{id}/guests")
    public ResponseEntity<?> getEventGuests(@PathVariable UUID id) {
        Optional<Event> eventOptional = eventRepository.findById(id);
        if (eventOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<Ticket> eventTickets = ticketRepository.findByEvent_Id(id);

        List<GuestInfo> guestsInfo = eventTickets.stream()
                .map(ticket -> new GuestInfo(ticket.getFirstName(), ticket.getLastName(), ticket.getEmail()))
                .collect(Collectors.toList());

        return ResponseEntity.ok(guestsInfo); //creates json
    }
    static class GuestInfo {
        private String firstName;
        private String lastName;
        private String email;

        public GuestInfo(String firstName, String lastName, String email) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
        }
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
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