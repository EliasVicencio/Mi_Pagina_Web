import Icon from '../components/Icon.jsx';
import usePageTitle from '../hooks/usePageTitle.js';
import { projects } from '../data/projects.js';

export default function Projects() {
  usePageTitle('Proyectos · Elías Vicencio');

  return (
    <section id="projects">
      <div className="wrap">
        <header className="sec-head reveal">
          <p className="eyebrow">Trabajo seleccionado</p>
          <h2>Mis <span className="grad">proyectos</span></h2>
        </header>
        <div className="projects">
          {projects.map((p) => (
            <article className="card project reveal" key={p.title}>
              <div className="p-top">
                <span className="skill-ic"><Icon name={p.icon} /></span>
                {p.badge && <span className="badge">{p.badge}</span>}
              </div>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
              <ul className="tags">
                {p.tags.map((t) => <li key={t}>{t}</li>)}
              </ul>
              <div className="p-links">
                <a className="btn btn-primary" href={p.code} target="_blank" rel="noopener noreferrer">
                  <Icon name="github" /> Código
                </a>
                {p.demo && (
                  <a className="btn btn-ghost" href={p.demo} target="_blank" rel="noopener noreferrer">
                    <Icon name="ext" /> Demo
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
