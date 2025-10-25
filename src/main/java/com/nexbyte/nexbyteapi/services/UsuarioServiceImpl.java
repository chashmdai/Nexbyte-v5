package com.nexbyte.nexbyteapi.services;

import com.nexbyte.nexbyteapi.dto.CrearUsuarioDTO; // <-- Importado
import com.nexbyte.nexbyteapi.dto.UpdateUsuarioDTO;
import com.nexbyte.nexbyteapi.dto.UsuarioDTO;
import com.nexbyte.nexbyteapi.entities.Usuario;
import com.nexbyte.nexbyteapi.repositories.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder; // <-- Importado
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder; // <-- Inyectado

    /**
     * Convierte una entidad Usuario a un UsuarioDTO (para no exponer la contraseña).
     */
    private UsuarioDTO convertirADTO(Usuario usuario) {
        return new UsuarioDTO(
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
    }

    /**
     * [NUEVO] Crea un nuevo usuario (generalmente por un Admin).
     * Encripta la contraseña y asigna el rol especificado.
     */
    @Override
    public UsuarioDTO crear(CrearUsuarioDTO crearUsuarioDTO) {
        // (Opcional: podrías añadir una validación para ver si el correo ya existe)

        Usuario usuario = Usuario.builder()
                .run(crearUsuarioDTO.run())
                .nombre(crearUsuarioDTO.nombre())
                .apellidos(crearUsuarioDTO.apellidos())
                .correo(crearUsuarioDTO.correo())
                .pass(passwordEncoder.encode(crearUsuarioDTO.pass())) // <-- Encriptamos la contraseña
                .role(crearUsuarioDTO.role()) // <-- Asignamos el rol del DTO
                .telefono(crearUsuarioDTO.telefono())
                .region(crearUsuarioDTO.region())
                .comuna(crearUsuarioDTO.comuna())
                .direccion(crearUsuarioDTO.direccion())
                .build();
        
        Usuario nuevoUsuario = usuarioRepository.save(usuario);
        return convertirADTO(nuevoUsuario);
    }

    /**
     * [EXISTENTE] Devuelve todos los usuarios como DTOs.
     */
    @Override
    public List<UsuarioDTO> listarTodos() {
        return usuarioRepository.findAll()
                .stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    /**
     * [EXISTENTE] Obtiene un usuario por su ID.
     */
    @Override
    public UsuarioDTO obtenerPorId(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado con ID: " + id));
        return convertirADTO(usuario);
    }

    /**
     * [EXISTENTE] Actualiza los datos de un usuario existente.
     */
    @Override
    public UsuarioDTO actualizar(Long id, UpdateUsuarioDTO updateUsuarioDTO) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado con ID: " + id));

        usuario.setNombre(updateUsuarioDTO.nombre());
        usuario.setApellidos(updateUsuarioDTO.apellidos());
        usuario.setRole(updateUsuarioDTO.role());
        usuario.setTelefono(updateUsuarioDTO.telefono());
        usuario.setRegion(updateUsuarioDTO.region());
        usuario.setComuna(updateUsuarioDTO.comuna());
        usuario.setDireccion(updateUsuarioDTO.direccion());

        return convertirADTO(usuarioRepository.save(usuario));
    }

    /**
     * [EXISTENTE] Elimina un usuario por su ID.
     */
    @Override
    public void eliminar(Long id) {
        if (!usuarioRepository.existsById(id)) {
            throw new UsernameNotFoundException("Usuario no encontrado con ID: " + id);
        }
        usuarioRepository.deleteById(id);
    }
}