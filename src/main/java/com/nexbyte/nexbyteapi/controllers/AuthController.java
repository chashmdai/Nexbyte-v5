package com.nexbyte.nexbyteapi.controllers;

import com.nexbyte.nexbyteapi.dto.AuthResponseDTO;
import com.nexbyte.nexbyteapi.dto.LoginDTO;
import com.nexbyte.nexbyteapi.dto.RegistroDTO;
import com.nexbyte.nexbyteapi.dto.UsuarioDTO;
import com.nexbyte.nexbyteapi.repositories.UsuarioRepository;
import com.nexbyte.nexbyteapi.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UsuarioRepository usuarioRepository;

    @PostMapping({"/registro", "/register"})
    public ResponseEntity<String> registrarUsuario(@RequestBody RegistroDTO registroDTO) {
        authService.registrar(registroDTO);
        return ResponseEntity.ok("Usuario registrado con éxito");
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginDTO loginDTO) {
        return ResponseEntity.ok(authService.login(loginDTO));
    }

    @GetMapping("/me")
    public ResponseEntity<UsuarioDTO> me(@AuthenticationPrincipal UserDetails user) {
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        var u = usuarioRepository.findByCorreo(user.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + user.getUsername()));

        String run = u.getRun();  // ajusta si tu entidad usa rut+dv

        var dto = new UsuarioDTO(
                u.getId(),
                run,
                u.getNombre(),
                u.getApellidos(),
                u.getCorreo(),
                u.getRole(),
                u.getTelefono(),
                u.getRegion(),
                u.getComuna(),
                u.getDireccion()
        );

        return ResponseEntity.ok(dto);
    }
}
