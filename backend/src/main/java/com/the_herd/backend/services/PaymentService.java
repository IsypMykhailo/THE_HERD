package com.the_herd.backend.services;

import com.stripe.exception.StripeException;
import com.stripe.model.Charge;

public interface PaymentService {
    Charge chargeNewCard(String token, Double amount) throws StripeException;
}
