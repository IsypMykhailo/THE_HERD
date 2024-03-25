package com.the_herd.backend.controllers.auth;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.the_herd.backend.models.EventRepository;
import com.the_herd.backend.models.user.Event;

@RestController
@RequestMapping("/api/events")
public class EventController {
    private final EventRepository eventRepository;

    public EventController(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @PostMapping("/create")
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        Event savedEvent = eventRepository.save(event);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEvent);
    }

    @GetMapping("/all")
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable UUID id) {
        Optional<Event> event = eventRepository.findById(id);
        return event.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }


    @PutMapping("/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable UUID id, @RequestBody Event updatedEvent) {
        Optional<Event> optionalEvent = eventRepository.findById(id);
        if (optionalEvent.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Event existingEvent = optionalEvent.get();

        if (updatedEvent.getEventName() != null) {
            existingEvent.setEventName(updatedEvent.getEventName());
        }
        if (updatedEvent.getLocation() != null) {
            existingEvent.setLocation(updatedEvent.getLocation());
        }
        if (updatedEvent.getStartTime() != null) {
            existingEvent.setStartTime(updatedEvent.getStartTime());
        }
        if (updatedEvent.getTicketPrice() != existingEvent.getTicketPrice()) {
            existingEvent.setTicketPrice(updatedEvent.getTicketPrice());
        }
        if (updatedEvent.getEventPoster() != null) {
            existingEvent.setEventPoster(updatedEvent.getEventPoster());
        }

        Event savedEvent = eventRepository.save(existingEvent);

        return ResponseEntity.ok(savedEvent);
}

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable UUID id) {
        if (!eventRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        eventRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    
}