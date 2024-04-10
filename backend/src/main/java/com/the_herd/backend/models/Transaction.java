package com.the_herd.backend.models;

import com.the_herd.backend.dto.responses.TransactionResponse;
import com.the_herd.backend.models.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Entity
@Table(name="transactions")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Setter
    private double sum;

    @Setter
    private LocalDateTime transactionDate;

    @OneToOne
    @JoinColumn(name = "userId", nullable = false)
    @Setter
    private User user;

    @PrePersist
    protected void onCreate() {
        transactionDate = LocalDateTime.now();
    }

    public TransactionResponse toTransactionResponse() {
        return new TransactionResponse(id.toString(), sum, transactionDate.toString(), user.getEmail(), user.getFirstName() + ' ' + user.getLastName());
    }
}
