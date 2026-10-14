/* =========================================================
   PORTFOLIO · main.js
   1. Idioma (ES / EN)       5. Contadores y aparición al scroll
   2. Tema claro / oscuro    6. Foco de luz y efecto 3D
   3. Reloj de Madrid        7. Cerrar menú en móvil
   4. Cinta de tecnologías
   ========================================================= */
   (function() {
    'use strict';
     var root = document.documentElement;
     root.classList.add('js');
     var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
     /* ------1.Idioma (ES / EN) ------*/
     var TITLES = {
        es:'Alvaro Martin Jurado · Estudiante de Ingeniería del software',
        en:'Alvaro Martin Jurado · Software Engineering Student'
     };

     function setLang(Lang) {
        root.setAttribute('data-lang', Lang);
        root.lang = Lang;
        document.title = TITLES[Lang];
        docume.queerySelectorAll('[data-set-lang').forEach(function(btn){
         btn.setAttribute('aria-pressed', btn.dataset.setLang === Lang);
     });
     try{localStorage.setItem('lang', Lang);}catch(e){}
    }

    var saved = null;
    try{saved = localStorage.getItem('lang');}catch(e){}
    var browserLang = (navigator.language||'es').slice(0,2) === 'es' ? 'es' : 'en';
    seetLang(saved || browserLang);
    document.querySelectorAll('[data-set-lang]').forEach(function(btn){
    btn.addEventListener('click', function(){
        setLang(btn.dataset.setLang);});
    });

    /*------2.Tema claro / oscuro ------*/
    var savedTheme = null;
    try{savedTheme = localStorage.getItem('theme');}catch(e){}
    if(savedTheme) root.setAttribute('data-theme', savedTheme);

    document.getElementById('theme-toggle').addEventListener('click', function(){
        var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-bs-theme', next);
        try{localStorage.setItem('theme', next);}catch(e){}
    });

    /*------3.Reloj de Madrid ------*/
    var clock = document.getElementById('clock');
    function tick(){
     try{
        clock.textContent = new  Intl.DateTimeFormat(es-Es,{
            hour:'2-digit',
            minute:'2-digit',
            second:'2-digit',   
        }).format(new Date());
     }catch(e){}
    }

    tick();
    setInterval(tick, 30000);

    /*------4.Cinta de tecnologías ------*/
    var techs = ['Java', 'Python', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'SQL', 'Git', 'Docker', 'Linux'];
    var html = '';
    for(var i=0; i< 2; i++){
        techs.forEach(function(t){ html += '<span>' + t + '</span>';});      
    }
    document.getElementById('marquee').innerHTML = html;

    var progress = document.getElementById('progress');
    var timeline = document.getElementById('timeline');

    function onScroll(){
        var max = root.scrollHeight - window.innerHeight;
        progress.style.transform = 'scaleX(' + (window.scrollY / max) + ')';
        var box = timeline.getBoundingClientRect();
        var p =(window.innerHeight*0.7-box.top)/box.height;
        timeline.style.setProperty('--p',Math.max(0, Math.min(1, p))*100+'%');
    }
    window.addEventListener('scroll', onScroll,{passive:true});
    onscroll();

    /*-----5.Contadores y apararicion al hacer scroll------- */
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

    })()