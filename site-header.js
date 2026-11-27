(function(){
'use strict';
const langNames={"fr":["Accueil","Nos soins","Le lieu","Galerie","Carte cadeau","Contact et accès","Réserver sur Planity"],"en":["Home","Treatments","Our space","Gallery","Gift cards","Contact & directions","Book on Planity"],"es":["Inicio","Tratamientos","El lugar","Galería","Bonos regalo","Contacto y acceso","Reservar en Planity"],"de":["Startseite","Behandlungen","Unser Salon","Galerie","Gutscheine","Kontakt & Anfahrt","Auf Planity buchen"],"it":["Home","Trattamenti","Il salone","Galleria","Buoni regalo","Contatti e indicazioni","Prenota su Planity"],"nl":["Home","Behandelingen","De salon","Galerij","Cadeaubonnen","Contact & route","Boek via Planity"],"ru":["Главная","Процедуры","Наш салон","Галерея","Подарочные карты","Контакты и как добраться","Запись на Planity"],"zh":["首页","护理项目","我们的空间","图片展示","礼品卡","联系与交通","通过 Planity 预约"],"ja":["ホーム","施術メニュー","サロンについて","ギャラリー","ギフトカード","お問い合わせ・アクセス","Planityで予約"]};
const headerNames={fr:['HEAD SPA','MODELAGE','MASSAGE','NATUROPATHIE'],en:['HEAD SPA','BODY TREATMENTS','MASSAGE','NATUROPATHY'],es:['HEAD SPA','TRATAMIENTOS','MASAJES','NATUROPATÍA'],de:['HEAD SPA','KÖRPERPFLEGE','MASSAGE','NATURHEILKUNDE'],it:['HEAD SPA','TRATTAMENTI','MASSAGGI','NATUROPATIA'],nl:['HEAD SPA','LICHAAMSZORG','MASSAGE','NATUROPATHIE'],ru:['СПА ДЛЯ ГОЛОВЫ','УХОД ЗА ТЕЛОМ','МАССАЖ','НАТУРОПАТИЯ'],zh:['头皮水疗','身体护理','按摩','自然疗法'],ja:['ヘッドスパ','ボディケア','マッサージ','ナチュロパシー']};
const header=document.querySelector('header.nav');if(!header)return;
const logo=header.querySelector('#brand-logo'),select=header.querySelector('#language'),nav=header.querySelector('#links'),hamb=header.querySelector('#hamb');
if(logo)logo.src='/assets/logo-le-cocon.png';
const companyNames={fr:'Entreprises',en:'Businesses',es:'Empresas',de:'Unternehmen',it:'Aziende',nl:'Bedrijven',ru:'Компаниям',zh:'企业服务',ja:'法人向け'};
const keys=['','soins','experience','galerie','bons-cadeaux','entreprises','contact'];
const planity='https://www.planity.com/le-cocon-head-spa-modelage-14130-pont-leveque';
function readLang(){try{const v=localStorage.getItem('lecocon-lang');return langNames[v]?v:'fr'}catch(e){return 'fr'}}
let lang=readLang();
function paint(){
const words=langNames[lang]||langNames.fr;
nav.innerHTML=keys.map((route,i)=>'<a href="'+(route==='entreprises'?'/massages-en-entreprise.html':'/#/'+route)+'"'+(route==='entreprises'&&document.body.dataset.legacyRoute==='entreprises'?' class="active" aria-current="page"':'')+'>'+(route==='entreprises'?companyNames[lang]:words[i>5?i-1:i])+'</a>').join('')+'<a href="'+planity+'" target="_blank" rel="noopener">'+words[6]+'</a>';
header.querySelectorAll('.header-treatments > span').forEach((item,i)=>{item.textContent=(headerNames[lang]||headerNames.fr)[i]});
select.value=lang;
}
paint();
select.addEventListener('change',function(){lang=this.value;try{localStorage.setItem('lecocon-lang',lang)}catch(e){}paint();if(lang!=='fr'){const id=document.body.getAttribute('data-legacy-route');window.location.assign('/#/'+id);}else{document.documentElement.lang='fr'}});
hamb.addEventListener('click',function(){const expanded=nav.classList.toggle('open');hamb.setAttribute('aria-expanded',String(expanded))});
document.addEventListener('click',function(e){if(!header.contains(e.target)){nav.classList.remove('open');hamb.setAttribute('aria-expanded','false')}});
if(lang!=='fr'){const id=document.body.getAttribute('data-legacy-route');if(id)window.location.replace('/#/'+id)}
})();