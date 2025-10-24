package com.nexbyte.nexbyteapi.repositories;

import com.nexbyte.nexbyteapi.entities.MensajeContacto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MensajeContactoRepository extends JpaRepository<MensajeContacto, Long> {
}