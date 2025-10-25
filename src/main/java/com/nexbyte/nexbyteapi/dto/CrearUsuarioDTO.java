package com.nexbyte.nexbyteapi.dto;

import com.nexbyte.nexbyteapi.entities.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CrearUsuarioDTO(
        @NotBlank String run,
        @NotBlank @Size(max = 100) String nombre,
        @NotBlank @Size(max = 100) String apellidos,
        @NotBlank @Size(max = 100) String correo,
        @NotBlank @Size(min = 4, max = 10) String pass,
        
        @NotNull
        Role role,

        String telefono,
        @NotBlank String region,
        @NotBlank String comuna,
        @NotBlank @Size(max = 300) String direccion
) {}