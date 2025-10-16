package com.nexbyte.nexbyteapi.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "usuarios") // Es buena práctica nombrar las tablas en plural
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String run;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private String apellidos;

    @Column(unique = true, nullable = false)
    private String correo;

    @Column(nullable = false)
    private String pass; // Guardaremos la contraseña hasheada aquí

    // Agregaremos los roles más adelante
    // @Enumerated(EnumType.STRING)
    // private Role role;

    // Aquí irían los demás campos: telefono, direccion, etc.
}