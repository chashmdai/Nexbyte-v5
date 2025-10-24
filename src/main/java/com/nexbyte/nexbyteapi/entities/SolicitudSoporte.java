package com.nexbyte.nexbyteapi.entities;

import java.time.LocalDateTime;
import java.util.List;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "solicitudes_soporte")
public class SolicitudSoporte {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre es requerido.")
    @Size(max = 100, message = "Máximo 100 caracteres.")
    @Column(length = 100)
    private String nombreCliente;

    @NotBlank(message = "El correo es requerido.")
    @Email(message = "Correo inválido.")
    @Pattern(regexp = "^[^@\\s]+@(duoc\\.cl|profesor\\.duoc\\.cl|gmail\\.com)$", message = "Dominio no permitido.")
    @Size(max = 100, message = "Máximo 100 caracteres.")
    @Column(length = 100)
    private String emailCliente;

    @Size(max = 15, message = "Máximo 15 caracteres.")
    @Column(length = 15)
    private String telefonoCliente;

    @NotBlank(message = "La región es requerida.")
    @Column(length = 100)
    private String region;

    @NotBlank(message = "La comuna es requerida.")
    @Column(length = 100)
    private String comuna;

    @Column(length = 300)
    private String direccion;

    @NotBlank(message = "Debe seleccionar un tipo de equipo.")
    private String equipo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PrioridadSoporte prioridad;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "solicitud_soporte_servicios", joinColumns = @JoinColumn(name = "solicitud_id"))
    @Column(name = "servicio")
    @Size(min = 1, message = "Debe seleccionar al menos un servicio.")
    private List<String> serviciosRequeridos;

    @NotBlank(message = "La descripción del problema es requerida.")
    @Size(min = 10, max = 600, message = "La descripción debe tener entre 10 y 600 caracteres.")
    @Column(length = 600)
    private String descripcionProblema;

    @Column(name = "fecha_creacion", nullable = false, updatable = false)
    private LocalDateTime fechaCreacion;

    @PrePersist
    protected void onCreate() {
        fechaCreacion = LocalDateTime.now();
        if (prioridad == null) prioridad = PrioridadSoporte.NORMAL;
    }
}
