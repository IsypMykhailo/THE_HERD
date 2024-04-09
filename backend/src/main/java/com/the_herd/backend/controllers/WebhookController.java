package com.the_herd.backend.controllers;

import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Event;
import com.stripe.model.StripeObject;
import com.stripe.net.Webhook;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class WebhookController {

    @PostMapping("/webhook")
    public ResponseEntity<String> handleWebhook(@RequestBody String payload, @RequestHeader("Stripe-Signature") String sigHeader) {
        // Replace "your_webhook_secret_key" with your actual webhook secret key
        String secret = "your_webhook_secret_key";
        try {
            Event event = Webhook.constructEvent(payload, sigHeader, secret);
            StripeObject stripeObject = event.getDataObjectDeserializer().getObject().orElse(null);
            // Handle the event (e.g., update database, trigger additional actions)
            if ("payment_intent.succeeded".equals(event.getType())) {
                // Payment succeeded, update database or trigger other actions
                return ResponseEntity.ok().body("Payment succeeded");
            }
            // Ignore other event types
            return ResponseEntity.ok().body("Event ignored");
        } catch (SignatureVerificationException e) {
            // Invalid signature, ignore the webhook
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid signature");
        } catch (Exception e) {
            // Handle other errors
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error handling webhook");
        }
    }

}
