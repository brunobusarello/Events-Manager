package com.events.demo.service;

import com.events.demo.model.Event;
import com.events.demo.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;

    public List<Event> findAll(){
        return eventRepository.findAll();
    }

    public Optional<Event> findById(long id){
        return eventRepository.findById(id);
    }

    public Event saveEvents(Event events){
        return eventRepository.save(events);
    }

    public Page<Event> getAllLimit(int offset, int limit){
        Pageable pageable = PageRequest.of(offset, limit);
        return eventRepository.findAll(pageable);
    }

    public long getTotalEvents(){
        return eventRepository.count();
    }

    public void deleteEvent(Event event){
        eventRepository.delete(event);
    }
}
