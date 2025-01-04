let ac;
const attack=0.03, decay=0.02, release=0.05, lfoDelay=attack+0.5, beepDuration=0.05, beepHi=1800, beepLow=1200;
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
window.addEventListener('load', setup, false);
function setup(){
	setUpCommonalities('Auditory');
	const buttonsSpecsArray=[];
	buttonsSpecsArray.push(new ButtonSpec('play1', 'buttons1', 'Play1!', ()=>{playNote(scaleNotes.length-1, 2);}));
	buttonsSpecsArray.push(new ButtonSpec('play2', 'buttons1', 'Play2!', ()=>{$cl('two');}));
	buttonsSpecsArray.push(new ButtonSpec('play3', 'buttons1', 'Play3!', ()=>{$cl('three');}));
	buttonsSpecsArray.push(new ButtonSpec());
    createButtonsDiv(buttonsSpecsArray);
}
function showKeyboardList(){
	const body=$('body');
	const list=$ce('ul');
	body.append(list);
	scaleNotes.forEach(sn => {
		const li=$ce('li');
		for(e in sn){
			li.textContent+=`${sn[e]} `;
		}
		list.append(li);
	});
};
function playNote(keyNumber, duration){
    let ac=getAc();
    const keyOsc=ac.createOscillator();
    const keyOscGain=ac.createGain();
    keyOsc.connect(keyOscGain);
    keyOscGain.connect(ac.destination);
    const wave=ac.createPeriodicWave(real, imag, {disableNormalization: true});
    keyOsc.setPeriodicWave(wave);
    keyOsc.frequency.value=scaleNotes[keyNumber].oscParam.freq;
	const gainFactor=scaleNotes[keyNumber].oscParam.gainFactor;
	const volumeAttack=1*gainFactor;
	const volumeSustain=0.9*gainFactor;
	const volumeRelease=0.8*gainFactor;
	keyOscGain.gain.setValueAtTime(0, ac.currentTime);
	keyOscGain.gain.linearRampToValueAtTime(volumeAttack, ac.currentTime+attack);
	keyOscGain.gain.linearRampToValueAtTime(volumeSustain, ac.currentTime+attack+decay);
	keyOscGain.gain.linearRampToValueAtTime(volumeRelease, ac.currentTime+duration-release);
	keyOscGain.gain.linearRampToValueAtTime(0.0, ac.currentTime+duration);
    const vibratoOsc=ac.createOscillator();
    const vibratoGain=ac.createGain();
    vibratoOsc.connect(vibratoGain);
    vibratoGain.connect(keyOscGain.gain);
	vibratoOsc.frequency.value=4.5;
	vibratoGain.gain.setValueAtTime(0.1*gainFactor, ac.currentTime+lfoDelay);//
	keyOsc.start(ac.currentTime);
	vibratoOsc.start(ac.currentTime+lfoDelay);
	vibratoOsc.stop(ac.currentTime+duration);
	keyOsc.stop(ac.currentTime+duration);
	keyOsc.onended=()=>{
        $cl('done!');
	}
    vibratoOsc.onended=()=>{
        $cl('vibrato ended  ');
    }
};