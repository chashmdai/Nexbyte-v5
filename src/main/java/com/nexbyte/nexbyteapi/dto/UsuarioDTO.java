package com.nexbyte.nexbyteapi.dto;

import com.nexbyte.nexbyteapi.entities.Role;

public record UsuarioDTO(
        Long id,
        String run,
        String nombre,
        String apellidos,
        String correo,
        Role role,
        String telefono,
        String region,
        String comuna,
        String direccion
) {}
