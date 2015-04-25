import { ModuleTypes } from './constants';
import { NoiseTypes } from 'noisegen';
import { WaveTypes } from 'binauralbeatgen';
import { ControlTypes } from 'property-controls';

var SoundModuleDefaults = {
    type: 'sound-module',
    muted  : false,
    volume : {
        min:0,
        max:1,
        value: 1,
        controlType: ControlTypes.RANGE_CONTROL
    }
};

var BinauralBeatDefaults = Object.assign({}, SoundModuleDefaults,
    {
        type: ModuleTypes.BINAURAL_BEAT_MODULE,
        pitch: {
            min: 0,
            max: 1200,
            value: 440
        },
        beatRate: {
            min: 0,
            max: 30,
            value: 12
        },
        waveType: WaveTypes.SINE
    });

var ColorNoiseDefaults = Object.assign({}, SoundModuleDefaults,
    {
        type: ModuleTypes.COLOR_NOISE_MODULE,
        noiseType: NoiseTypes.BROWN_NOISE
    });

export {
    SoundModuleDefaults,
    BinauralBeatDefaults,
    ColorNoiseDefaults
};
