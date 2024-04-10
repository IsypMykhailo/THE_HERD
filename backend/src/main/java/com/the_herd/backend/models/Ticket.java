package com.the_herd.backend.models;
import com.the_herd.backend.models.user.User;
import com.the_herd.backend.dto.responses.GuestResponse;



import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Entity
@Table(name = "tickets")

public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID ticketId;

    @ManyToOne
    @JoinColumn(name = "tierId", nullable = false)
    @Setter
    private Tier tier;

    @OneToOne
    @JoinColumn(name = "userId", nullable = false)
    @Setter
    private User user;

    public GuestResponse toGuestResponse() {
        return new GuestResponse(user.getFirstName(), user.getLastName(), user.getEmail());
    }
}