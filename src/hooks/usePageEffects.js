import { useEffect } from 'react';

const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// Reemplaza a effects.js (partes 1, 5 y 6) y a la animación "reveal" de scripts.js
export default function usePageEffects(pathname, progressRef) {
  // Al cambiar de página, volver arriba
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  // Barra de progreso de scroll
  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;
    const root = document.documentElement;
    let tick = false;
    const upd = () => {
      const h = root.scrollHeight - window.innerHeight;
      bar.style.transform = 'scaleX(' + (h > 0 ? Math.min(window.scrollY / h, 1) : 0) + ')';
      tick = false;
    };
    const onScroll = () => { if (!tick) { tick = true; requestAnimationFrame(upd); } };
    window.addEventListener('scroll', onScroll, { passive: true });
    requestAnimationFrame(upd);
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname, progressRef]);

  // Animación de aparición (.reveal -> .in)
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  // Tarjetas con foco de luz + inclinación 3D, y botones magnéticos (solo con mouse)
  useEffect(() => {
    if (reduce() || !fine()) return;
    const undo = [];

    document.querySelectorAll('.card:not(.form)').forEach((card) => {
      const move = (e) => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left, y = e.clientY - r.top;
        card.style.setProperty('--mx', x + 'px');
        card.style.setProperty('--my', y + 'px');
        const rx = ((y / r.height) - 0.5) * -6, ry = ((x / r.width) - 0.5) * 6;
        card.style.transform = 'perspective(800px) translateY(-4px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg)';
      };
      const leave = () => { card.style.transform = ''; };
      card.addEventListener('pointermove', move);
      card.addEventListener('pointerleave', leave);
      undo.push(() => { card.removeEventListener('pointermove', move); card.removeEventListener('pointerleave', leave); });
    });

    document.querySelectorAll('.hero .btn').forEach((b) => {
      const move = (e) => {
        const r = b.getBoundingClientRect();
        b.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * 0.15).toFixed(1) + 'px,' + ((e.clientY - r.top - r.height / 2) * 0.25).toFixed(1) + 'px)';
      };
      const leave = () => { b.style.transform = ''; };
      b.addEventListener('pointermove', move);
      b.addEventListener('pointerleave', leave);
      undo.push(() => { b.removeEventListener('pointermove', move); b.removeEventListener('pointerleave', leave); });
    });

    return () => undo.forEach((fn) => fn());
  }, [pathname]);
}
