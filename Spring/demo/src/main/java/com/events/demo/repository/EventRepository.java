package com.events.demo.repository;

import com.events.demo.model.Event;
import com.events.demo.projections.EventAvailableProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    @Query(nativeQuery = true, value = """
            SELECT e.id, e.data_evento dataEvento, e.local, e.nome
            FROM event e
            LEFT JOIN belonging b ON e.id = b.event_id AND b.user_id = :userId
            WHERE b.event_id IS NULL;
            """)
    List<EventAvailableProjection> getAvailableEvents(Long userId);
}
