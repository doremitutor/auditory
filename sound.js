const darkColor='rgb(58, 43, 28)', bgColor='rgb(250, 230, 209)', lightColor='rgb(255, 204, 153)';//
let lang, altLang, body, main;
function $(id){return document.getElementById(id);};
function $sel(sel){return document.querySelector(sel);}
function $all(sel){return document.querySelectorAll(sel);}
function $ce(tag, prop){return document.createElement(tag, prop);};
function $txtNode(txt){return document.createTextNode(txt);};
function $str(str_es, str_en){return lang==='es'?str_es:str_en};
const $cl=console.log;

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
const naturalsFromBb=[false, true, true, false, true, false, true, true, false, true, false, true];
//make classes and names array of objects

const classesAndNames=[{'class':'B', 'name':$str('Si', 'Ti')}, {}];
const classesFromB=['B', 'C', 'D', 'E', 'F', 'G', 'A'];
const noteNamesFromB=[$str('Si', 'Ti'), 'Do', 'Re', 'Mi', 'Fa', $str('Sol', 'So'), 'La'];
const pianoKeys=Array(frequencies.length);
let applyingAlterations=false;
//$cl(pianoKeys.length);
for(let i=0, j=0, k=0; i<pianoKeys.length; i++){
	let key=pianoKeys[i]={};
	key.natural=naturalsFromBb[j];
	key.class=classesFromB[k];
	key.name=noteNamesFromB[k];
	if(!key.natural){
		//process alterations
		if(!applyingAlterations){
			key.class+='b';
			key.name+=` ${$str('bemol', 'flat')}`;
			applyingAlterations=true;
		}else{	
			key.class+='#';
			key.name+=` ${$str('sostenido', 'sharp')}`;
			applyingAlterations=false;
			j++;
			k++;
		}
	}else{
		//if next key is natural increment k
		if(i<pianoKeys.length&&naturalsFromBb[j+1]==true){
			k++;
		}
	}
	if(j==naturalsFromBb.length){
		j=0;
	}
	if(k==classesFromB.length){
		k=0;
	}
}
/* const pitchValues=new Array();
sound.pitchValues=pitchValues;
{pitchValues[0]={fullName:'bFlat1',		octave:1,  oscParamIndex:0,  classKey:'B', vertPosTreble:30};
pitchValues[1]={fullName:'b1',			octave:1,  oscParamIndex:1,  classKey:'B', vertPosTreble:30};
pitchValues[2]={fullName:'c2',			octave:2,  oscParamIndex:2,  classKey:'C', vertPosTreble:29};
pitchValues[3]={fullName:'cSharp2',		octave:2,  oscParamIndex:3,  classKey:'C', vertPosTreble:29};
pitchValues[4]={fullName:'dFlat2',		octave:2,  oscParamIndex:3,  classKey:'D', vertPosTreble:28};
pitchValues[5]={fullName:'d2',			octave:2,  oscParamIndex:4,  classKey:'D', vertPosTreble:28};
pitchValues[6]={fullName:'dSharp2',		octave:2,  oscParamIndex:5,  classKey:'D', vertPosTreble:28};
pitchValues[7]={fullName:'eFlat2',		octave:2,  oscParamIndex:5,  classKey:'E', vertPosTreble:27};
pitchValues[8]={fullName:'e2',			octave:2,  oscParamIndex:6,  classKey:'E', vertPosTreble:27};
pitchValues[9]={fullName:'f2',			octave:2,  oscParamIndex:7,  classKey:'F', vertPosTreble:26};
pitchValues[10]={fullName:'fSharp2',	octave:2,  oscParamIndex:8,  classKey:'F', vertPosTreble:26};
pitchValues[11]={fullName:'gFlat2',		octave:2,  oscParamIndex:8,  classKey:'G', vertPosTreble:25};
pitchValues[12]={fullName:'g2',			octave:2,  oscParamIndex:9,  classKey:'G', vertPosTreble:25};
pitchValues[13]={fullName:'gSharp2',	octave:2,  oscParamIndex:10, classKey:'G', vertPosTreble:25};
pitchValues[14]={fullName:'aFlat2',		octave:2,  oscParamIndex:10, classKey:'A', vertPosTreble:24};
pitchValues[15]={fullName:'a2',			octave:2,  oscParamIndex:11, classKey:'A', vertPosTreble:24};
pitchValues[16]={fullName:'aSharp2',	octave:2,  oscParamIndex:12, classKey:'A', vertPosTreble:24};
pitchValues[17]={fullName:'bFlat2',		octave:2,  oscParamIndex:12, classKey:'B', vertPosTreble:23};
pitchValues[18]={fullName:'b2',			octave:2,  oscParamIndex:13, classKey:'B', vertPosTreble:23};
pitchValues[19]={fullName:'c3',			octave:3,  oscParamIndex:14, classKey:'C', vertPosTreble:22};
pitchValues[20]={fullName:'cSharp3',	octave:3,  oscParamIndex:15, classKey:'C', vertPosTreble:22};
pitchValues[21]={fullName:'dFlat3',		octave:3,  oscParamIndex:15, classKey:'D', vertPosTreble:21};
pitchValues[22]={fullName:'d3',			octave:3,  oscParamIndex:16, classKey:'D', vertPosTreble:21};
pitchValues[23]={fullName:'dSharp3',	octave:3,  oscParamIndex:17, classKey:'D', vertPosTreble:21};
pitchValues[24]={fullName:'eFlat3',		octave:3,  oscParamIndex:17, classKey:'E', vertPosTreble:20};
pitchValues[25]={fullName:'e3',			octave:3,  oscParamIndex:18, classKey:'E', vertPosTreble:20};
pitchValues[26]={fullName:'f3',			octave:3,  oscParamIndex:19, classKey:'F', vertPosTreble:19};
pitchValues[27]={fullName:'fSharp3',	octave:3,  oscParamIndex:20, classKey:'F', vertPosTreble:19};
pitchValues[28]={fullName:'gFlat3',		octave:3,  oscParamIndex:20, classKey:'G', vertPosTreble:18};
pitchValues[29]={fullName:'g3',			octave:3,  oscParamIndex:21, classKey:'G', vertPosTreble:18};
pitchValues[30]={fullName:'gSharp3',	octave:3,  oscParamIndex:22, classKey:'G', vertPosTreble:18};
pitchValues[31]={fullName:'aFlat3',		octave:3,  oscParamIndex:22, classKey:'A', vertPosTreble:17};
pitchValues[32]={fullName:'a3',			octave:3,  oscParamIndex:23, classKey:'A', vertPosTreble:17};
pitchValues[33]={fullName:'aSharp3',	octave:3,  oscParamIndex:24, classKey:'A', vertPosTreble:17};
pitchValues[34]={fullName:'bFlat3',		octave:3,  oscParamIndex:24, classKey:'B', vertPosTreble:16};
pitchValues[35]={fullName:'b3',			octave:3,  oscParamIndex:25, classKey:'B', vertPosTreble:16};
pitchValues[36]={fullName:'c4',			octave:4,  oscParamIndex:26, classKey:'C', vertPosTreble:15};
pitchValues[37]={fullName:'cSharp4',	octave:4,  oscParamIndex:27, classKey:'C', vertPosTreble:15};
pitchValues[38]={fullName:'dFlat4',		octave:4,  oscParamIndex:27, classKey:'D', vertPosTreble:14};
pitchValues[39]={fullName:'d4',			octave:4,  oscParamIndex:28, classKey:'D', vertPosTreble:14};
pitchValues[40]={fullName:'dSharp4',	octave:4,  oscParamIndex:29, classKey:'D', vertPosTreble:14};
pitchValues[41]={fullName:'eFlat4',		octave:4,  oscParamIndex:29, classKey:'E', vertPosTreble:13};
pitchValues[42]={fullName:'e4',			octave:4,  oscParamIndex:30, classKey:'E', vertPosTreble:13};
pitchValues[43]={fullName:'f4',			octave:4,  oscParamIndex:31, classKey:'F', vertPosTreble:12};
pitchValues[44]={fullName:'fSharp4',	octave:4,  oscParamIndex:32, classKey:'F', vertPosTreble:12};
pitchValues[45]={fullName:'gFlat4',		octave:4,  oscParamIndex:32, classKey:'G', vertPosTreble:11};
pitchValues[46]={fullName:'g4',			octave:4,  oscParamIndex:33, classKey:'G', vertPosTreble:11};
pitchValues[47]={fullName:'gSharp4',	octave:4,  oscParamIndex:34, classKey:'G', vertPosTreble:11};
pitchValues[48]={fullName:'aFlat4',		octave:4,  oscParamIndex:34, classKey:'A', vertPosTreble:10};
pitchValues[49]={fullName:'a4',			octave:4,  oscParamIndex:35, classKey:'A', vertPosTreble:10};
pitchValues[50]={fullName:'aSharp4',	octave:4,  oscParamIndex:36, classKey:'A', vertPosTreble:10};
pitchValues[51]={fullName:'bFlat4',		octave:4,  oscParamIndex:36, classKey:'B', vertPosTreble:9};
pitchValues[52]={fullName:'b4',			octave:4,  oscParamIndex:37, classKey:'B', vertPosTreble:9};
pitchValues[53]={fullName:'c5',			octave:5,  oscParamIndex:38, classKey:'C', vertPosTreble:8};
pitchValues[54]={fullName:'cSharp5',	octave:5,  oscParamIndex:39, classKey:'C', vertPosTreble:8};
pitchValues[55]={fullName:'dFlat5',		octave:5,  oscParamIndex:39, classKey:'D', vertPosTreble:7};
pitchValues[56]={fullName:'d5',			octave:5,  oscParamIndex:40, classKey:'D', vertPosTreble:7};
pitchValues[57]={fullName:'dSharp5',	octave:5,  oscParamIndex:41, classKey:'D', vertPosTreble:7};
pitchValues[58]={fullName:'eFlat5',		octave:5,  oscParamIndex:41, classKey:'E', vertPosTreble:6};
pitchValues[59]={fullName:'e5',			octave:5,  oscParamIndex:42, classKey:'E', vertPosTreble:6};
pitchValues[60]={fullName:'f5',			octave:5,  oscParamIndex:43, classKey:'F', vertPosTreble:5};
pitchValues[61]={fullName:'fSharp5',	octave:5,  oscParamIndex:44, classKey:'F', vertPosTreble:5};
pitchValues[62]={fullName:'gFlat5',		octave:5,  oscParamIndex:44, classKey:'G', vertPosTreble:4};
pitchValues[63]={fullName:'g5',			octave:5,  oscParamIndex:45, classKey:'G', vertPosTreble:4};
pitchValues[64]={fullName:'gSharp5',	octave:5,  oscParamIndex:46, classKey:'G', vertPosTreble:4};
pitchValues[65]={fullName:'aFlat5',		octave:5,  oscParamIndex:46, classKey:'A', vertPosTreble:3};
pitchValues[66]={fullName:'a5',			octave:5,  oscParamIndex:47, classKey:'A', vertPosTreble:3};
pitchValues[67]={fullName:'aSharp5',	octave:5,  oscParamIndex:48, classKey:'A', vertPosTreble:3};
pitchValues[68]={fullName:'bFlat5',		octave:5,  oscParamIndex:48, classKey:'B', vertPosTreble:2};
pitchValues[69]={fullName:'b5',			octave:5,  oscParamIndex:49, classKey:'B', vertPosTreble:2};
pitchValues[70]={fullName:'c6',			octave:6,  oscParamIndex:50, classKey:'C', vertPosTreble:1};
pitchValues[71]={fullName:'cSharp6',	octave:6,  oscParamIndex:51, classKey:'C', vertPosTreble:1};
pitchValues[72]={fullName:'dFlat6',		octave:6,  oscParamIndex:51, classKey:'D', vertPosTreble:0};
pitchValues[73]={fullName:'d6',			octave:6,  oscParamIndex:52, classKey:'D', vertPosTreble:0};
pitchValues[74]={fullName:'dSharp6',	octave:6,  oscParamIndex:53, classKey:'D', vertPosTreble:0};} */
//scorePlayer.sound=sound;
/* working scratch pad:
{
pitchValues[0]= {oscParamIndex:0,  classKey:['A', 'B'], octave:1,  vertPosTreble:30, fullName:['aSharp', 'bFlat1']		};
pitchValues[1]= {oscParamIndex:1,  classKey:'B', octave:1,  vertPosTreble:30, fullName:'b1'			};
pitchValues[2]= {oscParamIndex:2,  classKey:'C', octave:2,  vertPosTreble:29, fullName:'c2'			};
pitchValues[3]= {oscParamIndex:3,  classKey:'C', octave:2,  vertPosTreble:29, fullName:'cSharp2'	};
pitchValues[4]= {oscParamIndex:3,  classKey:'D', octave:2,  vertPosTreble:28, fullName:'dFlat2'		};
pitchValues[5]= {oscParamIndex:4,  classKey:'D', octave:2,  vertPosTreble:28, fullName:'d2'			};
pitchValues[6]= {oscParamIndex:5,  classKey:'D', octave:2,  vertPosTreble:28, fullName:'dSharp2'	};
pitchValues[7]= {oscParamIndex:5,  classKey:'E', octave:2,  vertPosTreble:27, fullName:'eFlat2'		};
pitchValues[8]= {oscParamIndex:6,  classKey:'E', octave:2,  vertPosTreble:27, fullName:'e2'			};
pitchValues[9]= {oscParamIndex:7,  classKey:'F', octave:2,  vertPosTreble:26, fullName:'f2'			};
pitchValues[10]={oscParamIndex:8,  classKey:'F', octave:2,  vertPosTreble:26, fullName:'fSharp2'	};
pitchValues[11]={oscParamIndex:8,  classKey:'G', octave:2,  vertPosTreble:25, fullName:'gFlat2'		};
pitchValues[12]={oscParamIndex:9,  classKey:'G', octave:2,  vertPosTreble:25, fullName:'g2'			};
pitchValues[13]={oscParamIndex:10, classKey:'G', octave:2,  vertPosTreble:25, fullName:'gSharp2'	};
pitchValues[14]={oscParamIndex:10, classKey:'A', octave:2,  vertPosTreble:24, fullName:'aFlat2'		};
pitchValues[15]={oscParamIndex:11, classKey:'A', octave:2,  vertPosTreble:24, fullName:'a2'			};
pitchValues[16]={oscParamIndex:12, classKey:'A', octave:2,  vertPosTreble:24, fullName:'aSharp2'	};
pitchValues[17]={oscParamIndex:12, classKey:'B', octave:2,  vertPosTreble:23, fullName:'bFlat2'		};
pitchValues[18]={oscParamIndex:13, classKey:'B', octave:2,  vertPosTreble:23, fullName:'b2'			};
pitchValues[19]={oscParamIndex:14, classKey:'C', octave:3,  vertPosTreble:22, fullName:'c3'			};
pitchValues[20]={oscParamIndex:15, classKey:'C', octave:3,  vertPosTreble:22, fullName:'cSharp3'	};
pitchValues[21]={oscParamIndex:15, classKey:'D', octave:3,  vertPosTreble:21, fullName:'dFlat3'		};
pitchValues[22]={oscParamIndex:16, classKey:'D', octave:3,  vertPosTreble:21, fullName:'d3'			};
pitchValues[23]={oscParamIndex:17, classKey:'D', octave:3,  vertPosTreble:21, fullName:'dSharp3'	};
pitchValues[24]={oscParamIndex:17, classKey:'E', octave:3,  vertPosTreble:20, fullName:'eFlat3'		};
pitchValues[25]={oscParamIndex:18, classKey:'E', octave:3,  vertPosTreble:20, fullName:'e3'			};
pitchValues[26]={oscParamIndex:19, classKey:'F', octave:3,  vertPosTreble:19, fullName:'f3'			};
pitchValues[27]={oscParamIndex:20, classKey:'F', octave:3,  vertPosTreble:19, fullName:'fSharp3'	};
pitchValues[28]={oscParamIndex:20, classKey:'G', octave:3,  vertPosTreble:18, fullName:'gFlat3'		};
pitchValues[29]={oscParamIndex:21, classKey:'G', octave:3,  vertPosTreble:18, fullName:'g3'			};
pitchValues[30]={oscParamIndex:22, classKey:'G', octave:3,  vertPosTreble:18, fullName:'gSharp3'	};
pitchValues[31]={oscParamIndex:22, classKey:'A', octave:3,  vertPosTreble:17, fullName:'aFlat3'		};
pitchValues[32]={oscParamIndex:23, classKey:'A', octave:3,  vertPosTreble:17, fullName:'a3'			};
pitchValues[33]={oscParamIndex:24, classKey:'A', octave:3,  vertPosTreble:17, fullName:'aSharp3'	};
pitchValues[34]={oscParamIndex:24, classKey:'B', octave:3,  vertPosTreble:16, fullName:'bFlat3'		};
pitchValues[35]={oscParamIndex:25, classKey:'B', octave:3,  vertPosTreble:16, fullName:'b3'			};
pitchValues[36]={oscParamIndex:26, classKey:'C', octave:4,  vertPosTreble:15, fullName:'c4'			};
pitchValues[37]={oscParamIndex:27, classKey:'C', octave:4,  vertPosTreble:15, fullName:'cSharp4'	};
pitchValues[38]={oscParamIndex:27, classKey:'D', octave:4,  vertPosTreble:14, fullName:'dFlat4'		};
pitchValues[39]={oscParamIndex:28, classKey:'D', octave:4,  vertPosTreble:14, fullName:'d4'			};
pitchValues[40]={oscParamIndex:29, classKey:'D', octave:4,  vertPosTreble:14, fullName:'dSharp4'	};
pitchValues[41]={oscParamIndex:29, classKey:'E', octave:4,  vertPosTreble:13, fullName:'eFlat4'		};
pitchValues[42]={oscParamIndex:30, classKey:'E', octave:4,  vertPosTreble:13, fullName:'e4'			};
pitchValues[43]={oscParamIndex:31, classKey:'F', octave:4,  vertPosTreble:12, fullName:'f4'			};
pitchValues[44]={oscParamIndex:32, classKey:'F', octave:4,  vertPosTreble:12, fullName:'fSharp4'	};
pitchValues[45]={oscParamIndex:32, classKey:'G', octave:4,  vertPosTreble:11, fullName:'gFlat4'		};
pitchValues[46]={oscParamIndex:33, classKey:'G', octave:4,  vertPosTreble:11, fullName:'g4'			};
pitchValues[47]={oscParamIndex:34, classKey:'G', octave:4,  vertPosTreble:11, fullName:'gSharp4'	};
pitchValues[48]={oscParamIndex:34, classKey:'A', octave:4,  vertPosTreble:10, fullName:'aFlat4'		};
pitchValues[49]={oscParamIndex:35, classKey:'A', octave:4,  vertPosTreble:10, fullName:'a4'			};
pitchValues[50]={oscParamIndex:36, classKey:'A', octave:4,  vertPosTreble:10, fullName:'aSharp4'	};
pitchValues[51]={oscParamIndex:36, classKey:'B', octave:4,  vertPosTreble:9,  fullName:'bFlat4'		};
pitchValues[52]={oscParamIndex:37, classKey:'B', octave:4,  vertPosTreble:9,  fullName:'b4'			};
pitchValues[53]={oscParamIndex:38, classKey:'C', octave:5,  vertPosTreble:8,  fullName:'c5'			};
pitchValues[54]={oscParamIndex:39, classKey:'C', octave:5,  vertPosTreble:8,  fullName:'cSharp5'	};
pitchValues[55]={oscParamIndex:39, classKey:'D', octave:5,  vertPosTreble:7,  fullName:'dFlat5'		};
pitchValues[56]={oscParamIndex:40, classKey:'D', octave:5,  vertPosTreble:7,  fullName:'d5'			};
pitchValues[57]={oscParamIndex:41, classKey:'D', octave:5,  vertPosTreble:7,  fullName:'dSharp5'	};
pitchValues[58]={oscParamIndex:41, classKey:'E', octave:5,  vertPosTreble:6,  fullName:'eFlat5'		};
pitchValues[59]={oscParamIndex:42, classKey:'E', octave:5,  vertPosTreble:6,  fullName:'e5'			};
pitchValues[60]={oscParamIndex:43, classKey:'F', octave:5,  vertPosTreble:5,  fullName:'f5'			};
pitchValues[61]={oscParamIndex:44, classKey:'F', octave:5,  vertPosTreble:5,  fullName:'fSharp5'	};
pitchValues[62]={oscParamIndex:44, classKey:'G', octave:5,  vertPosTreble:4,  fullName:'gFlat5'		};
pitchValues[63]={oscParamIndex:45, classKey:'G', octave:5,  vertPosTreble:4,  fullName:'g5'			};
pitchValues[64]={oscParamIndex:46, classKey:'G', octave:5,  vertPosTreble:4,  fullName:'gSharp5'	};
pitchValues[65]={oscParamIndex:46, classKey:'A', octave:5,  vertPosTreble:3,  fullName:'aFlat5'		};
pitchValues[66]={oscParamIndex:47, classKey:'A', octave:5,  vertPosTreble:3,  fullName:'a5'			};
pitchValues[67]={oscParamIndex:48, classKey:'A', octave:5,  vertPosTreble:3,  fullName:'aSharp5'	};
pitchValues[68]={oscParamIndex:48, classKey:'B', octave:5,  vertPosTreble:2,  fullName:'bFlat5'		};
pitchValues[69]={oscParamIndex:49, classKey:'B', octave:5,  vertPosTreble:2,  fullName:'b5'			};
pitchValues[70]={oscParamIndex:50, classKey:'C', octave:6,  vertPosTreble:1,  fullName:'c6'			};
pitchValues[71]={oscParamIndex:51, classKey:'C', octave:6,  vertPosTreble:1,  fullName:'cSharp6'	};
pitchValues[72]={oscParamIndex:51, classKey:'D', octave:6,  vertPosTreble:0,  fullName:'dFlat6'		};
pitchValues[73]={oscParamIndex:52, classKey:'D', octave:6,  vertPosTreble:0,  fullName:'d6'			};
pitchValues[74]={oscParamIndex:53, classKey:'D', octave:6,  vertPosTreble:0,  fullName:'dSharp6'	};
}; */