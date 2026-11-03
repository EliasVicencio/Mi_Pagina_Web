import Icon from '../components/Icon.jsx';
import usePageTitle from '../hooks/usePageTitle.js';
import { skills } from '../data/skills.js';
import { languages, tools } from '../data/languages.js';

export default function Skills() {
  usePageTitle('Habilidades · Elías Vicencio');

  return (
    <section id="skills">
      <div className="wrap">
        <header className="sec-head reveal">
          <p className="eyebrow">Qué hago</p>
          <h2>Mis <span className="grad">habilidades</span></h2>
          <p className="sec-lead">
            Desarrollo web, backends, datos y controles de seguridad. El detalle de cada lenguaje está más abajo.
          </p>
        </header>
        <div className="skills">
          {skills.map((s) => (
            <article className="card skill reveal" key={s.title}>
              <span className="skill-ic"><Icon name={s.icon} className={s.spin ? 'icon-spin' : ''} /></span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>

        <header className="sec-head reveal skills-subhead">
          <p className="eyebrow">Stack técnico</p>
          <h2>Lenguajes que <span className="grad">domino</span></h2>
          <p className="sec-lead">
            Niveles relativos a mi práctica actual: uso diario en proyectos, base sólida, o experiencia aplicada
            en entregas concretas.
          </p>
        </header>
        <div className="langs">
          {languages.map((lang) => (
            <article className="card lang reveal" key={lang.name}>
              <div className="lang-top">
                <span className="skill-ic"><Icon name={lang.icon} /></span>
                <div>
                  <h3>{lang.name}</h3>
                  <small>{lang.level}</small>
                </div>
              </div>
              <div className="bar" aria-hidden="true">
                <span style={{ '--v': lang.value }} />
              </div>
            </article>
          ))}
        </div>

        <header className="sec-head reveal skills-subhead">
          <p className="eyebrow">Entorno</p>
          <h2>Frameworks y <span className="grad">herramientas</span></h2>
        </header>
        <ul className="stack-cloud">
          {tools.map((t) => (
            <li key={t.name}>
              <Icon name={t.icon} />
              {t.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
