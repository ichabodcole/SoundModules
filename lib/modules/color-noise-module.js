import utils from '../utils';
import { SoundModule, SoundModuleEvent } from './sound-module';
import { OmniControl, OmniControlEvent } from 'property-controls';
import { ModuleTypes } from '../constants';
import { NoiseTypes, NoiseGen } from 'noisegen';

var colorNoiseDefaults = {
    type: ModuleTypes.COLOR_NOISE_MODULE,
    noiseType: NoiseTypes.BROWN_NOISE
};

var ColorNoiseModuleEvent = Object.assign({}, SoundModuleEvent);

class ColorNoiseModule extends SoundModule {
    constructor (audioContext, options) {
        super(audioContext, options);
        this.initGenerator();
    }

    initGenerator() {
        // Setup the sound generator
        this.generator = new NoiseGen(this.audioCtx);
        this.generator.connect(this.gainNode);

        // Set the sound generator specific properties
        this.generator.noiseType = this.model.noiseType;
    }

    setDefaults() {
        this.model = Object.assign({}, ColorNoiseModule.defaults);
    }

    start() {
        super.start();
        this.generator.start();
    }

    stop() {
        super.stop();
        this.generator.stop();
    }

    destroy() {
        super.destroy();
        this.generator.remove();
    }

    /*************************************
      *      Getters and Setters
    **************************************/
    get noiseType () {
        return this.generator.noiseType;
    }

    set noiseType(type) {
        this.generator.noiseType = type;
    }
}

ColorNoiseModule.defaults = Object.assign({}, SoundModule.defaults, colorNoiseDefaults);

export {
    NoiseTypes,
    ColorNoiseModule,
    ColorNoiseModuleEvent
};

export default ColorNoiseModule;
