import React, { useState } from 'react';

export default function DashboardPage({ user, orders, onNavigate }) {
  const [aviso, setAviso] = useState('');
  return (
    <div className="contenedor" style={{ padding: '30px 0 60px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--border)',
          paddingBottom: '16px',
          marginBottom: '24px'
        }}
      >
        <div>
          <h1 style={{ fontSize: '26px', color: 'var(--dark)' }}>
            Panel de Cliente: {user ? user.name : 'Usuario'}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            {user ? user.email : 'cliente@eyjproyectos.cl'}
          </p>
        </div>
        <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('home')}>
          + Explorar Más Proyectos
        </button>
      </div>

      <h2 style={{ fontSize: '20px', color: 'var(--dark)', marginBottom: '16px' }}>
        Mis Proyectos y Pedidos Adquiridos
      </h2>

      {aviso && (
        <p className="alert alert-info" role="status" aria-live="polite">
          {aviso}
        </p>
      )}

      {orders.length === 0 ? (
        <div
          style={{
            padding: '40px',
            background: 'var(--bg-light)',
            borderRadius: '8px',
            textAlign: 'center'
          }}
        >
          <p style={{ color: 'var(--text-muted)', marginBottom: '14px' }}>
            Aún no has solicitado ningún proyecto digital.
          </p>
          <button className="btn btn-primary" onClick={() => onNavigate('home')}>
            Ver Catálogo
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {orders.map((order) => (
            <div
              key={order.id}
              style={{
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '20px',
                background: 'var(--surface)'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px'
                }}
              >
                <div>
                  <strong>Pedido #{order.id}</strong>
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)', marginLeft: '12px' }}>
                    Fecha: {order.date}
                  </span>
                </div>
                <span
                  style={{
                    background: '#dcfce7',
                    color: 'var(--success)',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}
                >
                  ● En Desarrollo / Listo
                </span>
              </div>

              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '8px 0'
                    }}
                  >
                    <div>
                      <h4 style={{ margin: 0, fontSize: '15px' }}>{item.title}</h4>
                      <small style={{ color: 'var(--text-muted)' }}>{item.category}</small>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>
                        {item.priceFormatted}
                      </span>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() =>
                          setAviso(`Preparando el código fuente comprimido de “${item.title}”.`)
                        }
                      >
                        📥 Descargar ZIP
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  borderTop: '1px solid var(--border)',
                  paddingTop: '10px',
                  marginTop: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '14px'
                }}
              >
                <span>Método: {order.metodoPago === 'webpay' ? 'WebPay Plus' : 'Transferencia'}</span>
                <strong>Total Pagado: ${order.total.toLocaleString('es-CL')} CLP</strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
