class CustomButton extends HTMLButtonElement{
    constructor(){
        super();
        this.id='play';
        this.className='customButton';
    };
    connectedCallback(){
        /* const style=$ce('style');
        style.textContent=`@media screen and (min-width:981px){
            #navWrapper #${this.id} div.sectionDiv{			transition:height ${this.transition/3}s ease-in 0.2s, border-bottom-width 0s linear ${this.transition/3}s;}
            #navWrapper #${this.id}:hover div.sectionDiv{	height:${this.heightShown}px;transition:height ${this.transition}s ease-out;}
            #navWrapper #${this.id}{						transition:background-color 0s ${this.transition/3 + 0.2}s;}
            #navWrapper #${this.id}:hover{					transition:background-color 0s;}
            #navWrapper #${this.id} > span{					transition:color 0s ${this.transition/2 + 0.2}s;}
            #navWrapper #${this.id}:hover > span{			transition:color 0s;}}`;
        $('head').append(style); */
    };
    attributeChangedCallback(attrName, oldVal, newVal){
        switch(attrName){
            case 'listener':
                $cl(typeof newVal);
                $cl(newVal);
                for(let e in newVal){
                    $cl(e);
                }
                //this.addEventListener('click', newVal.f, false);

                
                break;
            case 'content':
                this.textContent=newVal;
                break;
        }
    };
    static observedAttributes=['listener', 'content'];
}
customElements.define('custom-button', CustomButton, {extends:'button'});