package com.events.demo.dto;

import com.events.demo.model.Event;
import com.events.demo.projections.EventAvailableProjection;

import java.sql.Date;

public class EventDTO {
    private Long id;
    private String nome;
    private Date dataEvento;
    private String local;

    public EventDTO() {
    }

    public EventDTO(Event event) {
        id = event.getId();
        nome = event.getNome();
        dataEvento = event.getDataEvento();
        local = event.getLocal();
    }

    public EventDTO(EventAvailableProjection event) {
        id = event.getId();
        nome = event.getNome();
        dataEvento = event.getDataEvento();
        local = event.getLocal();
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
