package com.events.demo.dto;

public class UserDTO {
    private long id;
    private String fullName;
    private String cpf;
    private String email;
    private int privilegies;

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
