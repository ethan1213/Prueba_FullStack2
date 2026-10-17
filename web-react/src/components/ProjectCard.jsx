import React from 'react';

export default function ProjectCard({ project, onSelect, onAddToCart }) {
  return (
    <article className="tarjeta-proyecto">
      <div className="tarjeta-img-wrap" onClick={() => onSelect(project)} style={{ cursor: 'pointer' }}>
        <img src={project.image} alt={project.title} />
      </div>
      <div className="tarjeta-body">
        <span className="tarjeta-cat">{project.category}</span>
        <h3>{project.title}</h3>
        <p className="tarjeta-desc">{project.shortDescription}</p>
        <div className="tarjeta-footer">
          <span className="precio-tag">{project.priceFormatted}</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-secondary btn-sm" onClick={() => onSelect(project)}>
              Detalle
            </button>
            <button className="btn btn-primary btn-sm" onClick={() => onAddToCart(project)}>
              Comprar
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
