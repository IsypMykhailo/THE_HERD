package com.the_herd.backend.controllers.auth;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminAuthController {
    @GetMapping("/login")
    public String showLoginForm(){
        return "LoginForBackend";
    }
}
