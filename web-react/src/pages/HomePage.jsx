import React from 'react';
import { Link } from 'wouter';

/**
 * Inicio. Mantiene la estructura del sitio original de E&J Proyectos Web:
 * banner, panel de bienvenida, beneficios, tarjetas y video.
 */
export default function HomePage({ talleres, onSelectTaller }) {
  return (
    <>
      <div className="banner-home">
        <img
          src="/img/banner-home.png"
          alt="E&J Proyectos Web: ideas que se convierten en proyectos digitales"
        />
      </div>

      <main className="contenedor">
        <section className="bienvenida" aria-labelledby="titulo-inicio">
          <h1 id="titulo-inicio">Acreditación digital en terreno</h1>
          <p>
            SyncPass reemplaza las planillas de papel de los talleres comunitarios.
            Aquí puedes ver las actividades en curso y su quórum.
          </p>
          <Link className="btn btn-primary" href="#talleres">
            Ver talleres
          </Link>
        </section>

        <section className="beneficios" aria-labelledby="titulo-beneficios">
          <h2 id="titulo-beneficios">¿Por qué SyncPass?</h2>
          <div className="grid-beneficios">
            <div className="beneficio-card">
              <h3>Acreditación en segundos</h3>
              <p>
                El ingreso se registra leyendo un código QR, sin filas ni listas
                escritas a mano en la entrada.
              </p>
            </div>
            <div className="beneficio-card">
              <h3>Encuestas en el momento</h3>
              <p>
                La valoración del taller se responde ahí mismo al terminar, no
                semanas después por correo.
              </p>
            </div>
            <div className="beneficio-card">
              <h3>Funciona sin señal</h3>
              <p>
                En unidades vecinales sin cobertura, los registros quedan en el
                dispositivo y se envían al recuperar la conexión.
              </p>
            </div>
          </div>
        </section>

        <section id="talleres" aria-labelledby="titulo-talleres">
          <h2 id="titulo-talleres">Talleres en terreno</h2>
          <p>Actividades comunitarias en curso y su quórum de inscripción.</p>

          <div className="proyectos-grid">
            {talleres.map((taller) => (
              <article key={taller.id} className="tarjeta-proyecto">
                <div className="tarjeta-img-wrap">
                  <img src={taller.image} alt={`Taller de ${taller.title}`} />
                </div>
                <div className="tarjeta-body">
                  <span className="tarjeta-cat">
                    {taller.area} · {taller.comuna}
                  </span>
                  <h3>{taller.title}</h3>
                  <p className="tarjeta-desc">{taller.descripcion}</p>

                  <div className="quorum-bloque">
                    <div className="quorum-encabezado">
                      <span>
                        Quórum{' '}
                        <strong>
                          {taller.inscritos} / {taller.cuposMaximos}
                        </strong>
                      </span>
                      <strong className="quorum-pct">{taller.quorumPct}%</strong>
                    </div>
                    <div
                      className="barra-quorum"
                      role="progressbar"
                      aria-valuenow={taller.quorumPct}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`Quórum de ${taller.title}`}
                    >
                      <div
                        className="barra-quorum-relleno"
                        style={{ width: `${taller.quorumPct}%` }}
                      />
                    </div>
                  </div>

                  <div className="tarjeta-footer">
                    <span className="tarjeta-lugar">{taller.unidadVecinal}</span>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => onSelectTaller(taller)}
                    >
                      Ver taller
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="video-section" aria-labelledby="titulo-video">
          <h2 id="titulo-video">Conoce más sobre nosotros</h2>
          <video className="video-player" controls preload="metadata" poster="/img/video-poster.jpg">
            <source src="/video/presencia-digital.mp4" type="video/mp4" />
            Tu navegador no soporta la reproducción de video. Puedes{' '}
            <a href="/video/presencia-digital.mp4">descargar el video aquí</a>.
          </video>
        </section>
      </main>
    </>
  );
}
