const MODES=(function(){
    const instance={};
    instance.Ionian=[2, 2, 1, 2, 2, 2, 1];
    instance.Dorian=Array.from(instance.Ionian);
    instance.Dorian.push(instance.Dorian.shift());
    instance.Phrygian=Array.from(instance.Dorian);
    instance.Phrygian.push(instance.Phrygian.shift());
    instance.Lydian=Array.from(instance.Phrygian);
    instance.Lydian.push(instance.Lydian.shift());
    instance.Mixolydian=Array.from(instance.Lydian);
    instance.Mixolydian.push(instance.Mixolydian.shift());
    instance.Aeolian=Array.from(instance.Mixolydian);
    instance.Aeolian.push(instance.Aeolian.shift());
    instance.Aeolian_Harmonic=[2, 1, 2, 2, 1, 3, 1];
    instance.Aeolian_Melodic=[2, 1, 2, 2, 2, 2, 1];
    instance.Locrian=Array.from(instance.Aeolian);
    instance.Locrian=instance.Locrian.push(instance.Locrian.shift());
    return instance;
})();
const KEYS=(()=>{
    const instance={};
    //instance 
    return instance;
})();