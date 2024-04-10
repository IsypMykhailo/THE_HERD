package com.the_herd.backend.dto.responses;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TransactionResponse {
    private String id;
    private double sum;
    private String transactionDate;
    private String email;
    private String fullName;
}
