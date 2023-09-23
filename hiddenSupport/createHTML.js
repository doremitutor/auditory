const darkColor='rgb(58, 43, 28)', bgColor='rgb(250, 230, 209)', lightColor='rgb(255, 204, 153)';//
let lang, altLang, body, main;
function $(id){return document.getElementById(id);};
function $sel(sel){return document.querySelector(sel);}
function $all(sel){return document.querySelectorAll(sel);}
function $ce(tag, prop){return document.createElement(tag, prop);};
function $txtNode(txt){return document.createTextNode(txt);};
function $str(str_es, str_en){return lang==='es'?str_es:str_en};
const $cl=console.log;
window.addEventListener('load', setUpHTML, false);
function setUpHTML(){
    lang=$('html').lang.slice(0, 2);
    altLang=$str('en', 'es');
    const head=$('head');
    const manifestLink=`\t<link rel="manifest" href="/${lang}/${lang}.webmanifest">`;
    head.innerHTML+=manifestLink;
    body=$('html').children[1];
    createMain();
    createSectionsMenuWrapper();
    if(PAGE_TYPE==='home'){
        createHero();
    }else{
        if(PAGE_TYPE!=='introduction'){
            createSectionContentWrapper();
        }
        createFastNav();
        createPayPal();
    }
    createAdditionalReadingsWrapper();
    createPicturePanel();
    createLogoAndLangWrapper();
    createFooter();
    createOrientationHint();
    const article=$ce('article');
    article.id='article';
    main.append(article);
    if(PAGE_TYPE==='lesson'){
        import('/scripts/logicSupport/score/scorePlayer.js')
		    .catch(err=>{console.log('Error: ', err.message);});
    }else{
        import(ARTICLE)
        .then(m=>{article.innerHTML=m['article_'+lang];})
        .catch(err=>{console.log('Error: '+err.message);});
    }
    scrollIntoView();
    const registerServiceWorker = async () => {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register(
                    `/sw.js`,//${lang}/${lang}_
                    {
                    scope: `/${lang}/`,
                    }
                );
            } catch (error) {
                console.error('Registration failed with', error);
            }
        }
    };
    registerServiceWorker();
};
function createMain(){
    main=$ce('main');
    const header=$ce('header');
    header.id='header';
    main.append(header);
    header.innerHTML=`<h1>${HEADER}</h1>`;
    if(PAGE_TYPE!=='home'){
    }
    if(PAGE_TYPE==='general'||PAGE_TYPE==='introduction'){
        const subheader=$ce('p');
        subheader.textContent=`${SUBHEADER}`;
        header.append(subheader);
    }
    body.append(main);
};
function createSectionsMenuWrapper(){
    const sectionsMenuWrapper=$ce('nav');
    sectionsMenuWrapper.id='sectionsMenuWrapper';
    sectionsMenuWrapper.className='corner-hard';
    sectionsMenuWrapper.innerHTML=`
        <menu role="navigation">
            <li class="corner-hard"><a href="${$str('/es/teoria/sonido/nota-tono-escala', '/en/theory/sound/note-pitch-scale')}">${$str('Sonido', 'Sound')}</a></li>
            <li class="corner-hard"><a href="${$str('/es/teoria/tiempo/tiempo-y-metronomo', '/en/theory/time/beat-and-metronome')}">${$str('Tiempo', 'Time')}</a></li>
            <li class="corner-hard"><a href="${$str('/es/teoria/notacion/pentagrama-y-nota-basica', '/en/theory/notation/staff-and-basic-note')}">${$str('Notación', 'Notation')}</a></li>
            <li class="corner-hard"><a href="${$str('/es/juegos/cazanotas/cazanotas-clave-sol', '/en/games/notehunter/notehunter-treble-clef')}">${$str('Cazanotas (Juego)', 'Notehunter (Game)')}</a></li>
            <li class="corner-hard"><a href="${$str('/es/solfeo-basico/clave-sol/c/tonica-dos-por-cuatro', '/en/basic-sight-singing/treble-clef/c/tonic-two-by-four')}">${$str('Solfeo en Clave de Sol', 'Sight&nbsp;Singing, Treble&nbsp;Clef')}</a></li>
            <li class="corner-hard"><a href="${$str('/es/solfeo-basico/clave-fa/c/tonica-dos-por-cuatro', '/en/basic-sight-singing/bass-clef/c/tonic-two-by-four')}">${$str('Solfeo en Clave de Fa', 'Sight&nbsp;Singing, Bass&nbsp;Clef')}</a></li>
        </menu>`;
    body.append(sectionsMenuWrapper);
};
function createLogoAndLangWrapper(){
    const logoAndLangWrapper=$ce('header');
    logoAndLangWrapper.id='logoAndLangWrapper';
    logoAndLangWrapper.setAttribute('role', 'banner');
    const logoFigure=$ce('figure');
    const logoLink=$ce('a');
    logoLink.setAttribute('href', $str('/es/bienvenidos', '/en/welcome'));
    //logoLink.setAttribute('target', '_blank');
    logoFigure.append(logoLink);
    const logoImg=$ce('img');
    logoImg.setAttribute('src', `/images/nameLessLogo-${lang}-300.png`);
    logoImg.setAttribute('alt', 'Logo');
    logoImg.setAttribute('width', '400');
    logoImg.setAttribute('height', '72');
    logoLink.append(logoImg);
    const leaderBoard=$ce('div');
    leaderBoard.id='leaderBoard';
    const langLink=$ce('a');
    langLink.id='langLink';
    langLink.className='button-like corner-hard';
    langLink.setAttribute('href', `${MIRROR_PAGE}`);
    langLink.innerText=$str('English', 'Español');
    langLink.addEventListener('click', goToMirror, true);
    logoAndLangWrapper.append(logoFigure, leaderBoard, langLink);
    function goToMirror(e){
        try{
            localStorage.setItem('lang', altLang);
        }catch{
            alert($str('Su dispositivo no puede\ncambiar idioma', 'Your device cannot\nchange language'));
        }
    };
    body.append(logoAndLangWrapper);
};
function createHero(){
    const heroImage=$ce('img');
    heroImage.id='heroImage';
    body.append(heroImage);
    const heroText=$ce('div');
    heroText.id='heroText_'+lang;
    const callToAction=$ce('menu');
    callToAction.id='callToAction_'+lang;
    const heroContent=$ce('header');
    heroContent.id='heroContent';
    heroContent.append(heroText, callToAction);
    body.append(heroContent);
}
function createSectionContentWrapper(){
    const sectionContentWrapper=$ce('aside');
    sectionContentWrapper.id='sectionContentWrapper';
    sectionContentWrapper.setAttribute('aria-labelledby', 'inThisSection');
    sectionContentWrapper.classList.add('corner-hard');
    body.append(sectionContentWrapper);
};
function createAdditionalReadingsWrapper(){
    const additionalReadingsWrapper=$ce('aside');
    additionalReadingsWrapper.id='additionalReadingsWrapper';
    additionalReadingsWrapper.className='corner-hard';
    additionalReadingsWrapper.setAttribute('aria-labelledby', 'additionalReadings');
    additionalReadingsWrapper.innerHTML=`
    <h3 id='additionalReadings'>${$str('Introducciones', 'Introductions')}</h3>
    <menu role="navigation">
    <li><a href="${$str('/es/propuesta', '/en/proposal')}">${$str('Proyecto', 'Project')}</a></li>
    <li><a href="${$str('/es/musica', '/en/music')}">${$str('Música', 'Music')}</a></li>
    <li><a href="${$str('/es/notacion', '/en/notation')}">${$str('Notación', 'Notation')}</a></li>
    <li><a href="${$str('/es/solfeo', '/en/sight-singing')}">${$str('Solfeo', 'Sight Singing')}</a></li>
    <li><a href="${$str('/es/tension-tonal', '/en/tonal-tension')}">${$str('Tensión Tonal', 'Tonal Tension')}</a></li>
    <li><a href="${$str('/es/reproductor', '/en/player')}">${$str('Reproductor', 'Player')}</a></li>
    </menu>`;
    body.append(additionalReadingsWrapper);
};
function createPicturePanel(){
    picturePanel=$ce('aside');
    picturePanel.id='picturePanel';
    picturePanel.className='corner-hard';
    const photoWedge=$ce('div');
    const h3=$ce('h3');
    h3.textContent='Jesús Díaz Rodríguez';
    const p=$ce('p');
    p.innerHTML=$str(
        `Apasionado de la música convencido de que compartir ideas es la mejor manera de aprender, lo que lo convirtió en desarrollador autodidacta para hacerlo desde este sitio, así como mediante algunas series de videos educativos en este <a href="https://youtube.com/doremitutor" target="_blank"><strong>canal de YouTube</strong></a>.`,
        `Passionate about music and convinced that sharing ideas is the best way to learn, what made him enthusiast self-taught  developer to do it from this site as well as a number of educational videos at this <a href="https://youtube.com/user/doremitutor" target="_blank"><strong>YouTube channel</strong></a>.`);
    /* picturePanel.innerHTML=`<h3>Jesús Díaz Rodríguez</h3><p>`+$str(
        `Apasionado de la música convencido de que compartir ideas es la mejor manera de aprender, lo que lo convirtió en desarrollador autodidacta para hacerlo en este sitio, así como mediante algunas series de videos educativos en este <a href="https://youtube.com/doremitutor" target="_blank"><strong>canal de YouTube</strong></a>.`,
        `Passionate about music and convinced that sharing ideas is the best way to learn, what made him enthusiast self-taught  developer to do it from this site as well as a number of educational videos at this <a href="https://youtube.com/user/doremitutor" target="_blank"><strong>YouTube channel</strong></a>.`)+`</p>`; */
    /* const h1=$ce('h1');
    h1.id='h1';
    h1.textContent='Picture Panel';
    picturePanel.append(h1); */
    picturePanel.append(photoWedge);
    picturePanel.append(h3);
    picturePanel.append(p);
    body.append(picturePanel);
};
function createPayPal(){
    const payPal=$ce('aside');
    payPal.id='payPal';
    payPal.innerHTML=`<hr>
        <h3>${$str('¡Hey!, el tutor está trabajando bastante duro para traernos esto', 'Hey!, the tutor is working pretty hard to bring us this')}</h3>
        <p>${$str('¿Por qué no invitarle una taza de café de vez en cuando para mantenerlo despierto concentrado trabajando en el proyecto y contribuir a mantener este sitio <strong>gratuito</strong> para todos?', 'Why not buy him a cup of coffee once in a while to keep him awake focused working on the project and contribute to keep this site <strong>free</strong> for all?')}</p>
        <form action="https://www.paypal.com/donate" method="post" target="_blank">
            <input type="hidden" name="business" value="M682TYGAJHQKG" />
            <input type="hidden" name="no_recurring" value="0" />
            <input type="hidden" name="item_name" value="${$str('El proyecto agradece su donativo', 'The project appreciates your donation')}" />
            <input type="hidden" name="currency_code" value="MXN" />
            <input type="image" src="https://www.paypalobjects.com/${$str('es', 'en')}_${$str('XC', 'US')}/MX/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - ${$str('¡La forma más segura y fácil de pagar en línea!', 'The safer, easier way to pay online!')}" alt="${$str('Donar con el botón PayPal', 'Donate with PayPal button')}" />
            <!--<img alt="" border="0" src="https://www.paypal.com/${$str('es', 'en')}_MX/i/scr/pixel.gif" width="1" height="1" />-->
        </form>`;
    body.append(payPal);
};
function createFastNav(){
    fastNav=$ce('aside');
    fastNav.id=('fastNav');
    fastNav.setAttribute('role', 'navigation');
    fastNav.innerHTML=`
        <a href="${PREVIOUS}" rel="prev"><< ${$str('Anterior', 'Previous')}</a>
        <a href="${NEXT}" rel="next">${$str('Siguiente', 'Next')} >></a>`;
    body.append(fastNav);
};
function createFooter(){
    const footer=$ce('footer');
    footer.innerHTML=`<p>${$str('Derechos Reservados', 'All Rights Reserved')} © 2023 Jesús Díaz Rodríguez.<br>
    ${$str('Requisitos', 'Requirements')}: HTML5, JavaScript, ${$str('Almacenamiento local habilitado', 'Local storage enabled')}, ${$str('Android actualizado', 'Android up to date')}.</p>`;
    body.append(footer);
};
function createOrientationHint(){
    const orientationHint=$ce('p');
    orientationHint.id='orientationHint';
    orientationHint.innerHTML=`${$str('Visto mejor horizontalmente', 'Better seen in landscape mode')}`;
    body.append(orientationHint);
};
function scrollIntoView(){
	if(location.hash&&$(location.hash.slice(1))){
		$(location.hash.slice(1)).scrollIntoView(true);
	}
};
function appendSVGNode(node, svg){
   const e=$ce('div');
   e.innerHTML=svg;
   node.append(e.firstChild);
};
function insertSVGNode(node, svg, before=true){
	const div=$ce('div');
	div.innerHTML=svg;
	if(before){
		node.before(div.firstChild);
	}else{
		node.after(div.firstChild);
	}
}
/* function randomNotification() {
    const notifTitle = "Title";
    const options = {
        body: "BODY",
        icon: "/images/logoBanner-en.png",
    };
    new Notification(notifTitle, options);
    //setTimeout(randomNotification, 3000);
    $cl('SELF_NOTIFIED');
};
Notification.requestPermission().then((result) => {
    if (result === 'granted') {
        $cl('GRANTED');
        randomNotification();
    }
}); */