package com.nexbyte.nexbyteapi.dto;

public record RegistroDTO(
    String run,
    String nombre,
    String apellidos,
    String correo,
    String pass
) {}