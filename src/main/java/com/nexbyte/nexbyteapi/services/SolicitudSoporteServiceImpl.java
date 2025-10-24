package com.nexbyte.nexbyteapi.services;

import com.nexbyte.nexbyteapi.dto.SolicitudSoporteDTO;
import com.nexbyte.nexbyteapi.entities.PrioridadSoporte;
import com.nexbyte.nexbyteapi.entities.SolicitudSoporte;
import com.nexbyte.nexbyteapi.repositories.SolicitudSoporteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SolicitudSoporteServiceImpl implements SolicitudSoporteService {

    private final SolicitudSoporteRepository solicitudRepository;

    @Override
    public SolicitudSoporte crearSolicitud(SolicitudSoporteDTO dto) {
        SolicitudSoporte nuevaSolicitud = SolicitudSoporte.builder()
                .nombreCliente(dto.nombreCliente())
                .emailCliente(dto.emailCliente())
                .telefonoCliente(dto.telefonoCliente())
                .region(dto.region())
                .comuna(dto.comuna())
                .direccion(dto.direccion())
                .equipo(dto.equipo())
                .prioridad(dto.prioridad() != null ? dto.prioridad() : PrioridadSoporte.NORMAL)
                .serviciosRequeridos(dto.serviciosRequeridos())
                .descripcionProblema(dto.descripcionProblema())
                .build();
        return solicitudRepository.save(nuevaSolicitud);
    }
}
