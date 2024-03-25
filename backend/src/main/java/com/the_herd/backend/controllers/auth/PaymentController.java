package com.the_herd.backend.controllers.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.model.PaymentIntent;
import com.stripe.param.ChargeCreateParams;
import com.stripe.param.PaymentIntentCreateParams;
import com.the_herd.backend.config.StripeConfig;
import java.util.Map;




@RestController
public class PaymentController {

    @Autowired
    private StripeConfig stripeConfig;

    @PostMapping("/create-payment-intent")
    public ResponseEntity<?> createPaymentIntent(@RequestBody Map<String, Object> request) {
        try {
            // Set Stripe API key
            Stripe.apiKey = stripeConfig.getSecretKey();

            // Extract request parameters
            Integer amount = Integer.parseInt(request.get("amount").toString());
            String currency = request.get("currency").toString();

            // Create PaymentIntent
            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                    .setAmount((long) amount * 100)
                    .setCurrency(currency)
                    .setAutomaticPaymentMethods(
                            PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                                    .setEnabled(true)
                                    .build()
                    )
                    .build();
            PaymentIntent paymentIntent = PaymentIntent.create(params);

            // Now handle Stripe payment
            String token = request.get("token").toString(); // Assuming token is part of the request
            ChargeCreateParams chargeParams =
                    ChargeCreateParams.builder()
                            .setAmount((long) amount * 100) // amount in cents
                            .setCurrency(currency)
                            .setSource(token)
                            .build();
            Charge charge = Charge.create(chargeParams);

            // Return successful response with PaymentIntent JSON
            return ResponseEntity.ok().body(paymentIntent.toJson());
        } catch (NumberFormatException e) {
            // Handle invalid amount format
            return ResponseEntity.badRequest().body("Invalid amount format");
        } catch (StripeException e) {
            // Handle Stripe API errors
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating PaymentIntent: " + e.getMessage());
        } catch (Exception e) {
            // Handle other unexpected errors
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Unexpected error: " + e.getMessage());
        }
    }
}