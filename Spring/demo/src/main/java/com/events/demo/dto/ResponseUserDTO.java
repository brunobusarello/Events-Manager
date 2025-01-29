package com.events.demo.dto;

import java.util.List;

public class ResponseUserDTO {
    private List<UserMinDTO> users;
    private long totalUsers;

    public List<UserMinDTO> getUsers() {
        return users;
    }

    public void setUsers(List<UserMinDTO> users) {
        this.users = users;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }

}
