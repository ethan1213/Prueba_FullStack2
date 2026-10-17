import React, { useState } from 'react';
import { Link } from 'wouter';
import ProjectCard from '../../components/ProjectCard';
import ProjectDetailPage from './ProjectDetailPage';
import CheckoutPage from './CheckoutPage';
import DashboardPage from './DashboardPage';
import { initialProjects } from '../../data/projectsData';

/**
 * Modulo legado "E&J Proyectos Web" (evaluacion EP1 · DSY1104).
 *
 * Conserva intactas las vistas del front anterior -- catalogo, detalle de proyecto,
 * checkout con carrito y panel de pedidos -- para que la evidencia de EP1 no se pierda
 * al haber migrado el proyecto al caso SyncPass. No forma parte del caso SyncPass.
 *
 * Mantiene su propia navegacion interna (`onNavigate`) tal como la tenian las paginas
 * originales; hacia afuera es una sola ruta: /ep1
 */
export default function LegacyEyjModule() {
  const [view, setView] = useState('catalogo');
  const [selected, setSelected] = useState(null);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  const user = {
    name: 'Cliente de Demostración',
    email: 'cliente@eyjproyectos.cl',
  };

  // Las paginas originales navegan con strings ('home', 'login', 'checkout'...).
  const navigate = (destino) => {
    if (destino === 'home') return setView('catalogo');
    if (destino === 'login') return setView('catalogo');
    return setView(destino);
  };

  const addToCart = (project) => {
    setCart((prev) => (prev.some((p) => p.id === project.id) ? prev : [...prev, project]));
    setView('checkout');
  };

  // CheckoutPage ya arma el pedido completo y llama a onClearCart por su cuenta.
  const placeOrder = (order) => {
    setOrders((prev) => [order, ...prev]);
    setView('dashboard');
  };

  return (
    <div>
      <div className="aviso-legacy">
        <div className="contenedor">
          <p>
            <strong>Módulo histórico EP1 — «E&amp;J Proyectos Web»</strong>. Se conserva como
            evidencia de la evaluación anterior y no forma parte del caso SyncPass.{' '}
            <Link href="/">Volver a SyncPass</Link>
          </p>
        </div>
      </div>

      <nav className="contenedor sub-nav" aria-label="Navegación del módulo EP1">
        <button
          className={`nav-link ${view === 'catalogo' ? 'active' : ''}`}
          onClick={() => setView('catalogo')}
        >
          Catálogo
        </button>
        <button
          className={`nav-link ${view === 'checkout' ? 'active' : ''}`}
          onClick={() => setView('checkout')}
        >
          Carrito {cart.length > 0 && <span className="badge-cart">{cart.length}</span>}
        </button>
        <button
          className={`nav-link ${view === 'dashboard' ? 'active' : ''}`}
          onClick={() => setView('dashboard')}
        >
          Panel de pedidos
        </button>
      </nav>

      {view === 'catalogo' && (
        <main className="contenedor" style={{ padding: '24px 0 60px' }}>
          <h1 style={{ fontSize: '26px', color: 'var(--dark)' }}>Catálogo de proyectos digitales</h1>
          <p className="texto-apoyo" style={{ marginBottom: '22px' }}>
            Front original de la evaluación EP1, con sus tarjetas, detalle y flujo de compra.
          </p>
          <div className="proyectos-grid">
            {initialProjects.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                onSelect={(proj) => {
                  setSelected(proj);
                  setView('detalle');
                }}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </main>
      )}

      {view === 'detalle' && (
        <ProjectDetailPage project={selected} onAddToCart={addToCart} onNavigate={navigate} />
      )}

      {view === 'checkout' && (
        <CheckoutPage
          cart={cart}
          user={user}
          onRemoveFromCart={(index) => setCart((prev) => prev.filter((_, i) => i !== index))}
          onClearCart={() => setCart([])}
          onOrderPlaced={placeOrder}
          onNavigate={navigate}
        />
      )}

      {view === 'dashboard' && (
        <DashboardPage user={user} orders={orders} onNavigate={navigate} />
      )}
    </div>
  );
}
