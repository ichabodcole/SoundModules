import utils from '../utils';
import { SoundModule } from './sound-module';
import { ControlEvents, RangeControl } from 'property-controls';
import { ModuleTypes } from '../constants';
import { WaveTypes, BinauralBeatGen } from 'binauralbeatgen';
import { BinauralBeatDefaults } from '../defaults';

export class BinauralBeatModule extends SoundModule {
    constructor (audioContext, options) {
        this.__pitchListener    = this.__onPitchChange.bind(this);
        this.__beatRateListener = this.__onBeatRateChange.bind(this);

        super(audioContext, options);
        this.initGenerator();
    }

    initGenerator() {
        // Setup the sound generator
        this.generator = new BinauralBeatGen(this.audioCtx);
        this.generator.connect(this.gainNode);

        this.generator.pitch    = this.model.pitch.value;
        this.generator.beatRate = this.model.beatRate.value;
        this.generator.waveType = this.model.waveType;
    }

    setDefaults() {
        this.model = Object.assign({}, BinauralBeatDefaults);
    }

    setControls() {
        super.setControls();
        // Set the sound generator specific properties
        this.pitch = new RangeControl(this.model.pitch);
        this.pitch.on(ControlEvents.VALUE_CHANGE, this.__pitchListener);
        this.controls.push(this.pitch);

        this.beatRate = new RangeControl(this.model.beatRate);
        this.beatRate.on(ControlEvents.VALUE_CHANGE, this.__beatRateListener);
        this.controls.push(this.beatRate);
    }

    // Public API
    start() {
        super.start();
        this.generator.start();
    }

    stop() {
        super.stop();
        this.generator.stop();
    }

    destroy() {
        this.pitch.removeListener(ControlEvents.VALUE_CHANGE, this.__pitchListener);
        this.beatRate.removeListener(ControlEvents.VALUE_CHANGE, this.__beatRateListener);
        super.destroy();
    }

    /*************************************
      *      Getters and Setters
    **************************************/

    /*** waveType ***/
    get waveType() {
        return this.generator.waveType;
    }

    set waveType(waveType) {
        this.generator.waveType = waveType;
    }

    // Private Methods
    __onPitchChange (e) {
        this.generator.pitch = e.value;
    }

    __onBeatRateChange (e) {
        this.generator.beatRate = e.value;
    }
}

export {
    WaveTypes,
    BinauralBeatModule
};

export default BinauralBeatModule;
