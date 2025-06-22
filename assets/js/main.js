//Racchiudo la funzione aosInit() in una funzione anonima autoinvocata
(function () {
  // Inizializza la libreria AOS (Animate On Scroll)
  function aosInit() {
    AOS.init({
      duration: 500,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

})();
