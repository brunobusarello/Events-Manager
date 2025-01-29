package com.events.demo.service;

import com.events.demo.dto.EventDTO;
import com.events.demo.dto.EventFullDTO;
import com.events.demo.dto.ResponseEventDTO;
import com.events.demo.dto.UserNameDTO;
import com.events.demo.exception.ResourceNotFoundException;
import com.events.demo.model.Event;
import com.events.demo.repository.EventRepository;
import com.events.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Event> findAll(){
        return eventRepository.findAll();
    }

    public Optional<Event> findById(long id){
        return eventRepository.findById(id);
    }

    public Event saveEvents(Event events){
        return eventRepository.save(events);
    }

    public ResponseEventDTO getAllLimit(int offset, int limit){
        Pageable pageable = PageRequest.of(offset, limit);
        Page<Event> result = eventRepository.findAll(pageable);

        return new ResponseEventDTO(result.toList(), getTotalEvents());
    }

    public long getTotalEvents(){
        return eventRepository.count();
    }

    public void deleteEvent(Event event){
        eventRepository.delete(event);
    }

    @Transactional(readOnly = true)
    public List<EventDTO> getAvailableEvents(Long id){
        return eventRepository.getAvailableEvents(id).stream().map(EventDTO::new).toList();
    }

    @Transactional(readOnly = true)
    public EventFullDTO getEvent(Long eventId){
        List<UserNameDTO> userResponse = userRepository.searchByEvent(eventId).stream().map(UserNameDTO::new).toList();
        Event event = eventRepository.findById(eventId).orElseThrow(() -> new ResourceNotFoundException("Eveno não encontrado"));

        return new EventFullDTO(userResponse, event);
    }
}
