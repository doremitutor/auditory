const darkColor='rgb(58, 43, 28)', bgColor='rgb(250, 230, 209)', lightColor='rgb(255, 204, 153)';
let lang, altLang, body, main;
function $(id){return document.getElementById(id);};
function $sel(sel){return document.querySelector(sel);}
function $all(sel){return document.querySelectorAll(sel);}
function $ce(tag, prop){return document.createElement(tag, prop);};
function $txtNode(txt){return document.createTextNode(txt);};
function $str(str_es, str_en){return lang==='es'?str_es:str_en};
const $cl=console.log;
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