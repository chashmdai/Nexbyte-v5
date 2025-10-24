package com.nexbyte.nexbyteapi.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegistroDTO(
        @NotBlank String run,
        @NotBlank @Size(max = 100) String nombre,
        @NotBlank @Size(max = 100) String apellidos,
        @NotBlank @Size(max = 100) String correo,
        @NotBlank @Size(min = 4, max = 10) String pass,
        String telefono,
        @NotBlank String region,
        @NotBlank String comuna,
        @NotBlank @Size(max = 300) String direccion
) {}
