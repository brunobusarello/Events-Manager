package com.events.demo.dto;

import com.events.demo.model.User;

public class UserMinDTO {
    private long id;
    private String fullName;
    private String cpf;
    private String email;
    private int privilegies;

    public UserMinDTO() {
    }

    public UserMinDTO(User user) {
        this.id = user.getId();
        this.fullName = user.getFullName();
        this.cpf = user.getCpf();
        this.email = user.getEmail();
        this.privilegies = user.getPrivilegies();
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getPrivilegies() {
        return privilegies;
    }

    public void setPrivilegies(int privilegies) {
        this.privilegies = privilegies;
    }

}
