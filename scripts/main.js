const darkColor='rgb(58, 43, 28)', bgColor='rgb(250, 230, 209)', lightColor='rgb(255, 204, 153)';
let lang, altLang, body, main;
function $(id){return document.getElementById(id);};
function $sel(sel){return document.querySelector(sel);}
function $all(sel){return document.querySelectorAll(sel);}
function $ce(tag, prop){return document.createElement(tag, prop);};
function $txtNode(txt){return document.createTextNode(txt);};
function $str(str_es, str_en){return lang==='es'?str_es:str_en};

function setUpCommonalities(title){
	html=$('html');
	lang=html.getAttribute('lang')
	body=$('body');
	let titleHeader=$ce('h1');
	titleHeader.id='titleHeader';
	titleHeader.textContent=title;
	body.append(titleHeader);
	canvas=$ce('canvas');
	canvas.id="canvas";
	canvas.width=980;
	canvas.height=552;
	body.append(canvas);
	ctx=canvas.getContext("2d");
	ctx.lineWidth=2;
	ctx.lineCap='round';
	ctx.lineJoin='round';
	ctx.strokeStyle=ctx.fillStyle='black';
};
const $cl=console.log;
function ButtonSpec(id, className, content, listener){
	this.prop={};
    this.prop.id=id;
    this.prop.className=className;
    this.prop.textContent=content;
    this.listener=listener;
};
function createButtonsDiv(buttonsSpecsArray){
    const canvas=$('canvas');
    const buttonsDiv=$ce('div');
    buttonsDiv.id='buttonsDiv';
    canvas.after(buttonsDiv);
    buttonsSpecsArray.forEach(spec=>{
        const button=$ce('button');
        for(const prop in spec.prop){
            button[prop]=spec.prop[prop];
            buttonsDiv.append(button);
        }
		button.addEventListener('click', spec.listener, false);
    });
};