
/* =========================================================
   PORTFOLIO · main.js
   1. Idioma (ES / EN)       5. Contadores y aparición al scroll
   2. Tema claro / oscuro    6. Foco de luz y efecto 3D
   3. Reloj de Madrid        7. Cerrar menú en móvil
   4. Cinta de tecnologías
   ========================================================= */
(function () {
  'use strict';
 
  var root = document.documentElement;
  root.classList.add('js'); // activa las animaciones de aparición solo si este script se carga
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 
  /* ---------- 1. Idioma ---------- */
  var TITLES = {
    es: 'Alvaro Martin Jurado · Estudiante de Ingeniería del Software',
    en: 'Alvaro Martin Jurado · Software Engineering student'
  };
 
  function setLang(lang) {
    root.setAttribute('data-lang', lang);
    root.lang = lang;
    document.title = TITLES[lang];
    document.querySelectorAll('[data-set-lang]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', btn.dataset.setLang === lang);
    });
    try { localStorage.setItem('lang', lang); } catch (e) { /* sin almacenamiento */ }
  }
 
  var saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) {}
  var browserLang = (navigator.language || 'es').slice(0, 2) === 'es' ? 'es' : 'en';
  setLang(saved || browserLang);
 
  document.querySelectorAll('[data-set-lang]').forEach(function (btn) {
    btn.addEventListener('click', function () { setLang(btn.dataset.setLang); });
  });
 
  /* ---------- 2. Tema claro / oscuro (usa data-bs-theme de Bootstrap) ---------- */
  var savedTheme = null;
  try { savedTheme = localStorage.getItem('theme'); } catch (e) {}
  if (savedTheme) root.setAttribute('data-bs-theme', savedTheme);
 
  document.getElementById('themeToggle').addEventListener('click', function () {
    var next = root.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-bs-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });
 
  /* ---------- 3. Reloj de Madrid ---------- */
  var clock = document.getElementById('clock');
  function tick() {
    try {
      clock.textContent = new Intl.DateTimeFormat('es-ES', {
        hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Madrid'
      }).format(new Date());
    } catch (e) {}
  }
  tick();
  setInterval(tick, 30000);
 
  /* ---------- 4. Cinta de tecnologías ---------- */
  var techs = ['Java', 'Python', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'SQL', 'Git', 'Docker', 'Linux'];
  var html = '';
  for (var i = 0; i < 2; i++) {            // se duplica para que el bucle sea continuo
    techs.forEach(function (t) { html += '<span>' + t + '</span>'; });
  }
  document.getElementById('marquee').innerHTML = html;
 
  /* ---------- Barra de progreso y línea de tiempo ---------- */
  var progress = document.getElementById('progress');
  var timeline = document.getElementById('timeline');
 
  function onScroll() {
    var max = root.scrollHeight - window.innerHeight;
    progress.style.transform = 'scaleX(' + (max > 0 ? window.scrollY / max : 0) + ')';
    var box = timeline.getBoundingClientRect();
    var p = (window.innerHeight * 0.7 - box.top) / box.height;
    timeline.style.setProperty('--p', Math.max(0, Math.min(1, p)) * 100 + '%');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
 
  /* ---------- 5. Contadores y aparición al hacer scroll ---------- */
  function countUp(el) {
    var target = +el.dataset.count;
    if (reduceMotion) { el.textContent = target; return; }
    var start = performance.now();
    (function frame() {
      var p = Math.min((performance.now() - start) / 1400, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(frame);
    })();
  }
 
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      if (entry.target.dataset.count) countUp(entry.target);
      else entry.target.classList.add('in');
    });
  }, { threshold: 0.2 });
 
  document.querySelectorAll('[data-count]').forEach(function (el) { observer.observe(el); });
  document.querySelectorAll('.reveal').forEach(function (el, i) {
    el.style.transitionDelay = (i % 3) * 90 + 'ms';
    observer.observe(el);
  });
 
  /* ---------- 6. Foco de luz y efecto 3D ---------- */
  document.querySelectorAll('.spot').forEach(function (card) {
    card.addEventListener('pointermove', function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });
 
  if (!reduceMotion) {
    document.querySelectorAll('.tilt').forEach(function (wrap) {
      var screen = wrap.firstElementChild;
      wrap.addEventListener('pointermove', function (e) {
        var r = wrap.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        screen.style.transform = 'rotateY(' + x * 14 + 'deg) rotateX(' + (-y * 14) + 'deg)';
      });
      wrap.addEventListener('pointerleave', function () { screen.style.transform = ''; });
    });
  }
 
  /* ---------- 7. Cerrar el menú al pulsar un enlace (móvil) ---------- */
  var menu = document.getElementById('menu');
  document.querySelectorAll('#navLinks .nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      if (menu.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });
})();
 
