package com.nexbyte.nexbyteapi.controllers;

import com.nexbyte.nexbyteapi.dto.CrearUsuarioDTO; // <-- 1. AÑADIR IMPORT
import com.nexbyte.nexbyteapi.dto.UpdateUsuarioDTO;
import com.nexbyte.nexbyteapi.dto.UsuarioDTO;
import com.nexbyte.nexbyteapi.services.UsuarioService;
import jakarta.validation.Valid; // <-- 2. AÑADIR IMPORT
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus; // <-- 3. AÑADIR IMPORT
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping; // <-- 4. AÑADIR IMPORT
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;

    // --- 5. AÑADIR ESTE NUEVO ENDPOINT ---
    @PostMapping
    public ResponseEntity<UsuarioDTO> crearUsuario(
            @Valid @RequestBody CrearUsuarioDTO crearUsuarioDTO) {
        
        UsuarioDTO nuevoUsuario = usuarioService.crear(crearUsuarioDTO);
        // Devolvemos 201 Created (el estándar para un POST exitoso)
        return new ResponseEntity<>(nuevoUsuario, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<UsuarioDTO>> listarUsuarios() {
        return ResponseEntity.ok(usuarioService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDTO> obtenerUsuarioPorId(@PathVariable Long id) {
        return ResponseEntity.ok(usuarioService.obtenerPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UsuarioDTO> actualizarUsuario(
            @PathVariable Long id, @RequestBody UpdateUsuarioDTO updateUsuarioDTO) {
        return ResponseEntity.ok(usuarioService.actualizar(id, updateUsuarioDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarUsuario(@PathVariable Long id) {
        usuarioService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}