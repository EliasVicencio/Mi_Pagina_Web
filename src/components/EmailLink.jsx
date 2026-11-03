import { useState } from 'react';

// El correo se arma con partes, como antes (data-u / data-d)
const USER = 'elias.vicencio2505';
const DOMAIN = 'gmail.com';

export default function EmailLink() {
  const [copied, setCopied] = useState(false);
  const addr = `${USER}@${DOMAIN}`;

  const copy = () => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(addr).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <>
      <span className="email-address">{addr}</span>
      <button type="button" className="copy" onClick={copy}>{copied ? '¡Copiado!' : 'Copiar'}</button>
    </>
  );
}
