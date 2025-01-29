package com.events.demo.model;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;

@Entity
public class Belonging {

    @EmbeddedId
    private BelongingPK id = new BelongingPK();

    private String statusInscricao;

    public Belonging() {
    }

    public Belonging(Event event, User user, String statusInscricao) {
        id.setEvent(event);
        id.setUser(user);
        this.statusInscricao = statusInscricao;
    }

    public BelongingPK getId() {
        return id;
    }

    public void setId(BelongingPK id) {
        this.id = id;
    }

    public String getStatusInscricao() {
        return statusInscricao;
    }

    public void setStatusInscricao(String statusInscricao) {
        this.statusInscricao = statusInscricao;
    }
}
