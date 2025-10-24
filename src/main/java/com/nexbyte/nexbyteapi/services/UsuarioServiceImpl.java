package com.nexbyte.nexbyteapi.services;

import com.nexbyte.nexbyteapi.dto.UpdateUsuarioDTO;
import com.nexbyte.nexbyteapi.dto.UsuarioDTO;
import com.nexbyte.nexbyteapi.entities.Usuario;
import com.nexbyte.nexbyteapi.repositories.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository;

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

    @Override
    public List<UsuarioDTO> listarTodos() {
        return usuarioRepository.findAll()
                .stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    @Override
    public UsuarioDTO obtenerPorId(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado con ID: " + id));
        return convertirADTO(usuario);
    }

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

    @Override
    public void eliminar(Long id) {
        if (!usuarioRepository.existsById(id)) {
            throw new UsernameNotFoundException("Usuario no encontrado con ID: " + id);
        }
        usuarioRepository.deleteById(id);
    }
}
