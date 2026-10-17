import React from 'react';
import { Link } from 'wouter';

export default function Footer() {
  return (
    <footer>
      <div className="contenedor">
        <p>
          <strong>E&amp;J Proyectos Web</strong>
        </p>
        <p>
          SyncPass · Desarrollo Fullstack II · Proyecto académico, sin datos reales.
        </p>
        <p>
          <Link href="/ep1">Módulo histórico EP1</Link>
        </p>
      </div>
    </footer>
  );
}
