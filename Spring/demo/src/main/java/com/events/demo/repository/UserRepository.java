package com.events.demo.repository;

import com.events.demo.projections.UserMinProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.events.demo.model.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    @Query(value = "SELECT u FROM User u ORDER BY id")
    Page<User> findAllUsersWithPagination(Pageable pageable);

    @Query(nativeQuery = true, value = """
            select u.id, u.full_name fullName from belonging b, event e
            inner join user u
            where b.event_id = :eventId and u.id = b.user_id and e.id = b.event_id
            """)
    List<UserMinProjection> searchByEvent(Long eventId);
}
