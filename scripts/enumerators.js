const MODES=(()=>{
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
    instance.Chromatic=[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    instance.wholeTone=[2, 2, 2, 2, 2, 2];
    instance.pentatonic=[];
    instance.minorPentatonic=[];
    instance.blues=[];
    return instance;
})();
const KEYS=(()=>{
    const instance={};
    //instance 
    return instance;
})();
const SERIES_TYPE=(()=>{
    const instance={};
    instance.natural=Symbol('Only C');
    instance.flat=Symbol('F, Bb, Eb');
    instance.sharp=Symbol('G, D, A');
    return instance;
})();
// levels, next-prev, tempo, attempted, correct, &, 
const CHORDS=(()=>{
    const instance={};
    instance.Major=[4, 3];
    instance.minor=[3, 4];
    instance.halfDiminished=[3, 3];
    instance.diminished=[4, 3, 3];
    instance.seventh=[3, 4, 3];
    instance.MajorSeventh=[4, 3, 4];
    instance.sixth=[4, 3, 2];
    instance.minorSixth=[3, 4, 2];
    /* instance.=[];
    instance.=[];
    instance.=[];
    instance.=[];
    instance.=[];
    instance.=[];
    instance.=[];
    instance.=[];
    instance.=[];
    instance.=[]; */
    return instance;
})();