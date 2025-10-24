// src/pages/ProductListPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getProductos } from "../services/apiService";
import { useCart } from "../context/CartContext";

const CLP = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

// —— Tarjeta de producto (misma idea que tenías, con fallbacks + fade-in)
const ProductCard = ({ producto }) => {
  const { addToCart } = useCart();
  const productUrl = `/productos/detalle/${producto.id}`;
  const img = producto.imagen || "/assets/img/placeholder/product-1.jpg";
  const categoria = producto?.categoria?.nombre || "Sin categoría";

  const handleAdd = () => {
    addToCart(producto);
    // micro-animación en el badge del carrito (si existe)
    const el = document.getElementById("cart-count");
    if (el) {
      el.classList.remove("pop");
      // fuerza reflow para reiniciar animación
      void el.offsetWidth;
      el.classList.add("pop");
    }
  };

  return (
    <article className="card product" data-id={producto.id}>
      <Link className="thumb" to={productUrl}>
        <img
          src={img}
          alt={producto.nombre || "Producto"}
          loading="lazy"
          width="640"
          height="400"
          onLoad={(e) => e.currentTarget.classList.add("is-loaded")}
        />
      </Link>
      <div className="body">
        <Link className="title" to={productUrl}>
          {producto.nombre || "Producto"}
        </Link>
        <div className="meta">{categoria}</div>
        <div className="price">{CLP.format(producto.precio || 0)}</div>
      </div>
      <div className="actions">
        <button className="btn btn-primary btn-small" onClick={handleAdd}>
          Añadir al carrito
        </button>
      </div>
    </article>
  );
};

export default function ProductListPage() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // filtros/orden
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("todas");
  const [minP, setMinP] = useState("");
  const [maxP, setMaxP] = useState("");
  const [sort, setSort] = useState("recientes"); // recientes | precio_asc | precio_desc

  useEffect(() => {
    (async () => {
      try {
        const response = await getProductos();
        setProductos(response?.data || []);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los productos.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // categorías únicas desde los datos
  const categorias = useMemo(() => {
    const set = new Set();
    productos.forEach((p) => p?.categoria?.nombre && set.add(p.categoria.nombre));
    return ["todas", ...Array.from(set)];
  }, [productos]);

  // aplica búsqueda, filtros y orden
  const list = useMemo(() => {
    let items = [...productos];

    // búsqueda
    const query = q.trim().toLowerCase();
    if (query) {
      items = items.filter((p) =>
        [p?.nombre, p?.descripcion, p?.categoria?.nombre]
          .filter(Boolean)
          .some((t) => String(t).toLowerCase().includes(query))
      );
    }

    // categoría
    if (cat !== "todas") {
      items = items.filter((p) => p?.categoria?.nombre === cat);
    }

    // rango de precio
    const min = Number(minP);
    const max = Number(maxP);
    if (!Number.isNaN(min) && minP !== "") items = items.filter((p) => (p?.precio ?? 0) >= min);
    if (!Number.isNaN(max) && maxP !== "") items = items.filter((p) => (p?.precio ?? 0) <= max);

    // orden
    items.sort((a, b) => {
      if (sort === "precio_asc") return (a?.precio ?? 0) - (b?.precio ?? 0);
      if (sort === "precio_desc") return (b?.precio ?? 0) - (a?.precio ?? 0);
      // "recientes": intentamos por createdAt, si no por id desc
      const da = new Date(a?.createdAt || a?.fecha_creacion || 0).getTime();
      const db = new Date(b?.createdAt || b?.fecha_creacion || 0).getTime();
      if (da && db) return db - da;
      return (b?.id ?? 0) - (a?.id ?? 0);
    });

    return items;
  }, [productos, q, cat, minP, maxP, sort]);

  // reset de filtros
  const clearFilters = () => {
    setQ("");
    setCat("todas");
    setMinP("");
    setMaxP("");
    setSort("recientes");
  };

  if (loading) {
    return (
      <main className="container section">
        <p className="muted">Cargando productos…</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container section">
        <div className="card soft" style={{ padding: 16 }}>{error}</div>
      </main>
    );
  }

  return (
    <main className="container section">
      <div className="toolbar">
        <h1 style={{ margin: 0 }}>Productos</h1>
        <span className="spacer" />
        <small className="muted">{list.length} resultado{list.length === 1 ? "" : "s"}</small>
      </div>

      {/* Filtros */}
      <div className="card soft mt-3" style={{ padding: 16 }}>
        <div className="form-row">
          <div>
            <label htmlFor="q">Buscar</label>
            <input
              id="q"
              className="input"
              placeholder="Nombre, descripción…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="cat">Categoría</label>
            <select
              id="cat"
              className="input"
              value={cat}
              onChange={(e) => setCat(e.target.value)}
            >
              {categorias.map((c) => (
                <option key={c} value={c}>
                  {c[0].toUpperCase() + c.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row mt-3">
          <div>
            <label htmlFor="minP">Precio mínimo</label>
            <input
              id="minP"
              className="input"
              type="number"
              min="0"
              placeholder="0"
              value={minP}
              onChange={(e) => setMinP(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="maxP">Precio máximo</label>
            <input
              id="maxP"
              className="input"
              type="number"
              min="0"
              placeholder="1000000"
              value={maxP}
              onChange={(e) => setMaxP(e.target.value)}
            />
          </div>
        </div>

        <div className="toolbar mt-3">
          <div>
            <label htmlFor="sort" className="muted" style={{ display: "block", marginBottom: 6 }}>
              Ordenar por
            </label>
            <select
              id="sort"
              className="input"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              style={{ minWidth: 220 }}
            >
              <option value="recientes">Más recientes</option>
              <option value="precio_asc">Precio: menor a mayor</option>
              <option value="precio_desc">Precio: mayor a menor</option>
            </select>
          </div>

          <span className="spacer" />

          <button className="btn btn-ghost" onClick={clearFilters}>
            Limpiar filtros
          </button>
        </div>
      </div>

      {/* Lista */}
      {list.length === 0 ? (
        <div className="card soft mt-3" style={{ padding: 16 }}>
          No se encontraron productos con esos filtros.
        </div>
      ) : (
        <section className="products mt-3">
          {list.map((p) => (
            <ProductCard key={p.id} producto={p} />
          ))}
        </section>
      )}
    </main>
  );
}
