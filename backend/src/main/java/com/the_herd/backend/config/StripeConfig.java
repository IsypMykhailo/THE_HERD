package com.the_herd.backend.config;

import com.stripe.Stripe;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;


public class StripeConfig {
    @Value("${stripe.api.key}")
    private String secretKey;

    public StripeConfig() {
        Stripe.apiKey = secretKey;
    }
    
    public String getSecretKey() {
        return secretKey;
    }
}


