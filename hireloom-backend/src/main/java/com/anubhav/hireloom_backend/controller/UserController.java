package com.anubhav.hireloom_backend.controller;

import com.anubhav.hireloom_backend.dto.LoginRequest;
import com.anubhav.hireloom_backend.dto.LoginResponse;
import com.anubhav.hireloom_backend.dto.RegisterRequest;
import com.anubhav.hireloom_backend.dto.UserResponse;
import com.anubhav.hireloom_backend.entity.User;
import com.anubhav.hireloom_backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/")
    public String home() {
        return "Backend Running";
    }

    @PostMapping("/auth/register")
    public UserResponse register(@Valid @RequestBody RegisterRequest request) {
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());

        User savedUser = userService.registerUser(user);

        return new UserResponse(
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail(),
                savedUser.getCreatedAt()
        );
    }

    @PostMapping("/auth/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {
        String token = userService.loginUser(
                request.getEmail(),
                request.getPassword()
        );  

        return new LoginResponse(token);
    }

    @GetMapping("/api/users/me")
    public UserResponse getCurrentUser(java.security.Principal principal) {
        return userService.getCurrentUser(principal.getName());
    }

    @GetMapping("/api/test")
    public String test() {
        return "Protected route accessed";
    }

}

