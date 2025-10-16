package com.nexbyte.nexbyteapi.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.nexbyte.nexbyteapi.dto.RegistroDTO;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @PostMapping("/registro")
    public ResponseEntity<?> registrarUsuario(@RequestBody RegistroDTO registroDTO) {
        System.out.println("Datos de registro recibidos: " + registroDTO);
        return ResponseEntity.ok("Usuario recibido para registro");
    }
}