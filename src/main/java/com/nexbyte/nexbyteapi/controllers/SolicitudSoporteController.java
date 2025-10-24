package com.nexbyte.nexbyteapi.controllers;

import com.nexbyte.nexbyteapi.dto.SolicitudSoporteDTO;
import com.nexbyte.nexbyteapi.services.SolicitudSoporteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/soporte")
@RequiredArgsConstructor
public class SolicitudSoporteController {

    private final SolicitudSoporteService solicitudService;

    @PostMapping
    public ResponseEntity<String> recibirSolicitudSoporte(@Valid @RequestBody SolicitudSoporteDTO dto) {
        solicitudService.crearSolicitud(dto);
        return ResponseEntity.ok("Solicitud de soporte recibida con éxito.");
    }
}
