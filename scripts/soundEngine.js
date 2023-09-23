const frequencies=[58.27, 61.74,
			65.41, 69.30, 73.42, 77.78, 82.41, 87.31, 92.50, 98.00, 103.83, 110.00, 116.54, 123.47,
			130.81, 138.59, 146.83, 155.56, 164.81, 174.61, 185.00, 196.00, 207.65, 220.00, 233.08, 246.94,
			261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392.00, 415.30, 440.00, 466.16, 493.88,
			523.25, 554.37, 587.33, 622.25, 659.26, 698.46, 739.99, 783.99, 830.61, 880.00, 932.33, 987.77,
			1046.50, 1108.73, 1174.66, 1244.51];
const real=new Float32Array(13), imag=new Float32Array(real.length);
{real[0]=0; real[1]=0.0566; real[2]=0.0816; real[3]=0.0327; real[4]=0.0314; real[5]=0.0138; real[6]=0.0021;
real[7]=0.0025; real[8]=0.0028; real[9]=0.0001; real[10]=0.0008; real[11]=0.0; real[12]=0.0002;}
const volumeOffsetFactor=0.8/(frequencies.length);
const oscParam=Array();
for(let i=0; i<frequencies.length; i++){
	oscParam[i]={freq:frequencies[i], gainFactor:1-i*volumeOffsetFactor};
}
const classAndNameFromB=[{'class':'B', 'name':$str('Si', 'Ti')}, {'class':'C', 'name':'Do'}, {'class':'D', 'name':'Re'}, {'class':'E', 'name':'Mi'},
						 {'class':'F', 'name':'Fa'}, {'class':'G', 'name':$str('Sol', 'So')}, {'class':'A', 'name':'La'}];
const naturalsFromBb=[false, true, true, false, true, false, true, true, false, true, false, true];
let octave=1;
const scaleNotes=Array(frequencies.length);
let sharpApplied=true;
for(let i=0, j=0, k=0; i<scaleNotes.length; i++){
	let key=scaleNotes[i]={};
	key.isNatural=naturalsFromBb[j];
	j++;
	if(j==naturalsFromBb.length){
		j=0;
	}
	if(!key.isNatural){
		let prevK;
		if(k>0){
			prevK=k-1;
		}else{
			prevK=classAndNameFromB.length-1;
		}
		key.sharpClass=classAndNameFromB[prevK].class+octave+'#';
		key.sharpName=classAndNameFromB[prevK].name+octave+` ${$str('sostenido', 'sharp')}`;
		key.flatClass=classAndNameFromB[k].class+octave+'b';
		key.flatName=classAndNameFromB[k].name+octave+` ${$str('bemol', 'flat')}`;
	}else{
		if(classAndNameFromB[k].class=='C') octave++;
		key.class=classAndNameFromB[k].class+octave;
		key.name=classAndNameFromB[k].name+octave;
		k++;
		if(k==classAndNameFromB.length) k=0;
	}
	key.oscParam=oscParam[i];
	//$cl(key);
}
// perhaps for main.js:
//window.addEventListener('load', setup, false);
function setup(){
	const body=$('body');
	const list=$ce('ul');
	body.append(list);
	scaleNotes.forEach(k => {
		const li=$ce('li');
		for(e in k){
			li.textContent+=`${k[e]} `;
		}
		//list.append(li);
	});
}