package com.nexbyte.nexbyteapi.services;

import com.nexbyte.nexbyteapi.entities.Categoria;
import java.util.List;

public interface CategoriaService {
    List<Categoria> listarTodas();
    Categoria obtenerPorId(Long id);
    Categoria crear(Categoria categoria);
    Categoria actualizar(Long id, Categoria categoria);
    void eliminar(Long id);
}