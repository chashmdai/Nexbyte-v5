package com.nexbyte.nexbyteapi.controllers;

import com.nexbyte.nexbyteapi.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.nexbyte.nexbyteapi.dto.RegistroDTO;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    @PostMapping("/registro")
    public ResponseEntity<String> registrarUsuario(@RequestBody RegistroDTO registroDTO) {
        authService.registrar(registroDTO);
        return ResponseEntity.ok("Usuario registrado con éxito");
    }
}