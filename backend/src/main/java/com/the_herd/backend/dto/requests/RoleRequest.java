package com.the_herd.backend.dto.requests;

import lombok.Data;

@Data
public class RoleRequest {
    private String userId;
    private String roleId;
}
