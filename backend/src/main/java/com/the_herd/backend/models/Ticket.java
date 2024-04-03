package com.the_herd.backend.models;
import com.the_herd.backend.models.user.User;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;


@Entity
@Table(name = "tickets")

public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID ticketId;

    @ManyToOne
    @JoinColumn(name = "eventId", nullable = false)
    @Getter
    @Setter
    private Event event; 

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    public User getUser() {
        return user;
    }

    @Getter
    @Setter
    private String firstName;

    @Getter
    @Setter
    private String lastName;

    @Getter
    @Setter
    private String email;

    @Getter
    @Setter
    private double price;
}