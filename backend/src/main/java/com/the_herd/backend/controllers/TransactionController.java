package com.the_herd.backend.controllers;

import com.the_herd.backend.dto.requests.TransactionRequest;
import com.the_herd.backend.dto.responses.TransactionResponse;
import com.the_herd.backend.models.Ticket;
import com.the_herd.backend.models.Transaction;
import com.the_herd.backend.models.user.ERole;
import com.the_herd.backend.models.user.User;
import com.the_herd.backend.repositories.TransactionRepository;
import com.the_herd.backend.repositories.UserRepository;
import com.the_herd.backend.services.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
public class TransactionController {
    private final TransactionRepository transactionRepo;
    private final UserRepository userRepo;

    @PostMapping("/create")
    public ResponseEntity<?> createTransaction(@RequestBody TransactionRequest request) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();
            User user = userRepo.findById(userDetails.getId()).orElse(null);
            Transaction transaction = new Transaction();
            transaction.setSum(request.getSum());
            transaction.setTransactionDate(LocalDateTime.now());
            transaction.setUser(user);
            transactionRepo.save(transaction);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (Exception ex) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/get/all")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> getAllTransactions() {
        List<TransactionResponse> responseList = new ArrayList<>();
        for(Transaction transaction: transactionRepo.findAll()) {
            responseList.add(transaction.toTransactionResponse());
        }
        return ResponseEntity.ok(responseList);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getTransactionById(@PathVariable UUID id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();
        User user = userRepo.findById(userDetails.getId()).orElse(null);
        Transaction transaction = transactionRepo.findById(id).orElse(null);
        if(transaction == null) {
            return ResponseEntity.notFound().build();
        } else if (user != null && (Objects.equals(transaction.getUser().getEmail(), user.getEmail()) || user.getRoles().stream().anyMatch(r -> r.getName() == ERole.ROLE_ADMIN))) {
            return ResponseEntity.ok(transaction.toTransactionResponse());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
