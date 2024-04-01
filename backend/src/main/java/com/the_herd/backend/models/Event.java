package com.the_herd.backend.models;


import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;
import java.util.List;


@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID eventId;

    @Getter
    @Setter
    @Nullable
    private byte[] eventPoster;

    @Getter
    @Setter
    private String location;

    @Getter
    @Setter
    private LocalDateTime startTime;

    @Getter
    @Setter
    private String name;

    @Getter
    @Setter
    private LocalDate date;

    @ElementCollection
    @CollectionTable(name = "event_description", joinColumns = @JoinColumn(name = "event_id"))
    @Column(name = "description")
    private List<String> description;
}