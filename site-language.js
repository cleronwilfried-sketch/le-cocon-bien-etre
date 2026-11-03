/* Langue commune aux sous-pages du Cocon. Le sélecteur reste sur l'accueil. */
(function () {
  var supported = ['fr', 'en', 'es', 'de', 'it', 'nl', 'ru'];
  function cookieLang() {
    var found = document.cookie.match(/(?:^|;\s*)googtrans=\/fr\/(en|es|de|it|nl|ru)(?:;|$)/);
    return found ? found[1] : null;
  }
  var lang = 'fr';
  try {
    var saved = localStorage.getItem('cocon-lang');
    if (supported.indexOf(saved) !== -1) lang = saved;
    else lang = cookieLang() || 'fr';
  } catch (e) { lang = cookieLang() || 'fr'; }
  document.documentElement.lang = lang;
  var style = document.createElement('style');
  style.textContent = '#google_translate_element,.goog-te-banner-frame,.goog-te-banner-frame.skiptranslate,iframe.goog-te-banner-frame,.goog-te-balloon-frame{position:absolute!important;left:-10000px!important;width:1px!important;height:1px!important;visibility:hidden!important;overflow:hidden!important}html,body{top:0!important;margin-top:0!important}body>.skiptranslate{display:none!important}';
  document.head.appendChild(style);
  function setCookie(value, domain) {
    var c = 'googtrans=' + value + '; path=/; SameSite=Lax';
    if (domain) c += '; domain=' + domain;
    document.cookie = c;
  }
  var value = lang === 'fr' ? '/fr/fr' : '/fr/' + lang;
  setCookie(value);
  if (/^(www\.)?lecocon14\.com$/.test(location.hostname)) {
    setCookie(value, '.lecocon14.com');
  }
  window.googleTranslateElementInit = function () {
    new google.translate.TranslateElement({
      pageLanguage: 'fr',
      includedLanguages: 'en,es,de,it,nl,ru',
      autoDisplay: false
    }, 'google_translate_element');
    if (lang !== 'fr') {
      var tries = 0;
      var interval = setInterval(function () {
        var select = document.querySelector('select.goog-te-combo');
        if (select && select.value !== lang) {
          select.value = lang;
          select.dispatchEvent(new Event('change', {bubbles:true}));
          clearInterval(interval);
        } else if (select && select.value === lang || ++tries >= 30) {
          clearInterval(interval);
        }
      }, 150);
    }
  };
  var s = document.createElement('script');
  s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  s.async = true;
  document.head.appendChild(s);
})();