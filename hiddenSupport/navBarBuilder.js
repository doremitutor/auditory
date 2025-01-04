export const navBar=(function () {
	function PageSubject(path, label){
		this.path=path;
		this.label=label;
	}
	let welcome=new PageSubject($str("bienvenidos", "welcome"), $str("¡Bienvenidos!", "Welcome!"));
	let project=new PageSubject($str("introduccion/proyecto", "introduction/project"), $str("...el proyecto", "...the project"));
	let music=new PageSubject($str("introduccion/musica", "introduction/music"), $str("...la música", "...the music"));
	let solfege=new PageSubject($str("introduccion/solfeo", "introduction/sight-reading"), $str("...el solfeo", "...sight reading"));
	let player=new PageSubject($str("introduccion/reproductor", "introduction/player"), $str("...el reproductor", "...the player"));
	let notesPitchAndScale=new PageSubject($str("teoria/sonido/nota-tono-escala", "theory/sound/note-pitch-scale"), $str("Nota, tono y escala", "Note, pitch, and scale"));
	let consonance=new PageSubject($str("teoria/sonido/consonancia", "theory/sound/consonance"), $str("Consonancia", "Consonance"));
	let noteNames=new PageSubject($str("teoria/sonido/nombres-de-notas", "theory/sound/names-of-notes"), $str("Nombres de notas", "Names of notes"));
	let octavesAndScales=new PageSubject($str("teoria/sonido/escalas-y-octavas", "theory/sound/scales-and-octaves"), $str("Escalas y octavas", "Scales and octaves"));
	let diatonicScaleAndModes=new PageSubject($str("teoria/sonido/escala-diatonica-y-modos", "theory/sound/diatonic-scale-and-modes"), $str("Escala diatónica y modos", "Diatonic scale and modes"));
	let otherScales=new PageSubject($str("teoria/sonido/otras-escalas-mayores", "theory/sound/other-major-scales"), $str("Otras escalas mayores", "Other major scales"));
	let degreesAndFunctions=new PageSubject($str("teoria/sonido/grados-y-funciones-de-las-notas", "theory/sound/degrees-and-functions-of-notes"), $str("Grados y funciones de las notas", "Degrees and functions of notes"));
	let beats=new PageSubject($str("teoria/tiempo/tiempo-y-metronomo", "theory/time/beat-and-metronome"), $str("El Tiempo y el metrónomo", "Beat and metronome"));
	let measure=new PageSubject($str("teoria/tiempo/compas-y-su-marcado", "theory/time/measure-and-its-marking"), $str("Compás y su marcado", "Measure and its marking"));
	let timeUnitAndRhythm=new PageSubject($str("teoria/tiempo/unidad-de-tiempo-duracion-de-notas-y-ritmo", "theory/time/time-unit-duration-of-notes-and-rhythm"), $str("Unidad de tiempo, duración de notas, ritmo", "Time unit, duration of notes, and rhythm"));
	let staffAndBasicNote=new PageSubject($str("teoria/notacion/pentagrama-y-nota-basica", "theory/notation/staff-and-basic-note"), $str("Pentagrama y nota básica", "Staff and basic note"));
	let extensions=new PageSubject($str("teoria/notacion/extensiones-del-pentagrama", "theory/notation/staff-extensions"), $str("Extensiones del pentagrama", "Staff extensions"));
	let clefsAndNames=new PageSubject($str("teoria/notacion/claves-y-nombres-de-notas", "theory/notation/clefs-and-note-names"), $str("Claves y nombres de notas", "Clefs and note names"));
	let notesAndRests=new PageSubject($str("teoria/notacion/notas-y-silencios", "theory/notation/notes-and-rests"), $str("Símbolos de notas y silencios", "Notes and rests symbols"));
	let timing=new PageSubject($str("teoria/notacion/barras-de-compas-marcas-de-compas-y-metronomo", "theory/notation/barlines-time-signature-metronome-mark"), $str("Barras de compás, marcas de compás y metrónomo", "Bar lines, time signature, and metronome mark"));
	let keySignature=new PageSubject($str("teoria/notacion/armadura", "theory/notation/key-signature"), $str("La armadura", "Key signature"));
	let noteHunterTreble=new PageSubject($str("juegos/cazanotas-clave-sol", "games/notehunter-treble-clef"), $str("Cazanotas en Clave de Sol", "Notehunter in Treble Clef"));
	let noteHunterBass=new PageSubject($str("juegos/cazanotas-clave-fa", "games/notehunter-bass-clef"), $str("Cazanotas en Clave de Fa", "Notehunter in Bass Clef"));
	let history=new PageSubject($str("seguidores/historia", "followers/history"), $str("Breve Historia", "Brief History"));
	let videosVsApps=new PageSubject($str("seguidores/videos-vs-aplicaciones", "followers/videos-vs-applications"), $str("Videos vs. Aplicaciones", "Videos vs. Aplications"));
	const startingLinks=[project, music, solfege, player];
	const soundLinks=[notesPitchAndScale, consonance, noteNames, octavesAndScales, diatonicScaleAndModes, otherScales, degreesAndFunctions];
	const timeLinks=[beats, measure, timeUnitAndRhythm];
	const writingLinks=[staffAndBasicNote, extensions, clefsAndNames, notesAndRests, timing, keySignature];
	const gamesLinks=[noteHunterTreble, noteHunterBass];
	const followersLinks=[history, videosVsApps];//
	function Clef(id, label, pathFragment) {
		this.id = id;
		this.label = label;
		this.pathFragment = pathFragment;
	}
	let clefs = [
		new Clef("treble", $str("Clave de Sol", "Treble Clef"), $str("clave-sol", "treble-clef")),
		new Clef("bass", $str("Clave de Fa", "Bass Clef"), $str("clave-fa", "bass-clef")),
	];
	function Key(id, label){
		this.id = id;
		this.label = label;
	}
	let keys = [
		new Key('c', $str("Do", "C")),
		new Key('g', $str("Sol", "G")),
		new Key('f', $str("Fa", "F")),
		new Key('d', $str("Re", "D")),
		new Key('bb', $str("Si bemol", "B flat")),
		new Key('a', $str("La", "A")),
		new Key('eb', $str("Mi bemol", "E flat"))
	];
	function LessonSubject(id, header) {
		this.id = id;
		this.header = header;
	}
	let subjects = [
		new LessonSubject($str("tonica", "tonic"), $str("Tónica", "Tonic")),
		new LessonSubject($str("supertonica", "supertonic"), $str("Supertónica", "Supertonic")),
		new LessonSubject($str("tonica-superior", "upper-tonic"), $str("Tónica superior", "Upper tonic")) ,
		new LessonSubject($str("sensible", "leading-tone"), $str("Sensible", "Leading tone")),
		new LessonSubject($str("sensible-inferior", "lower-leading"), $str("Sensible inferior", "Lower leading tone")),
		new LessonSubject($str("repaso1", "review1"), $str("Repaso-1", "Review-1")),
		new LessonSubject($str("supertonica-alta", "high-supertonic"), $str("Supertónica alta", "High supertonic")),
		new LessonSubject($str("repaso2", "review2"), $str("Repaso-2", "Review-2")),
		new LessonSubject($str("dominante1", "dominant1"), $str("Dominante-1", "Dominant-1")),
		new LessonSubject($str("dominante2", "dominant2"), $str("Dominante-2", "Dominant-2")),
		new LessonSubject($str("mediante", "mediant"), $str("Mediante", "Mediant")),
		new LessonSubject($str("submediante", "submediant"), $str("Submediante", "Submediant")),
		new LessonSubject($str("subdominante", "subdominant"), $str("Subdominante", "Subdominant")),
		new LessonSubject($str("tetracordo-inferior", "lower-tetrachord"), $str("Tetracordo inferior", "Lower tetrachord")),
		new LessonSubject($str("tetracordo-superior", "upper-tetrachord"), $str("Tetracordo superior", "Upper tetrachord")),
		new LessonSubject($str("tetracordos-ambos", "both-tetrachords"), $str("Ambos tetracordos", "Both tetrachords")) /* */
	];
	function Measure(label, nameFragment) {
		this.label = label;
		this.nameFragment = nameFragment;
	}
	let measures = [null, null,
		new Measure($str("dos por cuatro", "two by four"), $str("-dos-por-cuatro", "-two-by-four")),
		new Measure($str("tres por cuatro", "three by four"), $str("-tres-por-cuatro", "-three-by-four")),
		new Measure($str("cuatro por cuatro", "four by four"), $str("-cuatro-por-cuatro", "-four-by-four"))
	];
	class SectionLi extends HTMLLIElement{
		constructor(){
			super();
			this.className='sectionLi';
			this.sectionDiv=$ce('div');
			this.sectionDiv.className='sectionDiv';
			this.appendChild(this.sectionDiv);
			this.contentsDiv=$ce('div');
			this.contentsDiv.className='contentsDiv';
			this.sectionDiv.appendChild(this.contentsDiv);
			this.setHeader=function(headerText){
				this.header=$ce('h4');
				this.header.className='sectionHeader';
				this.header.textContent=headerText;
				this.sectionDiv.prepend(this.header);
			};
		};
		connectedCallback(){
			const style=$ce('style');
			style.textContent=`@media screen and (min-width:981px){
				#navWrapper #${this.id} div.sectionDiv{			transition:height ${this.transition/3}s ease-in 0.2s, border-bottom-width 0s linear ${this.transition/3}s;}
				#navWrapper #${this.id}:hover div.sectionDiv{	height:${this.heightShown}px;transition:height ${this.transition}s ease-out;}
				#navWrapper #${this.id}{						transition:background-color 0s ${this.transition/3 + 0.2}s;}
				#navWrapper #${this.id}:hover{					transition:background-color 0s;}
				#navWrapper #${this.id} > span{					transition:color 0s ${this.transition/2 + 0.2}s;}
				#navWrapper #${this.id}:hover > span{			transition:color 0s;}}`;
			$('head').append(style);
		};
		attributeChangedCallback(attrName, oldVal, newVal){
			switch(attrName){
				case 'data-sectiontitle':
					const label=$ce('span');
					label.className='sectionTitle';
					label.textContent=newVal;
					this.prepend(label);
					break;
				case 'data-sectionheader':
					this.setHeader(newVal);
					break;
				case 'data-height':
					this.heightShown=newVal;
					this.transition=newVal/300;
					break;
				case 'data-index':
					this.index=`${newVal}`;
					this.id=`sectionLi-${newVal}`;
					const style=$ce('style');
					style.textContent=`@media screen and (max-width:980px){#navWrapper .sectionCheckBox:checked ~ #sectionDiv-${newVal}{display:block;}}`;//height:0px
					$('head').append(style);
					break;
			}
		};
		static get observedAttributes() {return ['data-sectiontitle', 'data-sectionheader', 'data-height', 'data-index'];}
	}
	customElements.define('section-li', SectionLi, {extends:'li'});
	class LinksList extends HTMLUListElement{
		constructor(){
			super();
		};
		connectedCallback(){}
		attributeChangedCallback(attrName, oldVal, newVal){
			switch(attrName){
				case 'data-listheader':
					const header=$ce('h4');
					header.className='listHeader';
					header.textContent=newVal;
					this.prepend(header);
					break;
				case 'data-list':
					const itemsList=JSON.parse(newVal);
					itemsList.forEach(item=>{
						const li=$ce('li');
						li.className='linkLi';
						if(this.classList.contains('subSectionList')){
							li.classList.add('subSectionLi');
						}
						const a=$ce('a');
						a.setAttribute('href', `/${lang}/${item.path}`);
						a.textContent=item.label;
						li.appendChild(a);
						this.appendChild(li);
					});
					break;
			}
		};
		static get observedAttributes() {return ['data-listheader', 'data-list'];}
	}
	customElements.define('links-list', LinksList, {extends:'ul'});
	class KeyPanelDiv extends HTMLDivElement{
		constructor(){
			super();
			this.className='keyPanelDiv';
		};
		connectedCallback(){
			this.span=$ce('span');
			this.span.className='keyHeader';
			this.span.textContent=`${this.key.label} Mayor`;
			this.appendChild(this.span);
			this.subjectsPanel=$ce('div');
			this.subjectsPanel.id=`keyPanelEsTreble-${this.key.id}`;
			this.subjectsPanel.className='subjectsPanelDiv';
			subjects.forEach(subject=>{
				const measuresList=$ce('ul');
				measuresList.className='measureList';
				const header=$ce('h4');
				header.className='subjectHeader';
				header.textContent=subject.header;
				measuresList.appendChild(header);
				for(let i=2; i<5; i++){
					const measure=measures[i];
					const measureLi=$ce('li');
					measureLi.className='measureLi';
					const measureLink=$ce('a');
					measureLink.className='measureLink';
					const href=`/${lang}/${$str('solfeo-basico', 'basic-sight-reading')}/${this.clef.pathFragment}/${this.key.id}/${subject.id}${measure.nameFragment}`;
					measureLink.setAttribute('href', href);
					measureLink.textContent=measure.label;
					measureLi.appendChild(measureLink);
					measuresList.appendChild(measureLi);
				}
				this.subjectsPanel.appendChild(measuresList);
			});
			this.appendChild(this.subjectsPanel);
		}
		attributeChangedCallback(attrName, oldVal, newVal){
			switch(attrName){
				case 'data-clef-index':
					this.clef=clefs[newVal];
					break;
				case 'data-key':
					this.key=JSON.parse(newVal);
					break;
			}
		};
		static get observedAttributes() {return ['data-clef-index', 'data-key'];}
	}
	customElements.define('key-panel-div', KeyPanelDiv, {extends:'div'});
	class MenuArrowLabel extends HTMLLabelElement{
		constructor(){
			super();
			this.checkBox=$ce('input');
			this.checkBox.setAttribute('type', 'checkbox');
			this.checkBox.className='checkBox';
			this.checkBox.style.display="none";
			this.spanClosed=$ce('span');
			this.spanClosed.textContent='>';
			this.appendChild(this.spanClosed);
			this.spanOpen=$ce('span');
			this.spanOpen.textContent='x';
			this.appendChild(this.spanOpen);
		};
		connectedCallback(){
			if(!this.checkBox.isConnected){
				this.before(this.checkBox);
			}
		}
		attributeChangedCallback(attrName, oldVal, newVal){
			switch(attrName){
				case 'data-index':
					this.index=newVal;
					break;
				case 'data-level':
					this.level=newVal;
					this.className=`${this.level}CheckBoxLabel`;
					this.checkBox.id=`${this.level}CheckBox-${this.index}`;
					this.setAttribute('for', this.checkBox.id);
					break;
			}
		};
		static get observedAttributes() {return ['data-index', 'data-level'];};
	}
	customElements.define('menu-arrow-label', MenuArrowLabel, {extends:'label'});

	const startingList=$ce('ul', {is:'links-list'});
	startingList.setAttribute('data-listheader', $str('Ideas básicas', 'Basic ideas'));
	startingList.setAttribute('data-list', `${JSON.stringify(startingLinks)}`);

	const soundList=$ce('ul', {is:'links-list'});
	soundList.className='subSectionList';
	soundList.setAttribute('data-listheader', $str('...el sonido,...', 'Sound'));
	soundList.setAttribute('data-list', JSON.stringify(soundLinks));

	const timeList=$ce('ul', {is:'links-list'});
	timeList.className='subSectionList';
	timeList.setAttribute('data-listheader', $str('...el tiempo,...', 'Time'));
	timeList.setAttribute('data-list', JSON.stringify(timeLinks));

	const writingList=$ce('ul', {is:'links-list'});
	writingList.className='subSectionList';
	writingList.setAttribute('data-listheader', $str('...y la escritura', 'Notation'));
	writingList.setAttribute('data-list', JSON.stringify(writingLinks));

	const gamesList=$ce('ul', {is:'links-list'});
	gamesList.setAttribute('data-listheader', $str('Para aprender descansando', "Let's take a break!"));
	gamesList.setAttribute('data-list', JSON.stringify(gamesLinks));

	const followersList=$ce('ul', {is:'links-list'});
	followersList.setAttribute('data-listheader', $str('Para muy interesados', "To channel's users and interested"));
	followersList.setAttribute('data-list', JSON.stringify(followersLinks));

	const startingLi=$ce('li', {is:'section-li'});
	startingLi.id='startingLi';
	startingLi.className='sectionLi';
	startingLi.setAttribute('data-sectiontitle', $str('Acerca de...', 'About...'));
	startingLi.setAttribute('data-height', '140');
	startingLi.contentsDiv.appendChild(startingList);

	const theoryLi=$ce('li', {is:'section-li'});
	theoryLi.id='theoryLi';
	theoryLi.className='sectionLi';
	theoryLi.setAttribute('data-sectiontitle', $str('La imprescindible teoría', 'The indispensable theory'));
	theoryLi.setAttribute('data-sectionheader', $str('Lo que necesita saber sobre...', 'All you need to know to start reading music'));
	theoryLi.setAttribute('data-height', '210');
	theoryLi.contentsDiv.appendChild(soundList);
	theoryLi.contentsDiv.appendChild(timeList);
	theoryLi.contentsDiv.appendChild(writingList);

	const gamesLi=$ce('li', {is:'section-li'});
	gamesLi.id='gamesLi';
	gamesLi.className='sectionLi';
	gamesLi.setAttribute('data-sectiontitle', $str('Juegos', 'Games'));
	gamesLi.setAttribute('data-height', '70');
	gamesLi.contentsDiv.appendChild(gamesList);

	const solfegeTrebleLi=$ce('li', {is:'section-li'});
	solfegeTrebleLi.id='solfegeTrebleLi';
	solfegeTrebleLi.className='sectionLi';
	solfegeTrebleLi.setAttribute('data-sectiontitle', $str('Solfeo en clave de Sol', 'Sight reading treble clef'));
	solfegeTrebleLi.setAttribute('data-sectionheader', $str('Para la mayoría de instrumentos', "For most instruments"));
	solfegeTrebleLi.setAttribute('data-height', '376');

	const solfegeBassLi=$ce('li', {is:'section-li'});
	solfegeBassLi.id='solfegeBassLi';
	solfegeBassLi.className='sectionLi';
	solfegeBassLi.setAttribute('data-sectiontitle', $str('Solfeo en clave de Fa', 'Sight reading bass clef'));
	solfegeBassLi.setAttribute('data-sectionheader', $str('Para instrumentos de tono grave', "For low pitch instruments"));//
	solfegeBassLi.setAttribute('data-height', '376');

	const  followersLi=$ce('li', {is:'section-li'});
	followersLi.id='followersLi';
	followersLi.className='sectionLi';
	followersLi.setAttribute('data-sectiontitle', $str('Seguidores', 'Followers'));
	followersLi.setAttribute('data-height', '70');
	followersLi.contentsDiv.appendChild(followersList);

	const panelsDivTreble=[];
	const panelsDivBass=[];
	function createSectionsList(){
		const sectionsList=$ce('ul');
		sectionsList.id='sectionsList';
		sectionsList.appendChild(startingLi);
		sectionsList.appendChild(theoryLi);
		sectionsList.appendChild(solfegeTrebleLi);
		keys.forEach(key=>{
			const keyPanel=$ce('div', {is:'key-panel-div'});
			keyPanel.setAttribute('data-clef-index', '0');
			keyPanel.setAttribute('data-key', JSON.stringify(key));
			solfegeTrebleLi.contentsDiv.appendChild(keyPanel);
			panelsDivTreble.push(keyPanel);
		});
		sectionsList.appendChild(solfegeBassLi);
		keys.forEach(key=>{
			const keyPanel=$ce('div', {is:'key-panel-div'});
			keyPanel.setAttribute('data-clef-index', '1');
			keyPanel.setAttribute('data-key', JSON.stringify(key));
			solfegeBassLi.contentsDiv.appendChild(keyPanel);
			panelsDivBass.push(keyPanel);
		});
		sectionsList.appendChild(gamesLi);
		sectionsList.appendChild(followersLi);
		return sectionsList;
	}
	const navWrapper=$ce('nav');
	navWrapper.id='navWrapper';
	$('body').appendChild(navWrapper);
	navWrapper.appendChild(createSectionsList());
	if(window.innerWidth>980){
		let keyIndexTreble=0;
		if(localStorage&&localStorage.getItem('keyIndexTreble')){
			keyIndexTreble=parseInt(localStorage.getItem('keyIndexTreble'));
		}
		let keyIndexBass=0;
		if(localStorage&&localStorage.getItem('keyIndexBass')){
			keyIndexBass=parseInt(localStorage.getItem('keyIndexBass'));
		}
		const clefKeyPanelsNode=[];
		clefKeyPanelsNode.push(panelsDivTreble);
		clefKeyPanelsNode.push(panelsDivBass);
		for(let i=0; i<clefKeyPanelsNode.length; i++){
			const panelsNode=clefKeyPanelsNode[i];
			for(let j=0; j<panelsNode.length; j++){
				const keyPanel=panelsNode[j];
				if((i===0&&j===keyIndexTreble)||(i===1&&j===keyIndexBass)){
					keyPanel.span.className='selected';
					keyPanel.subjectsPanel.style.display='grid';
				}
				keyPanel.addEventListener('mouseenter', ()=>{update(i, panelsNode, keyPanel);}, false);
			}
		}
		function update(clefKeyIndex, panelsNode, panel){
			const panels=Array.from(panelsNode);
			const index=panels.indexOf(panel);
			for(let i=0; i<panels.length; i++){
				const panel=panels[i];
				if(i===index){
					panel.span.className='selected';
					panel.subjectsPanel.style.display='grid';
					if(localStorage){
						if(clefKeyIndex===0){
							localStorage.setItem('keyIndexTreble', index);
						}else{
							localStorage.setItem('keyIndexBass', index);
						}
					}
				}else{
					panel.span.className='';
					panel.subjectsPanel.style.display='none';
				}
			}
		}
		theoryLi.sectionDiv.style.left=`${$str('-163','-131')}px`;
		solfegeTrebleLi.sectionDiv.style.left=`${$str('-422','-398')}px`;
		solfegeBassLi.sectionDiv.style.left=`${$str('-665','-655')}px`;
	}else{
		const checkBox=$ce('input');
		checkBox.id='navCheckBox';
		checkBox.setAttribute('type', 'checkbox');
		checkBox.style.display="none";
		navWrapper.prepend(checkBox);
		const checkBoxLabel=$ce('label');
		checkBoxLabel.id='navCheckBoxLabel';
		checkBoxLabel.setAttribute('for', 'navCheckBox');
		const labelSpan=$ce('span');
		checkBoxLabel.appendChild(labelSpan);
		checkBox.after(checkBoxLabel);
		const figure=$ce('figure');
		figure.id='navFigure';
		const img=$ce('img');
		img.id='navLogo';
		img.setAttribute('src', `/images/nameLessLogo-${lang}-300.png`);
		figure.appendChild(img);
		navWrapper.appendChild(figure);

		const sectionLis=Array.from(document.getElementsByClassName('sectionLi'));
		sectionLis.forEach(li=>{
			const index=sectionLis.indexOf(li);
			const label=$ce('label', {is:'menu-arrow-label'});
			li.setAttribute('data-index', index);
			label.setAttribute('data-index', index);
			label.setAttribute('data-level', 'section');
			li.prepend(label);
		});
		const sectionCheckBoxLabels=Array.from(document.getElementsByClassName('sectionCheckBoxLabel'));
		const sectionCheckBoxes=sectionCheckBoxLabels.map(label=>label.previousSibling);
		sectionCheckBoxes.forEach(box=>{
			const index=sectionCheckBoxes.indexOf(box);
			box.addEventListener('change', (event)=>{uncheckBoxes(event, sectionCheckBoxes, index);}, false);
		});
		const subSectionHeaders=Array.from($all("#sectionLi-1 .listHeader"));
		subSectionHeaders.forEach(header=>{
			const index=subSectionHeaders.indexOf(header);
			const label=$ce('label', {is:'menu-arrow-label'});
			header.setAttribute('data-index', index);
			label.setAttribute('data-index', index);
			label.setAttribute('data-level', 'subSection');
			header.prepend(label);
			header.before(label.checkBox);
		});
		const keyHeaders=Array.from($all("#sectionLi-2 .keyHeader, #sectionLi-3 .keyHeader"));
		keyHeaders.forEach(keyHeader=>{
			const index=keyHeaders.indexOf(keyHeader);
			const label=$ce('label', {is:'menu-arrow-label'});
			keyHeader.setAttribute('data-index', index);
			label.setAttribute('data-index', index);
			label.setAttribute('data-level', 'keyHeader');
			keyHeader.prepend(label);
			keyHeader.before(label.checkBox);
		});
		const trebleKeysCheckBoxes=Array.from($all('#sectionLi-2 .keyPanelDiv > input'));
		trebleKeysCheckBoxes.forEach(box=>{
			const index=trebleKeysCheckBoxes.indexOf(box);
			box.addEventListener('change', (event)=>{uncheckBoxes(event, trebleKeysCheckBoxes, index);}, false);
		});
		const bassKeysCheckBoxes=Array.from($all('#sectionLi-3 .keyPanelDiv > input'));
		bassKeysCheckBoxes.forEach(box=>{
			const index=bassKeysCheckBoxes.indexOf(box);
			box.addEventListener('change', (event)=>{uncheckBoxes(event, bassKeysCheckBoxes, index);}, false);
		});
		function uncheckBoxes(event, boxes, exception){
			if(!event.target.checked)return;
			for(let i=0; i<boxes.length; i++){
				if(i===exception){
					if(boxes[i].parentNode.className==='sectionLi'){
						boxes[i].parentNode.scrollIntoView();
					}
					continue;
				}
				if(boxes[i].checked){
					boxes[i].checked=false;
				}
			}
		}
	}
}());