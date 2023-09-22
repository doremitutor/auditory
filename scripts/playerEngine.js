const ctx=scorePlayer.ctx;
const lesson=scorePlayer.lesson;
const sound=scorePlayer.sound;
const classes=scorePlayer.classes;
const paths=scorePlayer.paths;
const enums=scorePlayer.enums;
const engine={};
let ac;
const getAc=function(){
	if(ac){
		return ac;
	}else{
		const AudioContext=window.AudioContext||window.webkitAudioContext||window.mozAudioContext||window.oAudioContext;
		if(AudioContext){
			return ac=new AudioContext({latencyHint: "interactive", sampleRate: 44100});
		}else{
			alert('No AudioContext'); //do something, maybe location change
		}
	}
};
engine.getAc=getAc;
/********** BUTTONS **********/
const buttonLabel={};
buttonLabel.start=lang==='en'?'Start':'Iniciar';
buttonLabel.stop=lang==='en'?'Stop':'Detener';
buttonLabel.resume=lang==='en'?'Restart at\ncurrent bar':'Reanudar en\n compás actual';
buttonLabel.repeat=lang==='en'?'Repeat\nlast start':'Repetir\núltimo arranque';
buttonLabel.rewind=lang==='en'?'Full\nrewind':'Regresar\nal inicio';
buttonLabel.tune=lang==='en'?'Tonic pitch for\ntunning (2 sec)':'Tónica para\nentonación (2 seg)';
const buttonRw=$('rw');
buttonRw.setAttribute('disabled', '');
buttonRw.innerText=buttonLabel.rewind;
buttonRw.addEventListener('click', rewind, false);
const buttonReplay=$('replay');
buttonReplay.setAttribute('disabled', '');
buttonReplay.innerText=buttonLabel.repeat;//
buttonReplay.addEventListener('click', restart, false);
const buttonPlayPause=$('play');
buttonPlayPause.innerText=buttonLabel.start;
buttonPlayPause.addEventListener('click', start, false);
const buttonTune=$('tune')
buttonTune.innerText=buttonLabel.tune;
buttonTune.addEventListener('click', tune, false);
/********** SLIDERS **********/
const tempoSlider=$('tempo');
const tempoValueLabel=$('tempoValueLabel');
const tempoStep=5, tempoDev=40;
let tempo=lesson.specs.tempo;
tempoSlider.value=tempo;
tempoSlider.min=tempo-tempoDev;
tempoSlider.max=tempo-(-tempoDev);
tempoSlider.step=tempoStep;
tempoValueLabel.textContent=tempoSlider.value;
tempoSlider.addEventListener('change', function(){
	tempo=tempoValueLabel.textContent=tempoSlider.value;
	updateMetronomeMarkValue(tempo, true);
}, false);
/********** METRONOME MARK **********/
const metronomeMarkX=25, metronomeMarkY=36;
ctx.beginPath();
ctx.ellipse(metronomeMarkX+4, metronomeMarkY, 8.25*0.8, 5.75*0.8, -Math.PI/180*27.5, 0, Math.PI*2, true);
ctx.fill();
ctx.beginPath();
ctx.moveTo(metronomeMarkX+10, metronomeMarkY);
ctx.lineTo(metronomeMarkX+10, metronomeMarkY-25);
ctx.stroke();
updateMetronomeMarkValue(tempo, false);
function updateMetronomeMarkValue(tempo, clear){
	if(clear){ctx.clearRect(metronomeMarkX+12.5, metronomeMarkY-22.5, 60, 26);}
	paths.tempFont('bold 26px "Roboto Flex"');
	ctx.fillText('='+tempo, metronomeMarkX+14, metronomeMarkY-2);
	paths.tempFont();
};
const metroSlider=$('metroVol');
const metroVolValueLabel=$('metroVolValueLabel');
if(localStorage.getItem('metroVol')){
	metroSlider.value=localStorage.getItem('metroVol');
}else{
	metroSlider.value=0;
}
const metroDev=5, metroStep=1, beepGainValueBase=0.02;
let beepGainValue=beepGainValueBase;
metroSlider.min=-metroDev;
metroSlider.max=metroDev;
metroSlider.step=metroStep;
metroVolValueLabel.textContent=metroSlider.value;
metroSlider.addEventListener('change', function(){
	let metroVol=metroVolValueLabel.textContent=metroSlider.value;
	beepGainValue=beepGainValueBase+beepGainValueBase*metroVol*(metroVol>0?2:1)/10;
	if(metroVol==='0'){
		if(localStorage.getItem('metroVol')!==null){
			localStorage.removeItem('metroVol');
		}
	}else{
		localStorage.setItem('metroVol', metroVol);
	}
}, false);
/********** CHECKBOXES **********/
const cursorCheckBox=$('cursor');
let cursorVisible;
if(localStorage.getItem('hideCursor')){
	cursorVisible=false;
}else{
	cursorVisible=true;
	cursorCheckBox.setAttribute('checked', '');
}
cursorCheckBox.addEventListener('change', function(e){
	if(e.target.checked){
		cursorVisible=e.target.checked;
		cursor(e.target.checked);
	}else{
		cursor(e.target.checked);
		cursorVisible=e.target.checked;
	}
	if(cursorVisible){
		if(localStorage.getItem('hideCursor')){
			localStorage.removeItem('hideCursor');
		}
	}else{
		localStorage.setItem('hideCursor', 'hideCursor');
	}
}, false);
const namesCheckBox=$('names');
let namesVisible;
if(localStorage.getItem('hideNames')){
	namesVisible=false;
}else{
	namesVisible=true;
	namesCheckBox.setAttribute('checked', '');
}
namesCheckBox.addEventListener('change', function(e){
	showNames(namesVisible=e.target.checked);
	if(namesVisible){
		if(localStorage.getItem('hideNames')){
			localStorage.removeItem('hideNames');
		}
	}else{
		localStorage.setItem('hideNames', 'hideNames');
	}
}, false);
const metroCheckBox=$('metro');
const markingCheckBox=$('marking');
let metronomeOn;
if(localStorage.getItem('metronomeOff')){
	metronomeOn=false;
	markingCheckBox.setAttribute('disabled', '');
}else{
	metronomeOn=true;
	metroCheckBox.setAttribute('checked', '');
}
metroCheckBox.addEventListener('change', function(e){
	if((metronomeOn=e.target.checked)&&markingCheckBox.disabled){
		markingCheckBox.removeAttribute('disabled');
	}else if(!(metronomeOn=e.target.checked)&&!markingCheckBox.disabled){
		markingCheckBox.setAttribute('disabled', '');
	}
	if(metronomeOn){
		if(localStorage.getItem('metronomeOff')){
			localStorage.removeItem('metronomeOff');
		}
	}else{
		localStorage.setItem('metronomeOff', 'metronomeOff');
	}
}, false);
let markStart;
if(localStorage.getItem('markingOff')){
	markStart=false;
}else{
	markStart=true;
	markingCheckBox.setAttribute('checked', '');
}
markingCheckBox.addEventListener('change', function(e){
	markStart=e.target.checked;
	if(markStart){
		if(localStorage.getItem('markingOff')){
			localStorage.removeItem('markingOff');
		}
	}else{
		localStorage.setItem('markingOff', 'markingOff');
	}
}, false);
/********** LESSON NAME **********/
const font=new FontFace("font", "url(/css/roboto-flex/slnt-100-1000.woff2)", {
	style: "normal",
	weight: "500",
    stretch: "25%",
});
font.load()
.then((font)=>{
	const d=document.fonts;
	d.add(font);
	const nameY=25;
	const lessonName=lesson.specs.names.split('/')[lang==='es'?0:1];
	paths.tempFont('21px font');
	let text=ctx.measureText(lessonName);
	let x=scorePlayer.canvas.width/2-text.width/2;
	ctx.fillText(lessonName, x, nameY);
	scorePlayer.paths.tempFont();
});
/********** SCORE CLEFF **********/
scorePlayer.enums.Clef.draw(lesson.specs.clef);
/********** KEY SIGNATURE **********/
scorePlayer.enums.KeySignature.drawAll(lesson.specs.clef==='BASS');
/********** TIME SIGNATURE **********/
scorePlayer.enums.TimeSignature.draw(lesson.specs.time);
/********** SEQUENCE **********/
const sequence=[];
const staves=lesson.staves;
for(let i=0; i<staves.length; i++){
	const staff=staves[i];
	const bars=staff.bars;
	for(let j=0; j<bars.length; j++){
		const barFrom=bars[j];
		const bar=new scorePlayer.classes.Bar(barFrom.x, barFrom.y, barFrom.barLineType, barFrom.barLineX, barFrom.figures);
		if(i===0&&j===0){
			bar.isFirst=true;
		}
		const figures=bar.figures;
		for(let k=0; k<figures.length; k++){
			sequence.push(figures[k]);
		}
	}
};
/********** STATUS **********/
let state;
const Status=(function(){
	const instance={};
	instance.IDDLE=1;
	instance.MARKING=2;
	instance.PLAYING=3;
	instance.PAUSED=4;
	instance.TUNING=5;
	state=instance.IDDLE;
	return instance;
})();
/********** NAMES **********/
function showNames(show){
	for(let i=0; i<sequence.length; i++){
		let figure=sequence[i];
		if(figure instanceof classes.Note){
			figure.showName(show);
		}
	}
};
showNames(namesVisible);
/********** CURSOR **********/
let currentIndex=0, rememberedIndex, bufferedIndex, figure, wave, metronomeRunning=false;
function cursor(show){
	if(!cursorVisible){
		return;
	}
	let x=sequence[currentIndex].getX()-4;
	let y=sequence[currentIndex].getParentBar().y+19;
	if(show){
		paths.tempFillStyle('red');
		ctx.fillRect(x, y, 3, 82);
		paths.tempFillStyle();
	}else{
		ctx.clearRect(x-1, y-1, 5, 84);
		let figure=sequence[currentIndex]
		if((figure instanceof classes.Note)&&figure.hasLedgerLines()){
			figure.drawLedgerLines();
		}
	};
};
cursor(false);
/********** FUNCTIONS **********/
function start(){
	buttonPlayPause.removeEventListener('click', start);
	buttonPlayPause.addEventListener('click', stop, false);
	buttonPlayPause.innerText=buttonLabel.stop;
	buttonReplay.setAttribute('disabled', '');
	buttonRw.setAttribute('disabled', '');
	buttonTune.setAttribute('disabled', '');
	if(state===Status.IDDLE){
		cursor(true);
		play();
	}else if(state===Status.PAUSED){
		cursor(false);
		currentIndex=sequence.indexOf(sequence[currentIndex].getParentBar().figures[0]);
		cursor(true);
		play();
	}
	rememberedIndex=currentIndex;
};
scorePlayer.canvas.addEventListener('click', onCanvasClick, false);
function onCanvasClick(e){
	let text;
	let osX=e.offsetX;
	if(osX<=318){
		text='Rewind';
		buttonRw.click();
	}
	if(osX>318&&osX<=635){
		text='Replay';
		buttonReplay.click();
	}
	if(osX>635){
		text='Play/Pause';
		buttonPlayPause.click();
	}
};
function restart(){
	buttonPlayPause.removeEventListener('click', start);
	buttonPlayPause.addEventListener('click', stop, false);
	buttonPlayPause.innerText=buttonLabel.stop;
	buttonReplay.setAttribute('disabled', '');
	buttonRw.setAttribute('disabled', '');
	buttonTune.setAttribute('disabled', '');
	cursor(false);
	currentIndex=rememberedIndex;
	cursor(true);
	play();
};
function stop(){
	buttonPlayPause.removeEventListener('click', stop);
	buttonTune.removeAttribute('disabled');
	if(toneOsc){
		toneOsc.stop();
	}
	if(metronomeRunning){
		clearTimeout(timeOutMetronome);
		metronomeRunning=false;
	}
	if(state===Status.MARKING||sequence[currentIndex].getParentBar().isFirst){
		state=Status.IDDLE;
		cursor(false);
		currentIndex=rememberedIndex=bufferedIndex=0;
		cursor(true);
		buttonPlayPause.innerText=buttonLabel.start;
		buttonPlayPause.addEventListener('click', start, false);
	}else{
		state=Status.PAUSED;
		buttonPlayPause.innerText=buttonLabel.resume;
		buttonRw.removeAttribute('disabled');
		buttonReplay.removeAttribute('disabled');
		buttonTune.removeAttribute('disabled');
		if(!sequence[rememberedIndex].getParentBar().isFirst&&sequence[rememberedIndex].getParentBar()!=sequence[currentIndex].getParentBar()){
			buttonReplay.removeAttribute('disabled');
		}
	}
	buttonPlayPause.addEventListener('click', start, false);
};
function rewind(){
	buttonPlayPause.innerText=buttonLabel.start;
	buttonRw.setAttribute('disabled', '');
	buttonReplay.setAttribute('disabled', '');
	cursor(false);
	currentIndex=rememberedIndex=bufferedIndex=0;
	//cursor(true);
	state=Status.IDDLE;
};
/********** CHANGING AND TEMP VARIABLES**********/
let gainFactor, volumeAttack, volumeSustain, volumeRelease, vibrato, vibratoGain, metronomeDelay, beepOsc, beepGain, timeOutMetronome, duration, toneOsc, toneGain;
const attack=0.03, decay=0.02, release=0.05, lfoDelay=attack+0.5, beepDuration=0.05, beepHi=1800, beepLow=1200;
function tune(){
	let prevStatus=state;
	state=Status.TUNING;
	buttonPlayPause.setAttribute('disabled', '');
	buttonTune.setAttribute('disabled', '');
	let restoreReplay;
	if(!buttonReplay.disabled){
		restoreReplay=true;
		buttonReplay.setAttribute('disabled', '');
	}
	let ac=getAc();
	if(!wave){
		wave=ac.createPeriodicWave(sound.real, sound.imag, {disableNormalization: true});
	}
	let tuneOsc=ac.createOscillator();
	let oscParamIndex=enums.KeySignature[lesson.specs.key].scale[enums.KeySignature[lesson.specs.key].firstTonicIndex+14].oscParamIndex;
	let duration=2;
	tuneOsc.setPeriodicWave(wave);
	tuneOsc.frequency.value=sound.oscParam[oscParamIndex].freq;
	gainFactor=sound.oscParam[oscParamIndex].gainFactor;
	let tuneGain=ac.createGain();
	tuneGain.connect(ac.destination);
	tuneOsc.connect(tuneGain);
	tuneOsc.onended=function(){
		buttonPlayPause.removeAttribute('disabled');
		buttonTune.removeAttribute('disabled', '');
		if(restoreReplay){
			buttonReplay.removeAttribute('disabled');
		}
	}
	volumeAttack=1*gainFactor;
	volumeSustain=0.9*gainFactor;
	volumeRelease=0.8*gainFactor;
	tuneGain.gain.setValueAtTime(0, ac.currentTime);
	tuneGain.gain.linearRampToValueAtTime(volumeAttack, ac.currentTime+attack);
	tuneGain.gain.linearRampToValueAtTime(volumeSustain, ac.currentTime+attack+decay);
	tuneGain.gain.linearRampToValueAtTime(volumeRelease, ac.currentTime+duration-release);
	tuneGain.gain.linearRampToValueAtTime(0.0, ac.currentTime+duration);
	vibrato=ac.createOscillator();
	vibrato.frequency.value=4.5;
	vibratoGain=ac.createGain();
	vibrato.connect(vibratoGain);
	vibratoGain.connect(tuneGain.gain);
	vibratoGain.gain.setValueAtTime(0.1*gainFactor, ac.currentTime+lfoDelay);
	vibrato.start(ac.currentTime+lfoDelay);
	tuneOsc.start(ac.currentTime);
	vibrato.stop(ac.currentTime+duration);
	tuneOsc.stop(ac.currentTime+duration);
	state=prevStatus;
};
function play(){
	if(sequence[currentIndex].isFirstInBar()){
		if(metronomeOn){metronomeDelay=60000/tempo-beepDuration*1000;
			if(markStart&&(state===Status.IDDLE||state===Status.PAUSED)){
				state=Status.MARKING;
				startMetronome();
				return;
			}
			startMetronome();
		}
		state=Status.PLAYING
	}
	figure=sequence[currentIndex];
	duration=5*figure.getTicksSpan()/tempo;
	if(!ac){
		ac=getAC();
	}
	if(!wave){
		wave=ac.createPeriodicWave(sound.real, sound.imag, {disableNormalization: true});
	}
	toneOsc=ac.createOscillator();
	if(figure instanceof classes.Note){
		toneOsc.setPeriodicWave(wave);
		toneOsc.frequency.value=sound.oscParam[figure.oscParamIndex].freq;
		gainFactor=sound.oscParam[figure.oscParamIndex].gainFactor;
		toneGain=ac.createGain();
		toneGain.connect(ac.destination);
		toneOsc.connect(toneGain);
		volumeAttack=1*gainFactor;
		volumeSustain=0.9*gainFactor;
		volumeRelease=0.8*gainFactor;
		toneGain.gain.setValueAtTime(0, ac.currentTime);
		toneGain.gain.linearRampToValueAtTime(volumeAttack, ac.currentTime+attack);
		toneGain.gain.linearRampToValueAtTime(volumeSustain, ac.currentTime+attack+decay);
		toneGain.gain.linearRampToValueAtTime(volumeRelease, ac.currentTime+duration-release);
		toneGain.gain.linearRampToValueAtTime(0.0, ac.currentTime+duration);
		vibrato=ac.createOscillator();
		vibrato.frequency.value=4.5;
		vibratoGain=ac.createGain();
		vibrato.connect(vibratoGain);
		vibratoGain.connect(toneGain.gain);
		vibratoGain.gain.setValueAtTime(0.1*gainFactor, ac.currentTime+lfoDelay);
		vibrato.start(ac.currentTime+lfoDelay);
		vibrato.stop(ac.currentTime+duration);
	}else{
		toneOsc.frequency.value=gainFactor=0;
	}
	toneOsc.start(ac.currentTime);
	toneOsc.stop(ac.currentTime+duration);
	toneOsc.onended=function(){
		enlightFigure(false);
		if(state===Status.PLAYING){
			checkForEnding();
		}
	}
	enlightFigure(true);
};
function startMetronome(){
	metronomeRunning=true;
	let countFinished=false;
	let count=0;
	beep();
	function beep(){
		if(!metronomeRunning){
			return;
		}
		if(countFinished){
			play();
			return;
		}
	let ac=getAc();
		beepOsc=ac.createOscillator();
		beepGain=ac.createGain();
		beepOsc.type='square';
		beepOsc.frequency.value=count===0?beepHi:beepLow;
		beepOsc.connect(beepGain);
		beepGain.gain.value=beepGainValue;
		beepGain.connect(ac.destination);
		beepOsc.onended=function(){
			count++;
			if(count>=enums.TimeSignature[lesson.specs.time].upperNumber){
				if(state===Status.PLAYING){
					return;
				}else{
					countFinished=true;
				}
			}
			timeOutMetronome=setTimeout(beep, metronomeDelay);
		}
		beepOsc.start(ac.currentTime);
		beepOsc.stop(ac.currentTime+beepDuration);
	};
};
function checkForEnding(){
	cursor(false);
	if(sequence[currentIndex+1]){
		currentIndex++;
		play();
		cursor(true);
	}else{
		if(metronomeOn){
			beepOsc=ac.createOscillator();
			beepGain=ac.createGain();
			beepOsc.type='square';
			beepOsc.frequency.value=beepHi;
			beepOsc.connect(beepGain);
			beepGain.gain.value=beepGainValue;
			beepGain.connect(ac.destination);
			beepOsc.start(ac.currentTime);
			beepOsc.stop(ac.currentTime+beepDuration*8);
			rewind();
			buttonTune.removeAttribute('disabled');
			markingCheckBox.removeAttribute('disabled');
			buttonPlayPause.removeEventListener('click', stop);
			buttonPlayPause.addEventListener('click', start, false);
		}
	}
};
function enlightFigure(on){
	let color=on?'red':'black';
	paths.tempFillStyle(color);
	paths.tempStrokeStyle(color);
	figure.draw();
	paths.tempFillStyle();
	paths.tempStrokeStyle();
};
scorePlayer.engine=engine;