// src/pages/CartPage.jsx
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Container, Row, Col, Table, Card, Button, Image, Form,
} from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { useToast } from "../components/ToastProvider";

const CLP = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

const SHIPPING_THRESHOLD = 80000; // Envío gratis desde
const SHIPPING_COST = 3990;       // Envío si no hay gratis

// Cupones demo
const COUPONS = {
  NEX10:  { kind: "percent", value: 10,    label: "10% de descuento" },
  NEX5K:  { kind: "amount",  value: 5000,  label: "$5.000 de descuento" },
  ENVIO0: { kind: "shipping", value: true, label: "Envío gratis" },
};

export default function CartPage() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal: ctxSubtotal,
    addToCart,
  } = useCart();

  const toast = useToast();

  // Subtotal del contexto o calculado
  const subtotal = useMemo(
    () =>
      typeof ctxSubtotal === "number"
        ? ctxSubtotal
        : cartItems.reduce((acc, item) => acc + item.qty * item.precio, 0),
    [ctxSubtotal, cartItems]
  );

  // Estado cupón
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null); // { code, ...COUPONS[code] }
  const [couponMsg, setCouponMsg] = useState("");

  const applyCoupon = (e) => {
    e.preventDefault();
    const code = (couponCode || "").trim().toUpperCase();
    const def = COUPONS[code];
    if (!code) return;
    if (!def) {
      setAppliedCoupon(null);
      setCouponMsg("Cupón inválido.");
      toast.error("Cupón inválido.");
      return;
    }
    setAppliedCoupon({ code, ...def });
    setCouponMsg(`Aplicado: ${def.label}`);
    toast.success(`Aplicado: ${def.label}`);
  };

  // Cantidad con pills +/−
  const clamp = (n, min = 1, max = 99) => Math.min(max, Math.max(min, Number(n) || 1));
  const minus = (item) => updateQuantity(item.id, clamp(item.qty - 1));
  const plus  = (item) => updateQuantity(item.id, clamp(item.qty + 1));

  // Eliminar con “Deshacer”
  const removeItem = (item) => {
    removeFromCart(item.id);
    toast.info(`Quitado: ${item.nombre}`, {
      action: { label: "Deshacer", onClick: () => addToCart(item) },
      duration: 3500,
    });
  };

  // Envío base
  const baseShipping = subtotal === 0 ? 0 : (subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST);

  // Descuento cupón
  const discount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.kind === "percent") return Math.floor((appliedCoupon.value / 100) * subtotal);
    if (appliedCoupon.kind === "amount")  return Math.min(appliedCoupon.value, subtotal);
    return 0;
  }, [appliedCoupon, subtotal]);

  // Envío tras cupón (ENVIO0 anula envío)
  const shipping = appliedCoupon?.kind === "shipping" ? 0 : baseShipping;

  const total = Math.max(0, subtotal - discount) + shipping;
  const freeLeft = Math.max(0, SHIPPING_THRESHOLD - subtotal);
  const freePct = Math.min(100, Math.round((subtotal / SHIPPING_THRESHOLD) * 100));

  const empty = cartItems.length === 0;

  return (
    <Container className="section container-wide cart">
      <h1 className="mb-3">Mi carrito</h1>

      {empty ? (
        <Card className="card soft" style={{ padding: 20 }}>
          <div className="center" style={{ flexDirection: "column", gap: 8, textAlign: "center" }}>
            <p className="muted">Tu carrito está vacío.</p>
            <Link to="/productos" className="btn btn-primary">Ir a productos</Link>
          </div>
        </Card>
      ) : (
        <Row className="g-4">
          {/* Lista */}
          <Col lg={8}>
            <Card className="card soft">
              <Card.Body>
                <Table responsive className="table-cart cart-table">
                  <thead>
                    <tr>
                      <th style={{ width: 96 }}>Imagen</th>
                      <th>Producto</th>
                      <th>Precio</th>
                      <th style={{ width: 160 }}>Cantidad</th>
                      <th>Subtotal</th>
                      <th style={{ width: 110 }}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <Image
                            src={item.imagen || "/assets/img/placeholder/product-1.jpg"}
                            alt={item.nombre}
                            className="cart-thumb"
                          />
                        </td>
                        <td>
                          <div className="cart-title">{item.nombre}</div>
                          <div className="muted" style={{ fontSize: ".9rem" }}>
                            {item?.categoria?.nombre ?? "—"}
                          </div>
                        </td>
                        <td>{CLP.format(item.precio)}</td>
                        <td>
                          <div className="qty-control">
                            <button className="qty-btn" onClick={() => minus(item)} aria-label="Disminuir">−</button>
                            <span className="qty-value" aria-live="polite">{item.qty}</span>
                            <button className="qty-btn" onClick={() => plus(item)} aria-label="Aumentar">+</button>
                          </div>
                        </td>
                        <td>{CLP.format(item.qty * item.precio)}</td>
                        <td>
                          <Button variant="outline-danger" size="sm" onClick={() => removeItem(item)}>
                            Eliminar
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                <div className="d-flex justify-content-between align-items-center mt-3">
                  <Link to="/productos" className="btn btn-ghost">Seguir comprando</Link>
                  <Button variant="outline-danger" onClick={clearCart}>Vaciar carrito</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Resumen */}
          <Col lg={4}>
            <Card className="card soft cart-summary">
              <Card.Body>
                <h4 className="cart-summary-title">Resumen</h4>

                <div className="d-flex justify-content-between mt-3">
                  <span className="muted">Subtotal</span>
                  <strong className="cart-num">{CLP.format(subtotal)}</strong>
                </div>

                {/* Cupón */}
                <Form onSubmit={applyCoupon} className="mt-3">
                  <div className="d-flex gap-2">
                    <Form.Control
                      className="input"
                      placeholder="Cupón (NEX10 / NEX5K / ENVIO0)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <Button type="submit" variant="ghost" className="btn-ghost">Aplicar</Button>
                  </div>
                  {couponMsg && <small className="muted">{couponMsg}</small>}
                </Form>

                {discount > 0 && (
                  <div className="d-flex justify-content-between mt-2">
                    <span className="muted">Descuento</span>
                    <strong className="cart-num">−{CLP.format(discount)}</strong>
                  </div>
                )}

                <div className="d-flex justify-content-between mt-2">
                  <span className="muted">
                    Envío {subtotal >= SHIPPING_THRESHOLD || appliedCoupon?.kind === "shipping" ? "(gratis)" : ""}
                  </span>
                  <strong className="cart-num">{shipping === 0 ? "—" : CLP.format(shipping)}</strong>
                </div>

                <div className="hr" />

                <div className="d-flex justify-content-between cart-total-row">
                  <span>Total</span>
                  <strong className="cart-total">{CLP.format(total)}</strong>
                </div>

                <Button className="mt-3 cart-pay-btn" variant="primary" size="lg">
                  Proceder al pago
                </Button>

                {/* Barra de envío gratis */}
                <div className="freebar mt-3" style={{ ["--pct"]: `${freePct}%` }}>
                  <div className="freebar-fill" />
                </div>
                {freeLeft > 0 ? (
                  <small style={{ color: "#DBE6FF" /* legible */ }}>
                    Te faltan <strong style={{ color: "#fff" }}>{CLP.format(freeLeft)}</strong> para envío gratis.
                  </small>
                ) : (
                  <small style={{ color: "#DBE6FF" }}>¡Tienes envío gratis! 🎉</small>
                )}
              </Card.Body>
            </Card>
          </Col>

          {/* CTA inferior SOLO en móvil */}
          <Col xs={12} className="cart-mobile-cta d-lg-none">
            <div className="cart-mobile-cta-inner">
              <div className="muted">Total</div>
              <strong>{CLP.format(total)}</strong>
              <Button variant="primary" size="lg">Pagar</Button>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
}
