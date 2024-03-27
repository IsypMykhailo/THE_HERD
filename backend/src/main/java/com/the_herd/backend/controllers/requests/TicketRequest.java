package com.the_herd.backend.controllers.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TicketRequest {
    private String eventId;
    private String firstName;
    private String lastName;
    private String email;
    private double price;
    private String token;
}
