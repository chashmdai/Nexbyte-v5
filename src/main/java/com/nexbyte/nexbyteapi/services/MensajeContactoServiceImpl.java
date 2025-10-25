package com.nexbyte.nexbyteapi.services;

import com.nexbyte.nexbyteapi.dto.MensajeContactoDTO;
import com.nexbyte.nexbyteapi.entities.MensajeContacto;
import com.nexbyte.nexbyteapi.repositories.MensajeContactoRepository;
import java.util.List; // <-- AÑADIR IMPORT
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MensajeContactoServiceImpl implements MensajeContactoService {

    private final MensajeContactoRepository mensajeRepository;

    @Override
    public MensajeContacto guardarMensaje(MensajeContactoDTO mensajeDTO) {
        MensajeContacto nuevoMensaje = MensajeContacto.builder()
                .nombre(mensajeDTO.nombre())
                .email(mensajeDTO.email())
                .mensaje(mensajeDTO.mensaje())
                .build();
        return mensajeRepository.save(nuevoMensaje);
    }

    // --- AÑADIR ESTE NUEVO MÉTODO ---
    @Override
    public List<MensajeContacto> listarMensajes() {
        // Simplemente devolvemos todos los mensajes encontrados
        return mensajeRepository.findAll();
    }
}