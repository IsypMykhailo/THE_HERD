package com.the_herd.backend.controllers.requests;

import jakarta.annotation.Nullable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EventRequest {
    private String name;
    private String location;
    private String startTime;

    @Nullable
    private byte[] eventPoster;
}
