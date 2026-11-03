import CountUp from '../components/CountUp.jsx';
import usePageTitle from '../hooks/usePageTitle.js';

export default function About() {
  usePageTitle('Sobre mí · Elías Vicencio');

  return (
    <section id="sobre-mi">
      <div className="wrap about">
        <div className="reveal">
          <p className="eyebrow">Perfil</p>
          <h2>Sobre <span className="grad">mí</span></h2>
          <p>
            Soy Elías Vicencio, analista programador en formación con foco en desarrollo de software y seguridad.
            No me limito a “hacer que funcione”: me importa que el producto sea claro, mantenible y difícil de romper.
          </p>
          <p>
            Trabajo de punta a punta: interfaces en React, backends en Python o Java, datos en SQL y controles de
            seguridad aplicados. Mi proyecto de título, Dani ISO 27001, es un sistema de gestión de seguridad de la
            información alineado a la norma. En Hyperion implementé registro de eventos, revisión de vulnerabilidades
            y autenticación en dos factores.
          </p>
          <p>
            Busco equipos donde el código, la operación y la seguridad se traten como parte del mismo producto.
            Fuera del teclado, la música, el cine y la lectura me ayudan a mantener criterio.
          </p>
          <ul className="track">
            <li>
              <strong>Formación</strong>
              <span>Analista Programador · segundo año</span>
            </li>
            <li>
              <strong>Enfoque</strong>
              <span>Desarrollo web, Python y ciberseguridad aplicada</span>
            </li>
            <li>
              <strong>Ubicación</strong>
              <span>Chile · disponible para colaborar</span>
            </li>
          </ul>
        </div>
        <div className="stats reveal">
          <div className="card stat"><CountUp end={6} /><span>proyectos publicados</span></div>
          <div className="card stat"><strong>ISO 27001</strong><span>proyecto de título</span></div>
          <div className="card stat"><strong>2FA</strong><span>implementado en Hyperion</span></div>
          <div className="card stat"><strong>Full stack</strong><span>web, APIs, datos y móvil</span></div>
        </div>
      </div>
    </section>
  );
}
