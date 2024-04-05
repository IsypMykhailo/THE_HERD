package com.the_herd.backend.dto;

import lombok.Data;

@Data
public class SignUpRequest {
    private String email;
    private String firstName;
    private String lastName;
    private String password;
}
