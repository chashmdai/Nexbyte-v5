    package com.nexbyte.nexbyteapi.services;

    import com.nexbyte.nexbyteapi.dto.MensajeContactoDTO;
    import com.nexbyte.nexbyteapi.entities.MensajeContacto;
    import java.util.List; // <-- AÑADIR IMPORT

    public interface MensajeContactoService {
        MensajeContacto guardarMensaje(MensajeContactoDTO mensajeDTO);
        List<MensajeContacto> listarMensajes(); // <-- AÑADIR ESTE MÉTODO
    }