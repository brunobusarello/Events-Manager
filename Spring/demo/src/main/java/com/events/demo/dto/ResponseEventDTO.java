package com.events.demo.dto;

import com.events.demo.model.Event;

import java.util.List;

public class ResponseEventDTO {
    private List<Event> events;
    private long totalEvents;

    public List<Event> getEvents() {
        return events;
    }

    public void setEvents(List<Event> events) {
        this.events = events;
    }

    public long getTotalEvents() {
        return totalEvents;
    }

    public void setTotalEvents(long totalEvents) {
        this.totalEvents = totalEvents;
    }
}
