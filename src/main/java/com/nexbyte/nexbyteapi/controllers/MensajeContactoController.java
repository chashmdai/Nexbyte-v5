package com.nexbyte.nexbyteapi.controllers;

import com.nexbyte.nexbyteapi.dto.MensajeContactoDTO;
import com.nexbyte.nexbyteapi.entities.MensajeContacto;
import com.nexbyte.nexbyteapi.services.MensajeContactoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contactos")
@RequiredArgsConstructor
public class MensajeContactoController {

    private final MensajeContactoService mensajeService;

    @GetMapping
    public ResponseEntity<List<MensajeContacto>> listarMensajes() {
        List<MensajeContacto> mensajes = mensajeService.listarMensajes();
        return ResponseEntity.ok(mensajes);
    }

    @PostMapping
    public ResponseEntity<String> recibirMensajeContacto(@Valid @RequestBody MensajeContactoDTO mensajeDTO) {
        mensajeService.guardarMensaje(mensajeDTO);
        return ResponseEntity.ok("Mensaje recibido con éxito.");
    }
}
