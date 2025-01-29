package com.events.demo.service;

import java.util.List;
import java.util.Optional;

import com.events.demo.dto.EventDTO;
import com.events.demo.dto.ResponseUserDTO;
import com.events.demo.dto.UserMinDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.events.demo.model.User;
import com.events.demo.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<UserMinDTO> getUsers() {
        List<User> users = userRepository.findAll();

        return users.stream().map(UserMinDTO::new).toList();
    }

    public Optional<User> getUserById(long id) {
        return userRepository.findById(id);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(User user) {
        userRepository.delete(user);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public ResponseUserDTO getAllLimit(int offset, int limit) {
        Pageable pageable = PageRequest.of(offset, limit);

        Page<User> response = userRepository.findAllUsersWithPagination(pageable);
        List<UserMinDTO> users = response.stream().map(UserMinDTO::new).toList();

        ResponseUserDTO responseUserDTO = new ResponseUserDTO();
        responseUserDTO.setUsers(users);
        responseUserDTO.setTotalUsers(getTotalUsers());
        return responseUserDTO;
    }


    private long getTotalUsers() {
        return userRepository.count();
    }
}
