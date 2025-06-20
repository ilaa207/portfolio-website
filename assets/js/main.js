(function() {
  "use strict";
/*seleziono elementi bosdy e id header, header non c'è esco, se la pagina è
 scrollata oltre 100px aggiungo classe scrolled al body altrimenti rimuovo scrolled.
 viene applicata a ogni scroll e al caricamento pella pagina.
 scrolled modifica l’aspetto dell’header o altri elementi in base alla posizione dello scroll.*/
  function toggleScrolled() {
    const selectBody = document.querySelector('body');          
    const selectHeader = document.querySelector('#header');       

    if (!selectHeader.classList.contains('scroll-up-sticky') && 
        !selectHeader.classList.contains('sticky-top') && 
        !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }
  document.addEventListener('scroll', toggleScrolled);           
  window.addEventListener('load', toggleScrolled);                 

  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');  // Seleziona il bottone toggle menu mobile

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');  // Mostra o nasconde il menu mobile
    mobileNavToggleBtn.classList.toggle('bi-list');                       // Cambia icona in "lista" (menu)
    mobileNavToggleBtn.classList.toggle('bi-x');                          // Cambia icona in "x" (chiudi)
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);        // Attiva la funzione al click sul bottone

  // Seleziona tutti i link del menu con id #navmenu
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {                // Se il menu mobile è aperto
        mobileNavToogle();                                               // Chiudi il menu mobile
      }
    });
  });

  // Seleziona tutti gli elementi con classe 'toggle-dropdown' dentro '.navmenu'
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();                                                // Previeni il comportamento di default (es. seguire link)
      this.parentNode.classList.toggle('active');                        // Aggiungi/rimuovi classe 'active' al genitore (li)
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active'); // Mostra/nasconde il dropdown successivo
      e.stopImmediatePropagation();                                      // Ferma la propagazione dell'evento
    });
  });

  const preloader = document.querySelector('#preloader');               // Seleziona il preloader (schermata di caricamento)
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();                                               // Rimuove il preloader quando la pagina è completamente caricata
    });
  }

  let scrollTop = document.querySelector('.scroll-top');                // Seleziona il bottone "scroll to top"

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active'); // Mostra/nasconde bottone in base allo scroll
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();                                                 // Previeni comportamento default (es. link)
    window.scrollTo({                                                   // Scrolla in cima alla pagina in modo fluido
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);                     // Attiva toggleScrollTop al caricamento pagina
  document.addEventListener('scroll', toggleScrollTop);                 // Attiva toggleScrollTop ad ogni scroll

  function aosInit() {
    AOS.init({                                                         // Inizializza la libreria AOS per animazioni allo scroll
      duration: 600,                                                  // Durata animazioni 600ms
      easing: 'ease-in-out',                                          // Tipo di easing
      once: true,                                                    // Animazioni si fanno solo una volta
      mirror: false                                                  // Non si ripetono tornando indietro con lo scroll
    });
  }
  window.addEventListener('load', aosInit);                           // Inizializza AOS al caricamento pagina

  let skillsAnimation = document.querySelectorAll('.skills-animation'); // Seleziona tutti gli elementi con animazione skills

  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,                                                  // Elemento su cui applicare waypoint
      offset: '80%',                                                 // Quando l'elemento è all'80% della viewport
      handler: function() {
        let progressBars = item.querySelectorAll('.progress .progress-bar'); // Seleziona tutte le barre progresso
        progressBars.forEach(bar => {
          bar.style.width = bar.getAttribute('aria-valuenow') + '%';   // Imposta la larghezza della barra al valore aria
        });
      }
    });
  });

  new PureCounter();                                                  // Inizializza i contatori animati PureCounter

  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(swiperElement => { // Per ogni slider con classe .init-swiper
      let config = JSON.parse(swiperElement.querySelector(".swiper-config").innerHTML.trim()); // Legge la config in JSON

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);       // Inizializza slider con tab personalizzato
      } else {
        new Swiper(swiperElement, config);                           // Inizializza slider base
      }
    });
  }
  window.addEventListener("load", initSwiper);                        // Inizializza slider al caricamento pagina

  const glightbox = GLightbox({                                        // Inizializza lightbox per immagini/video
    selector: '.glightbox'
  });

  document.querySelectorAll('.isotope-layout').forEach(isotopeItem => { // Per ogni layout isotope sulla pagina
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';   // Legge il layout o usa default 'masonry'
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*'; // Filtro di default
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';// Ordinamento di default

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), () => { // Attende che le immagini siano caricate
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',                               // Selettore item
        layoutMode: layout,                                          // Layout scelto
        filter: filter,                                              // Filtro scelto
        sortBy: sort                                                // Ordinamento scelto
      });
    });

    // Gestione click sui filtri isotope
    isotopeItem.querySelectorAll('.isotope-filters li').forEach(filters => {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active'); // Rimuove classe active dal filtro precedente
        this.classList.add('filter-active');                           // Aggiunge classe active al filtro cliccato
        initIsotope.arrange({ filter: this.getAttribute('data-filter') }); // Applica il filtro
        if (typeof aosInit === 'function') aosInit();                // Ri-inizializza animazioni AOS
      });
    });

  });

})();
