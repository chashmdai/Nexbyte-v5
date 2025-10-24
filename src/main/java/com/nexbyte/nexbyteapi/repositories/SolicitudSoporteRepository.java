package com.nexbyte.nexbyteapi.repositories;

import com.nexbyte.nexbyteapi.entities.SolicitudSoporte;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SolicitudSoporteRepository extends JpaRepository<SolicitudSoporte, Long> {
}