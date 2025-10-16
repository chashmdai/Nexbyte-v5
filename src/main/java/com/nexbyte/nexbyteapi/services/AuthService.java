package com.nexbyte.nexbyteapi.services;

import com.nexbyte.nexbyteapi.dto.AuthResponseDTO;
import com.nexbyte.nexbyteapi.dto.LoginDTO;
import com.nexbyte.nexbyteapi.dto.RegistroDTO;
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
                .build();
        
        usuarioRepository.save(usuario);
    }
    public AuthResponseDTO login(LoginDTO loginDTO) {
        // 1. Spring Security verifica el correo y la contraseña
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginDTO.correo(), loginDTO.pass())
        );

        // 2. Si las credenciales son correctas, buscamos al usuario
        Usuario usuario = usuarioRepository.findByCorreo(loginDTO.correo())
            .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
            
        // 3. Generamos un token para ese usuario
        String token = jwtService.generateToken(usuario.getCorreo());

        // 4. Devolvemos el token en nuestro DTO de respuesta
        return new AuthResponseDTO(token);
    }
}