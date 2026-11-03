import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Icon from './Icon.jsx';
import { toggleTheme } from '../utils/theme.js';

const LINKS = [
  ['/skills', 'Habilidades'],
  ['/projects', 'Proyectos'],
  ['/sobre-mi', 'Sobre mí'],
  ['/contact', 'Contacto'],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
      <div className="wrap nav-in">
        <Link className="brand" to="/" aria-label="Elías Vicencio, inicio" onClick={close}>
          <img src="/images/logo.png" alt="" width="36" height="36" />
          <span>Elías Vicencio</span>
        </Link>

        {/* NavLink agrega solo la clase "active" a la página actual */}
        <nav className={`links${open ? ' open' : ''}`} id="links" aria-label="Principal">
          {LINKS.map(([to, label]) => (
            <NavLink key={to} to={to} onClick={close}>{label}</NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="icon-btn" type="button" aria-label="Cambiar tema claro/oscuro" onClick={toggleTheme}>
            <Icon name="moon" className="ic-moon" />
            <Icon name="sun" className="ic-sun" />
          </button>
          <button
            className="icon-btn menu-btn" type="button" aria-label="Abrir menú"
            aria-expanded={open} aria-controls="links" onClick={() => setOpen((o) => !o)}
          >
            <Icon name="menu" />
          </button>
        </div>
      </div>
    </header>
  );
}
