package com.events.demo.controller;

import com.events.demo.dto.EventDTO;
import com.events.demo.dto.EventFullDTO;
import com.events.demo.dto.ResponseEventDTO;
import com.events.demo.exception.ResourceNotFoundException;
import com.events.demo.model.Event;
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
        return eventService.getAllLimit(offset, limit);
    }

    @GetMapping("/available/user/{id}")
    public List<EventDTO> getAvailableEvents(@PathVariable Long id){
        return eventService.getAvailableEvents(id);
    }

//    @GetMapping("/{id}")
//    public ResponseEntity<?> getEvents(@PathVariable long id) {
//        return eventService.findById(id)
//                .map(event -> {
//                    Map<String, Object> response = new HashMap<>();
//                    response.put("id", event.getId());
//                    response.put("nome", event.getNome());
//                    response.put("dataEvento", event.getDataEvento());
//                    response.put("local", event.getLocal());
//                    response.put("usuariosInscritos", event.getSubscribedUsers().stream()
//                            .map(relacao -> relacao.getUser().getFullName())
//                            .toList());
//                    return ResponseEntity.ok(response);
//                })
//                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));
//    }



    @GetMapping("/{id}")
    public EventFullDTO getEvent(@PathVariable Long id){
        return eventService.getEvent(id);
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
