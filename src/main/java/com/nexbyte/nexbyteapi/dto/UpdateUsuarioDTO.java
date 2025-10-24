package com.nexbyte.nexbyteapi.dto;

import com.nexbyte.nexbyteapi.entities.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdateUsuarioDTO(
        @NotBlank @Size(max = 100) String nombre,
        @NotBlank @Size(max = 100) String apellidos,
        Role role,
        @Size(max = 15) String telefono,
        @NotBlank String region,
        @NotBlank String comuna,
        @NotBlank @Size(max = 300) String direccion
) {}
