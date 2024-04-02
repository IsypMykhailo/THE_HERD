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
    @Getter
    private UUID eventId;

    @Getter
    @Setter
    private String eventPoster;

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

    @Getter
    @Setter
    private String descriptionArray;
}