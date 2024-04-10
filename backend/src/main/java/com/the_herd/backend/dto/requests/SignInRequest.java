package com.the_herd.backend.dto.requests;

import lombok.Data;

@Data
public class SignInRequest {
    private String email;
    private String password;
}
