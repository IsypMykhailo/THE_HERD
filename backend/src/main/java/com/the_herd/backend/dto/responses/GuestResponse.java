package com.the_herd.backend.dto.responses;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GuestResponse {
    private String firstName;
    private String lastName;
    private String email;
}
