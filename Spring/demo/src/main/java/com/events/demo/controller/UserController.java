package com.events.demo.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.events.demo.dto.ResponseUserDTO;
import com.events.demo.dto.UserDTO;
import com.events.demo.dto.UserLogin;
import com.events.demo.exception.ResourceNotFoundException;
import com.events.demo.model.User;
import com.events.demo.service.UserService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public List<UserDTO> getUsers() {
        List<UserDTO> usersDTO = new ArrayList<>();
        List<User> users = userService.getUsers();

        for (User user : users) {
            UserDTO userDTO = new UserDTO();
            userDTO.setCpf(user.getCpf());
            userDTO.setEmail(user.getEmail());
            userDTO.setFullName(user.getFullName());
            userDTO.setId(user.getId());
            userDTO.setPrivilegies(user.getPrivilegies());
            usersDTO.add(userDTO);
        }
        return usersDTO;
    }

    @GetMapping("/limited")
    public ResponseUserDTO getLimitUsers(@RequestParam(defaultValue = "0") int offset,
            @RequestParam(defaultValue = "10") int limit) {
        ResponseUserDTO responseUserDTO = new ResponseUserDTO();
        List<UserDTO> usersDTO = new ArrayList<>();
        Page<User> users = userService.getAllLimit(offset, limit);

        for (User user : users) {
            UserDTO userDTO = new UserDTO();
            userDTO.setCpf(user.getCpf());
            userDTO.setEmail(user.getEmail());
            userDTO.setFullName(user.getFullName());
            userDTO.setId(user.getId());
            userDTO.setPrivilegies(user.getPrivilegies());
            usersDTO.add(userDTO);
        }
        responseUserDTO.setUsers(usersDTO);
        responseUserDTO.setTotalUsers(userService.getTotalUsers());
        return responseUserDTO;
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable long id) {
        User user = userService.getUserById(id).orElseThrow(() -> new ResourceNotFoundException("Id não existente"));

//        user.setPassword("");

        return ResponseEntity.ok(user);
    }

    @PostMapping
    public ResponseEntity<?> saveUser(@RequestBody User user) {
        // TODO: process POST request
        if (user.getPrivilegies() == 0) {
            user.setPrivilegies(1);
        }
        Optional<User> existingUser = userService.getUserByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT) // 409 Conflict
                    .body("Email já cadastrado no sistema.");
        }
        return ResponseEntity.ok(userService.saveUser(user));
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyUser(@RequestBody UserLogin userLogin) {
        User user = userService.getUserByEmail(userLogin.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Email inválido"));
        UserDTO userDTO = new UserDTO();
        userDTO.setCpf(user.getCpf());
        userDTO.setEmail(user.getEmail());
        userDTO.setPrivilegies(user.getPrivilegies());
        userDTO.setId(user.getId());
        userDTO.setFullName(user.getFullName());

        // Comparar senhas usando equals()
        if (user.getPassword().equals(userLogin.getPassword())) {
            return ResponseEntity.ok(userDTO);
        }
        return ResponseEntity.status(404).body("Senha inválida");
    }

    @GetMapping("/email/{email}")
    public UserDTO getUserByEmail(@PathVariable String email) {
        User user = userService.getUserByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Não existe um usuário com este email"));

        UserDTO userDTO = new UserDTO();
        userDTO.setCpf(user.getCpf());
        userDTO.setEmail(user.getEmail());
        userDTO.setFullName(user.getFullName());
        userDTO.setId(user.getId());
        userDTO.setPrivilegies(user.getPrivilegies());

        return userDTO;
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable long id, @RequestBody User user) {
        // TODO: process PUT request
        User updateUser = userService.getUserById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Não existe usuário com este ID"));
        updateUser.setId(id);
        updateUser.setFullName(user.getFullName());
        updateUser.setEmail(user.getEmail());
        updateUser.setCpf(user.getCpf());
        if (user.getPassword() != "") {
            updateUser.setPassword(user.getPassword());
        }
        updateUser.setPrivilegies(user.getPrivilegies());

        userService.saveUser(updateUser);
        return ResponseEntity.ok(updateUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteUser(@PathVariable long id) {
        User user = userService.getUserById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Não existe usuário com este id"));

        userService.deleteUser(user);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);

        return ResponseEntity.ok(response);
    }
}
