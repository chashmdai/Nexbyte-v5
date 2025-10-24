package com.nexbyte.nexbyteapi.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record MensajeContactoDTO(
        @NotBlank(message = "El nombre es requerido.")
        @Size(max = 100, message = "El nombre no puede exceder los 100 caracteres.")
        String nombre,

        @NotBlank(message = "El correo es requerido.")
        @Email(message = "El formato del correo no es válido.")
        @Pattern(regexp = "^[^@\\s]+@(duoc\\.cl|profesor\\.duoc\\.cl|gmail\\.com)$", message = "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com")
        @Size(max = 100, message = "El correo no puede exceder los 100 caracteres.")
        String email,

        @NotBlank(message = "El mensaje es requerido.")
        @Size(max = 500, message = "El mensaje no puede exceder los 500 caracteres.")
        String mensaje
) {}
