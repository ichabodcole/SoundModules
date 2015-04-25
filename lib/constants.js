var ModuleTypes = {
    BINAURAL_BEAT_MODULE: 'binaural-beat-module',
    COLOR_NOISE_MODULE: 'color-noise-module'
};

var ModuleStates = {
    STOPPED: 'stopped',
    ACTIVE: 'active'
};

var ModuleEvents = {
    START: 'start',
    STOP: 'stop',
    DESTROY: 'destroy',
    CONNECT: 'connect',
    DISCONNECT: 'disconnect'
};

export {
    ModuleTypes,
    ModuleStates,
    ModuleEvents
};
