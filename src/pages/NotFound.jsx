import { Link } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle.js';

export default function NotFound() {
  usePageTitle('Página no encontrada · Elías Vicencio');

  return (
    <section>
      <div className="wrap">
        <p className="eyebrow">Error 404</p>
        <h1>Página no <span className="grad">encontrada</span></h1>
        <p className="lead">La dirección que buscas no existe o fue movida.</p>
        <Link className="btn btn-primary" to="/">Volver al inicio</Link>
      </div>
    </section>
  );
}
