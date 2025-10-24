package com.nexbyte.nexbyteapi.services;

import com.nexbyte.nexbyteapi.dto.UpdateUsuarioDTO;
import com.nexbyte.nexbyteapi.dto.UsuarioDTO;
import java.util.List;

public interface UsuarioService {
    List<UsuarioDTO> listarTodos();
    UsuarioDTO obtenerPorId(Long id);
    UsuarioDTO actualizar(Long id, UpdateUsuarioDTO updateUsuarioDTO);
    void eliminar(Long id);
}