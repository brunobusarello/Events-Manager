package com.events.demo.repository;

import com.events.demo.model.EventsUsers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventsUsersRepository extends JpaRepository<EventsUsers, Long> {

}
