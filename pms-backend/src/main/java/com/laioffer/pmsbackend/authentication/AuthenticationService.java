package com.laioffer.pmsbackend.authentication;

import com.laioffer.pmsbackend.model.UserEntity;
import com.laioffer.pmsbackend.model.enums.UserRole;
import com.laioffer.pmsbackend.repository.UserRepository;
import com.laioffer.pmsbackend.security.JwtHandler;
import jakarta.annotation.Nullable;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final JwtHandler jwtHandler;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public AuthenticationService(
            AuthenticationManager authenticationManager,
            JwtHandler jwtHandler,
            PasswordEncoder passwordEncoder,
            UserRepository userRepository
    ) {
        this.authenticationManager = authenticationManager;
        this.jwtHandler = jwtHandler;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    public UserEntity register(
            String username,
            String password,
            @Nullable String email,
            UserRole role
    ) throws UserAlreadyExistException {
        if (userRepository.existsByUsername(username)) {
            throw new UserAlreadyExistException(username);
        }
        UserEntity userEntity = new UserEntity(null, username, email, passwordEncoder.encode(password), role, Instant.now());
        return userRepository.save(userEntity);
    }

    public String login(String username, String password) throws UserAlreadyExistException {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        return jwtHandler.generateToken(username);
    }
}
