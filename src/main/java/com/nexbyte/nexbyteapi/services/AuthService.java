package com.nexbyte.nexbyteapi.services;

import com.nexbyte.nexbyteapi.dto.AuthResponseDTO;
import com.nexbyte.nexbyteapi.dto.LoginDTO;
import com.nexbyte.nexbyteapi.dto.RegistroDTO;
import com.nexbyte.nexbyteapi.entities.Role;
import com.nexbyte.nexbyteapi.entities.Usuario;
import com.nexbyte.nexbyteapi.repositories.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public void registrar(RegistroDTO registroDTO) {
        Usuario usuario = Usuario.builder()
                .run(registroDTO.run())
                .nombre(registroDTO.nombre())
                .apellidos(registroDTO.apellidos())
                .correo(registroDTO.correo())
                .pass(passwordEncoder.encode(registroDTO.pass()))
                .role(Role.CLIENT)
                .telefono(registroDTO.telefono())
                .region(registroDTO.region())
                .comuna(registroDTO.comuna())
                .direccion(registroDTO.direccion())
                .build();
        usuarioRepository.save(usuario);
    }

    public AuthResponseDTO login(LoginDTO loginDTO) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.correo(), loginDTO.pass())
        );
        Usuario usuario = usuarioRepository.findByCorreo(loginDTO.correo())
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado durante el login"));
        String token = jwtService.generateToken(usuario.getCorreo());
        return new AuthResponseDTO(token);
    }
}
