import { useEffect, useRef, useState } from 'react';

// Contador animado (antes data-count en effects.js)
export default function CountUp({ end }) {
  const ref = useRef(null);
  const [value, setValue] = useState(end);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;
    let raf = 0;
    const io = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      const start = performance.now(), dur = 1200;
      const step = (now) => {
        const p = Math.min((now - start) / dur, 1);
        setValue(Math.round(end * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      setValue(0);
      raf = requestAnimationFrame(step);
    }, { threshold: 0.6 });
    io.observe(ref.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [end]);

  return <strong ref={ref}>{value}</strong>;
}
