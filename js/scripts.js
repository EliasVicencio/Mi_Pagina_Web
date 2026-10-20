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

  // ---- Barra de navegación al hacer scroll ----
  var nav = document.getElementById('nav');
  function onScroll() { nav.classList.toggle('scrolled', window.scrollY > 10); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- Navegación Suave (Interceptar clics) ----
  // Esto evita que el navegador recargue la página al hacer clic en el menú
  document.querySelectorAll('a[href^="/"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      // Si el usuario hace Ctrl+Click o Cmd+Click, dejamos que abra en otra pestaña
      if (e.ctrlKey || e.metaKey || e.shiftKey) return;
      
      e.preventDefault(); // Evita que el navegador vaya a la URL y muestre el 404
      
      var href = this.getAttribute('href'); // ej: "/skills"
      var sectionId = href.replace(/^\//, '') || 'home'; // "skills" o "home"
      var targetSection = document.getElementById(sectionId);
      
      if (targetSection) {
        // Hace el scroll suave a la sección
        targetSection.scrollIntoView({ behavior: 'smooth' });
        
        // Cambia la URL en la barra de direcciones SIN recargar la página
        window.history.pushState({}, '', sectionId === 'home' ? '/' : '/#' + sectionId);
        
        // Actualiza el botón activo del menú
        updateActiveLink(sectionId);
        
        // Cierra el menú móvil si está abierto
        if (links.classList.contains('open')) setMenu(false);
      }
    });
  });

  // ---- Enlace activo según la sección ----
  var navLinks = Array.prototype.slice.call(links.querySelectorAll('a'));
  
  function updateActiveLink(activePath) {
    navLinks.forEach(function (a) {
      var linkPath = a.getAttribute('href').replace(/^\//, '') || 'home';
      a.classList.toggle('active', linkPath === activePath);
    });
  }

  // Detectar qué sección está visible mientras el usuario hace scroll manual
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        
        var sectionId = en.target.id;
        // Actualiza la URL silenciosamente
        if (sectionId !== 'home') {
          window.history.replaceState({}, '', '/' + sectionId);
        } else {
          window.history.replaceState({}, '', '/');
        }
        updateActiveLink(sectionId);
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

  // ---- Carga inicial (Si alguien entra directo a la URL ej: eliasvicencio.cl/skills) ----
  // Usa scrollTo INSTANTÁNEO (no smooth) para evitar el "flash" del inicio de la página.
  function scrollToCurrentPath() {
    var path = window.location.pathname.replace(/^\/|\/$/g, '') || 'home';
    if (path !== 'home') {
      var targetSection = document.getElementById(path);
      if (targetSection) {
        var doScroll = function () {
          // scroll top instantáneo con compensación del nav fijo (scroll-padding-top: 84px)
          var top = targetSection.getBoundingClientRect().top + window.pageYOffset - 84;
          window.scrollTo({ top: top, behavior: 'instant' });
          updateActiveLink(path);
        };
        // UX: doble pasada porque las imágenes/fuentes pueden cambiar el layout al cargar
        doScroll();
        setTimeout(doScroll, 100);
        window.addEventListener('load', doScroll, { once: true });
      }
    }
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scrollToCurrentPath);
  } else {
    scrollToCurrentPath();
  }

  // ---- Correo ----
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

  // ---- Aviso de mensaje enviado ----
  if (/[?&]enviado=1/.test(location.search)) {
    var sent = document.getElementById('sent');
    if (sent) sent.hidden = false;
  }

  // ---- Año del footer ----
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();