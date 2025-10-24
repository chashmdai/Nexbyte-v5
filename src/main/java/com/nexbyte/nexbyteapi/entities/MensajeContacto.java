package com.nexbyte.nexbyteapi.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "mensajes_contacto")
public class MensajeContacto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre es requerido.")
    @Size(max = 100, message = "El nombre no puede exceder los 100 caracteres.")
    @Column(nullable = false, length = 100)
    private String nombre;

    @NotBlank(message = "El correo es requerido.")
    @Email(message = "El formato del correo no es válido.")
    @Pattern(
            regexp = "^[^@\\s]+@(duoc\\.cl|profesor\\.duoc\\.cl|gmail\\.com)$",
            message = "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com"
    )
    @Size(max = 100, message = "El correo no puede exceder los 100 caracteres.")
    @Column(nullable = false, length = 100)
    private String email;

    @NotBlank(message = "El mensaje es requerido.")
    @Size(max = 500, message = "El mensaje no puede exceder los 500 caracteres.")
    @Column(nullable = false, length = 500)
    private String mensaje;

    @Column(name = "fecha_envio", nullable = false, updatable = false)
    private LocalDateTime fechaEnvio;

    @PrePersist
    protected void onCreate() {
        fechaEnvio = LocalDateTime.now();
    }
}
