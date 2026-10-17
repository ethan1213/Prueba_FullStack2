import React, { useState } from 'react';

export default function CheckoutPage({ cart, onRemoveFromCart, onClearCart, onOrderPlaced, onNavigate, user }) {
  const [formData, setFormData] = useState({
    nombre: user ? user.name : '',
    correo: user ? user.email : '',
    metodoPago: 'webpay',
    notas: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const newOrder = {
      id: Math.floor(1000 + Math.random() * 9000),
      date: new Date().toLocaleDateString('es-CL'),
      items: [...cart],
      total: total,
      metodoPago: formData.metodoPago,
      estado: 'en_desarrollo'
    };

    setSubmitted(true);
    setTimeout(() => {
      onOrderPlaced(newOrder);
      onClearCart();
    }, 1200);
  };

  if (submitted) {
    return (
      <div className="contenedor" style={{ padding: '60px 0', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
        <h2 style={{ color: 'var(--success)', marginBottom: '8px' }}>¡Pedido Recibido con Éxito!</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
          Hemos registrado tu solicitud de proyecto digital. Te redirigiremos a tu panel de cliente.
        </p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="contenedor" style={{ padding: '60px 0', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛒</div>
        <h2>Tu carrito está vacío</h2>
        <p style={{ color: 'var(--text-muted)', margin: '10px 0 24px' }}>
          Explora nuestros proyectos web y añade el que mejor se adapte a tu negocio.
        </p>
        <button className="btn btn-primary" onClick={() => onNavigate('home')}>
          Ver Catálogo
        </button>
      </div>
    );
  }

  return (
    <div className="contenedor" style={{ padding: '30px 0 60px' }}>
      <h1 style={{ fontSize: '26px', color: 'var(--dark)', marginBottom: '24px' }}>
        Resumen de tu Pedido ({cart.length} {cart.length === 1 ? 'ítem' : 'ítems'})
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '30px' }}>
        {/* Lista de ítems */}
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
            {cart.map((item, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px' }}
                  />
                  <div>
                    <h4 style={{ margin: '0 0 4px', fontSize: '16px' }}>{item.title}</h4>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                      Código fuente completo + licencia
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 'bold', color: 'var(--primary)', marginBottom: '4px' }}>
                    {item.priceFormatted}
                  </div>
                  <button
                    onClick={() => onRemoveFromCart(index)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--danger)',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '24px'
            }}
          >
            <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Datos de Facturación y Contacto</h3>
            <div className="form-field">
              <label>Nombre completo</label>
              <input
                className="form-input"
                required
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                placeholder="Juan Pérez"
              />
            </div>
            <div className="form-field">
              <label>Correo para entrega de accesos y código</label>
              <input
                className="form-input"
                type="email"
                required
                value={formData.correo}
                onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                placeholder="juan@correo.cl"
              />
            </div>
            <div className="form-field">
              <label>Instrucciones de personalización (opcional)</label>
              <textarea
                className="form-input"
                rows="3"
                value={formData.notas}
                onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
                placeholder="Indica si requieres colores o dominio específico..."
              ></textarea>
            </div>
          </form>
        </div>

        {/* Resumen de cobro */}
        <div>
          <div
            style={{
              background: 'var(--bg-light)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '24px'
            }}
          >
            <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Resumen de Pago</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span>Subtotal:</span>
              <span>${total.toLocaleString('es-CL')} CLP</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span>Descuento académico:</span>
              <span style={{ color: 'var(--success)' }}>$0 CLP</span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                borderTop: '2px solid var(--border)',
                paddingTop: '12px',
                marginTop: '12px',
                fontSize: '18px',
                fontWeight: 'bold',
                color: 'var(--primary)'
              }}
            >
              <span>Total:</span>
              <span>${total.toLocaleString('es-CL')} CLP</span>
            </div>

            <div style={{ margin: '20px 0' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '8px' }}>
                Método de Pago:
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', marginBottom: '8px' }}>
                <input
                  type="radio"
                  name="pago"
                  checked={formData.metodoPago === 'webpay'}
                  onChange={() => setFormData({ ...formData, metodoPago: 'webpay' })}
                />
                WebPay Plus / RedCompra
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                <input
                  type="radio"
                  name="pago"
                  checked={formData.metodoPago === 'transferencia'}
                  onChange={() => setFormData({ ...formData, metodoPago: 'transferencia' })}
                />
                Transferencia Bancaria
              </label>
            </div>

            <button type="button" className="btn btn-primary btn-block" onClick={handleSubmit}>
              Confirmar Pedido y Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
