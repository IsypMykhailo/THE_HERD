package com.the_herd.backend.models;


import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;


@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID eventId;

    @Getter
    @Setter
    private String name;

    @Getter
    @Setter
    private String location;

    @Getter
    @Setter
    private LocalDateTime startTime;

    @Getter
    @Setter
    @Nullable
    private byte[] eventPoster;
}