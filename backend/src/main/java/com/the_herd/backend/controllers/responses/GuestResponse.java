package com.the_herd.backend.controllers.responses;

public class GuestResponse {
    private String firstName;
    private String lastName;
    private String email;

    public GuestResponse(String firstName, String lastName, String email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

}
