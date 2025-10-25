package com.nexbyte.nexbyteapi.services;

import com.nexbyte.nexbyteapi.dto.CrearUsuarioDTO; // <-- AÑADIR ESTE IMPORT
import com.nexbyte.nexbyteapi.dto.UpdateUsuarioDTO;
import com.nexbyte.nexbyteapi.dto.UsuarioDTO;
import java.util.List;

public interface UsuarioService {
    UsuarioDTO crear(CrearUsuarioDTO crearUsuarioDTO); // <-- AÑADIR ESTA LÍNEA
    List<UsuarioDTO> listarTodos();
    UsuarioDTO obtenerPorId(Long id);
    UsuarioDTO actualizar(Long id, UpdateUsuarioDTO updateUsuarioDTO);
    void eliminar(Long id);
}