package com.nexbyte.nexbyteapi.repositories;

import com.nexbyte.nexbyteapi.entities.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
}