package com.nexbyte.nexbyteapi.services;

import com.nexbyte.nexbyteapi.dto.AuthResponseDTO;
import com.nexbyte.nexbyteapi.dto.LoginDTO;
import com.nexbyte.nexbyteapi.dto.RegistroDTO;
import com.nexbyte.nexbyteapi.dto.UsuarioDTO; // <-- 1. IMPORTAMOS EL DTO DE USUARIO
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

    /**
     * Registra un nuevo usuario.
     * Por defecto, se registra con el rol CLIENT.
     */
    public void registrar(RegistroDTO registroDTO) {
        Usuario usuario = Usuario.builder()
                .run(registroDTO.run())
                .nombre(registroDTO.nombre())
                .apellidos(registroDTO.apellidos())
                .correo(registroDTO.correo())
                .pass(passwordEncoder.encode(registroDTO.pass()))
                .role(Role.CLIENT) // <-- Asigna rol CLIENT por defecto
                .telefono(registroDTO.telefono())
                .region(registroDTO.region())
                .comuna(registroDTO.comuna())
                .direccion(registroDTO.direccion())
                .build();
        usuarioRepository.save(usuario);
    }

    /**
     * Autentica a un usuario y devuelve el token JWT junto con sus datos.
     * ESTA ES LA VERSIÓN MODIFICADA (SOLUCIONA GAP 1)
     */
    public AuthResponseDTO login(LoginDTO loginDTO) {
        // 1. Autenticamos al usuario (valida correo y pass)
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.correo(), loginDTO.pass())
        );

        // 2. Si la autenticación fue exitosa, buscamos al usuario en la BD
        Usuario usuario = usuarioRepository.findByCorreo(loginDTO.correo())
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado durante el login"));

        // 3. Generamos el token JWT
        String token = jwtService.generateToken(usuario.getCorreo());

        // 4. Convertimos la entidad Usuario a UsuarioDTO (para no exponer la contraseña)
        // (Usamos la misma lógica que vimos en UsuarioServiceImpl)
        UsuarioDTO usuarioDTO = new UsuarioDTO(
                usuario.getId(),
                usuario.getRun(),
                usuario.getNombre(),
                usuario.getApellidos(),
                usuario.getCorreo(),
                usuario.getRole(),
                usuario.getTelefono(),
                usuario.getRegion(),
                usuario.getComuna(),
                usuario.getDireccion()
        );

        // 5. Devolvemos el DTO de respuesta con AMBOS datos
        return new AuthResponseDTO(token, usuarioDTO);
    }
}