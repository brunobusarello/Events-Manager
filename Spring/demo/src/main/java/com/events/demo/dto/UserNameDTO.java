package com.events.demo.dto;

import com.events.demo.projections.UserMinProjection;

public class UserNameDTO {
     private Long id;
     private String fullName;

    public UserNameDTO() {
    }

    public UserNameDTO(UserMinProjection userMinProjection) {
        id = userMinProjection.getId();
        fullName = userMinProjection.getFullName();
    }

    public Long getId() {
        return id;
    }

    public String getFullName() {
        return fullName;
    }
}
