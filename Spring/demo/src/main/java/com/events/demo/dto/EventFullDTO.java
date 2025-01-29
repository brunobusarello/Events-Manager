package com.events.demo.dto;

import com.events.demo.model.Event;

import java.sql.Date;
import java.util.List;

public class EventFullDTO {
    private List<UserNameDTO> users;
    private Long id;
    private String nome;
    private Date dataEvento;
    private String local;

    public EventFullDTO() {
    }

    public EventFullDTO(List<UserNameDTO> users, Event event) {
        this.users = users;
        id = event.getId();
        nome = event.getNome();
        dataEvento = event.getDataEvento();
        local = event.getLocal();
    }

    public List<UserNameDTO> getUsers() {
        return users;
    }

    public void setUsers(List<UserNameDTO> users) {
        this.users = users;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Date getDataEvento() {
        return dataEvento;
    }

    public void setDataEvento(Date dataEvento) {
        this.dataEvento = dataEvento;
    }

    public String getLocal() {
        return local;
    }

    public void setLocal(String local) {
        this.local = local;
    }
}
