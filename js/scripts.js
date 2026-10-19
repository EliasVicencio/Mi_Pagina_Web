(function () {
  'use strict';
  var root = document.documentElement;

  // ---- Tema claro/oscuro ----
  var toggle = document.getElementById('theme-toggle');
  function isDark() {
    var t = root.getAttribute('data-theme');
    if (t) return t === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  toggle.addEventListener('click', function () {
    var next = isDark() ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // ---- Menú móvil ----
  var menuBtn = document.getElementById('menu-btn');
  var links = document.getElementById('links');
  function setMenu(open) {
    links.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  }
  menuBtn.addEventListener('click', function () {
    setMenu(!links.classList.contains('open'));
  });
  links.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') setMenu(false);
  });

  // ---- Barra de navegación al hacer scroll ----
  var nav = document.getElementById('nav');
  function onScroll() { nav.classList.toggle('scrolled', window.scrollY > 10); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- Navegación limpia (URLs sin #) ----
  // Función para obtener la ruta actual (ej: "contact" o "home")
  function getCurrentPath() {
    var path = window.location.pathname.replace(/^\/|\/$/g, '');
    return path || 'home';
  }

  // Interceptar clics en enlaces internos
  document.querySelectorAll('a[href^="/"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      // Ignorar si se abre en otra pestaña (ctrl+click, etc)
      if (e.ctrlKey || e.metaKey || e.shiftKey) return;
      
      e.preventDefault();
      var href = this.getAttribute('href'); // ej: "/contact"
      var sectionId = href.replace(/^\//, '') || 'home'; // "contact" o "home"
      var targetSection = document.getElementById(sectionId) || document.getElementById('home');
      
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
        // Cambiar la URL en la barra de direcciones sin recargar
        window.history.pushState({}, '', href);
      }
    });
  });

  // Manejar el botón "Atrás" del navegador
  window.addEventListener('popstate', function () {
    var path = getCurrentPath();
    var targetSection = document.getElementById(path) || document.getElementById('home');
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Al cargar la página directamente en una ruta (ej: /contact), hacer scroll
  window.addEventListener('DOMContentLoaded', function () {
    var path = getCurrentPath();
    if (path !== 'home') {
      var targetSection = document.getElementById(path);
      if (targetSection) {
        // Pequeño retraso para asegurar que los estilos se hayan aplicado
        setTimeout(function() {
          targetSection.scrollIntoView({ behavior: 'auto' });
        }, 10);
      }
    }
  });

  // ---- Enlace activo según la sección visible (Scroll Spy) ----
  var navLinks = Array.prototype.slice.call(links.querySelectorAll('a'));
  
  // Actualizar el enlace activo basado en la ruta actual
  function updateActiveLink() {
    var currentPath = window.location.pathname.replace(/^\/|\/$/g, '') || 'home';
    navLinks.forEach(function (a) {
      var linkPath = a.getAttribute('href').replace(/^\//, '') || 'home';
      a.classList.toggle('active', linkPath === currentPath);
    });
  }
  updateActiveLink();

  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        
        // Actualizar la URL silenciosamente si el usuario hace scroll manual
        var sectionId = en.target.id;
        if (sectionId !== 'home') {
          window.history.replaceState({}, '', '/' + sectionId);
        } else {
          window.history.replaceState({}, '', '/');
        }
        updateActiveLink();
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    
    document.querySelectorAll('main section[id]').forEach(function (s) { spy.observe(s); });

    // ---- Animación de aparición ----
    var reveal = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); reveal.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) { reveal.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  // ---- Correo: se arma con JS para que los robots no lo lean del HTML ----
  var slot = document.getElementById('mail-slot');
  if (slot) {
    var addr = slot.dataset.u + '@' + slot.dataset.d;
    slot.textContent = '';
    var a = document.createElement('a');
    a.href = 'mailto:' + addr;
    a.textContent = addr;
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'copy';
    b.textContent = 'Copiar';
    b.addEventListener('click', function () {
      if (!navigator.clipboard) return;
      navigator.clipboard.writeText(addr).then(function () {
        b.textContent = '¡Copiado!';
        setTimeout(function () { b.textContent = 'Copiar'; }, 1800);
      });
    });
    slot.appendChild(a);
    slot.appendChild(b);
  }

  // ---- Aviso de mensaje enviado (Formspree redirige con ?enviado=1) ----
  if (/[?&]enviado=1/.test(location.search)) {
    var sent = document.getElementById('sent');
    if (sent) sent.hidden = false;
  }

  // ---- Año del footer ----
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();