import React from 'react';
import { useCart } from '../context/CartContext';
import { Container, Table, Button, Image, Alert, Form, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CartPage() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.precio, 0);

  return (
    <Container className="section">
      <h1 className="mb-4">Mi Carrito de Compras</h1>
      {cartItems.length === 0 ? (
        <Alert variant="info">
          Tu carrito está vacío. <Link to="/productos">¡Ve a la tienda!</Link>
        </Alert>
      ) : (
        <Card className="card soft">
          <Card.Body>
            {/* 👇 AQUÍ ESTÁ EL CAMBIO: Quitamos variant="dark" 👇 */}
            <Table responsive className="table-cart">
              <thead>
                <tr>
                  <th style={{width: '100px'}}>Imagen</th>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th style={{width: '120px'}}>Cantidad</th>
                  <th>Subtotal</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item.id}>
                    <td>
                      <Image 
                        src={item.imagen || '/assets/img/placeholder/product-1.jpg'} 
                        alt={item.nombre}
                        style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '8px' }}
                      />
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{item.nombre}</div>
                      <div className="muted" style={{ fontSize: '.9rem' }}>{item.categoria.nombre}</div>
                    </td>
                    <td>${new Intl.NumberFormat('es-CL').format(item.precio)}</td>
                    <td>
                      <Form.Control
                        type="number"
                        className="qty-input"
                        value={item.qty}
                        onChange={(e) => updateQuantity(item.id, e.target.value)}
                        min="1"
                        style={{ width: '80px' }}
                      />
                    </td>
                    <td>${new Intl.NumberFormat('es-CL').format(item.qty * item.precio)}</td>
                    <td>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="text-end mt-4">
              <h3>Total: ${new Intl.NumberFormat('es-CL').format(subtotal)}</h3>
              <Button variant="primary" size="lg">Proceder al Pago</Button>
            </div>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default CartPage;