// Cambia entre tema claro/oscuro (antes estaba en scripts.js)
export function toggleTheme() {
  const root = document.documentElement;
  const current = root.getAttribute('data-theme');
  const dark = current
    ? current === 'dark'
    : window.matchMedia('(prefers-color-scheme: dark)').matches;
  const next = dark ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  try { localStorage.setItem('theme', next); } catch { /* storage bloqueado */ }
}
