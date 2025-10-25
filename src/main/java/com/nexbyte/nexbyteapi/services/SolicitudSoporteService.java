package com.nexbyte.nexbyteapi.services;

import com.nexbyte.nexbyteapi.dto.SolicitudSoporteDTO;
import com.nexbyte.nexbyteapi.entities.SolicitudSoporte;
import java.util.List; // <-- AÑADIR IMPORT

public interface SolicitudSoporteService {
    SolicitudSoporte crearSolicitud(SolicitudSoporteDTO dto);
    List<SolicitudSoporte> listarSolicitudes(); // <-- AÑADIR ESTE MÉTODO
}