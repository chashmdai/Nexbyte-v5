package com.nexbyte.nexbyteapi.services;

import java.util.List;
import com.nexbyte.nexbyteapi.entities.Producto;

public interface ProductoService {
    Producto crear(Producto producto);
    Producto obtenerPorId(Long id);
    List<Producto> listarTodos();
    Producto actualizar(Long id, Producto productoActualizado);
    void eliminar(Long id);
    Producto desactivar(Long id);
}