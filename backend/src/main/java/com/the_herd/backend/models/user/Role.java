package com.the_herd.backend.models.user;

import jakarta.persistence.*;
import lombok.Getter;

import java.util.UUID;

@Entity
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Getter
    private UUID id;

    @Enumerated(EnumType.STRING)
    @Column
    @Getter
    private ERole name;
}
