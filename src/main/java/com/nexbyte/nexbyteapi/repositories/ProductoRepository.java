package com.nexbyte.nexbyteapi.repositories;

import com.nexbyte.nexbyteapi.entities.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
}