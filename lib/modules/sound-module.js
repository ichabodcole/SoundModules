import utils from '../utils';
import { ControlTypes, ControlEvents, RangeControl } from 'property-controls';
import { ModuleEvents, ModuleStates } from '../constants';
import { SoundModuleDefaults } from '../defaults';

var EventEmitter = require('events').EventEmitter;

class SoundModule extends EventEmitter {
    constructor (audioContext, options={}) {
        this.__volumeListener = this.__onVolumeChange.bind(this);

        this.state = ModuleStates.STOPPED;
        this.controls = [];

        this.audioCtx   = audioContext;
        this.gainNode   = this.audioCtx.createGain();

        this.setDefaults();
        this.setOptions(options);
        this.setControls();
    }

    setDefaults () {
        // Setup default values.
        this.model = Object.assign({}, SoundModuleDefaults);
    }

    setOptions (options) {
        // If the options.model attribute is set and is an object
        // initialize this model with it.
        if(options && utils.isObject(options)) {
            utils.deepExtend(this.model, options);
        }

        this.id = options.id || utils.uuid();
    }

    setControls () {
        // Create a volume property control
        this.volume = new RangeControl(this.model.volume);
        this.volume.on(ControlEvents.VALUE_CHANGE, this.__volumeListener);
        this.controls.push(this.volume);

        this.volume.value = this.volume.value;
        this.mute = this.mute;
    }

    // Public API
    start () {
        if(this.state !== ModuleEvents.ACTIVE) {
            this.state = ModuleStates.ACTIVE;
            this.emit(ModuleEvents.START);
        }
    }

    stop () {
        if(this.state !== ModuleEvents.St)
        this.state = ModuleStates.STOPPED;
        this.emit(ModuleEvents.STOP);
    }

    connect (gainNode) {
        this.gainNode.connect(gainNode);
        this.emit(ModuleEvents.CONNECT);
    }

    disconnect () {
        this.gainNode.disconnect();
        this.emit(ModuleEvents.DISCONNECT);
    }

    destroy () {
        this.volume.removeListener(ControlEvents.VALUE_CHANGE, this.__volumeListener);

        this.stop();
        this.disconnect();
        this.emit(ModuleEvents.DESTROY);
    }

    /*************************************
      *      Getters and Setters
    **************************************/

    /*** type ***/
    get type () {
        return this.model.type;
    }

    /*** gain ***/
    get gain () {
        return this.gainNode.gain.value;
    }

    set gain (gainInt) {
        if(gainInt !== void 0 && typeof gainInt === 'number') {
            this.gainNode.gain.value = gainInt;
        }
    }

    /*** mute ***/
    get mute () {
        return this.model.muted;
    }

    set mute (muteBool) {
        this.gain = (muteBool) ? 0 : this.volume.value;
        this.model.muted = muteBool;
    }

    // Private Methods
    __onVolumeChange (e) {
        if (this.mute === false) {
            this.gain = e.value;
        }
    }
}

export {
    SoundModule
};

export default SoundModule;
