import { useSearchParams } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import EmailLink from '../components/EmailLink.jsx';
import usePageTitle from '../hooks/usePageTitle.js';

export default function Contact() {
  usePageTitle('Contacto · Elías Vicencio');
  const [params] = useSearchParams();
  const sent = params.get('enviado') === '1'; // Formspree vuelve a /contact?enviado=1

  return (
    <section id="contact">
      <div className="wrap">
        <header className="sec-head reveal">
          <p className="eyebrow">Hablemos</p>
          <h2>Contáctame</h2>
        </header>
        <div className="contact">
          <div className="contact-info reveal">
            <div className="c-item">
              <span className="skill-ic"><Icon name="mail" /></span>
              <div><h3>Correo</h3><p><EmailLink /></p></div>
            </div>
            <div className="c-item">
              <span className="skill-ic"><Icon name="linkedin" /></span>
              <div>
                <h3>LinkedIn</h3>
                <p><a href="https://www.linkedin.com/in/el%C3%ADas-vicencio-3524942b1" target="_blank" rel="noopener noreferrer">linkedin.com/in/elias-vicencio</a></p>
              </div>
            </div>
            <div className="c-item">
              <span className="skill-ic"><Icon name="github" /></span>
              <div>
                <h3>GitHub</h3>
                <p><a href="https://github.com/EliasVicencio" target="_blank" rel="noopener noreferrer">github.com/EliasVicencio</a></p>
              </div>
            </div>
            <div className="c-item">
              <span className="skill-ic"><Icon name="instagram" /></span>
              <div>
                <h3>Instagram</h3>
                <p><a href="https://instagram.com/eliasvicencio.dev" target="_blank" rel="noopener noreferrer">@eliasvicencio.dev</a></p>
              </div>
            </div>
            <div className="c-item">
              <span className="skill-ic"><Icon name="pin" /></span>
              <div><h3>Ubicación</h3><p>Chile</p></div>
            </div>
          </div>

          <form className="card form reveal" action="https://formspree.io/f/mvgqpjrg" method="POST">
            {sent && (
              <p className="notice" role="status">¡Gracias! Recibí tu mensaje y te responderé pronto.</p>
            )}
            <input type="hidden" name="_subject" value="Nuevo mensaje desde eliasvicencio.cl" />
            <input type="hidden" name="_next" value="https://eliasvicencio.cl/contact?enviado=1" />
            <div className="hp" aria-hidden="true">
              <label>No completar <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" /></label>
            </div>

            <label htmlFor="email">Tu correo</label>
            <input id="email" name="email" type="email" placeholder="tu@correo.com" autoComplete="email" required />

            <label htmlFor="message">Mensaje</label>
            <textarea id="message" name="message" rows={5} placeholder="Hola, me gustaría contactarte porque…" required />

            <button className="btn btn-primary" type="submit"><Icon name="send" /> Enviar mensaje</button>
            <p className="privacy">
              Usaré tu correo solo para responderte. El mensaje se procesa mediante Formspree y no se comparte con otros fines (Ley 21.719 de protección de datos personales).
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
