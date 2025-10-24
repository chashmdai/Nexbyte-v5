package com.nexbyte.nexbyteapi.services;

import com.nexbyte.nexbyteapi.dto.SolicitudSoporteDTO;
import com.nexbyte.nexbyteapi.entities.SolicitudSoporte;

public interface SolicitudSoporteService {
    SolicitudSoporte crearSolicitud(SolicitudSoporteDTO dto);
}