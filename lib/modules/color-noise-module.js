import utils from '../utils';
import { SoundModule } from './sound-module';
import { ControlEvents, OmniControl } from 'property-controls';
import { NoiseTypes, NoiseGen } from 'noisegen';
import { ColorNoiseDefaults } from '../defaults';

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
        this.model = Object.assign({}, ColorNoiseDefaults);
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

export {
    NoiseTypes,
    ColorNoiseModule
};

export default ColorNoiseModule;
