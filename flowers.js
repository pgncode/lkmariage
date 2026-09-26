/* ===================================================
   Décorations florales — logique d'injection
   Modifiez uniquement FLORAL_CONFIG ci-dessous pour
   changer les images, sans toucher au reste du site.
   =================================================== */

window.FLORAL_CONFIG = {
  // Chemin vers l'image (PNG fond transparent recommandé)
  left: 'flowers/flower-left.png',
  right: '', // vide : l'image de gauche est réutilisée en miroir à droite

  // true : la bande de droite est l'image de gauche retournée en miroir
  mirrorRight: true,

  // Largeur d'écran (px) en dessous de laquelle les décorations sont masquées
  minWidthPx: 900,

  // Opacité globale des décorations (0 à 1)
  opacity: 0.95
};

(function () {
  function createSlot(className, src, mirror) {
    var el = document.createElement('div');
    el.className = className;
    if (mirror) el.classList.add('floral-mirror');
    el.style.backgroundImage = "url('" + src + "')";
    return el;
  }

  function initFloral() {
    var cfg = window.FLORAL_CONFIG || {};
    if (!cfg.left && !cfg.right) return; // rien à afficher tant que les images ne sont pas fournies

    var body = document.body;

    if (cfg.left) {
      body.appendChild(createSlot('floral-side floral-left', cfg.left, false));
    }
    if (cfg.right || (cfg.mirrorRight && cfg.left)) {
      body.appendChild(createSlot('floral-side floral-right', cfg.right || cfg.left, cfg.mirrorRight && !cfg.right));
    }

    applyResponsiveVisibility();
  }

  function applyResponsiveVisibility() {
    var cfg = window.FLORAL_CONFIG || {};
    var minWidth = cfg.minWidthPx || 900;
    var show = window.innerWidth >= minWidth;
    var els = document.querySelectorAll('.floral-side');
    for (var i = 0; i < els.length; i++) {
      els[i].style.display = show ? '' : 'none';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFloral);
  } else {
    initFloral();
  }

  window.addEventListener('resize', applyResponsiveVisibility);
})();
