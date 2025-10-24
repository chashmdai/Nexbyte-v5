package com.nexbyte.nexbyteapi.controllers;

import com.nexbyte.nexbyteapi.dto.MensajeContactoDTO;
import com.nexbyte.nexbyteapi.services.MensajeContactoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/contactos")
@RequiredArgsConstructor
public class MensajeContactoController {

    private final MensajeContactoService mensajeService;

    @PostMapping
    public ResponseEntity<String> recibirMensajeContacto(@Valid @RequestBody MensajeContactoDTO mensajeDTO) {
        mensajeService.guardarMensaje(mensajeDTO);
        return ResponseEntity.ok("Mensaje recibido con éxito.");
    }
}
