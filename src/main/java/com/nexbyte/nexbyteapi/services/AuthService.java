package com.nexbyte.nexbyteapi.services;

import com.nexbyte.nexbyteapi.dto.RegistroDTO;
import com.nexbyte.nexbyteapi.entities.Usuario;
import com.nexbyte.nexbyteapi.repositories.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public void registrar(RegistroDTO registroDTO) {
        Usuario usuario = Usuario.builder()
                .run(registroDTO.run())
                .nombre(registroDTO.nombre())
                .apellidos(registroDTO.apellidos())
                .correo(registroDTO.correo())
                .pass(passwordEncoder.encode(registroDTO.pass()))
                .build();
        
        usuarioRepository.save(usuario);
    }
}