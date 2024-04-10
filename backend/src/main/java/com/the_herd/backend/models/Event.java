package com.the_herd.backend.models;


import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;
import java.util.List;


@Getter
@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID eventId;

    @Setter
    private String eventPoster;

    @Setter
    private String location;

    @Setter
    private LocalDateTime startTime;

    @Setter
    private String name;

    @Setter
    private LocalDate date;

    @Setter
    private String descriptionArray;
}