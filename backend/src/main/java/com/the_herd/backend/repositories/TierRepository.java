package com.the_herd.backend.repositories;

import com.the_herd.backend.models.Tier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TierRepository extends JpaRepository<Tier, UUID> {
    Optional<List<Tier>> findAllByEvent_EventId(UUID eventId);
}
