import { useEffect, useState } from 'react';

// Terminal que "escribe" (antes en effects.js)
const SEGS = [
  ['c-dim', '$'], ['', ' whoami\nelias · analista programador\n'],
  ['c-dim', '$'], ['', ' stack --list\npython · javascript · java · kotlin · sql\n'],
  ['c-dim', '$'], ['', ' focus\nweb · ciberseguridad · iso 27001\n'],
  ['c-dim', '$'], ['', ' status\n'],
  ['c-ok', '●'], ['', ' construyendo software seguro'],
];
const FULL = SEGS.map((s) => s[1]).join('');
const TOTAL = FULL.length;

export default function Terminal() {
  const [n, setN] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? TOTAL : 0
  );

  useEffect(() => {
    if (n >= TOTAL) return;
    const ch = FULL.charAt(n);
    const id = setTimeout(() => setN(n + 1), ch === '\n' ? 260 : 16 + Math.random() * 22);
    return () => clearTimeout(id);
  }, [n]);

  let left = n;
  const parts = SEGS.map(([cls, text], i) => {
    const shown = text.slice(0, Math.max(0, left));
    const hidden = text.slice(shown.length);
    left -= text.length;
    // El texto aún no escrito queda invisible para que el cuadro no "salte"
    return (
      <span key={i} className={cls || undefined}>
        {shown}<span style={{ visibility: 'hidden' }}>{hidden}</span>
      </span>
    );
  });

  return (
    <div className="term reveal" aria-hidden="true">
      <div className="term-bar"><i></i><i></i><i></i><span>elias@portafolio ~</span></div>
      <pre>{parts}<span className="cursor">_</span></pre>
    </div>
  );
}
