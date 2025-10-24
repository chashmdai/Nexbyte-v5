package com.nexbyte.nexbyteapi.dto;

import com.nexbyte.nexbyteapi.entities.PrioridadSoporte;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.util.List;

public record SolicitudSoporteDTO(
        @NotBlank(message = "El nombre es requerido.")
        @Size(max = 100)
        String nombreCliente,

        @NotBlank(message = "El correo es requerido.")
        @Email(message = "Correo inválido.")
        @Pattern(regexp = "^[^@\\s]+@(duoc\\.cl|profesor\\.duoc\\.cl|gmail\\.com)$", message = "Dominio no permitido.")
        @Size(max = 100)
        String emailCliente,

        @Size(max = 15)
        String telefonoCliente,

        @NotBlank(message = "La región es requerida.")
        String region,

        @NotBlank(message = "La comuna es requerida.")
        String comuna,

        @Size(max = 300)
        String direccion,

        @NotBlank(message = "Debe seleccionar un tipo de equipo.")
        String equipo,

        PrioridadSoporte prioridad,

        @NotEmpty(message = "Debe seleccionar al menos un servicio.")
        List<String> serviciosRequeridos,

        @NotBlank(message = "La descripción del problema es requerida.")
        @Size(min = 10, max = 600, message = "La descripción debe tener entre 10 y 600 caracteres.")
        String descripcionProblema
) {}
