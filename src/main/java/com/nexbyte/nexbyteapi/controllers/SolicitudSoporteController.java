package com.nexbyte.nexbyteapi.controllers;

import com.nexbyte.nexbyteapi.dto.SolicitudSoporteDTO;
import com.nexbyte.nexbyteapi.entities.SolicitudSoporte; // <-- 1. AÑADIR IMPORT
import com.nexbyte.nexbyteapi.services.SolicitudSoporteService;
import jakarta.validation.Valid;
import java.util.List; // <-- 2. AÑADIR IMPORT
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping; // <-- 3. AÑADIR IMPORT
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/soporte")
@RequiredArgsConstructor
public class SolicitudSoporteController {

    private final SolicitudSoporteService solicitudService;

    // --- 4. AÑADIR ESTE NUEVO ENDPOINT GET ---
    @GetMapping
    public ResponseEntity<List<SolicitudSoporte>> listarSolicitudes() {
        List<SolicitudSoporte> solicitudes = solicitudService.listarSolicitudes();
        return ResponseEntity.ok(solicitudes);
    }

    @PostMapping
    public ResponseEntity<String> recibirSolicitudSoporte(@Valid @RequestBody SolicitudSoporteDTO dto) {
        solicitudService.crearSolicitud(dto);
        return ResponseEntity.ok("Solicitud de soporte recibida con éxito.");
    }
}