import React, { useState } from 'react';

export default function ProjectDetailPage({ project, onAddToCart, onNavigate }) {
  const [aviso, setAviso] = useState('');
  if (!project) {
    return (
      <div className="contenedor" style={{ padding: '60px 0', textAlign: 'center' }}>
        <h2>No hay ningún proyecto seleccionado.</h2>
        <button className="btn btn-primary" onClick={() => onNavigate('home')} style={{ marginTop: '16px' }}>
          Volver al Inicio
        </button>
      </div>
    );
  }

  return (
    <div className="contenedor" style={{ padding: '30px 0 60px' }}>
      <button
        onClick={() => onNavigate('home')}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--primary)',
          cursor: 'pointer',
          fontWeight: 600,
          marginBottom: '20px'
        }}
      >
        ← Volver al catálogo
      </button>

      <div className="detail-layout">
        <div className="detail-img-wrap">
          <img src={project.image} alt={project.title} />
        </div>

        <div>
          <span className="tarjeta-cat">{project.category}</span>
          <h1 style={{ fontSize: '28px', color: 'var(--dark)', margin: '8px 0 12px' }}>
            {project.title}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <span style={{ color: '#f59e0b', fontSize: '18px' }}>★</span>
            <strong style={{ fontSize: '15px' }}>{project.rating}</strong>
            <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
              ({project.reviewsCount} reseñas de clientes)
            </span>
          </div>

          <p style={{ fontSize: '26px', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '16px' }}>
            {project.priceFormatted}
          </p>

          <p style={{ fontSize: '15px', color: 'var(--text)', lineHeight: 1.7, marginBottom: '20px' }}>
            {project.longDescription}
          </p>

          <h3 style={{ fontSize: '16px', color: 'var(--dark)', marginBottom: '8px' }}>
            Stack Tecnológico Incluido:
          </h3>
          <div className="tags-list">
            {project.technologies.map((tech, idx) => (
              <span key={idx} className="tag">
                {tech}
              </span>
            ))}
          </div>

          <h3 style={{ fontSize: '16px', color: 'var(--dark)', margin: '20px 0 8px' }}>
            Características principales:
          </h3>
          <ul style={{ paddingLeft: '20px', fontSize: '14px', color: 'var(--text)', marginBottom: '24px' }}>
            {project.features.map((feat, idx) => (
              <li key={idx} style={{ marginBottom: '6px' }}>
                {feat}
              </li>
            ))}
          </ul>

          <div className="acciones-fila">
            <button className="btn btn-primary" onClick={() => onAddToCart(project)}>
              🛒 Añadir al Carrito
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setAviso('Demo en vivo disponible en el servidor de pruebas del equipo.')}
            >
              🌐 Ver Demo en Vivo
            </button>
          </div>

          {aviso && (
            <p className="alert alert-info" role="status" aria-live="polite" style={{ marginTop: '14px' }}>
              {aviso}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
