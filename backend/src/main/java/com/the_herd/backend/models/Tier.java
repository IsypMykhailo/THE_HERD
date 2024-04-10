package com.the_herd.backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.UUID;

@Getter
@Entity
@Table(name = "tiers")
public class Tier {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Setter
    private String name;

    @Setter
    private int price;

    @ManyToOne
    @JoinColumn(name = "eventId", nullable = false)
    @Setter
    private Event event;
}
