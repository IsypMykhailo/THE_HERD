package com.the_herd.backend.controllers;

import com.the_herd.backend.repositories.EventRepository;
import com.the_herd.backend.repositories.TicketRepository;
import com.the_herd.backend.repositories.TierRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.the_herd.backend.models.Tier;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/tiers")
@RequiredArgsConstructor
public class TierController {
    private final EventRepository eventRepo;
    private final TierRepository tierRepo;

    @GetMapping("/get/{eventId}")
    public ResponseEntity<?> getByEventId(@PathVariable UUID eventId) {
        List<Tier> tiers = tierRepo.findAllByEvent_EventId(eventId).orElse(null);
        if(tiers == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(tiers);
    }
}
