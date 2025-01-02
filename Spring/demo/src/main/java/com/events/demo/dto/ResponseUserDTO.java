package com.events.demo.dto;

import java.util.List;

public class ResponseUserDTO {
    private List<UserDTO> users;
    private long totalUsers;

    public List<UserDTO> getUsers() {
        return users;
    }

    public void setUsers(List<UserDTO> users) {
        this.users = users;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }

}
