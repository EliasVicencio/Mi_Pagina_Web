import { useEffect, useRef } from 'react';

// Red de partículas del hero (antes en effects.js)
export default function NetworkCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cv = ref.current;
    const ctx = cv.getContext('2d');
    const hero = cv.parentNode;
    const root = document.documentElement;
    const mouse = { x: -999, y: -999 };
    let W = 0, H = 0, pts = [], color = '79,140,255', running = true, raf = 0;

    const readColor = () => {
      const c = getComputedStyle(root).getPropertyValue('--accent').trim();
      const m = /^#([0-9a-f]{6})$/i.exec(c);
      if (m) color = [1, 3, 5].map((i) => parseInt(m[1].slice(i - 1, i + 1), 16)).join(',');
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = hero.clientWidth; H = hero.clientHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(80, Math.round((W * H) / 15000));
      pts = [];
      for (let i = 0; i < count; i++) {
        pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35 });
      }
    };

    const frame = () => {
      if (running) {
        ctx.clearRect(0, 0, W, H);
        for (let i = 0; i < pts.length; i++) {
          const p = pts[i];
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > W) p.vx *= -1;
          if (p.y < 0 || p.y > H) p.vy *= -1;
          ctx.fillStyle = `rgba(${color},.7)`;
          ctx.beginPath(); ctx.arc(p.x, p.y, 1.6, 0, 6.283); ctx.fill();
          for (let j = i + 1; j < pts.length; j++) {
            const q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = dx * dx + dy * dy;
            if (d < 16900) {
              ctx.strokeStyle = `rgba(${color},${0.28 * (1 - d / 16900)})`;
              ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
            }
          }
          const mx = p.x - mouse.x, my = p.y - mouse.y, md = mx * mx + my * my;
          if (md < 25000) {
            ctx.strokeStyle = `rgba(${color},${0.55 * (1 - md / 25000)})`;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e) => {
      const r = hero.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = mouse.y = -999; };

    readColor(); resize(); frame();
    window.addEventListener('resize', resize);
    hero.addEventListener('pointermove', onMove);
    hero.addEventListener('pointerleave', onLeave);
    const mo = new MutationObserver(readColor);
    mo.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    const io = 'IntersectionObserver' in window
      ? new IntersectionObserver((es) => { running = es[0].isIntersecting; })
      : null;
    if (io) io.observe(hero);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      hero.removeEventListener('pointermove', onMove);
      hero.removeEventListener('pointerleave', onLeave);
      mo.disconnect();
      if (io) io.disconnect();
    };
  }, []);

  return <canvas id="net" ref={ref} aria-hidden="true" />;
}
