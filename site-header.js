(function(){
'use strict';
const langNames={fr:['Accueil','Nos soins','Le lieu','Galerie','Bons cadeaux','Contact','Réserver'],en:['Home','Treatments','The salon','Gallery','Gift vouchers','Contact','Book'],es:['Inicio','Tratamientos','El salón','Galería','Tarjetas regalo','Contacto','Reservar'],de:['Startseite','Behandlungen','Der Salon','Galerie','Gutscheine','Kontakt','Buchen'],it:['Home','Trattamenti','Il salone','Galleria','Buoni regalo','Contatti','Prenota'],nl:['Home','Behandelingen','De salon','Galerij','Cadeaubonnen','Contact','Boeken'],ru:['Главная','Процедуры','Салон','Галерея','Подарочные сертификаты','Контакты','Записаться'],zh:['首页','护理项目','沙龙环境','相册','礼品卡','联系方式','预约'],ja:['ホーム','メニュー','サロン','ギャラリー','ギフトカード','お問い合わせ','予約']};
const headerNames={fr:['HEAD SPA','MODELAGE','MASSAGE','NATUROPATHIE'],en:['HEAD SPA','BODY TREATMENTS','MASSAGE','NATUROPATHY'],es:['HEAD SPA','TRATAMIENTOS','MASAJES','NATUROPATÍA'],de:['HEAD SPA','KÖRPERPFLEGE','MASSAGE','NATURHEILKUNDE'],it:['HEAD SPA','TRATTAMENTI','MASSAGGI','NATUROPATIA'],nl:['HEAD SPA','LICHAAMSZORG','MASSAGE','NATUROPATHIE'],ru:['СПА ДЛЯ ГОЛОВЫ','УХОД ЗА ТЕЛОМ','МАССАЖ','НАТУРОПАТИЯ'],zh:['头皮水疗','身体护理','按摩','自然疗法'],ja:['ヘッドスパ','ボディケア','マッサージ','ナチュロパシー']};
const header=document.querySelector('header.nav');if(!header)return;
const logo=header.querySelector('#brand-logo'),select=header.querySelector('#language'),nav=header.querySelector('#links'),hamb=header.querySelector('#hamb');
if(logo)logo.src='/assets/logo-le-cocon.png';
const keys=['','soins','experience','galerie','bons-cadeaux','contact'];
const planity='https://www.planity.com/le-cocon-head-spa-modelage-14130-pont-leveque';
function readLang(){try{const v=localStorage.getItem('lecocon-lang');return langNames[v]?v:'fr'}catch(e){return 'fr'}}
let lang=readLang();
function paint(){
const words=langNames[lang]||langNames.fr;
nav.innerHTML=keys.map((route,i)=>'<a href="/#/'+route+'">'+words[i]+'</a>').join('')+'<a href="'+planity+'" target="_blank" rel="noopener">'+words[6]+' ↗</a>';
header.querySelectorAll('.header-treatments > span').forEach((item,i)=>{item.textContent=(headerNames[lang]||headerNames.fr)[i]});
select.value=lang;
}
paint();
select.addEventListener('change',function(){lang=this.value;try{localStorage.setItem('lecocon-lang',lang)}catch(e){}paint();if(lang!=='fr'){const id=document.body.getAttribute('data-legacy-route');window.location.assign('/#/'+id);}else{document.documentElement.lang='fr'}});
hamb.addEventListener('click',function(){const expanded=nav.classList.toggle('open');hamb.setAttribute('aria-expanded',String(expanded))});
document.addEventListener('click',function(e){if(!header.contains(e.target)){nav.classList.remove('open');hamb.setAttribute('aria-expanded','false')}});
if(lang!=='fr'){const id=document.body.getAttribute('data-legacy-route');if(id)window.location.replace('/#/'+id)}
})();