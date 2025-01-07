package com.events.demo.controller;

import com.events.demo.dto.ResponseEventDTO;
import com.events.demo.exception.ResourceNotFoundException;
import com.events.demo.model.Event;
import com.events.demo.model.User;
import com.events.demo.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/events")
public class EventController {
    @Autowired
    private EventService eventService;

    @GetMapping
    public List<Event> showEvents() {
        return eventService.findAll();
    }

    @GetMapping("/limited")
    public ResponseEventDTO getLimitedEvents(@RequestParam(defaultValue = "0") int offset,
                                             @RequestParam(defaultValue = "10") int limit){
        ResponseEventDTO responseEventDTO = new ResponseEventDTO();
        List<Event> events = new ArrayList<>();
        Page<Event> eventsResponse = eventService.getAllLimit(offset, limit);

        for (Event event: eventsResponse){
            Event events1 = new Event();
            events1.setId(event.getId());
            events1.setDataEvento(event.getDataEvento());
            events1.setLocal(event.getLocal());
            events1.setNome(event.getNome());
            events.add(events1);
        }

        responseEventDTO.setTotalEvents(eventService.getTotalEvents());
        responseEventDTO.setEvents(events);

        return responseEventDTO;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getEvents(@PathVariable long id) {
        return eventService.findById(id)
                .map(event -> {
                    Map<String, Object> response = new HashMap<>();
                    response.put("id", event.getId());
                    response.put("nome", event.getNome());
                    response.put("dataEvento", event.getDataEvento());
                    response.put("local", event.getLocal());
                    response.put("usuariosInscritos", event.getSubscribedUsers().stream()
                            .map(relacao -> relacao.getUser().getFullName())
                            .toList());
                    return ResponseEntity.ok(response);
                })
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));
    }

    @PostMapping
    public Event saveEvent(@RequestBody Event events) {
        return eventService.saveEvents(events);
    }

    @PutMapping("/{id}")
    public Event updateEvent(@PathVariable long id, @RequestBody Event events) {
        Event event = eventService.findById(id).orElseThrow(() -> new ResourceNotFoundException("Não existe evento com este id"));
        event.setDataEvento(events.getDataEvento());
        event.setNome(events.getNome());
        event.setLocal(events.getLocal());

        return eventService.saveEvents(event);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteEvent(@PathVariable long id) {
        Event event = eventService.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Não existe usuário com este id"));

        eventService.deleteEvent(event);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);

        return ResponseEntity.ok(response);
    }
}
