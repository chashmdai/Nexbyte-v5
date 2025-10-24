package com.nexbyte.nexbyteapi.services;

import com.nexbyte.nexbyteapi.dto.MensajeContactoDTO;
import com.nexbyte.nexbyteapi.entities.MensajeContacto;

public interface MensajeContactoService {
    MensajeContacto guardarMensaje(MensajeContactoDTO mensajeDTO);
}