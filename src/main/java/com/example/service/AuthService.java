package com.example.service;

import com.example.dto.SignUpRequest;
import com.example.dto.LoginRequest;
import com.example.dto.AuthResponse;
import com.example.entity.User;
import com.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public AuthResponse signUp(SignUpRequest request) {
        AuthResponse response = new AuthResponse();

        // 유효성 검사
        if (request.getUsername() == null || request.getUsername().isEmpty()) {
            response.setSuccess(false);
            response.setMessage("사용자명은 필수입니다.");
            return response;
        }

        if (request.getPassword() == null || request.getPassword().isEmpty()) {
            response.setSuccess(false);
            response.setMessage("비밀번호는 필수입니다.");
            return response;
        }

        if (request.getEmail() == null || request.getEmail().isEmpty()) {
            response.setSuccess(false);
            response.setMessage("이메일은 필수입니다.");
            return response;
        }

        // 중복 확인
        if (userRepository.existsByUsername(request.getUsername())) {
            response.setSuccess(false);
            response.setMessage("이미 존재하는 사용자명입니다.");
            return response;
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            response.setSuccess(false);
            response.setMessage("이미 존재하는 이메일입니다.");
            return response;
        }

        // 새 사용자 생성
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setCreatedAt(LocalDateTime.now().toString());

        userRepository.save(user);

        response.setSuccess(true);
        response.setMessage("회원가입이 완료되었습니다.");
        response.setUsername(user.getUsername());
        response.setEmail(user.getEmail());

        return response;
    }

    public AuthResponse login(LoginRequest request) {
        AuthResponse response = new AuthResponse();

        // 유효성 검사
        if (request.getUsername() == null || request.getUsername().isEmpty()) {
            response.setSuccess(false);
            response.setMessage("사용자명은 필수입니다.");
            return response;
        }

        if (request.getPassword() == null || request.getPassword().isEmpty()) {
            response.setSuccess(false);
            response.setMessage("비밀번호는 필수입니다.");
            return response;
        }

        // 사용자 찾기
        Optional<User> userOptional = userRepository.findByUsername(request.getUsername());
        if (userOptional.isEmpty()) {
            response.setSuccess(false);
            response.setMessage("사용자명 또는 비밀번호가 올바르지 않습니다.");
            return response;
        }

        User user = userOptional.get();

        // 비밀번호 검증
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            response.setSuccess(false);
            response.setMessage("사용자명 또는 비밀번호가 올바르지 않습니다.");
            return response;
        }

        response.setSuccess(true);
        response.setMessage("로그인이 완료되었습니다.");
        response.setUsername(user.getUsername());
        response.setEmail(user.getEmail());

        return response;
    }
}
