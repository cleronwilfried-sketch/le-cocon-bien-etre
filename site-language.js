/* Traduction des sous-pages : la langue est pilotée uniquement par l'accueil. */
(function () {
  'use strict';
  var supported = ['fr', 'en', 'es', 'de', 'it', 'nl', 'ru'];
  var lang = 'fr';
  /* La page d'accueil utilise Google Translate. Sa valeur réelle est
     enregistrée dans le cookie googtrans, pas forcément dans cocon-lang.
     Ne jamais faire confiance à cocon-lang : il peut garder une langue périmée. */
  try {
    var match = document.cookie.match(/(?:^|;\\s*)googtrans=([^;]*)/);
    var value = match ? decodeURIComponent(match[1]) : '';
    var target = value.match(/^\\/fr\\/([a-z]{2})$/i);
    if (target && supported.indexOf(target[1].toLowerCase()) !== -1) {
      lang = target[1].toLowerCase();
    }
    sessionStorage.setItem('cocon-lang', lang);
  } catch (e) {}
  document.documentElement.lang = lang;

  /* Masquer toutes les variantes des bandeaux Google, sans toucher à la page. */
  var style = document.createElement('style');
  style.textContent = [
    '#google_translate_element, .goog-te-banner-frame, iframe.goog-te-banner-frame,',
    'iframe.skiptranslate, .goog-te-balloon-frame, #goog-gt-tt,',
    'body > iframe, iframe[id^="goog-te"], .goog-te-banner-frame.skiptranslate,',
    '.skiptranslate.goog-te-banner-frame, .goog-te-spinner-pos,',
    '.VIpgJd-ZVi9od-ORHb-OEVmcd, .VIpgJd-ZVi9od-aZ2wEe-wOHMyf,',
    'body > .skiptranslate, body > .VIpgJd-ZVi9od-ORHb-OEVmcd {',
    'display:none!important;visibility:hidden!important;height:0!important;',
    'width:0!important;max-height:0!important;overflow:hidden!important;}',
    'html,body{top:0!important;margin-top:0!important;}'
  ].join('');
  document.head.appendChild(style);
  /* Google peut injecter son bandeau après le chargement : le retirer aussi à ce moment-là. */
  function hideGoogleBanner() {
    document.querySelectorAll('.goog-te-banner-frame, iframe.skiptranslate, .VIpgJd-ZVi9od-ORHb-OEVmcd').forEach(function (el) {
      if (el.id !== 'google_translate_element') el.style.setProperty('display', 'none', 'important');
    });
    document.documentElement.style.setProperty('top', '0', 'important');
    if (document.body) document.body.style.setProperty('top', '0', 'important');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', hideGoogleBanner);
  else hideGoogleBanner();
  new MutationObserver(hideGoogleBanner).observe(document.documentElement, { childList: true, subtree: true });

  /* Supprimer tout ancien choix Google, à la fois sur le domaine et sur l'hôte. */
  function clearGoogleCookie(domain) {
    var c = 'googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
    if (domain) c += '; domain=' + domain;
    document.cookie = c;
  }
  clearGoogleCookie();
  if (/(^|\.)lecocon14\.com$/.test(location.hostname)) {
    clearGoogleCookie('.lecocon14.com');
    clearGoogleCookie('lecocon14.com');
  }

  /* En français, ne jamais démarrer le traducteur Google : la page originale
     est déjà en français et ne doit pas conserver la traduction précédente. */
  if (lang === 'fr') return;

  var cookie = 'googtrans=/fr/' + lang + '; path=/; SameSite=Lax';
  document.cookie = cookie;
  if (/(^|\.)lecocon14\.com$/.test(location.hostname)) {
    document.cookie = cookie + '; domain=.lecocon14.com';
  }

  window.googleTranslateElementInit = function () {
    if (!window.google || !google.translate) return;
    new google.translate.TranslateElement({
      pageLanguage: 'fr',
      includedLanguages: 'en,es,de,it,nl,ru',
      autoDisplay: false
    }, 'google_translate_element');
    var attempts = 0;
    var timer = setInterval(function () {
      var select = document.querySelector('select.goog-te-combo');
      if (select) {
        if (select.value !== lang) {
          select.value = lang;
          select.dispatchEvent(new Event('change', { bubbles: true }));
        }
        clearInterval(timer);
      } else if (++attempts >= 40) clearInterval(timer);
    }, 150);
  };
  var script = document.createElement('script');
  script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  script.async = true;
  document.head.appendChild(script);
})();
